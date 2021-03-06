$(document).ready(function () {

  "use strict";

  /* Permitting & violations */

  var 
      ctx3 = $("#violations").get(0).getContext("2d"),
      permitJSON = JSON.parse($("#permits_rawjson")[0].childNodes[0].data),
      violationsJSON = JSON.parse($("#violations_rawjson")[0].childNodes[0].data),
      series2 = [],
      datetime2 = [],
      series3 = [],
      datetime3 = [],
      openPermitData,
      openPermitDataset,
      openPermitChart;

  buildViolationsCharts();

  function buildViolationsCharts() {

    for(var i = 0; i < violationsJSON.length; i++) {

      //console.log(violationsJSON[i]);

      series3.push(violationsJSON[i].total);
      datetime3.push(prettyDates((violationsJSON[i].month).split('T')[0]));

    }

    series3.reverse();
    datetime3.reverse();

    var d3 = {
        labels:datetime3,
        datasets: [
          {
            fillColor: globalColors.orange_20,
            strokeColor: globalColors.orange,
            pointColor: globalColors.orange,
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: globalColors.orange,
            data: series3
          }
        ]
      },

      newLineChart = new Chart(ctx3).Line(d3);

  }

  function prettyDates(date) {

    var year = date.split('-')[0];
    var month = String(date.split('-')[1]);   //strict mode means no octal literals -- no 08 or 09 unless type string. A thing I learned today!

    switch (month) {

      case '01':
        month = 'Jan';
        break;
      case '02':
        month = 'Feb';
        break;
      case '03':
        month = 'Mar';
        break;
      case '04':
        month = 'Apr';
        break;
      case '05':
        month = 'May';
        break;
      case '06':
        month = 'Jun';
        break;
      case '07':
        month = 'Jul';
        break;
      case '08':
        month = 'Aug';
        break;
      case '09':
        month = 'Sep';
        break;
      case '10':
        month = 'Oct';
        break;
      case '11':
        month = 'Nov';
        break;
      case '12':
        month = 'Dec';
        break;

    }

    date = month + ' ' + year;
    return date;
  }
        
  /************************* LEAFLET MAPPING *************************/

  //25.7667° N, 80.2000° W
  //{lat: 25.626668871238568, lng: -80.44867515563963}

  
  /*var map = L.map('leaflet').setView([25.626668871238568, -80.44867515563963], 10);
    L.tileLayer('//api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    minZoom: 9,
    id: 'phiden.e64a2341',
    accessToken: 'pk.eyJ1IjoicGhpZGVuIiwiYSI6ImM3MGIxMDA2MDA1NDkzMzY5MWNlZThlYzFlNWQzOTkzIn0.boD45w3d4Ajws7QFysWq8g'
    }).addTo(map);*/

  //county shapefiles
  /*$.ajax({
    type: "GET",
    url: "../static/geodata/municipalities_coast.json",
    dataType: "json",
    success: parseXML
  });

  function parseXML(data) {

    var muni = [],
        umsa = [],
        i,
        myStyle = {
          color: globalColors.green,
          weight: 1,
          opacity: 0.65
        },

        umsaStyle = {

          color: 'rgba(0,0,0)',
          weight: 1,
          opacity: 0.65

        };

    //sort for county to control style
    for(i = 0; i < data.features.length;   i+=1) {

      if(data.features[i].properties.NAME == 'UNINCORPORATED MIAMI-DADE') {

        umsa.push(data.features[i]);

      } else {

        muni.push(data.features[i]);

      }

    }

    L.geoJson(muni, {style:umsaStyle}).addTo(map);
    L.geoJson(umsa, {style:myStyle}).addTo(map);

    buildDataMaps();

  }*/
  
  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  buildDataMaps();
  
  function buildDataMaps(){
    
    var vioLocationsData = JSON.parse($("#violations_locations_json")[0].childNodes[0].data),
        vioTypeData = JSON.parse($("#violations_type_json")[0].childNodes[0].data),
        vioMonthlyData = JSON.parse($("#violations_per_month_json")[0].childNodes[0].data),
        vioArray = [];
        
    /*for(var i = 0; i < vioLocationsData.length; i+=1) {

      if(vioLocationsData[i].location.latitude != undefined) {
        
        var obj = vioLocationsData[i].location.human_address;*/
        
        //console.log(typeof obj);
        //console.log(obj.split(":")[obj.split(":").length - 1])
        
       // var latlng = L.latLng(vioLocationsData[i].location.latitude, vioLocationsData[i].location.longitude, 1);
        
        //vioArray[i] = [parseFloat(vioLocationsData[i].location.latitude), parseFloat(vioLocationsData[i].location.longitude)];

        /*var lat = vioLocationsData[i].location.latitude,
            lon = vioLocationsData[i].location.longitude,
            openClosed = vioLocationsData[i].ticket_status,
            fill = t_yellow,
            color = yellow,
            title = vioLocationsData[i].issue_type;

        var marker2 = L.circleMarker([lat, lon], {
            radius: 5,
            fillColor: fill,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          }).addTo(map);

          marker2.bindPopup(title);
          marker2.on('mouseover', function() {
            this.openPopup();
          });
          marker2.on('mouseout', function() {
            this.closePopup();
          });*/
     // }
   // }
    
    //console.log(vioArray.length);
    
   // var heat = L.heatLayer(vioArray).addTo(map);
    
        //console.log(map.hasLayer(heat), heat);
        
    
    //for(i = 0; i < vioMonthlyData.length; i += 1) {

      //console.log(vioMonthlyData[i]);

      /*if(vioMonthlyData[i].location.latitude != undefined) {

        lat = vioMonthlyData[i].location.latitude,
        lon = vioMonthlyData[i].location.longitude,
        openClosed = vioMonthlyData[i].ticket_status,
        fill = t_yellow,
        color = yellow,
        title = vioMonthlyData[i].issue_type;

        marker2 = L.circleMarker([lat, lon], {
          radius: 5,
          fillColor: fill,
          color: color,
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map3);

        marker2.bindPopup(title);
        marker2.on('mouseover', function() {
          this.openPopup();
        });
        marker2.on('mouseout', function() {
          this.closePopup();
        });

      }*/


   // }

    if(vioTypeData === '') {

      $('#regulation h3').append("<div class='alert-alert-warning'><p class='alert center small'>Sorry, something's gone wrong with our data for neighborhood compliance! <br>We're working to get it back online.</p></div>");

    } else {

      var labels = [];
      var dataset = [];

      //the 'total' isn't an integer. make it one, or the sort will fail.
      for(var i = 0; i < vioTypeData.length;   i+=1) {

        vioTypeData[i].total = parseInt(vioTypeData[i].total, 10);
        //console.log(data[i]);
      }

      //sort on the number of each violation type
      vioTypeData = vioTypeData.sortOn("total");
      vioTypeData.reverse();

      //set the data up for Charts.js
      for(i = 0; i < 19;   i+=1) {

        labels[i] = vioTypeData[i].issue_type;
        dataset[i] = vioTypeData[i].total;
        //console.log(data[i].issue_type, i);

      }

      labels.reverse();
      dataset.reverse();

      //create the chart
      var bctx = $("#viotype").get(0).getContext("2d");

      var bdata = {
          labels: labels,
          datasets: [
              {
                fillColor: globalColors.t_purple_1,
                strokeColor: globalColors.purple_1,
                data: dataset
              }
          ]
      };

      var horizontalBarChart = new Chart(bctx).HorizontalBar(bdata);

    }

  }
  /***************************** tool tips *****************************/
  
  initTabletop();

}); //close ready
