
import React from 'react';
import { AppScreen } from '../types';

interface MatchFoundProps {
  onNavigate: (screen: AppScreen) => void;
}

const MatchFoundScreen: React.FC<MatchFoundProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden font-display">
      <div className="flex items-center p-6 justify-between">
        <div className="w-10"></div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-center">Match Found</h2>
        <div className="flex w-10 items-center justify-end">
          <button onClick={() => onNavigate(AppScreen.DISCOVER)} className="flex items-center justify-center rounded-full h-10 w-10 bg-white/80 dark:bg-slate-800/50 border border-slate-200">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 items-center justify-center px-8">
        <div className="flex items-center justify-center mb-12">
          <div className="relative flex items-center">
            <div className="z-10">
              <div 
                className="size-36 rounded-full border-[6px] border-white dark:border-slate-800 bg-cover shadow-xl" 
                style={{ backgroundImage: 'url("https://picsum.photos/seed/user1/200")' }} 
              />
            </div>
            <div className="-ml-10 z-20">
              <div 
                className="size-36 rounded-full border-[6px] border-white dark:border-slate-800 bg-cover shadow-xl" 
                style={{ backgroundImage: 'url("https://picsum.photos/seed/user2/200")' }} 
              />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white p-2.5 rounded-full shadow-lg border-2 border-white">
              <span className="material-symbols-outlined text-lg block">swap_horiz</span>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-4">It's a Match</h2>
        <p className="text-slate-500 text-[15px] text-center mb-14 px-4 leading-relaxed">
          A mutual interest has been established. You can now propose a formal viewing or start a discussion.
        </p>

        <div className="w-full max-w-[340px] space-y-4">
          <button 
            onClick={() => onNavigate(AppScreen.CHAT_DETAIL)}
            className="flex items-center justify-center w-full h-14 bg-slate-900 text-white rounded-xl text-base font-semibold shadow-lg active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined mr-2">chat_bubble</span>
            Start Conversation
          </button>
          <button 
            onClick={() => onNavigate(AppScreen.DISCOVER)}
            className="flex items-center justify-center w-full h-14 bg-white dark:bg-slate-800 border border-slate-200 text-slate-600 dark:text-slate-300 rounded-xl font-semibold active:scale-95 transition-all"
          >
            Keep Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchFoundScreen;
