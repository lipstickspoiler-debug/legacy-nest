import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { TimelineMilestones } from '@/entities';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';

export default function TimelinePage() {
  const [milestones, setMilestones] = useState<TimelineMilestones[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestones | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMilestones();
  }, []);

  const loadMilestones = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<TimelineMilestones>('timelinemilestones');
    const sortedMilestones = result.items.sort((a, b) => {
      const dateA = a.milestoneDate ? new Date(a.milestoneDate).getTime() : 0;
      const dateB = b.milestoneDate ? new Date(b.milestoneDate).getTime() : 0;
      return dateA - dateB;
    });
    setMilestones(sortedMilestones);
    setIsLoading(false);
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Date Unknown';
    try {
      return format(new Date(date), 'MMMM d, yyyy');
    } catch {
      return 'Date Unknown';
    }
  };

  const getYear = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'yyyy');
    } catch {
      return '';
    }
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
            Interactive Timeline
          </h1>
          <p className="font-paragraph text-xl md:text-2xl text-off-white/90">
            Journey through the milestones that shaped our legacy
          </p>
        </motion.div>
      </section>

      {/* Timeline Content */}
      <section className="relative py-32 px-6">
        <div className="max-w-[120rem] mx-auto">
          <div className="relative min-h-[400px]">
            {isLoading ? null : milestones.length > 0 ? (
              <>
                {/* Horizontal Timeline */}
                <div
                  ref={scrollContainerRef}
                  className="relative overflow-x-auto pb-12 mb-20 scrollbar-hide"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  <div className="flex items-center gap-8 min-w-max px-8">
                    {/* Timeline Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sandstone/30 -translate-y-1/2" />

                    {milestones.map((milestone, index) => (
                      <motion.div
                        key={milestone._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="relative flex flex-col items-center"
                      >
                        {/* Timeline Dot */}
                        <motion.button
                          onClick={() => setSelectedMilestone(milestone)}
                          whileHover={{ scale: 1.2 }}
                          className={`w-6 h-6 rounded-full transition-all duration-300 ${
                            selectedMilestone?._id === milestone._id
                              ? 'bg-soft-gold shadow-lg shadow-soft-gold/50'
                              : 'bg-sandstone hover:bg-soft-gold'
                          }`}
                        />

                        {/* Year Label */}
                        <span className="mt-4 font-paragraph text-sm text-foreground/60 whitespace-nowrap">
                          {getYear(milestone.milestoneDate)}
                        </span>

                        {/* Title */}
                        <motion.button
                          onClick={() => setSelectedMilestone(milestone)}
                          className="mt-2 font-heading text-base text-deep-brown hover:text-soft-gold transition-colors duration-300 max-w-[200px] text-center"
                        >
                          {milestone.milestoneTitle}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Selected Milestone Detail */}
                {selectedMilestone && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-off-white rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Image */}
                      {selectedMilestone.milestoneImage && (
                        <div className="relative h-[500px] lg:h-auto">
                          <Image
                            src={selectedMilestone.milestoneImage}
                            alt={selectedMilestone.milestoneTitle || 'Milestone'}
                            width={800}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/40 to-transparent" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-12 lg:p-16">
                        <span className="inline-block font-paragraph text-sm uppercase tracking-wider text-soft-gold mb-4">
                          {formatDate(selectedMilestone.milestoneDate)}
                        </span>

                        <h2 className="font-heading text-4xl md:text-5xl text-deep-brown mb-6">
                          {selectedMilestone.milestoneTitle}
                        </h2>

                        {selectedMilestone.shortDescription && (
                          <p className="font-paragraph text-lg text-foreground/80 mb-6 leading-relaxed">
                            {selectedMilestone.shortDescription}
                          </p>
                        )}

                        {selectedMilestone.detailedDescription && (
                          <p className="font-paragraph text-base text-foreground/70 leading-relaxed whitespace-pre-line">
                            {selectedMilestone.detailedDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* All Milestones Grid */}
                <div className="mt-32">
                  <h2 className="font-heading text-4xl md:text-5xl text-deep-brown text-center mb-16">
                    All Milestones
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {milestones.map((milestone, index) => (
                      <motion.button
                        key={milestone._id}
                        onClick={() => {
                          setSelectedMilestone(milestone);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="group relative bg-off-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 text-left"
                      >
                        {milestone.milestoneImage && (
                          <div className="relative h-64 overflow-hidden">
                            <Image
                              src={milestone.milestoneImage}
                              alt={milestone.milestoneTitle || 'Milestone'}
                              width={600}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/60 to-transparent" />
                          </div>
                        )}

                        <div className="p-6">
                          <span className="inline-block font-paragraph text-xs uppercase tracking-wider text-soft-gold mb-2">
                            {formatDate(milestone.milestoneDate)}
                          </span>

                          <h3 className="font-heading text-2xl text-deep-brown mb-3 group-hover:text-soft-gold transition-colors duration-300">
                            {milestone.milestoneTitle}
                          </h3>

                          {milestone.shortDescription && (
                            <p className="font-paragraph text-sm text-foreground/70 line-clamp-3">
                              {milestone.shortDescription}
                            </p>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="py-32 text-center">
                <p className="font-paragraph text-lg text-foreground/60">
                  No timeline milestones available at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
