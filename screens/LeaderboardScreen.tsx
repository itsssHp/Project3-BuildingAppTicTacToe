import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { getMatchHistory } from '../utils/firebaseHistory';

interface Match {
  winner: string;
  playerX: string;
  playerO: string;
  date: string;
}

export default function LeaderboardScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getMatchHistory();
      const formattedData = data.map((item: any) => ({
        winner: item.winner,
        playerX: item.playerX,
        playerO: item.playerO,
        date: item.date,
      }));
      setMatches(formattedData.reverse()); // most recent first
    })();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>🏆 Match History</Text>

      <FlatList
        data={matches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: theme.card }]}>
            <Text style={[styles.itemText, { color: theme.text }]}>
              {item.playerX} vs {item.playerO}
            </Text>
            <Text style={[styles.itemText, { color: theme.text }]}>
              Winner: {item.winner} — {new Date(item.date).toLocaleString()}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={[styles.backButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  itemText: { fontSize: 16, fontWeight: '500' },
  backButton: {
    marginTop: 10,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#888',
    alignItems: 'center',
  },
  backText: { color: 'white', fontWeight: '600' },
});
