import { Component, OnInit } from '@angular/core';
import { ViewChild,ElementRef } from '@angular/core';

declare var google:any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage  {
  map: any;

  @ViewChild('map', {read: ElementRef, static:false}) mapRef: ElementRef;

  infoWindows:any =[];
  markers: any = [{
    title: "Roskilde Museum",
    latitude: "	55.612114 ",
    longitude: "	12.359705 "
  },
  {
    title: "Roskilde Cathedral",
    latitude: "	55.642459 ",
    longitude: "	12.080056 "

  },
  {
    title: "Viking Ship Museum",
    latitude: "	55.649643 ",
    longitude: "12.078091 "
  },
 
  {
    title: "Roskilde Town Hall",
    latitude: "55.641204 ",
    longitude: "12.081755 "
  }
    
  
  ]
  constructor() {}
  

  ionViewDidEnter() {
    this.showMap();
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.lating(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title:marker.title,
        latitude:marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }
  addInfoWindowToMarker(marker){
        let infoWindowContent = '<div id="content">' +
        '<h2 id="firstHeading" class"firstHeading">' + marker.title + '<h2>' +
        '<p>Latitude: ' + marker.latitude + '</p>' +
        '<p>Longitude: ' + marker.longitude + '<p>' +
        '</div>';

        let infoWindow = new google.maps.infowindow({
          content: infoWindowContent

        });

        marker.addListner('click', ()=> {
          this.closeAllInfoWindows();
          infoWindow.open(this.map, marker);
        });
        this.infoWindows.push(infoWindow);
      }
      closeAllInfoWindows(){
        for(let window of this.infoWindows) {
          window.close();
        }
      }
      showMap(){
        const location = new google.maps.LatLng(55.64874, 12.13216);
        const options = {
          center: location,
          zoom: 15,
          disableDefaultUI:true
      
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }
}

