// Require Express, data.json
const express = require('express');
const { projects } = require('./data.json');

// create an Express application
const app = express();

// Set the 'view engine' ie templating engine to 'pug'...
app.set('view engine', 'pug');

// load static assets by loading the public folder
app.use('/static', express.static('public'));

// the 'root' route. Render index.pug
app.get('/', (req, res) => {
    // set res.locals to the projects array in data.json
    res.locals.projects = projects;
    res.render('index-backup');
});

// render the about page for the 'about' route
app.get('/about', (req, res) => {
    res.render('about');
});

// render the /project route, passing in the id route parameter for a particular project
app.get('/project/:id', (req, res, next) => {
    // check if the id exists, if not create a 404 error and pass to the global handler
    // if the 'id' entered is = or greater than the length of the projects array, then it's invalid
    if (req.params.id >= projects.length) {
        // create error, give it 404 status, then pass to next function
        const err = new Error('Not found');
        err.status = 404;
        // pass the error to the global error handler
        next(err);
    // if the id is valid, render the relevant project
    } else {
        res.render('project', {
        // pass in the project that matches the id passed in the URL as a route parameter
        project: projects[req.params.id]
        });
    }
});

// handle 404 errors. This creates the error object, then hands it off to the handler below
app.use((req, res, next) => {
    // create error, give it 404 status, then pass to next function
    const err = new Error('Not found');
    err.status = 404;
    // pass the error to the global handler
    next(err);
})

// Global error handler for all errors.
app.use((err, req, res, next) => {
    // if the error was a 404
    if (err.status == 404) {
        err.message = "Sorry, this link appears to not exist.";
        // render page-not-found.pug, pass in info about the error
        res.render('page-not-found', { err });
    // if the error was a different type
    } else {
        // set error status if it doesn't have one
        if (!err.status) {
            err.status = 500;
        }
        // Create error message
        err.message = "Sorry. There was an error from the server."
        // render error.pug, pass in info about the error
        res.render('error', { err });
    }
});

// set up the server using the listen method. Pass in the port number to serve the application on
app.listen(3000, () => {
    console.log('The application is running on localhost:3000.');
});