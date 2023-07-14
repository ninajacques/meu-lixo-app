import styled from "styled-components";
import { Link } from "react-router-dom";

export const IconColor = '#712eff';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`

export const Text = styled.p`
    color: ${IconColor};
`

export const LinkStyled = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: ${IconColor};

  @media only screen and (max-width: 767px) {
    flex-grow: 1;
  }
`