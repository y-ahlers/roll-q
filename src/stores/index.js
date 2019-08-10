import React, { createContext, useContext } from "react";
import ls from "local-storage";
import { useLocalStore } from "mobx-react-lite";

const createStore = () => {
  return {
    bans: ls.get("bans") || [],
    toggleBan(id) {
      if (this.bans.includes(id)) {
        const newBans = this.bans.filter(item => item !== id);
        ls.set("bans", newBans);
        this.bans = newBans;
      } else {
        const newBans = [...this.bans, id];
        ls.set("bans", newBans);
        this.bans = newBans;
      }
    },
    resetBans() {
      ls.set("bans", []);
      this.bans = [];
    }
  };
};

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createStore);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("You have forgot to use StoreProvider, shame on you.");
  }
  return store;
};
