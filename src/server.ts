import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.use(express.json());

const server = app.listen(3000, function () {
  console.log(`Server has started at: http://localhost:${port}`);
});

server.timeout = 3000;

app.use('/', routes);

export default app;
