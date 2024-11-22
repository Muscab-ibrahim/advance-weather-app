const main = document.querySelector('.content-controller');
const main2 = document.querySelector('main');


const content = document.querySelector('.content')

const not_found = document.querySelector('.not-found')


const search  = document.querySelector('#search')
const btn = document.querySelector('#btn')


let condition = true;

// setTimeout( () => {

//   if (condition) {
//     main.style.height = '350px'
//     main2.style.height = 'fit-content'
//     setTimeout( () => {
//       content.classList.add('active')
//       not_found.classList.remove('active')
//     },300)

//   } else {
//     main2.style.height = 'fit-content'
//     main.style.height = '300px' ;
//     setTimeout( () => {
//      content.classList.remove('active')
//      not_found.classList.add('active')
//     }, 300)

//   }

// }, 2000)

 
async function getData (city) {

  try {
  
    const urldata = `https://api.weatherapi.com/v1/current.json?key=7da3829328c341e987432613242011&q=${city}&aqi=ye`


  const reuqest = await fetch(urldata + city)

  if(!reuqest.ok) {
    main2.style.height = 'fit-content'
    main.style.height = '240px' ;
    setTimeout( () => {
      content.classList.remove('active')
      not_found.classList.add('active')
     }, 300)

  } else {
    main2.style.height = 'fit-content'
    main.style.height = '350px' ;
    setTimeout( () => {
      content.classList.add('active')
      not_found.classList.remove('active')
    },300)

  }

  const response = await  reuqest.json();

  console.log(response)

  AddDom(response)

  } catch (err) {
    console.log('eorror')
  }

}


function AddDom (data) {

  console.log(data)

 
  content.innerHTML = `  
  <div class="cards">
  
  <div class="card">
    <div class="left-sec">
      <i class="fa-solid fa-location-dot"></i>
      <span class="city">${search.value}</span>
    </div>
    <div class="right-sec">
      <span class="time">${data.location.localtime}</span>
    </div>
  </div>

  <div class="card">
    <div class="left-sec">
      <img src="${data.current.condition.icon}" alt="">
    </div>
    <div class="right-sec">
      <span class="degree">${data.current.temp_c} °c</span> <br>
      <span class="condition">${data.current.condition.text}</span>
    </div>
  </div>

  <div class="card">
    <div class="left-sec">
     <i class="fa-solid fa-droplet"></i>
      <span class="air">Humidity</span> <br>
      <p class="perc">${data.current.humidity}%</p>
    </div>
    <div class="right-sec">
    <i class="fa-solid fa-wind"></i>
      <span class="air">Humidity</span> <br>
      <p class="perc">${data.current.wind_kph}M/s</p>
    </div>
  </div>

</div> `
}



btn.addEventListener('click', () => {

  getData(search.value)

})

