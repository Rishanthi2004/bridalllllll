import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film } from 'lucide-react';

export const VideoExperienceSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Enable voiceover by default or toggle easily
  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="film" className="relative py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Editorial Title */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Film className="w-4 h-4 text-[#b89324]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#87621c] font-sans font-medium">
            Bridal Beauty Cinema
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1c1815] tracking-tight">
          The Artistry in Motion
        </h2>
        <p className="mt-2 text-sm text-[#5c4d44] font-sans">
          மென்மையான மேக்கப் பிரஷ்களுடன் பிரைடல் மேக் ஓவர் அனுபவம்.
        </p>
      </div>

      {/* Cinematic Video Showcase Frame (Luxury Light Theme Bezel) */}
      <div className="relative rounded-3xl p-3 md:p-5 bg-gradient-to-b from-[#f3ede4] via-[#f7f3ed] to-[#eee6dc] shadow-[0_20px_50px_rgba(184,147,36,0.12)] border border-[#d4af37]/35 overflow-hidden">
        {/* Soft Ambient Shimmer behind video */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-radial from-[#dfbe85]/25 to-transparent blur-2xl pointer-events-none" />

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl group">
          {/* Uploaded Video Element */}
          <video
            ref={videoRef}
            src="/assets/aistudio/Video_Project_f6a8eda6.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-contain bg-[#0c0a09]"
          />

          {/* Overlay Floating Controls */}
          <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between text-white transition-opacity duration-300 opacity-90 group-hover:opacity-100">
            {/* Left: Play/Pause & Sound */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-sans backdrop-blur-md transition-all ${
                  !isMuted
                    ? 'bg-[#d4af37] text-[#1c1815] font-semibold shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isMuted ? 'Muted' : 'Sound On'}</span>
              </button>
            </div>

            {/* Right: Tamil Audio Indicator & Fullscreen */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-white/20 text-[11px] font-sans text-[#f5ebe1]">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>Original Bridal Audio</span>
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Dossier Caption Strip */}
        <div className="mt-4 px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#5c4d44] font-sans">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-base text-[#1c1815] font-semibold">
              Slow-Motion Powder Burst Artistry
            </span>
            <span className="text-black/30">·</span>
            <span>Ultra-HD Macro</span>
          </div>

          <div className="flex items-center gap-2 text-[#87621c] text-[11px]">
            <span>Click Sound On to hear Tamil voiceover</span>
          </div>
        </div>
      </div>
    </section>
  );
};
