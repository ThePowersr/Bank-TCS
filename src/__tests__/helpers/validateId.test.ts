import { validateId } from "../../helpers/validateId";
import UseApiInstance from "../../hooks/UseApiInstance";


// Mock del hook UseApiInstance
jest.mock('../../hooks/UseApiInstance');

describe('validateId', () => {
  it('should set error and color when API returns data', async () => {
    // Mock de la respuesta de UseApiInstance.get
    (UseApiInstance.get as jest.Mock).mockResolvedValueOnce({ data: true });

    const setError = jest.fn();
    const setColor = jest.fn();

    await validateId('123', setError, setColor);

    expect(setError).toHaveBeenCalledWith('ID no valido!');
    expect(setColor).toHaveBeenCalledWith('red');
  });

  it('should not set error or color when API does not return data', async () => {
    // Mock de la respuesta de UseApiInstance.get
    (UseApiInstance.get as jest.Mock).mockResolvedValueOnce({ data: false });

    const setError = jest.fn();
    const setColor = jest.fn();

    await validateId('123', setError, setColor);

    expect(setError).not.toHaveBeenCalled();
    expect(setColor).not.toHaveBeenCalled();
  });

  it('should handle errors from the API call', async () => {
    // Mock de la respuesta de UseApiInstance.get para que lance un error
    (UseApiInstance.get as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    const setError = jest.fn();
    const setColor = jest.fn();

    await validateId('123', setError, setColor);

  });
});
