import { parseTwoNumbersAndString } from './utils/index';

type Result = string | number;

const calculator = (a: number, b: number, op : string): Result => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}

try {
  const { value1, value2, operator } = parseTwoNumbersAndString(process.argv);
  console.log(calculator(value1, value2 , operator))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}
