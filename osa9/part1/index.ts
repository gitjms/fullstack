import express from 'express';
import cors from "cors";
import getBmi from './bmiCalculator';
import calculator from './calculator';
import bodyParser from "body-parser";
import getExercise from './exerciseCalculator';

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());

type Input = {
  daily_exercises: Array<number>,
  target: number
};

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  res.send(getBmi(String(height),String(weight)));
});

app.get('/exercises', (_req, res) => {
  const values: Input = {
    "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
    "target": 2.5
  };

  const result = getExercise(values.daily_exercises, values.target);
  res.send(result);
});

app.post('/exercises', (req, res) => {
  const body = req.body as Input;
  const { daily_exercises, target } = body;

  if (!daily_exercises || !target) {
    return res.status(404).json({
      error: "parameters missing"
    });
  }
  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = getExercise(daily_exercises, target);

  return res.send(result);
});

app.get('/calculate', (req, res) => {
  const { value1, value2, op } = req.query;

  const result = calculator([String(value1), String(value2), String(op)]);
  res.json(result);
});

app.get('/hello', (_req, res) => {
  const htmlResponse = `<p>Hello Full Stack</p>
  <p><strong>BMI Usage:</strong> GET /bmi?height=180&weight=72</p>
  <p><strong>exercises Usage:</strong> POST /exercises
  {"dailyExercises": [1, 0, 2, 0, 3, 0, 2.5], "target": 2}</p>`;
  res.send(htmlResponse);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open page 'http://localhost:${PORT}'`);
});