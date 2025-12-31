import React, { useEffect, useState, useRef } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { CheckCircle2, Circle, ChevronRight, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { setupTasksConfig, getIcon, MilestoneId } from '../utils/setupTasksConfig';
// Re-export MilestoneId for backward compatibility
export type { MilestoneId };
interface SetupJourneyProps {
  completedMilestones: MilestoneId[];
  tasksNeedingRecheck?: MilestoneId[];
  onSelectMilestone: (id: MilestoneId) => void;
}
export function SetupJourney({
  completedMilestones,
  tasksNeedingRecheck = [],
  onSelectMilestone
}: SetupJourneyProps) {
  // Debug: Log recheck tasks
  useEffect(() => {
    if (tasksNeedingRecheck.length > 0) {
      console.log('Tasks needing recheck:', tasksNeedingRecheck);
    }
  }, [tasksNeedingRecheck]);
  
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeMessage, setNudgeMessage] = useState('');
  const nextTaskRef = useRef<HTMLDivElement>(null);
  // Load milestones from JSON config
  const milestones = setupTasksConfig.milestones.map(milestone => ({
    id: milestone.id,
    title: milestone.title,
    subtitle: milestone.subtitle,
    icon: getIcon(milestone.iconType, 'w-7 h-7 sm:w-8 sm:h-8'),
    required: milestone.required
  }));
  
  // Add Validate Setup task at the end
  const validateTask = {
    id: 'validate-setup' as MilestoneId,
    title: 'Validate Setup',
    subtitle: 'Verify all meters are working',
    icon: getIcon('hub', 'w-7 h-7 sm:w-8 sm:h-8'), // Using hub icon as placeholder
    required: true
  };
  
  // Check if all regular tasks (excluding validate) are complete
  const regularMilestones = milestones.filter(m => m.required);
  const allRegularCompleted = regularMilestones.every(m => completedMilestones.includes(m.id));
  
  // Only show validate task if all regular tasks are complete
  const allMilestones = allRegularCompleted ? [...milestones, validateTask] : milestones;
  
  const requiredCount = allMilestones.filter(m => m.required).length;
  // Count only truly completed tasks (exclude those needing recheck)
  const completedRequiredCount = completedMilestones.filter(id => {
    const isRequired = allMilestones.find(m => m.id === id)?.required;
    const needsRecheck = tasksNeedingRecheck.includes(id);
    return isRequired && !needsRecheck;
  }).length;
  const progress = Math.round(completedRequiredCount / requiredCount * 100);
  
  // Find the next incomplete required task
  // If there are rechecks needed, those should be done first
  const nextTaskId = tasksNeedingRecheck.length > 0 
    ? tasksNeedingRecheck[0] // First task needing recheck
    : allMilestones.find(m => m.required && !completedMilestones.includes(m.id))?.id;
  const handleMilestoneClick = (milestoneId: MilestoneId) => {
    const isCompleted = completedMilestones.includes(milestoneId);
    const needsRecheck = tasksNeedingRecheck.includes(milestoneId);
    const isNextTask = milestoneId === nextTaskId;
    const milestoneIndex = allMilestones.findIndex(m => m.id === milestoneId);
    const nextTaskIndex = allMilestones.findIndex(m => m.id === nextTaskId);
    
    // Always allow clicking tasks that need recheck
    if (needsRecheck) {
      onSelectMilestone(milestoneId);
      return;
    }
    
    // Allow clicking completed tasks or the next task
    if (isCompleted || isNextTask) {
      onSelectMilestone(milestoneId);
    } else if (nextTaskIndex !== -1 && milestoneIndex > nextTaskIndex) {
      // User clicked a future task - show nudge
      const nextTask = allMilestones[nextTaskIndex];
      setNudgeMessage(`Please complete "${nextTask.title}" first`);
      setShowNudge(true);
      setTimeout(() => setShowNudge(false), 3000);
    } else {
      // All required tasks are done, allow clicking any remaining task
      onSelectMilestone(milestoneId);
    }
  };
  // Auto-scroll to next task when component mounts or completed milestones change
  useEffect(() => {
    if (nextTaskRef.current && nextTaskId) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        nextTaskRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  }, [completedMilestones, nextTaskId]);
  return <div className="max-w-2xl mx-auto pb-20">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#2D3748]">
            Your Setup Tasks
          </h2>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>~30 min</span>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-600">
          Complete these milestones to finish Phase 1.
        </p>

        {/* Progress Bar */}
        <div className="mt-5 sm:mt-6 bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
          <div className="bg-[#6FCF97] h-full transition-all duration-500 ease-out" style={{
          width: `${Math.min(progress, 100)}%`
        }} />
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 text-right font-medium">
          {completedRequiredCount} of {requiredCount} required tasks complete
        </p>
      </div>

      {/* Nudge Toast */}
      <AnimatePresence>
        {showNudge && <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} className="mb-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800 font-medium">{nudgeMessage}</p>
          </motion.div>}
      </AnimatePresence>

      <div className="space-y-3 sm:space-y-4">
        {allMilestones.map((milestone, index) => {
        const needsRecheck = tasksNeedingRecheck.includes(milestone.id);
        // If task needs recheck, it's not considered completed (even if it was before)
        const isCompleted = !needsRecheck && completedMilestones.includes(milestone.id);
        const isNextTask = milestone.id === nextTaskId && !needsRecheck;
        
        return <motion.div key={milestone.id} ref={isNextTask ? nextTaskRef : null} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }}>
              <Card 
                onClick={() => handleMilestoneClick(milestone.id)} 
                className={`relative overflow-visible transition-all ${
                  needsRecheck 
                    ? '!bg-blue-50 !border-blue-500 !border-2 cursor-pointer active:scale-[0.98] shadow-lg ring-2 ring-blue-300' 
                    : isCompleted 
                    ? 'bg-green-50 border-green-100 cursor-pointer active:scale-[0.98]' 
                    : isNextTask 
                    ? 'shadow-lg shadow-gray-300 cursor-pointer hover:shadow-xl hover:shadow-gray-400 active:scale-[0.98]' 
                    : 'cursor-pointer hover:border-blue-200 active:scale-[0.98]'
                }`}
              >
                {needsRecheck && (
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-20 shadow-lg border-2 border-blue-700 whitespace-nowrap">
                    Requires Recheck
                  </div>
                )}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${
                    needsRecheck 
                      ? '!bg-blue-500 !text-white ring-2 ring-blue-300' 
                      : isCompleted 
                      ? 'bg-white text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {milestone.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-base sm:text-lg ${
                      needsRecheck 
                        ? '!text-blue-900' 
                        : isCompleted 
                        ? 'text-green-800' 
                        : 'text-gray-900'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className={`text-xs sm:text-sm truncate ${
                      needsRecheck 
                        ? '!text-blue-800 !font-medium' 
                        : isCompleted 
                        ? 'text-green-600' 
                        : 'text-gray-500'
                    }`}>
                      {needsRecheck ? 'Incomplete - Requires Recheck' : milestone.subtitle}
                    </p>
                  </div>

                  <div className="text-gray-400 shrink-0">
                    {needsRecheck ? (
                      <div className="relative">
                        <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    ) : isCompleted ? (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-200 flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>;
      })}
      </div>
    </div>;
}