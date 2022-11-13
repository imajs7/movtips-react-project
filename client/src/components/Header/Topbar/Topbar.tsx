import styled from "styled-components";
import ITheme from "../../../models/ITheme";
import Logo from "../../commons/Logo/Logo";
import Navbar from "./Navbar";
import { ChangeEvent, useState } from "react";
import { ActionButton } from "../../../styles/ActionButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

type StyleProps = {
    theme: ITheme
};

type Props = {
    query: string,
    queryHandler: (event : ChangeEvent<HTMLInputElement>) => void
}

const TopbarMenu = styled.nav.attrs(( {theme} : StyleProps ) => theme)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    background-color: #000;
    padding-inline: ${(theme) => theme.margin.base};

    .leftDiv {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: ${(theme) => theme.margin.medium};
        position: relative;

        button.open {
            display: none;
            @media screen and (max-width: 998px) {
                display: inline-block;
            }
        }
    }

    input[type=search] {
        outline: none;
        border: none;
        appearance: none;
        padding: ${(theme) => theme.padding.small};
        background-color: #333;
        color: ${(theme) => theme.colors.forecolor};
        border-radius: 2px;
        font-size: ${(theme) => theme.fonts.sizes.base};

        &::placeholder {
            color: white;
        }
    }
`;

const Topbar = ( { query, queryHandler } : Props ) => {

    const [ sidePanel, setSidePanel ] = useState<boolean>( false );

    const toggleSidePanel = () => {
        setSidePanel( (prevState) => !prevState );
    };

    return ( 
        <TopbarMenu>
            <div className="leftDiv">
                <ActionButton
                    backcolor="#000" 
                    forecolor="#f2f2f2" 
                    className="open" 
                    onClick={toggleSidePanel}
                ><FontAwesomeIcon icon={faBars}/></ActionButton>
                <Logo/>
                <Navbar panel={sidePanel} panelHandle={toggleSidePanel} />
            </div>
            <div className="rightDiv">
                <input
                    type="search" 
                    placeholder="Search..."
                    value={query}
                    onChange={queryHandler}
                 />
            </div>
        </TopbarMenu>
     );
}
 
export default Topbar;