export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">NexusTech IT Solutions</h3>
          <p className="text-gray-400 text-sm">
            Empowering businesses with cutting-edge technology, cloud solutions, and robust cybersecurity services.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <p className="text-gray-400 text-sm">123 Tech Park Avenue, Silicon Valley, CA</p>
          <p className="text-gray-400 text-sm mt-2">Email: contact@nexustech.example</p>
          <p className="text-gray-400 text-sm mt-2">Phone: +1 (555) 234-5678</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} NexusTech IT Solutions. All rights reserved.
      </div>
    </footer>
  )
}
