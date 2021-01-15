const { getByFilter: getUserByFilter } = require("./user");
const { compare } = require("../lib/bcrypt");
const authenticationService = require("../service/authentication").getServices();
const controller = {};

controller.login = async (email, password) => {
    const [user] = await getUserByFilter({ email });
    if (!user) return;

    const hashedPassword = user.password;
    const isMatch = await compare(password, hashedPassword);

    if (!isMatch) return;

    const token = await authenticationService.sign({ _id: user._id });

    return {
        token,
        userInfo: user
    };
}

module.exports = controller;