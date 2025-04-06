import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export const playClick = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/click.wav')
    );
    await sound.playAsync();
  } catch (error) {
    console.log('Sound error:', error);
  }
};

export const vibrate = () => {
  Haptics.selectionAsync();
};
