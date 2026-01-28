import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/useTheme';
import type { RootStackParamList, RootTabsParamList } from './types';
import { DiscoverScreen } from '../screens/DiscoverScreen';
import { MatchFoundScreen } from '../screens/MatchFoundScreen';
import { MessagesScreen } from '../screens/MessagesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ChatDetailScreen } from '../screens/ChatDetailScreen';
import { CreateListingScreen } from '../screens/CreateListingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<RootTabsParamList>();

function TabNavigator() {
  const { colors, mode } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          // Bring the bar up a little (less bottom padding) and make icons clearer
          height: 76,
          paddingBottom: 6,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
        tabBarIcon: ({ color, focused, size }) => {
          const s = size ?? 22;
          const iconName = (() => {
            switch (route.name) {
              case 'DiscoverTab':
                return focused ? 'compass' : 'compass-outline';
              case 'MessagesTab':
                return focused ? 'chatbubbles' : 'chatbubbles-outline';
              case 'ProfileTab':
                return focused ? 'person' : 'person-outline';
              default:
                return 'ellipse';
            }
          })();
          return <Ionicons name={iconName as any} size={s} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="DiscoverTab" component={DiscoverScreen as any} options={{ title: 'DISCOVER' }} />
      <Tabs.Screen name="MessagesTab" component={MessagesScreen as any} options={{ title: 'MESSAGES' }} />
      <Tabs.Screen name="ProfileTab" component={ProfileScreen as any} options={{ title: 'PROFILE' }} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const { mode, colors } = useTheme();

  const navTheme = mode === 'dark'
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.bg,
          card: colors.card,
          border: colors.border,
          text: colors.text,
          primary: colors.primary,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.bg,
          card: colors.card,
          border: colors.border,
          text: colors.text,
          primary: colors.primary,
        },
      };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="MatchFound" component={MatchFoundScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="CreateListing" component={CreateListingScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
