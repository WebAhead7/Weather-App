var capital = document.querySelector('.capital')
var country = document.querySelector('.country')
var flag = document.querySelector('.flag');
var info = document.querySelector('.info');
var region = document.querySelector('.region');
var population = document.querySelector('.population');
var img = document.querySelector('.img')
const weak=["SUN","MON","TUE","WED","THU","FRI","SAT"];
var h2 = document.querySelector('h2');

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    let city=document.getElementById("city").value;
    renderer(city);
});


const renderer= city=>{
    //fetch to get information about the relative city (country,flag, population)
    fetch(`https://restcountries.eu/rest/v2/capital/${city}`)
   .then(response => {
    if (response.ok) {
        return response.json();
    } else {
        h2.innerHTML = city;
        country.style.visibility = "hidden";
        region.style.visibility = "hidden";
        population.style.visibility = "hidden";
        flag.style.visibility = "hidden";
        return 0;
      }
   })
   .then(data => {if(data!=0){
    country.style.visibility = "visible";
    region.style.visibility = "visible";
    population.style.visibility = "visible";
    flag.style.visibility = "visible";
    const finaldata = data[0]
    country.innerHTML = finaldata.name;
    img.src= finaldata.flag;
    region.innerHTML = finaldata.region;
    population.innerHTML = finaldata.population;
    h2.innerHTML = city;}})
   .catch(error => console.log(error));



   const Key="959c745180588f77a59a13e5043064ef"
    //fetch to get all weather info about the related city.
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Key}&units=metric`)
    .then(response=>response.json())
    .then(data => {
        let date = new Date();
        let hour = date.getHours(); //get the current hour
        let day = date.getUTCDay() //get the current day (if day is TUE for example => day=3)
        list_today_count=8-Math.floor(hour/3);
        let nxt5days=[]; //array for the next 5 days to save all the needed weather info.
        let this_day={}; //courent day weather info obj.
        const today= data=>{
            curr_temp= data.list[0].main.temp; 
            curr_wind_speed= data.list[0].wind.speed;
            curr_weather_description= data.list[0].weather[0].description; 
            min_temp=Math.min(...data.list.slice(0, list_today_count).map(item=>item.main.temp_min));
            max_temp=Math.max(...data.list.slice(0, list_today_count).map(item=>item.main.temp_max));
            this_day={
                curr_temp:curr_temp,
                curr_wind_speed:curr_wind_speed,
                curr_weather_description:curr_weather_description,
                min_temp:min_temp,
                max_temp:max_temp
            }
        }
        const other_days= data=>{
            for(let index=0;index<4;index++){
                min_temp=Math.min(...data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp_min));
                max_temp=Math.max(...data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp_max));
                nxt5days[index]={
                        min_temp:min_temp,
                        max_temp:max_temp,
                    }
                }
                min_temp==Math.min(...data.list.slice(list_today_count+32).map(item=>item.main.temp_min));
                max_temp=Math.max(...data.list.slice(list_today_count+32).map(item=>item.main.temp_max));
                nxt5days[4]={
                    min_temp:min_temp,
                    max_temp:max_temp,
                }
            }
        today(data);
        other_days(data);      
        
        const weather_degree=document.querySelector('.weather-degree');
        weather_degree.children[0].textContent=this_day.curr_weather_description;
        weather_degree.children[1].firstChild.textContent=`Wind ${this_day.curr_wind_speed}km/h `;
        weather_degree.children[2].innerHTML=` ${this_day.curr_temp}° `;
        weather_degree.children[3].innerHTML=` ${this_day.max_temp}° `;
        weather_degree.children[4].innerHTML=` ${this_day.min_temp}° `;

        const table=document.querySelector('table');
        const tr=table.getElementsByTagName("tr");
        nxt5days.forEach((value,index)=>{
            tr[0].children[index].textContent=weak[(day+index)%7];
            tr[1].children[index].textContent=value.max_temp;
            tr[2].children[index].textContent=value.min_temp;
        });
    })
    .catch(error => console.log(error));
}
renderer("Beirut");
