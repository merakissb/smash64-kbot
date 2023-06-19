const axios = require('axios');

async function geolocationService() {
  try {
    const response = await axios.get('http://ip-api.com/json/');
    const data = response.data;
    const location = `${data.country} - ${data.city}`;
    return location;
  } catch (error) {
    console.error('Error fetching client location:', error);
    return 'Unknown Location';
  }
}

module.exports = { geolocationService };
