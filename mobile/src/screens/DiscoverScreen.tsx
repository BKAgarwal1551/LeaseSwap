import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme/useTheme';
import { DUMMY_LISTINGS } from '../data/dummy';
import type { RootStackParamList } from '../navigation/types';
import { SwipeCard } from '../components/SwipeCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Tabs'>;

export function DiscoverScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [idx, setIdx] = useState(0);

  const listing = useMemo(() => DUMMY_LISTINGS[idx % DUMMY_LISTINGS.length], [idx]);

  const onLike = () => {
    // simulate match every 3 likes
    if (idx % 3 === 0) {
      navigation.navigate('MatchFound');
    }
    setIdx((i) => i + 1);
  };

  const onNope = () => {
    setIdx((i) => i + 1);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.subtext }]}>DISCOVER</Text>
        <Text style={[styles.headerSub, { color: colors.primary }]}>
          {listing.suburb}, {listing.state}
        </Text>
      </View>

      <View style={styles.cardWrap}>
        <SwipeCard listing={listing} onSwipeLeft={onNope} onSwipeRight={onLike} />
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onNope}
          style={({ pressed }) => [
            styles.smallBtn,
            { backgroundColor: colors.card, borderColor: colors.border, transform: [{ scale: pressed ? 0.95 : 1 }] },
          ]}
        >
          <Text style={[styles.icon, { color: colors.danger }]}>✕</Text>
        </Pressable>

        <Pressable
          onPress={onLike}
          style={({ pressed }) => [
            styles.bigBtn,
            { backgroundColor: colors.primary, transform: [{ scale: pressed ? 0.96 : 1 }] },
          ]}
        >
          <Text style={[styles.icon, { color: colors.white }]}>❤</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('CreateListing')}
          style={({ pressed }) => [
            styles.smallBtn,
            { backgroundColor: colors.card, borderColor: colors.border, transform: [{ scale: pressed ? 0.95 : 1 }] },
          ]}
        >
          <Text style={[styles.icon, { color: colors.primary }]}>＋</Text>
        </Pressable>
      </View>

      <View style={{ height: 12 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 56, paddingHorizontal: 16 },
  header: { alignItems: 'center', marginBottom: 10 },
  headerTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  headerSub: { fontSize: 12, fontWeight: '700', marginTop: 2 },
  cardWrap: { flex: 1 },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18, paddingVertical: 18 },
  smallBtn: { width: 62, height: 62, borderRadius: 31, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  bigBtn: { width: 78, height: 78, borderRadius: 39, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 28, fontWeight: '900' },
});
