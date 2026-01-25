
import React, { useState } from 'react';
import { AppScreen } from '../types';
import { enhanceDescription } from '../services/geminiService';

interface CreateListingProps {
  onNavigate: (screen: AppScreen) => void;
  onBack: () => void;
}

const CreateListingScreen: React.FC<CreateListingProps> = ({ onNavigate, onBack }) => {
  const [suburb, setSuburb] = useState('');
  const [rent, setRent] = useState('');
  const [description, setDescription] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [tags, setTags] = useState(['Pet Friendly', 'Gym', 'Parking']);

  const handleEnhance = async () => {
    if (!suburb || !rent) {
      alert("Please fill in suburb and rent first!");
      return;
    }
    setIsEnhancing(true);
    const enhanced = await enhanceDescription(suburb, rent, tags);
    setDescription(enhanced);
    setIsEnhancing(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto pb-32 no-scrollbar">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 justify-between max-w-[480px] mx-auto w-full">
          <div onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </div>
          <h2 className="text-lg font-bold flex-1 text-center pr-10">Create Your Listing</h2>
        </div>
      </header>

      <main className="px-4">
        <div className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase text-slate-500">Step 2 of 3</span>
            <span className="text-xs font-semibold text-primary">66% Complete</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-2/3 rounded-full"></div>
          </div>
        </div>

        <div className="pt-8 pb-2">
          <h3 className="text-2xl font-bold">Property Details</h3>
          <p className="text-slate-500 text-sm mt-1">Provide accurate details to find your perfect swap.</p>
        </div>

        <div className="py-4">
          <div className="group relative w-full aspect-video bg-slate-200 dark:bg-charcoal-custom rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-3 overflow-hidden transition-all hover:border-primary/50 cursor-pointer">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">add_a_photo</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold">Add high-quality photos</p>
              <p className="text-xs text-slate-500 mt-1">Show off your space to attract swappers</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="py-2">
            <label className="flex flex-col w-full">
              <p className="text-sm font-semibold pb-2">Suburb</p>
              <div className="relative">
                <input 
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-custom bg-white dark:bg-charcoal-custom h-14 px-4 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                  placeholder="e.g. Surry Hills, NSW" 
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
              </div>
            </label>
          </div>

          <div className="py-2">
            <label className="flex flex-col w-full">
              <p className="text-sm font-semibold pb-2">Monthly Rent</p>
              <div className="flex w-full items-stretch rounded-lg">
                <div className="flex border border-slate-300 dark:border-slate-custom bg-slate-50 dark:bg-charcoal-custom items-center px-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined text-xl">payments</span>
                </div>
                <input 
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  type="number" 
                  className="w-full flex-1 border border-slate-300 dark:border-slate-custom bg-white dark:bg-charcoal-custom h-14 px-4 rounded-r-lg text-base" 
                  placeholder="0.00" 
                />
              </div>
            </label>
          </div>

          <div className="py-2">
            <div className="flex items-center justify-between pb-2">
               <p className="text-sm font-semibold">Short Description</p>
               <button 
                onClick={handleEnhance}
                disabled={isEnhancing}
                className="text-primary text-xs font-bold flex items-center gap-1 hover:opacity-80 disabled:opacity-50"
               >
                 {isEnhancing ? 'Enhancing...' : 'Magic Enhance'}
                 <span className="material-symbols-outlined text-xs">auto_awesome</span>
               </button>
            </div>
            <div className="relative">
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[120px] rounded-lg border border-slate-300 dark:border-slate-custom bg-white dark:bg-charcoal-custom p-4 text-base leading-relaxed transition-all resize-none" 
                placeholder="What makes your place special? (e.g. Rooftop garden, 5 min to metro...)"
              />
              <div className="absolute bottom-3 right-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {description.length} / 200
              </div>
            </div>
          </div>
        </div>

        <div className="py-4">
          <p className="text-sm font-semibold pb-3">Quick Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-custom text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                {tag} <span className="material-symbols-outlined text-[14px]">check</span>
              </span>
            ))}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 p-4 pb-8 z-20">
        <div className="max-w-[480px] mx-auto">
          <button 
            onClick={() => onNavigate(AppScreen.DISCOVER)}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            List My Place
            <span className="material-symbols-outlined">rocket_launch</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CreateListingScreen;
