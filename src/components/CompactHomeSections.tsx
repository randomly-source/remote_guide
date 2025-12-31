import React, { useEffect, useState, useRef } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Shield, Users, TrendingUp, Tv, Wifi, Lock, EyeOff, Clock, CheckCircle, ArrowRight, Zap, ChevronDown, Play, X, Phone } from 'lucide-react';
// ========================================
// VIDEO CONFIGURATION
// ========================================
// Replace these paths with your actual video and thumbnail URLs
const VIDEO_CONFIG = {
  // Thumbnail image shown before clicking play (recommended: 1280x720 or 1920x1080)
  thumbnailUrl: '/path-to-thumbnail.jpg',
  // Main video URL - Supports:
  // - YouTube: 'https://www.youtube.com/watch?v=VIDEO_ID' or 'https://youtu.be/VIDEO_ID'
  // - Direct MP4: '/path-to-your-video.mp4' or 'https://example.com/video.mp4'
  videoUrl: 'https://www.youtube.com/watch?v=9epaU4Qqjtw&list=PLGeSUhl3ZRCudrzFmpVFGSxycoIsnDHnw',
  // Optional: Animated GIF as fallback if video doesn't load
  gifUrl: '/path-to-your-animation.gif'
};
// Helper function to detect and convert YouTube URLs to embed format
const getVideoEmbedUrl = (url: string): {
  isYouTube: boolean;
  embedUrl: string;
} => {
  // Check if it's a YouTube URL
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(youtubeRegex);
  if (match && match[1]) {
    // Convert to YouTube embed URL
    return {
      isYouTube: true,
      embedUrl: `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`
    };
  }
  // It's a regular video file
  return {
    isYouTube: false,
    embedUrl: url
  };
};
// ========================================
interface CompactHomeSectionsProps {
  onStartSetup: () => void;
  onModalStateChange: (isOpen: boolean) => void;
}
export function CompactHomeSections({
  onStartSetup,
  onModalStateChange
}: CompactHomeSectionsProps) {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  // Detect video type
  const videoInfo = getVideoEmbedUrl(VIDEO_CONFIG.videoUrl);
  useEffect(() => {
    const handleScroll = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setShowStickyCTA(rect.top < 73);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Notify parent when modal state changes
  useEffect(() => {
    onModalStateChange(showVideoModal);
  }, [showVideoModal, onModalStateChange]);
  return <>
      {/* PART 1: Why Nielsen - Compact Trust Section */}
      <div className="mb-10">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Why Nielsen?
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            100+ years trusted by networks and 42K+ households. Your viewing
            shapes entertainment.
          </p>
        </motion.div>

        {/* Compact Stats - 2 rows on mobile, 1 row on desktop */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.05
      }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
            <Award className="w-6 h-6 text-[#4A90E2] mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">100+</p>
            <p className="text-xs text-gray-600">Years</p>
          </div>
          <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
            <Users className="w-6 h-6 text-green-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">42K+</p>
            <p className="text-xs text-gray-600">Households</p>
          </div>
          <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
            <Shield className="w-6 h-6 text-purple-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">100%</p>
            <p className="text-xs text-gray-600">Private</p>
          </div>
          <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
            <Zap className="w-6 h-6 text-amber-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900">$$$</p>
            <p className="text-xs text-gray-600">Rewards</p>
          </div>
        </motion.div>
      </div>

      {/* PART 2: How It Works - Clickable Video Thumbnail */}
      <div ref={triggerRef} className="mb-10">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            How It Works
          </h2>
          <p className="text-gray-600 text-sm">
            Simple, secure, and completely private
          </p>
        </motion.div>

        {/* Clickable Video Thumbnail */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.05
      }} className="mb-4">
          <button onClick={() => setShowVideoModal(true)} className="w-full group">
            <Card className="overflow-hidden p-0 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 cursor-pointer hover:shadow-lg transition-all">
              <div className="relative aspect-video bg-gray-900 rounded-t-xl overflow-hidden max-h-[200px]">
                <video className="w-full h-full object-cover" loop muted playsInline poster={VIDEO_CONFIG.thumbnailUrl}>
                  <source src={VIDEO_CONFIG.videoUrl} type="video/mp4" />
                  <img src={VIDEO_CONFIG.gifUrl} alt="How Nielsen System Works" className="w-full h-full object-cover" />
                </video>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-[#4A90E2] ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-gray-700 font-medium">
                  Watch how your data flows securely from home to Nielsen
                </p>
              </div>
            </Card>
          </button>
        </motion.div>

        {/* Quick Summary - Always Visible */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }}>
          <Card className="bg-gradient-to-r from-blue-50 via-green-50 to-amber-50 border-gray-200">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1">
                <Tv className="w-4 h-4 text-[#4A90E2]" />
                <Lock className="w-4 h-4 text-green-600" />
                <EyeOff className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-xs text-gray-700 font-medium">
                Collect → Encrypt → Anonymize
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-0" onClick={() => setShowVideoModal(false)}>
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }} className="bg-white w-full h-full sm:h-[95vh] sm:w-[95vw] sm:rounded-2xl max-h-screen flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="flex-shrink-0 px-4 sm:px-8 py-4 sm:py-6 bg-white border-b border-gray-200 flex items-center justify-between sm:rounded-t-2xl">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  How Your Nielsen System Works
                </h2>
                <button onClick={() => setShowVideoModal(false)} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
              </div>

              {/* Full Width Video Player */}
              <div className="flex-shrink-0 bg-black">
                <div className="relative w-full" style={{
              paddingBottom: '56.25%'
            }}>
                  {videoInfo.isYouTube ?
              // YouTube iframe embed
              <iframe className="absolute inset-0 w-full h-full" src={videoInfo.embedUrl} title="How Your Nielsen System Works" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> :
              // Regular video file
              <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline controls poster={VIDEO_CONFIG.thumbnailUrl}>
                      <source src={videoInfo.embedUrl} type="video/mp4" />
                    </video>}
                </div>
              </div>

              {/* Scrollable Content Below Video */}
              <div className="flex-1 overflow-y-auto bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8 pb-24">
                  {/* Detailed Steps */}
                  <div className="space-y-6">
                    <h3 className="font-bold text-gray-900 text-xl sm:text-2xl mb-6">
                      The Complete Process
                    </h3>

                    {/* Step 1 */}
                    <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                          <Tv className="w-6 h-6 text-[#4A90E2]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg mb-2">
                            Step 1: Data Collection
                          </h4>
                          <p className="text-sm sm:text-base text-gray-700 mb-3">
                            Your Nielsen meters work quietly in the background
                            to understand what you're watching.
                          </p>
                          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">•</span>
                              <span>
                                <strong>Nano Meter:</strong> Listens for audio
                                codes embedded in TV programs (like a digital
                                fingerprint). No cameras, no recording—just
                                audio signatures.
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">•</span>
                              <span>
                                <strong>Streaming Meter:</strong> Tracks what's
                                streamed to your devices. It only sees titles
                                and timestamps—never your passwords or personal
                                browsing.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Card>

                    {/* Step 2 */}
                    <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                          <Lock className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg mb-2">
                            Step 2: Secure Transmission
                          </h4>
                          <p className="text-sm sm:text-base text-gray-700 mb-3">
                            The Hub sends all data through an encrypted
                            connection—like a secure tunnel that no one can see
                            inside.
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-green-200">
                            <div className="flex items-center gap-2 text-sm sm:text-base text-green-700">
                              <Shield className="w-5 h-5" />
                              <span className="font-medium">
                                Bank-level 256-bit encryption protects your data
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Step 3 */}
                    <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                          <EyeOff className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg mb-2">
                            Step 3: Anonymization
                          </h4>
                          <p className="text-sm sm:text-base text-gray-700 mb-3">
                            Before any analysis, your personal details are
                            completely removed. We only keep anonymous viewing
                            patterns.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-4 border border-amber-200">
                              <p className="text-sm font-medium text-gray-900 mb-1">
                                ✓ What We Keep:
                              </p>
                              <p className="text-sm text-gray-600">
                                Show titles, timestamps, household demographics
                              </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-amber-200">
                              <p className="text-sm font-medium text-gray-900 mb-1">
                                ✗ What We Remove:
                              </p>
                              <p className="text-sm text-gray-600">
                                Names, addresses, personal identifiers
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Sticky CTA */}
              <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
                <Button onClick={() => setShowVideoModal(false)} fullWidth className="h-12 text-base font-semibold">
                  Got it, close
                </Button>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>

      {/* PART 3: What to Expect - Route Map */}
      <div className="mb-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            What to Expect
          </h2>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.05
      }} className="mb-6">
          {/* Route Map */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-400 via-green-400 to-purple-400"></div>

              <div className="space-y-6 relative">
                {/* Stop 1: Today */}
                <div className="flex items-start gap-4">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0 shadow-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">Today</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        ~30 min
                      </span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Complete equipment setup with our step-by-step guide
                    </p>
                  </div>
                </div>

                {/* Stop 2: Calibration Call */}
                <div className="flex items-start gap-4">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">
                        Next: [Date]
                      </h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        Call
                      </span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Your Nielsen rep calls to calibrate and verify meters are
                      reading correctly
                    </p>
                  </div>
                </div>

                {/* Stop 3: You're Live */}
                <div className="flex items-start gap-4">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center shrink-0 shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">
                        You're Live!
                      </h3>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                        Ongoing
                      </span>
                    </div>
                    <p className="text-xs text-gray-700">
                      Watch TV normally, press your remote button, and earn
                      monthly rewards
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Your Contribution - Compact */}
          <Card className="bg-white border-gray-200 mt-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-xs mb-1">
                  Your Impact
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your viewing data contributes to Nielsen's national TV
                  ratings, helping shape the future of entertainment.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Sticky CTA */}
      <AnimatePresence>
        {showStickyCTA && <motion.div initial={{
        y: 100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} exit={{
        y: 100,
        opacity: 0
      }} transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }} className="fixed bottom-0 left-0 right-0 z-[60] px-4 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg flex items-center justify-center" style={{ paddingTop: '12px', paddingBottom: `calc(12px + env(safe-area-inset-bottom))`, minHeight: '72px' }}>
            <div className="max-w-4xl mx-auto w-full">
              <div className="relative">
                <span className="absolute -top-2 right-2 text-xs text-gray-500 font-medium bg-white px-2 py-0.5 rounded-full border border-gray-200">
                  ~30 min
                </span>
                <Button onClick={onStartSetup} fullWidth className="h-12 text-base font-semibold shadow-lg">
                  Let's Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
}