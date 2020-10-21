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


    


const Key="959c745180588f77a59a13e5043064ef"
document.querySelector("form").addEventListener("submit", event=>{
    event.preventDefault();
    let city=document.getElementById('city').value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Key}&units=metric`)
    .then(response=>response.json())
    .then(data => {
        let date = new Date();
        let hour = date.getHours();
        list_today_count=8-Math.floor(hour/3);
        let nxt5days=[];
        let this_day={};
        const today= data=>{
            curr_temp= data.list[0].main.temp; 
            curr_weather_type= data.list[0].weather[0].main; 
            curr_weather_description= data.list[0].weather[0].description; 
            min_temp=data.list.slice(0, list_today_count).map(item=>item.main.temp_min).reduce((min,temp)=>temp<min? temp: min, data.list.slice(0, list_today_count).map(item=>item.main.temp_min)[0]);
            max_temp=data.list.slice(0, list_today_count).map(item=>item.main.temp_max).reduce((max,temp)=>temp>max? temp: max, data.list.slice(0, list_today_count).map(item=>item.main.temp_max)[0]);
            this_day={
                curr_temp:curr_temp,
                curr_weather_type:curr_weather_type,
                curr_weather_description:curr_weather_description,
                min_temp:min_temp,
                max_temp:max_temp
            }
        }
        const other_days= data=>{
            for(let index=0;index<4;index++){
                    min_temp=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp_min).reduce((min,temp)=>temp<min? temp: min, data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp_min));
                    max_temp=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp_max).reduce((max,temp)=>temp>max? temp: max, data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp_max));
                    average_temp=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp).reduce((a, b) => (a + b)) / data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp).length;
                    closest_to_average=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp).reduce((prev, curr) =>(Math.abs(curr - average_temp) < Math.abs(prev - average_temp) ? curr : prev));
                    index_of_closest=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1)).map(item=>item.main.temp).indexOf(closest_to_average);
                    weather_type=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1))[index_of_closest].weather.main;
                    weather_description=data.list.slice(list_today_count+8*index, list_today_count+8*(index+1))[index_of_closest].weather.description;
                    nxt5days[index]={
                        min_temp:min_temp,
                        max_temp:max_temp,
                        weather_type:weather_type,
                        weather_description:weather_description
                    }
                }
                min_temp=data.list.slice(list_today_count+32).map(item=>item.main.temp_min).reduce((min,temp)=>temp<min? temp: min, data.list.slice(list_today_count+32).map(item=>item.main.temp_min));
                max_temp=data.list.slice(list_today_count+32).map(item=>item.main.temp_min).reduce((max,temp)=>temp>max? temp: max, data.list.slice(list_today_count+32).map(item=>item.main.temp_min));
                average_temp=data.list.slice(list_today_count+32).map(item=>item.main.temp).reduce((a, b) => (a + b)) / data.list.slice(list_today_count+   32).map(item=>item.main.temp).length;
                closest_to_average=data.list.slice(list_today_count+32).map(item=>item.main.temp).reduce((prev, curr) =>(Math.abs(curr - average_temp) < Math.abs(prev - average_temp) ? curr : prev));
                index_of_closest=data.list.slice(list_today_count+32).map(item=>item.main.temp).indexOf(closest_to_average);
                weather_type=data.list.slice(list_today_count+32)[index_of_closest].weather.main;
                weather_description=data.list.slice(list_today_count+32)[index_of_closest].weather.description;
                nxt5days[4]={
                    min_temp:min_temp,
                    max_temp:max_temp,
                    weather_type:weather_type,
                    weather_description:weather_description
                }
            }
        today(data);
        other_days(data);
        console.log(this_day);
        console.log(nxt5days);
    })
    .catch(error => console.log(error));
});
