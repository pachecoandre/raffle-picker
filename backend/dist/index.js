"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const bot_server_1 = __importDefault(require("./server/bot.server"));
const env = process.env.NODE_ENV || "development";
dotenv_1.config({ path: `./config/${env}.env` });
console.log(`Env mode: ${env}.`);
mongoose_1.default
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log("Connected to database"));
const server = new bot_server_1.default(process.env.PORT);
server.route();
server.listen();
//# sourceMappingURL=index.js.map