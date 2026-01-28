import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme/useTheme';
import { DUMMY_THREADS } from '../data/dummy';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Tabs'>;

export function MessagesScreen({ navigation }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Messages</Text>

      <FlatList
        data={DUMMY_THREADS}
        keyExtractor={(x) => x.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('ChatDetail', { threadId: item.id })}
            style={({ pressed }) => [styles.row, { backgroundColor: pressed ? colors.card2 : colors.card, borderColor: colors.border }]}
          >
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontWeight: '800', color: colors.text }}>{item.title}</Text>
                <Text style={{ color: colors.muted, fontSize: 11, fontWeight: '700' }}>{item.time}</Text>
              </View>
              <Text numberOfLines={1} style={{ color: item.unread ? colors.text : colors.subtext, fontWeight: item.unread ? '700' : '600' }}>
                {item.lastMessage}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 56, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 14 },
  row: { flexDirection: 'row', gap: 12, padding: 12, borderRadius: 14, borderWidth: 1, marginBottom: 10 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#94A3B8' },
});
