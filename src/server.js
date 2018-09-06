const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
    dir: '.',
    dev,
});

const handle = app.getRequestHandler();

let server;
app
    .prepare()
    .then(() => {
        server = express();

        // Set up the proxy.
        if (dev) {
            const proxy = require('http-proxy-middleware');
            server.use('/api', proxy({
                target: 'http://hawthorn:4000',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }));
        }

        // Default catch-all handler to allow Next.js to handle all other routes
        server.all('*', (req, res) => handle(req, res));

        server.listen(port, err => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on port ${port} [${env}]`);
        });
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server');
        console.log(err);
    });