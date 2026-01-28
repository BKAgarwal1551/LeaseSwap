import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/useTheme';
import type { Listing } from '../types';

const { width: SCREEN_W } = Dimensions.get('window');

type Props = {
  listing: Listing;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

export function SwipeCard({ listing, onSwipeLeft, onSwipeRight }: Props) {
  const { colors } = useTheme();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const threshold = useMemo(() => SCREEN_W * 0.28, []);

  // Simple image carousel: tap left/right half to change image
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => setImgIdx(0), [listing.id]);
  const currentImage = listing.images[Math.min(imgIdx, listing.images.length - 1)] ?? listing.images[0];

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      const x = translateX.value;
      if (x > threshold) {
        // swipe right
        translateX.value = withTiming(SCREEN_W * 1.2, { duration: 180 }, (finished) => {
          if (finished) runOnJS(onSwipeRight)();
        });
        translateY.value = withTiming(0, { duration: 180 });
        return;
      }
      if (x < -threshold) {
        // swipe left
        translateX.value = withTiming(-SCREEN_W * 1.2, { duration: 180 }, (finished) => {
          if (finished) runOnJS(onSwipeLeft)();
        });
        translateY.value = withTiming(0, { duration: 180 });
        return;
      }

      // snap back
      translateX.value = withSpring(0, { damping: 14, stiffness: 140 });
      translateY.value = withSpring(0, { damping: 14, stiffness: 140 });
    });

  const cardStyle = useAnimatedStyle(() => {
    const rot = interpolate(translateX.value, [-SCREEN_W, 0, SCREEN_W], [-10, 0, 10]);
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rot}deg` },
      ],
    };
  });

  const likeBadgeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, threshold], [0, 1]);
    return { opacity };
  });

  const nopeBadgeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [-threshold, 0], [1, 0]);
    return { opacity };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, cardStyle]}>
        <ImageBackground
          source={{ uri: currentImage }}
          style={styles.bg}
          imageStyle={styles.bgImg}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.85)']}
            style={StyleSheet.absoluteFill}
            locations={[0, 0.55, 1]}
          />

          {/* Story-style progress bars */}
          <View style={styles.progressRow}>
            {listing.images.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressBar,
                  { backgroundColor: i === imgIdx ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)' },
                ]}
              />
            ))}
          </View>

          {/* Badges */}
          <View style={styles.badgesRow}>
            {listing.verified && (
              <View style={[styles.pill, { backgroundColor: colors.success }]}>
                <Text style={styles.pillText}>VERIFIED</Text>
              </View>
            )}
            <View
              style={[
                styles.pill,
                { backgroundColor: 'rgba(255,255,255,0.16)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.22)' },
              ]}
            >
              <Text style={styles.pillText}>NEW</Text>
            </View>
          </View>

          {/* Tap areas for images */}
          <View style={styles.tapRow}>
            <Pressable
              style={styles.tapHalf}
              onPress={() => setImgIdx((v) => Math.max(0, v - 1))}
            />
            <Pressable
              style={styles.tapHalf}
              onPress={() => setImgIdx((v) => Math.min(listing.images.length - 1, v + 1))}
            />
          </View>

          {/* Swipe overlays */}
          <Animated.View style={[styles.overlayBadge, { left: 18, borderColor: colors.danger }, nopeBadgeStyle]}>
            <Text style={[styles.overlayText, { color: colors.danger }]}>NOPE</Text>
          </Animated.View>
          <Animated.View style={[styles.overlayBadge, { right: 18, borderColor: colors.success }, likeBadgeStyle]}>
            <Text style={[styles.overlayText, { color: colors.success }]}>LIKE</Text>
          </Animated.View>

          {/* Bottom content */}
          <View style={styles.bottom}>
            <Text style={styles.price}>
              ${listing.rentWeekly}
              <Text style={styles.priceUnit}>/pw</Text>
            </Text>
            <Text style={styles.suburb}>{listing.suburb}</Text>
            <Text style={styles.meta}>
              {listing.beds} Bed • {listing.baths} Bath • {listing.parking} Parking
            </Text>
            <Text style={styles.desc} numberOfLines={2}>
              {listing.description}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
  },
  bg: { flex: 1, justifyContent: 'flex-end' },
  bgImg: { borderRadius: 22 },

  progressRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    gap: 6,
  },
  progressBar: {
    height: 3,
    borderRadius: 2,
    flex: 1,
  },

  badgesRow: { position: 'absolute', top: 22, left: 14, flexDirection: 'row', gap: 8 },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  pillText: { color: '#fff', fontWeight: '900', fontSize: 10, letterSpacing: 1 },

  tapRow: { ...StyleSheet.absoluteFillObject, flexDirection: 'row' },
  tapHalf: { flex: 1 },

  bottom: { padding: 16 },
  price: { color: '#fff', fontSize: 32, fontWeight: '900' },
  priceUnit: { fontSize: 16, fontWeight: '700', opacity: 0.8 },
  suburb: { color: 'rgba(255,255,255,0.92)', fontSize: 18, fontWeight: '900', marginTop: 2 },
  meta: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '800', marginTop: 8 },
  desc: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 8, lineHeight: 18 },
  overlayBadge: {
    position: 'absolute',
    top: 76,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 3,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  overlayText: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
  },
});
