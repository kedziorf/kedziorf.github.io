<template>
    <section class="position-relative py-4 py-xl-5">
        <div class="container">
            <div class="row mb-5">
                <div class="col-md-8 col-xl-6 text-center mx-auto">
                    <h2>Register</h2>
                    <p class="w-lg-50">Create account and discover amazing places! Please, provide email with @ and retype your password.</p>
                </div>
            </div>
            <div class="row d-flex justify-content-center" style="color: rgb(0,0,0);">
                <div class="col-md-6 col-xl-4">
                    <div class="card mb-5">
                        <div class="card-body d-flex flex-column align-items-center">
                            <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4" style="background: #00A693;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                                </svg></div>
                            <form @submit.prevent="register" class="text-center" method="post">
                                <div class="mb-3"><input v-model="email" class="form-control" type="email" name="email" placeholder="Email"></div>
                                <div class="mb-3"><input v-model="password" class="form-control" type="password" name="password" placeholder="Password"></div>
                                <div class="mb-3"><input v-model="retypePassword" class="form-control" type="password" name="password" placeholder="Retype Password"></div>
                                <div class="mb-3"><button class="btn d-block w-100" type="submit" style="background: #00A693;margin-bottom: 19px; color:white;">Register</button></div>
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase.js';
import router from '../router/index.js'; 

let email = ref('');
let password = ref('');
let retypePassword = ref('');

const register = async () => {
  if (password.value !== retypePassword.value) {
    alert('Passwords do not match.');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    // Signed in 
    const user = userCredential.user;
    console.log("User registered!", user);
    router.push({ name: 'login' });
  } catch (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("CODE:", errorCode, "MESSAGE", errorMessage);
    alert(errorMessage);
  }
};
</script>