import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../theme/useTheme';

// NOTE:
// For v1 we allow manual suburb entry.
// We optionally show suggestions from a small local list (no paid API).
// Later we can upgrade to a real Places API if desired.
const AUS_SUBURBS = [
  'Surry Hills, NSW',
  'Bondi Beach, NSW',
  'Newtown, NSW',
  'Fitzroy, VIC',
  'Southbank, VIC',
  'Fortitude Valley, QLD',
  'New Farm, QLD',
  'Subiaco, WA',
  'Fremantle, WA',
  'Hobart, TAS',
  'Launceston, TAS',
];

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export function SuburbAutocomplete({ value, onChange, placeholder }: Props) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return AUS_SUBURBS.slice(0, 6);
    return AUS_SUBURBS.filter((s) => s.toLowerCase().includes(q)).slice(0, 6);
  }, [value]);

  return (
    <View style={{ position: 'relative' }}>
      <TextInput
        value={value}
        onChangeText={(t) => {
          onChange(t);
          setOpen(true);
        }}
        placeholder={placeholder ?? 'Type suburb (e.g. Surry Hills)'}
        placeholderTextColor={colors.muted}
        autoCorrect={false}
        autoCapitalize="words"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
      />

      {/* Optional suggestions (no paid API). User can also ignore and type freely. */}
      {open && suggestions.length > 0 && (
        <View style={[styles.dropdown, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={suggestions}
            keyExtractor={(x) => x}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onChange(item);
                  setOpen(false);
                }}
                style={({ pressed }) => [styles.row, { backgroundColor: pressed ? colors.card2 : colors.card }]}
              >
                <Text style={{ color: colors.text, fontWeight: '600' }}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  dropdown: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 56,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 30,
  },
  row: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
});
