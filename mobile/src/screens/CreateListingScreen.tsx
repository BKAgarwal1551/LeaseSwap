import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme/useTheme';
import type { RootStackParamList } from '../navigation/types';
import { PrimaryButton } from '../components/PrimaryButton';
import { SuburbAutocomplete } from '../components/SuburbAutocomplete';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateListing'>;

export function CreateListingScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [suburb, setSuburb] = useState('');
  const [rentWeekly, setRentWeekly] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}> 
      <View style={[styles.header, { borderColor: colors.border }]}> 
        <Text style={[styles.hTitle, { color: colors.text }]}>Create Your Listing</Text>
        <Text style={{ color: colors.muted, fontWeight: '700', fontSize: 12 }}>Step 1 of 1 (v1 MVP)</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <Text style={[styles.label, { color: colors.text }]}>Suburb</Text>
        <SuburbAutocomplete value={suburb} onChange={setSuburb} />

        <Text style={[styles.label, { color: colors.text, marginTop: 18 }]}>Weekly Rent</Text>
        <TextInput
          value={rentWeekly}
          onChangeText={setRentWeekly}
          keyboardType="numeric"
          placeholder="$ / week"
          placeholderTextColor={colors.muted}
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        />

        <Text style={[styles.label, { color: colors.text, marginTop: 18 }]}>Short Description</Text>
        <TextInput
          value={desc}
          onChangeText={(t) => setDesc(t.slice(0, 200))}
          multiline
          placeholder="What makes your place special?"
          placeholderTextColor={colors.muted}
          style={[styles.textarea, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        />
        <Text style={{ color: colors.muted, fontSize: 11, marginTop: 6, fontWeight: '700' }}>{desc.length} / 200</Text>

        <View style={{ height: 24 }} />
        <PrimaryButton label="Save Draft" variant="secondary" onPress={() => navigation.goBack()} />
        <View style={{ height: 12 }} />
        <PrimaryButton label="Publish (free for now)" onPress={() => navigation.navigate('Tabs' as never)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1 },
  hTitle: { fontSize: 22, fontWeight: '900' },
  label: { fontSize: 14, fontWeight: '800', marginBottom: 8 },
  input: { height: 52, borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, fontSize: 15 },
  textarea: { minHeight: 120, borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, textAlignVertical: 'top' },
});
