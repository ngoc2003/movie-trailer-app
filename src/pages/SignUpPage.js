import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignUpPage = () => {
  const navigate = useNavigate();
  async function handleSignUp(values) {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(auth.currentUser, {
        displayName: values.fullName,
      });
      const collectionRef = collection(db, "users");
      await addDoc(collectionRef, {
        displayName: values.fullName,
        email: values.email,
        password: values.password,
        createdAt: serverTimestamp(),
        
      });
      toast.success("Create account successfully", {
        pauseOnHover: false,
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(
        "Your email has been already used before. Please try another email!",
        {
          pauseOnHover: false,
          autoClose: 2000,
        }
      );
    }
  }
  return (
    <div className="w-full text-center">
      <h4 className="mb-3 text-3xl font-semibold text-primary">Sign Up</h4>
      <p className="mb-3 text-sm">
        Already have an account? <br/>
        <a href="/sign-in" className="text-primary">
          Sign In
        </a>
      </p>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().required("Please fill this field!"),
          email: Yup.string()
            .email("Invalid Email. You email must have @ character")
            .required("Please fill this field!"),
          password: Yup.string()
            .min(6, "At least 6 characters")
            .required("Please fill this field!"),
        })}
        onSubmit={(values) => {
          handleSignUp(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form className="flex flex-col w-full gap-3">
              <Label>Your Full Name *</Label>
              <Input
                onChange={(e) => setFieldValue("fullName", e.target.value)}
                placeholder="John Doe"
              ></Input>
              {errors.fullName && touched.fullName && (
                <div className="input__error">{errors.fullName}</div>
              )}
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
                Sign Up
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUpPage;
