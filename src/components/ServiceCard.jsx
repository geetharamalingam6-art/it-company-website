export default function ServiceCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col justify-between">
      <div>
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div className="mt-6">
        <a
          href="#contact"
          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center"
        >
          Learn More &rarr;
        </a>
      </div>
    </div>
  )
}
