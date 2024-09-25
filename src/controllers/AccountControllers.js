const AccountModels = require('../models/AccountModels');

const createUser = async (req, res) => {
    const createdUser = await AccountModels.createUser(req.body);

    if (createdUser.error) {
        return res.status(400).json({ message: createdUser.error });
    }

    return res.status(201).json(createdUser);
}

module.exports = {
    createUser,
};