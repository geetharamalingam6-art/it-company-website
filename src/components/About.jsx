export default function About() {
  return (
    <section id="about" className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-y border-gray-200">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About NexusTech</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2018, NexusTech has been at the forefront of digital transformation. Our team of expert engineers, architects, and cybersecurity specialists are dedicated to delivering excellence.
          </p>
          <p className="text-gray-600 mb-6">
            We believe in building long-term partnerships with our clients, understanding their unique challenges, and delivering tailor-made technological solutions that drive measurable business outcomes.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">150+</div>
              <div className="text-xs text-gray-500 mt-1">Projects Delivered</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">98%</div>
              <div className="text-xs text-gray-500 mt-1">Client Retention</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">24/7</div>
              <div className="text-xs text-gray-500 mt-1">Expert Support</div>
            </div>
          </div>
        </div>
        <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Our Core Values</h3>
          <ul className="space-y-4 text-sm text-indigo-200">
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2 font-bold">&#10003;</span>
              <span><strong>Innovation First:</strong> Staying ahead with cutting-edge tech stacks.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2 font-bold">&#10003;</span>
              <span><strong>Uncompromising Security:</strong> Protecting your data at every layer.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2 font-bold">&#10003;</span>
              <span><strong>Client-Centric:</strong> Your business goals drive our engineering.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
