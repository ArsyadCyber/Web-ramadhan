fetch("https://islamic-api-zhirrr.vercel.app/api/tahlil")
.then(response => response.json())
.then(result => {
  // Mengakses data yang diterima
  const tahlilData = result.data;

  // Mengambil elemen <ul> dengan id "tahlil-list"
  const tahlilList = document.getElementById("tahlil-list");

  // Iterasi melalui array objek dan tambahkan ke elemen <ul>
  tahlilData.forEach(tahlil => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<div>${tahlil.title}</div>
          <div class="text-arab">${tahlil.arabic}</div>
         <div>${tahlil.translation}<div>`;
    tahlilList.appendChild(listItem);
  });
})
.catch(error => {
  console.log("Gagal mengambil data:", error);
});