import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('server up listening on http://localhost:4000');
});