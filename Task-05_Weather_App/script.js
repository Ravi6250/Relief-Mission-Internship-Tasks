// =========================================================
// 1. Configuration
// =========================================================

// Yahan apni Generated API Key dalein
const apiKey = "8500cc83e91cfd8efc5680f2e11aa78f";


// Base URL for OpenWeatherMap
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM Elements select karna
const searchBox = document.getElementById("cityInput");
const searchBtn = document.querySelector("button");
const weatherResult = document.getElementById("weatherResult");

// =========================================================
// 2. Main Function to Fetch Weather
// =========================================================
async function checkWeather(city) {
    
    // Agar input khali hai
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        // API Call
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // --- Error Handling ---
        
        // Agar API Key galat hai (401)
        if (response.status == 401) {
            weatherResult.innerHTML = `
                <div class="error">
                    Error 401: Invalid API Key.<br>
                    <small>Please check your code or wait for activation.</small>
                </div>`;
            return;
        }

        // Agar City nahi mili (404)
        if (response.status == 404) {
            weatherResult.innerHTML = `
                <div class="error">
                    Invalid City Name!<br>
                    <small>Please check the spelling.</small>
                </div>`;
            return;
        }

        // --- Success: Data Processing ---
        
        var data = await response.json();
        console.log(data); // Console mein data check kar sakte hain

        // HTML Generate karna (CSS ke new design ke hisab se)
        weatherResult.innerHTML = `
            <div class="fadeIn">
                <!-- City Name & Country -->
                <h2>${data.name}, ${data.sys.country}</h2>
                
                <!-- Main Temperature -->
                <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
                
                <!-- Weather Description -->
                <p class="desc">${data.weather[0].description}</p>
                
                <!-- Details Grid (Humidity & Wind) -->
                <div class="details">
                    <!-- Humidity Box -->
                    <div class="col">
                        <i class="fas fa-water fa-2x" style="margin-right: 10px;"></i>
                        <div class="info">
                            <p>${data.main.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>

                    <!-- Wind Speed Box -->
                    <div class="col">
                        <i class="fas fa-wind fa-2x" style="margin-right: 10px;"></i>
                        <div class="info">
                            <p>${data.main.speed} km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Input box khali kar dein (Optional)
        // searchBox.value = ""; 

    } catch (error) {
        console.error("Error:", error);
        weatherResult.innerHTML = `<div class="error">Something went wrong. Check connection.</div>`;
    }
}

// =========================================================
// 3. Event Listeners (Button & Enter Key)
// =========================================================

// Search Button Click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// "Enter" Key Press inside Input Box
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});