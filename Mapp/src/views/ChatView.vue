<template>
    <section class="position-relative py-4 py-xl-5">
        <div class="container">
            <h2>Chat Section</h2><br>
            <div class="list-group comments-container" ref="commentsContainer">
                <div v-for="(comment, index) in comments" :key="index" class="list-group-item">
                    <p class="mb-1">{{ comment.text }}</p>
                    <small class="text-muted">Posted by: {{ comment.userId }} at {{ new
                        Date(comment.timestamp).toLocaleString() }}</small>

                </div>
            </div>
            <form @submit.prevent="addComment" class="mt-3">
                <div class="mb-3">
                    <input v-model="newComment" placeholder="Send message" type="text" class="form-control" id="new-comment"  required>
                </div>
                <button type="submit" class="btn" style="color: white;background: #00a693;">Send</button>
            </form>
        </div>
    </section>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { addDoc, collection, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

import { db, auth } from '../firebase.js';

export default {
    setup() {
        const newComment = ref("");
        const comments = ref([]);
        const commentsContainer = ref(null);

        const fetchComments = async () => {
            const commentsQuery = query(collection(db, "comments"), orderBy("timestamp", "asc"));
            const querySnapshot = await getDocs(commentsQuery);
            comments.value = querySnapshot.docs.map(doc => {
                const data = doc.data();
                data.timestamp = data.timestamp.toDate();
                return data;
            });
            await nextTick();
            commentsContainer.value.scrollTop = commentsContainer.value.scrollHeight; 
        };        

        onMounted(fetchComments);

        const addComment = async () => {
            if (!newComment.value) {
                alert("Please enter a comment.");
                return;
            }
            const userId = auth.currentUser ? auth.currentUser.email : 'anonymous';
            await addDoc(collection(db, "comments"), {
                text: newComment.value,
                userId: userId,
                timestamp: serverTimestamp()
            });
            newComment.value = "";
            fetchComments();
        };

        return {
            newComment,
            comments,
            addComment,
            commentsContainer
        };
    }
};
</script>
<style scoped>
@media (min-width: 1000px) {
    .container {
        width: 50%;
        margin: auto;
    }
}

.comments-container {
  max-height: calc(1.5em * 22); 
  overflow-y: auto;
}
</style>