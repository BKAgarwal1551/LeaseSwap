
import React from 'react';
import { AppScreen } from '../types';

interface BottomNavProps {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const navItems = [
    { screen: AppScreen.DISCOVER, label: 'Discover', icon: 'explore' },
    { screen: AppScreen.MESSAGES, label: 'Messages', icon: 'chat_bubble' },
    { screen: AppScreen.PROFILE, label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="border-t border-gray-100 bg-white/80 pb-8 pt-3 backdrop-blur-lg dark:border-gray-800 dark:bg-background-dark/80">
      <div className="flex px-6">
        {navItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-1 flex-col items-center gap-1 transition-all ${
              activeScreen === item.screen ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <span className={`material-symbols-outlined text-[28px] ${activeScreen === item.screen ? 'filled-icon scale-110' : ''}`}>
              {item.icon}
            </span>
            <p className="text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
          </button>
        ))}
      </div>
      <div className="h-2"></div>
    </nav>
  );
};

export default BottomNav;
