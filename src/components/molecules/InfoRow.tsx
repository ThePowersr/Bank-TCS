import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextAtom from '../atoms/TextAtom';

interface InfoRowProps {
  label: string;
  content: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, content }) => (
  <View style={styles.container}>
    <TextAtom style={styles.label}>{label}</TextAtom>
    <TextAtom style={styles.content}>{content}</TextAtom>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    color: 'gray',
    fontSize: 16
  },
  content: {
    fontSize: 16
  }
});

export default InfoRow;
