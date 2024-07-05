import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { RootStackParams } from '../navigator/Navigator';
import ButtonCustom from '../components/atoms/ButtonCustom';
import useAnimation from '../hooks/useAnimation';
import UseApiInstance from '../hooks/UseApiInstance';
import ProductDetails from '../components/molecules/ProductDetail';
import DeleteModal from '../components/organisms/DeleteModal';

interface Props extends StackScreenProps<RootStackParams, 'AdditionalInformationScreen'> { }

const AdditionalInformationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { name, id, logo, date_release, date_revision, description } = route.params.simpleProduct;
  const [visible, setVisible] = useState(false);
  const { fadeIn, position, startMovingPosition } = useAnimation();

  const handleEliminar = async () => {
    try {
      await UseApiInstance.delete(`/bp/products?id=${id}`);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditar = () => navigation.navigate('EditProductScreen', { product: route.params.simpleProduct })

  const handleCancel = () => {
    fadeIn();
    startMovingPosition(0, 900, 400);
    setTimeout(() => setVisible(false), 600);
  };

  return (
    <View style={styles.container}>
      <ProductDetails
        name={name}
        id={id}
        logo={logo}
        date_release={date_release.toString()}
        date_revision={date_revision.toString()}
        description={description}
      />
      <View style={{ width: '100%', flex: 1, height: '10%', justifyContent: 'center' }}>
        <ButtonCustom
          onPress={handleEditar}
          text="Editar"
          colorBackground="#dbd9d9"
          containerStyle={{ width: '100%' }}
        />
        <View style={{ height: '5%' }} />
        <ButtonCustom
          text='Eliminar'
          onPress={() => {
            setVisible(true);
            fadeIn();
            startMovingPosition(200, 900);
          }}
          colorBackground='#e61919'
          colorText='white'
          containerStyle={{ width: '100%' }}
        />
      </View>
      <DeleteModal
        visible={visible}
        onConfirm={handleEliminar}
        onCancel={handleCancel}
        productName={name}
        animationProps={{ fadeIn, startMovingPosition, position }}
      />
    </View>
  );
};

export default AdditionalInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingTop: 20,
    justifyContent: 'space-between'
  },
});
