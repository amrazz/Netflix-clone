import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore, waitForPendingWrites } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyB-ORj19An478jcFzAhIYo_wlKeqZKUn88",
    authDomain: "netflix-clone-e31ce.firebaseapp.com",
    projectId: "netflix-clone-e31ce",
    storageBucket: "netflix-clone-e31ce.appspot.com",
    messagingSenderId: "823549719778",
    appId: "1:823549719778:web:02b1f517d13fde0d981abb",
    measurementId: "G-S965HXH09G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const signup = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid : user.uid,
            name,
            authProvider : "local",
            email
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}


const login = async (email, password) =>{
    try{
        await signInWithEmailAndPassword(auth, email, password)
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}
const logout = () =>{
    signOut(auth).catch((error) => console.error(error));
}

export { auth, db, login, signup, logout };
