import { useState } from 'react'
import { GoogleGenAI } from '@google/genai'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import FAQSection from './components/FAQSection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.8-flash'
const GEMINI_FALLBACK_MODEL = import.meta.env.VITE_GEMINI_FALLBACK_MODEL?.trim()
const REQUEST_WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 5
const modelRequestTimes = new Map()

const defaultFaqList = [
  {
    id: 1,
    question: 'What industries do you specialize in?',
    answer: 'We provide IT solutions across various industries including finance, healthcare, e-commerce, logistics, and SaaS enterprises.',
  },
  {
    id: 2,
    question: 'How long does a typical software project take?',
    answer: 'Project timelines vary based on scope and complexity. Small applications take 4-8 weeks, while enterprise systems may take 3-6 months.',
  },
  {
    id: 3,
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Yes, we provide 24/7 monitoring, regular updates, bug fixes, and continuous technical support packages.',
  },
  {
    id: 4,
    question: 'How do we get started with a consultation?',
    answer: 'You can reach out via our contact form below or email us directly to schedule a free 30-minute discovery call with our tech leads.',
  },
]

const waitForModelQuota = async (model) => {
  const requestTimes = modelRequestTimes.get(model) || []

  while (true) {
    const now = Date.now()
    const recentRequests = requestTimes.filter((time) => now - time < REQUEST_WINDOW_MS)
    if (recentRequests.length < MAX_REQUESTS_PER_WINDOW) {
      recentRequests.push(now)
      modelRequestTimes.set(model, recentRequests)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, recentRequests[0] + REQUEST_WINDOW_MS - now))
  }
}

const generateWithGeminiFallback = async (ai, request) => {
  const models = [GEMINI_MODEL]
  if (GEMINI_FALLBACK_MODEL && GEMINI_FALLBACK_MODEL !== GEMINI_MODEL) {
    models.push(GEMINI_FALLBACK_MODEL)
  }

  let lastError
  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        await waitForModelQuota(model)
        return await ai.models.generateContent({ ...request, model })
      } catch (error) {
        lastError = error
        const message = error instanceof Error ? error.message : String(error)
        const status = typeof error === 'object' && error !== null && 'status' in error
          ? error.status
          : undefined
        const unavailable = status === 503 || /503|UNAVAILABLE|currently experiencing high demand/i.test(message)

        if (unavailable && attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * (2 ** attempt)))
          continue
        }
        if (unavailable || status === 404 || /model.*not found|NOT_FOUND/i.test(message)) {
          break
        }
        throw error
      }
    }
  }

  throw lastError
}

export default function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [faqContent, setFaqContent] = useState(defaultFaqList)
  const [isFaqLoading, setIsFaqLoading] = useState(false)

  const servicesList = [
    {
      id: 1,
      title: 'Cloud Computing',
      description: 'Scalable and secure cloud infrastructure setup, migration, and management across AWS, Azure, and GCP.',
      icon: '☁️',
    },
    {
      id: 2,
      title: 'Cybersecurity',
      description: 'Comprehensive security audits, threat monitoring, penetration testing, and compliance solutions.',
      icon: '🔒',
    },
    {
      id: 3,
      title: 'Custom Software Development',
      description: 'Tailored web, mobile, and enterprise software engineered for high performance and reliability.',
      icon: '💻',
    },
    {
      id: 4,
      title: 'AI & Data Analytics',
      description: 'Unlock actionable insights from your data using advanced machine learning models and business intelligence.',
      icon: '📊',
    },
  ]

  const generateFAQ = async () => {
    setIsFaqLoading(true)
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey) {
      setTimeout(() => {
        setFaqContent(defaultFaqList)
        setIsFaqLoading(false)
      }, 500)
      return
    }

    try {
      const ai = new GoogleGenAI({ apiKey })
      const prompt = "Generate a list of 4 common questions and answers about an IT company (services, cloud computing, cybersecurity, software development), formatted strictly as a valid JSON array of objects with 'id', 'question', and 'answer' keys. Do not include any markdown formatting or backticks, return only the raw JSON array."
      
      const response = await generateWithGeminiFallback(ai, {
        contents: prompt,
      })

      const text = response.text ? response.text.trim() : ''
      const cleanText = text.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '')
      const parsedFaq = JSON.parse(cleanText)
      setFaqContent(parsedFaq)
    } catch (error) {
      console.error('Failed to generate FAQs from Gemini API, using fallback:', error)
      setFaqContent(defaultFaqList)
    } finally {
      setIsFaqLoading(false)
    }
  }

  const handleGeminiApiCall = async (_prompt, conversation) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('VITE_GEMINI_API_KEY is missing. Add it to the project .env file and restart the Vite server.')
    }

    try {
      const ai = new GoogleGenAI({ apiKey })
      const response = await generateWithGeminiFallback(ai, {
        contents: conversation.map(({ sender, text }) => ({
          role: sender === 'user' ? 'user' : 'model',
          parts: [{ text }],
        })),
        config: {
          systemInstruction: "You are NexusTech's helpful IT services assistant. Answer the user's specific question directly and naturally, using the conversation for context. NexusTech offers cloud computing on AWS, Azure, and GCP; cybersecurity; custom software development; and AI and data analytics. Do not invent company details, prices, contact information, or guarantees. If a detail is unknown, say so and suggest using the website contact form.",
        },
      })

      const answer = response.text?.trim()
      if (!answer) {
        throw new Error('Gemini returned an empty response.')
      }
      return answer
    } catch (error) {
      console.error('Gemini API Error:', error)
      const message = error instanceof Error ? error.message : String(error)
      const status = typeof error === 'object' && error !== null && 'status' in error
        ? error.status
        : undefined

      if (/api key not valid|api_key_invalid|invalid api key/i.test(message)) {
        throw new Error('Gemini rejected the API key. Check that VITE_GEMINI_API_KEY in the project .env file is a valid Gemini API key, then restart the Vite server.')
      }
      if (status === 401 || status === 403) {
        throw new Error(`Gemini access was denied (${status}). Check the API key and make sure the Gemini API is enabled for its Google Cloud project.`)
      }
      if (status === 429) {
        const retryDelay = message.match(/retry in ([\d.]+)s/i)?.[1]
        const perMinuteLimit = /RequestsPerMinute|per minute/i.test(message)
        const waitMessage = perMinuteLimit
          ? ' Wait about 60 seconds for the per-minute quota window to reset before trying again.'
          : retryDelay
            ? ` Wait at least ${Math.ceil(Number(retryDelay))} seconds before trying again.`
          : ' Wait for your quota window to reset before trying again.'
        throw new Error(`Gemini request quota exceeded (429). The app limits its own requests and no longer uses a Gemini call to load FAQs, but Gemini quotas are shared with other tabs and apps using the same project.${waitMessage} Check your quota or billing at https://ai.dev/rate-limit.`)
      }
      if (status === 503 || /503|UNAVAILABLE|currently experiencing high demand/i.test(message)) {
        throw new Error('Gemini is still unavailable (503) after several retries. This is a temporary issue with Google’s service. Try again later, or set VITE_GEMINI_FALLBACK_MODEL in .env to another model enabled for your API key and restart Vite.')
      }
      if (status === 404) {
        throw new Error(`Gemini model or endpoint was not found (404): ${message}`)
      }
      if (error instanceof TypeError && /fetch|network/i.test(message)) {
        throw new Error('Could not reach Gemini. Check your internet connection, browser network errors, or API key referrer restrictions.')
      }

      throw new Error(`Gemini request failed: ${message}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 relative">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <Services servicesList={servicesList} />
        <About />
        <FAQSection
          faqContent={faqContent}
          isFaqLoading={isFaqLoading}
          onRegenerate={generateFAQ}
        />
        <Contact />
      </main>

      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center z-40 transition-transform hover:scale-105"
        aria-label="Toggle Chatbot"
      >
        💬
      </button>

      <Chatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onSendMessage={handleGeminiApiCall}
      />

      <Footer />
    </div>
  )
}
