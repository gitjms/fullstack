import { parseTwoNumbers } from './utils/index';

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText,  a * b);
};

try {
  const { value1, value2 } = parseTwoNumbers(process.argv);
  multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}