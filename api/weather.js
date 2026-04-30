export default async function handler(req, res) {
  const { lat, lon } = req.query;

  const WEATHER_KEY = process.env.OPENWEATHER_API_KEY;
  const WAQI_KEY = process.env.WAQI_API_KEY;

  try {
    // 🌤 WEATHER
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
    );
    const weatherData = await weatherRes.json();

    // 🌫 WAQI AQI (INDIAN ACCURATE)
    const aqiRes = await fetch(
      `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${WAQI_KEY}`
    );
    const aqiData = await aqiRes.json();

    res.status(200).json({
      weather: weatherData,
      aqi: aqiData
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
