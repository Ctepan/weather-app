const API_KEY = 'b6a21416b06ca6f193e4a8a25d7cef6a'

export class Weather {
  static async get(city, { lang }) {
    const selectedLang = lang ?? 'ru'
    const query = `q=${city}&lang=${selectedLang}&units=metric&appid=${API_KEY}`
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?${query}`).then(x => x.json())

    if (res.cod === '404') {
      return 'not_found'
    }

    return res
  }
}
