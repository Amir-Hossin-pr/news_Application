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
const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
//data base 
const sequlize = require("./dataBase/context/index");
function assertDataBaseOk() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Checking Data Base Connection ...");
        try {
            yield sequlize.authenticate();
            console.log("Data Base Connected Successfully!");
        }
        catch (e) {
            console.log("Unable to connect to Data Base");
            console.log(e.message);
            process.exit(1);
        }
    });
}
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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
const server = app.listen(PORT, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield assertDataBaseOk();
        let port = server.address().port;
        console.log(`Express server listening on port ${port}`);
        console.log(`http://localhost:${port}`);
    });
});
//# sourceMappingURL=app.js.map