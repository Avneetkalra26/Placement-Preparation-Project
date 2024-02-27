var express = require("express");
// var session = require("express-session");

var app= express();
var path = require("path");
var fileuploaded = require("express-fileupload");

var mysql=require('mysql');

var connection=mysql.createConnection(
{ host:"localhost",
  user:"ABC",
  password:null,
  database:"online placement"
});

connection.connect(function(error)
{ if (error)throw error;
 console.log("Database Connected");
});



app.use(fileuploaded());
app.use(express.static("views"));
app.use(express.urlencoded({extended:true}));
 
app.get("/",function(req,res){
  res.redirect("index.html");
});
app.get("/Technical-Interview",function(req,res){
  res.redirect("Technical-interview.html");
});

app.get("/SQL",function(req,res){
  res.redirect("sql.html");
});
app.get("/PPTs",function(req,res){
  res.redirect("content.html");
});

app.get("/OOPs",function(req,res){
  res.redirect("oops.html");
});
app.get("/Accenture-syllabus",function(req,res){
  res.redirect("Accenture-syllabus.html");
});

app.get("/Infosys-syllabus",function(req,res){
  res.redirect("Infosys-syllabus.html");
});

app.get("/TCS-syllabus",function(req,res){
  res.redirect("TCS-syllabus.html");
});

app.get("/companies",function(req,res){
    res.redirect("Companies.html");
  });
  
app.get("/HR-Interview",function(req,res){
    res.redirect("HR-interview.html");
});

app.get("/Admin_Signup",function(req,res){
    res.redirect("Admin_Signup.html");
});

app.get("/Contact-us",function(req,res){
  res.redirect("Contact-us.html");
});

app.get("/About-us",function(req,res){
  res.redirect("About-us.html");
});

app.get("/Login",function(req,res){
  res.redirect("admin-login.html");
});


//Create Session
app.get("/test-session", (req, res) => {
  session.username = "Riya";
  res.send("Session Created.");
});

//Check Session
app.get("/check-session-created", (req, res) => {
  // console.log(session.username);
  if (session.username == undefined) {
      res.redirect("/admin-login");
  } else {
      res.send(session.username);
  }
});
app.get("/test-session", (req, res) => {
    session.username = "Riya";
    res.send("Session Created.");
  });
  
// Authenticate Admin
app.post("/admin-login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  // console.log(email, password);

  var loginSQL = `SELECT * FROM admin WHERE Email="${email}" AND Password="${password}"`;
  connection.query(loginSQL, (error, data) => {
      if (error) {
          res.send("error");
      } else {
          // console.log(data);

          if (data.length > 0) {
              session.adminEmail = email;
              session.adminName = data[0].name;

              res.send("success");
          } else {
              res.send("invalid");
          }
      }
  });
});

app.get("/get-tcs-data",(req,res)=>{
  var readData="SELECT * FROM tcs";
  connection.query(readData,(error,data)=>{ //data is used to fetch rows
      if(error) throw error;
      res.send(data);
  })
  });
  app.get("/get-tcs-data-1",(req,res)=>{
    var readData="SELECT * FROM tcs_advanced";
    connection.query(readData,(error,data)=>{ //data is used to fetch rows
        if(error) throw error;
        res.send(data);
    })
  });

  app.get("/get-infosys-data",(req,res)=>{
    var readData="SELECT * FROM infosys";
    connection.query(readData,(error,data)=>{ //data is used to fetch rows
        if(error) throw error;
        res.send(data);
    })
  });
  
app.get("/get-users-data",(req,res)=>{
var readData="SELECT * FROM accenture";
connection.query(readData,(error,data)=>{ //data is used to fetch rows
    if(error) throw error;
    res.send(data);
})
});

// app.get("/about",function(req,res){
//     //  res.send("hello");
//     res.write("<h1>About Us</h1>");
//     res.write('<a href="/">Home</a>');
//     res.end();
// });

app.post("/Admin-signup" ,(req,res)=>{

  var a=req.body.admin_name;//get from http formData the name attribute
  var b=req.body.email;
  var c=req.body.pass;
  var insert= `INSERT INTO admin(Name,Email,Password)
   VALUES("${a}","${b}","${c}")`;
   connection.query(insert,function (error) {
     if (error) {
       // console.log(error);
       res.send("error");
   } else {
       res.send("added");
   }
   });

});

app.post("/contact-us" ,(req,res)=>{
   var name=req.body.name;//get from http formData the name attribute
   var pass=req.body.pass;
   var msg=req.body.msg;

   var insert= `INSERT INTO contact(name,email,message)
    VALUES("${name}","${pass}","${msg}")`;
    connection.query(insert,function (error) {
      if (error) {
        // console.log(error);
        res.send("error");
    } else {
        res.send("added");
    }
    });
  
});


var port =3000;

app.listen(port,console.log("Server Running"));