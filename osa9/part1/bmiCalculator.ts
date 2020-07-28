type Result = OutputResult | OutputError;

interface OutputResult {
  weight: number;
  height: number;
  bmi: string;
}

interface OutputError {
  error: string;
}

export const parseTwoNumbers = (height: number, weight: number): Result => {
  if (Number(height) === 0) {
    return {
      error: 'height cannot be 0'
    };
  } else {
    return {
      weight: Number(weight),
      height: Number(height),
      bmi: calculateBmi(Number(height), Number(weight))
    };
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height/100)**2;
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
};

export default function getBmi(height: string, weight: string): Result {
  if ( height === 'undefined' || weight === 'undefined') {
    return {
      error: 'parameters missing'
    };
  } else if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return {
      error: 'malformatted parameters'
    };
  } else {
    return parseTwoNumbers(Number(height),Number(weight));
  }
}

