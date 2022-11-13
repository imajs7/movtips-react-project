import { faArrowCircleLeft, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { v4 } from "uuid";
import IResponse from "../../../models/IResponse";
import ITheme from "../../../models/ITheme";
import apiConfig from "../../../services/apiConfig";
import { getOneMovie } from "../../../services/fetchData";
import { ActionButton } from "../../../styles/ActionButton";
import theme from "../../../styles/Theme";
import { FavoritesContext } from "../../Favorites/FavoritesProvider";
import { NotificationContext } from "../Notifications/NotificationsProvider";


const img_url = apiConfig.originalImgpath;

type StyleProps = {
    theme: ITheme
}

type Params = {
    route: string,
    movieId: string
}

const GoBackDiv = styled.div.attrs(( {theme} : StyleProps ) => theme)`
    margin-block: 20px;
    width: min( 100% - 20px, ${(theme) => theme.screen.desktop} );
    margin-inline: auto;
`;

const SingleMovieDiv = styled.div.attrs(( {theme} : StyleProps ) => theme)`
    width: min( 100% - 20px, ${(theme) => theme.screen.desktop} );
    margin-inline: auto;

    display: flex;
    gap: 30px;
    align-items: center;

    & > div:nth-child(1) {
        flex: 1 1 30%;
    }
    & > div:nth-child(2) {
        flex-grow: 1;
    }

    hr {
        margin-block: 15px;
        opacity: 0.6; 
    }

    img {
        border: 2px solid ${(theme) => theme.colors.forecolor};
        border-radius: 5px;
        box-shadow: 0 0 10px rgb(255 255 255 / 0.4);
    }

    @media screen and ( max-width: ${(theme) => theme.screen.tablet}) {
        flex-direction: column;
    }
    
`;

const ModalDiv = styled.div.attrs(( {theme} : StyleProps ) => theme)`
    position: fixed;
    z-index: 9999999999;
    color: #333;
    background-color: rgb(0 0 0 / 0.8);
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-content: center;

    img {
        border: 2px solid ${(theme) => theme.colors.forecolor};
        border-radius: 5px;
        box-shadow: 0 0 10px rgb(255 255 255 / 0.4);
    }
`;

const SingleMovie = () => {

    const navigate = useNavigate();

    const { route, movieId } = useParams<Params>();

    const [ movie, setMovie] = useState<IResponse | null>(null);

    const [ modal, setModal ] = useState<boolean>(false);

    const dispatch = useContext(NotificationContext);
    
    const { state, dispatch : favDispatch } = useContext( FavoritesContext );

    const goBack = () => {
        navigate(-1);
    }

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

    const addToFavorites = () => {
        const payload = {
            route,
            movieId
        }
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

    useEffect( () => {
            const getSingleMovie = async () => {
                const data = await getOneMovie( route as string, movieId as string );
                setMovie( data );
            };

            getSingleMovie();
        },
        []
    );

    return ( 
        <>
            <GoBackDiv>
                <FontAwesomeIcon icon={faArrowCircleLeft}/>
                &emsp;
                <ActionButton onClick={goBack}>Go Back</ActionButton>
            </GoBackDiv>
            {   movie &&

                <SingleMovieDiv>
                    
                    <div className="img-holder">
                        <img 
                        style={{height: '300px', width: 'auto'}}
                            src={img_url + '/' + movie.poster} 
                            alt="poster" 
                            onClick={(event) => {event.preventDefault(); setModal( true )}}
                        />
                    </div>

                    <div className="detail-holder">
                        <h2>{movie.title}</h2>
                        <hr />
                        <div style={{display: 'flex', gap: '50px'}}>
                            <p>
                                Release Date: {movie.releaseDate}
                            </p>
                            <p>
                                {
                                    Math.round( movie.ratings.reduce(function (x, y) {
                                        return x + y;
                                    }, 0) / movie.ratings.length )
                                    
                                }
                                <FontAwesomeIcon icon={faStar}/>
                            </p>
                        </div>
                        <div style={{marginBlock: '20px'}}>
                            <p>
                                {movie.storyline}
                            </p>
                        </div>

                        <ActionButton 
                            backcolor={theme.colors.accentcolor}
                            forecolor={theme.colors.forecolor}  
                            className="favIcon"
                            onClick={addToFavorites}
                        >
                            Add to favorites <FontAwesomeIcon icon={faHeart}/>
                        </ActionButton>

                    </div>

                </SingleMovieDiv>
            }

            { movie && modal && (
                <ModalDiv onClick={() => setModal( false )}>
                    <img 
                        src={img_url + '/' + movie.poster} 
                        alt="poster" 
                    />
                </ModalDiv>
            )}
        </>
     );
}
 
export default SingleMovie;