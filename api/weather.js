export default async function handler(req, res) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const { lat, lon } = req.query;

    if (!apiKey) {
      return res.status(500).json({ error: "API key missing" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
