require("dotenv").config();
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");

const app = new Koa();
const router = new Router();

const api = require("./api");

const {PORT, MONGO_URI} = process.env;

mongoose
    .connect(MONGO_URI, {useNewUrlParser: true, useFindAndModify: false})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.error(e);
    });

router.get("/", (ctx) => {
    ctx.body = "Home";
});

// router.get("/about", (ctx) => {
//     ctx.body = "About";
// });

// router.get("/about/:name?", (ctx) => {
//     const {name} = ctx.params;
//     ctx.body = name ? `About ${name}` : "About";
// });

// router.get("/posts", (ctx) => {
//     const {id} = ctx.query;
//     ctx.body = id ? `Post #${id}` : "No Post ID";
// });

router.use("/api", api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

// app.use(async (ctx, next) => {
//     console.log(ctx.url);
//     console.log(1);
//     if (ctx.query.authorized !== "1") {
//         ctx.status = 401;
//         return;
//     }
//     await next();
//     console.log("END");
// });

// app.use((ctx, next) => {
//     console.log(2);
//     next();
// });

// app.use((ctx) => {
//     ctx.body = "hello.world";
// });

const port = PORT || 4000;
app.listen(port, () => {
    console.log("Listening to port %d", port);
});
