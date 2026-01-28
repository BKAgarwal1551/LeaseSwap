
import React from 'react';
import { AppScreen } from '../types';
import BottomNav from '../components/BottomNav';

interface MessagesProps {
  onNavigate: (screen: AppScreen) => void;
}

const DUMMY_CHATS = [
  { id: '1', name: 'John Doe', lastMessage: 'The lease runs until December...', time: '10:14 AM', avatar: 'https://picsum.photos/seed/john/100', unread: true },
  { id: '2', name: 'Sarah Smith', lastMessage: 'I can do a viewing on Tuesday!', time: 'Yesterday', avatar: 'https://picsum.photos/seed/sarah/100', unread: false },
  { id: '3', name: 'Michael Chen', lastMessage: 'Is the parking space included?', time: 'Mon', avatar: 'https://picsum.photos/seed/mike/100', unread: false },
];

const MessagesScreen: React.FC<MessagesProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 p-4">
        <h2 className="text-xl font-bold text-center">Messages</h2>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {DUMMY_CHATS.map((chat) => (
          <div 
            key={chat.id} 
            onClick={() => onNavigate(AppScreen.CHAT_DETAIL)}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          >
            <div className="relative">
              <img src={chat.avatar} alt={chat.name} className="size-14 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
              {chat.unread && (
                <div className="absolute top-0 right-0 size-3.5 bg-primary rounded-full border-2 border-white dark:border-gray-900" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base truncate">{chat.name}</h3>
                <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
              </div>
              <p className={`text-sm truncate ${chat.unread ? 'text-slate-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </main>

      <BottomNav activeScreen={AppScreen.MESSAGES} onNavigate={onNavigate} />
    </div>
  );
};

export default MessagesScreen;
