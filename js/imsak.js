document.addEventListener('DOMContentLoaded', function () {
  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = getDate.getMonth() + 1;
  const day = getDate.getDate();
  const tanggal = `${year}-${month}-${day}`;
  const tgl = `${year}/${month}`;

  let namaKota = localStorage.idkota;
  let cekKotaResult;

  function cekKota() {
    if (!namaKota) {
      cekKotaResult = 1632;
    } else {
      cekKotaResult = namaKota;
    }
    return cekKotaResult;
  }

  function getJadwalDay() {
  fetch(`https://api.myquran.com/v2/sholat/jadwal/${cekKota()}/${tanggal}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.status === true) {
        const jadwal = data.data.jadwal;
        dataJadwal(jadwal);
      } else {
        console.error('API error:', data.message);
        // Handle the case when data is not found, for example, display a message to the user.
      }
    })
    .catch(error => console.error('Fetch error:', error));


 fetch(`https://api.myquran.com/v2/sholat/jadwal/${cekKota()}/${tgl}`)
  .then(response => response.json())
  .then(data => {
    const table = document.querySelector('.jadwal-table');
    const tableHeader = document.createElement('tr');

    tableHeader.innerHTML = `
      <th>Tanggal</th>
      <th>Imsak</th>
      <th>Subuh</th>
      <th>Terbit</th>
      <th>Dzuhur</th>
      <th>Ashar</th>
      <th>Maghrib</th>
      <th>Isya</th>
    `;

    table.appendChild(tableHeader);

    if (data.status && data.data.jadwal) {
      data.data.jadwal.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.tanggal}</td>
          <td>${item.imsak}</td>
          <td>${item.subuh}</td>
          <td>${item.terbit}</td>
          <td>${item.dzuhur}</td>
          <td>${item.ashar}</td>
          <td>${item.maghrib}</td>
          <td>${item.isya}</td>
        `;

        table.appendChild(row);
      });
    }

    console.log(data);
    // Lakukan operasi lain dengan data yang diterima dari API
  })
  .catch(error => {
    console.log('Terjadi kesalahan:', error);
  });

}


  function dataJadwal(jadwal) {
    document.querySelector('.imsak').textContent = jadwal.imsak;
    document.querySelector('.subuh').textContent = jadwal.subuh;
    document.querySelector('.terbit').textContent = jadwal.terbit;
    document.querySelector('.dzuhur').textContent = jadwal.dzuhur;
    document.querySelector('.ashar').textContent = jadwal.ashar;
    document.querySelector('.maghrib').textContent = jadwal.maghrib;
    document.querySelector('.isya').textContent = jadwal.isya;
    document.querySelector('.tanggal').textContent = jadwal.tanggal;
    if (!localStorage.namakota) {
      window.localStorage.setItem('namakota', 'Jakarta');
    }
    document.querySelector('#judul-kota').textContent = localStorage.namakota;
  }


  const namaListKota = document.querySelector('.cari-kota');
  const addKota = document.querySelector('.nama-list-kota');
  namaListKota.addEventListener('keyup', function () {
    const kotakota = namaListKota.value.length;
    if (kotakota > 0) {
      addKota.classList.remove('hidden-list');
      fetch('https://api.myquran.com/v2/sholat/kota/semua')
        .then(response => response.json())
        .then(response => {
          const kota = response.data;
          let likota = ``;
          kota.forEach(k => {
            likota += `<a href="#" data-idkota="${k.id}" id="inikota" class="list-group-item list-group-item-action">${k.lokasi}</a>`;
          });
          const listKota = document.querySelector('.nama-list-kota');
          listKota.innerHTML = likota;

          // ketika pilih kota
          const inikota = document.querySelectorAll('#inikota');
          inikota.forEach(k => {
            const filterText = namaListKota.value.toLowerCase();
            const itemText = k.firstChild.textContent.toLowerCase();

            if (itemText.indexOf(filterText) != -1) {
              k.setAttribute("style", "display: block;");
            } else {
              k.setAttribute("style", "display: none !important");
            }

            k.addEventListener('click', function () {
              const idkota = this.dataset.idkota;
              const namaKota = this.textContent;
              window.localStorage.setItem('idkota', idkota);
              window.localStorage.setItem('namakota', namaKota);
              document.querySelector('#judul-kota').textContent = localStorage.namakota;
              addKota.classList.add('hidden-list');
              namaListKota.value = '';
              location.reload();
            });
          });

        });
    } else {
      addKota.classList.add('hidden-list');
    }

  });

  getJadwalDay();
});
