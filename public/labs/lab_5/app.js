function mapInit() {
    // follow the Leaflet Getting Started tutorial here
    const mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);
    return map;
  }

  async function dataHandler(mapObjectFromFunction){
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
    const restaurants = [];
    
    const request = await fetch(endpoint)
    const results = await request.json();

    searchForm.addEventListener('submit', async(event)=>{
        event.preventDefault();

    
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}