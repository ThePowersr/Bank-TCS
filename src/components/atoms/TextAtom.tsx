import React from 'react';
import { Text, TextProps } from 'react-native';

interface TextAtomProps extends TextProps {
  children: React.ReactNode;
}

const TextAtom: React.FC<TextAtomProps> = ({ children, ...props }) => (
  <Text {...props}>{children}</Text>
);

export default TextAtom;
