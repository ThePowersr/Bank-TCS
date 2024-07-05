import React from 'react';
import { Text, TextProps } from 'react-native';

const ErrorMessage: React.FC<TextProps> = (props) => (
  <Text style={{ color: 'red' }} {...props} />
);

export default ErrorMessage;