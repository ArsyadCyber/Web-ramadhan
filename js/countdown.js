function countdownToRamadan() {
 const currentDate = new Date();
 const ramadanDate = new Date('2024-03-11T00:00:00Z');
 const timeDifference = ramadanDate - currentDate;

 if (timeDifference > 0) {
     const time = getTimeComponents(timeDifference);

     renderCountdown(time);
 } else {
     renderWelcomeMessage();
 }
}

function getTimeComponents(timeDifference) {
 const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
 const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
 const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
 const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

 return {
     days,
     hours,
     minutes,
     seconds
 };
}

function renderCountdown(time) {
 const countdownElement = document.getElementById('countdown');
 const countdownBoxes = ['hari', 'jam', 'menit', 'detik'];

 let countdownHTML = '';
 Object.values(time).forEach((value, index) => {
     countdownHTML += `
         <div class="countdown-box">${value}<br>${countdownBoxes[index]}</div>
     `;
 });

 countdownElement.innerHTML = countdownHTML;
}

function renderWelcomeMessage() {
 document.getElementById('hero-title').innerHTML = "Selamat Datang di Bulan Ramadan!";
}

setInterval(countdownToRamadan, 1000);