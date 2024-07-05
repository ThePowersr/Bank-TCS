export const validateInput = (type: string, text: string) => {
  let errorMessage = '';
  let color = 'black';

  switch (type) {
    case 'ID':
      if (text.length < 3 || text.length > 10) {
        errorMessage = 'ID no valido!';
        color = 'red';
      }
      break;
    case 'Nombre':
      if (text.length < 5 || text.length > 100) {
        errorMessage = 'Este campo es requerido';
        color = 'red';
      }
      break;
    case 'Descripción':
      if (text.length < 10 || text.length > 200) {
        errorMessage = 'Este campo es requerido';
        color = 'red';
      }
      break;
    case 'Logo':
      if (text.length === 0) {
        errorMessage = 'Este campo es requerido';
        color = 'red';
      }
      break;
    case 'Fecha de Liberación':
      const dateParts = text.split('/');
      const inputDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      if (isNaN(inputDate.getTime())) {
        errorMessage = 'La fecha ingresada no es válida.';
        color = 'red';
      } else {
        const today = new Date().toLocaleDateString('es-EC');
        const datePartsToday = today.split('/');
        const inputDateToday = new Date(`${datePartsToday[2]}-${datePartsToday[1]}-${datePartsToday[0]}`);
        if (inputDate < inputDateToday) {
          errorMessage = 'Fecha no válida.';
          color = 'red';
        }
      }
      break;
  }
  return { errorMessage, color };
};
