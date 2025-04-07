import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tic Tac Toe</Text>
      <Text style={styles.subheading}>Choose Game Mode</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PlayerSetup', { mode: 'multiplayer' })}
      >
        <Text style={styles.buttonText}>🎮 Multiplayer (PvP)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PlayerSetup', { mode: 'ai' })}
      >
        <Text style={styles.buttonText}>🤖 Play vs AI</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LeaderboardScreen')}
      >
       <Text style={styles.buttonText}>🏆 Leaderboard</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#1e1e2f' },
  heading: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  subheading: { fontSize: 18, color: '#ccc', marginBottom: 40 },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    width: '80%',
    elevation: 4,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
