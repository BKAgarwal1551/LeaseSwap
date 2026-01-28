
import React, { useState, useCallback } from 'react';
import { AppScreen } from './types';
import DiscoverScreen from './screens/Discover';
import MessagesScreen from './screens/Messages';
import ProfileScreen from './screens/Profile';
import CreateListingScreen from './screens/CreateListing';
import ChatDetailScreen from './screens/ChatDetail';
import MatchFoundScreen from './screens/MatchFound';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.DISCOVER);
  const [lastScreen, setLastScreen] = useState<AppScreen>(AppScreen.DISCOVER);

  const navigateTo = useCallback((screen: AppScreen) => {
    setLastScreen(currentScreen);
    setCurrentScreen(screen);
  }, [currentScreen]);

  const goBack = useCallback(() => {
    setCurrentScreen(lastScreen);
  }, [lastScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.DISCOVER:
        return <DiscoverScreen onNavigate={navigateTo} />;
      case AppScreen.MESSAGES:
        return <MessagesScreen onNavigate={navigateTo} />;
      case AppScreen.PROFILE:
        return <ProfileScreen onNavigate={navigateTo} />;
      case AppScreen.CREATE_LISTING:
        return <CreateListingScreen onNavigate={navigateTo} onBack={goBack} />;
      case AppScreen.CHAT_DETAIL:
        return <ChatDetailScreen onBack={() => navigateTo(AppScreen.MESSAGES)} />;
      case AppScreen.MATCH_FOUND:
        return <MatchFoundScreen onNavigate={navigateTo} />;
      default:
        return <DiscoverScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-[430px] bg-background-light dark:bg-background-dark shadow-2xl relative overflow-hidden flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
