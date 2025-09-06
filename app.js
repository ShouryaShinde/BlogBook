import express from "express" ;
import bodyParser from "body-parser";

const app = express() ;
const port = 3000 ;
let nextId = 8 ;

app.use(express.static("public")) ;
app.use(bodyParser.urlencoded({extended : true})) ;

//Fake Database
let posts = [
  { id: "1",
    title: "Getting Started with HTML & CSS",
    date: "15 February",
    content: "When I first decided to learn web development, I began with the absolute basics: HTML and CSS. It felt both exciting and overwhelming to see how simple tags could build the structure of a webpage. CSS brought life to plain HTML by adding colors, layouts, and spacing. I remember creating my very first webpage with just a heading, a paragraph, and a button. Even though it was simple, the sense of accomplishment was huge. What stood out to me is how important it is to write clean, semantic HTML and use CSS wisely. This early step gave me confidence that I could continue this journey and build bigger projects."
  },
  {
    id: "2",
    title: "Flexbox Froggy – Level Up!",
    date: "28 February",
    content: "Flexbox always looked confusing at first, especially with all the properties like justify-content, align-items, and flex-direction. But then I discovered a fun little game called Flexbox Froggy. It turned out to be one of the most effective and enjoyable ways to learn. Instead of reading documentation endlessly, I was playing a game where I guided frogs onto lily pads using CSS flexbox rules. Slowly, I began to understand how powerful Flexbox is for aligning elements and building responsive layouts. Now, instead of struggling with floats and hacks, I can center things with just a few lines of CSS. This small skill boost feels like a superpower in frontend design."
  },
  {
    id: "3",
    title: "JavaScript DOM Manipulation",
    date: "10 March",
    content: "JavaScript took my static pages and turned them into something alive. Today I experimented with DOM manipulation: changing text, updating styles, and even creating new elements dynamically. At first, query selectors and event listeners seemed complicated, but once I got the hang of them, I realized the true potential. For example, I made a button that, when clicked, changes the background color of the page. Such a small feature, but the thrill of interactivity is addictive. It made me realize how much of the web experience relies on JavaScript. This practice session gave me a vision of what’s possible — dynamic forms, animations, and even entire apps built on these fundamentals."
  },
  {
    id: "4",
    title: "Building My First Express Server",
    date: "18 March",
    content: "After gaining confidence in frontend basics, I moved to the backend world with Node.js and Express. Setting up my very first server was a huge milestone. It was simple: I wrote just a few lines of code, and suddenly, when I visited localhost:3000, the browser displayed 'Hello World'. It felt surreal. What amazed me was the idea that this small server could be the foundation of any web app. Express made routing so intuitive — I could serve different pages depending on the URL path. Although it was just a starting point, I could already imagine building APIs and connecting them with my frontend projects. This opened a whole new world of possibilities for me."
  },
  {
    id: "5",
    title: "EJS Templates Are Awesome",
    date: "24 March",
    content: "Once I learned Express, I wanted to display dynamic content. That’s when I discovered EJS templates. Before EJS, I was repeating HTML for every page, but EJS changed the game. With its ability to loop over data and inject variables into HTML, I could finally create reusable layouts. For example, I built a blog listing page where the titles of all my posts were rendered dynamically from an array. It made my project feel like a real web application. The concept of partials also blew my mind — I could keep a single header and footer file and include them everywhere. It made my code cleaner and taught me how real-world websites manage templates efficiently."
  },
  {
    id: "6",
    title: "Bootstrap Makes Styling Easier",
    date: "2 April",
    content: "Styling a website from scratch using plain CSS can sometimes be time-consuming. This week, I explored Bootstrap, and it instantly changed the way I work on design. Within minutes, I had responsive layouts, styled buttons, and beautiful typography. The grid system in Bootstrap made it easy to align content across devices without writing dozens of custom CSS rules. I also loved the utility classes like text-center, bg-light, and rounded-pill that let me add styles quickly. Even though I plan to master CSS deeply, Bootstrap gave me a way to prototype ideas faster and focus more on functionality. It feels like a perfect tool for developers who want to balance speed with clean design."
  },
  {
    id: "7",
    title: "Deployed My First App",
    date: "20 April",
    content: "The highlight of my journey so far has been deploying my first web app. After weeks of building and testing locally, I finally pushed it live so anyone could visit it. I used a free hosting platform, connected my GitHub repository, and within minutes my blog project was available on the internet. Watching it work outside of localhost was an incredible feeling — it was no longer just a personal experiment, but a real project out in the world. This step taught me about environment variables, static file hosting, and the importance of clean code. Now, whenever I think of new ideas, I’m motivated to build them and share them publicly."
  }
];

//For getting current Date
const date = new Date() ;
const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] ;

//Route Handling
app.get("/" , (req,res) => {
  res.render("index.ejs" , {posts}) ;
});


app.get("/post/:id" , (req , res)=> {
  const post = posts.find( p => p.id === req.params.id) ;
  if (post) {
    res.render("post.ejs" , {post})  ;
    
  }
  else {
    res.status(404).send("Post not found") ;
  }
});

app.get("/post/:id/edit" , (req ,res) => {
  const post = posts.find(p => p.id === req.params.id) ;
  res.render("edit.ejs" , {post}) ;
});

app.post("/post/:id/edit" , (req,res) => {
  const post = posts.find( p => p.id === req.params.id) ;
  post.title = req.body["title"] ;
  post.content = req.body["content"] ;
  posts.title = req.body["title"] ;
  posts.content = req.body["content"] ;
  res.redirect(`/post/${post.id}`) ;
});

app.post("/post/:id/delete" , (req ,res) => {
  const postId = req.params.id ;
  posts = posts.filter(post => post.id !== postId) ;
  res.redirect("/") ;
});

app.get("/new" , (req , res) => {
  res.render("newpost.ejs") ;
});

app.post("/new/upload" , (req ,res) => {
  const newPost = {
    id : toString(nextId++) ,
    title : req.body['title'] ,
    date : `${date.getDate()} ${Months[date.getMonth()]}` ,
    content : req.body['content']
  }
  posts.push(newPost) ;
  res.redirect("/") ;
});

app.listen(port , ()=> {
  console.log(`Listening on port ${port}`) ;
});