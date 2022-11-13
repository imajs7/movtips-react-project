import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IResponse from "../../../models/IResponse";
import apiConfig from "../../../services/apiConfig";
import { ActionButton } from "../../../styles/ActionButton";
import { MovieCardDiv } from "../../../styles/MovieCardDiv";
import theme from "../../../styles/Theme";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../../Favorites/FavoritesProvider";
import { getOneMovie } from "../../../services/fetchData";

const img_url = apiConfig.originalImgpath;

type Payload = {
    route: string,
    movieId: string
}

type Props = {
    favMovie : Payload
}

const MovieCardWithRemove = ( { favMovie } : Props ) => {

    const { dispatch : favDispatch } = useContext( FavoritesContext );
    const [ movie, setMovie ] = useState<IResponse | null>(null)

    const removeFromFavorites = ( payload : Payload ) => {
        favDispatch({
            type: 'REMOVE',
            payload: payload
        })
    };

    useEffect(
        () => {
            const getMovie = async () => {
                let fetchedMovie = await getOneMovie( favMovie.route, favMovie.movieId );
                setMovie( fetchedMovie );
            }

            getMovie();
        },
        []
    );

    return ( 
        <>
            { movie &&
                <MovieCardDiv>
                    
                    <img src={`${img_url}/${movie?.poster}`} alt="poster" />
                    <div className="overlay">
    
                        <div className="title">{movie?.title}</div>
                        <div className="runtime">
                            {movie?.releaseDate}
                            <div>
                                {Math.round( movie.ratings.reduce(function (x, y) {
                                                                return x + y;
                                                            }, 0) / movie.ratings.length )}
                                <FontAwesomeIcon icon={faStar}/>
                            </div>
                        </div>
                        <div className="description">
                            {movie?.storyline.slice(0,118)+"..."}
                        </div>
                        <ActionButton 
                            backcolor={theme.colors.accentcolor}
                            forecolor={theme.colors.forecolor}  
                            className="favIcon"
                            onClick={() => removeFromFavorites( {route: favMovie.route, movieId: favMovie.movieId} )}
                        >
                            Remove favorite <FontAwesomeIcon icon={faTimes}/>
                        </ActionButton>
                    </div>
                </MovieCardDiv>
            }
        </>
     );
}
 
export default MovieCardWithRemove;