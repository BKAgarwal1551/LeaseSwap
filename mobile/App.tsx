import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useTheme } from './src/theme/useTheme';

export default function App() {
  const { mode } = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator />
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    </GestureHandlerRootView>
  );
}
