const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session');
const store = new session.MemoryStore();
// const middleware = require('./app/Middlewares/SortMiddlewares')
const app = express()

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT
const route = require('./routes')
const db = require('./config/db')
db.connect();

//middlewares
const loginMiddleware = require('./app/middlewares/LoginMiddleware');
const { TRUE } = require('node-sass')

app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(middleware)
app.use(methodOverride('_method'))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//session
app.use(session({
    store,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers: {
            loginable: (isLoginForm) => {
                if (isLoginForm.enabled == true) {
                    return `<span class="oi oi-person icon-user"> ${isLoginForm.name}</span>`
                }
                else {
                    return `<span class="oi oi-person icon-user"> user</span>`;
                }
            },
            loginHide: (isLoginForm) => {
                if (isLoginForm.enabled == false) {
                    return `<button type="button" data-target="#loginModal" data-toggle="modal"
                        class="btn btn-outline-warning btn-login-show">ĐĂNG NHẬP</button>
                        <button type="button" data-target="#registerModal"  data-toggle="modal" class="btn btn-outline-danger">ĐĂNG KÝ</button>
                        </div>`;
                } else {
                    return `<form action="/login/logout" method="get">
                    <input type="submit" data-whatever="@mdo"
                    class="btn btn-outline-warning" value="ĐĂNG XUẤT">
                    </form>`;
                }
            }
        }
    })
);