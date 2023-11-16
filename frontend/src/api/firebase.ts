// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD4q6kShGR-_MpP4BmS57GO7vnS_I1tWfI',
	authDomain: 'nostalgia-63c3c.firebaseapp.com',
	projectId: 'nostalgia-63c3c',
	storageBucket: 'nostalgia-63c3c.appspot.com',
	messagingSenderId: '939663332720',
	appId: '1:939663332720:web:e82d587c786472b1732bb5',
	measurementId: 'G-XC827HD9MX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
