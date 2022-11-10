import { addDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import MovieCard from "../components/movie/MovieCard";
import { useAuth } from "../context/auth-context";
import defaultAvatar from "../images/avatar_default.jpg";
import { handleChangeSecondToDate } from "../utils/handleChangeSecondToDate";
import { MdModeEditOutline } from "react-icons/md";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Label from "../components/Label";
import Input from "../components/Input";
import { auth, db } from "../firebase/firebase.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updatePassword, updateProfile } from "firebase/auth";
const storage = getStorage();

const UserPage = () => {
  const { userInfo } = useAuth(); // from firebase-auth
  const listFavorite = userInfo?.listFavorite;
  const [edit, setEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState(""); // preview image update
  const [url, setUrl] = useState(userInfo?.image || defaultAvatar); // avatar url of user
  const [loading, setLoading] = useState(false);
  const [values, setValue] = useState(""); // values which user change
  function handleSetPreview(image) {
    try {
      image.preview = URL.createObjectURL(image);
    } catch (err) {
      console.log(err);
    }
    setImagePreview(image);
  }
  const handleSubmit = (values) => {
    if (!imagePreview) {
      console.log("No Image");
    } else if (imagePreview) {
      const file = imagePreview;
      const storageRef = ref(storage, "images" + "/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Nothing");
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);
          });
        }
      );
    }
  };
  useEffect(() => {
    const update = async () => {
      if (!values) return null;
      const updateUser = doc(db, "users", userInfo?.id);
      await updateDoc(updateUser, {
        displayName: values?.fullName
          ? values.fullName.trim()
          : userInfo.fullName,
        image: url ? url : "",
        password: values?.password,
      });
      updateProfile(auth.currentUser, {
        displayName: values.fullName,
        photoURL: url,
        password: values.password,
      });
      updatePassword(auth.currentUser, values.password);
      setLoading(false);
      toast.success("Your profile has updated!", {
        pauseOnHover: false,
        autoClose: 1500,
      });
      toast.success("Please re-signin", {
        pauseOnHover: false,
        autoClose: 1500,
      });
    };
    update();
  }, [url]);
  useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview.preview);
    };
  }, [imagePreview]);
  return (
    <div className=" page-container">
      <div className="px-5 py-5 border border-gray-500 xs:mt-10 rounded-xl">
        {userInfo ? (
          <>
            <div className="gap-10 mb-5 text-center xs:text-left xs:flex">
              <div className="xs:-translate-y-16 ">
                <img
                  src={userInfo.image || defaultAvatar}
                  className="w-32 h-32 mx-auto border rounded-full shadow-md xs:mx-0"
                  alt=""
                />
              </div>
              <div className=" justify-between gap-3 flex-1 flex flex-col min-w-[700px]:flex-row">
                <div>
                  <h4 className="text-xl font-semibold xs:text-3xl">
                    {userInfo.displayName}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Join <span className="text-primary">Tl movie</span> at{" "}
                    {handleChangeSecondToDate(
                      userInfo.createdAt && userInfo.createdAt.seconds
                    )}
                  </p>
                </div>
                <span>
                  <Button onClick={() => setEdit(!edit)} className='mx-auto'>
                    <MdModeEditOutline></MdModeEditOutline>Edit profile
                  </Button>
                </span>
              </div>
            </div>
              <Formik
                initialValues={{
                  fullName: userInfo.displayName,
                  password: userInfo.password,
                }}
                onSubmit={(values) => {
                  setLoading(true);
                  setValue(values);
                  handleSubmit(values);
                }}
              >
                {({ errors, touched, setFieldValue }) => {
                  return (
                    <Form
                      className={`flex flex-col gap-2 py-5 duration-300 ${
                        !edit ? "hidden" : "block"
                      }`}
                    >
                      <div className="border-b border-b-gray-500"></div>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="flex-1">
                          <Label className="text-white">Your Full Name</Label>
                          <Input
                            onChange={(e) =>
                              setFieldValue("fullName", e.target.value)
                            }
                            defaultValue={userInfo.fullName}
                            placeholder={userInfo.fullName}
                          ></Input>
                        </div>
                        <div className="flex-1">
                          <Label className="text-white">Your Password</Label>
                          <Input
                            onChange={(e) =>
                              setFieldValue("password", e.target.value)
                            }
                            icon={true}
                            defaultValue={userInfo.password}
                            placeholder={userInfo.password}
                          ></Input>
                        </div>
                      </div>
                      <Label className="text-white">Your avatar</Label>
                      <input
                        type="file"
                        onChange={(e) => {
                          handleSetPreview(e.target.files[0]);
                        }}
                        className="p-3 border rounded-md"
                      />
                      {imagePreview && (
                        <div className="flex items-center justify-center p-5 border">
                          <img
                            src={imagePreview.preview && imagePreview.preview}
                            alt=""
                            width="300px"
                          />
                        </div>
                      )}
                      <span className="flex gap-3 mt-5">
                        {/* <Button outline>Delete account</Button> */}
                        <Button type="submit" loading={loading}>
                          Update
                        </Button>
                      </span>
                    </Form>
                  );
                }}
              </Formik>


              <div className="border-b border-b-gray-500"></div>
              <div className="pt-8 ">
                <h4 className="section-title-primary">
                  My favorite list{" "}
                  <span className="text-gray-500 ">
                    ({listFavorite && listFavorite.length})
                  </span>
                </h4>
                <div className="grid grid-cols-1 gap-10 xs:grid-cols-2 md:grid-cols-3">
                  {listFavorite &&
                    listFavorite.length > 0 &&
                    listFavorite.map((item) => (
                      <MovieCard
                        key={item.id}
                        movieid={item.id}
                        mediaType={item.type}
                      ></MovieCard>
                    ))}
                </div>
              </div>
          </>
        ) : (
          <div className="p-10 text-center">
            You have to{" "}
            <a className="text-primary" href="/log-in">
              sign in
            </a>{" "}
            first!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
