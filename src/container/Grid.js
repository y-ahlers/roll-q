import React from "react";
import StackGrid, { transitions } from "react-stack-grid";
import Tile from "../components/Tile";

import { useObserver } from "mobx-react-lite";
import { useStore } from "../stores";

export const Grid = ({ showBans, champs, filterText }) => {
  const { fade, scaleUp } = transitions;

  const store = useStore();

  // const [bans, setBans] = useState(() => ls.get("bans") || []);

  // const toggleBan = id => {
  //   const bans = ls.get("bans") || [];

  //   if (bans.includes(id)) {
  //     const newBans = bans.filter(item => item !== id);
  //     ls.set("bans", newBans);
  //     setBans(newBans);
  //   } else {
  //     const newBans = [...bans, id];
  //     ls.set("bans", newBans);
  //     setBans(newBans);
  //   }
  // };

  const filterByBans = c => showBans || !store.bans.includes(c.id);
  const filterByName = c =>
    filterText ? c.name.toLowerCase().includes(filterText.toLowerCase()) : true;
  const filters = c =>
    [filterByName, filterByBans].reduce((d, f) => d.filter(f), c);

  return useObserver(() => (
    <StackGrid
      columnWidth={75}
      appear={fade.appear}
      enter={scaleUp.enter}
      style={{ margin: "0 50px" }}
      monitorImagesLoaded={false}
    >
      {filters(champs).map(i => (
        <Tile
          key={i.id}
          {...i}
          onClick={id => store.toggleBan(id)}
          banned={store.bans.includes(i.id)}
        />
      ))}
    </StackGrid>
  ));
};
