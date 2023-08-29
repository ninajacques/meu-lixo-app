import styled from "styled-components";

export const Container = styled.div`
  grid-area: main;
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    height: calc(100vh - 50px);
    width: calc(100vw - 150px);
  }
`;
