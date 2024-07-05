import UseApiInstance from "../hooks/UseApiInstance";

export const validateId = async (id: string, setError: (error: string) => void, setColor: (color: string) => void) => {
  try {
    const response = await UseApiInstance.get(`/bp/products/verification?id=${id}`);
    if (response.data) {
      setError('ID no valido!');
      setColor('red');
    }
  } catch (error) {
    // Manejo de errores
  }
};