window.addEventListener('load', () => {
  let longitude;
  let latitude;

  let temperatureDegree = document.querySelector('.current-degree') ;
  let temperatureUnit = document.querySelector('.current-unit') ;
  let temperatureDescription = document.querySelector('.current-info') ;
  let location = document.querySelector('.location h1') ;
  let weatherIcon = document.getElementById('weather-icon') ;
  let temperatureSection  = document.querySelector('.degree-section') ;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((currentLocation) => {
      console.log(currentLocation);
      longitude = currentLocation.coords.longitude;
      latitude = currentLocation.coords.latitude;
      const apiKey = `b493a61018ca9aea56d3012fe115b073`;
      const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}` ;

      
      fetch(weatherAPI).then(apiResponse =>{
        return apiResponse.json();
      }).then(responseData =>{
        //console.log(responseData) ;
        const {temp} = responseData.main ;
        const{description , icon} = responseData["weather"][0] ;
        const country = responseData.sys.country ;

        
        //Set DOM Elements from API
        temperatureDegree.textContent = temp ;
        location.textContent = `${responseData.name},${country}` ;
        temperatureDescription.textContent = description.toUpperCase() ;
        weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png` ;
        //console.log(description) ;

        //F - C 
        temperatureSection.addEventListener('click' , ()=>{
          if(temperatureUnit.textContent === 'F'){
            temperatureUnit.textContent = 'C' ;
            temperatureDegree.textContent = Math.round(temp - 273.15) ;
          }else{
            temperatureUnit.textContent = 'F' ;
            temperatureDegree.textContent = temp ;
          }
        })
      });
    });
  }
});

