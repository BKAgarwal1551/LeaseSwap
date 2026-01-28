
import React, { useState } from 'react';
import { AppScreen, Property } from '../types';
import BottomNav from '../components/BottomNav';

const DUMMY_PROPERTIES: Property[] = [
  {
    id: '1',
    suburb: 'Surry Hills',
    rent: 750,
    beds: 2,
    baths: 1,
    parking: 1,
    verified: true,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000',
    description: 'Modern minimalist living room with large windows and city view'
  },
  {
    id: '2',
    suburb: 'Bondi Beach',
    rent: 950,
    beds: 2,
    baths: 2,
    parking: 1,
    verified: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
    description: 'Penthouse with panoramic ocean views and luxury finishes'
  },
  {
    id: '3',
    suburb: 'Fitzroy',
    rent: 680,
    beds: 1,
    baths: 1,
    parking: 0,
    verified: true,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000',
    description: 'Converted warehouse loft with high ceilings and art-deco vibes'
  },
  {
    id: '4',
    suburb: 'Newtown',
    rent: 620,
    beds: 1,
    baths: 1,
    parking: 0,
    verified: false,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000',
    description: 'Cozy loft with exposed brick and industrial vibes'
  },
  {
    id: '5',
    suburb: 'Pyrmont',
    rent: 820,
    beds: 2,
    baths: 1,
    parking: 1,
    verified: true,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1000',
    description: 'Waterfront apartment close to the CBD and local parks'
  }
];

interface DiscoverProps {
  onNavigate: (screen: AppScreen) => void;
}

const DiscoverScreen: React.FC<DiscoverProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const property = DUMMY_PROPERTIES[currentIndex % DUMMY_PROPERTIES.length];

  const handleNext = (liked: boolean) => {
    if (liked && currentIndex % 3 === 0) {
      onNavigate(AppScreen.MATCH_FOUND);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 pt-6 bg-background-light dark:bg-background-dark">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">tune</span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400">Discover</h2>
          <p className="text-xs font-semibold text-primary">{property.suburb}</p>
        </div>
        <div 
          onClick={() => onNavigate(AppScreen.CREATE_LISTING)}
          className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary cursor-pointer"
        >
          <span className="material-symbols-outlined">add_home</span>
        </div>
      </header>

      <main className="relative flex flex-1 flex-col px-4 pt-2">
        <div className="relative flex-1 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-900 shadow-2xl transition-all duration-500 ease-out transform">
          <div 
            className="h-full w-full bg-cover bg-center transition-opacity duration-300" 
            style={{ backgroundImage: `url('${property.image}')` }}
            key={property.id}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            
            <div className="absolute top-4 left-0 right-0 flex gap-1.5 px-4">
              {DUMMY_PROPERTIES.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1 flex-1 rounded-full transition-all ${idx === currentIndex % DUMMY_PROPERTIES.length ? 'bg-white' : 'bg-white/30'}`}
                ></div>
              ))}
            </div>

            <div className="absolute bottom-8 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                {property.verified && (
                  <span className="flex items-center gap-1 rounded-md bg-green-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    <span className="material-symbols-outlined text-[12px] filled-icon">verified</span>
                    Verified
                  </span>
                )}
                <span className="rounded-md bg-white/20 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white border border-white/30">
                  New
                </span>
              </div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">${property.rent}<span className="text-lg font-medium opacity-80">/pw</span></h3>
              <p className="text-lg font-semibold text-white/90">{property.suburb}</p>
              <p className="mt-2 text-sm text-gray-300 font-medium line-clamp-2 leading-relaxed">
                {property.beds} Bed • {property.baths} Bath • {property.parking} Parking • {property.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 py-6">
          <button 
            onClick={() => handleNext(false)}
            className="flex size-16 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-transform active:scale-90 hover:bg-red-50 dark:border-gray-700 dark:bg-gray-800"
          >
            <span className="material-symbols-outlined text-3xl text-red-500">close</span>
          </button>
          
          <button 
            onClick={() => handleNext(true)}
            className="flex size-20 items-center justify-center rounded-full bg-primary shadow-xl shadow-primary/30 transition-transform active:scale-90 hover:scale-105"
          >
            <span className="material-symbols-outlined filled-icon text-4xl text-white">favorite</span>
          </button>
          
          <button 
            onClick={() => handleNext(false)}
            className="flex size-16 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-transform active:scale-90 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800"
          >
            <span className="material-symbols-outlined text-3xl text-primary">bookmark</span>
          </button>
        </div>
      </main>

      <BottomNav activeScreen={AppScreen.DISCOVER} onNavigate={onNavigate} />
    </div>
  );
};

export default DiscoverScreen;
