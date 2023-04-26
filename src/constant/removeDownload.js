import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const removeDownloadFile = async (
    id,
    getDownloadMusic = () => null
) => {
    if (!id) return;

    const previousData = await AsyncStorage.getItem('musics');
    const newData = JSON.parse(previousData).filter(p => p.ID !== id);
    await AsyncStorage.setItem('musics', JSON.stringify(newData));

    Toast.show('Download Removed', Toast.LONG)
    getDownloadMusic();

};

export default removeDownloadFile;