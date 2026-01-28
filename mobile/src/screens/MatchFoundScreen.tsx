import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme/useTheme';
import type { RootStackParamList } from '../navigation/types';
import { PrimaryButton } from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'MatchFound'>;

export function MatchFoundScreen({ navigation }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}> 
      <Text style={[styles.title, { color: colors.text }]}>It’s a Match</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>You both liked each other’s listing. Start a chat to organise viewing details.</Text>

      <View style={{ height: 18 }} />
      <PrimaryButton label="Start Conversation" onPress={() => navigation.navigate('Tabs', { screen: 'MessagesTab' as never } as never)} />
      <View style={{ height: 12 }} />
      <PrimaryButton label="Keep Browsing" variant="secondary" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 34, fontWeight: '900', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 15, fontWeight: '600', textAlign: 'center', lineHeight: 21, paddingHorizontal: 10 },
});
