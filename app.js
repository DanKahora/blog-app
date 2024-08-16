const express = require("express");
// express app
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { result } = require("lodash");

//Connect to mongoDB

const dbURI =
  "mongodb+srv://dgkahora:FKQ6P2_q3TsdbFf@nodeblogs.s0uvk8u.mongodb.net/dgkahora?retryWrites=true&w=majority&appName=NodeBlogs";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3005)) // no need to addlocal host
  .catch((err) => console.log(err));

//register view engine for ejs
app.set("view engine", "ejs"); // no additional config requires if folder name is views
//app.set('views', 'myViews') // 2nd argument need to be passed if folder name containing html files is different 'myViews will for instance be the name of the folder created.

// middleware $ static files
app.use(express.static("public")); // comes with express automatically and allow to reference css file. Any file in the folder name public will be used in the application
app.use(express.urlencoded({ extended: true })); //middleware needed for post request that comes automatically with express
app.use(morgan("dev")); // 3rd party middleware (read more on the documentation for morgan) npm install

//mongoose and mong sandbox routes
// app.get('/add-blog', (req, res)=>{
//     const blog = new Blog({
//         title: 'New blog',
//         snippet: "about my new blog",
//         body: "more about my new blog"
//     })
//     blog.save()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// app.get('/all-blog', (req, res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// app.get('/single-blog', (req, res)=>{
//     Blog.findById('666740f180089a2170654461')
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

// Listen for request and send responses

app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host:", req.hostname);
  console.log("path:", req.path);
  console.log("method:", req.method);
  next(); //allows express to move down and fire the next middleware.
});

//routes
app.get("/", (req, res) => {
  // const blogs = [
  //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   ]
  // res.render('index', {title: 'Home', blogs})
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs"); // redirect to all blogs list once submit is completed
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })

    .catch((err) => {
      console.log(err);
    });
});

//404 page - must be at the bootom to be fired last if no matching url is found
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
