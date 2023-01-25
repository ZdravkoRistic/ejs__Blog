//jshint esversion:6



const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');

// konstante koje prikazuju sadrzaj na parsial stranicama

const homePocetniSadrzaj = "Cripto Chia";
const onamaSadrzaj = "O nama";
const kontaktSadrzaj = "Uzimanje lovice";


//aplikacija
const app = express();



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
















let posts = [];


//get rute za prikazivanje ejs parsijalnih stranica

app.get("/", function (req, res) {
  res.render("home", { pocetniSadrzaj: homePocetniSadrzaj, posts: posts });

});


app.get("/about", function (req, res) {
  res.render("about", { onamaParsial: onamaSadrzaj });

});


app.get("/contact", function (req, res) {
  res.render("contact", { kontaktParsial: kontaktSadrzaj });

});

app.get("/compose", function (req, res) {
  res.render("compose");

});


app.post("/compose", function (req, res) {

  const post = {
    naslov: req.body.postNaslov,
    sadrzaj: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");


});

app.get('/posts/:postIme', function (req, res) {
  const trazeniNaslovi = _.lowerCase(req.params.postIme);

  posts.forEach(function (post) {
    const skladisteniNaslovi = _.lowerCase(post.naslov);

    if (skladisteniNaslovi === trazeniNaslovi) {
      res.render('post', {
        naslov: post.naslov,
        sadrzaj: post.sadrzaj
      });
    }

  });

});

//server , ovaj kod je uvek isti
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
