import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CommonBack = (props) => {
    return (
        <Text style={styles.title}>{props.title}</Text>

    );
};

const styles = StyleSheet.create({
    title: { color: 'white', fontSize: 16, textAlign: 'center', marginTop: 20, fontWeight: 'bold' },
});

export default CommonBack;