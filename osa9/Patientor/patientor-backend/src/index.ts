import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);

// app.get('/api/patients', (_req, _res) => {
  // console.log('someone pinged here');
  // res.send('pong');
// });

// app.post('/api/patients', (req, res) => {
//   const body = req.body as Input;
//   const { daily_exercises, target } = body;

//   if (!daily_exercises || !target) {
//     return res.status(404).json({
//       error: "parameters missing"
//     });
//   }
//   if (!Array.isArray(daily_exercises)) {
//     return res.status(400).json({ error: "malformatted parameters" });
//   }

//   const result = getExercise(daily_exercises, target);

//   return res.send(result);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open page 'http://localhost:${PORT}'`);
});
