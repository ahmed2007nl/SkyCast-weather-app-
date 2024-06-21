const weatherElement = document.getElementById("weather");
  const cityInput = document.getElementById("city");
  const Search = document.getElementById("Search");
  const Additional = document.getElementsByClassName("addit-data")
  console.log(Additional)

  // Function to handle the weather request
  const getWeather = () => {
    const city = cityInput.value;



    
    // Fetch weather data (use HTTPS)
    fetch(`https://api.weatherapi.com/v1/current.json?key=db8280d040f3400b93d173219230708&q=${city}&aqi=no`)
    .then((response) => { 
      if (!response.ok) {
        // Display an alert with a custom message for an invalid city name
        alert("The city name you entered is invalid");
        throw new Error('Invalid city name'); // throw an error to stop the chain
      }
      return response.json(); // return the parsed JSON data
    })
      .then((weatherData) => {
        console.log(weatherData)
        const temperature = weatherData.current.temp_c;
        const condition = weatherData.current.condition.text;
        const lowercaseCondition = condition.toLowerCase();
        const locationICon = document.createElement("img");
        locationICon.src = "../weather/images and icons/icons8-location-50.png";
        const LT = weatherData.location.localtime
    

        const IsDay = weatherData.current.is_day // 0 or 1 0 -->  night ; 1 --> Day
        let Cond_img = document.createElement("img");
        Cond_img.style.display = "block";
        Cond_img.style.margin = "0 auto";
        Cond_img.style.width = "96px"
        Cond_img.style.height = "96px"

        // Set the background color and image source
        if (lowercaseCondition.includes("sunny")) {
          weatherElement.style.backgroundColor = "#CF6B6B";
          Cond_img.src = "../weather/images and icons/icons8-sun-96.png";
        } else if (lowercaseCondition.includes("cloudy")) {
          weatherElement.style.backgroundColor = "#A0A0A0";
          Cond_img.src = "../weather/images and icons/colors-brain-shaped-cloud.png";
          Cond_img.style.filter = "grayscale(100%) brightness(200%)";
          Cond_img.style.width = "100px";
        } else if (lowercaseCondition.includes("rain")) {
          weatherElement.style.backgroundColor = "#6B7BCF";
          Cond_img.src = "../weather/images and icons/icons8-heavy-rain-96.png";
        } else if (lowercaseCondition.includes("clear")) {

          weatherElement.style.backgroundColor = "#6BB7CF";
          if(IsDay == 1){
            Cond_img.src = "../weather/images and icons/icons8-sun-96.png";
          }else{
            Cond_img.src = "../weather/images and icons/icons8-night-40.png"
          }
        } else if (lowercaseCondition.includes("fog") || lowercaseCondition.includes("mist") ||lowercaseCondition.includes("overcast") ) {
          weatherElement.style.backgroundColor = "#A0A0A0";
          Cond_img.src = "../weather/images and icons/icons8-foggy-64.png";
          
        } else if(lowercaseCondition.includes("snow")){
          weatherElement.style.background =" hsl(210, 48%, 81%)";
          Cond_img.src = "../weather/images and icons/icons8-snowy-96.png"
        }
        else if (lowercaseCondition.includes("storm")){
          weatherElement.style.background = " hsl(30, 48%, 81%);"
          Cond_img.src = "../weather/images and icons/icons8-storm-96.png"
        }
        else {
          weatherElement.style.backgroundColor = "var(--primary-color)"; // Default case, or set to a default color
        }

        // Display weather information 
        weatherElement.innerHTML = `
          <div class="Data">
             <div class = "city-icon">
             <h3>${city}</h3>
             </div>
            <h3>${temperature}°C</h3>
           
            </div>
            <p style = "TEXT-ALIGN: center;" >${condition}</p>
            <h3 id = "LocalTime">${LT}</h3>
            <h4 id = "dayORnight" >${IsDay == 1 ? "Day Time" : "Night" }</h4>
        `;

        // const Humidity = weatherData.current.humidity
        // const visibility = weatherData.current.vis_km
        // const WindSPeed = weatherData.current.wind_kph;
        // const UV = weatherData.current.uv

        const arrOFAdd = [
          { label: 'Humidity', value: weatherData.current.humidity , img_src :"../weather/images and icons/icons8-humidity-40.png"  },
          { label: 'Visibility', value: weatherData.current.vis_km , img_src:"../weather/images and icons/icons8-visibility-48.png"},
          { label: 'Wind Speed', value: weatherData.current.wind_kph , img_src:"../weather/images and icons/icons8-wind-94.png"},
          { label: 'UV Index', value: weatherData.current.uv , img_src:"../weather/images and icons/icons8-uv-index-64.png"}
        ];
        
        const divElements = arrOFAdd.map((data) => {
          var B_color = ""; // Declare B_color variable
          var addClass = ""; // Declare addClass variable
          
          if (data.label === "Humidity" && data.value >= 90) {
              B_color = "red";
              addClass = "dangerous";
          } else if (data.label === "Humidity" && data.value >= 70 && data.value < 90) {
              B_color = "orange";
              addClass = "medium";
          } else if (data.label === "Humidity" && data.value < 70) {
              B_color = "#6CCECE";
              addClass = "normal";
          } else if (data.label === "UV Index" && data.value >= 8) {
              B_color = "red";
              addClass = "dangerous";
          } else if (data.label === "UV Index" && data.value >= 5 && data.value < 8) {
              B_color = "orange";
              addClass = "medium";
          } else if (data.label === "UV Index" && data.value < 5) {
              B_color = "#6CCECE";
              addClass = "normal";
          } else if (data.label === "Wind Speed" && data.value >= 40) {
              B_color = "red";
              addClass = "dangerous";
          } else if (data.label === "Wind Speed" && data.value >= 20 && data.value < 40) {
              B_color = "orange";
              addClass = "medium";
          } else if (data.label === "Wind Speed" && data.value < 20) {
              B_color = "#6CCECE";
              addClass = "normal";
          }
          else if (data.label === "Visibility" && data.value < 5) {
            B_color = "red";
            addClass = "dangerous";
        } else if (data.label === "Visibility" && data.value >= 5 && data.value < 10) {
            B_color = "orange";
            addClass = "medium";
        } else if (data.label === "Visibility" && data.value >= 10) {
            B_color = "#6CCECE";
            addClass = "normal";
        }

          const newDiv = document.createElement("div");
          newDiv.style.display = "flex";
          newDiv.style.alignItems = "center";
          newDiv.style.justifyContent = "center";
          newDiv.style.flexDirection = "column"

             if (B_color) {
              newDiv.style.border = `1px solid ${B_color}`
              newDiv.style.color = `${B_color}`
        }
        
             if (addClass) {
            newDiv.classList.add(addClass);
        }

         


          if(data.label == "Humidity"){
            data.value = `${data.value}%`
          }else if (data.label == "Wind Speed"){
            data.value  = `${data.value}kmph`
          }
          else if (data.label == "Visibility"){
            data.value  = `${data.value}Vis/km`
          }else if (data.value == "UV Index"){
            data.value = `${data.value}/10`
          }

          newDiv.innerHTML = 
          `<img src = "${data.img_src}" width = "40px">
            <strong>${data.label}:</strong> ${data.value}
          `;
          return newDiv;
        });

     if (Additional.length > 0) {
      Additional[0].innerHTML = ''; // Clear previous content if needed
    
    }
    // Append each div to the container
    divElements.forEach((div) => {
      Additional[0].appendChild(div);
    });

        // Append the elements to the weather container
        document.querySelector(".Data").appendChild(Cond_img);
        document.querySelector(".city-icon").prepend(locationICon);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  // Event listener for the button click
  Search.addEventListener("click", getWeather);

  // Event listener for the Enter key press
  cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      getWeather();
    }
  });