import React, { useEffect, useState, useRef } from 'react';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { HowItWorks } from '../components/HowItWorks';
import { EquipmentOverview } from '../components/EquipmentOverview';
import { SetupJourney } from '../components/SetupJourney';
import { SetupStep, StepData } from '../components/SetupStep';
import { Phase2Preview } from '../components/Phase2Preview';
import { AppreciationMessage } from '../components/AppreciationMessage';
import { EvaluationScreen } from '../components/EvaluationScreen';
import { RecheckStep } from '../components/RecheckStep';
import { RecheckConfirmStep } from '../components/RecheckConfirmStep';
import { ValidateSetupStep } from '../components/ValidateSetupStep';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Package, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { setupTasksConfig, getIllustration, getMilestoneOrder, MilestoneId } from '../utils/setupTasksConfig';
// Convert JSON config to StepData format with React components
function getStepsForMilestone(milestoneId: MilestoneId): StepData[] {
  const milestone = setupTasksConfig.milestones.find(m => m.id === milestoneId);
  if (!milestone) return [];
  const regularSteps = milestone.steps.map(step => ({
    id: step.id,
    title: step.title,
    description: step.description,
    illustration: getIllustration(step.illustrationType),
    tip: step.tip,
    isVerificationStep: false
  }));
  
  // Add verification step at the end
  const verificationStep: StepData = {
    id: `${milestoneId}-verification`,
    title: 'Verify Your Setup',
    description: 'Take a moment to verify that everything looks correct. Compare your setup with the image below to ensure everything is properly connected and positioned.',
    illustration: (
      <div className="flex flex-col items-center gap-4">
        {getIllustration(milestone.iconType)}
        <div className="text-sm text-gray-500 font-medium mt-2">
          Final Setup View
        </div>
      </div>
    ),
    isVerificationStep: true
  };
  
  return [...regularSteps, verificationStep];
}
type ViewState = 'journey' | 'step' | 'phase2' | 'evaluation' | 'recheck' | 'recheck-confirm' | 'final-support' | 'validate-setup';
type TransitionState = 'none' | 'celebrating' | 'loading';
export function SetupGuide({
  onModalStateChange
}: {
  onModalStateChange: (isOpen: boolean) => void;
}) {
  // Start directly at journey (removed 'equipment' view)
  const [view, setView] = useState<ViewState>('journey');
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [completedMilestones, setCompletedMilestones] = useState<MilestoneId[]>([]);
  const [tasksNeedingRecheck, setTasksNeedingRecheck] = useState<MilestoneId[]>([]);
  const [currentRecheckIndex, setCurrentRecheckIndex] = useState(0);
  const [hasValidatedOnce, setHasValidatedOnce] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<MilestoneId | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showAppreciation, setShowAppreciation] = useState(false);
  const [lastCompletedCount, setLastCompletedCount] = useState(0);
  const [transitionState, setTransitionState] = useState<TransitionState>('none');
  const [completedMilestoneName, setCompletedMilestoneName] = useState<string>('');
  const [nextMilestoneInfo, setNextMilestoneInfo] = useState<{ id: MilestoneId | null; title: string }>({ id: null, title: '' });
  const [currentAppreciationPhrase, setCurrentAppreciationPhrase] = useState<string>('');
  const [isLastTask, setIsLastTask] = useState<boolean>(false);
  const phraseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const phraseIndexRef = useRef<number>(0);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Appreciative phrases to rotate through
  const appreciationPhrases = [
    "You are doing amazing!",
    "Keep up the fantastic work!",
    "You're making great progress!",
    "You're on a roll!",
    "You've got this!",
    "You're crushing it!",
    "Way to go!",
    "You're doing great!",
    "Keep it up!",
    "You're unstoppable!"
  ];
  // Load progress from local storage
  useEffect(() => {
    const saved = localStorage.getItem('nielsen-setup-progress');
    if (saved) {
      const milestones = JSON.parse(saved);
      setCompletedMilestones(milestones);
      setLastCompletedCount(milestones.length);
    }
  }, []);
  // Save progress
  useEffect(() => {
    localStorage.setItem('nielsen-setup-progress', JSON.stringify(completedMilestones));
  }, [completedMilestones]);
  // Notify parent when modal state changes (equipment modal OR any step/modal view)
  useEffect(() => {
    const modalViews: ViewState[] = ['step', 'validate-setup', 'evaluation', 'recheck-confirm', 'recheck', 'final-support'];
    const isModalOpen = showEquipmentModal || modalViews.includes(view);
    onModalStateChange(isModalOpen);
  }, [showEquipmentModal, view, onModalStateChange]);
  
  // Ensure modal state is reset when view is journey (explicit check)
  useEffect(() => {
    if (view === 'journey' && !showEquipmentModal) {
      onModalStateChange(false);
    }
  }, [view, showEquipmentModal, onModalStateChange]);
  const handleStartMilestone = (id: MilestoneId) => {
    // Handle Validate Setup task
    if (id === 'validate-setup') {
      setView('validate-setup');
      return;
    }
    
    // Check if this task needs recheck - if so, show recheck confirmation step
    if (tasksNeedingRecheck.includes(id)) {
      setCurrentMilestone(id);
      // Show only the last verification step for recheck
      const steps = getStepsForMilestone(id);
      setCurrentStepIndex(steps.length - 1); // Last step is verification
      setView('recheck-confirm');
    } else {
      setCurrentMilestone(id);
      setCurrentStepIndex(0);
      setView('step');
    }
  };
  const handleStepNext = () => {
    if (!currentMilestone) return;
    const steps = getStepsForMilestone(currentMilestone);
    const currentStep = steps[currentStepIndex];
    
    // If this is the verification step, mark task as complete
    if (currentStep?.isVerificationStep) {
      // Mark milestone as complete when verification step is confirmed
      if (!completedMilestones.includes(currentMilestone)) {
        // Mark task as complete
        setCompletedMilestones(prev => [...prev, currentMilestone]);
        
        // Check if all regular tasks are complete (excluding validate-setup)
        const milestoneOrder = getMilestoneOrder();
        const regularMilestones = setupTasksConfig.milestones.filter(m => m.required);
        const updatedCompleted = [...completedMilestones, currentMilestone];
        const allRegularCompleted = regularMilestones.every(m => updatedCompleted.includes(m.id));
        
        if (allRegularCompleted) {
          // All regular tasks complete - return to journey to show validate setup task
          setView('journey');
          return;
        }
        
        // Not the last task - show celebration and transition
        setCompletedMilestoneName(getMilestoneTitle(currentMilestone));
        
        // Calculate next milestone info (reuse updatedCompleted from above)
        const nextMilestone = milestoneOrder.find(id => !updatedCompleted.includes(id));
        const isLastTaskCompleted = !nextMilestone;
        
        // Store next milestone info for transition display
        if (nextMilestone) {
          setNextMilestoneInfo({
            id: nextMilestone,
            title: getMilestoneTitle(nextMilestone)
          });
        } else {
          setNextMilestoneInfo({ id: null, title: '' });
        }
        setIsLastTask(isLastTaskCompleted);
        
        // Start celebration sequence
        setTransitionState('celebrating');
        
        // After 1.5s, show loader
        setTimeout(() => {
          setTransitionState('loading');
          // Start rotating appreciation phrases
          phraseIndexRef.current = 0;
          setCurrentAppreciationPhrase(appreciationPhrases[0]);
          phraseIntervalRef.current = setInterval(() => {
            phraseIndexRef.current = (phraseIndexRef.current + 1) % appreciationPhrases.length;
            setCurrentAppreciationPhrase(appreciationPhrases[phraseIndexRef.current]);
          }, 2000);
          
          // After 15s more, load next task or return to journey
          transitionTimeoutRef.current = setTimeout(() => {
            handleTransitionComplete(nextMilestone);
          }, 15000);
        }, 1500);
      } else {
        // Already completed, just return to journey
        setView('journey');
        setCurrentMilestone(null);
      }
      return;
    }
    
    // Regular step - just move to next step
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // This shouldn't happen, but handle it gracefully
      setView('journey');
      setCurrentMilestone(null);
    }
  };
  
  // Cleanup interval and timeout on unmount or when transition state changes
  useEffect(() => {
    return () => {
      if (phraseIntervalRef.current) {
        clearInterval(phraseIntervalRef.current);
        phraseIntervalRef.current = null;
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
    };
  }, []);
  // Track when we return to journey to show appreciation
  useEffect(() => {
    if (view === 'journey' && completedMilestones.length > lastCompletedCount) {
      setLastCompletedCount(completedMilestones.length);
    }
  }, [view, completedMilestones.length, lastCompletedCount]);
  // Scroll to top when returning to journey view to show progress indicators
  useEffect(() => {
    if (view === 'journey') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [view]);
  const handleStepBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      setView('journey');
      setCurrentMilestone(null);
    }
  };
  const handleStepClose = () => {
    setView('journey');
    setCurrentMilestone(null);
  };
  
  // Handle transition completion (either auto or manual)
  const handleTransitionComplete = (nextMilestone: MilestoneId | undefined) => {
    if (phraseIntervalRef.current) {
      clearInterval(phraseIntervalRef.current);
      phraseIntervalRef.current = null;
    }
    setTransitionState('none');
    setCurrentAppreciationPhrase('');
    setIsLastTask(false);
    if (nextMilestone) {
      // Auto-load next task
      setCurrentMilestone(nextMilestone);
      setCurrentStepIndex(0);
      // Stay in 'step' view
    } else {
      // All tasks complete, return to journey and close modal
      setView('journey');
      setCurrentMilestone(null);
      setShowAppreciation(true);
      setTimeout(() => {
        setShowAppreciation(false);
      }, 6000);
    }
  };
  
  // Handle "catch a breather" button click
  const handleCatchBreather = () => {
    // Clear the auto-transition timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    // Clear the phrase interval
    if (phraseIntervalRef.current) {
      clearInterval(phraseIntervalRef.current);
      phraseIntervalRef.current = null;
    }
    // Return to journey view
    setTransitionState('none');
    setCurrentAppreciationPhrase('');
    setIsLastTask(false);
    setView('journey');
    setCurrentMilestone(null);
  };
  // Helper function to get milestone title
  const getMilestoneTitle = (id: MilestoneId): string => {
    if (id === 'validate-setup') {
      return 'Validate Setup';
    }
    const milestone = setupTasksConfig.milestones.find(m => m.id === id);
    return milestone?.title || '';
  };
  // Check if all required milestones are done
  const allRequiredDone = setupTasksConfig.milestones.filter(m => m.required).every(m => completedMilestones.includes(m.id));
  useEffect(() => {
    if (view === 'journey' && allRequiredDone) {
      // Could auto-advance to phase2 or show completion button
    }
  }, [view, allRequiredDone]);
  return <div className="pb-12">
      {view === 'journey' && <div className="space-y-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Let's Get You Set Up
            </h1>

            {/* Engaging intro card */}
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4A90E2] flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">
                      You should receive a shipment from Nielsen
                    </h3>
                    {/* Time Badge */}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    Unbox it and follow along with the simple steps below. It's
                    easy—you've got this! 💪
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-medium">
                      Each task takes just a few minutes
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Time Expectation */}
          </div>

          {/* Equipment Preview Card - Opens Modal */}
          <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }}>
            <button onClick={() => setShowEquipmentModal(true)} className="w-full group">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 cursor-pointer hover:shadow-lg transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#4A90E2] flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 text-sm mb-0.5">
                        What's in Your Box
                      </h3>
                      <p className="text-xs text-gray-600">
                        Peek inside to see what you should have received
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#4A90E2] group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </button>
          </motion.div>

          {/* Appreciation Message - appears after completing a milestone or choosing Sarah help */}
          <AnimatePresence>
            {showAppreciation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Thank you for all your effort! 🙏
                    </h3>
                    <p className="text-gray-700">
                      We really appreciate the time and care you've put into this. Sarah will help you get everything sorted during the call.
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <SetupJourney completedMilestones={completedMilestones} tasksNeedingRecheck={tasksNeedingRecheck} onSelectMilestone={handleStartMilestone} />
        </div>}

      {view === 'step' && currentMilestone && <>
          {getStepsForMilestone(currentMilestone)?.[currentStepIndex] && transitionState === 'none' && <SetupStep step={getStepsForMilestone(currentMilestone)[currentStepIndex]} currentStepIndex={currentStepIndex} totalSteps={getStepsForMilestone(currentMilestone).length} milestoneTitle={getMilestoneTitle(currentMilestone)} isCompleted={completedMilestones.includes(currentMilestone)} onNext={handleStepNext} onBack={handleStepBack} onClose={handleStepClose} />}

          {/* Milestone Completion Celebration & Loader */}
          <AnimatePresence>
            {transitionState === 'celebrating' && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-white z-[80] flex flex-col items-center justify-center px-4">
                <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.1,
            type: 'spring',
            stiffness: 400,
            damping: 20
          }} className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-[#6FCF97]" />
                </motion.div>
                <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
                  {completedMilestoneName} Complete!
                </motion.h2>
                <motion.p initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.3
          }} className="text-gray-600 text-lg text-center">
                  Great work! 🎉
                </motion.p>
              </motion.div>}

            {transitionState === 'loading' && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-white z-[80] flex flex-col items-center justify-center px-4">
                <div className="max-w-md w-full">
                  {/* Next Task Name or Congratulations */}
                  {isLastTask ? <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className="text-center mb-8">
                      <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 400,
                  damping: 20
                }} className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6FCF97] to-[#4A90E2] flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </motion.div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        🎉 Congratulations! 🎉
                      </h2>
                      <p className="text-lg sm:text-xl text-gray-700 font-medium">
                        You've completed all setup tasks!
                      </p>
                      <p className="text-base sm:text-lg text-gray-600 mt-2">
                        Your setup is now complete. Thank you for your patience and attention to detail!
                      </p>
                    </motion.div> : nextMilestoneInfo.title && <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className="text-center mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Next Task
                      </h2>
                      <p className="text-xl sm:text-2xl text-[#4A90E2] font-semibold">
                        {nextMilestoneInfo.title}
                      </p>
                    </motion.div>}

                  {/* Progress Bar Container */}
                  <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="w-full mb-6">
                      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div initial={{
                  width: '0%'
                }} animate={{
                  width: '100%'
                }} transition={{
                  duration: 15,
                  ease: 'easeInOut'
                }} className="bg-gradient-to-r from-[#4A90E2] to-[#6FCF97] h-full rounded-full" />
                      </div>
                    </motion.div>

                  {/* Appreciation Phrase */}
                  <div className="text-center mb-6 min-h-[60px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {currentAppreciationPhrase && <motion.p key={currentAppreciationPhrase} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: -10
                }} transition={{
                  duration: 0.4
                }} className="text-lg sm:text-xl text-gray-700 font-medium">
                          {currentAppreciationPhrase}
                        </motion.p>}
                    </AnimatePresence>
                  </div>

                  {/* Loading Spinner */}
                  <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.3
            }} className="flex justify-center mb-6">
                      <div className="w-12 h-12 relative">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                        <motion.div animate={{
                  rotate: 360
                }} transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear'
                }} className="absolute inset-0 rounded-full border-4 border-[#4A90E2] border-t-transparent"></motion.div>
                      </div>
                    </motion.div>

                  {/* Catch a Breather Button - Only show when there's a next task */}
                  {!isLastTask && nextMilestoneInfo.title && <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }} className="flex justify-center">
                      <Button onClick={handleCatchBreather} variant="secondary" className="text-base font-medium">
                        Let me catch a breather
                      </Button>
                    </motion.div>}
                </div>
              </motion.div>}
          </AnimatePresence>
        </>}

      {view === 'phase2' && <Phase2Preview />}

      {view === 'validate-setup' && <ValidateSetupStep
        onValidate={() => {
          setView('evaluation');
        }}
        onBack={() => setView('journey')}
        onClose={() => setView('journey')}
      />}

      {view === 'evaluation' && <EvaluationScreen 
        hasValidatedOnce={hasValidatedOnce}
        onComplete={(recheckTasks, isFullSuccess) => {
          if (isFullSuccess) {
            // Full success - mark validate as complete
            setCompletedMilestones(prev => [...prev, 'validate-setup']);
            setTasksNeedingRecheck([]);
            setView('journey');
            setShowAppreciation(true);
            setTimeout(() => {
              setShowAppreciation(false);
            }, 6000);
          } else if (recheckTasks && recheckTasks.length > 0 && !hasValidatedOnce) {
            // First time with rechecks needed
            console.log('Setting recheck tasks:', recheckTasks);
            setTasksNeedingRecheck(recheckTasks);
            setHasValidatedOnce(true);
            // Remove validate-setup from completed (needs to be rerun)
            // Also remove recheck tasks from completed so they show as needing recheck
            setCompletedMilestones(prev => {
              const filtered = prev.filter(id => id !== 'validate-setup' && !recheckTasks.includes(id));
              console.log('Updated completed milestones (removed recheck tasks):', filtered);
              return filtered;
            });
            setView('journey');
          } else if (recheckTasks && recheckTasks.length > 0 && hasValidatedOnce) {
            // Second time still failing - show final support
            setView('final-support');
          }
        }}
        onSeeTasks={() => {
          setView('journey');
        }}
      />}

      {view === 'recheck-confirm' && currentMilestone && (
        (() => {
          const steps = getStepsForMilestone(currentMilestone);
          const verificationStep = steps[steps.length - 1]; // Last step is verification
          return (
            <RecheckConfirmStep
              milestoneId={currentMilestone}
              step={verificationStep}
              milestoneTitle={getMilestoneTitle(currentMilestone)}
              onConfirm={() => {
                // Mark task as complete (add to completed milestones and remove from recheck list)
                setCompletedMilestones(prev => {
                  if (!prev.includes(currentMilestone)) {
                    return [...prev, currentMilestone];
                  }
                  return prev;
                });
                const updatedRechecks = tasksNeedingRecheck.filter(id => id !== currentMilestone);
                setTasksNeedingRecheck(updatedRechecks);
                
                // Check if all rechecks are done
                if (updatedRechecks.length === 0) {
                  // All rechecks done - ensure validate-setup is not completed (needs to be rerun)
                  setCompletedMilestones(prev => prev.filter(id => id !== 'validate-setup'));
                  // Automatically show Validate Setup step
                  setView('validate-setup');
                } else {
                  // Automatically show next recheck task
                  const nextTaskId = updatedRechecks[0]; // Get first remaining task
                  setCurrentMilestone(nextTaskId);
                  const nextSteps = getStepsForMilestone(nextTaskId);
                  setCurrentStepIndex(nextSteps.length - 1);
                  // Stay in recheck-confirm view for next task
                }
              }}
              onBack={() => setView('journey')}
              onClose={() => setView('journey')}
            />
          );
        })()
      )}

      {view === 'recheck' && tasksNeedingRecheck.length > 0 && (
        <RecheckStep
          milestoneId={tasksNeedingRecheck[currentRecheckIndex]}
          currentIndex={currentRecheckIndex}
          totalTasks={tasksNeedingRecheck.length}
          onConfirm={() => {
            if (currentRecheckIndex < tasksNeedingRecheck.length - 1) {
              // Move to next recheck task
              setCurrentRecheckIndex(prev => prev + 1);
            } else {
              // All rechecks done - rerun evaluation
              setHasDoneRecheck(true);
              setView('evaluation');
            }
          }}
          onBack={() => {
            if (currentRecheckIndex > 0) {
              setCurrentRecheckIndex(prev => prev - 1);
            } else {
              setView('journey');
            }
          }}
          onClose={() => setView('journey')}
        />
      )}

      {view === 'final-support' && (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 border-2 p-8 sm:p-12">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#4A90E2]" />
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Don't worry, you've done more than we could ask for! 🙌
                </h2>

                <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-lg mx-auto leading-relaxed">
                  Sometimes technology needs a little extra help, and that's completely okay. We're here to support you every step of the way.
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      // Reset and try one more time
                      setHasValidatedOnce(false);
                      setTasksNeedingRecheck([]);
                      setCurrentRecheckIndex(0);
                      setView('journey');
                    }}
                    variant="primary"
                    fullWidth
                    className="h-12 text-base sm:text-lg font-semibold"
                  >
                    I will give this another try
                  </Button>
                  <Button
                    onClick={() => {
                      // Show thanks message and return to journey
                      setShowAppreciation(true);
                      setView('journey');
                      setTimeout(() => {
                        setShowAppreciation(false);
                      }, 6000);
                    }}
                    variant="secondary"
                    fullWidth
                    className="h-12 text-base sm:text-lg font-semibold"
                  >
                    Let me get back to this later
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Equipment Modal */}
      <AnimatePresence>
        {showEquipmentModal && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowEquipmentModal(false)}>
            <motion.div initial={{
          scale: 0.9,
          opacity: 0,
          y: 20
        }} animate={{
          scale: 1,
          opacity: 1,
          y: 0
        }} exit={{
          scale: 0.9,
          opacity: 0,
          y: 20
        }} transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }} className="bg-[#F5F3F0] w-full sm:max-w-3xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <h2 className="text-xl font-bold text-gray-900">
                  What's in the Box?
                </h2>
                <button onClick={() => setShowEquipmentModal(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <EquipmentOverview />
              </div>

              {/* Sticky CTA */}
              <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
                <Button onClick={() => setShowEquipmentModal(false)} fullWidth className="h-12 text-base font-semibold">
                  Got it, close
                </Button>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}