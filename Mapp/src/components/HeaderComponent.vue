<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid ">
    <a class="navbar-brand" @click="goHome" href="#">mApp <img style="height: 4vh; min-height: 40px;" src="/pin-icon.png"></a>
    <button v-if="isLoggedIn" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div v-if="isLoggedIn" class="collapse navbar-collapse text-center" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
        <li class="nav-item">
          <a @click="goHome" style="" class="nav-link" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a @click="goChat" class="nav-link" href="#">Chat</a>
        </li>
        <li class="nav-item">
          <a @click="logout" class="nav-link danger" href="#">Log out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
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

const goHome = () => {
  router.push({ name: 'home' });
};

const goChat = () => {
  router.push({ name: 'chat' });
};

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

</style>