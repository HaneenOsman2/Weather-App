import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(data:any) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+data.city+'&appid=81ea60f2464225b8b3a3a2a194828ef9&units=imperial')
  }
}
