import React, { createContext, useContext, useRef, RefObject, useEffect } from 'react';

interface PhoneFrameContextType {
  scrollContainerRef: RefObject<HTMLDivElement> | null;
  isInFrame: boolean;
}

const PhoneFrameContext = createContext<PhoneFrameContextType>({
  scrollContainerRef: null,
  isInFrame: false,
});

export const usePhoneFrame = () => useContext(PhoneFrameContext);

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Add class to html element when phone frame is active (desktop view)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add('phone-frame-active');
      } else {
        document.documentElement.classList.remove('phone-frame-active');
      }
    };
    
    // Check initial state
    handleChange(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      document.documentElement.classList.remove('phone-frame-active');
    };
  }, []);

  return (
    <>
      {/* Mobile: Full width, no frame */}
      <PhoneFrameContext.Provider value={{ scrollContainerRef: null, isInFrame: false }}>
        <div className="md:hidden w-full">
          {children}
        </div>
      </PhoneFrameContext.Provider>

      {/* Desktop: iPhone 16 frame container */}
      <PhoneFrameContext.Provider value={{ scrollContainerRef, isInFrame: true }}>
        <div className="hidden md:flex min-h-screen bg-gray-900 items-center justify-center p-8">
          <div className="relative">
            {/* Phone Frame Outer Container */}
            <div className="relative w-[390px] h-[844px] max-h-[90vh] bg-gradient-to-b from-gray-800 to-black rounded-[3rem] p-[6px] shadow-[0_0_0_2px_rgba(0,0,0,0.1),0_20px_60px_rgba(0,0,0,0.5)]">
              {/* Bezel with subtle gradient - transform creates containing block for fixed children */}
              <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative border border-gray-900" style={{ transform: 'translateZ(0)' }}>
                {/* Notch Area - iPhone 16 style */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[1.5rem] z-10 flex items-center justify-center">
                  {/* Speaker grille */}
                  <div className="w-[54px] h-[6px] bg-gray-800 rounded-full"></div>
                </div>
                
                {/* Screen Content with safe area for notch - This is the positioning context */}
                <div 
                  ref={scrollContainerRef}
                  className="phone-frame-content w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent relative"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {/* Content wrapper - sticky elements will stick relative to this container */}
                  <div className="pt-[45px] min-h-full flex flex-col">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PhoneFrameContext.Provider>
    </>
  );
}

