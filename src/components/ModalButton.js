import React from "react";
import { Button, Container, Modal, Image } from "semantic-ui-react";

export const ModalButton = ({ onClick, image, name }) => {
  return (
    <Modal
      basic
      dimmer="blurring"
      trigger={
        <Button
          content="CHOOSE YOUR DESTINY"
          icon={{ name: "random" }}
          negative
          onClick={() => onClick && onClick()}
        />
      }
    >
      <Modal.Content>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Image className="revealed-champ" size="medium" src={image} />
          <p className="revealed-champ-name">{name}</p>
        </Container>
      </Modal.Content>
    </Modal>
  );
};
