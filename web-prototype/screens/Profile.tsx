
import React from 'react';
import { AppScreen } from '../types';
import BottomNav from '../components/BottomNav';

interface ProfileProps {
  onNavigate: (screen: AppScreen) => void;
}

const ProfileScreen: React.FC<ProfileProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-screen overflow-y-auto no-scrollbar pb-32">
      <header className="flex items-center justify-between p-4 pt-6 bg-background-light dark:bg-background-dark sticky top-0 z-50 backdrop-blur-md">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <span className="material-symbols-outlined">settings</span>
        </div>
      </header>

      <main className="px-4 space-y-8">
        {/* User Info Section */}
        <div className="flex flex-col items-center py-6">
          <div className="relative">
            <div 
              className="size-28 rounded-full border-4 border-white dark:border-slate-800 bg-cover shadow-xl" 
              style={{ backgroundImage: 'url("https://picsum.photos/seed/user-main/300")' }} 
            />
            <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-white dark:border-slate-800">
              <span className="material-symbols-outlined text-sm block filled-icon">verified</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mt-4">Alex Rivera</h3>
          <p className="text-slate-500 text-sm font-medium">Joined June 2024 • Sydney, AU</p>
        </div>

        {/* Verification & Trust Section (Transferred from Trust.tsx) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Trust & Verification</h4>
            <span className="text-xs font-bold text-primary">66% Verified</span>
          </div>
          
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-2/3 rounded-full shadow-[0_0_8px_rgba(19,127,236,0.5)]"></div>
          </div>

          <div className="grid gap-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">check_circle</span>
                </div>
                <div>
                  <h5 className="font-bold text-sm">Phone Verified</h5>
                  <p className="text-xs text-slate-500">+1 ••• ••• 88</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 flex flex-col gap-4 transition-all hover:border-primary/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-xl">badge</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Identity Document</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Action Required</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-md active:scale-95 transition-transform">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* User's Listing Section */}
        <section className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">My Swap Listing</h4>
          <div 
            onClick={() => onNavigate(AppScreen.CREATE_LISTING)}
            className="group relative h-48 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1536376074432-bf12177d4f4f?auto=format&fit=crop&q=80&w=800")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-bold text-lg">Studio in Darlinghurst</p>
              <p className="text-white/70 text-sm">$580 / pw</p>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 p-2 rounded-full shadow-lg">
              <span className="material-symbols-outlined text-primary">edit</span>
            </div>
          </div>
        </section>

        {/* Account Options */}
        <section className="pt-4 space-y-1">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">payment</span>
              <span className="font-semibold">Payments</span>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">notifications</span>
              <span className="font-semibold">Notifications</span>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-bold">Log Out</span>
            </div>
          </button>
        </section>
      </main>

      <BottomNav activeScreen={AppScreen.PROFILE} onNavigate={onNavigate} />
    </div>
  );
};

export default ProfileScreen;
