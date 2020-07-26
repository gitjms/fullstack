
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

interface InputArrayValues {
  array: Array<number>;
  target: number;
}

export const parseArrayArguments = (args: Array<string>): InputArrayValues => {
  if ( args.length < 4) throw new Error('Not enough arguments');

  const inputLength = args.length;
  const target = Number(args[2]);
  const array = args.slice(3,inputLength).map(e => Number(e));

  if (!isNaN(target) && array.every(e => !isNaN(e))) {
    return {
      array: array,
      target: target
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

interface InputTwoNumbersAndString {
  value1: number;
  value2: number;
  operator: string;
}

export const parseTwoNumbersAndString = (args: Array<string>): InputTwoNumbersAndString => {
  if ( args.length < 5) throw new Error('Not enough arguments');
  if (args.length > 5) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
      operator: args[4]
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

