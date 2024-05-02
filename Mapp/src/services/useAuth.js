import { ref, onUnmounted } from 'vue';
import firebaseApp from './firebase';

const user = ref(null);

const auth = firebaseApp.getAuth();

auth.onAuthStateChanged(newUser => {
    user.value = newUser;
});

export function useAuth() {
    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const logIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const logOut = () => {
        return auth.signOut();
    };

    onUnmounted(() => {
        // Cleanup if needed when component unmounts
    });

    return { user, signUp, logIn, logOut };
}
