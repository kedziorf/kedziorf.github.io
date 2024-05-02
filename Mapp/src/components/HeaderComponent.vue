<template>
  <header>
        <h1 style="margin-top: 14px;margin-left: 20px;"> mApp 🗺
          <button v-if="isLoggedIn" @click="logout" class="btn float-end py-1" type="button" style="color: white;background: #00a693;margin-right: 20px;">Log out</button></h1>
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