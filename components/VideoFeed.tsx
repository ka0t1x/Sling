import React, { useEffect, useRef, useState } from 'react';
import { MOCK_VIDEOS } from '../constants';
import VideoPlayer from './VideoPlayer';

const VideoFeed: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string>(MOCK_VIDEOS[0].id);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.6, // Video must be 60% visible to be considered active
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoId = entry.target.getAttribute('data-id');
          if (videoId) {
            setActiveVideoId(videoId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    
    const elements = containerRef.current?.querySelectorAll('.video-snap-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth bg-black"
    >
      {MOCK_VIDEOS.map((video) => (
        <div 
          key={video.id} 
          data-id={video.id}
          className="video-snap-item h-screen w-full snap-start"
        >
          <VideoPlayer 
            data={video} 
            isActive={activeVideoId === video.id} 
            isMuted={isMuted}
            toggleMute={toggleMute}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;