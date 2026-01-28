import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-deep-brown text-off-white py-16 px-6">
      <div className="max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="font-heading text-2xl mb-6 text-soft-gold">
              Sacred Archive
            </h3>
            <p className="font-paragraph text-sm text-off-white/80 leading-relaxed">
              Preserving our spiritual heritage and sharing the profound journey of faith that has shaped our community through generations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'History', href: '/history' },
                { name: 'Timeline', href: '/timeline' },
                { name: 'Leadership', href: '/leadership' },
                { name: 'Ministries', href: '/ministries' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-paragraph text-sm text-off-white/80 hover:text-soft-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-heading text-xl mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-soft-gold flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-sm text-off-white/80">
                  123 Faith Avenue, Heritage City, HC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-soft-gold flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="font-paragraph text-sm text-off-white/80 hover:text-soft-gold transition-colors duration-300"
                >
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-soft-gold flex-shrink-0" />
                <a
                  href="mailto:info@sacredarchive.org"
                  className="font-paragraph text-sm text-off-white/80 hover:text-soft-gold transition-colors duration-300"
                >
                  info@sacredarchive.org
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-heading text-xl mb-6">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-off-white/10 flex items-center justify-center hover:bg-soft-gold transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-off-white/10 flex items-center justify-center hover:bg-soft-gold transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-off-white/10 flex items-center justify-center hover:bg-soft-gold transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-off-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-off-white/60">
              © {new Date().getFullYear()} Sacred Archive. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="/contact"
                className="font-paragraph text-sm text-off-white/60 hover:text-soft-gold transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/contact"
                className="font-paragraph text-sm text-off-white/60 hover:text-soft-gold transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
