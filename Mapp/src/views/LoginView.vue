<template>
    <section class="position-relative py-4 py-xl-5">
        <div class="container">
            <div class="row mb-5">
                <div class="col-md-8 col-xl-6 text-center mx-auto">
                    <h2>Log in</h2>
                    <p class="w-lg-50">Welcome to mApp, where you can share your pins in OpenSource map&nbsp;</p>
                </div>
            </div>
            <div class="row d-flex justify-content-center" style="color: rgb(0,0,0);">
                <div class="col-md-6 col-xl-4">
                    <div class="card mb-5">
                        <div class="card-body d-flex flex-column align-items-center">
                            <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4" style="background: #00A693;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                                </svg></div>
                            <form @submit.prevent="login" class="text-center" method="post">
                                <div class="mb-3"><input v-model="email" class="form-control" type="email" name="email" placeholder="Email"></div>
                                <div class="mb-3"><input v-model="password" class="form-control" type="password" name="password" placeholder="Password"></div>
                                <div class="mb-3">
                                    <button type="submit" class="btn d-block w-100" style="background: #00A693;margin-bottom: 19px; color:white;">Login</button>
                                    <button @click="signInWithGoogle" class="btn btn-primary d-block w-100"  style="background: var(--bs-secondary-bg);color: rgb(0,0,0);border-color: var(--bs-btn-disabled-color);">Sign in with Google
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-google" style="margin-left: 14px;padding-bottom: 0px;margin-bottom: 2px;">
                                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <p class="text-muted"><a @click="goToRegister">Don't have account yet?</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup>
import { ref } from 'vue';
import { auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from '../firebase.js';
import router from '../router/index.js'; // import router

let email = ref('');
let password = ref('');
const provider = new GoogleAuthProvider();

const goToRegister = () => {
  router.push({ name: 'register' });
};

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    router.push({ name: 'home' });
    console.log("Logged in!", user.uid);

  } catch (error) {


    switch (error.code) {
      case "auth/invalid-credential":
        alert("Invalid credentials. Please try again.");
        break;
      case "auth/invalid-email":
        alert("Invalid email. Please try again.");
        break;
      case "auth/missing-password":
        alert("Missing password. Please try again.");
        break;
      default:
        alert("We are expiriencing technical difficulties. Please try again later.");
    }
    console.log(error.code, error.message)
   
  }
};

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    router.push({ name: 'home' });
    console.log("Logged in with Google!", user.uid);
  } catch (error) {
    console.log("CODE:", error.code, "MESSAGE", error.message)
  }
};
</script>

<style>
.bs-icon {
  --bs-icon-size: .75rem;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  font-size: var(--bs-icon-size);
  width: calc(var(--bs-icon-size) * 2);
  height: calc(var(--bs-icon-size) * 2);
  color: var(--bs-primary);
}

.bs-icon-xs {
  --bs-icon-size: 1rem;
  width: calc(var(--bs-icon-size) * 1.5);
  height: calc(var(--bs-icon-size) * 1.5);
}

.bs-icon-sm {
  --bs-icon-size: 1rem;
}

.bs-icon-md {
  --bs-icon-size: 1.5rem;
}

.bs-icon-lg {
  --bs-icon-size: 2rem;
}

.bs-icon-xl {
  --bs-icon-size: 2.5rem;
}

.bs-icon.bs-icon-primary {
  color: var(--bs-white);
  background: var(--bs-primary);
}

.bs-icon.bs-icon-primary-light {
  color: var(--bs-primary);
  background: rgba(var(--bs-primary-rgb), .2);
}

.bs-icon.bs-icon-semi-white {
  color: var(--bs-primary);
  background: rgba(255, 255, 255, .5);
}

.bs-icon.bs-icon-rounded {
  border-radius: .5rem;
}

.bs-icon.bs-icon-circle {
  border-radius: 50%;
}


</style>
