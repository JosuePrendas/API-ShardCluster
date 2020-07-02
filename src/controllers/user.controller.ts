import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import firebase from "firebase/app";
import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert("src/serviceAccountKey.json"),
  databaseURL: "https://bdproyecto-9d198.firebaseio.com/",
});

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
let firebaseConfig: any = {
  apiKey: "AIzaSyDdKJ8L_G-rPt-Jaw5ckE-JH_JxZr1Lj0E",
  authDomain: "bdproyecto-9d198.firebaseapp.com",
  databaseURL: "https://bdproyecto-9d198.firebaseio.com/",
  projectId: "bdproyecto-9d198",
  storageBucket: "bdproyecto-9d198.appspot.com",
  messagingSenderId: "684750825916",
  appId: "1:684750825916:web:1be948ed0a038d9f1423b9",
  measurementId: "G-W49NKHCSPC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ msg: "Please.Send your email and password" });

  const validUser = await User.findOne({ email: req.body.email });
  if (!validUser) {
    return res.status(400).json({ msg: "The user does not exists" });
  }

  let userCredential: any = await firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .catch(function (error: any) {
      return null;
    });
  if (userCredential && userCredential.user) {
    let user: firebase.User = userCredential.user;
    let tokenResponse: Response = await user
      .getIdToken(true)
      .then(function (idToken) {
        return res.status(201).json({ IDToken: idToken });
      })
      .catch(function (error) {
        return res.status(400).json({ msg: "TokenId retrive failed" });
      });
    return tokenResponse;
  }
  return res.status(400).json({ msg: "Sign in failed" });
};

export const verifyIdToken = async (
  req: Request,
  res: Response
): Promise<boolean> => {
  let token: string | undefined = req.headers.authorization;
  if (token != undefined) {
    let tokenVerified: boolean = await admin
      .auth()
      .verifyIdToken(token)
      .then(function (decodedToken: admin.auth.DecodedIdToken) {
        return true;
      })
      .catch(function (error: any) {
        return false;
      });

    return tokenVerified;
  }

  return false;
};

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password)
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "The user already exists" });
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .catch(function (error: any) {
      return res.status(400).json({ msg: error.message });
    });

  const newUser = new User(req.body);
  await newUser.save();

  return res.status(201).json({ msg: "User created, please sign in" });
};

export const users = async (req: Request, res: Response): Promise<Response> => {
  let tokenValid = await verifyIdToken(req, res);
  if (!tokenValid) return res.status(400).json({ msg: "Unauthorized" });

  const users = await User.find();
  return res.status(400).json({ msg: users });
};
