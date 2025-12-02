import React, { useRef, useEffect, useState, useCallback } from 'react';
import { VideoData } from '../types';
import { Heart, MessageCircle, Share2, Music, Sparkles, Volume2, VolumeX, Play } from 'lucide-react';
import { generateViralCaption } from '../services/geminiService';

interface VideoPlayerProps {
  data: VideoData;
  isActive: boolean;
  toggleMute: () => void;
  isMuted: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ data, isActive, toggleMute, isMuted }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiContent, setAiContent] = useState<{ caption?: string; hashtags?: string[]; analysis?: string } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Handle Play/Pause based on active state (scrolling)
  useEffect(() => {
    if (isActive) {
      const playPromise = videoRef.current?.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log('Autoplay prevented:', error);
            setIsPlaying(false);
          });
      }
    } else {
      videoRef.current?.pause();
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleGeminiMagic = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAiModalOpen(true);
    if (!aiContent) {
      setLoadingAi(true);
      const result = await generateViralCaption(data);
      setAiContent(result);
      setLoadingAi(false);
    }
  };

  return (
    <div className="relative h-full w-full snap-start shrink-0 bg-black">
      {/* Video Element */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={data.url}
        className="h-full w-full object-cover cursor-pointer"
        loop
        playsInline
        muted={isMuted}
        onClick={handleVideoClick}
      />

      {/* Play Icon Overlay (when paused) */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          onClick={handleVideoClick}
        >
          <Play size={64} fill="white" className="opacity-50" />
        </div>
      )}

      {/* Right Sidebar Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
        <div className="relative group cursor-pointer">
          <img 
            src={data.avatar} 
            alt="avatar" 
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full p-[2px]">
            <div className="w-4 h-0.5 bg-white transform rotate-90" />
            <div className="w-4 h-0.5 bg-white absolute top-1/2 left-0 transform -translate-y-1/2" />
          </div>
        </div>

        <button onClick={handleLike} className="flex flex-col items-center gap-1 transition-transform active:scale-90">
          <Heart 
            size={32} 
            className={`transition-colors duration-300 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
          />
          <span className="text-xs font-semibold drop-shadow-md">{data.likes + (liked ? 1 : 0)}</span>
        </button>

        <button className="flex flex-col items-center gap-1 transition-transform active:scale-90">
          <MessageCircle size={32} className="text-white drop-shadow-md" />
          <span className="text-xs font-semibold drop-shadow-md">{data.comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1 transition-transform active:scale-90">
          <Share2 size={32} className="text-white drop-shadow-md" />
          <span className="text-xs font-semibold drop-shadow-md">{data.shares}</span>
        </button>

        {/* Gemini AI Button */}
        <button 
          onClick={handleGeminiMagic}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90 group relative"
        >
          <div className="bg-gradient-to-tr from-blue-500 to-purple-600 p-2 rounded-full animate-pulse group-hover:animate-none">
            <Sparkles size={24} className="text-white" />
          </div>
          <span className="text-xs font-semibold drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            AI Magic
          </span>
        </button>
      </div>

      {/* Bottom Info Section */}
      <div className="absolute bottom-4 left-4 right-16 z-20 text-white">
        <h3 className="font-bold text-lg mb-1 drop-shadow-md">{data.username}</h3>
        
        <p className="text-sm mb-3 drop-shadow-md line-clamp-2">
          {data.description}
        </p>
        
        <div className="flex items-center gap-2 animate-marquee overflow-hidden whitespace-nowrap">
          <Music size={16} />
          <span className="text-sm font-medium">{data.song}</span>
        </div>
      </div>

       {/* Mute Toggle (Top Right) */}
       <button 
        onClick={(e) => { e.stopPropagation(); toggleMute(); }}
        className="absolute top-20 right-4 p-2 bg-black/20 rounded-full backdrop-blur-sm z-30"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Gemini Modal Overlay */}
      {aiModalOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40 flex flex-col justify-end animate-in slide-in-from-bottom duration-300">
          <div 
            className="flex-1 w-full" 
            onClick={(e) => { e.stopPropagation(); setAiModalOpen(false); }} 
          />
          <div className="bg-[#1c1c1c] rounded-t-3xl p-6 min-h-[50%] border-t border-gray-800 relative">
            <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-6" />
            
            <div className="flex items-center gap-2 mb-4">
               <Sparkles className="text-purple-400" />
               <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                 Gemini Analysis
               </h2>
            </div>

            {loadingAi ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                <p className="text-gray-400 text-sm">Thinking...</p>
              </div>
            ) : aiContent ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Viral Caption</h3>
                  <p className="text-lg font-medium text-white">{aiContent.caption}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                   {aiContent.hashtags?.map(tag => (
                     <span key={tag} className="text-sm text-blue-400 font-bold">{tag}</span>
                   ))}
                </div>

                <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Why this works</h3>
                  <p className="text-sm text-gray-300 italic">"{aiContent.analysis}"</p>
                </div>
              </div>
            ) : (
               <p className="text-red-400">Failed to load analysis.</p>
            )}

            <button 
              className="mt-6 w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-colors"
              onClick={(e) => { e.stopPropagation(); setAiModalOpen(false); }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;