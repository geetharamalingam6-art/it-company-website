import { useState } from 'react'

export default function Chatbot({ isOpen, onClose, onSendMessage }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Welcome to NexusTech. How can I assist you with our IT services today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')

    // Update message history with user message
    const updatedMessages = [...messages, { sender: 'user', text: userMessage }]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      // Call the API function passed from App component
      const botReply = await onSendMessage(userMessage, updatedMessages)
      setMessages([...updatedMessages, { sender: 'bot', text: botReply }])
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          sender: 'bot',
          text: error instanceof Error ? error.message : 'Sorry, I encountered an error connecting to the AI assistant.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          <h3 className="font-semibold text-sm">NexusTech AI Assistant</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none text-lg font-bold"
          aria-label="Close Chatbot"
        >
          &times;
        </button>
      </div>

      {/* Message History */}
      <div className="p-4 h-80 overflow-y-auto space-y-3 bg-gray-50 flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
              msg.sender === 'user'
                ? 'ml-auto bg-indigo-600 text-white rounded-br-none'
                : 'mr-auto bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="mr-auto bg-white text-gray-500 border border-gray-200 px-4 py-2 rounded-xl rounded-bl-none text-sm shadow-sm animate-pulse">
            Thinking...
          </div>
        )}
      </div>

      {/* Input and Send */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  )
}
