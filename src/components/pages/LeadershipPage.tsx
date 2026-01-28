import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { LeadershipTeam } from '@/entities';
import { Image } from '@/components/ui/image';

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<LeadershipTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLeaders();
  }, []);

  const loadLeaders = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<LeadershipTeam>('leadershipteam');
    const currentLeaders = result.items.filter((l) => l.isCurrent);
    const pastLeaders = result.items.filter((l) => !l.isCurrent);
    setLeaders([...currentLeaders, ...pastLeaders]);
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
            Our Leadership
          </h1>
          <p className="font-paragraph text-xl md:text-2xl text-off-white/90">
            Shepherds who have guided our spiritual journey
          </p>
        </motion.div>
      </section>

      {/* Leadership Content */}
      <section className="relative py-32 px-6">
        <div className="max-w-[100rem] mx-auto">
          <div className="relative min-h-[400px]">
            {isLoading ? null : leaders.length > 0 ? (
              <div className="space-y-32">
                {leaders.map((leader, index) => (
                  <motion.div
                    key={leader._id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`relative h-[600px] rounded-2xl overflow-hidden shadow-2xl ${
                        index % 2 === 1 ? 'lg:order-2' : ''
                      }`}
                    >
                      {leader.profilePhoto ? (
                        <>
                          <Image
                            src={leader.profilePhoto}
                            alt={leader.leaderName || 'Leader'}
                            width={800}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/60 to-transparent" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-sandstone/20 flex items-center justify-center">
                          <span className="font-heading text-6xl text-sandstone/40">
                            {leader.leaderName?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}

                      {/* Current Badge */}
                      {leader.isCurrent && (
                        <div className="absolute top-6 right-6 px-4 py-2 bg-soft-gold rounded-full">
                          <span className="font-paragraph text-sm font-medium text-primary-foreground uppercase tracking-wider">
                            Current
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        {leader.role && (
                          <span className="inline-block font-paragraph text-sm uppercase tracking-wider text-soft-gold mb-4">
                            {leader.role}
                          </span>
                        )}

                        <h2 className="font-heading text-5xl md:text-6xl text-deep-brown mb-8">
                          {leader.leaderName}
                        </h2>

                        {leader.biography && (
                          <p className="font-paragraph text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                            {leader.biography}
                          </p>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center">
                <p className="font-paragraph text-lg text-foreground/60">
                  No leadership information available at this time.
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
