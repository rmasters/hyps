import 'source-map-support/register';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import html from './html';
import Root from './components/root';
import ticks from './ticks';

const app = express();
const root = (<Root />);
const port = process.env.PORT || 8080;

app.use(express.static('build'));

app.get('/', (req, res) => {
    res.send(html(ReactDOMServer.renderToString(root)));
});

app.get('/ticks/round6', (req, res) => {
    res.json(ticks);
});

app.listen(port, () => {
    console.log('Server listening on port', port);
});
