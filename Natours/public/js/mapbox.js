/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibW9udGFzZXItaXNtYWlsIiwiYSI6ImNtNnA0cHM2YTE0NXUyc3M4bGloeGx4YnkifQ.Edjht61ggmep_GM72rVmbA';

  const mapContainer = document.getElementById('map');
  if (!mapContainer || !locations || locations.length === 0) return;

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/montaser-ismail/cm6qq4ix1012f01qxaekc6xum',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();
  map.on('load', function() {
    // Your map operations here, such as adding layers, markers, etc.
    locations.forEach(loc => {
      //create marker
      const el = document.createElement('div');
      el.className = 'marker';

      //Add popup
      const popup = new mapboxgl.Popup({ offset: 30 }).setHTML(
        `<p> Day ${loc.day}: ${loc.description}</p>`
      );
      
      //Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
      })
        .setLngLat(loc.coordinates)
        .setPopup(popup)
        .addTo(map);

      
      //Extend map bounds to include the current location
      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
      }
    });
  });
};
