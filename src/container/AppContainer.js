import React, { useState } from "react";
import champsJson from "../data/champs_9.14.1";
import {
  Header,
  Button,
  Container,
  Icon,
  Input,
  Checkbox,
  Popup,
  Segment
} from "semantic-ui-react";
import ls from "local-storage";
import debounce from "lodash.debounce";
import { ModalButton } from "../components/ModalButton";
import { Grid } from "../container/Grid";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../stores";
import GithubCorner from "react-github-corner";

const PATCH_VERSION = "9.14.1";

const CHAMP_URL = `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/champion/`;

const champs = Object.keys(champsJson.data).map(k => ({
  id: champsJson.data[k].key,
  name: champsJson.data[k].name,
  image: CHAMP_URL + champsJson.data[k].image.full
}));

export default function() {
  const [chosenChamp, setChosenChamp] = useState({});
  const [bansVisible, setBansVisible] = useState(true);
  const [textFilter, setTextFilter] = useState("");

  const store = useStore();

  const filterByText = debounce(text => setTextFilter(text), 300);

  const findChamp = () => {
    const bans = ls.get("bans") || [];
    const rand = Math.floor(Math.random() * (champs.length - bans.length));
    const champ = champs
      .filter(i => !bans.includes(i.id))
      .find((_, index) => index === rand);
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
          content="Click champs to ban or unban"
          trigger={<Icon name="info" circular inverted color="grey" />}
        />
      </Container>
      <Container className="controls" fluid>
        <Input
          placeholder="Search..."
          icon={
            <Icon
              name="close"
              color="grey"
              inverted
              circular
              link
              onClick={() => {
                setTextFilter("");
              }}
            />
          }
          onChange={e => filterByText(e.target.value)}
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
          trigger={<Button icon="refresh" onClick={() => store.resetBans()} />}
        />
      </Container>
      <Grid champs={champs} showBans={bansVisible} filterText={textFilter} />
      <Container textAlign="center" style={{ margin: "20px 0 0 0" }}>
        <Segment inverted>
          This is a fan project, all champion images belong to Riot Games |
          Background wallpaper by{" "}
          <a href="http://www.lol-wallpapers.com/wp-content/uploads/2016/12/Bilgewater-Approach.jpg">
            lol-wallpapers.com
          </a>
        </Segment>
      </Container>
      <GithubCorner href="https://github.com/y-ahlers/roll-q" size={60} />
    </Container>
  ));
}
