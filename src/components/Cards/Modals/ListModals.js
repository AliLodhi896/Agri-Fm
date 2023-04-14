import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../../../context/Context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { onValue, ref } from 'firebase/database';
import database from '../../../../firebaseConfig';

const ListModals = (props) => {
    const { language, podcast_id, favoritePodcat_id, downloadedPodcastID, UserData } = useContext(AuthContext);
    const navigation = useNavigation();
    const [favouritePodcasts, setfavouritePodcasts] = useState([]);


    function convertToString(value) {
        if (typeof value === 'string') {
            return value;
        } else if (typeof value === 'number') {
            return value.toString();
        } else {
            return value;
        }
    }

    const strPodcastID = convertToString(podcast_id);

    useEffect(() => {
        const dbRef = ref(database, `Library/Podcasts/${UserData[0]?.user}`);
        onValue(dbRef, (snapshot) => {
            let data = snapshot.val();
            let arr = data || data?.length ? Object.values(data) : [];
            let arr1 = arr.map(ch => convertToString(ch.acf.id));
            setfavouritePodcasts(arr1)
        })
    }, []);

    useEffect(() => {
        console.log("🚀 ~ file: ListModals.js:40 ~ useEffect ~ strPodcastID:", strPodcastID)
        console.log(favouritePodcasts?.includes(strPodcastID));
    }, [props.isVisible]);

    console.log('downloadedPodcastID', downloadedPodcastID, podcast_id)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onBackButtonPress={props.onClose}
            onBackdropPress={props.onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.second_view} onPress={props.onPressClose} >
                        <MaterialIcons name='close' color={Colors.primary} size={27} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center', marginHorizontal: 30, width: '100%' }}>
                        <TouchableOpacity onPress={() => props.navigatetolibrary ? props.navigatetolibrary() : (props.onClose(), navigation.navigate('MyLibrary'))} style={styles.second_view} >
                            <Text style={{ color: Colors.primary, fontSize: 16 }}>
                                {language?.GoToLibrary}
                            </Text>
                            <Image style={{ width: '15%', height: 25 }} source={require('../../../assets/Images/asdsa.png')} />
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: Colors.primary, opacity: 0.5, marginTop: 15 }}></View>
                        {downloadedPodcastID?.includes(podcast_id) && podcast_id === podcast_id ?
                            <TouchableOpacity style={styles.second_view} onPress={props.onPressRemoveDownload}>
                                <Text style={{ color: Colors.primary, fontSize: 16 }}>
                                    {language?.removeDownload}
                                </Text>
                                <Image style={{ width: '12%', height: 27 }} source={require('../../../assets/Images/downlaod.png')} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.second_view} onPress={props.onPressDownload}>
                                <Text style={{ color: Colors.primary, fontSize: 16 }}>
                                    {language?.DownloadPodcast}
                                </Text>
                                <Image style={{ width: '12%', height: 27 }} source={require('../../../assets/Images/downlaod.png')} />
                            </TouchableOpacity>
                        }


                        <View style={{ height: 1, backgroundColor: Colors.primary, opacity: 0.5, marginTop: 15 }}></View>
                        <TouchableOpacity style={styles.second_view} onPress={props.onPressShare}>
                            <Text style={{ color: Colors.primary, fontSize: 16 }}>
                                {language?.Share}
                            </Text>
                            <Image style={{ width: '12%', height: 20 }} source={require('../../../assets/Images/shares.png')} />
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: Colors.primary, opacity: 0.5, marginTop: 15 }}></View>
                        {favouritePodcasts?.includes(strPodcastID) && strPodcastID === strPodcastID ?
                            <TouchableOpacity style={styles.second_view} onPress={props.onPressRemove}  >
                                <Text style={{ color: Colors.primary, fontSize: 16 }}>
                                    {language?.RemoveFromLibrary}
                                </Text>
                                <Image style={{ width: '12%', height: 24 }} source={require('../../../assets/Images/fav.png')} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.second_view} onPress={props.onPressaddTo}  >
                                <Text style={{ color: Colors.primary, fontSize: 16 }}>
                                    {language?.AddToLibrary}
                                </Text>
                                <Image style={{ width: '12%', height: 25 }} source={require('../../../assets/Images/fav.png')} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        width: '70%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
        paddingBottom: 30
    },
    second_view: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 20,
        paddingHorizontal: 15,
        paddingTop: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between'
    },
    successText: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 15,
        fontFamily: 'Poppins-Regular',
    },
    para: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
    },
});

export default ListModals;