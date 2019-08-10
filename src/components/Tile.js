import React from "react";
import { Icon, Popup } from "semantic-ui-react";

export default function({ id, image, name, onClick, banned }) {
  return (
    <div onClick={() => onClick && onClick(id)}>
      <Popup
        content={name}
        inverted
        position="bottom center"
        trigger={
          <img
            className="champ"
            width={75}
            height={75}
            src={image}
            alt="nüx"
            style={{ boxShadow: "2px 2px 5px black", borderRadius: 5 }}
          />
        }
      />

      <div className="forbid" hidden={!banned}>
        <Icon
          name="close"
          color="red"
          size="huge"
          style={{ textShadow: "2px 2px 5px black" }}
        />
      </div>
    </div>
  );
}
