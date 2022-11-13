import React from "react";
import styled from "styled-components";
import { ActionButton } from "../../../styles/ActionButton";
import { useMediaQuery } from 'react-responsive'
import Menuitems from "./Menuitems";
import theme from "../../../styles/Theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Mobilemenu = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 300px;
    background-color: rgb(0 0 0);
    box-shadow: 5px 0 10px rgb(0 0 0 / 0.4);
    padding: 20px;
    z-index: 9999;

    a {
        display: block;
        width: 100%;
        text-align: left;
    }
`;

type Props = {
    panel: boolean,
    panelHandle: () => void
}

const Navbar = ( {panel, panelHandle} : Props ) => {

    const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${theme.screen.tablet})` })

    return ( 
        <>
            {
                panel && isTabletOrMobile && (
                    <Mobilemenu>
                        <ActionButton 
                            backcolor="#000" 
                            forecolor="#ff0000" 
                            className="close"
                            onClick={panelHandle}
                            style={{ fontSize: '24px' }}
                        ><FontAwesomeIcon icon={faTimes}/></ActionButton>
                        <Menuitems panelHandle={panelHandle} />
                    </Mobilemenu>
                )
            }
            {
                !isTabletOrMobile && (
                    <div>
                        <Menuitems/>
                    </div>
                )
            }
        </>
     );
}
 
export default Navbar;