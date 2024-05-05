<template>
  <div>
    <div id="map" class="col-lg-12"></div>
    <a @click="goToSave">
      <button class="btn" style="color: white;background: #00a693;margin-left:5%">Save Current Location</button>
    </a>
    <section v-if="selectedPlace" style="margin-left: 5%;">
      <h1 style="margin-top:20px;">Location: {{ selectedPlace.name }}</h1>
      <p>Rating: {{ '⭐'.repeat(selectedPlace.rating) }}</p>
      <p>Description: {{ selectedPlace.description }}</p>
      <img :src="selectedPlace.image" alt="Place image" class="img-thumbnail responsive-image"><br>

      <!-- Like/Dislike Buttons and Counter -->
      <button @click="addLike" class="btn" style="margin: 5px;">👍 Like</button>
      <button @click="addDislike" class="btn" style="margin: 5px;">👎 Dislike</button>
      <p>Likes: {{ likeCount }}</p>
    </section>

  </div>


</template>
<script setup>

import { ref } from 'vue';
import router from '../router/index.js';
import L from 'leaflet';
import currentLocationIcon from '../assets/img/current-location-icon.png';
import { collection, getDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";



</script>

<script>

const selectedPlace = ref(null);
const likeCount = ref(0);

export default {
  methods: {
    goToSave() {
      router.push({ name: 'addplace' });
    },
    goToComment() {
      this.$router.push({ name: 'comment' });
    },
    async addLike() {
      if (selectedPlace.value) {
        const likesRef = doc(db, 'likes', selectedPlace.value.name);
        const likesDoc = await getDoc(likesRef);
        const likesData = likesDoc.exists() ? likesDoc.data() : { count: 0 };
        likesData.count = (likesData.count || 0) + 1;

        await setDoc(likesRef, likesData);
        likeCount.value = likesData.count;
      }
    },
    async addDislike() {
      if (selectedPlace.value) {
        const likesRef = doc(db, 'likes', selectedPlace.value.name);
        const likesDoc = await getDoc(likesRef);
        const likesData = likesDoc.exists() ? likesDoc.data() : { count: 0 };
        likesData.count = Math.max((likesData.count || 0) - 1, 0);

        await setDoc(likesRef, likesData);
        likeCount.value = likesData.count;
      }
    }
  },
  async mounted() {
    var map = L.map('map').setView([0, 0], 2);

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

    const querySnapshot = await getDocs(collection(db, "places"));
    querySnapshot.forEach((document) => {
      const place = document.data();
      L.marker([place.lat, place.long])
        .addTo(map)
        .bindPopup(`<b>${place.name}</b><br>Rating: ${'⭐'.repeat(place.rating)}`)
        .on('click', async () => {
          selectedPlace.value = place;
          const likesRef = doc(db, 'likes', place.name);
          const likesDoc = await getDoc(likesRef);
          const likesData = likesDoc.exists() ? likesDoc.data() : { count: 0 };
          likeCount.value = likesData.count;
        });
    });

    if (!navigator.geolocation) {
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

      if (marker) {
        map.removeLayer(marker)
      }

      if (circle) {
        map.removeLayer(circle)
      }

      marker = L.marker([lat, long], { icon: liveIcon })

      circle = L.circle([lat, long], { radius: accuracy })

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