import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { validateId } from '../helpers/validateId';
import { validateInput } from '../helpers/validateInput';
import Label from './atoms/Label';
import TextInputField from './atoms/TextInputField';
import ErrorMessage from './atoms/ErrorMessage';

interface Props {
  isRequired?: boolean;
  type?: 'ID' | 'Nombre' | 'Descripción' | 'Logo' | 'Fecha de Liberación' | 'Fecha de Revisión';
  onChangeText?: (text: string) => void;
  fechaLiberacion?: string;
  handleError?: (error: string) => void;
  handleValue?: (value: string) => void;
  title: string;
  placeholder: string;
  maxLength?: number;
  value?: string; // Add value prop
  editable?: boolean; // Add editable prop
}

const InputCustom: React.FC<Props> = ({
  type = '', onChangeText, fechaLiberacion, handleError, handleValue, title, placeholder, maxLength, value: initialValue = '', editable = true
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [color, setColor] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (type === 'Fecha de Revisión' && fechaLiberacion) {
      setValue(fechaLiberacion);
      handleValue?.(fechaLiberacion);
    }
  }, [type, fechaLiberacion]);

  useEffect(() => {
    if (type === 'ID' && isTouched) {
      validateId(value, setError, setColor);
    }
  }, [value, type]);

  const handleValidation = (text: string) => {
    if (editable) {
      const { errorMessage, color } = validateInput(type, text);
      setValue(text);
      setError(errorMessage);
      setColor(color);
      handleValue?.(text);
      handleError?.(errorMessage);
      onChangeText?.(text);
    }
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Label>{title}</Label>
      <TextInputField
        testID={title}
        borderColor={color}
        autoCapitalize='none'
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={() => setIsTouched(true)}
        value={value}
        onChangeText={handleValidation}
        editable={editable}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </View>
  );
};

export default InputCustom;
