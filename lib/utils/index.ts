export const validateNameLength = (name: string) => {
  let error, price;

  switch (name.length) {
    case 1:
      error = "Names must be at least 3 characters in length.";
      price = 0;
      break;
    case 2:
      error = "Names must be at least 3 characters in length.";
      price = 0;
      break;
    case 3:
      price = 250;
      break;
    case 4:
      price = 100;
      break;
    default:
      price = 10;
  }

  return { price, error };
};
