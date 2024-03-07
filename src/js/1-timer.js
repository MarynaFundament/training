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
      
         button.disabled = true;
        } else {
         button.disabled = false;

        }

    },
  };

flatpickr(input, options) 

const updateClockface = ({ days, hours, minutes, seconds }) => {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}


class Timer {
 
    constructor({onTick}){
      
      this.intervalId = null;
      this.onTick = onTick;

    }


    start() {
      const targetDate = userSelectedDate.getTime();
      this.intervalId = setInterval(() => {
          const currentDate = new Date().getTime();
          const remainingTime = targetDate - currentDate;
          const timeObject = this.convertMs(remainingTime);
          this.onTick(timeObject);
      }, 1000);
  }


  convertMs = (ms) => {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);  // Remove this.addLeadingZero
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);  // Remove this.addLeadingZero
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);  // Remove this.addLeadingZero
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);  // Remove this.addLeadingZero
  
    return { days, hours, minutes, seconds };
}
    //   console.log(convertMs(4000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
    //   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
    //   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
     
  
     addLeadingZero = (value) => {
        return String(value).padStart(2, "0")
    
    }


}

const timer = new Timer({ onTick: updateClockface });

button.addEventListener("click", () => {
    timer.start();
});





