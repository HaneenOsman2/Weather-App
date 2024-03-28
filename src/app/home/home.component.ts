import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myWeather: any;
  summary!: string;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  windSpeed: any;

  iconUrl!: string;

  cityForm!: FormGroup;
  initialForm: boolean=false ;
  cityName!: any



  constructor(private formBuilder: FormBuilder, private weatherSerivce: WeatherService) { }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm() {
    this.cityForm = this.formBuilder.group({
      'city': [null, Validators.required]
    });    
  }

  onSubmit() {
    this.initialForm=true
    this.weatherSerivce.getWeather(this.cityForm.value).subscribe({
      next: (res) => {
        console.log(res);
        
        this.myWeather = res;
        this.cityName = this.myWeather.name;
        // console.log(this.cityName);
        // console.log(this.myWeather);
        this.summary = this.myWeather.weather[0].main;
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity
        this.windSpeed = this.myWeather.wind.speed;
        // console.log(this.summary);


        this.iconUrl = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png'

      },

      error: (error) => console.log(error.message),

      complete: () => console.log('Donee:)')
    })


  }
}
