import React, { useEffect, useState, useRef } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, Wifi, Shield, Lock, ArrowRight, Radio, Eye, EyeOff, Play, Clock } from 'lucide-react';
interface HowSystemWorksProps {
  onGetStarted: () => void;
}
export function HowSystemWorks({
  onGetStarted
}: HowSystemWorksProps) {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const step1Ref = useRef<HTMLDivElement>(null);
  // Debug: Log when state changes
  useEffect(() => {
    console.log('Sticky CTA state:', showStickyCTA);
  }, [showStickyCTA]);
  useEffect(() => {
    const handleScroll = () => {
      if (step1Ref.current) {
        const rect = step1Ref.current.getBoundingClientRect();
        // Header height is approximately 73px (py-4 = 16px top + 16px bottom + content)
        // Show sticky CTA when top of Step 1 crosses below the navbar
        const navbarHeight = 73;
        const shouldShow = rect.top < navbarHeight;
        console.log('Step 1 top position:', rect.top, 'Navbar height:', navbarHeight, 'Should show:', shouldShow);
        setShowStickyCTA(shouldShow);
      }
    };
    // Check immediately on mount
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="mb-8">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          How Your Nielsen System Works
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Simple, secure, and completely private
        </p>
      </motion.div>

      {/* Video/GIF Section */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.05
    }} className="mb-6">
        <Card className="overflow-hidden p-0 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          {/* Video Container */}
          <div className="relative aspect-video bg-gray-900 rounded-t-xl overflow-hidden">
            {/* Replace this with your actual video */}
            <video className="w-full h-full object-cover" autoPlay loop muted playsInline poster="/path-to-thumbnail.jpg">
              <source src="/path-to-your-video.mp4" type="video/mp4" />
              {/* Fallback for GIF */}
              <img src="/path-to-your-animation.gif" alt="How Nielsen System Works" className="w-full h-full object-cover" />
            </video>
          </div>

          {/* Caption */}
          <div className="p-4 text-center">
            <p className="text-sm text-gray-700 font-medium">
              Watch how your data flows securely from your home to Nielsen
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Data Collection Flow - with ref for scroll detection */}
      <motion.div ref={step1Ref} initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className="mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#4A90E2]" />
            Step 1: Data Collection
          </h3>

          <div className="space-y-4">
            {/* TV Viewing */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <Tv className="w-5 h-5 text-[#4A90E2]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">
                  TV Viewing Data
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  The Nano Meter listens for audio codes to identify what you're
                  watching. No cameras, no recording—just audio signatures.
                </p>
              </div>
            </div>

            {/* Streaming */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <Wifi className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">
                  Streaming Data
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  The Streaming Meter tracks what's streamed to your devices. It
                  only sees titles and timestamps—never your passwords or
                  personal browsing.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Secure Transmission */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }} className="mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600" />
            Step 2: Secure Transmission
          </h3>

          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              The Hub sends all data through an{' '}
              <span className="font-semibold text-green-700">
                encrypted connection
              </span>
              . Think of it like a secure tunnel—no one can see what's inside.
            </p>
            <div className="bg-white rounded-lg p-3 border border-green-200">
              <div className="flex items-center gap-2 text-xs text-green-700">
                <Shield className="w-4 h-4" />
                <span className="font-medium">
                  Bank-level 256-bit encryption
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Anonymization */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }} className="mb-6">
        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-amber-600" />
            Step 3: Anonymization
          </h3>

          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              Before any analysis, your personal details are{' '}
              <span className="font-semibold text-amber-700">
                completely removed
              </span>
              . We only keep anonymous viewing patterns.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg p-3 border border-amber-200">
                <p className="text-xs font-medium text-gray-900 mb-1">
                  What We Keep:
                </p>
                <p className="text-xs text-gray-600">
                  Show titles, timestamps, household demographics
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-200">
                <p className="text-xs font-medium text-gray-900 mb-1">
                  What We Remove:
                </p>
                <p className="text-xs text-gray-600">
                  Names, addresses, personal identifiers
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.4
    }} className="mb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center p-4">
            <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-900">Secure</p>
            <p className="text-xs text-gray-500 mt-1">Encrypted data</p>
          </Card>
          <Card className="text-center p-4">
            <EyeOff className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-900">Private</p>
            <p className="text-xs text-gray-500 mt-1">Anonymized</p>
          </Card>
          <Card className="text-center p-4">
            <Lock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-900">Protected</p>
            <p className="text-xs text-gray-500 mt-1">Never sold</p>
          </Card>
        </div>
      </motion.div>

      {/* Time Expectation Badge */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.45
    }} className="mb-4">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">
            Setup takes about 30 minutes
          </span>
        </div>
      </motion.div>

      {/* Sticky CTA - appears when scrolling past Step 2 */}
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
      }} className="fixed bottom-0 left-0 right-0 z-[60] p-4 pb-safe bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 shrink-0" />
                <span className="font-medium">~30 min setup</span>
              </div>
              <Button onClick={onGetStarted} className="flex-1 max-w-xs h-12 text-base font-semibold shadow-lg">
                Let's Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}