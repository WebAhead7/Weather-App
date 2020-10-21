var capital = document.getElementById('text')
var country = document.querySelector('.country')
var flag = document.querySelector('.flag');
var info = document.querySelector('.info');
var region = document.querySelector('.region');
var population = document.querySelector('.population');
var img = document.querySelector('.img')

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    
fetch(`https://restcountries.eu/rest/v2/capital/${capital.value}`)
.then(response => response.json())
.then(data => {
    const finaldata = data[0]
    country.innerHTML = finaldata.name;
    img.src= finaldata.flag;
    region.innerHTML = finaldata.region;
    population.innerHTML = finaldata.population;


})
.catch(error => console.log(error));

});


// console.log('country: ',country);
// console.log('Flag: ',flag);
// console.log('region: ',region);
// console.log('population: ',population);


    


