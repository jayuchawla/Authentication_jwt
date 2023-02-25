import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

/* middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // The X-Powered-By header describes the technologies used by the webserver. This information exposes the server to attackers. Using the information in this header, attackers can find vulnerabilities easier.

const port = 8080;

/* HTTP get request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET");
})

/* START server */
app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
})