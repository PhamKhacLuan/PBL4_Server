const handleLogin = require('../method/handleLogin');
const inforUserModel = require('../models/InforUserModels');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const InforUserModels = require('../models/InforUserModels');

let checkedLogin = async (req, res) => {
    let email = req.body.email.toLowerCase();
    let password = req.body.password;
    let userData = await handleLogin.handleUserLogin(email, password);
    if (userData.errCode !== 0) {
        res.json({
            message: userData.errMessage,
            role : "null"
        })
    } else {
        req.session.user =
        {
            name: userData.user.name,
            phone: userData.user.phone,
            address: userData.user.address,
            email: userData.user.email
        }
        if (userData.user.role === 'user') res.json({
            message: "Đăng nhập thành công",
            role: userData.user.role
        });
        else res.json({
            message: "Đăng nhập thành công",
            role: userData.user.role
        });
    }
}

let logout = function (req, res) {
    req.session.destroy();
    res.redirect(`/`);
}

let register = async (req, res) => {
    const email = req.body.email.toLowerCase();
    req.body.email = email;
    let userData = await handleLogin.checkExistEmail(email);
    if (userData.errCode !== 0) {
        res.render('home', {
            erroCodeR: [1],
            errorRegister: [
                userData.errMessage
            ],
            name: [req.body.name],
            phone: [req.body.phone],
            address: [req.body.address],
            email: [req.body.email]
        })
    } else {
        const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
        req.body.password = hashPassword;
        const newUser = new InforUserModels(req.body);
        newUser.role = 'user';
        newUser.save()
            .then(() => res.render('home', {
                success: [
                    "Đăng ký thành công"
                ]
            }))
            .catch(error => res.render('home', {
                erroCodeR: [1],
                errorConstructor: [
                    "Có lỗi trong quá trình khởi tạo vui lòng thử lại"
                ]
            }))
    }
}

module.exports = {
    checkedLogin: checkedLogin,
    logout: logout,
    register: register
}