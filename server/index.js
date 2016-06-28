import express from 'express';
import bodyParser from 'body-parser';


import api from './routes/api';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);


const server = app.listen(3000,() => {
  const {address, port} = server.address();
  console.log(`Backend listening at http://localhost:${port}`);
})