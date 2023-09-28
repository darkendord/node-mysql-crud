"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const cors_1 = __importDefault(require("cors"));
const connections_1 = __importDefault(require("../db/connections"));

class Server {
    constructor() {
        this.apiPaths = {
            users: "/api/users",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT ?? "8000";
        this.dbConnection();
        //Starting methods
        this.middlewares();
        this.routes();
    }
    //TODO: Connect to data base
    async dbConnection() {
        try {
            await connections_1.default.authenticate();
            console.log("Database is online");
        }
        catch (err) {
            throw new Error(`Error ${err}`);
        }
    }
    // Middlewares
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Body lecture
        this.app.use(express_1.default.json());
        // Public folder
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.apiPaths.users, user_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
// export default because there is only one class to export
exports.default = Server;
//# sourceMappingURL=server.js.map