export default function Hero() {
  return (
    <section id="hero" className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-24 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
          Transforming Business Through Innovative IT Solutions
        </h1>
        <p className="text-lg sm:text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
          We engineer world-class cloud infrastructure, robust cybersecurity, and scalable software to accelerate your digital growth.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#services"
            className="bg-white text-indigo-900 hover:bg-indigo-50 font-semibold px-6 py-3 rounded-lg shadow transition-colors"
          >
            Our Services
          </a>
          <a
            href="#contact"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors border border-indigo-400"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
