const centerCoordinates = coordinates.length === 0 ? [75.8648, 25.2138] : coordinates;

   mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: centerCoordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9// starting zoom
    });

    const marker = new mapboxgl.Marker()
    .setLngLat(centerCoordinates)
    .setPopup(new mapboxgl.Popup().setHTML("<h4>you'll be here</h4><br><p>Exact location provided After Booking</p>"))
    .addTo(map);

