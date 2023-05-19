import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import ForestNight from "./Component/ForestNight";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  height: 100%;
`;
const SectionDevider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-color: black;
`;
const GrassImage = styled.img`
  position: absolute;
  top: -300px;
  left: ${(props) => {
    return props.Left + "px";
  }};
  right: ${(props) => {
    return props.Right + "px";
  }};
  height: 300px;
  z-index: 10;
`;

function App() {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      setPosition(window.scrollY);
    });
    return () => {
      document.removeEventListener("scroll", () => {
        setPosition(window.scrollY);
      });
    };
  }, []);
  return (
    <Container>
      <ForestNight position={position} />
      <SectionDevider>
        <GrassImage src="./grass 1.png" alt="Grass" Left={-3} Deg={0} />
        <GrassImage src="./grass 2.png" alt="Grass" Deg={180} />
        <GrassImage src="./grass 2.png" alt="Grass" Right={0} Deg={180} />
      </SectionDevider>
    </Container>
  );
}

export default App;
