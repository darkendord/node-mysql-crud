"use strict";

exports.deletetUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = require("../models/user");
const sequelize_1 = require("sequelize");
const getUsers = async (req, res) => {
    const users = await user_1.default.findAll();
    res.json(users);
};
exports.getUsers = getUsers;

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await user_1.default.findByPk(id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({
            msg: `User id ${id} does not exist`
        });
    }
};
exports.getUser = getUser;

const postUser = async (req, res) => {
    const { body } = req;
    try {
        const newUser = {
            user_name: await body.user_name,
            user_lastname: await body.user_lastname,
            user_id_card: await body.user_id_card,
            user_age: await body.user_age,
            user_address: await body.user_address,
        };
        let data = await user_1.default.create(newUser);
        res.json(data);
        return res.status(201).json({
            success: true,
            data: data
        });
    }
    catch (error) {
        console.log(error);
        res.status(500), (0, sequelize_1.json)({
            msg: "Please contact your system admin."
        });
    }
};
exports.postUser = postUser;

const putUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = await user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: "There is not user with ID " + id
            });
        }
        await user.update(body);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500), (0, sequelize_1.json)({
            msg: "Please contact your system admin."
        });
    }
};
exports.putUser = putUser;

const deletetUser = async (req, res) => {
    const { id } = req.params;
    const user = await user_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: "There is not user with ID " + id
        });
    }
     await user.destroy();
    // await user.update({ user_status: false });
    res.json(user);
};
exports.deletetUser = deletetUser;

//# sourceMappingURL=users.js.map