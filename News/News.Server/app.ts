import { log } from 'console';
import * as express from 'express';
import { AddressInfo } from "net";
import * as path from 'path';
const PORT = 3000;

const app = express();


app.use(express.static(path.join(__dirname, 'public')));

//data base 
import sequlize from "./dataBase/context/index"

async function assertDataBaseOk() {
    log("Checking Data Base Connection ...");
    try {
        await sequlize.authenticate();
        log("Data Base Connected Successfully!")
    } catch (e) {
        log("Unable to connect to Data Base");
        log(e.message);
        process.exit(1);
    }
}

//user routes 
import news from "./routes/user/news"
app.use("/api/news", news);

//admin routes
import newsAdmin from "./routes/admin/news.admin"
app.use("/api/admin/news", newsAdmin)

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
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err['status'] || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});



const server = app.listen(PORT, async function () {
    await assertDataBaseOk();
    let port = (server.address() as AddressInfo).port;
    log(`Express server listening on port ${port}`);
    log(`http://localhost:${port}`)
});