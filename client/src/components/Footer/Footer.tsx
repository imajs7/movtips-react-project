import styled from "styled-components";
import ITheme from "../../models/ITheme";
import Logo from "../commons/Logo/Logo";

type StyleProps = {
    theme: ITheme
}

const Footerdiv = styled.div.attrs(( {theme} : StyleProps ) => theme)`

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
    margin-block-start: 40px;

    .copyright {
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        @media screen and (max-width: ${(theme) => theme.screen.mobile}) {
            flex-direction: column;
        }

        a {
            color: ${(theme) => theme.colors.forecolor};
            &:hover {
                opacity: 0.8;
            }
        }

    }
`;

const Footer = () => {
    return ( 
        <Footerdiv>
            <Logo/>

            <div className="copyright">
                <div>&copy; Copyright {(new Date()).getFullYear()} Movtips.</div>
                <div>Developed by <a href="https://github.com/imajs7" target="_blank" rel="noreferrer">Anurag Jaisingh</a></div>
            </div>
        </Footerdiv>
     );
}
 
export default Footer;