import fs from 'fs';

import axios from 'axios'

export default class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {
        // Capitalizar cada palabra
        return this.historial.map( lugar => {
            
            const place = lugar.split( ' ' )
                            .map( palabra => palabra[0].toUpperCase() + palabra.substring(1) )
                            .join(' ');
            return place;
        });
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad( lugar = '' ) {
        
        try {
            // Petición http
            const instace = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });
    
            const resp = await instace.get();
            return resp.data.features.map( place => ({
                id: place.id,
                nombre: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));

        } catch ( error ) {
            return [];
        }
    }

    async climaLugar( lat, lon ) {
        try {
            // Petición HTTP
            const instace = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { lat, lon, ...this.paramsOpenWeather }
            });

            const resp = await instace.get();

            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp: resp.data.main.temp
            }
        } catch ( error ) {
            console.log( error );
        }
    }

    agregarHistorial( lugar = '' ) {

        if( this.historial.includes( lugar.toLowerCase() ) ) {
            return;
        }
        
        this.historial = this.historial.splice(0, 5);

        this.historial.unshift( lugar.toLowerCase() );

        // Grabar en DB
        this.guardarDB();
    }

    guardarDB() {
        
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );

    }

    leerDB() {

        if( !fs.existsSync( this.dbPath ) ) return;
        
        const data =JSON.parse( fs.readFileSync( this.dbPath, { encoding: 'utf-8' } ) );
        this.historial = data.historial;

    }
}