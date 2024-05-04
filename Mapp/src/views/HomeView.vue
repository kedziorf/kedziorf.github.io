

<template>
  <div>
    <div id="map" class="col-lg-12"></div>
    <a @click="goToSave">
      <button class="btn" style="color: white;background: #00a693;margin-left:5%" >Save Current Location</button>
    </a>
    <section v-if="selectedPlace" style="margin-left: 5%;">
        <h1 style="margin-top:20px;">Location: {{ selectedPlace.name }}</h1>
        <p >Rating: {{ '⭐'.repeat(selectedPlace.rating) }}</p>
        <p >Description: {{ selectedPlace.description }}</p>
        <img :src="selectedPlace.image" alt="Place image" class="img-thumbnail responsive-image"><br>
    </section>
    
  </div>
    
  
</template>
<script setup>

import { ref } from 'vue';
import router from '../router/index.js';
import L from 'leaflet';
import currentLocationIcon from '../assets/img/current-location-icon.png';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

</script>

<script>

const selectedPlace = ref(null);

export default {
  methods: {
    goToSave () {
      router.push({ name: 'addplace'});
    },
    goToComment () {
      this.$router.push({ name: 'comment'});
    }
  },
  async mounted() {
    var map = L.map('map').setView([0,0], 2);

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

    const querySnapshot = await getDocs(collection(db, "places"));
    querySnapshot.forEach((doc) => {
      const place = doc.data();
      L.marker([place.lat, place.long])
        .addTo(map)
        .bindPopup(`<b>${place.name}</b><br>Rating: ${'⭐'.repeat(place.rating)}`)
        .on('click', () => {
          selectedPlace.value = place
        });
    });

    if(!navigator.geolocation) {
      console.log("Your browser doesn't support geolocation feature!")
    } else {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
      }, 2000);
    }

    var liveIcon = L.icon({
      iconUrl: currentLocationIcon,
      iconSize: [15, 15],
    });

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

      marker = L.marker([lat, long], {icon: liveIcon})

      circle = L.circle([lat, long], {radius: accuracy})

      var featureGroup = L.featureGroup([marker, circle]).addTo(map)
    }    
  }
}
</script>
<style scoped>
.responsive-image {
  width: 95%;
  max-width: 600px;
  height: auto;
}
</style>