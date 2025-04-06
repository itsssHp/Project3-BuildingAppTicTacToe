// GameModeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../utils/ThemeContext';
import { playClick, vibrate } from '../utils/sound';
import { saveMatchHistory } from '../utils/firebaseHistory';

const initialBoard = Array(9).fill(null);

const checkWinner = (board: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return board.includes(null) ? null : { winner: 'Draw', line: [] };
};

export default function GameModeScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { theme, toggleTheme } = useTheme();

  const routeParams = route.params || {};
  const playerX = routeParams.playerX?.trim() || 'Player X';
  const playerO = routeParams.playerO?.trim() || 'Player O';
  const mode = routeParams.mode || 'multiplayer';
  const difficulty = routeParams.difficulty || 'easy';

  const [board, setBoard] = useState<(string | null)[]>(initialBoard);
  const [xTurn, setXTurn] = useState(true);
  const [winsX, setWinsX] = useState(0);
  const [winsO, setWinsO] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const winnerInfo = checkWinner(board);

  useEffect(() => {
    if (winnerInfo?.winner) {
      setWinningLine(winnerInfo.line);

      setTimeout(() => {
        if (winnerInfo.winner === 'X') setWinsX(prev => prev + 1);
        else if (winnerInfo.winner === 'O') setWinsO(prev => prev + 1);

        const winnerName = winnerInfo.winner === 'X' ? playerX : winnerInfo.winner === 'O' ? playerO : 'Draw';

        saveMatchHistory({
          winner: winnerName,
          playerX,
          playerO,
          date: new Date().toISOString(),
        });

        Alert.alert(
          'Game Over',
          winnerInfo.winner === 'Draw' ? "It's a Draw!" : `${winnerName} Wins!`,
          [
            { text: 'Play Again', onPress: resetGame },
            { text: 'Back', onPress: () => navigation.goBack() },
          ]
        );
      }, 300);
    } else if (mode === 'ai' && !xTurn) {
      setTimeout(() => makeAIMove(), 500);
    }
  }, [board]);

  const makeMove = (index: number) => {
    if (board[index] || winnerInfo?.winner) return;
    if (soundOn) {
      playClick();
      vibrate();
    }
    const newBoard = [...board];
    newBoard[index] = xTurn ? 'X' : 'O';
    setBoard(newBoard);
    setXTurn(!xTurn);
  };

  const makeAIMove = () => {
    const emptyIndexes = board.map((val, i) => val === null ? i : null).filter(i => i !== null) as number[];
    const move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    const newBoard = [...board];
    newBoard[move] = 'O';
    setBoard(newBoard);
    setXTurn(true);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setXTurn(true);
    setWinningLine([]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.turnText, { color: theme.text }]}> {winnerInfo?.winner ? `Winner: ${winnerInfo.winner}` : `Turn: ${xTurn ? playerX : playerO}`} </Text>

      <View style={styles.scoreRow}>
        <Text style={[styles.score, { color: theme.text }]}>{playerX} (X): {winsX}</Text>
        <Text style={[styles.score, { color: theme.text }]}>{playerO} (O): {winsO}</Text>
      </View>

      <View style={styles.board}>
        {board.map((val, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.cell,
              val === 'X' ? styles.cellX : val === 'O' ? styles.cellO : {},
              winningLine.includes(i) && styles.winnerCell]}
            onPress={() => {
              if (mode === 'ai') {
                if (xTurn) makeMove(i);
              } else {
                makeMove(i);
              }
            }}
            disabled={!!val || !!winnerInfo?.winner}
          >
            <Text style={styles.cellText}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={resetGame}>
        <Text style={styles.buttonText}>🔄 Restart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#888' }]} onPress={toggleTheme}>
        <Text style={styles.buttonText}>🌓 Toggle Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: soundOn ? '#4caf50' : '#f44336' }]} onPress={() => setSoundOn(!soundOn)}>
        <Text style={styles.buttonText}>{soundOn ? '🔈 Sound On' : '🔇 Sound Off'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>⬅️ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  turnText: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 24,
  },
  score: {
    fontSize: 18,
    fontWeight: '500',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerCell: {
    borderColor: 'gold',
    borderWidth: 3,
    backgroundColor: '#d4af37',
  },
  cellX: {
    backgroundColor: '#2e3c47',
  },
  cellO: {
    backgroundColor: '#37474F',
  },
  cellText: {
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginVertical: 8,
    width: '70%',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#777',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
