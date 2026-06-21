import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'OrderUp API is running' })
});

app.listen(port, () => {
    console.log(`OrderUp API is running on port ${port}`);
});

export default app;
