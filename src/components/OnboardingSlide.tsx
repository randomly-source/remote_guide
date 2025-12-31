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
    <div className="flex flex-col h-full px-4 pt-4 pb-2 max-w-md md:max-w-full mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center text-center"
      >
        <div className="mb-3 p-3 bg-blue-50 rounded-full">{icon}</div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
          {title}
        </h1>

        {description && (
          <p className="text-gray-600 text-base mb-4 leading-relaxed">
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