import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme/useTheme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Tabs'>;

export function ProfileScreen({ navigation }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      <Text style={{ color: colors.subtext, fontWeight: '600', textAlign: 'center' }}>
        Trust & Verification will live here (phone/email/ID). For v1 we’ll show UI only.
      </Text>

      <View style={{ height: 24 }} />

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={{ color: colors.text, fontWeight: '900', marginBottom: 6 }}>Trust & Verification</Text>
        <Text style={{ color: colors.subtext, fontWeight: '600' }}>Phone: Verified</Text>
        <Text style={{ color: colors.subtext, fontWeight: '600' }}>Email: Verified</Text>
        <Text style={{ color: colors.subtext, fontWeight: '600' }}>ID: Pending</Text>
        <View style={{ height: 12 }} />
        <Pressable style={[styles.btn, { backgroundColor: colors.primary }]}>
          <Text style={{ color: colors.white, fontWeight: '900' }}>Upload ID (coming)</Text>
        </Pressable>
      </View>

      <View style={{ height: 14 }} />

      <Pressable
        onPress={() => navigation.navigate('CreateListing')}
        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={{ color: colors.text, fontWeight: '900' }}>My Listing</Text>
        <Text style={{ color: colors.subtext, fontWeight: '600' }}>Tap to create/edit listing</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 56, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 14 },
  card: { borderWidth: 1, borderRadius: 16, padding: 14 },
  btn: { height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
