import { useState } from 'react'

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left font-medium text-gray-900 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
      >
        <span>{question}</span>
        <span className="ml-4 text-xl font-bold text-indigo-600">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-2">
          {answer}
        </div>
      )}
    </div>
  )
}
