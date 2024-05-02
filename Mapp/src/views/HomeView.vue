<script setup>
</script>

<template>
  
  <div id="map" class="col-lg-12"></div>
  <button @click="saveCurrentLocation" class="btn" style="color: white;background: #00a693;margin-left:20px" >Save Current Location</button>
  <section>
      <h1 style="margin-left: 20px; margin-top:20px;">Location</h1>
      <p style="margin-left: 20px;">Rating ⭐⭐⭐⭐⭐</p>
      <p style="margin-left: 20px;">Description</p>
      <p style="margin-left: 20px;">This is my favourite location in my city</p>
  </section>
  <section>
      <img src="../assets/img/photo-1526679029800-3840612ca4ec.jpg" alt="brown wooden door open on restaurant" class="img-thumbnail">
  </section>
    
  
</template>

<script>
import L from 'leaflet';

export default {
  mounted() {
    var map = L.map('map').setView([0,0], 1);

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

    if(!navigator.geolocation) {
      console.log("Your browser doesn't support geolocation feature!")
    } else {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
      }, 2000);
    }

    var marker, circle;

    function getPosition(position) {
      var lat = position.coords.latitude
      var long = position.coords.longitude
      var accuracy = position.coords.accuracy

      if(marker) {
        map.removeLayer(marker)
      }

      if(circle) {
        map.removeLayer(circle)
      }

      marker = L.marker([lat, long])

      circle = L.circle([lat, long], {radius: accuracy})

      var featureGroup = L.featureGroup([marker, circle]).addTo(map)
    }
  }
}
</script>
