import FAQItem from './FAQItem'

export default function FAQSection({ faqContent, isFaqLoading, onRegenerate }) {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-950 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600">Got questions? AI-generated answers about how we work.</p>
        </div>
        <button
          onClick={onRegenerate}
          disabled={isFaqLoading}
          className="mt-4 sm:mt-0 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-indigo-200 disabled:opacity-50"
        >
          {isFaqLoading ? 'Generating...' : 'Regenerate FAQs'}
        </button>
      </div>

      {isFaqLoading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Generating FAQs using Gemini AI...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqContent.map((faq) => (
            <FAQItem key={faq.id || faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      )}
    </section>
  )
}
