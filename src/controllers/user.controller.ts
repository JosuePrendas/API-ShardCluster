import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

import firebase from "firebase/app";

import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert('src/serviceAccountKey.json'),
  databaseURL: "https://bdproyecto-9d198.firebaseio.com/",
});

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
let firebaseConfig:any = {
  apiKey: "AIzaSyDdKJ8L_G-rPt-Jaw5ckE-JH_JxZr1Lj0E",
  authDomain: "bdproyecto-9d198.firebaseapp.com",
  databaseURL: "https://bdproyecto-9d198.firebaseio.com/",
  projectId: "bdproyecto-9d198",
  storageBucket: "bdproyecto-9d198.appspot.com",
  messagingSenderId: "684750825916",
  appId: "1:684750825916:web:1be948ed0a038d9f1423b9",
  measurementId: "G-W49NKHCSPC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const signIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ msg: "Please.Send your email and password" });

  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error:any) {
    return null;
  });
  let delay = 1000;
  await new Promise(r=>setTimeout(r,delay));
  let user:any = firebase.auth().currentUser;
  if(user == null){
    return res.status(400).json({ msg: "Te mastodonte" });
  }
  let token = await user.getIdToken(true).then(function(idToken:any) {
    return idToken;
  });
  return res.status(400).json({ idToken: token });
}

export const verifyIdToken = async(req: Request, res: Response):Promise<Boolean>=>{
  console.log(req.headers.authorization);
  let token:any = req.headers.authorization;
  let prueba = await admin.auth().verifyIdToken(token).then(function(decodedToken:any) {
  return true;
}).catch(function(error: any) {
  return false;
  });
  console.log(prueba);
  return true;
}

/* function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtScret, {
    expiresIn: 86400,
  });
} */

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

  const newUser = new User(req.body);
  await newUser.save();

  return res.status(201).json(newUser);
};

/* export const signIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ msg: "Please.Send your email and password" });

  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    return res.status(400).json({ msg: "The user does not exists" });
  }

  console.log(req.body.email);
  console.log(req.body.password);

  const isMatch = await user.comparePassword(req.body.password);
  console.log(isMatch);
  if (isMatch) {
    return res.status(200).json({ token: createToken(user) });
  }

  return res.status(400).json({ msg: "The email or password are incorrect" });
}; */

export const users = async (req: Request, res: Response): Promise<Response> => {
  const users = await User.find();
  return res.status(400).json({ msg: users });
};
