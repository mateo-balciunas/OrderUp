import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { apiRouter } from './routes.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from './config/swagger.js';

const app: Express = express();
const port = process.env.PORT || 3000;

//MIDLEWARES
app.use(cors());
app.use(express.json());
if( process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

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

//SWAGGER UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

//API ROUTES
app.use('/api/v1', apiRouter);

//ERROR HANDLER MIDDLEWARE
app.use(errorHandler);

//TODO: GRACEFUL SHUTDOWN

app.listen(port, () => {
    console.log(`OrderUp API is running on port ${port}`);
});

export default app;
