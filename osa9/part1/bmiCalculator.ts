import { parseTwoNumbers } from './utils/index';

const calculateBmi = (a: number, b: number): string => {
  if (a === 0) throw new Error('Height cannot be 0!');

  const bmi = b / (a/100)**2;
  if (bmi <= 15) {
    return 'Very severely underweight';
  } else if (bmi <= 16) {
    return 'Severely underweight';
  } else if (bmi <= 18.5) {
    return 'Underweight';
  } else if (bmi <= 25) {
    return 'Normal (healthy weight)';
  } else if (bmi <= 30) {
    return 'Overweight';
  } else if (bmi <= 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi <= 40) {
    return 'Obese Class II (Severely obese)';
  } else if (bmi > 40) {
    return 'Obese Class III (Very severely obese)';
  } else {
    throw new Error('Could not calculate bmi'); 
  }
}

export default function getBmi(args: Array<string>) {
  try {
    const { value1, value2 } = parseTwoNumbers(args);
    return {
      weight: value1,
      height: value2,
      bmi: calculateBmi(value1, value2)
    };
  } catch (e) {
    return {
      error: "malformatted parameters"
    }
  }
}

