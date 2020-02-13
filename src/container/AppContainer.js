import React, { useState, useRef } from "react";
import champsJson from "../data/champs_10.3.1";
import presets from "../data/presets";
import {
  Header,
  Button,
  Container,
  Icon,
  Input,
  Checkbox,
  Popup,
  Segment,
  Dropdown
} from "semantic-ui-react";
import ls from "local-storage";
import debounce from "lodash.debounce";
import { ModalButton } from "../components/ModalButton";
import { Grid } from "../container/Grid";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../stores";
import GithubCorner from "react-github-corner";

const PATCH_VERSION = "10.3.1";

const CHAMP_URL = `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/champion/`;

const champs = Object.keys(champsJson.data).map(k => ({
  id: champsJson.data[k].key,
  name: champsJson.data[k].name,
  image: CHAMP_URL + champsJson.data[k].image.full
}));

const presetOptions = [
  { key: "My Bans", text: "My Bans", value: "My Bans" },
  ...Object.keys(presets).map(k => ({
    key: k,
    text: k,
    value: k
  }))
];

export default function() {
  const [chosenChamp, setChosenChamp] = useState({});
  const [bansVisible, setBansVisible] = useState(true);
  const [textFilter, setTextFilter] = useState("");

  const store = useStore();

  const searchInput = useRef(null);

  const resetSearch = () => {
    setTextFilter("");
    searchInput.current.inputRef.current.value = "";
  };

  const filterByText = debounce(text => setTextFilter(text), 300);

  const handlePresetChange = (e, { value }) => {
    store.setPreset(value);
    const newBans = value === "My Bans" ? ls.get("bans") || [] : presets[value];
    store.setBans(newBans);
  };

  const findChamp = () => {
    const rand = Math.floor(
      Math.random() * (champs.length - store.bans.length)
    );
    let champ = champs
      .filter(i => !store.bans.includes(i.id))
      .find((_, index) => index === rand);

    if (!champ) {
      champ = champs.find(c => c.id === "17");
    }

    setChosenChamp(champ);
  };

  return useObserver(() => (
    <Container fluid>
      <Container textAlign="center" style={{ marginTop: 10 }}>
        <Header
          as="h1"
          size="huge"
          content="rollQ"
          subheader="aka Würfel-Queue"
          inverted
          style={{ margin: 10, fontSize: 66 }}
        />
        <Button
          color="violet"
          as="a"
          href="https://www.twitch.tv/noway4u_sir"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="twitch" link />
          /noway4u_sir
        </Button>
      </Container>
      <Container textAlign="center" style={{ margin: "30px 0" }}>
        <ModalButton
          onClick={() => findChamp()}
          image={chosenChamp.image}
          name={chosenChamp.name}
        />
        <Popup
          content="Click champs to ban or unban. If you ban everthing you'll play Teemo, I warned you!"
          trigger={<Icon name="info" circular inverted color="grey" />}
        />
      </Container>
      <Container className="controls" fluid>
        <Input
          ref={searchInput}
          placeholder="Search..."
          icon={
            <Icon
              name="close"
              color="grey"
              inverted
              circular
              link
              onClick={resetSearch}
            />
          }
          onChange={e => filterByText(e.target.value)}
        />
        <Dropdown
          selection
          placeholder="Presets"
          onChange={handlePresetChange}
          options={presetOptions}
          value={store.preset}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Checkbox
            toggle
            checked={bansVisible}
            onChange={() => setBansVisible(!bansVisible)}
          />
          <p style={{ marginLeft: 15 }}>Show Banned Champs</p>
        </div>
        <Popup
          content="Reset all bans"
          trigger={
            <Button
              icon="refresh"
              onClick={() => {
                store.resetBans();
              }}
              disabled={store.preset !== "My Bans"}
            />
          }
        />
      </Container>
      <Grid champs={champs} showBans={bansVisible} filterText={textFilter} />
      <Container textAlign="center" style={{ margin: "20px 0 0 0" }}>
        <Segment inverted>
          This is a fan project, all champion images and splash arts belong to
          Riot Games
        </Segment>
      </Container>
      <GithubCorner href="https://github.com/y-ahlers/roll-q" size={60} />
    </Container>
  ));
}
