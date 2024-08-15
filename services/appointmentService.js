var appointment = require("../models/Appointment");
var mongoose = require("mongoose");
var AppointmentFactory = require("../factories/AppointmentFactory");
var mailer = require("nodemailer");

const Appo = mongoose.model("Appointment", appointment);

class AppointmentService{

    async Create(name, email, description, cpf, date, time){
        var newappo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false,
            notified: false
        });
        try{
            await newappo.save();
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
        
    }

    async GetAll(showFinished){
        if(showFinished){
            return await Appo.find();
        }else{
            var appos = await Appo.find({'finished': false});
            var appointments = [];

            appos.forEach(appointment => {
                if(appointment.date != undefined){
                    appointments.push(AppointmentFactory.Build(appointment));
                }
            })
            return appointments;
        }
    }

    async GetById(id){
        try{
            var event =  await Appo.findOne({"_id": id});
            return event
        }catch(err){
            console.log(err);
        }
    }
    
    async Finish(id){
        try{
            await Appo.findByIdAndUpdate(id,{finished: true});
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    //Query => E-mail
    //OU
    //Query => CPF

    async Search(query){
        try{
            var appos = await Appo.find().or([{email: query},{cpf: query}]);
            return appos;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async SendNotification(){
        var appos = await this.GetAll(false);
        
        var transporter = mailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "6d3691865cd366",
                pass: "1eaa278367ff0c"
            }
        });

        appos.forEach(async appo => {
            var date = appo.start.getTime();
            var hour = 1000 * 60 * 60 * 1;
            var gap = date-Date.now();

            if(gap <= hour){
                await Appo.findByIdAndUpdate(appo.id, {notified: true})
                if(!appo.notified){
                    transporter.sendMail({
                        from: "Alfredo Lucas <alfredolsn@hotmail.com>",
                        to: appo.email,
                        subject: "Consulta",
                        text: "Sua consulta vai acontecer em 1 hora!"
                    }).then(() => {

                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        })
    }
    

}

module.exports = new AppointmentService();