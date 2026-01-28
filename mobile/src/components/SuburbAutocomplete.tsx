import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../theme/useTheme';

// NOTE:
// For v1 we ship a local list so the UX works without keys.
// When Bhavesh provides a Google Places API key, we’ll swap this
// to Google Places Autocomplete (or another provider).
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
        placeholder={placeholder ?? 'e.g. Surry Hills, NSW'}
        placeholderTextColor={colors.muted}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
      />

      {open && suggestions.length > 0 && (
        <View style={[styles.dropdown, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
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

      <Text style={{ marginTop: 6, color: colors.muted, fontSize: 11 }}>
        Autocomplete is running in “local list” mode. We’ll upgrade to Google Places when API key is added.
      </Text>
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
