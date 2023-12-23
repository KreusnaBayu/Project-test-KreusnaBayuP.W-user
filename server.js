const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware untuk mengizinkan CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    console.log('CORS middleware');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Endpoint /api/ideas
app.get('/api/ideas', async (req, res) => {
    const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';

    try {
        const response = await axios.get(apiUrl, {
            params: {
                'page[number]': req.query['page[number]'],
                'page[size]': req.query['page[size]'],
                append: req.query.append,
                sort: req.query.sort,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
