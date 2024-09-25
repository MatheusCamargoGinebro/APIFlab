const connection = require("./connection");

const createUser = async (user) => {
    const { Nome, Email, Senha, Cargo, Campus } = user;

    const query = `INSERT INTO users (Nome, Email, Senha, Cargo, ID_inst) VALUES (?, ?, ?, ?, ?)`;

    const createdUser = await connection.query(query, [Nome, Email, Senha, Cargo, Campus]);

    return {createdUser: createdUser[0].insertId};
}

const deleteUser = async (id) => {
    const query = `DELETE FROM users WHERE id = ?`;

    const deletedUser = await connection.query(query, [id]);

    return {deletedUser: deletedUser[0].affectedRows};
}

const updateUser = async (user) => {
    const { Nome, Email, Senha, Cargo, campus, id } = user;

    const query = `UPDATE users SET Nome = ?, Email = ?, Senha = ?, Cargo = ?, ID_inst = ? WHERE id = ?`;

    const updatedUser = await connection.query(query, [Nome, Email, Senha, Cargo, campus, id]);

    return {updatedUser: updatedUser[0].affectedRows};
}

// Operações de login
const loginUser = async (email, username, senha) => {
    const query = `SELECT * FROM users WHERE Email = ? OR Nome = ? AND Senha = ?`;

    const user = await connection.query(query, [email, username, senha]);

    return user[0].length;
}


module.exports = {
    createUser,
    deleteUser,
    updateUser,
    loginUser,
};