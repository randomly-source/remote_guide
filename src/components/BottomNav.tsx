import React from 'react';
import { Home, Clipboard, User, HelpCircle } from 'lucide-react';
import { usePhoneFrame } from './PhoneFrame';
type NavItem = 'home' | 'setup' | 'profile' | 'help';
interface BottomNavProps {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
}
export function BottomNav({
  active,
  onNavigate
}: BottomNavProps) {
  const { isInFrame } = usePhoneFrame();
  const items = [{
    id: 'home' as NavItem,
    icon: Home,
    label: 'Home'
  }, {
    id: 'setup' as NavItem,
    icon: Clipboard,
    label: 'Setup'
  }, {
    id: 'profile' as NavItem,
    icon: User,
    label: 'Profile'
  }, {
    id: 'help' as NavItem,
    icon: HelpCircle,
    label: 'Help'
  }];
  // When in frame, use sticky positioning to stick to bottom of scroll container
  // When on mobile, use fixed positioning relative to viewport
  return <nav className={isInFrame ? "sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50 mt-auto" : "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50"}>
      <div className="max-w-4xl md:max-w-full mx-auto px-2">
        <div className="flex items-center justify-around">
          {items.map(item => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return <button key={item.id} onClick={() => onNavigate(item.id)} className={`flex flex-col items-center py-3 px-4 min-w-[70px] transition-all touch-manipulation ${isActive ? 'text-[#4A90E2]' : 'text-gray-400'}`}>
                <Icon className={`w-6 h-6 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </button>;
        })}
        </div>
      </div>
    </nav>;
}