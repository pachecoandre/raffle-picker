"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../routes"));
class Server {
    constructor(port) {
        this.route = () => {
            this.app.use('/v1', routes_1.default);
        };
        this.listen = () => {
            this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`));
        };
        this.app = express_1.default();
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(cors_1.default());
        this.port = port;
    }
}
exports.default = Server;
//# sourceMappingURL=bot.server.js.map