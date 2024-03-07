
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.getElementById('datetime-picker')
const button  = document.querySelector(".button")
const dataDays = document.getElementById("data-days");
const dataHours = document.getElementById("data-hours");
const dataMinutes = document.getElementById("data-minutes");
const dataSeconds = document.getElementById("data-seconds");

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
  
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];

       if(userSelectedDate < new Date()){

        iziToast.warning({
         position: 'topRight',
         message: 'Please choose a date in the future',
        })
      
        }

    },
  };

flatpickr(input, options) 


class Timer {

  constructor({onTick}) {
    this.intervalId = null;
    this.onTick = onTick;
 
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = userSelectedDate - currentTime;
  
      if (deltaTime <= 0) {
        this.onTick({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(this.intervalId);
        return;
      }
  
      const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
      this.onTick({ days, hours, minutes, seconds });
    }, 1000);
  }
  


    
  convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
      // Remaining days
      const days = this.pad(Math.floor(ms / day));
      // Remaining hours
      const hours = this.pad(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));
    
      return { days, hours, minutes, seconds };
    }


  pad(value) {
      return String(value).padStart(2, "0");
    }
}


const timer = new Timer({
  onTick: updateClockface
})

button.addEventListener(`click`, () => {
  timer.start()
})




function updateClockface({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}



