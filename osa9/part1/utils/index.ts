
interface InputTwoNumbers {
  value1: number;
  value2: number;
}

export const parseTwoNumbers = (args: Array<string>): InputTwoNumbers => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      value1: Number(args[0]),
      value2: Number(args[1])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}