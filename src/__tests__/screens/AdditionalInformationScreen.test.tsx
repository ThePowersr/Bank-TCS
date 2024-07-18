import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react-native';
import AdditionalInformationScreen from '../../screens/AdditionalInformationScreen';
import { formatDate } from '../../helpers/formatDate';

const mockRoute: any = {
  params: {
    simpleProduct: {
      id: 123,
      name: 'Product Name',
      description: 'Product Description',
      logo: 'https://example.com/logo.png',
      date_release: '2022-05-10',
      date_revision: '2022-05-15',
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

describe('AdditionalInformationScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<AdditionalInformationScreen {...mockProps} />);

    // Verify initial render
    expect(getByText('ID: 123')).toBeTruthy();
    expect(getByText('Product Name')).toBeTruthy();
    expect(getByText('Product Description')).toBeTruthy();
    expect(getByText('Fecha de liberacion')).toBeTruthy();
    expect(getByText('Fecha de revision')).toBeTruthy();
    expect(getByTestId('image')).toBeTruthy();
  });

  it('displays correct product information', () => {
    const { getByText } = render(<AdditionalInformationScreen {...mockProps} />);

    // Verify product details
    expect(getByText(`ID: ${mockRoute.params.simpleProduct.id}`)).toBeTruthy();
    expect(getByText(mockRoute.params.simpleProduct.name)).toBeTruthy();
    expect(getByText(mockRoute.params.simpleProduct.description)).toBeTruthy();
    expect(getByText(formatDate(mockRoute.params.simpleProduct.date_release))).toBeTruthy();
    expect(getByText(formatDate(mockRoute.params.simpleProduct.date_revision))).toBeTruthy();
  });

  it('displays delete confirmation modal when "Eliminar" button is pressed', async () => {
    const { getByText, queryByText } = render(<AdditionalInformationScreen {...mockProps} />);

    // Verify modal starts closed
    expect(queryByText('¿Estás seguro de eliminar el producto Product Name?')).toBeNull();

    // Open modal
    await act(async () => {
      fireEvent.press(getByText('Eliminar'));
      await waitFor(() => {
        expect(getByText('¿Estás seguro de eliminar el producto Product Name?')).toBeTruthy();
      });
      await waitFor(() => {
        fireEvent.press(getByText('Confirmar'));
      });
    });
  });

  it('hides delete confirmation modal when "Cancelar" button is pressed', async () => {
    const { getByText, queryByText } = render(<AdditionalInformationScreen {...mockProps} />);

    // Open modal
    await act(async () => {
      fireEvent.press(getByText('Eliminar'));
      await waitFor(() => {
        expect(getByText('¿Estás seguro de eliminar el producto Product Name?')).toBeTruthy();
      });
    });

    // Close modal
    await act(async () => {
      fireEvent.press(getByText('Cancelar'));
      await waitFor(() => {
        expect(queryByText('¿Estás seguro de eliminar el producto Product Name?')).toBeNull();
      });
    });
  });

  it('handles close icon press', async () => {
    const { getByText, getByTestId, queryByText } = render(<AdditionalInformationScreen {...mockProps} />);

    // Open modal
    await act(async () => {
      fireEvent.press(getByText('Eliminar'));
      await waitFor(() => {
        expect(getByText('¿Estás seguro de eliminar el producto Product Name?')).toBeTruthy();
      });
    });

    // Close modal by pressing close icon
    await act(async () => {
      fireEvent.press(getByTestId('feather-icon'));
      await waitFor(() => {
        expect(queryByText('¿Estás seguro de eliminar el producto Product Name?')).toBeNull();
      });
    });
  });
});
