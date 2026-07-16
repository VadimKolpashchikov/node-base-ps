import express from 'express';
import { weatherRouter } from './weather/router.js';

const PORT = 8000;
const app = express();

app.use('/weather', weatherRouter).use((err) => {
  res.status(500).send(`Error! ${err.message}`);
});

app.listen(PORT, () => {
  console.log(`Server start on http://localhost:${PORT}`);
});
