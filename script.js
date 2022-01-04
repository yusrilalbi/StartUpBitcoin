//Deklarasi Variabel
var reloadData = 30; // dalam detik
var timer;
var globalklik;
var relasi;
var arr = []

//Take ID data
tes = document.querySelector('#tes');
cari = document.querySelector('#cari');
icon = document.querySelector('#icon');
passing = document.querySelector('#passing')

//All Function Declaration
ambildata = () => {
  tes = document.querySelector('#tes')
}
function updateDataAPI() {
  $.ajax({
    url: 'https://indodax.com/api/summaries',
    success: function(data) {
      passingTable(data)
      passingToPembayaran()
      clearTimeout(timer)
      $('#timer').html(reloadData)
      setTimeout(updateDataAPI, reloadData*1000)
      updateTimer()
    },
    error: function(err) {
      alert("Tidak bisa mengambil data API")
    }
  })
}
function findAPI(){
  $.ajax({
    url: 'https://indodax.com/api/summaries',
    success: function(data) {
      var row;
      passingTable(data)
    },
    error: function(err) {
      alert("Tidak bisa mengambil data API")
    }
  })
}
function updateTimer() {
  a = parseInt($('#timer').html())
  $('#timer').html(a - 1)
  if (a > 0)
    timer = setTimeout(updateTimer, 1000)
}
function passingToPembayaran(){
  $.ajax({
    url: 'https://indodax.com/api/summaries',
    success: function(data) {
      var d = 0;
      $("#passing").html(`
                    <br>
                    <tr>
                    <th>Pairs</th>
                    <th>Harga Beli</th>
                    <th>Harga Jual</th>
                    </tr>
      `)
      for (var key in data.tickers) {
        if(globalklik==key){
          relasi = key
          d = data.tickers[key].buy;
          row = `<tr>
              <td style="color: blue;"> ${key.toUpperCase()}</td>
              <td> ${data.tickers[key].last} </td>
              <td> ${data.tickers[key].buy} </td>
            </tr>`
        $('#passing tr:last').after(row);
        }
      }
      
    },
    error: function(err) {
      alert("Tidak bisa mengambil data API")
    }
  })
  $.ajax({
    url : "https://indodax.com/api/pairs",
    success : function(data){
      console.log(data[0].url_logo_png)
      for(var keyGambar = 0; keyGambar< data.length; keyGambar++){
        if(relasi==data[keyGambar].ticker_id)
        icon.src = data[keyGambar].url_logo_png
      }
    },
    error : function(err){
        alert("data gambar gagal di ambil")
    }
  })
}
function klikTable(a) {
  globalklik = a
  passingToPembayaran()
}
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("coins");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if(n==0){
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      else if(n==6){
        if (dir == "asc") {
          
          if (parseFloat(x.innerHTML.slice(3,-4)) > parseFloat(y.innerHTML.slice(3,-4))) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (parseFloat(x.innerHTML.slice(3,-4)) < parseFloat(y.innerHTML.slice(3,-4))) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      else{
      if (dir == "asc") {
        
        if (parseFloat(x.innerHTML.toLowerCase()) > parseFloat(y.innerHTML.toLowerCase())) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (parseFloat(x.innerHTML.toLowerCase()) < parseFloat(y.innerHTML.toLowerCase())) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
function toFixed(value, precision) {
  var precision = precision || 0,
      power = Math.pow(10, precision),
      absValue = Math.abs(Math.round(value * power)),
      result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

  if (precision > 0) {
      var fraction = String(absValue % power),
          padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
      result += '.' + padding + fraction;
  }
  return result;
}
function passingTable(data){
  var comp = -999, jum = 0;
  $('#coins').html(`<tr style="cursor: pointer;">
                          <th onclick="sortTable(0)">Pairs&#x25b4;&#x25be;</th>
                          <th onclick="sortTable(1)">Harga&#x25b4;&#x25be;</th> 
                          <th onclick="sortTable(2)">Beli&#x25b4;&#x25be;</th> 
                          <th onclick="sortTable(3)">jual&#x25b4;&#x25be;</th> 
                          <th onclick="sortTable(4)">Tertinggi 24h&#x25b4;&#x25be;</th>
                          <th onclick="sortTable(5)">Terendah 24h&#x25b4;&#x25be;</th>
                          <th onclick="sortTable(6)">Persentase&#x25b4;&#x25be;</th>
                        </tr>`)
      for (var key in data.tickers) {
        if(key.includes(tes.value)){
        if(key.slice(-4,-3)=="_")
          var tx = 100 - data.prices_24h[key.slice(0,-4)+key.slice(-3)]/data.tickers[key].last*100
        else
          var tx = 100 - (parseFloat(data.tickers[key].high)+parseFloat(data.tickers[key].low))/2/data.tickers[key].buy*100
        
        arr.push([key,data.tickers[key].buy,data.tickers[key].sell,tx])

        tx = tx.toString().slice(0,4)
        row = `<tr id=${key} onclick='klikTable(id)' style="cursor: pointer; class="item">
              <td style="color: blue;">${key.toUpperCase()}</td>
              <td> ${data.tickers[key].last} </td>
              <td> ${data.tickers[key].buy} </td>
              <td> ${data.tickers[key].sell} </td>
              <td> ${data.tickers[key].high} </td>
              <td> ${data.tickers[key].low} </td>`
        if(tx>0)
        row = row + `<td style="color: green"><b> ${tx}%</b></td>
        </tr>`
        else if(tx==0)
        row = row + `<td style="color: grey"><b> ${tx}%</b></td>
        </tr>`
        else
        row = row + `<td style="color: red"><b> ${tx}%</b></td>
        </tr>`
        $('#coins tr:last').after(row);
      }
    }
    arr.sort(function(a,b) {
      return a[3]-b[3]
  });
    arr.reverse()
    $('#top').html(`<tr>
                      <th>Pairs</th>
                      <th>Harga Beli</th>
                      <th>Harga Jual</th>
                      <th>Persentase</th>
                    </tr>`)
    for(i=0; i<10; i++){
      row = `<tr id=${arr[i][0]} onclick='klikTable(id)' style="cursor: pointer; class="item">
              <td style="color: blue;">${arr[i][0].toUpperCase()}</td>
              <td> ${arr[i][1]} </td>
              <td> ${arr[i][2]} </td>
              <td style="color: green"><b> ${toFixed(arr[i][3],2)}%</b></td>
              </tr>`
              $('#top tr:last').after(row);
    }
    $('#loser').html(`<tr>
                        <th style="background-color: red;">Pairs</th>
                        <th style="background-color: red;">Harga</th>
                        <th style="background-color: red;">Beli</th>
                        <th style="background-color: red;">Persentase</th>
                      </tr>`)
    arr.reverse()
    for(i=0; i<10; i++){
      row = `<tr id=${arr[i][0]} onclick='klikTable(id)' style="cursor: pointer; class="item">
              <td style="color: blue;">${arr[i][0].toUpperCase()}</td>
              <td> ${arr[i][1]} </td>
              <td> ${arr[i][2]} </td>
              <td style="color: red"><b> ${toFixed(arr[i][3],2)}%</b></td>
              </tr>`
              $('#loser tr:last').after(row);
    }
    arr = []
}

//Fungsi Awal
icon.src = "https://indodax.com/v2/logo/png/color/btc.png"
updateDataAPI()
//when Click - Change - Trigerred Condition
$("#tes").on("change keyup paste", function(){
  findAPI()
})
$("#beli").on('click',function(){
  klikTable(10)
})
cari.addEventListener('click',findAPI)
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}