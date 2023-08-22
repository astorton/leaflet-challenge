// console.log("Start here");

// let streetsmap = L.tileLayer(
//     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
//     {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });

// let module_map = L.map("map", {
//         center: [39.0, 34.0],
//         zoom: 3
//     });

// streetsmap.addTo(module_map);

// L.geoJson(quakes, {
//     pointToLayer : function (geoJsonPoint, latlng) {
//         return L.marker(latlng);
//     },
//     style: function (feature) {
//         return {color: feature.properties.color};
//     },
// }).addTo(module_map);

// let quakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// d3.json(quakes_url).then(function (data) {
    
// });