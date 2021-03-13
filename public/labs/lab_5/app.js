function mapInit() {
  const mymap = L.map('mapid').setView([38.7849, -76.8721], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXJ1aXo5OSIsImEiOiJja201M2dyNGgwYW5hMnVvNXFnNWh3c3RqIn0.tt500DzwIpYLLCs1gsWrrQ'
  }).addTo(mymap);

  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  const form = document.querySelector('.userform');
  const search = document.querySelector('#zip');
  const submit = document.querySelector('#submit');
  const suggestions = document.querySelector('.suggestions');

  const request = await fetch('/api');
  const data = await request.json();

  function panning(arr) {
    const test = [arr.geocoded_column_1.coordinates[1], arr.geocoded_column_1.coordinates[0]];
    return test;
  }

  function markers(param) {
    const geocode = param;
    const coords = geocode['coordinates'];
    const newCoords = [coords[1], coords[0]];
    const marker = L.marker(newCoords);
    return marker;
  }

  function findMatches(wordToMatch, data) {
    return data.filter( (place) => {
      // here we need to figure out if the zipcode 		
      // MATCHES what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      //'g' means global, 'i' means case insensitive
      return place.zip.match(regex);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    let matchArray = findMatches(search.value, data);
    const first = matchArray[0];
    if (matchArray.length >= 5) {
      const newArray = matchArray.filter( (record) => record.geocoded_column_1).slice(0,5);
      matchArray = newArray;
    } else {
      const newArray2 = matchArray.filter( (record) => record.geocoded_column_1);
      matchArray = newArray2;
    }

    if (search.value.length > 0) {
      const html = matchArray.map( (place) => {
        const regex = new RegExp(search.value, 'gi');
        const zipCode = place.zip.replace(regex, '<span class="hl">${event.target.value}</span>');
        const allMarkers = markers(place.geocoded_column_1).addTo(mapObjectFromFunction);
        return `
              <div class="column" style="background-color: green;"></div>
              <li>
                  <span class="name">${place.name}</span>
              </li>
              <li>
                  <span class="zipcode">${place.zip}</span>
              </li>
              <div class="column" style="background-color: green;"></div>
          `;
      }).join('');
      suggestions.innerHTML = html;
      mapObjectFromFunction.panTo(panning(first));
  } else {
      suggestions.innerHTML = "";
  }
  })

  search.addEventListener('input', (event) => {
    if (event.target.value.length === 0) {
      suggestions.innerHTML = "";
    }
  })
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;