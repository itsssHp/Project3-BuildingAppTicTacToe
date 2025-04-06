import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

export async function saveMatchHistory(data: {
  winner: string;
  playerX: string;
  playerO: string;
  date: string;
}) {
  try {
    await addDoc(collection(db, 'match_history'), data);
  } catch (error) {
    console.error('Error saving match:', error);
  }
}

export async function getMatchHistory() {
  const q = query(collection(db, 'match_history'), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}
