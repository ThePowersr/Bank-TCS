import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Importa NavigationContainer
import HomeScreen from '../../screens/HomeScreen';
import axiosMock from '../../../__mocks__/axios';;

describe("render <HomeScreen/>", () => {

  const navigation: any = {
    navigate: jest.fn(),
  };
  const route: any = undefined;

  it("updates data on search", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <HomeScreen navigation={navigation} route={route} />
      </NavigationContainer>
    );
    const searchInput = getByTestId('search');
    //simulate search
    fireEvent.changeText(searchInput, 'searchTerm');
    //validate value input
    expect(searchInput.props.value).toBe('searchTerm');
  });

  it('handles API error', async () => {
    axiosMock.get.mockRejectedValueOnce(new Error('API error'));
    const consoleLogSpy = jest.spyOn(console, 'log');
    render(
      <NavigationContainer>
        <HomeScreen navigation={navigation} route={route} />
      </NavigationContainer>
    );
    // wait for error
    await new Promise(resolve => setTimeout(resolve, 100));
    // verify error call
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.objectContaining(new Error('API error')));
    // Restaura el spy
    // consoleLogSpy.mockRestore();
  });
  test('Button "Agregar" navigation to ProductRegistrationScreen', () => {

    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen navigation={navigation} route={route} />
      </NavigationContainer>
    );
    const addButton = getByText('Agregar');
    fireEvent.press(addButton);

    expect(navigation.navigate).toHaveBeenCalledWith('ProductRegistrationScreen');
  });

})
