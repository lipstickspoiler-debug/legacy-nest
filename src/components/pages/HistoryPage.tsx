import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { HistoryEras } from '@/entities';
import { Image } from '@/components/ui/image';

export default function HistoryPage() {
  const [eras, setEras] = useState<HistoryEras[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEras();
  }, []);

  const loadEras = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<HistoryEras>('historyeras');
    const sortedEras = result.items.sort((a, b) => (a.order || 0) - (b.order || 0));
    setEras(sortedEras);
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-deep-brown/80 via-deep-brown/60 to-background" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-off-white mb-6">
            Our Sacred History
          </h1>
          <p className="font-paragraph text-xl md:text-2xl text-off-white/90">
            A journey through time, faith, and transformation
          </p>
        </motion.div>
      </section>
      {/* Eras Content */}
      <div className="relative min-h-[400px]">
        {isLoading ? null : eras.length > 0 ? (
          <div className="space-y-0">
            {eras.map((era, index) => (
              <section
                key={era._id}
                className={`relative w-full min-h-screen flex items-center py-32 px-6 ${
                  index % 2 === 0 ? 'bg-off-white' : 'bg-background'
                }`}
              >
                <div className="max-w-[100rem] mx-auto w-full">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className={index % 2 === 1 ? 'lg:order-2' : ''}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-block mb-4"
                      >
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="font-heading text-5xl md:text-6xl text-deep-brown mb-8"
                      >
                        {era.eraTitle}
                      </motion.h2>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <p className="font-paragraph text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                          {era.description}
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative h-[600px] rounded-2xl overflow-hidden shadow-2xl ${
                        index % 2 === 1 ? 'lg:order-1' : ''
                      }`}
                    >
                      {era.backgroundImage && (
                        <>
                          <Image
                            src={era.backgroundImage}
                            alt={era.eraTitle || 'Era image'}
                            width={800}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/40 to-transparent" />
                        </>
                      )}
                    </motion.div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="py-32 px-6 text-center">
            <p className="font-paragraph text-lg text-foreground/60">
              No historical eras available at this time.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
