import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-brown/80 via-deep-brown/60 to-background" />
        
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-off-white mb-6">
            Get in Touch
          </h1>
          <p className="font-paragraph text-xl md:text-2xl text-off-white/90">
            We would love to hear from you
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="relative py-32 px-6">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-deep-brown mb-8">
                Contact Information
              </h2>

              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-12">
                Whether you have questions about our history, want to learn more about our ministries, or simply wish to connect, we're here to help.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-soft-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-soft-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-deep-brown mb-2">
                      Address
                    </h3>
                    <p className="font-paragraph text-base text-foreground/70">
                      123 Faith Avenue<br />
                      Heritage City, HC 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-soft-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-soft-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-deep-brown mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+1234567890"
                      className="font-paragraph text-base text-foreground/70 hover:text-soft-gold transition-colors duration-300"
                    >
                      (123) 456-7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-soft-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-soft-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-deep-brown mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:info@sacredarchive.org"
                      className="font-paragraph text-base text-foreground/70 hover:text-soft-gold transition-colors duration-300"
                    >
                      info@sacredarchive.org
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-12 p-8 bg-off-white rounded-2xl">
                <h3 className="font-heading text-2xl text-deep-brown mb-4">
                  Office Hours
                </h3>
                <div className="space-y-2 font-paragraph text-base text-foreground/70">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-off-white rounded-2xl p-8 md:p-12 shadow-xl">
                <h2 className="font-heading text-3xl md:text-4xl text-deep-brown mb-8">
                  Send Us a Message
                </h2>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-soft-gold/10 border border-soft-gold/20 rounded-lg"
                  >
                    <p className="font-paragraph text-sm text-soft-gold">
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-paragraph text-sm text-foreground/80 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-sandstone/20 rounded-lg font-paragraph text-base text-foreground focus:outline-none focus:border-soft-gold transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-paragraph text-sm text-foreground/80 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-sandstone/20 rounded-lg font-paragraph text-base text-foreground focus:outline-none focus:border-soft-gold transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-paragraph text-sm text-foreground/80 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-sandstone/20 rounded-lg font-paragraph text-base text-foreground focus:outline-none focus:border-soft-gold transition-colors duration-300"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-paragraph text-sm text-foreground/80 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-background border border-sandstone/20 rounded-lg font-paragraph text-base text-foreground focus:outline-none focus:border-soft-gold transition-colors duration-300 resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-soft-gold text-primary-foreground font-paragraph font-medium text-lg rounded-lg transition-all duration-300 hover:bg-primary hover:scale-105"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
