const tokenModels = require("../../models/token/token_models");
const JWT = require("jsonwebtoken");

const clearBlackList = async () => {
    const blacklist = await tokenModels.getAllBlacklist();

    // Exibindo o horário em que a função foi executada:
    console.log("Log: Limpando blacklist... " + new Date() + "\n");

    blacklist.forEach(async (token) => {
        JWT.verify(
            token.Token,
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if (err) {
                    await tokenModels.removeTokenFromBlacklist(token.Token);
                }
            }
        );
    });

    return { status: true, message: "Blacklist limpa" };
};

const clearMailCodeList = async () => {
    const result = await tokenModels.clearMailCodeList();

    console.log("Log: Códigos de email deletados... " + new Date() + "\n");
    return result;
};

module.exports = {
    clearBlackList,
    clearMailCodeList,
};
