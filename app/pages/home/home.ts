import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
 
declare var google;
 
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  private redLineUrl = 'http://hybrid-api.oscgc.com/api/mbta/stopsbyroute?route=red';
  private blueLineUrl = 'http://hybrid-api.oscgc.com/api/mbta/stopsbyroute?route=blue';
  private orangeLineUrl = 'http://hybrid-api.oscgc.com/api/mbta/stopsbyroute?route=orange';
  private greenBLineUrl = 'http://hybrid-api.oscgc.com/api/mbta/stopsbyroute?route=green-b';
  private greenCLineUrl = 'http://hybrid-api.oscgc.com/api/mbta/stopsbyroute?route=green-c';
  private greenDLineUrl = 'http://hybrid-api.oscgc.com/api/mbta/stopsbyroute?route=green-d';
  private greenELineUrl = 'http://hybrid-api.oscgc.com/api/mbta/stopsbyroute?route=green-e';
  private mattapanUrl = 'http://hybrid-api.oscgc.com/api/mbta/stopsbyroute?route=mattapan';

  //MBTA subway lines
  red: any;
  blue: any;
  orange: any;
  green_b: any;
  green_c: any;
  green_d: any;
  green_e: any;
  mattapan: any;

  //MBTA commuter rails

  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(private http: Http, public navCtrl: NavController) {
    this.http.get(this.redLineUrl).map(res => res.json()).subscribe(
      data => {
          this.red = data.data.direction[0].stop;
      },
      err => {
          console.log(err);
      }
    );
    this.http.get(this.blueLineUrl).map(res => res.json()).subscribe(
      data => {
          this.blue = data.data.direction[0].stop;
      },
      err => {
          console.log(err);
      }
    );
    this.http.get(this.orangeLineUrl).map(res => res.json()).subscribe(
      data => {
          this.orange = data.data.direction[0].stop;
      },
      err => {
          console.log(err);
      }
    );
    this.http.get(this.greenBLineUrl).map(res => res.json()).subscribe(
      data => {
          this.green_b = data.data.direction[0].stop;
      },
      err => {
          console.log(err);
      }
    );
    this.http.get(this.greenCLineUrl).map(res => res.json()).subscribe(
      data => {
          this.green_c = data.data.direction[0].stop;
      },
      err => {
          console.log(err);
      }
    );
    this.http.get(this.greenDLineUrl).map(res => res.json()).subscribe(
      data => {
          this.green_d = data.data.direction[0].stop;
      },
      err => {
          console.log(err);
      }
    );
    this.http.get(this.greenELineUrl).map(res => res.json()).subscribe(
      data => {
          this.green_e = data.data.direction[0].stop;
      },
      err => {
          console.log(err);
      }
    );
    this.http.get(this.mattapanUrl).map(res => res.json()).subscribe(
      data => {
          this.mattapan = data.data.direction[0].stop;
      },
      err => {
          console.log(err);
      }
    );
  }

  
 
  ionViewLoaded() {
    this.loadMap();
  }
 
  loadMap() {
 
    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }

  addRedMarker() {
    this.addMarker(this.red);
  }

  addBlueMarker() {
    this.addMarker(this.blue);
  }

  addOrangeMarker() {
    this.addMarker(this.orange);
  }

  addGreenBMarker() {
    this.addMarker(this.green_b);
  }

  addGreenCMarker() {
    this.addMarker(this.green_c);
  }

  addGreenDMarker() {
    this.addMarker(this.green_d);
  }

  addGreenEMarker() {
    this.addMarker(this.green_e);
  }

  addMattapanMarker() {
    this.addMarker(this.mattapan);
  }
 
  addAllMarkers() {
    this.addMarker(this.red);
    this.addMarker(this.blue);
    this.addMarker(this.orange);
    this.addMarker(this.green_b);
    this.addMarker(this.green_c);
    this.addMarker(this.green_d);
    this.addMarker(this.green_e);
    this.addMarker(this.mattapan);
  }



  addMarker(items) { 
    var coordinates = [];
    let color = '#000000'
    
    for (var i = 0; i < items.length; i++) {
      var stopLat = parseFloat(items[i].stop_lat);
      var stopLng = parseFloat(items[i].stop_lon);
      coordinates.push(new google.maps.LatLng(stopLat, stopLng));
      let content = "<h4></h4>";  
      if (items == this.red) {
        content = "<h4>Red line</h4>";
        //red
        color = '#FF0000';
      } else if (items == this.blue) {
        content = "<h4>Blue line</h4>";
        color = '#0000FF';
      } else if (items == this.orange) {
        content = "<h4>Orange line</h4>";
        color = '#FFA500';
      } else if (items == this.green_b) {
        content = "<h4>Green-b line</h4>";
        color = '#006600';
      } else if (items == this.green_c) {
        content = "<h4>Green-c line</h4>";
        color = '#006600';
      } else if (items == this.green_d) {
        content = "<h4>Green-d line</h4>";
        color = '#006600';
      } else if (items == this.green_e) {
        content = "<h4>Green-e line</h4>";
        color = '#006600';
      } else if (items == this.mattapan) {
        content = "<h4>Mattapan line</h4>";
        color = '#FFFF00';
      } else {
        content = "<h4></h4>";
      }

      var iconImg = {
        url: 'https://maps.gstatic.com/mapfiles/transit/iw2/b/us-ma-boston.png',
        size: null,
        origin: null,
        anchor: null,
        scaledSize: new google.maps.Size(10, 10)
      };

    
      
   
      
      let marker = new google.maps.Marker({
        map: this.map,
       // animation: google.maps.Animation.DROP,  
        position: {lat: stopLat, lng: stopLng},
        icon: iconImg
        
      });
      
      this.addInfoWindow(marker, content);
    }
    var polylineOptions = {
      map: this.map,
      path: coordinates,
      strokeColor: color
    }
    new google.maps.Polyline(polylineOptions);
  }

  

  

  addInfoWindow(marker, content) {
  
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  
  }

  
  
}

