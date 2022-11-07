// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDQj_t9tNVYbzy8fyVGXXJGkJ2AWeS6Yw",
  authDomain: "tlmovie.firebaseapp.com",
  projectId: "tlmovie",
  storageBucket: "tlmovie.appspot.com",
  messagingSenderId: "610475279965",
  appId: "1:610475279965:web:e5295518449a7a65172fb4",
  measurementId: "G-Q823CB2S6K"
};
const app = initializeApp(firebaseConfig, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
});
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
