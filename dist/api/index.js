"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require('express');
const server = express();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.enableCors({ origin: true, credentials: true });
    await app.init();
}
let bootstrapped = false;
async function handler(req, res) {
    if (!bootstrapped) {
        await bootstrap();
        bootstrapped = true;
    }
    server(req, res);
}
//# sourceMappingURL=index.js.map