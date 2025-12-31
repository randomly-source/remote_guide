import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingSlide } from '../components/OnboardingSlide';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmailOTP } from '../components/EmailOTP';
import { ShieldCheck, Users, Gift, Lock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingPageProps {
  onComplete: () => void;
}

export function OnboardingPage({
  onComplete
}: OnboardingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = 4; // Removed sign-up form slide
  // Autoplay carousel
  useEffect(() => {
    if (!isAutoplayPaused) {
      autoplayIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev < totalSlides - 1) {
            setDirection(1);
            return prev + 1;
          } else {
            // Loop back to first slide
            setDirection(1);
            return 0;
          }
        });
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isAutoplayPaused, totalSlides]);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
      setIsAutoplayPaused(true);
      // Resume autoplay after 10 seconds
      setTimeout(() => setIsAutoplayPaused(false), 10000);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
      setIsAutoplayPaused(true);
      // Resume autoplay after 10 seconds
      setTimeout(() => setIsAutoplayPaused(false), 10000);
    }
  };

  const handleEmailVerified = (email: string) => {
    // Store email in localStorage if needed
    localStorage.setItem('nielsen-user-email', email);
    onComplete();
  };
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  return (
    <div className="min-h-screen-safe bg-white flex flex-col">
      {/* Carousel Container */}
      <div className="flex-1 relative overflow-hidden pt-6 flex flex-col">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: 'spring',
                stiffness: 300,
                damping: 30
              },
              opacity: {
                duration: 0.2
              }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold && currentSlide > 0) {
                handlePrev();
              }
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Slide 1: Welcome */}
            {currentSlide === 0 && (
              <OnboardingSlide
                title="Your Voice Shapes What America Watches"
                description="Join thousands of households making an impact on the future of entertainment."
                icon={
                  <div className="w-12 h-12 bg-[#4A90E2] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <span className="text-white font-bold text-2xl">N</span>
                  </div>
                }
              />
            )}

            {/* Slide 2: Trust & Privacy */}
            {currentSlide === 1 && (
              <OnboardingSlide
                title="Your Privacy is Our Priority"
                description="We use bank-level encryption to keep your data 100% secure and confidential."
                icon={<ShieldCheck className="w-12 h-12 text-[#4A90E2]" />}
              >
                <div className="space-y-3 text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">
                      Bank-level encryption
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">
                      Never sell your personal data
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">
                      100% secure & confidential
                    </span>
                  </div>
                </div>
              </OnboardingSlide>
            )}

            {/* Slide 3: Impact */}
            {currentSlide === 2 && (
              <OnboardingSlide
                title="Join 40,000+ Households"
                description="Be part of a community that has shaped media for over 95 years."
                icon={<Users className="w-12 h-12 text-[#4A90E2]" />}
              >
                <div className="grid grid-cols-1 gap-2">
                  <Card className="bg-blue-50 border-blue-100 p-3">
                    <h3 className="font-bold text-sm text-gray-900">95+ Years</h3>
                    <p className="text-xs text-gray-600">
                      Of trusted research history
                    </p>
                  </Card>
                  <Card className="bg-purple-50 border-purple-100 p-3">
                    <h3 className="font-bold text-sm text-gray-900">Real Influence</h3>
                    <p className="text-xs text-gray-600">
                      Decide what shows get renewed
                    </p>
                  </Card>
                </div>
              </OnboardingSlide>
            )}

            {/* Slide 4: Rewards */}
            {currentSlide === 3 && (
              <OnboardingSlide
                title="Get Rewarded for Your Time"
                description="Earn monthly rewards and exclusive perks just for participating."
                icon={<Gift className="w-12 h-12 text-[#4A90E2]" />}
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#4A90E2] to-[#357ABD] p-4 text-white shadow-xl mb-3">
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white opacity-10 rounded-full blur-xl"></div>
                  <div className="relative z-10 text-center">
                    <p className="text-blue-100 text-sm font-medium mb-1">Earn up to</p>
                    <h2 className="text-3xl font-bold mb-1">$60</h2>
                    <p className="text-blue-100 text-sm">per month in rewards</p>
                  </div>
                </div>
                <div className="flex justify-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Easy setup
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Exclusive perks
                  </span>
                </div>
              </OnboardingSlide>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation and Progress Indicators - At bottom of carousel */}
        <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-4 z-10 px-4">
          {/* Previous Button - Left */}
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className={`w-10 h-8 rounded-md bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center transition-all ${
              currentSlide === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'opacity-100 hover:bg-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>

          {/* Progress Indicators - Centered */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-[#4A90E2]' 
                    : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Next Button - Right */}
          <button
            onClick={handleNext}
            disabled={currentSlide === totalSlides - 1}
            className={`w-10 h-8 rounded-md bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center transition-all ${
              currentSlide === totalSlides - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'opacity-100 hover:bg-white'
            }`}
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Email/OTP Section - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white pt-6 px-6 pb-12 pb-safe">
        <div className="max-w-md md:max-w-full mx-auto">
          <EmailOTP onVerified={handleEmailVerified} />
        </div>
      </div>
    </div>
  );
}