import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import { db } from '../firebase/firebase.config';

const useGetUser = () => {
  const data = collection(db, "users");
  const { userInfo } = useAuth();
  const [user, setUser] = useState("");
  useEffect(() => {
    onSnapshot(data, (snapshot) => {
      let temp = snapshot.docs
        .map((item) => {
          return {
            id: item.id,
            ...item.data(),
          };
        })
        .find((item) => item.email === userInfo.email);
      setUser(temp);
    });
  },[userInfo]);

  return user
};

export default useGetUser;