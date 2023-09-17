import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.header`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #712eff;
    height: 50px;
    overflow: hidden;
    width: 100%;
    padding: 20px 10px;
    position: fixed;
    top: 0;
    z-index: 9;

    @media only screen and (min-width: 768px) {
      position: relative;
    }
`;

export const LogoText = styled(Link)`
    font-weight: 600;
    color: white;
    text-decoration: none;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;