import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import InputCustom from '../components/InputCustom';
import { validateInput } from '../helpers/validateInput';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigator';
import { TypeProduct } from '../types/product';
import ButtonCustom from '../components/atoms/ButtonCustom';

interface Props extends StackScreenProps<RootStackParams, 'EditProductScreen'> { };

const EditProductScreen = ({ navigation, route }: Props) => {
  const { product } = route.params;

  const [formValues, setFormValues] = useState<TypeProduct>({
    id: product.id,
    name: product.name,
    description: product.description,
    logo: product.logo,
    date_release: product.date_release,
    date_revision: product.date_revision,
  });

  const handleInputChange = (field: keyof TypeProduct, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleValidation = (field: keyof TypeProduct, value: string) => {
    const { errorMessage } = validateInput(field, value);
    return errorMessage;
  };

  const handleSubmit = () => {
    // Submit the form values
    console.log('Form submitted:', formValues);
  };

  return (
    <View style={styles.container}>
      <View >
        <InputCustom
          type="ID"
          title="ID"
          placeholder="Product ID"
          value={formValues.id}
          onChangeText={(text) => handleInputChange('id', text)}
          handleError={(error) => console.log('ID Error:', error)}
          editable={false}  // Disable the ID field
        />
        <InputCustom
          type="Nombre"
          title="Nombre"
          placeholder="Nombre de producto"
          value={formValues.name}
          onChangeText={(text) => handleInputChange('name', text)}
          handleError={(error) => console.log('Name Error:', error)}
        />
        <InputCustom
          type="Descripción"
          title="Descripción"
          placeholder="Descripción del producto"
          value={formValues.description}
          onChangeText={(text) => handleInputChange('description', text)}
          handleError={(error) => console.log('Description Error:', error)}
        />
        <InputCustom
          type="Logo"
          title="Logo"
          placeholder="Logo de producto"
          value={formValues.logo}
          onChangeText={(text) => handleInputChange('logo', text)}
          handleError={(error) => console.log('Logo Error:', error)}
        />
        <InputCustom
          type="Fecha de Liberación"
          title="Fecha de Liberación"
          placeholder="dd/mm/yyyy"
          value={formValues.date_release.toString()}
          onChangeText={(text) => handleInputChange('date_release', text)}
          handleError={(error) => console.log('Date Release Error:', error)}
        />
        <InputCustom
          type="Fecha de Revisión"
          title="Fecha de Revisión"
          placeholder="Fecha de Revisión"
          value={formValues.date_revision.toString()}
          onChangeText={(text) => handleInputChange('date_revision', text)}
          handleError={(error) => console.log('Date Revision Error:', error)}
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
