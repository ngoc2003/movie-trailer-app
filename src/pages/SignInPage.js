import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth-context";

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  async function handleSignIn(values) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Đăng nhập thành công", {
        pauseOnHover: false,
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error("Please check your email and password",{
        pauseOnHover: false,
        autoClose: 1500,
      });
    }
  }
  useEffect(() => {
    document.title = "Sign In";
    if (userInfo?.email) navigate("/");
  }, []);
  return (
    <div className="text-center">
      <h4 className="mb-3 text-3xl font-semibold text-primary">Sign In</h4>
      <p className="mb-3 text-sm">
        Dont have an account?<br />
        <a href="/sign-up" className="text-primary">
          Sign Up
        </a>
      </p>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid Email. You email must have @ character")
            .required("Please fill this field!"),
          password: Yup.string()
            .min(6, "At least 6 characters")
            .required("Please fill this field!"),
        })}
        onSubmit={(values) => {
          handleSignIn(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form className="flex flex-col w-full gap-3">
              <Label>Your Email *</Label>
              <Input
                onChange={(e) => setFieldValue("email", e.target.value)}
                placeholder="example@gmail.com"
              ></Input>
              {errors.email && touched.email && (
                <div className="input__error">{errors.email}</div>
              )}
              <Label>Your Password *</Label>
              <Input
                onChange={(e) => setFieldValue("password", e.target.value)}
                placeholder="John109xyz"
                icon={true}
              ></Input>
              {errors.password && touched.password && (
                <div className="input__error">{errors.password}</div>
              )}
              <Button type="submit" fluid={true} className='mt-3'>
                Sign In
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignInPage;
