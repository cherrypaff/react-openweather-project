import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeTempMeasure, deleteCityCard } from '../../store/reducers/weatherReducer'
import Chart from "chart.js"
import { useTranslation } from "react-i18next"
import {
  CityCardContainer,
  CardRowContainer,
  CardColumnContainer,
  Date,
  Location,
  Stats,
  GraphCanvas,
  FeelsLike,
  ColorfulStats,
  GroupContainer,
  WeatherDescription,
  CloseContainer
} from "./wrappers"
import { Icons } from './Icons'
import { Temperature } from './Temperature'
import { CityWeatherType } from "../../store/reducers/weatherReducer"
import { namespaces } from "../../i18n/constants"
import { mainTheme } from "../../theme"
import dayjs from "dayjs"

const renderGraph = (id: number, hotColor: boolean, data?: CityWeatherType) => {
  if (data) {
    const dates: string[] = data.graphData.map((el) => el.date)
    const temperatures: number[] = data.graphData.map((el) =>
        data.metaData.isFahrenheit ? el.fahrenheit : el.celsius
    )
    const maxTemp = Math.max.apply(
        null,
        temperatures
    )
    const minTemp = Math.min.apply(
        null,
        temperatures
    )
    const numbersOffset = hotColor ? -20 : 35
    // @ts-ignore
    const canvas: HTMLCanvasElement | null = document.getElementById(`${id}-graph-container`)
    const ctx = canvas!.getContext('2d')
    const  gradientFill = ctx!.createLinearGradient(0, 375, 0, 0);
    if (hotColor) {
      gradientFill.addColorStop(0, mainTheme.neutralGradient);
      gradientFill.addColorStop(1, mainTheme.hotGradient);
    } else {
      gradientFill.addColorStop(1, mainTheme.neutralGradient);
      gradientFill.addColorStop(0, mainTheme.coldGradient);
    }
    new (Chart as any)(document.getElementById(`${id}-graph-container`) as
        HTMLCanvasElement, {
      type: "line",
      data: {
        labels: dates,
        datasets: [{
          data: temperatures,
          borderWidth: 0,
          fill: true,
          backgroundColor: gradientFill,
        }]
      },
      options: {
        elements: {
          point: {
            radius: 0
          }
        },
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        animation: {
          duration: 1,
          onComplete: function () {
            // @ts-ignore
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
            // @ts-ignore
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            // @ts-ignore
            this.data.datasets.forEach(function (dataset, i) {
              let meta = chartInstance.controller.getDatasetMeta(i);
              // @ts-ignore
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y + numbersOffset);
              });
            });
          }
        },
        scales: {
          yAxes: [{
            gridLines: {
              display : false
            },
            ticks: {
              display: false,
              max: maxTemp + 10,
              min: minTemp - 10,
            },
          }],
          xAxes: [{
            gridLines: {
              display : false
            },
            ticks: {
              fontSize: 18,
              fontFamily: 'Poppins',
              fontColor: mainTheme.grayColor,
              lineHeight: '26px',
            },
          }]
        }
      }
    })
  }
}

export const CityWeatherCard = ({ city, index }: {city: CityWeatherType; index: number}) => {
  const { t } = useTranslation(namespaces.pages.home);
  const dispatch = useDispatch()
  const todayDate = dayjs(city.metaData.todayDate).utc().format('ddd, D MMMM, HH:MM')

  const onChangeTempMeasure = () => {
    if(city.metaData.isMine) {
      localStorage.setItem('myLocationMeasureUnit', JSON.stringify(!city.metaData.isFahrenheit))
    }
    dispatch(changeTempMeasure({id: city.metaData.cityID, index: index, isMine: city.metaData.isMine}))
  }

  const onCloseClick = () => {
    dispatch(deleteCityCard({ index }))
  }

  useEffect(() => {
    renderGraph(city.metaData.cityID, city.metaData.isPositive, city)
  }, [city.metaData.isFahrenheit])

  return (
      <CityCardContainer positiveTemp={city.metaData.isPositive}>
        <CloseContainer onClick={onCloseClick}>
          <Icons size={{height: '24px', width: '24px'}} fill={mainTheme.grayColor} name={'close'} />
        </CloseContainer>
        <CardRowContainer topRow>
          <CardColumnContainer>
            <Location>{city.metaData.location}</Location>
            <Date>{todayDate}</Date>
          </CardColumnContainer>
          <GroupContainer>
            <img src={`http://openweathermap.org/img/wn/${city.metaData.icon}@2x.png`} width="50px" height="50px" alt="" />
            <WeatherDescription>{city.metaData.weatherDescription}</WeatherDescription>
          </GroupContainer>
        </CardRowContainer>
        <GraphCanvas id={`${city.metaData.cityID}-graph-container`}>
          Ваш браузер не поддерживает графики
        </GraphCanvas>
        <CardRowContainer>
          <CardColumnContainer>
            <Temperature isFahrenheit={city.metaData.isFahrenheit} value={{ celsius: city.metaData.temperatureCelsius, fahrenheit: city.metaData.temperatureFahrenheit }} changeTempMeasure={onChangeTempMeasure} />
            <FeelsLike>
              {t("feels", { ns: namespaces.cityCard })}: {city.metaData.isPositive ? '+' : ''} { city.metaData.isFahrenheit ? city.metaData.temperatureFeelsLikeFahrenheit : city.metaData.temperatureFeelsLikeCelsius}
              <Icons size={{height: '15px', width: '15px'}} fill={mainTheme.grayColor} name={city.metaData.isFahrenheit ? 'fahrenheit' : 'celsius'} />
            </FeelsLike>
          </CardColumnContainer>
          <CardColumnContainer>
            <Stats>
              {t("wind", { ns: namespaces.cityCard })}: <ColorfulStats positiveTemp={city.metaData.isPositive}>{city.metaData.windSpeed} {t("measure", { ns: namespaces.cityCard })}</ColorfulStats>
            </Stats>
            <Stats>
              {t("humidity", { ns: namespaces.cityCard })}: <ColorfulStats positiveTemp={city.metaData.isPositive}>{city.metaData.humidity}%</ColorfulStats>
            </Stats>
            <Stats>
              {t("pressure", { ns: namespaces.cityCard })}: <ColorfulStats positiveTemp={city.metaData.isPositive}>{city.metaData.pressure}Pa</ColorfulStats>
            </Stats>
          </CardColumnContainer>
        </CardRowContainer>
      </CityCardContainer>
  );
};