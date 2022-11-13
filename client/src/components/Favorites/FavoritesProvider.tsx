import { createContext, useReducer, ReactNode, Dispatch } from "react";

type Props = {
    children: ReactNode
}

type Payload = {
    route: string,
    movieId: string
}

type Action = {
    type: string;
    payload: Payload;
}

type State = Array<Payload>;

type ContextState = {
    state: State,
    dispatch: Dispatch<any>
}

const INITIAL_VALUE : State = [];

const INITIAL_CONTEXT = {
    state: INITIAL_VALUE,
    dispatch: () => null
};

export const FavoritesContext = createContext<ContextState>( INITIAL_CONTEXT );

const FavoritesProvider = ( { children } : Props ) => {

    const favoritesReducer = (state : State, action : Action) => {

        const { type, payload } = action;

        switch( type ) {
            case 'ADD':
                return [ ...state, payload ];
            case 'REMOVE':
                return state.filter( item => {
                    if( item.movieId === payload.movieId && item.route === payload.route ) {
                        return false;
                    }
                    return true;
                });
            default:
                return state;
        }
    };

    const [ state, dispatch ] = useReducer( favoritesReducer, [] );

    return ( 
        <>
            <FavoritesContext.Provider value={{state, dispatch}}>
                {children}
            </FavoritesContext.Provider>
        </>
     );
}
 
export default FavoritesProvider;