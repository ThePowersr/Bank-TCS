import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductRegistrationScreen from '../screens/ProductRegistrationScreen';
import { Alert } from 'react-native';
import UseApiInstance from '../hooks/UseApiInstance';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigator';
import { RouteProp } from '@react-navigation/native';

const mockNavigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockRoute: RouteProp<RootStackParams, 'ProductRegistrationScreen'> = {
  key: 'test-key',
  name: 'ProductRegistrationScreen',
  params: undefined,
};

const mockProps: StackScreenProps<RootStackParams, 'ProductRegistrationScreen'> = {
  navigation: mockNavigation,
  route: mockRoute,
};


describe('ProductRegistrationScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<ProductRegistrationScreen {...mockProps} />);

    // Verificar que los elementos de texto estén presentes
    expect(getByText('Formulario de Registro')).toBeTruthy();

    // Verificar que los campos de entrada estén presentes
    expect(getByPlaceholderText('ID del producto')).toBeTruthy();
    expect(getByPlaceholderText('Nombre del producto')).toBeTruthy();
    expect(getByPlaceholderText('Descripcion del producto')).toBeTruthy();
    expect(getByPlaceholderText('Logo del producto')).toBeTruthy();
    expect(getByPlaceholderText('Fecha de revision')).toBeTruthy();
    expect(getByPlaceholderText('Fecha de Liberacion del producto')).toBeTruthy();
  });

  it('handles input correctly', () => {
    const { getByPlaceholderText, debug } = render(<ProductRegistrationScreen {...mockProps} />);
    const idInput = getByPlaceholderText('ID del producto');
    // debug()

    // Simular entrada de texto en el campo de ID
    fireEvent.changeText(idInput, '123456');
    expect(idInput.props.value).toBe('123456');
  });
  it('displays alert when submitting empty form', async () => {
    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation(() => { });

    const { getByText } = render(<ProductRegistrationScreen {...mockProps} />);
    // simulate press
    fireEvent.press(getByText('Enviar'));
    // await call to Alert.alert
    expect(mockAlert).toHaveBeenCalledTimes(1);
    // message of alert
    const expectedMessage = 'No puedes guardar campos con error o vacios.';
    expect(mockAlert).toHaveBeenCalledWith('Error', expectedMessage, [{ text: 'Aceptar' }]);
    //});
    // restore mock
    waitFor(() => {
      mockAlert.mockRestore();
    })
  });
});


describe('handleSubmit function', () => {
  it('displays alert with API error message', async () => {
    const mockApiResponse = { response: { data: 'Error en la solicitud' } };
    // Mock de la función post de UseApiInstance para simular una solicitud fallida
    jest.spyOn(UseApiInstance, 'post').mockRejectedValue(mockApiResponse);

    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation(() => { });

    const { getByText, getByTestId } = render(<ProductRegistrationScreen {...mockProps} />);


    fireEvent.changeText(getByTestId('ID'), 'nombre');
    fireEvent.changeText(getByTestId('Nombre'), 'nombre');
    fireEvent.changeText(getByTestId('Descripcion'), 'descripcion larga');
    fireEvent.changeText(getByTestId('Logo'), 'logo');
    fireEvent.changeText(getByTestId('FechaLiberacion'), '20/09/2024');

    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledTimes(1);
      const expectedErrorMessage = 'Error en la solicitud';
      expect(mockAlert).toHaveBeenCalledWith('Error', expectedErrorMessage, [{ text: 'Aceptar' }]);
    });

    // restore mock
    mockAlert.mockRestore();
    //UseApiInstance.post.mockRestore();
  });

  it('navigates to Home on successful form submission after error', async () => {
    // Mock de la función post de UseApiInstance para simular una solicitud exitosa
    jest.spyOn(UseApiInstance, 'post').mockResolvedValue({});

    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation(() => { });

    const { getByText, getByTestId } = render(<ProductRegistrationScreen {...mockProps} />);

    fireEvent.changeText(getByTestId('ID'), 'nombre');
    fireEvent.changeText(getByTestId('Nombre'), 'nombre');
    fireEvent.changeText(getByTestId('Descripcion'), 'descripcion larga');
    fireEvent.changeText(getByTestId('Logo'), 'logo');
    fireEvent.changeText(getByTestId('FechaLiberacion'), '20/09/2024');

    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      // Verifica que la navegación ocurra después de una respuesta exitosa
      expect(mockProps.navigation.navigate).toHaveBeenCalledWith('Home');
    });

    // restore mocks
    mockAlert.mockRestore();
  });
});
