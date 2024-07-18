import { fireEvent, render, waitFor } from "@testing-library/react-native";
import EditProductScreen from "../../screens/EditProductScreen";
import React from "react";
import UseApiInstance from "../../hooks/UseApiInstance";
import { Alert } from "react-native";

// Mock de UseApiInstance para todas las pruebas
jest.mock('../../hooks/UseApiInstance.ts');

// Mock de Alert
const mockAlert = jest.spyOn(Alert, 'alert');

const mockRoute: any = {
  params: {
    product: {
      id: '123',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'https://example.com/logo.png',
      date_release: '10/10/2024',
      date_revision: '10/10/2025',
    },
  },
};

const mockNavigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockProps = {
  navigation: mockNavigation,
  route: mockRoute,
};

describe("EditProductScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<EditProductScreen {...mockProps} />);

    // Verificar que los campos de entrada estén presentes
    expect(getByPlaceholderText('ID del producto')).toBeTruthy();
    expect(getByPlaceholderText('Nombre del producto')).toBeTruthy();
    expect(getByPlaceholderText('Descripcion del producto')).toBeTruthy();
    expect(getByPlaceholderText('Logo del producto')).toBeTruthy();
    expect(getByPlaceholderText('Fecha de revision')).toBeTruthy();
    expect(getByPlaceholderText('Fecha de Liberacion del producto')).toBeTruthy();
  });

  it('should handle form submission and navigate to Home', async () => {
    // Mockear la función put de UseApiInstance para resolver exitosamente
    jest.spyOn(UseApiInstance, 'put').mockResolvedValue({});

    const { getByText, getByPlaceholderText } = render(<EditProductScreen {...mockProps} />);

    const inputName = getByPlaceholderText("Nombre del producto");
    fireEvent.changeText(inputName, 'New Product Name');

    fireEvent.press(getByText('Guardar'));

    expect(UseApiInstance.put).toHaveBeenCalledWith('/bp/products', {
      id: mockRoute.params.product.id,
      name: 'New Product Name',
      description: mockRoute.params.product.description,
      logo: mockRoute.params.product.logo,
      date_release: new Date(mockRoute.params.product.date_release).toISOString(),
      date_revision: new Date(mockRoute.params.product.date_revision).toISOString(),
    });
    await waitFor(() => {
      expect(mockProps.navigation.navigate).toHaveBeenCalledWith('Home');
    });
  });

  it('should show alert on API error', async () => {
    // Mockear la función put de UseApiInstance para rechazar con un error
    const mockApiResponse = { response: { data: 'Error en la solicitud' } };
    jest.spyOn(UseApiInstance, 'put').mockRejectedValue(mockApiResponse);

    const { getByText, getByPlaceholderText } = render(<EditProductScreen {...mockProps} />);

    const inputName = getByPlaceholderText("Nombre del producto");
    fireEvent.changeText(inputName, 'New Product Name');

    fireEvent.press(getByText('Guardar'));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Error', 'Error en la solicitud', [
        {
          text: 'Aceptar'
        }
      ]);
    });
    mockAlert.mockRestore();
  });

  it('should handle text input changes', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(<EditProductScreen {...mockProps} />);

    // Cambiar el texto de cada campo y verificar que se actualiza el formulario
    fireEvent.changeText(getByPlaceholderText('ID del producto'), 'id');
    fireEvent.changeText(getByPlaceholderText('Nombre del producto'), 'Nuevo Nombre');
    fireEvent.changeText(getByPlaceholderText('Descripcion del producto'), 'Nueva Descripcion');
    fireEvent.changeText(getByPlaceholderText('Logo del producto'), 'https://example.com/nuevo_logo.png');
    fireEvent.changeText(getByPlaceholderText('Fecha de Liberacion del producto'), '05/10/2024');

    // Verificar que el estado del formulario se ha actualizado
    expect(getByDisplayValue('123')).toBeTruthy();
    expect(getByDisplayValue('Nuevo Nombre')).toBeTruthy();
    expect(getByDisplayValue('Nueva Descripcion')).toBeTruthy();
    expect(getByDisplayValue('https://example.com/nuevo_logo.png')).toBeTruthy();
    expect(getByDisplayValue('05/10/2024')).toBeTruthy();
  });

});
