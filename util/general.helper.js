const bcrypt = require('bcryptjs');

// LOAD DEPENDANCY / FILES
exports.bootstrap = async (uri, modules) => {
    const index = require(uri);
    for (let init of index) { await init(...modules); }
}

// CRYPT PASSWORD
exports.cryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

// COMPARE PASSWORD
exports.comparePasswprd = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}