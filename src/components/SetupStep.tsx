import React, { useState } from 'react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
export interface StepData {
  id: string;
  title: string;
  description: string;
  illustration: React.ReactNode;
  tip?: string;
  isVerificationStep?: boolean;
}
interface SetupStepProps {
  step: StepData;
  currentStepIndex: number;
  totalSteps: number;
  milestoneTitle?: string;
  isCompleted?: boolean;
  onNext: () => void;
  onBack: () => void;
  onClose?: () => void;
}
export function SetupStep({
  step,
  currentStepIndex,
  totalSteps,
  milestoneTitle,
  isCompleted = false,
  onNext,
  onBack,
  onClose
}: SetupStepProps) {
  const [showExitDialog, setShowExitDialog] = useState(false);
  const handleCloseClick = () => {
    // Skip warning dialog if task is already completed
    if (isCompleted && onClose) {
      onClose();
      return;
    }
    setShowExitDialog(true);
  };
  const handleContinue = () => {
    setShowExitDialog(false);
  };
  const handleComeLater = () => {
    setShowExitDialog(false);
    if (onClose) {
      onClose();
    }
  };
  return <>
      <div className="flex flex-col max-w-2xl mx-auto">
        {/* Modal Header - Like Equipment Modal */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between -mx-4 sm:-mx-6 -mt-6 mb-6 sm:mb-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all" aria-label="Go back">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {milestoneTitle || 'Setup'}
            </h2>
          </div>
          <button onClick={handleCloseClick} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all" aria-label="Close">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step.id} initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} transition={{
          duration: 0.3
        }} className="flex-1 flex flex-col pb-24">
            {/* Illustration Area */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 mb-6 sm:mb-8 flex items-center justify-center shadow-sm border border-gray-100 min-h-[240px] sm:min-h-[300px]">
              <div className="text-[#2D3748] scale-125 sm:scale-150">
                {step.illustration}
              </div>
            </div>

            {/* Instructions */}
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-[#2D3748] mb-3 sm:mb-4">
                {step.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                {step.description}
              </p>

              {step.tip && <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {step.tip}
                </div>}

              {/* Completed Task Message */}
              {isCompleted && <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm flex items-start gap-3 mt-4">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                  <p className="font-medium">
                    You've already completed this task! Great job! 🎉
                  </p>
                </motion.div>}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators - Above the button container */}
        <div className="fixed bottom-[100px] left-0 right-0 z-10 pb-safe">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-center gap-1.5">
              {Array.from({
              length: totalSteps
            }).map((_, i) => <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i <= currentStepIndex ? 'w-10 bg-[#4A90E2]' : 'w-2 bg-gray-200'}`} />)}
            </div>
          </div>
        </div>

        {/* Sticky Footer CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 z-10 flex items-center justify-center" style={{ paddingTop: '16px', paddingBottom: `calc(16px + env(safe-area-inset-bottom))`, minHeight: '76px' }}>
          <div className="max-w-2xl mx-auto w-full">
            <Button onClick={onNext} fullWidth className="text-base sm:text-lg h-12">
              {step.isVerificationStep ? 'Mark as Done' : 'Next'}
            </Button>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <AnimatePresence>
        {showExitDialog && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={handleContinue}>
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
        }} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Short on time?
                </h3>
                <p className="text-sm text-gray-600">
                  Your progress is saved. You can come back and continue
                  anytime.
                </p>
              </div>

              <div className="space-y-3">
                <Button onClick={handleComeLater} variant="secondary" fullWidth className="h-12">
                  Yes, I'll do this later
                </Button>
                <Button onClick={handleContinue} fullWidth className="h-12">
                  No, I can continue
                </Button>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </>;
}