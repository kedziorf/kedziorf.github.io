<template>
    <div>
      <form @submit.prevent="submitComment">
        <label for="comment">Comment:</label>
        <textarea id="comment" v-model="comment" required></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  </template>
  
<script setup>
  import { ref } from 'vue';
  import { db } from '../firebase.js';
  import { addDoc, collection } from 'firebase/firestore';
  
  let comment = ref('');
  
  const submitComment = async () => {
    try {
      
      const docRef = await addDoc(collection(db, 'comments'), {
        text: comment.value,
        timestamp: Date.now(),
      });
      console.log('Comment added with ID: ', docRef.id);
      comment.value = ''; // Clear the comment field
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };
</script>