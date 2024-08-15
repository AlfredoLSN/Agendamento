const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AppointmentService = require("./services/appointmentService");
const appointmentService = require("./services/appointmentService");



app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/agendamento");


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/cadastro", (req, res) => {
    res.render("create")
});

app.post("/create", async (req, res) => {
    var status = await appointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    );
    if(status){
        res.redirect("/")
    }else{
        res.send("Ocorreu uma falha!");
    }
});

app.get("/getcalendar", async (req, res) => {
    var appointments = await AppointmentService.GetAll(false);
    res.json(appointments);
});

app.get("/event/:id", async (req, res) => {
    var id  = req.params.id
    var appointment = await appointmentService.GetById(id);
    console.log(appointment)
    res.render("event",{appo: appointment});
});

app.post("/finish", async (req, res) => {
    var id = req.body.id;
    var result = await AppointmentService.Finish(id);

    res.redirect("/");
});

app.get("/list", async (req, res) => {
    var appos = await appointmentService.GetAll(true);
    res.render("list",{appos});
});

app.get("/searchresult", async (req, res) => {
    var appos = await AppointmentService.Search(req.query.search);
    res.render("list",{appos});
});

var pollTime = 1000 * 60 * 5;

setInterval(async () => {
    await AppointmentService.SendNotification();
},pollTime)


app.listen(8080, () => {});