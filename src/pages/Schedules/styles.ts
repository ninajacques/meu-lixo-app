import styled from "styled-components";

export const Container = styled.div`
  grid-area: main;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  padding: 32px;

  @media only screen and (min-width: 768px) {
    height: calc(100vh - 50px);
    width: calc(100vw - 150px);
    padding: 32px 200px;
  }
`;

export const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: #712eff;
  padding: 16px;
  border-bottom: 1px solid #712eff;
`;

export const ScheduleSection = styled.div`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  margin-bottom: 48px;
  margin-top: 50px;
`
