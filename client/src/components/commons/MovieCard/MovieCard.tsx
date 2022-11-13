import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IResponse from "../../../models/IResponse";
import apiConfig from "../../../services/apiConfig";
import { ActionButton } from "../../../styles/ActionButton";
import { MovieCardDiv } from "../../../styles/MovieCardDiv";
import theme from "../../../styles/Theme";
import { NotificationContext } from "../Notifications/NotificationsProvider";
import { v4 } from "uuid";
import { useContext, MouseEvent } from "react";
import { FavoritesContext } from "../../Favorites/FavoritesProvider";
import { Link } from "react-router-dom";

const img_url = apiConfig.originalImgpath;

type Props = {
    movie: IResponse,
    route: string
};

type Payload = {
    route: string,
    movieId: string
}

const MovieCard = ( { movie, route } : Props ) => {

    const dispatch = useContext(NotificationContext);
    const { state, dispatch : favDispatch } = useContext( FavoritesContext );

    const addNotice = ( added : boolean ) => {
        if( added ) {
            dispatch({
                type: 'ADD',
                payload: {
                    id: v4(),
                    type: 'SUCCESS',
                    message: 'Added to favorites'
                }
            })
        } else {
            dispatch({
                type: 'ADD',
                payload: {
                    id: v4(),
                    type: 'ERROR',
                    message: 'Already in favorites'
                }
            })
        }
    };

    const addToFavorites = ( event : MouseEvent<HTMLButtonElement>, payload : Payload ) => {
        event.preventDefault();
        if( state.filter( item => {
            if( item.route === payload.route && item.movieId === payload.movieId ) {
                return true;
            }
            return false
        }).length > 0 ) {
            addNotice( false );
        } else {
            favDispatch({
                type: 'ADD',
                payload: payload
            })
            addNotice( true );
        }
    };

    return ( 
        <MovieCardDiv>
            <Link to={`/movie/${route}/${movie.id}`}>
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
                        onClick={(event) => addToFavorites( event,{route: route, movieId: movie.id})}
                    >
                        Add to favorites <FontAwesomeIcon icon={faHeart}/>
                    </ActionButton>
                </div>

            </Link>
        </MovieCardDiv>
     );
}
 
export default MovieCard;