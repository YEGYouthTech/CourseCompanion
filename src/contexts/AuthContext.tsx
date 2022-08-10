import type { User } from 'firebase/auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import auth from '../lib/firebase';

type IAuthContextProviderProps = {
  children: React.ReactNode;
};

type IAuthContext = {
  googleSignIn: () => void;
  logOut: () => void;
  user: User | null;
};

const AuthContext = createContext<IAuthContext>({
  googleSignIn: () => {},
  logOut: () => {},
  user: null,
});

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const googleSignIn = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);
      console.log(newUser?.displayName, newUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
