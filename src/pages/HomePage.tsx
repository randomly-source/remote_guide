import React, { useEffect, useState } from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { ProgressBasedHero } from '../components/ProgressBasedHero';
import { CompactHomeSections } from '../components/CompactHomeSections';
import { PRSProfile } from '../components/PRSProfile';
import { RewardCard } from '../components/RewardCard';
import { motion } from 'framer-motion';
interface HomePageProps {
  onStartSetup: () => void;
  onViewEquipment: () => void;
  onViewProfile: () => void;
  onModalStateChange: (isOpen: boolean) => void;
  onStickyCTAChange?: (isShowing: boolean) => void;
}
export function HomePage({
  onStartSetup,
  onViewEquipment,
  onViewProfile,
  onModalStateChange,
  onStickyCTAChange
}: HomePageProps) {
  const [hasProgress, setHasProgress] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('nielsen-setup-progress');
    if (saved) {
      const milestones = JSON.parse(saved);
      setHasProgress(milestones.length > 0);
    }
  }, []);
  return <div className="pb-32">
      {/* Hero - Show progress-based hero if user has started, otherwise show carousel */}
      <ProgressBasedHero onContinueSetup={onStartSetup} />
      {!hasProgress && <HeroCarousel />}

      {/* Divider */}
      <div className="my-8 border-t border-gray-200"></div>

      {/* All Three Sections - Compact Version */}
      <CompactHomeSections onStartSetup={onStartSetup} onModalStateChange={onModalStateChange} onStickyCTAChange={onStickyCTAChange} />

      {/* Optional: Your Specialist - Can be removed if too long */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className="mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
          Your Personal Specialist
        </h3>
        <PRSProfile />
      </motion.div>
    </div>;
}