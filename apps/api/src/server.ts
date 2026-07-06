import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { apiRouter } from './routes.js';

const app: Express = express();
const port = process.env.PORT || 3000;

//MIDLEWARES
app.use(cors());
app.use(express.json());

//REQUEST ID MIDDLEWARE
app.use((req: Request, res: Response, next: NextFunction) => {
    req.id = crypto.randomUUID();
    res.set('x-request-id', req.id);
    next();
});


//HEALTH CHECK
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: "OrderUp API is running",
        timestamp: new Date().toISOString(),
        requestId: req.id,
    });
});

//API ROUTES
app.use('/api/v1', apiRouter);


//TODO: ERROR HANDLER MIDDLEWARE
//TODO: GRACEFUL SHUTDOWN

app.listen(port, () => {
    console.log(`OrderUp API is running on port ${port}`);
});

export default app;
