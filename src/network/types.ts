export type ISOdate = string

export type CityWeatherStatsType = {
  dt: number;
  dt_txt: ISOdate;
  pop: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number
  };
  sys: {
    pod: string
  };
}

export type CityWeatherAPIType = {
  list: CityWeatherStatsType[]
  city: {
    id: number
    name: string
    country: string
    sunrise: number
    sunset: number
    timezone: number
  };
}
