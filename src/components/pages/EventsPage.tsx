import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ChurchEvents } from '@/entities';
import { Image } from '@/components/ui/image';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function EventsPage() {
  const [events, setEvents] = useState<ChurchEvents[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<ChurchEvents>('churchevents');
    const sortedEvents = result.items.sort((a, b) => {
      const dateA = a.eventDateTime ? new Date(a.eventDateTime).getTime() : 0;
      const dateB = b.eventDateTime ? new Date(b.eventDateTime).getTime() : 0;
      return dateB - dateA;
    });
    setEvents(sortedEvents);
    setIsLoading(false);
  };

  const formatDateTime = (date: Date | string | undefined) => {
    if (!date) return 'Date TBA';
    try {
      return format(new Date(date), 'MMMM d, yyyy');
    } catch {
      return 'Date TBA';
    }
  };

  const formatTime = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'h:mm a');
    } catch {
      return '';
    }
  };

  const isPastEvent = (date: Date | string | undefined) => {
    if (!date) return false;
    try {
      return new Date(date) < new Date();
    } catch {
      return false;
    }
  };

  const upcomingEvents = events.filter((e) => !isPastEvent(e.eventDateTime));
  const pastEvents = events.filter((e) => isPastEvent(e.eventDateTime));

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
            Church Events
          </h1>
          <p className="font-paragraph text-xl md:text-2xl text-off-white/90">
            Celebrate past gatherings and upcoming occasions
          </p>
        </motion.div>
      </section>

      {/* Events Content */}
      <section className="relative py-32 px-6">
        <div className="max-w-[100rem] mx-auto">
          <div className="relative min-h-[400px]">
            {isLoading ? null : events.length > 0 ? (
              <div className="space-y-24">
                {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="font-heading text-4xl md:text-5xl text-deep-brown mb-12 text-center"
                    >
                      Upcoming Events
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {upcomingEvents.map((event, index) => (
                        <motion.div
                          key={event._id}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-100px' }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ y: -8 }}
                          className="group relative bg-off-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                          {/* Image */}
                          {event.eventImage && (
                            <div className="relative h-64 overflow-hidden">
                              <Image
                                src={event.eventImage}
                                alt={event.eventTitle || 'Event'}
                                width={600}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 to-transparent" />
                            </div>
                          )}

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="font-heading text-2xl text-deep-brown mb-4 group-hover:text-soft-gold transition-colors duration-300">
                              {event.eventTitle}
                            </h3>

                            <div className="space-y-3 mb-4">
                              {event.eventDateTime && (
                                <>
                                  <div className="flex items-center gap-3 text-foreground/70">
                                    <Calendar className="w-4 h-4 text-soft-gold flex-shrink-0" />
                                    <span className="font-paragraph text-sm">
                                      {formatDateTime(event.eventDateTime)}
                                    </span>
                                  </div>

                                  {formatTime(event.eventDateTime) && (
                                    <div className="flex items-center gap-3 text-foreground/70">
                                      <Clock className="w-4 h-4 text-soft-gold flex-shrink-0" />
                                      <span className="font-paragraph text-sm">
                                        {formatTime(event.eventDateTime)}
                                      </span>
                                    </div>
                                  )}
                                </>
                              )}

                              {event.location && (
                                <div className="flex items-center gap-3 text-foreground/70">
                                  <MapPin className="w-4 h-4 text-soft-gold flex-shrink-0" />
                                  <span className="font-paragraph text-sm">
                                    {event.location}
                                  </span>
                                </div>
                              )}
                            </div>

                            {event.eventDescription && (
                              <p className="font-paragraph text-sm text-foreground/70 line-clamp-3">
                                {event.eventDescription}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Past Events */}
                {pastEvents.length > 0 && (
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="font-heading text-4xl md:text-5xl text-deep-brown mb-12 text-center"
                    >
                      Past Events
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {pastEvents.map((event, index) => (
                        <motion.div
                          key={event._id}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-100px' }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ y: -8 }}
                          className="group relative bg-off-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 opacity-90"
                        >
                          {/* Image */}
                          {event.eventImage && (
                            <div className="relative h-64 overflow-hidden">
                              <Image
                                src={event.eventImage}
                                alt={event.eventTitle || 'Event'}
                                width={600}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 to-transparent" />
                            </div>
                          )}

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="font-heading text-2xl text-deep-brown mb-4 group-hover:text-soft-gold transition-colors duration-300">
                              {event.eventTitle}
                            </h3>

                            <div className="space-y-3 mb-4">
                              {event.eventDateTime && (
                                <div className="flex items-center gap-3 text-foreground/70">
                                  <Calendar className="w-4 h-4 text-soft-gold flex-shrink-0" />
                                  <span className="font-paragraph text-sm">
                                    {formatDateTime(event.eventDateTime)}
                                  </span>
                                </div>
                              )}

                              {event.location && (
                                <div className="flex items-center gap-3 text-foreground/70">
                                  <MapPin className="w-4 h-4 text-soft-gold flex-shrink-0" />
                                  <span className="font-paragraph text-sm">
                                    {event.location}
                                  </span>
                                </div>
                              )}
                            </div>

                            {event.eventDescription && (
                              <p className="font-paragraph text-sm text-foreground/70 line-clamp-3">
                                {event.eventDescription}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-32 text-center">
                <p className="font-paragraph text-lg text-foreground/60">
                  No events available at this time.
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
