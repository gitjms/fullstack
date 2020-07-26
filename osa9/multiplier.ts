
type Operation = 'multiply' | 'add' | 'divide';

type Result = string | number;

const calculator = (a: number, b: number, op : Operation): Result => {
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
  console.log(calculator(Number(process.argv[1]),Number(process.argv[2]),Operation(process.argv[3])))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}
