import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ITheme from "../../../models/ITheme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

type StyleProps = {
    theme: ITheme
}

const Logodiv = styled.div.attrs(( {theme} : StyleProps ) => theme)`
    border: 2px solid ${(theme) => theme.colors.accentcolor};
    border-radius: 0 10px 0 10px;
    padding: 6px;
    text-transform: uppercase;
    font-family: ${(theme) => theme.fonts.styles.heading};
    font-weight: 700;

    a {
        color: ${(theme) => theme.colors.accentcolor};
    }

    .icon {
        font-size: 16px;
        margin-inline: 2px;
    }
`;

const Logo = () => {
    return ( 
        <Logodiv>
            <Link to="/">Mo<FontAwesomeIcon icon={faVideo} className="icon"/>tips</Link>
        </Logodiv>
     );
}
 
export default Logo;