const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();

const api = require("./api");

router.get("/", (ctx) => {
    ctx.body = "Home";
});

router.get("/about", (ctx) => {
    ctx.body = "About";
});

router.get("/about/:name?", (ctx) => {
    const {name} = ctx.params;
    ctx.body = name ? `About ${name}` : "About";
});

router.get("/posts", (ctx) => {
    const {id} = ctx.query;
    ctx.body = id ? `Post #${id}` : "No Post ID";
});

router.use("/api", api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx, next) => {
    console.log(ctx.url);
    console.log(1);
    if (ctx.query.authorized !== "1") {
        ctx.status = 401;
        return;
    }
    await next();
    console.log("END");
});

app.use((ctx, next) => {
    console.log(2);
    next();
});

app.use((ctx) => {
    ctx.body = "hello.world";
});

app.listen(4000, () => {
    console.log("Listening to port 4000");
});
