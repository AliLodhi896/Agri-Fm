import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import RNFS from 'react-native-fs';
import TrackPlayer from 'react-native-track-player';

const removeDownloadFile = (
    id,
    getDownloadMusic = () => null,
    callback = () => null,
    closeModal = () => null
) => {
    if (!id) return;
    callback();

    setTimeout(async () => {
        // alert("REMOVE working")
        const previousData = await AsyncStorage.getItem('musics');

        const filePath = JSON.parse(previousData).find(p => p.ID == id);
        RNFS.unlink(filePath.LINK)
            .then(async () => {
                console.log('File deleted successfully.');

                const newData = JSON.parse(previousData).filter(p => p.ID !== id);
                await AsyncStorage.setItem('musics', JSON.stringify(newData));

                Toast.show('Download Removed', Toast.LONG)
                getDownloadMusic();
                closeModal();
                // TrackPlayer.pause();
            })
            .catch((error) => {
                console.log(`Error deleting file: ${error}`);
                Toast.show('Error Removing Download', Toast.LONG)
            });
    }, 100)

};

export default removeDownloadFile;