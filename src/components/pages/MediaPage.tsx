import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { MediaGallery } from '@/entities';
import { Image } from '@/components/ui/image';
import { Play } from 'lucide-react';

export default function MediaPage() {
  const [media, setMedia] = useState<MediaGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaGallery | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<MediaGallery>('mediagallery');
    setMedia(result.items);
    setIsLoading(false);
  };

  const isVideo = (item: MediaGallery) => {
    return item.mediaType?.toLowerCase().includes('video');
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
            Media Gallery
          </h1>
          <p className="font-paragraph text-xl md:text-2xl text-off-white/90">
            Witness our story through photographs and videos
          </p>
        </motion.div>
      </section>

      {/* Media Gallery */}
      <section className="relative py-32 px-6">
        <div className="max-w-[100rem] mx-auto">
          <div className="relative min-h-[400px]">
            {isLoading ? null : media.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {media.map((item, index) => (
                  <motion.button
                    key={item._id}
                    onClick={() => setSelectedMedia(item)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-off-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-64 overflow-hidden">
                      {item.thumbnailImage ? (
                        <>
                          <Image
                            src={item.thumbnailImage}
                            alt={item.mediaTitle || 'Media'}
                            width={600}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 to-transparent" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-sandstone/20" />
                      )}

                      {/* Video Play Icon */}
                      {isVideo(item) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-soft-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-primary-foreground ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Media Type Badge */}
                      {item.mediaType && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-deep-brown/80 backdrop-blur-sm rounded-full">
                          <span className="font-paragraph text-xs text-off-white uppercase tracking-wider">
                            {item.mediaType}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 text-left">
                      <h3 className="font-heading text-2xl text-deep-brown mb-2 group-hover:text-soft-gold transition-colors duration-300">
                        {item.mediaTitle}
                      </h3>

                      {item.description && (
                        <p className="font-paragraph text-sm text-foreground/70 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center">
                <p className="font-paragraph text-lg text-foreground/60">
                  No media available at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Media Modal */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedMedia(null)}
          className="fixed inset-0 z-50 bg-deep-brown/95 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl bg-off-white rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-deep-brown/80 backdrop-blur-sm flex items-center justify-center text-off-white hover:bg-soft-gold transition-colors duration-300"
            >
              ✕
            </button>

            {/* Media Content */}
            <div className="relative">
              {isVideo(selectedMedia) && selectedMedia.mediaSource ? (
                <div className="relative aspect-video bg-deep-brown">
                  <iframe
                    src={selectedMedia.mediaSource}
                    title={selectedMedia.mediaTitle || 'Video'}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : selectedMedia.thumbnailImage ? (
                <div className="relative">
                  <Image
                    src={selectedMedia.thumbnailImage}
                    alt={selectedMedia.mediaTitle || 'Media'}
                    width={1200}
                    className="w-full h-auto"
                  />
                </div>
              ) : null}

              {/* Info */}
              <div className="p-8">
                <h2 className="font-heading text-3xl md:text-4xl text-deep-brown mb-4">
                  {selectedMedia.mediaTitle}
                </h2>

                {selectedMedia.description && (
                  <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                    {selectedMedia.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
