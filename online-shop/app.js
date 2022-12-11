const express = require("express");
const path = require("path");
const app = express();
const homeRouter = require("./routes/home-routs");
const productRouter = require("./routes/product-routs");
const sinupLogin = require("./routes/sinup-login");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cart = require("./routes/cart-routs");
const order = require("./routes/order-routs");
const admin = require("./routes/admin-routs");
app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(cookieParser());
const port = process.env.PORT || 3000;

app.listen(port);
app.use(express.static(path.join(__dirname , "static_files")));
app.use(express.static(path.join(__dirname , "images")));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));


app.get("/" , homeRouter);
app.use("/" , sinupLogin);
app.get("/product/:id" , productRouter);
app.use("/" , cart);
app.use("/" , order);
app.use("/" , admin);