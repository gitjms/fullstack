import express from 'express';
import getBmi from './bmiCalculator';

const app = express();

app.get('/bmi', (req, res) => {
  const height = String(req.query.height);
  const weight = String(req.query.weight);
  res.send(getBmi([height,weight]));
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open page 'http://localhost:${PORT}'`);
});