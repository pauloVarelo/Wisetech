import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth"; 
import { faG } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faG = faG;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyCem-XMaVOiiQakEvhpO1Y-3RE03yxT7Os",
      authDomain: "wisetech-be6a4.firebaseapp.com",
      projectId: "wisetech-be6a4",
      storageBucket: "wisetech-be6a4.appspot.com",
      messagingSenderId: "749448077635",
      appId: "1:749448077635:web:556646b304f02979bf8ff6",
      measurementId: "G-PYWSQREHF7"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }

loginFacebook(){
const provider = new FacebookAuthProvider();
const auth = getAuth();
auth.languageCode = 'it';
signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential!!.accessToken;
    this.router.navigate(['/dashboard']);

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });

}

  loginGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!!.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.router.navigate(['/dashboard']);
        // ...
      }).catch((error) => {
        alert('Acesso Negado')
        
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
}