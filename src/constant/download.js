import { PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';

const downloadFile = async (
    url,
    fileName = "",
    id,
    image = "https://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-250x200.png",
    channelName,
    getDownloadMusic = () => null
) => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: 'Music',
            message:
                'App needs access to your Files... ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
        },
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;

    if (fileName.length < 1 || !id || !url) return;

    const isDownloading = await AsyncStorage.getItem('isDownloading');
    if (JSON.parse(isDownloading)) {
        Toast.show('Podcast already downloading...', Toast.SHORT)
        return;
    }

    const previousData = await AsyncStorage.getItem('musics');

    if (previousData) {
        const podcastExists = JSON.parse(previousData).some((p) => {
            return p.ID === id;
        });

        if (podcastExists) {
            Toast.show('Podcast already downloaded.', Toast.SHORT)
            return;
        }
    }

    const podcastname = fileName;

    if (fileName.length > 20) {
        fileName = fileName.slice(0, 19);
    };
    fileName = fileName.replace(":", "").replace("$", "").replace("&", "").replace("#", "");

    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;

    Toast.show('Download Started...', Toast.SHORT)
    AsyncStorage.setItem('isDownloading', JSON.stringify(true));

    return config({
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: fileName,
            mime: 'audio/mpeg',
            path: `${downloads}/${fileName}.mp3`,
        },
    })
        .fetch('GET', url)
        .then(async () => {
            console.log('File downloaded');

            Toast.show('Download Ended', Toast.LONG)
            AsyncStorage.setItem('isDownloading', JSON.stringify(false));


            const newObject = {
                ID: id,
                TITLE: podcastname,
                image: image,
                LINK: `${downloads}/${fileName}.mp3`,
                CHANNEL_NAME: channelName ? channelName : ""
            };

            let data = [];

            if (previousData !== null) {
                data = JSON.parse(previousData);
                data.push(newObject);
                const dataString = JSON.stringify(data);
                await AsyncStorage.setItem('musics', dataString);
            } else {
                data.push(newObject);
                const dataString = JSON.stringify(data);
                await AsyncStorage.setItem('musics', dataString);
            }

            getDownloadMusic();

        })
        .catch(error => {
            console.log('Error downloading file: ', error);

            Toast.show('Download Failed', Toast.LONG)
            AsyncStorage.setItem('isDownloading', JSON.stringify(false));
        });
};

export default downloadFile;