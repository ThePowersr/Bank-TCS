import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InfoRow from '../molecules/InfoRow';
import FadeInImage from '../atoms/FadeInImage';
import { formatDate } from '../../helpers/formatDate';
import TextAtom from '../atoms/TextAtom';

interface ProductDetailsProps {
  name: string;
  id: string;
  logo: string;
  date_release: string;
  date_revision: string;
  description: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ name, id, logo, date_release, date_revision, description }) => (
  <View style={styles.container}>
    <View style={{ alignSelf: 'flex-start' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ID: {id}</Text>
      <Text style={{ color: 'gray' }}>Informacion extra</Text>
    </View>
    <View style={{ paddingTop: 40 }}>
      <InfoRow label="Nombre" content={name} />
      <InfoRow label="Descripcion" content={description} />
      <View style={styles.logoContainer}>
        <TextAtom style={styles.label}>Logo</TextAtom>
        <FadeInImage uri={logo} style={styles.logo} />
      </View>
      <InfoRow label="Fecha de liberacion" content={formatDate(date_release)} />
      <InfoRow label="Fecha de revision" content={formatDate(date_revision)} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingTop: 20,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    aspectRatio: 400 / 225,
    marginVertical: 10,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: 'gray',
  },
});

export default ProductDetails;
