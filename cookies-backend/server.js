const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app  =  express();
const port = 3000 || process.env.PORT;

//middleware setup
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true // allows cookies to be sent with requests
}));
app.use(bodyParser.json());
app.use(cookieParser());

//Routes
app.get('/', (req, res) => {
    res.send('Welcome to the server');

});

app.get('/set-cookie', (req, res) => {
    res.cookie('user', 'Abhay Chikte', {httpOnly: true});
    res.status(200).send('Cookie has been set');
});

app.get('/get-cookie', (req, res) => {
    const cookie = req.cookies.user || 'No cookie found';
    if(cookie) {
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
    const { code } = req.params;
    const status = parseInt(code, 10);
    let message = 'Okay';

    switch(status) {
        case 200:
            message = 'Success';
            break;
        case 201:
            message = 'Created';
            break;
        case 400:
            message = 'Bad Request';
            break;
        case 401:
            message = 'Unauthorized';
            break;
        case 404:
            message = 'Not Found';
            break;
        case 500:
            message = 'Internal Server Error';
            break;
        default:
            return res.status(400).json({
                message: 'Unsupported status code'
            })
    }

    res.status(status).json({
        message: message
    });
});

app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
});