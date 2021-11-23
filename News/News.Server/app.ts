import { log } from 'console';
import * as express from 'express';
import { AddressInfo } from "net";
import * as path from 'path';
import * as bodyParser from 'body-parser'

const PORT = 3000;
const app = express();


//Application configs
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
app.use(bodyParser.json({ limit: '100mb' }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

//data base conntection
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
import account from "./routes/account/account"
import profile from "./routes/account/profile"

app.use("/api/news", news);
app.use("/api/account", account);
app.use("/api/profile", profile)

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



const server = app.listen(PORT, async () => {
    await assertDataBaseOk();
    let port = (server.address() as AddressInfo).port;
    log(`Express server listening on port ${port}`);
    log(`http://localhost:${port}`)
});