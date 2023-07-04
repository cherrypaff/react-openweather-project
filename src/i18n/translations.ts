import { namespaces } from "./constants";

export const ru = {
    [namespaces.pages.home]: {
        button: 'ДОБАВИТЬ',
        placeholder: 'Искать'
    },
    [namespaces.cityCard]: {
        feels: 'Чувствуется как',
        wind: 'Ветер',
        measure: 'м/с',
        humidity: 'Влажность',
        pressure: 'Давление'
    },
    [namespaces.fetchError]: {
        message: 'Данные по городу уже загружены',
        location: 'Ваше местоположение'
    },
};

export const ua = {
    [namespaces.pages.home]: {
        button: 'ДОДАТИ',
        placeholder: 'Шукати'
    },
    [namespaces.cityCard]: {
        feels: 'Відчуває, як',
        wind: 'Вітер',
        measure: 'м/с',
        humidity: 'Вологість',
        pressure: 'Тиск'
    },
    [namespaces.fetchError]: {
        message: 'Дані по місту вже завантажено',
        location: 'Ваше місцезнаходження'
    },
};

export const en = {
    [namespaces.pages.home]: {
        button: 'ADD',
        placeholder: 'Search'
    },
    [namespaces.cityCard]: {
        feels: 'Feels like',
        wind: 'Wind',
        measure: 'm/s',
        humidity: 'Humidity',
        pressure: 'Pressure'
    },
    [namespaces.fetchError]: {
        message: 'City already fetched',
        location: 'Your Location'
    },
};