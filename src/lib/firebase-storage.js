import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB0yJD3MpeGrM_jsbWfIXdl0sqT_vKvZQ",
  authDomain: "rajdeepproject-14e44.firebaseapp.com",
  projectId: "rajdeepproject-14e44",
  storageBucket: "rajdeepproject-14e44.appspot.com",
  messagingSenderId: "154273834668",
  appId: "1:154273834668:web:f4218818b6900d6dbae109",
  measurementId: "G-CETTVDC5H4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage();

const uploadImages = async (files) => {
    const promises = files.map(async (file) => {
        const storageRef = ref(storage, 'images/', file.name);
        const snapshot = await uploadBytes(storageRef, file);
        return getDownloadURL(snapshot.ref);
    });
    
    return Promise.all(promises);
}

export default uploadImages;