
import React from 'react';

interface ChatDetailProps {
  onBack: () => void;
}

const ChatDetailScreen: React.FC<ChatDetailProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark font-display">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <span onClick={onBack} className="material-symbols-outlined text-primary cursor-pointer">arrow_back_ios</span>
            <div className="flex items-center gap-3">
              <div 
                className="size-10 rounded-full bg-center bg-cover border border-gray-200 dark:border-gray-700" 
                style={{ backgroundImage: 'url("https://picsum.photos/seed/john/100")' }}
              />
              <div>
                <h2 className="text-base font-bold leading-tight">John Doe</h2>
                <p className="text-xs text-[#4e6d97] font-medium uppercase tracking-wider">2BR Loft, Brooklyn</p>
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined text-primary">info</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 flex flex-col no-scrollbar">
        <div className="flex flex-col items-center my-6">
          <h4 className="text-[#4e6d97] text-[11px] font-bold tracking-[0.1em] px-4 py-1 rounded-full bg-gray-200/50 dark:bg-gray-800/50 uppercase">Today</h4>
        </div>

        <div className="flex items-end gap-3 mb-6">
          <div className="bg-center bg-cover rounded-full size-8 shrink-0" style={{ backgroundImage: 'url("https://picsum.photos/seed/john/100")' }} />
          <div className="flex flex-1 flex-col gap-1 items-start">
            <div className="text-base font-normal max-w-[85%] rounded-2xl rounded-bl-none px-4 py-3 bg-bubble-slate dark:bg-gray-800 text-[#0e131b] dark:text-slate-50 shadow-sm">
              Hi! I saw you're interested in my Brooklyn loft. The lease runs until December. Does that work for you?
            </div>
            <p className="text-[#4e6d97] text-[10px] ml-1 mt-1 font-medium">10:14 AM</p>
          </div>
        </div>

        <div className="flex items-end gap-3 mb-6 justify-end">
          <div className="flex flex-1 flex-col gap-1 items-end">
            <div className="text-base font-normal max-w-[85%] rounded-2xl rounded-br-none px-4 py-3 bg-primary text-white shadow-md">
              Yes, that timeline is perfect. My place in Soho is available starting October. Would you like to see the floor plan?
            </div>
            <p className="text-[#4e6d97] text-[10px] mr-1 mt-1 font-medium text-right">10:16 AM • Read</p>
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 p-4 pb-8">
        <div className="max-w-2xl mx-auto w-full">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-[#4e6d97] hover:border-primary transition-colors">Request Viewing</button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-[#4e6d97] hover:border-primary transition-colors">Confirm Move-in</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="size-10 flex items-center justify-center text-[#4e6d97] hover:text-primary">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
            <div className="relative flex-1">
              <input className="w-full bg-bubble-off-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full py-3 px-5 text-sm focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Message John..." type="text"/>
            </div>
            <button className="size-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatDetailScreen;
