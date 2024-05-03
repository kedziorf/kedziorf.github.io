<template>
  <section class="position-relative py-4 py-xl-5">
    <div class="container">
      <form @submit.prevent="addPlace" class="row g-3">
        <div class="col-md-8 col-xl-6 text-center mx-auto">
          <h2>Add place to Database</h2>
        </div>
        <div class="col-md-8 col-xl-8 mx-auto">
          <label for="name" class="form-label">Name:</label>
          <input type="text" id="name" v-model="name" class="form-control">
        </div>
        <div class="col-md-8 col-xl-8 mx-auto">
          <label for="rating" class="form-label">Rating:</label>
          <select id="rating" v-model="rating" class="form-select">
            <option disabled value="">Please select one</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="col-md-8 col-xl-8 mx-auto">
          <label for="image" class="form-label">Image:</label>
          <input type="file" id="image" accept="image/*" @change="onFileChange" class="form-control">
        </div>
        <div class="col-md-8 col-xl-8 mx-auto">
          <label for="description" class="form-label">Description:</label>
          <textarea id="description" v-model="description" class="form-control"></textarea>
        </div>
        <div class="col-md-8 col-xl-8 mx-auto">
          <button type="submit" :disabled="isSubmitting" class="btn" style="color: white;background: #00a693;">
            <span v-if="isSubmitting">Loading...</span>
            <span v-else>Submit</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
 
<script setup>
import { ref } from 'vue';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useRouter } from 'vue-router';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const isSubmitting = ref(false);
const lat = ref(null);
const long = ref(null);
const name = ref("");
const rating = ref("");
const image = ref(null);
const description = ref("");
const router = useRouter();

const onFileChange = (e) => {
  image.value = e.target.files[0];
};

navigator.geolocation.getCurrentPosition((position) => {
  lat.value = position.coords.latitude;
  long.value = position.coords.longitude;
});

const addPlace = async () => {
  if (!name.value || !rating.value || !description.value) {
    alert("All fields are required.");
    return;
  }

  if (rating.value < 1 || rating.value > 5) {
    alert("Rating must be between 1 and 5.");
    return;
  }
  
  isSubmitting.value = true;
  let imageUrl = "";

  if (image.value) {
    const storage = getStorage();
    const imageRef = storageRef(storage, `images/${image.value.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image.value);

    await new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle progress
        }, 
        (error) => {
          console.error("Error uploading image: ", error);
          reject(error);
        }, 
        async () => {
          imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve();
        }
      );
    });
  }

  const placeData = {
    name: name.value,
    lat: lat.value,
    long: long.value,
    image: imageUrl,
    rating: rating.value,
    description: description.value,
  };

  try {
    const docRef = await addDoc(collection(db, "places"), placeData);
    console.log("Document written with ID: ", docRef.id);
    window.navigator.vibrate(200);
    router.push({ name: 'home' });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
    


</script>