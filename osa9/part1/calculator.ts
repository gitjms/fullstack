type Result = OutputResult | OutputError;

interface InputTwoNumbersAndString {
  value1: number;
  value2: number;
  operator: string;
}

interface OutputResult {
  result: string;
}

interface OutputError {
  error: string;
}

const calculate = (values: InputTwoNumbersAndString): Result => {
  let res: number;
  switch(values.operator) {
    case 'multiply':
      res = values.value1*values.value2;
      return {
        result: `${values.value1} * ${values.value2} = ${res}`
      };
    case 'add':
      res = values.value1+values.value2;
      return {
        result: `${values.value1} + '+' + ${values.value2} + '=' + ${res}`
      };
    case 'divide':
      if (values.value2 === 0) {
        return {
          error: 'Can\'t divide by 0!'
        };
      } else {
        res = values.value1/values.value2;
        return {
          result: `${values.value1} + '/' + ${values.value2} + '=' + ${res}`
        };
      }
    default:
      return {
        error: 'Operation is not multiply, add or divide!'
      };
  }
};

const parse = (args: Array<string>): InputTwoNumbersAndString => {
  if ( args.length < 3) throw new Error('Not enough arguments');
  if (args.length > 3) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      value1: Number(args[0]),
      value2: Number(args[1]),
      operator: args[2]
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export default function calculator(values: Array<string>): Result {
  return calculate(parse(values));
}
