import React, { useState, useEffect } from 'react';
import { getMovies } from '../../../services/fetchData';
import IResponse from '../../../models/IResponse';
import MovieCard from '../MovieCard/MovieCard';
import { MovieList } from '../../../styles/MovieList';
import { ActionButton } from '../../../styles/ActionButton';
import { v4 } from 'uuid';
import styled from 'styled-components';
import ITheme from '../../../models/ITheme';

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

type Props = {
    route: string,
    query: string
}

const FilteredList = ( { route, query } : Props ) => {

    const [ movies, setMovies ] = useState<IResponse[]>([]);
    const [ page, setPage ] = useState<number>(1);

    const nextPage = () => {
        setPage( oldValue => Math.min( oldValue + 1, 10 ) );
    };

    const prevPage = () => {
        setPage( oldValue => Math.max( oldValue - 1, 1 ) );
    };

    useEffect( () => {
        const params = {
            _page: page,
            _limit: 20,
            q: query
        }
        const getFilteredMovies= async () => {
            const data = await getMovies( route, params );
            setMovies( data );
        };

        getFilteredMovies();
    }, [page, query, route] );

    return ( 
        <Container>

            <h2>{route.replace( /-/g, ' ').toUpperCase() }</h2>

            <MovieList>
                {
                    movies.length > 0 && (
                        movies.map( movie => (
                            <MovieCard movie={movie} key={v4()} route={route} />
                        ))
                    )
                }
            </MovieList>
            
            <div style={{textAlign: 'center'}}>

                <ActionButton 
                    backcolor="#000" 
                    forecolor="#f2f2f2" 
                    onClick={prevPage}
                    disabled={page <= 1 ? true : false}
                >Previous Page</ActionButton>
                
                <ActionButton 
                    backcolor="#000" 
                    forecolor="#f2f2f2" 
                    onClick={nextPage}
                    disabled={page >= 10 ? true : false}
                >Next Page</ActionButton>
                
            </div>

        </Container>
     );
}
 
export default FilteredList;