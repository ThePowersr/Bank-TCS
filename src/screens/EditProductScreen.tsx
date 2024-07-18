import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import InputCustom from '../components/InputCustom';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigator';
import { TypeProduct } from '../types/product';
import ButtonCustom from '../components/atoms/ButtonCustom';
import UseApiInstance from '../hooks/UseApiInstance';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps<RootStackParams, 'EditProductScreen'> { };

const EditProductScreen = ({ navigation, route }: Props) => {
  const { product } = route.params;

  const { form, onChange } = useForm<TypeProduct>({
    id: product.id || '',
    name: product.name || '',
    description: product.description || '',
    logo: product.logo || '',
    date_release: product.date_release || '',
    date_revision: product.date_revision || '',
  });

  const handleInputChange = (field: keyof TypeProduct, value: string) => {
    onChange(value, field);
  };

  const handleSubmit = async () => {
    try {
      const { id, name, description, logo, date_release, date_revision } = form;
      const formattedFechaLiberacion = date_release ? new Date(date_release).toISOString() : null;
      const formattedFechaRevision = date_revision ? new Date(date_revision).toISOString() : null;

      await UseApiInstance.put('/bp/products', {
        id,
        name,
        logo,
        description,
        date_release: formattedFechaLiberacion,
        date_revision: formattedFechaRevision,
      });
      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Error', `${error.response.data}`, [
        {
          text: 'Aceptar'
        }
      ]);
    }

  };

  return (
    <View style={styles.container}>
      <View>
        <InputCustom
          type="ID"
          title="ID"
          placeholder="ID del producto"
          value={form.id}
          //onChangeText={(text) => handleInputChange('id', text)}
          // handleError={(error) => console.log('ID Error:', error)}
          editable={false}  // Disable the ID field
        />
        <InputCustom
          type="Nombre"
          title="Nombre"
          placeholder="Nombre del producto"
          value={form.name}
          onChangeText={(text) => handleInputChange('name', text)}
        // handleError={(error) => console.log('Name Error:', error)}
        />
        <InputCustom
          type="Descripción"
          title="Descripción"
          placeholder="Descripcion del producto"
          value={form.description}
          onChangeText={(text) => handleInputChange('description', text)}
        // handleError={(error) => console.log('Description Error:', error)}
        />
        <InputCustom
          type="Logo"
          title="Logo"
          placeholder="Logo del producto"
          value={form.logo}
          onChangeText={(text) => handleInputChange('logo', text)}
        // handleError={(error) => console.log('Logo Error:', error)}
        />
        <InputCustom
          type="Fecha de Liberación"
          title="Fecha de Liberacion del producto"
          placeholder="Fecha de Liberacion del producto"
          value={form.date_release.toString()}
          onChangeText={(text) => handleInputChange('date_release', text)}
        // handleError={(error) => console.log('Date Release Error:', error)}
        />
        <InputCustom
          type="Fecha de Liberación"
          title="Fecha de revision"
          placeholder="Fecha de revision"
          value={form.date_revision.toString()}
          //onChangeText={(text) => handleInputChange('date_revision', text)}
          // handleError={(error) => console.log('Date Revision Error:', error)}
          editable={false}  // Disable the Fecha de Revisión field
        />
      </View>
      <ButtonCustom text='Guardar' onPress={handleSubmit} containerStyle={{ paddingBottom: 40 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
  },
});

export default EditProductScreen;
