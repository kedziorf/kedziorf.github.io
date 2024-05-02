 <template>
    <form @submit.prevent="addPlace">
      <p>Add place</p>
      <div>
        <label for="rating">Rating:</label>
        <select id="rating" v-model="rating">
          <option disabled value="">Please select one</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div>
        <label for="image">Image:</label>
        <input type="file" id="image" accept="image/*" @change="onFileChange">
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
</template>
 
<script setup>
import { ref } from 'vue';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase.js';

const lat = ref(null);
const long = ref(null);
const rating = ref("");
const image = ref(null);
const description = ref("");

const onFileChange = (e) => {
  image.value = e.target.files[0];
};

navigator.geolocation.getCurrentPosition((position) => {
  lat.value = position.coords.latitude;
  long.value = position.coords.longitude;
});

const addPlace = async () => {
    const placeData = {
    lat: lat.value,
    long: long.value,
    image: image.value, // You might want to upload this to Firebase Storage and save the URL here
    rating: rating.value,
    description: description.value,
  };
  console.log("LAT:", lat.value , "LONG:", long.value, "IMAGE:", image.value, "RATING:", rating.value, "DESCRIPTION:", description.value);
  try {
    const docRef = await addDoc(collection(db, "places"), placeData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
    
};


</script>