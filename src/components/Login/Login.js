import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from '@material-ui/core';
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [loggedInUser, setloggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
     }

    //style
    const mystyle = { textAlign : "center"};

    //googleSign
    const googleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then((result) => {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email}
            setloggedInUser(signedInUser);
            history.replace(from);
        })
        .catch((error) => {
           console.log = (error.code, error.message, error.email, error.credential)
        })
    }

    return (
        <div style={mystyle}>
            <h1>This is Login</h1>
            <Button onClick={googleSignIn} variant="contained" color="primary">Google Sign In</Button>
            <p>name : {loggedInUser.name}</p>
        </div>
    );
};

export default Login;