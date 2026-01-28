import React, { useMemo, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme/useTheme';
import { DUMMY_LISTINGS } from '../data/dummy';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Tabs'>;

export function DiscoverScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [idx, setIdx] = useState(0);

  const listing = useMemo(() => DUMMY_LISTINGS[idx % DUMMY_LISTINGS.length], [idx]);

  const next = (liked: boolean) => {
    // for now: simulate match every 3 likes
    if (liked && idx % 3 === 0) {
      navigation.navigate('MatchFound');
    } else {
      setIdx((i) => i + 1);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.subtext }]}>DISCOVER</Text>
        <Text style={[styles.headerSub, { color: colors.primary }]}>{listing.suburb}, {listing.state}</Text>
      </View>

      <View style={styles.cardWrap}>
        <ImageBackground
          source={{ uri: listing.images[0] }}
          style={styles.card}
          imageStyle={{ borderRadius: 22 }}
        >
          <View style={styles.gradient} />

          <View style={styles.badges}>
            {listing.verified && (
              <View style={[styles.badge, { backgroundColor: colors.success }]}>
                <Text style={styles.badgeText}>VERIFIED</Text>
              </View>
            )}
            <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.25)', borderWidth: 1 }]}>
              <Text style={styles.badgeText}>NEW</Text>
            </View>
          </View>

          <View style={styles.cardBottom}>
            <Text style={styles.price}>${listing.rentWeekly}<Text style={styles.priceUnit}>/pw</Text></Text>
            <Text style={styles.suburb}>{listing.suburb}</Text>
            <Text style={styles.meta}>{listing.beds} Bed • {listing.baths} Bath • {listing.parking} Parking</Text>
            <Text style={styles.desc} numberOfLines={2}>{listing.description}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={() => next(false)} style={({ pressed }) => [styles.smallBtn, { backgroundColor: colors.card, borderColor: colors.border, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
        >
          <Text style={[styles.icon, { color: colors.danger }]}>✕</Text>
        </Pressable>

        <Pressable onPress={() => next(true)} style={({ pressed }) => [styles.bigBtn, { backgroundColor: colors.primary, transform: [{ scale: pressed ? 0.96 : 1 }] }]}
        >
          <Text style={[styles.icon, { color: colors.white }]}>❤</Text>
        </Pressable>

        <Pressable onPress={() => next(false)} style={({ pressed }) => [styles.smallBtn, { backgroundColor: colors.card, borderColor: colors.border, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
        >
          <Text style={[styles.icon, { color: colors.primary }]}>⌁</Text>
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
  card: { flex: 1, borderRadius: 22, overflow: 'hidden', justifyContent: 'flex-end' },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  badges: { position: 'absolute', top: 14, left: 14, flexDirection: 'row', gap: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  badgeText: { color: '#fff', fontWeight: '800', fontSize: 10, letterSpacing: 1 },
  cardBottom: { padding: 16 },
  price: { color: '#fff', fontSize: 32, fontWeight: '900' },
  priceUnit: { fontSize: 16, fontWeight: '700', opacity: 0.8 },
  suburb: { color: 'rgba(255,255,255,0.9)', fontSize: 18, fontWeight: '800', marginTop: 2 },
  meta: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '700', marginTop: 8 },
  desc: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 8, lineHeight: 18 },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18, paddingVertical: 18 },
  smallBtn: { width: 62, height: 62, borderRadius: 31, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  bigBtn: { width: 78, height: 78, borderRadius: 39, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 28, fontWeight: '900' },
});
