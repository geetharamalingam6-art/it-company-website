import ServiceCard from './ServiceCard'

export default function Services({ servicesList }) {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-950 mb-4">Our Core Services</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Comprehensive technology services designed to modernize your operations and protect your digital assets.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesList.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </section>
  )
}
