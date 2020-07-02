"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.signUp = exports.verifyIdToken = exports.signIn = void 0;
const user_1 = __importDefault(require("../models/user"));
const app_1 = __importDefault(require("firebase/app"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert('src/serviceAccountKey.json'),
    databaseURL: "https://bdproyecto-9d198.firebaseio.com/",
});
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
let firebaseConfig = {
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
app_1.default.initializeApp(firebaseConfig);
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password)
        return res.status(400).json({ msg: "Please.Send your email and password" });
    app_1.default.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function (error) {
        return null;
    });
    let delay = 1000;
    yield new Promise(r => setTimeout(r, delay));
    let user = app_1.default.auth().currentUser;
    if (user == null) {
        return res.status(400).json({ msg: "Te mastodonte" });
    }
    let token = yield user.getIdToken(true).then(function (idToken) {
        return idToken;
    });
    return res.status(400).json({ idToken: token });
});
exports.verifyIdToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization);
    let token = req.headers.authorization;
    let prueba = yield firebase_admin_1.default.auth().verifyIdToken(token).then(function (decodedToken) {
        return true;
    }).catch(function (error) {
        return false;
    });
    console.log(prueba);
    return true;
});
/* function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtScret, {
    expiresIn: 86400,
  });
} */
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password)
        return res
            .status(400)
            .json({ msg: "Please. Send your email and password" });
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: "The user already exists" });
    }
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
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
exports.users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    return res.status(400).json({ msg: users });
});
