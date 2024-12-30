let nav = 0;
let clicked = null;
let events;

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

fetchData()
    .then(events => {
     console.log(events);
     });

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
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
              buttonAppointment.classList.add('buttonReserved');
              buttonAppointment.addEventListener('click', () => deleteEvent(buttonAppointment.id));
            }else {
              buttonAppointment.addEventListener('click', () => saveEvent(buttonAppointment.id));
            }
        });

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
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('hu', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

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
    const dayString = `${year}-${month + 1}-${temptDay}`;


    if (i > paddingDays) {

      daySquare.innerText = i - paddingDays;

      fetchData()
      .then(events => {
            dayBusyness = events.filter(e => e.bookedAppointment.split('T')[0] === dayString);

            //number the appointments
            let positionInLine = [];
            for(let i = 0; i < dayBusyness.length; i++) {
              let position = dayBusyness[i].bookedAppointment.split('T')[1].split(':')[0];
              positionInLine.push(19 - position - position);
              if(dayBusyness[i].bookedAppointment.split('T')[1].split(':')[1] > 0) {
                positionInLine[i]--;
              }
            }


            //show the busyness in a day
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
      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }
    
    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  nameInput.classList.remove('error');
  newEventModal.style.display = 'none';
  //deleteEventModal.style.display = 'none';
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

function deleteEvent(bookedAppointment) {

  let bookedRecord;
  fetchData()
    .then(events => {
      bookedRecord = events.find(e => e.bookedAppointment === bookedAppointment + ":00");
      console.log(bookedRecord.id);

    fetch("http://localhost:8080/api/appointment/" + bookedRecord.id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response;
      })
      .then(data => {
          console.log('Resource deleted successfully:', data);
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });

  });
    closeModal();
}
/*
function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}
*/
function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  //document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  //document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  //document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();