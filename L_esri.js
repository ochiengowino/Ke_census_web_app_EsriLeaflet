
var map = L.map('map').setView([-1.345094, 36.76471], 6);

L.esri.basemapLayer('Topographic', {
    attribution: 'BIG_BEN',
    maxZoom: 20,
	minZoom: 1
	}).addTo(map);
	
map.attributionControl.addAttribution('BIG_BEN');

var countyPops = L.esri.featureLayer({
    url: 'https://services8.arcgis.com/M8cCPjM7UQWc3iHk/arcgis/rest/services/Kenya_County_Population/FeatureServer/0',
	style: function (feature) {
      if (feature.properties.TOTAL >= 2000000) {
			return { fillColor: '#800026', weight:0.4};
		  }else if (feature.properties.TOTAL > 1500000) {
			return { fillColor: '#BD0026', weight: 0.4 };
		  }else if (feature.properties.TOTAL > 1000000) {
		   return { fillColor: '#E31A1C', weight: 0.4};
		  }else if (feature.properties.TOTAL > 500000) {
			return { fillColor: '#FC4E2A', weight: 0.4 };
		  }else if (feature.properties.TOTAL > 250000) {
			return { fillColor: '#FD8D3C', weight: 0.4 };
		  }else if (feature.properties.TOTAL > 125000) {
			return { fillColor: '#FEB24C', weight: 0.4};
		  }else if (feature.properties.TOTAL > 100000) {
			return { fillColor: '#E31A1C', weight: 0.4};
		  }else {
			return { fillColor: '#FFEDA0', weight: 0.4 };
		  }
      
		}
}).addTo(map);

$("#pop").on('click', function() {
	map.addLayer(countyPops);
});


  
$("#popr").on('click', function() {
	map.removeLayer(countyPops);
	
});

 
 
 
countyPops.on('click', function(e){
    selectedCounty = e.layer.feature.properties;
    displaySelected();
});


var selectedCounty = {};

function displaySelected() {
    const html = `
    <h4>${selectedCounty.COUNTYNAME} County statistics</h4>
    <table class="table">
    <tbody>
      <thead>
        <tr><td><h6>Property</h6></td><td><h6>Value</h6></td></tr>
      </head>
      <tr>
        <th>County Code</th>
        <td>${selectedCounty.COUNTYCODE}</td>
        
      </tr>
      <tr>
      <th>Female</th>
      <td>${toNumber(selectedCounty.FEMALE)}</td>
      </tr>
      <tr>
      <th>Male</th>
      <td>${toNumber(selectedCounty.MALE)}</td>
      </tr>
      <tr>
      <th>Intersex</th>
      <td>${toNumber(selectedCounty.INTERSEX)}</td>
      </tr>
      <tr>
      <th>Total</th>
      <td>${toNumber(selectedCounty.TOTAL)}</td>
      </tr>
    </tbody>
</table>
    `

    $("#selected").html(html);
}

function toNumber(number) {
    return new Intl.NumberFormat().format(number);
}



$("#popa").on('click', function() {
  countyPops.setWhere(value="TOTAL>='2000000'")
	return true;
});


$("#popb").on('click', function() {
  countyPops.setWhere(value="TOTAL>'1000000'")
	return true;
});


$("#popc").on('click', function() {
  countyPops.setWhere(value="TOTAL>'500000'")
	return true;
});


$("#popd").on('click', function() {
  countyPops.setWhere(value="TOTAL>'250000'")
	return true;
});

$("#pope").on('click', function() {
  countyPops.setWhere(value="1=1")
	return true;
});





function getColor(d){
	return d > 2000000 ? '#800026':
		   d > 1000000  ? '#BD0026' :
           d > 500000 ? '#E31A1C' :
           d > 250000  ? '#FC4E2A' :
           d > 100000   ? '#FD8D3C' :
           d > 50000  ? '#FEB24C' :
           d > 10000   ? '#FED976' :
                      '#FFEDA0';
}


function feature_style(feature){
	return {
		fillColor: getColor(feature.properties.TOTAL),
		weight: 2,
		opacity: 1,
		color: '#EEEEEE',
		dashArray: '3',
		fillOpacity: 0.7
	};
}


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10000, 50000, 100000, 250000, 500000, 1000000, 2000000],
        labels = [];
    div.innerHTML = '<div><b>Population</b></div>';
    // loop through
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};


var kibraPolls = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/CPaGDKZdDnZfoO68/arcgis/rest/services/polling_stations_shapefile_kibera/FeatureServer/0',
    style: function (feature) {
        return {color: '#ccc8d1'}
      }
	
});	

$("#kib").on('click', function() {
	map.addLayer(kibraPolls);
	$("a.kib").zoomTo(53*17);
});
$("#kib2").on('click', function() {
	map.removeLayer(kibraPolls);
	
});



var constituencies = L.esri.featureLayer({
    url: 'https://services9.arcgis.com/CPaGDKZdDnZfoO68/arcgis/rest/services/constituencies/FeatureServer/0',
    style: function (feature) {
        return {color: '#ccc8d1'}
      }
	
});
$("#con").on('click', function() {
	map.addLayer(constituencies);
	
	
});
constituencies.bindPopup(function (layer) {
    return L.Util.template( layer.feature.properties.CONSTITUEN + " Constituency");
  });

$("#cona").on('click', function() {
	map.removeLayer(constituencies);
	
});
