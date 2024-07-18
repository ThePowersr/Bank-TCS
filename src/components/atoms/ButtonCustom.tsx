import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native'

interface Props extends TouchableOpacityProps {
  onPress: () => void;
  text: string;
  colorText?: string;
  colorBackground?: string;
  containerStyle?: ViewStyle;
}

const ButtonCustom = ({ onPress, text, colorText, colorBackground, containerStyle, accessible, accessibilityHint, accessibilityLabel }: Props) => {
  return (
    <View style={{ paddingBottom: 0, ...containerStyle }}>
      <TouchableOpacity
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessible={accessible}
        testID={text}
        style={
          {
            backgroundColor: colorBackground ?? '#ffdf00',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            padding: 20,
            elevation: 1,
          }
        }
        onPress={onPress}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', color: colorText ?? '#1515b3' }}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonCustom
