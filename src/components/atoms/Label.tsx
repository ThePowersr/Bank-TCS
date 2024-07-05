import React from 'react';
import { Text, TextProps } from 'react-native';

const Label: React.FC<TextProps> = (props) => (
  <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: '400' }} {...props} />
);

export default Label;