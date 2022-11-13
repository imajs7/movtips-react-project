import { createGlobalStyle } from "styled-components";
import Theme from "./Theme";

export const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        letter-spacing: 0.7px;
    }

    html, body {
        min-height: 100vh;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        font-size: ${Theme.fonts.sizes.base};
        font-family: ${Theme.fonts.styles.paragraph};
        background-color: ${Theme.colors.backcolor};
        color: ${Theme.colors.forecolor};
        overflow-x: hidden;
        scroll-behavior: smooth;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style-type: none;
    }

    body::-webkit-scrollbar {
        width: 5px;
    }
    
    body::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    body::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
        border-radius: 5px;
    }

`;