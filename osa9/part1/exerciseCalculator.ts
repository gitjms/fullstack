import { parseArrayArguments } from './utils/index';

interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExcercises = (array: Array<number>, target: number): exerciseResult => {
  const allDays = array.length;
  const workDays = array.filter(e => e > 0).length;
  const sumHours = array.reduce((s,e) => s + e);
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
    rateText = 'This will do. For now.';
  }
  return {
    periodLength: allDays,
    trainingDays: workDays,
    success: rate >= target,
    rating: rate,
    ratingDescription: rateText,
    target: target,
    average: avg
  }
}

try {
  const { array, target } = parseArrayArguments(process.argv);
  console.log(calculateExcercises(array, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

