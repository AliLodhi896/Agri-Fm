import { Linking } from "react-native";


export const openWebsite = (language) => {
    let url = 'https://socialagri.com/agriFM/login/?pa=2';

    if (language == "pt") {
        url = 'https://socialagri.com/agriFM/pt-br/entrar/?pa=2'
    } else if ( language == "es"){
        url = 'https://socialagri.com/agriFM/es/acceso/?pa=2'
    } else {
        url = 'https://socialagri.com/agriFM/login/?pa=2'
    };

    Linking.openURL(url);
};