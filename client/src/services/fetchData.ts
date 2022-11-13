import axios from "axios";
import apiConfig from "./apiConfig";

type Params = {
    _page : number, 
    _limit: number,
    q: string
};

const getOneMovie = async ( route : string, movieId : string ) => {

    try {
        const response = await axios.get( 
            `${apiConfig.baseUrl}/${route}/${movieId}`,
            {
				headers: {
					'Content-Type': 'application/json'
				},
			}
        );
        return response.data;
    } catch ( error ) {
        console.log ( error as Error );
    }
    
};

const getMovies = async ( route : string, params : Params ) => {

    try {
        const response = await axios.get(
            `${apiConfig.baseUrl}/${route}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
                params: params
			}
        );
        const data = response.data;
        return data;
    } catch ( error ) {
        console.log ( error as Error );
    }
    
};

export {
    getMovies,
    getOneMovie
};