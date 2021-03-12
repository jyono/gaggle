import express from 'express';
import bodyParser from 'body-parser';

// Import routes from index.ts
// Even though it just says './routes', this is syntax magic to import from index.ts
import { statusRouter } from './routes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});