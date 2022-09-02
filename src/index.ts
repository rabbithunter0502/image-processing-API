import express from 'express';
import routes from './routes';
import * as path from 'path';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

// Setup public path
app.use('/public', express.static(path.join(__dirname, 'public')));

// Setup view template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Apply routing
routes(app);

app.listen(port, async (): Promise<void> => {
  console.log(`Server serve on http://localhost:${port} to review the project`);
});

export default app;
