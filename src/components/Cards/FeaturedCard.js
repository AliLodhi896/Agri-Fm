import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView, useWindowDimensions } from 'react-native'

// import Constants
import Colors from '../../constant/Colors';
// import components
// import packages
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ListModals from './Modals/ListModals';
import { AuthContext } from '../../context/Context';
import RenderHtml from 'react-native-render-html';
import { ActivityIndicator } from 'react-native-paper';


const FeaturedCard = (props) => {
    const { language, downloadedPodcast, downloadedPodcastID } = useContext(AuthContext);
// console.log('props.id',props.ID)
    return (
        <TouchableOpacity onPress={props.onPress} style={{ justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 10 }}>
            <View style={{ width: '30%', height: 100 }}>
                <Image
                    source={{ uri: props.image }}
                    style={{
                        width: '100%', height: '100%', borderRadius: 10,
                        shadowColor: "#000000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.19,
                        shadowRadius: 5.62,
                        elevation: 6
                    }}
                />
            </View>
            <View style={{ flexDirection: 'column', width: '50%', marginHorizontal: 10 }}>
                {
                    props.channelName ?
                        <Text style={[styles.channelname, props.headingText]}>{props.channelName}</Text>
                        : null
                }
                {
                    props.renderHTML ?
                        <RenderHtml
                            contentWidth={useWindowDimensions().width}
                            source={{
                                html: `
                  <p style='color: black;padding:0;margin:0'>
                    ${props.podcastname}
                  </p>`
                            }}
                        /> :
                        <Text style={[styles.description, props.textstyle]} numberOfLines={2}>{props.podcastname}</Text>
                }

                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity style={styles.playButton} onPress={props.onPress}>
                        <Image
                            source={require('../../assets/Images/playbtn.png')}
                            style={{ width: '20%', height: 15, marginLeft: 10 }}
                        />
                        <Text style={{ color: 'white', marginLeft: 5 }}>{language?.Play}</Text>
                    </TouchableOpacity>
                    {props.time ? <Text style={[styles.timeText, props.timeText]}>{props.time}</Text> : null}
                </View>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '10%' }}>
                <TouchableOpacity style={{}} onPress={props.onPressIcon}>
                    <Entypo
                        name="dots-three-horizontal"
                        color={props.purpleIcon == true ? Colors.primary : 'white'}
                        size={25}
                    />
                </TouchableOpacity>
                {downloadedPodcastID?.includes(props.id) && props.id === props.id   ?
                    <TouchableOpacity >
                        <Ionicons
                            name="ios-cloud-download-outline"
                            color={'green'}
                            size={25}
                            style={{}}
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={props.onPressDownload}>
                        <Ionicons
                            name="ios-cloud-download-outline"
                            color={props.purpleIcon == true ? Colors.primary : 'white'}
                            size={25}
                            style={{}}
                        />

                    </TouchableOpacity>

                }

            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    channelname: {
        color: "white"
    },
    description: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.secondary,
    },
    playButton: {
        backgroundColor: Colors.button,
        padding: 5,
        borderRadius: 50,
        width: 90,
        alignItems: 'center',
        flexDirection: 'row'
    },
    timeText: {
        marginLeft: 10
    }
});
export default FeaturedCard