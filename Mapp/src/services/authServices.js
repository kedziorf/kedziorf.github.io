import firebaseApp from './firebase';

const auth = firebaseApp.auth();

export function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export function logIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export function logOut() {
    return auth.signOut();
}
