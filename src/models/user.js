"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../db/connections"));
const User = connections_1.default.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING
    },
    user_lastname: {
        type: sequelize_1.DataTypes.STRING
    },
    user_id_card: {
        type: sequelize_1.DataTypes.STRING
    },
    user_age: {
        type: sequelize_1.DataTypes.INTEGER
    },
    user_address: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    timestamps: false
});
exports.default = User;
//# sourceMappingURL=user.js.map