import { ReactNode, createContext, useReducer, Dispatch } from "react";
import styled from "styled-components";
import INotice from "../../../models/INotice";
import Notifications from "./Notifications";

type Props = {
    children: ReactNode
}

type Action = {
    type: string;
    payload: INotice;
}

type State = Array<INotice>;

const INITIAL_STATE = (
    () => undefined
) as Dispatch<any>;

export const NotificationContext = createContext( INITIAL_STATE );

const NotificationWrapper = styled.div`
    z-index: 99999;
    position: fixed;
    top: 20px;
    right: 20px;
    width: 250px;
`;

const NotificationsProvider = ( { children } : Props ) => {

    const noticeReducer = (state : State, action : Action) => {
        const { type, payload } = action;
        switch( type ) {
            case 'ADD':
                return [ ...state, {...payload} ];
            case 'REMOVE':
                return state.filter( notice => notice.id !== payload.id);
            default:
                return state;
        }
    };

    const [ state, dispatch ] = useReducer( noticeReducer, [] );
    
    return ( 
        <NotificationContext.Provider value={dispatch}>
            <NotificationWrapper>
                {
                    state.map( (notice : INotice) => (
                        <Notifications {...notice} key={notice.id} />
                    ) )
                }
            </NotificationWrapper>
            {children}
        </NotificationContext.Provider>
     );
}
 
export default NotificationsProvider;