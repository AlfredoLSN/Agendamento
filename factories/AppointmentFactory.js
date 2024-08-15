class AppointmentFactory{

    Build(simpleAppointment){
        
        var day = simpleAppointment.date.getDate()+1;
        var month = simpleAppointment.date.getMonth();
        var year = simpleAppointment.date.getFullYear();
        var hour = Number.parseInt(simpleAppointment.time.split(":")[0]);
        var minutes = Number.parseInt(simpleAppointment.time.split(":")[1]);

        var startDate = new Date(year, month, day, hour, minutes, 0, 0);
        //startDate.setHours(startDate.getHours() - 3) A biblioteca FullCalendar já faz a conversão
        var appo = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + " - " + simpleAppointment.description,
            start: startDate,
            end: startDate,
            notified: simpleAppointment.notified,
            email: simpleAppointment.email
        }

        return appo;

        //id
        //title
        //start
        //end
        
    }

}

module.exports = new AppointmentFactory();