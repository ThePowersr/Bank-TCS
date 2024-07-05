import React from 'react';
import { Modal, Animated, View, StyleSheet, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import ButtonCustom from '../atoms/ButtonCustom';

interface DeleteModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  productName: string;
  animationProps: {
    fadeIn: () => void;
    startMovingPosition: (toValue: number, duration: number, delay?: number) => void;
    position: Animated.Value;
  };
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onConfirm, onCancel, productName, animationProps }) => {
  const { fadeIn, position, startMovingPosition } = animationProps;

  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <Animated.View style={styles.overlay}>
        <Animated.View style={[styles.modal, { transform: [{ translateY: position }] }]}>
          <View style={styles.closeButtonContainer}>
            <Feather
              testID="feather-icon"
              name="x"
              size={24}
              color="black"
              onPress={() => {
                fadeIn();
                startMovingPosition(0, 900, 400);
                onCancel()
              }}
            />
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{`¿Estás seguro de eliminar el producto ${productName}?`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonCustom onPress={onConfirm} text="Confirmar" containerStyle={styles.confirmButton} />
            <ButtonCustom
              onPress={() => {
                fadeIn();
                startMovingPosition(0, 900, 400);
                onCancel();
              }}
              text="Cancelar"
              colorBackground="#dbd9d9"
              containerStyle={styles.cancelButton}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButtonContainer: {
    height: '15%',
    borderBottomWidth: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'gray',
    paddingRight: 10,
  },
  messageContainer: {
    height: '25%',
    borderBottomWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
  },
  message: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  confirmButton: {
    padding: 15,
    paddingBottom: 0,
  },
  cancelButton: {
    padding: 15,
    paddingBottom: 20,
  },
});

export default DeleteModal;
