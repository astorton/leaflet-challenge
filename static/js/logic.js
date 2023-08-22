let quakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

d3.json(quakes_url).then(function (data) {
   create_map(data.features);
    });

function create_map(quakes) {
  let streets = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    });

// Generate Map Object
    let map_object = {
    "Streets Map": streets
    };

    //generate overlay
    // overlay_map = { q}

    let module_map = L.map("map", {
        center: [39.0,34.0],
        zoom: 7
    });

streets.addTo(module_map);

L.geoJson(quakes, {
    pointToLayer : function (geoJsonPoint, latlng) {
        return L.circleMarker(latlng);
    },
    style: function (feature) {        
        return {
            fillColor: get_color(feature.geometry.coordinates[2]), 
            fillOpacity: 2, 
            radius: feature.properties.mag*2,
            color: "white",
            opacity: 0            
    };
    function get_color(depth){
        switch (true){
            case depth > 90:
                return "#056517";
            case depth > 70:
                return "#3f8f29";
            case depth > 50:
                return "#759116";
            case depth > 30:
                return "#bf1029";
            case depth > 0:
                return "#de1a24";
        }
    }

    },
    onEachFeature: function on_feature(features,layer){
        layer.bindPopup(`
        Magnitude: ${features.properties.mag} <div>
        Location: ${features.properties.place} <div>
        Alert: ${features.properties.alert} <div>
        Type: ${features.properties.type} 
        `
        );
        // console.log(features.properties);
    },
}).addTo(module_map);

let map_legend = L.control({position:"bottomright"});

map_legend.onAdd = function() { 
    let map_div = L.DomUtil.create("div","legend");
    map_div.innerHTML += "<h4>Seismic Depth</h4>";
    let depth_range = [0,30,50,70,90];
    let color_range = ['#de1a24','#bf1029','#759116','#3f8f29','#056517'];
    for (let i = 0; i < depth_range.length; i++) {
        map_div.innerHTML += "<i style='background: " + color_range[i] + "'></i> "
          + depth_range[i] + (depth_range[i + 1] ? "&ndash;" + depth_range[i + 1] + "<br>" : "+");
      }
        //add legend elements
        // map_div.innerHTML += "<h4>Seismic Depth</h4>";
        // map_div.innerHTML += '<i style="background: #056517"><span>depth 90+ </i></span><br>';
        // map_div.innerHTML += '<i style="background: #3f8f29"></i><span>depth > 70</span><br>';
        // map_div.innerHTML += '<i style="background: #759116"></i><span>depth > 50</span><br>';
        // map_div.innerHTML += '<i style="background: #bf1029"></i><span>depth > 30</span><br>';
        // map_div.innerHTML += '<i style="background: #de1a24"></i><span>depth > 0</span><br>';
    return map_div;

};

map_legend.addTo(module_map);
};
