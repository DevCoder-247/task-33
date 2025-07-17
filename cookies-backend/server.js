require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors({
    origin: process.env.FRONTEND_URLS?.split(',') || [
      'http://localhost:5173',
      'https://task-33-70kkezzpn-abhays-projects-596787af.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the server');
});

app.get('/set-cookie', (req, res) => {
    res.cookie('user', 'Abhay Chikte', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.status(200).json({ message: 'Cookie has been set' });
});

app.get('/get-cookie', (req, res) => {
    const cookie = req.cookies.user;
    if (cookie) {
        res.status(200).json({
            user: cookie,
            message: 'Cookie retrieved successfully'
        });
    } else {
        res.status(404).json({
            message: 'No cookie found'
        });
    }
});

app.get('/status/:code', (req, res) => {
    const status = parseInt(req.params.code, 10);
    const statusMessages = {
        200: 'OK - Successful request',
        201: 'Created - Resource created successfully',
        400: 'Bad Request - Invalid input',
        404: 'Not Found - Resource not found',
        500: 'Internal Server Error'
    };

    if (!statusMessages[status]) {
        return res.status(400).json({
            message: 'Unsupported status code'
        });
    }

    res.status(status).json({
        message: statusMessages[status],
        statusCode: status
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});