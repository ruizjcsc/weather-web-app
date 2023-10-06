import { weatherKey, geoLocationKey } from "./keys";

export const geoUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const geoApiOptions = {
	method: 'GET',
	headers: {
        // dont forget to hide the api key in different file before making repo
		'X-RapidAPI-Key': geoLocationKey,
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};


export const weatherUrl = 'https://api.openweathermap.org/data/2.5';
// have to hide this api key too
export const weatherApiKey = weatherKey;
