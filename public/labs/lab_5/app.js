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
     // use your assignment 1 data handling code here
     // and target mapObjectFromFunction to attach markers
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
    const restaurants = [];
    
    const request = await fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => restaurants.push(...data));
  
    function findMatches(wordToMatch, restaurants) {
      const geoFilter = restaurants.filter((place) => place.geocoded_column_1)
      return restaurants.filter(place => {
          const regex = new RegExp(wordToMatch, 'gi');
          return (place.zip.match(regex));
      });
  }
  
  function displayMatches(event) {
      const matchArray = findMatches(document.getElementById("search").value, restaurants);
      console.log(document.getElementById("search").value);
      console.log(matchArray);
      const matchArray1 = Array.from(matchArray)
      const matchArray2 = matchArray.slice(0,5)
      const longLat1 = matchArray2[0].geocoded_column_1.coordinates;
      mapObjectFromFunction.panTo([longLat1[1], longlat1[0]]);
      matchArray2.forEach((palce)) => {
        const longLat = place.geocoded_column_1.coordinates;
        console.log(longLat);
        const marker = L.marker([longLat[1], longLat[0]].addTo(mapObjectFromFunction);
      });

      const html = matchArray2.map((place) => {
        return  `<li> 
          //<span class="name"><b>${place.name}</b></span>
          //<br/>
          //<span class="category"><b>${place.category}</b></span>
          //<br/>
          //<address><b>${place.address_line_1}</b> 
          //<br/><b>${place.city}, ${place.state} ${place.zip}</b></address>
          //</li>`;
      })
      .join('');
      suggestions.innerHTML = html;
    }


       //= matchArray.map(place => 
          //return  `<li> 
          //<span class="name"><b>${place.name}</b></span>
          //<br/>
          //<span class="category"><b>${place.category}</b></span>
          //<br/>
          //<address><b>${place.address_line_1}</b> 
          //<br/><b>${place.city}, ${place.state} ${place.zip}</b></address>
          //</li>`;
      //suggestions.innerHTML = html;

  
  const searchInput = document.querySelector('.search')
  const suggestions = document.querySelector('.RestaurantList')
  
  searchInput.addEventListener('keyup', (evt) => { evt.preventDefault()
      displayMatches(evt) });
  }

  async function windowActions(){
    const map= mapInit();
    await dataHandler(map)
  }
 
  window.onload = windowActions;
  