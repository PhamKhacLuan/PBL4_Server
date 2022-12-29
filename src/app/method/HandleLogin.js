const InforUserModel = require('../models/InforUserModels');
const bcrypt = require('bcrypt');
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        let userData = {};
        try {
            let isExist = await checkUserEmail(email);
            if (isExist) {
                InforUserModel.findOne({ email: email })
                    .then(user => {
                        if (user) {
                            let check = bcrypt.compareSync(password, user.password);
                            if (check) {
                                userData.errCode = 0;
                                userData.errMessage = '';
                                delete user._doc.password;
                                userData.user = user;
                            } else {
                                userData.errCode = 3;
                                userData.errMessage = 'Sai mật khẩu';
                            }
                            resolve(userData);
                        } else {
                            userData.errCode = 2;
                            userData.errMessage = `Không tìm thấy account`;
                            resolve(userData);
                        }
                    })
                    .catch(err => res.status(400).send(err));
            } else {
                userData.errCode = 1;
                userData.errMessage = `Username không tồn tại`;
                resolve(userData);
            }
        } catch (err) {
            reject(err);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            InforUserModel.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                })
        } catch (err) {
            reject(err);
        }
    })
}

checkExistEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                userData.errCode = 4;
                userData.errMessage = 'Email đã được sử dụng';
            } else {
                userData.errCode = 0;
                userData.errMessage = '';
            }
            resolve(userData);
        } catch (error) {
            reject(err);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkExistEmail: checkExistEmail
}