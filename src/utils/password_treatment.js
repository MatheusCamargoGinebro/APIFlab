const bcryptjs = require("bcryptjs");

const saltGenerator = async () => {
    const pre_salt = bcryptjs.genSaltSync(10);
    const salt = await bcryptjs.hash(pre_salt, 10);
    return salt;
};

const hashPasswordGenerator = async (password, salt) => {
    const hashedPassword = await bcryptjs.hash(password + salt, 10);
    return hashedPassword;
};

const comparePasswords = async (password, salt, hashedPassword) => {
    const result = await bcryptjs.compare(password + salt, hashedPassword);
    return result;
};
module.exports = {
    saltGenerator,
    hashPasswordGenerator,
    comparePasswords,
};
