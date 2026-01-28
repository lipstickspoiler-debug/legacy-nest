import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Ministries } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink } from 'lucide-react';

export default function MinistriesPage() {
  const [ministries, setMinistries] = useState<Ministries[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMinistries();
  }, []);

  const loadMinistries = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<Ministries>('ministries');
    setMinistries(result.items);
    setIsLoading(false);
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
            Our Ministries
          </h1>
          <p className="font-paragraph text-xl md:text-2xl text-off-white/90">
            Programs that serve and strengthen our community
          </p>
        </motion.div>
      </section>

      {/* Ministries Content */}
      <section className="relative py-32 px-6">
        <div className="max-w-[100rem] mx-auto">
          <div className="relative min-h-[400px]">
            {isLoading ? null : ministries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {ministries.map((ministry, index) => (
                  <motion.div
                    key={ministry._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="group relative bg-off-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image */}
                    {ministry.mainImage && (
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={ministry.mainImage}
                          alt={ministry.ministryName || 'Ministry'}
                          width={800}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 via-deep-brown/40 to-transparent" />
                        
                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <h2 className="font-heading text-4xl text-off-white">
                            {ministry.ministryName}
                          </h2>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-8">
                      {!ministry.mainImage && (
                        <h2 className="font-heading text-4xl text-deep-brown mb-6">
                          {ministry.ministryName}
                        </h2>
                      )}

                      {ministry.description && (
                        <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
                          {ministry.description}
                        </p>
                      )}

                      {ministry.scheduleInfo && (
                        <div className="mb-6 p-4 bg-background rounded-lg">
                          <span className="font-paragraph text-sm uppercase tracking-wider text-soft-gold mb-2 block">
                            Schedule
                          </span>
                          <p className="font-paragraph text-base text-foreground/80">
                            {ministry.scheduleInfo}
                          </p>
                        </div>
                      )}

                      {ministry.learnMoreUrl && (
                        <a
                          href={ministry.learnMoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-soft-gold text-primary-foreground font-paragraph font-medium rounded-lg transition-all duration-300 hover:bg-primary hover:scale-105"
                        >
                          Learn More
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center">
                <p className="font-paragraph text-lg text-foreground/60">
                  No ministries information available at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
