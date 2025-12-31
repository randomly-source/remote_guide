import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
interface OnboardingSlideProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  isLastSlide?: boolean;
}
export function OnboardingSlide({
  title,
  description,
  icon,
  children,
  ctaText,
  onCtaClick,
  secondaryCtaText,
  onSecondaryCtaClick,
  isLastSlide = false
}: OnboardingSlideProps) {
  return (
    <div className="flex flex-col h-full px-6 pt-8 pb-4 max-w-md mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center text-center"
      >
        <div className="mb-6 p-6 bg-blue-50 rounded-full">{icon}</div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h1>

        {description && (
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {description}
          </p>
        )}

        <div className="w-full">{children}</div>
      </motion.div>

      {(ctaText || secondaryCtaText) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-auto w-full space-y-3 pt-6"
        >
          {ctaText && onCtaClick && (
            <Button
              onClick={onCtaClick}
              fullWidth
              className="h-14 text-lg shadow-lg shadow-blue-100"
            >
              {ctaText}
            </Button>
          )}

          {secondaryCtaText && onSecondaryCtaClick && (
            <Button
              onClick={onSecondaryCtaClick}
              variant="ghost"
              fullWidth
              className="text-gray-500 font-normal"
            >
              {secondaryCtaText}
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}