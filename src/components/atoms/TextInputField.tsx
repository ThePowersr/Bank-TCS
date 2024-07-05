import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface TextInputFieldProps extends TextInputProps {
  borderColor: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ borderColor, ...props }) => (
  <TextInput
    style={{ padding: 10, borderWidth: 1, borderRadius: 2, borderColor }}
    {...props}
  />
);

export default TextInputField;
