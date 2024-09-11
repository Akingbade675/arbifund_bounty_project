// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { v4 as uuidv4 } from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBjJN_VNnOE8ZcqSdi-tpbEAmSdkygWGdE',
  authDomain: 'arbifund-73768.firebaseapp.com',
  projectId: 'arbifund-73768',
  storageBucket: 'arbifund-73768.appspot.com',
  messagingSenderId: '65869826120',
  appId: '1:65869826120:web:2fb37afead89d8c826707d',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export async function uploadImageToFirebase(image) {
  try {
    const storage = getStorage(app)
    const storageRef = ref(
      storage,
      `images/campaigns/${uuidv4()}-${image.name}`
    )
    await uploadBytesResumable(storageRef, image)

    const downloadURL = await getDownloadURL(storageRef)
    console.log('Image uploaded to Firebase:', downloadURL)

    return downloadURL
  } catch (error) {
    console.error(
      'An error occurred while uploading the image to Firebase:',
      error
    )
    return null
  }
}
