import { LinkButton } from "../../../styles/LinkButton";

type Props = {
    panelHandle?: () => void
};

const Menuitems = ( { panelHandle } : Props ) => {
    return ( 
        <>
            <LinkButton 
                to="/movies-in-theaters" 
                backcolor="#000"
                onClick={panelHandle}
            >Movies In Theatre</LinkButton>

            <LinkButton 
                to="/movies-coming" 
                backcolor="#000" 
                onClick={panelHandle}
            >Coming Soon</LinkButton>

            <LinkButton 
                to="/top-rated-india" 
                backcolor="#000" 
                onClick={panelHandle}
            >Top Rated Indian</LinkButton>

            <LinkButton 
                to="/top-rated-movies" 
                backcolor="#000"
                onClick={panelHandle}
            >Top Rated Movies</LinkButton>

            <LinkButton 
                to="/favorites" 
                backcolor="#000"
                onClick={panelHandle}
            >Favorites</LinkButton>

        </>
     );
}
 
export default Menuitems;