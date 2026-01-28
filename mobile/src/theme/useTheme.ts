import { useColorScheme } from 'react-native';
import { colors } from './colors';

export type ThemeMode = 'light' | 'dark';

export function useTheme() {
  const scheme = useColorScheme();
  const mode: ThemeMode = scheme === 'dark' ? 'dark' : 'light';
  return { mode, colors: colors[mode] };
}
