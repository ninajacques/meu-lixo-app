import styled from "styled-components";

export const Container = styled.nav`
    grid-area: menu;
    height: 50px;
    display: flex;
    box-shadow: 0 -3px 12px rgb(0 0 0 / 20%);
    padding-top: 4px;
    position: fixed;
    z-index: 9;
    background-color: #fff;
    width: 100%;
    bottom: 0;    

    @media only screen and (min-width: 768px) {
        height: 100%;
        width: 150px;
        flex-direction: column;
        padding: 28px 16px;
        gap: 28px;
        position: relative;
    }
`;