import * as express from 'express';
import { AddressInfo } from "net";
import * as path from 'path';
const PORT = 3000;

const app = express();


app.use(express.static(path.join(__dirname, 'public')));

//data base 
const sequlize = require("./dataBase/context/index")

async function assertDataBaseOk() {
    console.log("Checking Data Base Connection ...");
    try {
        await sequlize.authenticate();
        console.log("Data Base Connected Successfully!")
    } catch (e) {
        console.log("Unable to connect to Data Base");
        console.log(e.message);
        process.exit(1);
    }
}

//routes 
const news = require("./routes/user/news")
app.use("/news", news);

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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



const server = app.listen(PORT, async function () {
    await assertDataBaseOk();
    let port = (server.address() as AddressInfo).port;
    console.log(`Express server listening on port ${port}`);
    console.log(`http://localhost:${port}`)
});