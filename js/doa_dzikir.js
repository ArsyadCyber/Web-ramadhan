function getDoa() {
 fetch('https://raw.githubusercontent.com/Kieza17/doa-harian/main/doa-harian/doa-harian.json')
   .then(response => response.json())
   .then(data => {
     const container = document.getElementById('doa-container');
     // Menampilkan doa-doa
     data.result.forEach(doa => {
       const doaElement = document.createElement('div');
       doaElement.classList.add('doa');
       doaElement.innerHTML = `
         <h3 class="doa-title">${doa.doa}</h3>
         <p class="doa-text arabic-text">${doa.arab}</p>
         <p class="doa-text"><strong>Latin:</strong> ${doa.latin}</p>
         <p class="doa-text"><strong>Terjemahan:</strong> ${doa.id}</p>
       `;
       container.appendChild(doaElement);
     });
   })
   .catch(error => console.log('Terjadi kesalahan:', error));

 fetch('https://api.dikiotang.com/dzikir/pagi')
   .then(response => response.json())
   .then(data => {
     const dzikirContainer = document.getElementById('dzikir-container');

     data.data.forEach(dzikir => {
       const dzikirElement = document.createElement('div');
       dzikirElement.classList.add('dzikir');
       dzikirElement.innerHTML = `
         <h3 class="dzikir-title">Dzikir ${dzikir.type}</h3>
         <p class="dzikir-arabic">${dzikir.arab}</p>
         <p class="dzikir-text">${dzikir.indo}</p>
         <p class="dzikir-text">${dzikir.ulang}</p>
       `;
       dzikirContainer.appendChild(dzikirElement);
     });
   })
   .catch(error => console.log('Terjadi kesalahan:', error));

     fetch('https://api.dikiotang.com/dzikir/sore')
   .then(response => response.json())
   .then(data => {
     const dzikirContainer = document.getElementById('dzikir-container');

     data.data.forEach(dzikir => {
       const dzikirElement = document.createElement('div');
       dzikirElement.classList.add('dzikir');
       dzikirElement.innerHTML = `
         <h3 class="dzikir-title">Dzikir ${dzikir.type}</h3>
         <p class="dzikir-arabic">${dzikir.arab}</p>
         <p class="dzikir-text">${dzikir.indo}</p>
         <p class="dzikir-text">${dzikir.ulang}</p>
       `;
       dzikirContainer.appendChild(dzikirElement);
     });
   })
   .catch(error => console.log('Terjadi kesalahan:', error));
}

function filterDoa() {
 const dzikirContainer = document.getElementById('dzikir-container');
 dzikirContainer.style.display = 'none';

 const doaContainer = document.getElementById('doa-container');
 doaContainer.style.display = 'block';

 document.getElementById('filter-doa').classList.add('active');
 document.getElementById('filter-dzikir').classList.remove('active');
 document.getElementById('filter-all').classList.remove('active');
}

function filterDzikir() {
 const doaContainer = document.getElementById('doa-container');
 doaContainer.style.display = 'none';

 const dzikirContainer = document.getElementById('dzikir-container');
 dzikirContainer.style.display = 'block';

 document.getElementById('filter-dzikir').classList.add('active');
 document.getElementById('filter-doa').classList.remove('active');
 document.getElementById('filter-all').classList.remove('active');
}
function showAll() {
 const doaContainer = document.getElementById('doa-container');
 doaContainer.style.display = 'block';

 const dzikirContainer = document.getElementById('dzikir-container');
 dzikirContainer.style.display = 'block';

 document.getElementById('filter-doa').classList.remove('active');
 document.getElementById('filter-dzikir').classList.remove('active');
 document.getElementById('filter-all').classList.add('active');
}

function filterDoaDzikir() {
 const currentHour = getCurrentTime();
 const doaContainer = document.getElementById('doa-container');
 const dzikirContainer = document.getElementById('dzikir-container');

 if (currentHour >= 6 && currentHour < 15) {
   doaContainer.style.display = 'block';
   dzikirContainer.style.display = 'none';
 } else if (currentHour >= 15 && currentHour < 18) {
   doaContainer.style.display = 'none';
   dzikirContainer.style.display = 'block';
 } else {
   doaContainer.style.display = 'block';
   dzikirContainer.style.display = 'block';
 }
}


getDoa();