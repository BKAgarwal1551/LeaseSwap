import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme/useTheme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatDetail'>;

export function ChatDetailScreen({ route, navigation }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}> 
      <View style={[styles.header, { borderColor: colors.border }]}> 
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={{ color: colors.primary, fontSize: 18, fontWeight: '900' }}>‹</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontWeight: '900' }}>Chat</Text>
          <Text style={{ color: colors.muted, fontSize: 11, fontWeight: '800' }}>Thread {route.params.threadId}</Text>
        </View>
        <Text style={{ color: colors.primary, fontWeight: '800' }}>i</Text>
      </View>

      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ color: colors.subtext, fontWeight: '600' }}>Chat UI placeholder (we’ll port your exact design next).</Text>
      </View>

      <View style={[styles.footer, { borderColor: colors.border }]}> 
        <Pressable style={styles.plus}><Text style={{ color: colors.primary, fontSize: 20, fontWeight: '900' }}>＋</Text></Pressable>
        <TextInput
          placeholder="Message..."
          placeholderTextColor={colors.muted}
          style={[styles.input, { backgroundColor: colors.card2, borderColor: colors.border, color: colors.text }]}
        />
        <Pressable style={[styles.send, { backgroundColor: colors.primary }]}><Text style={{ color: '#fff', fontWeight: '900' }}>➤</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1 },
  back: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingHorizontal: 12, paddingVertical: 12, flexDirection: 'row', gap: 10, borderTopWidth: 1, alignItems: 'center' },
  plus: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, height: 44, borderRadius: 22, borderWidth: 1, paddingHorizontal: 14 },
  send: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});
