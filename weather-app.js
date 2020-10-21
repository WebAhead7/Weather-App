var capital = document.querySelector('.capital')
var country = document.querySelector('.country')
var flag = document.querySelector('.flag');
var info = document.querySelector('.info');
var region = document.querySelector('.region');
var population = document.querySelector('.population');
var img = document.querySelector('.img')
const weak=["SUN","MON","TUE","WED","THU","FRI","SAT"];

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

const Key="959c745180588f77a59a13e5043064ef"
    let city=document.getElementById("city").value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Key}&units=metric`)
    .then(response=>response.json())
    .then(data => {
        let date = new Date();
        let hour = date.getHours();
        let day = date.getUTCDay()
        list_today_count=8-Math.floor(hour/3);
        let nxt5days=[];
        let this_day={};
        const today= data=>{
            curr_temp= data.list[0].main.temp; 
            curr_wind_speed= data.list[0].wind.speed;
            curr_weather_description= data.list[0].weather[0].description; 
            min_temp=data.list.slice(0, list_today_count).map(item=>item.main.temp_min).reduce((min,temp)=>temp<min? temp: min, data.list.slice(0, list_today_count).map(item=>item.main.temp_min)[0]);
            max_temp=data.list.slice(0, list_today_count).map(item=>item.main.temp_max).reduce((max,temp)=>temp>max? temp: max, data.list.slice(0, list_today_count).map(item=>item.main.temp_max)[0]);
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
                    min_temp=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp_min).reduce((min,temp)=>temp<min? temp: min, data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp_min)[0]);
                    max_temp=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp_max).reduce((max,temp)=>temp>max? temp: max, data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp_max)[0]);
                    
                    // In the following Lines I'm checking the closest temp from a given day to the average one, so I can after that to get the 
                    //  wind speed and the weather description with respect to that specifec time in that day!

                    //I calculate the average temp..
                    average_temp=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp).reduce((a, b) => (a + b))/ 8 ;
                    
                    //according to the average temp I pop the right closest temp value to it.
                    closest_to_average=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp).reduce((prev, curr) => (Math.abs(curr - average_temp) < Math.abs(prev - average_temp) ? curr : prev));
                    
                    //just getting it's index
                    index_of_closest=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp).indexOf(closest_to_average);
                    
                    wind_speed=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1))[index_of_closest].wind.speed;
                    weather_description=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1))[index_of_closest].weather[0].description;
                    nxt5days[index]={
                        min_temp:min_temp,
                        max_temp:max_temp,
                        wind_speed:wind_speed,
                        weather_description:weather_description
                    }
                }
                min_temp=data.list.slice(list_today_count+32).map(item=>item.main.temp_min).reduce((min,temp)=>temp<min? temp: min, data.list.slice(list_today_count+32).map(item=>item.main.temp_min)[0]);
                max_temp=data.list.slice(list_today_count+32).map(item=>item.main.temp_max).reduce((max,temp)=>temp>max? temp: max, data.list.slice(list_today_count+32).map(item=>item.main.temp_max)[0]);
                average_temp=data.list.slice(list_today_count+32).map(item=>item.main.temp).reduce((a, b) => (a + b))/ 8 ;
                closest_to_average=data.list.slice(list_today_count+32).map(item=>item.main.temp).reduce((prev, curr) => (Math.abs(curr - average_temp) < Math.abs(prev - average_temp) ? curr : prev));
                index_of_closest=data.list.slice(list_today_count+32).map(item=>item.main.temp).indexOf(closest_to_average);
                wind_speed=data.list.slice(list_today_count+32)[index_of_closest].wind.speed;
                weather_description=data.list.slice(list_today_count+32)[index_of_closest].weather[0].description;
                nxt5days[4]={
                    min_temp:min_temp,
                    max_temp:max_temp,
                    wind_speed:wind_speed,
                    weather_description:weather_description
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

        console.log(this_day);
        console.log(nxt5days);
    })
    .catch(error => console.log(error));
});
