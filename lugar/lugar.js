const axios = require('axios');

const getLugarLatLng = async(dir) => {

    const encodedUrl = encodeURI(dir);

    const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodedUrl }.json`,
        params: { 'access_token': 'pk.eyJ1IjoieWFsdGFtaXJhbm9hIiwiYSI6ImNrZmQ2NnB3ejAzZ3AyeW1xeHE1ejc5cWMifQ.179Yy6B7zkJ5eojBcyf77g' }
    });

    const resp = await instance.get();

    if (resp.data.features.length === 0) {
        throw new Error(`No hay resultado para ${ dir }`);
    }

    const data = resp.data.features[0];
    const direccion = data.place_name;
    const lat = data.geometry.coordinates[1];
    const lng = data.geometry.coordinates[0];

    return {
        direccion,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}