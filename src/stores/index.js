import React, { createContext, useContext } from "react";
import ls from "local-storage";
import { useLocalStore } from "mobx-react-lite";

const createStore = () => {
  return {
    bans: ls.get("bans") || [],
    preset: "My Bans",
    toggleBan(id) {
      let newBans;

      if (this.bans.includes(id)) {
        newBans = this.bans.filter(item => item !== id);
      } else {
        newBans = [...this.bans, id];
      }

      if (this.preset === "My Bans") {
        ls.set("bans", newBans);
      }

      this.bans = newBans;
    },
    resetBans() {
      ls.set("bans", []);
      this.bans = [];
    },
    setBans(bans) {
      this.bans = bans;
    },
    setPreset(preset) {
      this.preset = preset;
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
