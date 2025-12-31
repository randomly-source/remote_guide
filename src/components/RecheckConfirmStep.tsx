import React from 'react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { StepData } from './SetupStep';
import { getMilestoneById, MilestoneId } from '../utils/setupTasksConfig';

interface RecheckConfirmStepProps {
  milestoneId: MilestoneId;
  step: StepData;
  milestoneTitle: string;
  onConfirm: () => void;
  onBack: () => void;
  onClose?: () => void;
}

export function RecheckConfirmStep({
  milestoneId,
  step,
  milestoneTitle,
  onConfirm,
  onBack,
  onClose
}: RecheckConfirmStepProps) {
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
              {milestoneTitle}
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
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col pb-24"
        >
          {/* Illustration Area */}
          {step.illustration && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 mb-6 sm:mb-8 flex items-center justify-center shadow-sm border border-gray-100 min-h-[240px] sm:min-h-[300px]">
              <div className="text-[#2D3748] scale-125 sm:scale-150">
                {step.illustration}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2D3748] mb-3 sm:mb-4">
              {step.title}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
              {step.description}
            </p>
          </div>
        </motion.div>

        {/* Sticky Footer CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe z-10">
          <div className="max-w-2xl mx-auto">
            <Button onClick={onConfirm} fullWidth className="text-base sm:text-lg h-12">
              Mark Verified
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

