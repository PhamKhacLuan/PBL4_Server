
const siteRouter = require('./site');
const loginRouter   = require('./login');
const adminRouter = require('./admin');

function route(app) {
    app.use('/login', loginRouter);
    app.use('/admin', adminRouter);

    app.use('/', siteRouter);
}

module.exports = route;
