let nav = 0;
let clicked = null;
let events;
let disabledDays;

//Get request from server
function fetchData() { 
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const apiUrl = 'http://localhost:8080/api/appointment';

        xhr.open('GET', apiUrl, true);

        xhr.responseType = 'json';

        xhr.onload = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.response);
                events = xhr.response;
            } else {
                reject('Request failed with status: ' + xhr.status);
            }
        };

        xhr.onerror = function() {
            reject('Request failed');
        };

        xhr.send();
    }); 
}

//get request from server (disabledday)
fetchData()
    .then(events => {
     console.log(events);
     });

     function fetchDataDisabledday() { 
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const apiUrl = 'http://localhost:8080/api/disabledday';
    
          xhr.open('GET', apiUrl, true);
    
          xhr.responseType = 'json';
    
          xhr.onload = function() {
              if (xhr.readyState == 4 && xhr.status == 200) {
                  resolve(xhr.response);
                  disabledDays = xhr.response;
              } else {
                  reject('Request failed with status: ' + xhr.status);
              }
          };
    
          xhr.onerror = function() {
              reject('Request failed');
          };
    
          xhr.send();
      }); 
    }
    
  fetchDataDisabledday()
      .then(disabledDays => {
       console.log(disabledDays);
        });

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const weekdays = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';

    let appointment = 8;
    for(let i = 0; i < 19; i++) {
        let buttonAppointment = document.createElement('button');
        buttonAppointment.classList.add('buttonAppointment')

        if(appointment < 10 && i % 2 === 0) {
          appointment = "0" + appointment;
        }

        if(i % 2 === 0) {
            buttonAppointment.innerText = appointment + ":00";
            buttonAppointment.id = date + "T" + appointment + ":00";
        }else {
            buttonAppointment.innerText = appointment + ":30";
            buttonAppointment.id = date + "T" + appointment + ":30";
            appointment++;
        }
        
        let appointmentThisTime;
        fetchData()
        .then(events => {
            appointmentThisTime = events.find(e => e.bookedAppointment === buttonAppointment.id + ":00");
            if (appointmentThisTime) {
              buttonAppointment.disabled = true;
            }
        });

        buttonAppointment.addEventListener('click', () => saveEvent(buttonAppointment.id));
        buttonsPlace.appendChild(buttonAppointment);
    }
  }

  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  let month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('hu', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  if(month + 1 < 10) {
    let tempt = month + 1;
    month = '0' + tempt;
  }else {
    month++;
  }

  const paddingDays = weekdays.indexOf(dateString.split(', ')[1]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('hu', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    let temptDay = i - paddingDays;
    if(temptDay < 10) {
        temptDay = '0' + temptDay;
    }
    const dayString = `${year}-${month}-${temptDay}`;


    if (i > paddingDays) {

      daySquare.innerText = i - paddingDays;

      fetchData()
      .then(events => {
            dayBusyness = events.filter(e => e.bookedAppointment.split('T')[0] === dayString);

            let positionInLine = [];
            for(let i = 0; i < dayBusyness.length; i++) {
              let position = dayBusyness[i].bookedAppointment.split('T')[1].split(':')[0];
              positionInLine.push(19 - position - position);
              if(dayBusyness[i].bookedAppointment.split('T')[1].split(':')[1] > 0) {
                positionInLine[i]--;
              }
            }



            let busynessDiv = document.createElement('div');
            busynessDiv.classList.add('busynessDiv');
            daySquare.appendChild(busynessDiv);

            for(let i = 3; i > -16; i--) {
              if(positionInLine.find(p => p === i)) {
                let divTest = document.createElement('div');
                divTest.classList.add('testDiv');
                divTest.style.width = "5px";
                busynessDiv.appendChild(divTest);
              }else {
                let divTest = document.createElement('div');
                divTest.style.width = "5px";
                busynessDiv.appendChild(divTest);
              }
            }
            
        });

      //set disabled days
      fetchDataDisabledday()
      .then(disabledDays => {
            let isDisabledDay = disabledDays.find(e => e.disabledDay === dayString);
            if(isDisabledDay) {
              daySquare.classList.add('dayDisabled');
            }
          });

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      daySquare.addEventListener('click', () => openModal(dayString));

        dayStringToDate = new Date(dayString);
        let checkSunday = dayStringToDate.toLocaleDateString('hu', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        });

        if(checkSunday.split(', ')[1] === "vasárnap") {
          daySquare.classList.add('dayDisabled');
        }
        
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  nameInput.classList.remove('error');
  newEventModal.style.display = 'none';
  modalBackDrop.style.display = 'none';
  nameInput.value = '';
  emailInput.value ='';
  buttonsPlace.innerText = '';
  clicked = null;
  load();
}

function saveEvent(bookedAppointment) {
  if (nameInput.value && emailInput.value) {
    nameInput.classList.remove('error');

    fetch("http://localhost:8080/api/appointment", {
        method: "POST",
        body: JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
            mobileNumber: null,
            bookedAppointment: bookedAppointment,
            approval: false
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });

    closeModal();
  } else {
    nameInput.classList.add('error');
  }
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('cancelButton').addEventListener('click', closeModal);
}

initButtons();
load();