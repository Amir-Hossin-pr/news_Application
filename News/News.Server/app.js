"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
//data base conntection
const index_1 = require("./dataBase/context/index");
function assertDataBaseOk() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, console_1.log)("Checking Data Base Connection ...");
        try {
            yield index_1.default.authenticate();
            (0, console_1.log)("Data Base Connected Successfully!");
        }
        catch (e) {
            (0, console_1.log)("Unable to connect to Data Base");
            (0, console_1.log)(e.message);
            process.exit(1);
        }
    });
}
//user routes 
const news_1 = require("./routes/user/news");
const account_1 = require("./routes/account");
app.use("/api/news", news_1.default);
app.use("/api/account", account_1.default);
//admin routes
const news_admin_1 = require("./routes/admin/news.admin");
app.use("/api/admin/news", news_admin_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});
const server = app.listen(PORT, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield assertDataBaseOk();
        let port = server.address().port;
        (0, console_1.log)(`Express server listening on port ${port}`);
        (0, console_1.log)(`http://localhost:${port}`);
    });
});
//# sourceMappingURL=app.js.map