import { useState, useEffect } from "react";
import { ActionButton } from "../../../styles/ActionButton";
import {getOneMovie} from '../../../services/fetchData';
import theme from "../../../styles/Theme";
import IResponse from "../../../models/IResponse";
import styled from "styled-components";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiConfig from "../../../services/apiConfig";
import ShowDummy from "./ShowDummy";
import { LinkButton } from "../../../styles/LinkButton";

const img_url = apiConfig.originalImgpath;

const BannerDiv = styled.div`
    position: relative;
    height: 400px;
    background-color: inherit;
    background-size: cover;
    background-position: center center;

    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(rgb(0,0,0,0.3), rgb(0,0,0,1));
        opacity: 1;

        display: grid;
        place-content: center;
    } 

    .container {
        width: min(100% - 20px, 900px);
        margin-inline: auto;
    }

    .title {
        font-weight: 900;
        font-size: 2rem;
        margin-bottom: 0.4rem;
    }
    
    .runtime {
        width: min(100%, 200px);
        font-size: .75rem;
        margin-block-end: 0.25rem;
        display: flex;
        justify-content: space-between;
    }

    .description {
        font-style: italic;
        font-size: .75rem;
        margin-bottom: 0.25rem;
    }
`;

type Props = {
    route: string
}

const Hero = ( {route} : Props ) => {

    const [ latest, setLatest ] = useState<IResponse | null>(null);
    const [ showDummy, setShowDummy ] = useState<boolean>( false );

    const dummyEnabler = () => {
        setShowDummy( true );
    };

    const dummyDisabler = () => {
        setShowDummy( false );
    };

    useEffect( () => {
        const getLatestForHero = async () => {
            const data = await getOneMovie( route, '1' );
            setLatest( data );
        };

        getLatestForHero();
    }, [] );

    const bannerImage = {
        backgroundImage: 'url("' + `${img_url}/${latest?.poster}` + '")'
    };

    return ( 
        <>
            { showDummy && 
                (<ShowDummy dummyDisabler={dummyDisabler}/>)
            }

            { latest ? (
                <BannerDiv style={bannerImage}>

                    <div className="overlay">

                        <div className="container">

                            <h1 className="title">{latest?.title}</h1>

                            <h3 className="runtime">
                                {latest?.releaseDate}
                                <span>
                                    {Math.round( latest.ratings.reduce(function (x, y) {
                                                                return x + y;
                                                            }, 0) / latest.ratings.length )}
                                    <FontAwesomeIcon icon={faStar}/>
                                </span>
                            </h3>
                            <div className="description">
                                {latest?.storyline.slice(0,118)+"..."}
                            </div>

                            <ActionButton 
                                backcolor={theme.colors.accentcolor}
                                forecolor={theme.colors.forecolor} 
                                onClick={dummyEnabler}
                            >Watch Now</ActionButton>

                            <LinkButton
                                to={`/movie/${route}/${latest.id}`}
                            >Show Details</LinkButton>

                        </div>

                    </div>

                </BannerDiv>
            ) : ''}
        </>
     );
}
 
export default Hero;