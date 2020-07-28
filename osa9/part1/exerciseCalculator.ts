type Result = OutputResult | OutputError;

interface OutputResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface OutputError {
  error: string;
}

export default function getExercise(daily_exercises: Array<number>, target: number): Result {
  if ( daily_exercises.length === 0) {
    return {
      error: 'Not enough arguments'
    };
  }

  if (!isNaN(target) && daily_exercises.every(e => !isNaN(e))) {
    return calculate(daily_exercises, target);
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculate = (daily_exercises: Array<number>, target: number): Result => {
  const allDays = daily_exercises.length;
  const workDays = daily_exercises.filter(e => e > 0).length;
  const sumHours = daily_exercises.reduce((s,e) => s + e);
  const avg = sumHours / allDays;
  let rate;
  let rateText;
  if (sumHours / workDays < 2) {
    rate = 1;
    rateText = 'You are an underachiever. Shame on you.';
  } else if (sumHours / workDays < 4) {
    rate = 2;
    rateText = 'Not too bad but could be better.';
  } else {
    rate = 3;
    rateText = 'This will do.';
  }
  return {
    periodLength: allDays,
    trainingDays: workDays,
    success: rate >= target,
    rating: rate,
    ratingDescription: rateText,
    target: target,
    average: avg
  };
};
