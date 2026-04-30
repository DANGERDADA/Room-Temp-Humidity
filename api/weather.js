export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    // 🌤 WEATHER
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const weatherData = await weatherRes.json();

    // 🌫 AQI
    const aqiRes = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const aqiData = await aqiRes.json();

    // 🔥 COMBINED RESPONSE
    res.status(200).json({
      weather: weatherData,
      aqi: aqiData
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
