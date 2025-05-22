const express = require("express")
const extractEstimatedDays = require("../Utils/GetAnswer");
const router = express.Router()

module.exports = () => {
    router.post('/', async (req, res, next) => {
        // try {
        //     //Get Longitute and Latitude
        //     const { projectType, city, state, area, workers, time } = req.body
        //     const geoapifyUrl = ` https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(`${city}, ${state}`)}&apiKey=39f712583a7b4f3e96e6a28ed0f66e29`
        //     const response = await fetch(geoapifyUrl)
        //     if (!response.ok) throw new Error("Not Working")
        //     const data = await response.json()
        //     let finalWeather
        //     let finalFire
        //     let finalEarthquake
        //     let finalAir
        //     const lat = data.features[0].properties.lat;
        //     const lon = data.features[0].properties.lon;
        //     console.log(lat, lon)
        //     //Get the Actual Data
        //     //Get Temp, Humidity, Wind Speed
        //     const weatherUrl = `https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${lat}&lng=${lon}`
        //     const weatherResponse = await fetch(weatherUrl, { method: "GET", headers: { "x-api-key": API_KEY, "Content-type": "application/json" } })
        //     if (!weatherResponse.ok) throw new Error("Failed to fetch location data")
        //     const weatherData = await weatherResponse.json()
        //     if (weatherData && weatherData.data) {
        //         const { temperature, humidity, windSpeed } = weatherData.data
        //         finalWeather = { temperature, humidity, windSpeed }
        //         // res.json(finalWeather)
        //     }
        //     //Get Fire Data
        //     const fireUrl = `https://api.ambeedata.com/fire/latest/by-lat-lng?lat=${lat}&lng=${lon}`
        //     const fireResponse = await fetch(fireUrl, { method: "GET", headers: { "x-api-key": API_KEY, "Content-type": "application/json" } })
        //     if (!fireResponse.ok) throw new Error("Failed to fetch location data")
        //     const fireData = await fireResponse.json()
        //     if (fireData && fireData.data) {
        //         finalFire = fireData.data.map(fire => {
        //             const { lat, lng, detectedAt, frp, areaBurnt } = fire
        //             return { lat, lng, detectedAt, frp, areaBurnt }
        //         })
        //         // res.json(finalFire)
        //     }
        //     //Get Earthquake Data
        //     const earthquakeUrl = `https://api.ambeedata.com/disasters/latest/by-lat-lng?lat=${lat}&lng=${lon}`
        //     // const earthquakeUrl = `https://api.ambeedata.com/disasters/latest/by-lat-lng?lat=29.2726&lng=88.8821`
        //     const earthquakeResponse = await fetch(earthquakeUrl, { method: "GET", headers: { "x-api-key": API_KEY, "Content-type": "application/json" } })
        //     if (!earthquakeResponse.ok) throw new Error("Failed to fetch location data")
        //     const earthquakeData = await earthquakeResponse.json()
        //     if (earthquakeData.result) {
        //         finalEarthquake = earthquakeData.result.map(earthquake => {
        //             const { lat, lng, created_time } = earthquake
        //             return { lat, lng, created_time }
        //         })
        //         // res.json(finalEarthquake)
        //     }
        //     //Get Air Data
        //     const airUrl = ` https://api.ambeedata.com/latest/by-lat-lng?lat=${lat}&lng=${lon}`
        //     const airResponse = await fetch(airUrl, { method: "GET", headers: { "x-api-key": API_KEY, "Content-type": "application/json" } })
        //     if (!airResponse.ok) throw new Error("Failed to fetch location data")
        //     const airData = await airResponse.json()
        //     if (airData.stations) {
        //         const { CO, NO2, OZONE, PM10, PM25 } = airData.stations[0]
        //         finalAir = { CO, NO2, OZONE, PM10, PM25 }
        //         // res.json(finalAir)
        //     }
        //     // const prompt = `Calculate ${area}/(${workers}*${time}*(1+${finalWeather.temperature}*${finalWeather.humidity}*${finalWeather.windSpeed}/100)`
        //     const prompt = area / workers * time * (1 + finalWeather.temperature * finalWeather.humidity * finalWeather.windSpeed / 100)
        //     // const result = await model.generateContent(prompt);
        //     // res.json(result.response.text());
        //     let complexityFactor = 1.2
        //     // Calculate daily work output
        //     let dailyWorkOutput = workers * time
        //     let weatherFactor = 1
        //     if (finalWeather.temperature > 90) weatherFactor += 0.1
        //     if (finalWeather.humidity > 80) weatherFactor += 0.1 
        //     if (finalWeather.windSpeed > 20) weatherFactor += 0.05
        //     let safetyFactor = 1
        //     if (finalFire.length > 0) {
        //         finalFire.forEach(fire => {
        //             if (fire.frp > 2.0) safetyFactor += 0.1
        //         })
        //     }
        //     if (finalEarthquake && finalEarthquake.length > 0) {
        //         safetyFactor += 0.2 * finalEarthquake.length 
        //     }
        //     if (finalAir.CO > 0.3 || finalAir.PM25 > 35) {
        //         safetyFactor += 0.1
        //     }
        //     let estimatedDays = (area * complexityFactor) / (dailyWorkOutput * weatherFactor * safetyFactor)
        //     if (estimatedDays < 1) estimatedDays = 1
        //     res.json({finalAir, finalEarthquake, finalFire, finalWeather, estimatedDays})
        // } 

        try {
            const { projectType, city, state, area, workers, time } = req.body
            let temp = 24, rain = 100
            const geoapifyUrl = ` https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(`${city}, ${state}`)}&apiKey=39f712583a7b4f3e96e6a28ed0f66e29`
            const response = await fetch(geoapifyUrl)
            if (!response.ok) throw new Error("Failed to fetch data")
            const data = await response.json()
            const lat = data.features[0].properties.lat
            const lon = data.features[0].properties.lon
            console.log({ lat, lon })

            //Using OLlama
            const prompt = `You are a construction time estimator. Based on the following parameters, estimate the number of days required to complete the project. Assume standard working efficency and don't give big explantions. Keep explanations brief, short and concise. Address: ${city}, ${state}, India. Project Type: ${projectType}. Construction Area : ${area} sq ft. No. of Workers: ${workers}. Working Hours per day: ${time}. Weather: ${temp} celcius. Rainfall: ${rain}mm/month. Please estimate the total number of days to complete the construction, considering weather, labor, and design  complexity. Give me the final answer as a number`
            const llamaRes = await fetch('http://127.0.0.1:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama3.1',
                    prompt: prompt,
                    stream: true
                })
            });
            //Stream Response in Terminal
            const decoder = new TextDecoder();
            let fullResponse = "";

            try {
                for await (const chunk of llamaRes.body) {
                    const text = decoder.decode(chunk, { stream: true });

                    text.split('\n').forEach(line => {
                        try {
                            if (line.trim()) {
                                const json = JSON.parse(line);
                                if (json.response) {
                                    process.stdout.write(json.response);
                                    fullResponse += json.response
                                }
                            }
                        } catch (err) {
                            console.error("JSON parse error:", err.message);
                        }
                    });
                }
                const estimatedTime = extractEstimatedDays(fullResponse);
                console.log("Estimated Time:", estimatedTime);
                return res.json({ estimatedTime })
            } catch (err) {
                console.error('Streaming error:', err.message);
            }
        } catch (error) {
            console.error("Error:", error)
            res.status(500).json({ error: "Server error" })
        }
    })
    return router
}