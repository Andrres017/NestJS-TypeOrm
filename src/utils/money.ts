export const formatoMexico = (number: string | number) => {

  
    // Si el número es un string, lo convertimos a número antes de formatearlo
    if (typeof number === 'string') {
      // Verificamos si hay algo a la derecha del punto decimal
      if (number.indexOf('.') !== -1 && number.split('.')[1].length === 0) {
        // Si no hay nada a la derecha del punto decimal, retornamos el número sin formato
        return number;
      }
      number = convertirANumero(number);
    }


    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    let arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp,rep);
    return arr[1] ? arr.join('.'): arr[0];
  }

export  const convertirANumero = (formattedNumber :string) => {
    // Removemos las comas del string formateado
    const numberString = formattedNumber.replace(/,/g, '');
    // Parseamos el string a un número
    return parseFloat(numberString);
  };