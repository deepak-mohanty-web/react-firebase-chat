import { useState } from "react";
import "./Login.scss";
import { avatar } from "../../../public";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      let imgUrl = avatar;

      if (img.file) {
        imgUrl = await upload(img.file);
      }

      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
      toast.success("Account created! You can login now! ");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back, </h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Enter your email" name="email" />
          <input type="password" name="password" placeholder="Enter password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        </form>
      </div>
      <div className="separator"> </div>
      <div className="item">
        <h2>Create an Accounts</h2>
        <form onSubmit={handleSignup}>
          <label htmlFor="file">
            <img src={img.url || avatar} alt="" />
            Upload an Image
          </label>
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />

          <input
            type="text"
            placeholder="Enter your username"
            name="username"
          />

          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
          />

          <input type="password" name="password" placeholder="Enter password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
