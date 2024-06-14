var express = require("express");
var { sep } = require("path");
const { default: mongoose, model, isObjectIdOrHexString } = require("mongoose");
const modelBlog = require("./src/models/model-blog");
const url = require('url');
const path = require('path');
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')

const newPostController = require('./src/controllers/newPost')
const newListController = require('./src/controllers/listPost');
const { getAllBlogPosts, getBlogPostById } = require("./src/controllers/getPost");
const newStoreController = require('./src/controllers/storePost')
const validateMiddleWare = require('./src/middlewares/validateMiddleware')
const newUserController = require('./src/controllers/newUser');
const storeUserController = require('./src/controllers/storeUser');
const loginController = require('./src/controllers/login')
const loginUserController = require('./src/controllers/loginUser')
const authMiddleware = require('./src/middlewares/authMiddleware')
const redirectIfAuthentitcatedMiddleware = require('./src/middlewares/redirectIfAuthentitcatedMiddleware')
const logoutController = require('./src/controllers/logout')


const root = __dirname;
const rootUrl = url.pathToFileURL(root).href;
//console.log(rootUrl, "ROOT URL CONSOLE LOG"); // Outputs a valid file URL of the current module

const cfg = {
    port: process.env.PORT || 3000,
    dir: {
      rootUrl: rootUrl,
      static: rootUrl + "/" + "static" + "/",
      views: rootUrl + "/" + "views" + "/",
      uploads: rootUrl + "/" + "uploads" + "/",
    },
};

//mongoose.connect('mongodb://127.0.0.1:27017/my_blog_youssef')

const app = express();

app.use(expressSession({
    secret: '44350d0a13302fe32c22ca89d709b99333ae3dfe404fc39d3c678c91ff5b5e90',
    resave: false,
    saveUninitialized: false,
}))

global.loggedIn = null;
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())
app.use(flash())


//const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use('/css', express.static(path.join(root, 'public', 'css')));

app.set("view engine", "ejs");
//app.set("views", cfg.dir.views);

app.use((req, res, next) => {
    //console.log(`dump de cfg ${JSON.stringify(cfg)}`);
    //console.log(`in my middleware function / current request is : ${req.url}`);
    next();
});

//routes

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/post", getAllBlogPosts);

//app.get("/post/new", newPostController);
app.get("/post/new", authMiddleware, (req, res) => {
    res.render('new')
});

app.get('/post/:id', getBlogPostById)

app.get('/list', newListController);

app.get('/auth/register', redirectIfAuthentitcatedMiddleware, newUserController);

app.get('/auth/login', redirectIfAuthentitcatedMiddleware, loginController);

app.get('/auth/logout', logoutController)


app.post('/posts/store', validateMiddleWare, newStoreController);
app.post('/users/register', redirectIfAuthentitcatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthentitcatedMiddleware, loginUserController);

app.use((req, res) => res.render('notfound'))

async function main(){
    try{
        await mongoose.connect('mongodb+srv://youssefdrif1:Fqnn0QJgeg40d8Pj@blogisis.8ppqa07.mongodb.net/?retryWrites=true&w=majority&appName=BlogIsis')
        // await mongoose.connect('mongodb://127.0.0.1:27017/my_blog')
        console.log(`mongoose connected to db ok`);

        // const blog = new modelBlog({
        //     category: ('GEO')
        // })

        // //traitement seed
        // const result = await modelBlog.create({
        //     title: blogposts[i].title, 
        //     description: blogposts[i].description, 
        //     image: blogposts[i].image,
        //     isArchive: false,
        //     featuredBlog: "66685a2151e9e1f2ed206a05",
        // })
        // console.log(`static method result is => ${result}`);
    }
    catch(error){
        console.error(`error mongoose db connection => ${error}`);
    }
    return 'ok.'
}

main()
    .then(console.log)
    .catch(console.log)

app.listen(cfg.port, () => {
    console.log(
      `server web blog running on http://localhost:${cfg.port}`
    );
});


