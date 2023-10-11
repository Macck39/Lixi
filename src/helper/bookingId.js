

export default function getUniqueID(){

    const prefix = 'LX';

  // Generate a random unique ID with 5 digits
  const uniqueId = `${prefix}-${generateRandomNumber(10000, 99999)}`;

  return uniqueId;

}

function generateRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }





