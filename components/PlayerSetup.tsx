import React, { useState } from 'react';
  import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
  import { useTheme } from '../utils/ThemeContext';
  import { useNavigation, useRoute } from '@react-navigation/native';

  export default function PlayerSetup({ onStart }: { onStart: (names: { p1: string, p2: string }, difficulty: string) => void }) {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const route = useRoute<any>();
    const mode = route.params?.mode;

    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');

    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.heading, { color: theme.text }]}>Enter Player Info</Text>

        <Text style={[styles.label, { color: theme.text }]}>Player 1 Name</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
          value={player1}
          onChangeText={setPlayer1}
          placeholder="Player X"
          placeholderTextColor="#888"
        />

        <Text style={[styles.label, { color: theme.text }]}>Player 2 Name / AI Name</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
          value={player2}
          onChangeText={setPlayer2}
          placeholder="Player O / AI"
          placeholderTextColor="#888"
        />

        {/* Show difficulty toggle only in AI mode */}
        {mode === 'ai' && (
          <>
            <Text style={[styles.label, { color: theme.text }]}>AI Difficulty</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  difficulty === 'easy' && styles.selected,
                ]}
                onPress={() => setDifficulty('easy')}
              >
                <Text style={{ color: difficulty === 'easy' ? '#fff' : theme.text }}>Easy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  difficulty === 'hard' && styles.selected,
                ]}
                onPress={() => setDifficulty('hard')}
              >
                <Text style={{ color: difficulty === 'hard' ? '#fff' : theme.text }}>Hard</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: theme.button }]}
          onPress={() => onStart({ p1: player1, p2: player2 }, difficulty)}
        >
          <Text style={styles.startText}>Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: '#6c757d' }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 16, marginBottom: 4 },
    input: {
      borderWidth: 1,
      padding: 10,
      borderRadius: 8,
      marginBottom: 12,
    },
    toggleContainer: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 16,
      justifyContent: 'center',
    },
    toggleButton: {
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#888',
      minWidth: 100,
      alignItems: 'center',
    },
    selected: {
      backgroundColor: '#cce5ff',
    },
    startButton: {
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    startText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    backButton: {
      marginTop: 10,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    backText: {
      color: '#fff',
      fontSize: 16,
    },
  });
