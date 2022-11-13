import { useContext } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { MovieList } from "../../styles/MovieList";
import MovieCardWithRemove from "../commons/MovieCard/MovieCardWithRemove";
import { FavoritesContext } from "./FavoritesProvider";
import ITheme from '../../models/ITheme';

type StyleProps = {
    theme: ITheme
}

const Container = styled.div.attrs(( {theme} : StyleProps ) => theme)`
    margin-block: 10px;
    width: min( 100% - 20px, ${(theme) => theme.screen.desktop} );
    margin-inline: auto;

    h2 {
        text-align: center;
    }
`;

const NoDataDiv = styled.div`
    min-height: 300px;
    display: grid;
    place-content: center;
`;

const Favorites = () => {
    
    const { state } = useContext( FavoritesContext );

    return ( 
        <Container>
            <h2>FAVORITES</h2>

            { state.length > 0 ? (
                <MovieList>
                    {
                        state.map( movie => (
                            <MovieCardWithRemove key={v4()} favMovie={movie} />
                        ))
                    }
                </MovieList>
            ) : (
                <NoDataDiv>
                    <h3>No data found!</h3>
                </NoDataDiv>
            )

            }
        </Container>
     );
}
 
export default Favorites;