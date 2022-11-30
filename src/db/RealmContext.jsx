import axios from "axios";
import React from "react";
import * as Realm from "realm-web";

function createRealmApp(id) {
  return new Realm.App({ id });
}

const RealmAppContext = React.createContext(null);

export function RealmAppProvider({ appId, children }) {
  // Store Realm.App in React state. If appId changes, all children will rerender and use the new realmApp.

  const [realmApp, setRealmApp] = React.useState(createRealmApp(appId));
  React.useEffect(() => {
    const app = createRealmApp(appId);
    // console.log("App user", app.currentUser.profile);
    setCurrentUser(app.currentUser);
    setRealmApp(app);
  }, [appId]);
  // Store the app's current user in state and wrap the built-in auth functions to modify this state
  const [currentUser, setCurrentUser] = React.useState(realmApp.currentUser);
  const [user, setUser] = React.useState(null);
  // Wrap the base logIn function to save the logged in user in state

  React.useEffect(() => {
    if (!currentUser) return setUser(null);
    axios
      .get("http://localhost:3003/api/user/" + currentUser._profile.data.email)
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  const logIn = React.useCallback(
    async (email, password, rest) => {
      // console.log(email, password);
      const credentials = Realm.Credentials.emailPassword(email, password);
      await realmApp.logIn(credentials);
      // console.log(realmApp.currentUser);
      setCurrentUser(realmApp.currentUser);
      setUser({
        email,
        ...rest,
      });
    },
    [realmApp]
  );
  // Wrap the current user's logOut function to remove the logged out user from state
  const logOut = React.useCallback(async () => {
    setCurrentUser(null);
    setUser(null);
    localStorage.removeItem("activeProfile");
    await currentUser?.logOut();
    await realmApp.removeUser(currentUser);
  }, [realmApp, currentUser]);

  const signup = React.useCallback(
    async (email, password, rest) => {
      // console.log("signup", email, password);
      const credentials = JSON.stringify({ email, password });
      try {
        await realmApp.emailPasswordAuth.registerUser(credentials);
        // console.log("User", user);
        await logIn(email, password, rest);
      } catch (error) {
        console.log("signup error", error);
      }
    },
    [realmApp]
  );

  const googleAuth = React.useCallback(
    async (code) => {
      const credentials = Realm.Credentials.google(code);
      // console.log(credentials);
      try {
        // Authenticate the user
        const user = await realmApp.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === realmApp.currentUser.id);
        return user;
      } catch (err) {
        console.error("Failed to log in", err);
      }
    },
    [realmApp]
  );

  // Override the App's currentUser & logIn properties + include the app-level logout function
  const realmAppContext = React.useMemo(() => {
    return {
      ...realmApp,
      currentUser,
      setCurrentUser,
      logIn,
      logOut,
      signup,
      googleAuth,
      user,
      setUser,
    };
  }, [realmApp, currentUser, logIn, logOut, signup, googleAuth, user, setUser]);

  return (
    <RealmAppContext.Provider value={realmAppContext}>
      {children}
    </RealmAppContext.Provider>
  );
}

export function useRealmContext() {
  const realmApp = React.useContext(RealmAppContext);
  if (!realmApp) {
    throw new Error(
      `No Realm App found. Make sure to call useRealmApp() inside of a <RealmAppProvider />.`
    );
  }
  return realmApp;
}
