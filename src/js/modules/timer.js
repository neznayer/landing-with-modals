const timer = (id, deadline) => {

    // id - kuda renderit timer, deadline - kogda akciya zakonchitsya

    const addZero = (num) => {
        if (num<=9) {
            return "0" + num;
        } else {
            return num;
        }
    };

    const getTimeRemaining = (endtime) => {
        // vichislit kol-vo min sec, h and days

        const t = Date.parse(endtime) - Date.parse(new Date()),
        // Date.parse - perevodit argument is stroki v opredelennom formate v kol-vo ms s 1970
        // kogda new Date() - sozdaetsya nov object Date i tuda zapisyvaaetsya Tekushee vremya v ms
              seconds = Math.floor((t/1000)%60), // %60 ostatok ot deleniya kol-va sec na 60
              minutes = Math.floor((t/1000/60)%60),
              hours = Math.floor((t/(1000*60*60))%24),
              days = Math.floor(t/(1000*60*60*24));
    
        return {
            "total" : t,
            "days": days,
            "hours": hours,
            "minutes" : minutes,
            "seconds" : seconds
        };

    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
              days = document.querySelector("#days"),
              hours = document.querySelector("#hours"),
              minutes = document.querySelector("#minutes"),
              seconds = document.querySelector("#seconds"),
              timeInerval = setInterval(updateClock, 1000);
        // id of the timer to stop it omewhen
        updateClock(); // chtoby ne zhdat 1 sec poke interval obnovit to chi bylo v verstke v znachenii timera

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                // stop timer
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                clearInterval(timeInerval)
            }
        }

    };

setClock (id, deadline);

};

export default timer;