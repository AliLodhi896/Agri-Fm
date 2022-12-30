import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../components/Header/Header';
import Colors from '../constant/Colors';

// ====================== icons ====================
import Input from '../components/Input/Input';
import CommonButton from '../components/Buttons/CommonButton';
import {AuthContext} from '../context/Context';
import {useForm} from 'react-hook-form';
import { base_url } from '../constant/Url';

const EditProfile = () => {
  const {UserData} = useContext(AuthContext);
  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      actual_name: UserData.nombre,
      surname: UserData.apellidos,
      ActualCompany: UserData.nombre,
      ActualMobilePhone: UserData.nombre,
      NewJob: UserData.cargo,
      NewActivity: UserData.actividad,
      NewLanguage: UserData.idioma,
      NewCountry: UserData.nombre,
    },
  });

  const onSubmit = async data => {
    const {
      ActualCompany,
      actual_name,
      ActualMobilePhone,
      surname,
      NewActivity,
      NewCountry,
      NewJob,
      NewLanguage,
    } = data;
    setLoading(true);
    try {
      let baseUrl = `${base_url}/ajax/editprofile-app.php`;

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: Name,
          lastname: Surname,
          codltf: '34',
          telefono: Phone,
          password: password,
          email: Email,
          country: country,
          NombreEmpresa: Company,
          actividad: activity,
          cargo: jobValue,
          espescies: selectedSpecies.toString(),
          detalles: selectedSpeciesDetail.toString(),
          idioma: lang,
        }),
      });

      const responseData = await response.json();

      setLoading(false);
      //   navigation.navigate('Home');
    } catch (error) {
      console.log('error => ', error);
      setLoading(false);
      //
      //
    }
  };
  const {language, selectedlang, setSelectedlang} = useContext(AuthContext);
  return (
    <ScrollView style={styles.mainBox}>
      <Header
        style={{backgroundColor: 'white', paddingHorizontal: 20}}
        textStyle={{color: Colors.primary, fontWeight: 'Bold'}}
        backgroundColor={'white'}
        icon={true}
        title={'Edit Profile'}
      />

      <View style={{marginVertical: 30}}>
        <Input
          name="actual_name"
          control={control}
          rules={{
            required: 'ActualName is required',
          }}
          placeholder={language?.ActualName}
        />
        {errors.actual_name && (
          <Text style={styles.errormessage}>
            * {errors.actual_name.message}
          </Text>
        )}
        <Input
          name="surname"
          control={control}
          rules={{
            required: 'surname is required',
          }}
          placeholder={language?.ActualSurname}
        />
        {errors.surname && (
          <Text style={styles.errormessage}>* {errors.surname.message}</Text>
        )}
        <Input
          name="ActualCompany"
          control={control}
          rules={{
            required: 'ActualCompany is required',
          }}
          placeholder={language?.ActualCompany}
        />
        {errors.ActualCompany && (
          <Text style={styles.errormessage}>
            * {errors.ActualCompany.message}
          </Text>
        )}
        <Input
          name="ActualMobilePhone"
          control={control}
          rules={{
            required: 'Actual Mobile Phone is required',
          }}
          placeholder={language?.ActualMobilePhone}
        />
        {errors.ActualMobilePhone && (
          <Text style={styles.errormessage}>
            * {errors.ActualMobilePhone.message}
          </Text>
        )}
        <Input
          name="NewJob"
          control={control}
          rules={{
            required: 'New Job is required',
          }}
          placeholder={language?.NewJob}
        />
        {errors.NewJob && (
          <Text style={styles.errormessage}>* {errors.NewJob.message}</Text>
        )}
        <Input
          name="NewActivity"
          control={control}
          rules={{
            required: 'New Activity is required',
          }}
          placeholder={language?.NewActivity}
        />
        {errors.NewActivity && (
          <Text style={styles.errormessage}>
            * {errors.NewActivity.message}
          </Text>
        )}
        <Input
          name="NewLanguage"
          control={control}
          rules={{
            required: 'New Language is required',
          }}
          placeholder={language?.NewLanguage}
        />
        {errors.NewLanguage && (
          <Text style={styles.errormessage}>
            * {errors.NewLanguage.message}
          </Text>
        )}
        <Input
          name="NewCountry"
          control={control}
          rules={{
            required: 'New Country is required',
          }}
          placeholder={language?.NewCountry}
        />
        {errors.NewCountry && (
          <Text style={styles.errormessage}>* {errors.NewCountry.message}</Text>
        )}
        <View style={{marginVertical: 30}}>
          <CommonButton green={true} title={language?.Update} />
          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontSize: 16,
              color: 'white',
              fontWeight: 'bold',
            }}>
            Cancel
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: Colors.primary,
    // paddingHorizontal: 20,
  },
  edit: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 100,
    padding: 5,
  },
  image: {width: 100, height: 100, borderRadius: 100},
  welcome: {
    color: Colors.secondary,
    fontSize: 25,
    fontWeight: '800',
    marginTop: 20,
  },
});

export default EditProfile;

const data = [
  {
    key: 'Mobile',
    value: '+44444',
  },
  {
    key: 'Company',
    value: 'Testing',
  },
  {
    key: 'Job',
    value: 'Full time',
  },
  {
    key: 'Activity',
    value: 'Media',
  },
  {
    key: 'Production',
    value: 'Avicultura',
  },
  {
    key: 'Details',
    value: 'list of intrestList of intrests',
  },
  {
    key: 'List of intrests',
  },
  {
    key: 'List of intrests',
  },
  {
    key: 'List of intrests',
  },
  {
    key: 'List of intrests',
  },
  {
    key: 'List of intrests',
  },
];
