import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native'
import InputCustom from '../components/InputCustom'
import ButtonCustom from '../components/atoms/ButtonCustom'
import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import UseApiInstance from '../hooks/UseApiInstance'
import { fechaLiberacionChange, formatDateYyyyMmDd, initDate } from '../helpers/formatDate'
import { RootStackParams } from '../navigator/Navigator'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<RootStackParams, 'ProductRegistrationScreen'> { }

const ProductRegistrationScreen: React.FC<Props> = ({ navigation }) => {

  const [error, setError] = useState('');
  const [valueRevision, setValueRevision] = useState('');
  const { form, onChange } = useForm({ id: '', nombre: '', descripcion: '', logo: '', fechaLiberacion: valueRevision, fechaRevision: '' });

  const [fechaLiberacion, setFechaLiberacion] = useState(initDate);

  const handleFechaLiberacionChange = (fecha: string) => {
    const dateUpdate = fechaLiberacionChange(fecha);
    setFechaLiberacion(dateUpdate);
    onChange(fecha, 'fechaLiberacion')
  }

  const handleError = (error: string) => {
    setError(error)
  }

  const handleValue = (value: string) => {
    setValueRevision(value);
    onChange(value, 'fechaRevision')
  }

  const handleSubmit = async () => {
    const { descripcion, fechaLiberacion, id, nombre, logo } = form;
    if (error || fechaLiberacion == '') {
      console.log(valueRevision);
      console.log(error);
      Alert.alert('Error', 'No puedes guardar campos con error o vacios.', [
        {
          text: 'Aceptar'
        },
      ])
      return;
    }
    const formattedFechaLiberacion = formatDateYyyyMmDd(fechaLiberacion);
    const formattedFechaRevision = formatDateYyyyMmDd(valueRevision);
    try {
      await UseApiInstance.post('/bp/products', {
        id,
        name: nombre,
        logo,
        description: descripcion,
        date_release: formattedFechaLiberacion,
        date_revision: formattedFechaRevision,
      })
      navigation.navigate('Home')
      //console.log(post.data);
    } catch (error: any) {
      //console.log(error.response.data);
      Alert.alert('Error', `${error.response.data}`, [
        {
          text: 'Aceptar'
        }
      ])
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: 'white', flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, width: '90%' }}>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Formulario de Registro</Text>
          </View>
          <View style={{ paddingTop: 20 }}>
            <InputCustom title='ID' placeholder='ID del producto' type='ID' onChangeText={(value) => onChange(value, 'id')} handleError={handleError} />
            <InputCustom title='Nombre' placeholder='Nombre del producto' type='Nombre' onChangeText={(value) => onChange(value, 'nombre')} handleError={handleError} />
            <InputCustom title='Descripcion' placeholder='Descripcion del producto' type='Descripción' onChangeText={(value) => onChange(value, 'descripcion')} handleError={handleError} />
            <InputCustom title='Logo' placeholder='Logo del producto' type='Logo' onChangeText={(value) => onChange(value, 'logo')} handleError={handleError} />
            <InputCustom title='FechaLiberacion' placeholder='Fecha de Liberacion del producto' type='Fecha de Liberación' onChangeText={handleFechaLiberacionChange} handleError={handleError} />
            <InputCustom title='FechaRevision' placeholder='ejemplo: sldkfj' type='Fecha de Revisión' editable={false} fechaLiberacion={fechaLiberacion} handleValue={handleValue} />
          </View>
          <ButtonCustom text='Enviar' onPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  )
}

export default ProductRegistrationScreen
