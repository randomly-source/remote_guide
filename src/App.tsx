import React, { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { SetupGuide } from './pages/SetupGuide';
import { OnboardingPage } from './pages/OnboardingPage';
import { BottomNav } from './components/BottomNav';
import { DetailsVerification } from './components/DetailsVerification';
import { EquipmentOverview } from './components/EquipmentOverview';
import { PhoneFrame } from './components/PhoneFrame';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { HelpCircle, Phone, MessageCircle, X } from 'lucide-react';
type View = 'home' | 'setup' | 'profile' | 'help';
export function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [anyModalOpen, setAnyModalOpen] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  // Check if onboarding was already completed
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('nielsen-onboarding-completed');
    if (onboardingCompleted === 'true') {
      setShowOnboarding(false);
    }
  }, []);
  const handleOnboardingComplete = () => {
    localStorage.setItem('nielsen-onboarding-completed', 'true');
    setShowOnboarding(false);
  };
  if (showOnboarding) {
    return <PhoneFrame>
      <OnboardingPage onComplete={handleOnboardingComplete} />
    </PhoneFrame>;
  }
  return <PhoneFrame>
    <div className="min-h-screen bg-[#F5F3F0] text-[#2D3748] font-sans selection:bg-blue-100 flex flex-col">
      {/* Header - only show on home page */}
      {currentView === 'home' && <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-4xl md:max-w-full mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <button onClick={() => setCurrentView('home')} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#4A90E2] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div>
                <div className="font-bold text-lg tracking-tight">Nielsen</div>
              </div>
            </button>
          </div>
        </header>}

      {/* Main Content */}
      <main className="max-w-4xl md:max-w-full mx-auto px-4 sm:px-6 py-6">
        {currentView === 'home' && <div className="pb-32">
            <HomePage onStartSetup={() => setCurrentView('setup')} onViewEquipment={() => setShowEquipmentModal(true)} onViewProfile={() => setCurrentView('profile')} onModalStateChange={setAnyModalOpen} onStickyCTAChange={setShowStickyCTA} />
          </div>}

        {currentView === 'setup' && <SetupGuide onModalStateChange={setAnyModalOpen} />}

        {currentView === 'profile' && <div className="pb-24">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Your Profile
            </h1>
            <DetailsVerification />
          </div>}

        {currentView === 'help' && <div className="pb-24">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Need Help?
            </h1>
            <p className="text-gray-600 mb-6">
              We're here to support you every step of the way.
            </p>

            <div className="space-y-4">
              <Card className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#4A90E2]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Speak with a Nielsen specialist right now.
                  </p>
                  <Button variant="secondary" className="text-sm">
                    1-800-NIELSEN
                  </Button>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Live Chat</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Get instant answers to your questions.
                  </p>
                  <Button variant="secondary" className="text-sm">
                    Start Chat
                  </Button>
                </div>
              </Card>

              <Card className="bg-amber-50 border-amber-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  Quick Tip
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Short on time? Click "Save Progress" on any setup screen.
                  We'll text you a link to pick up exactly where you left off.
                </p>
              </Card>
            </div>
          </div>}
      </main>

      {/* Equipment Modal */}
      {showEquipmentModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#F5F3F0] w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-xl font-bold text-gray-900">
                What's in the Box?
              </h2>
              <button onClick={() => setShowEquipmentModal(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <EquipmentOverview />
            </div>

            {/* Sticky CTA */}
            <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
              <Button onClick={() => setShowEquipmentModal(false)} fullWidth className="h-12 text-base font-semibold">
                Got it, close
              </Button>
            </div>
          </div>
        </div>}

      {/* Bottom Navigation - Always show on setup page, otherwise hide when modals/sticky CTA are showing */}
      {(currentView === 'setup' || (!showEquipmentModal && !anyModalOpen && !showStickyCTA)) && <BottomNav active={currentView} onNavigate={setCurrentView} />}
    </div>
  </PhoneFrame>;
}