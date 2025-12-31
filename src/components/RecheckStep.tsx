import React from 'react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { StepData } from './SetupStep';
import { getIllustration, getMilestoneById, MilestoneId } from '../utils/setupTasksConfig';

interface RecheckStepProps {
  milestoneId: MilestoneId;
  currentIndex: number;
  totalTasks: number;
  onConfirm: () => void;
  onBack: () => void;
  onClose?: () => void;
}

const recheckMessages = [
  "Check if your setup looks like this and the power is on as it should be",
  "Take a quick look - does everything match this setup and are the lights/power indicators on?",
  "Quick check: Does your setup match this image and are all power indicators showing?",
  "Just verify your setup looks like this and all the power connections are active",
  "Double-check: Does your setup match this and are the power indicators on?"
];

export function RecheckStep({
  milestoneId,
  currentIndex,
  totalTasks,
  onConfirm,
  onBack,
  onClose
}: RecheckStepProps) {
  const milestoneConfig = getMilestoneById(milestoneId);
  const milestone = milestoneConfig?.title || 'Setup';
  const illustration = milestoneConfig ? getIllustration(milestoneConfig.iconType) : null;
  const message = recheckMessages[currentIndex % recheckMessages.length];

  return (
    <>
      <div className="flex flex-col max-w-2xl mx-auto">
        {/* Modal Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between -mx-4 sm:-mx-6 -mt-6 mb-6 sm:mb-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all" aria-label="Go back">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Quick Recheck
            </h2>
          </div>
          {onClose && (
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all" aria-label="Close">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col pb-24"
        >
          {/* Progress indicator */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Task {currentIndex + 1} of {totalTasks}
            </p>
            <div className="flex gap-1.5">
              {Array.from({ length: totalTasks }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i <= currentIndex ? 'w-10 bg-[#4A90E2]' : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Encouraging message */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
            <p className="text-base text-blue-900 font-medium">
              You've done all the hard work! 💪 Sometimes hardware just decides not to play along - let's do a quick check.
            </p>
          </div>

          {/* Illustration Area */}
          {illustration && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 mb-6 sm:mb-8 flex items-center justify-center shadow-sm border border-gray-100 min-h-[240px] sm:min-h-[300px]">
              <div className="text-[#2D3748] scale-125 sm:scale-150">
                {illustration}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2D3748] mb-3 sm:mb-4">
              {milestone}
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 font-medium">
              {message}
            </p>
          </div>
        </motion.div>

        {/* Sticky Footer CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe z-10">
          <div className="max-w-2xl mx-auto">
            <Button onClick={onConfirm} fullWidth className="text-base sm:text-lg h-12">
              Yes, looks alright now!
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

