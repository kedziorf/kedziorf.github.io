<template>
  <header class="header">
    <h1 style="margin-top: 14px;margin-left: 20px;"> mApp 🗺</h1>
    <div class="header-buttons">
      <button v-if="isLoggedIn" @click="logout" class="btn float-end py-1" type="button" style="color: white;background: #00a693;margin-right: 20px;">Log out</button>
      <a href="/mApp/home" v-if="isLoggedIn"><button class="btn float-end py-1" type="button" style="color: white;background: #00a693;margin-right: 20px;">Home</button></a>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.js';
import router from '../router/index.js'; 

let isLoggedIn = ref(false);

onAuthStateChanged(auth, user => {
  isLoggedIn.value = !!user;
});

const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out!");
    router.push({ name: 'login' });
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 1024px) {
  .header {
    flex-direction: row;
  }
}
</style>