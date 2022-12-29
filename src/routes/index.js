
const loginRouter   = require('./login');
const adminRouter = require('./admin');

function route(app) {
    app.use('/login', loginRouter);
    app.use('/admin', adminRouter);
}

module.exports = route;
