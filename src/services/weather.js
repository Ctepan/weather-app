const API_KEY = 'b6a21416b06ca6f193e4a8a25d7cef6a'

export class Weather {
  static async get(city) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`).then(x => x.json())

    if (res.cod === '404') {
      return null
    }

    return res
  }
}
