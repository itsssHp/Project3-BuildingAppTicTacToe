import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const initialBoard = Array(9).fill(null);

const checkWinner = (board: (string | null)[]) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default function GameScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { mode } = route.params || {};

  const [board, setBoard] = useState<(string | null)[]>(initialBoard);
  const [xTurn, setXTurn] = useState(true);

  const handlePress = (index: number) => {
    if (board[index] || checkWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = xTurn ? 'X' : 'O';
    setBoard(newBoard);
    setXTurn(!xTurn);
  };

  useEffect(() => {
    if (mode === 'ai' && !xTurn && !checkWinner(board)) {
      const empty = board.map((val, i) => val === null ? i : null).filter(i => i !== null);
      const randomMove = empty[Math.floor(Math.random() * empty.length)] as number;
      setTimeout(() => {
        const newBoard = [...board];
        newBoard[randomMove] = 'O';
        setBoard(newBoard);
        setXTurn(true);
      }, 500);
    }
  }, [board, xTurn]);

  const winner = checkWinner(board);

  useEffect(() => {
    if (winner) {
      Alert.alert('Game Over', `${winner} wins!`, [
        { text: 'Play Again', onPress: () => resetGame() },
        { text: 'Home', onPress: () => navigation.replace('HomeScreen') },
      ]);
    }
  }, [winner]);

  const resetGame = () => {
    setBoard(initialBoard);
    setXTurn(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{winner ? `${winner} Wins!` : `Turn: ${xTurn ? 'X' : 'O'}`}</Text>
      <View style={styles.grid}>
        {board.map((val, i) => (
          <TouchableOpacity
            key={i}
            style={styles.cell}
            onPress={() => handlePress(i)}
          >
            <Text style={styles.cellText}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#1e1e2f',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  grid: {
    width: 240,
    height: 240,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2d44',
  },
  cellText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 24,
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resetText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
