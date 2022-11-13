import { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import INotice from "../../../models/INotice";
import ITheme from "../../../models/ITheme";
import { NotificationContext } from "./NotificationsProvider";

type StyleProps = {
    theme: ITheme
}

const SlideFromLeft = keyframes`
    0% { margin-left: 120% }
    100% { margin-left: 0 }
`;

const SlideToRight = keyframes`
    0% { margin-left: 0 }
    100% { margin-left: 120% }
`;

const NotificationDiv = styled.div.attrs(( {theme} : StyleProps ) => theme)`
    border-radius: 6px;
    box-shadow: 3px 3px 8px rgb(0 0 0 / 0.8);
    background-color: ${(theme) => theme.colors.forecolor};
    overflow: hidden;
    margin-block: 10px;
    cursor: pointer;
    width: 100%;
    animation-name: ${SlideFromLeft};
    animation-duration: 500ms;
    animation-fill-mode: forwards;

    .message {
        color: ${(theme) => theme.colors.backcolor};
        margin: 8px;
        font-weight: 600;
    }

    .progress-bar {
        height: 4px;
        width: 100%;
    }

    &.success .progress-bar {
        background-color: ${(theme) => theme.colors.successcolor};
    }

    &.error .progress-bar {
        background-color: ${(theme) => theme.colors.errorcolor};
    }

    &.unload {
        animation-name: ${SlideToRight};
        animation-duration: 400ms;
        animation-fill-mode: forwards;
    }

`;

const Notifications = ( { id, type, message } : INotice ) => {

    const dispatch = useContext(NotificationContext);
    const [ progress, setProgress ] = useState<number>( 0 );
    const [ intervalId, setIntervalId ] = useState<ReturnType<typeof setInterval> | undefined>( undefined );
    const [ unload, setUnload ] = useState<boolean>( false );

    const handlePauseProgress = () => {
        clearInterval( intervalId );
    };

    const handleUnloadNotice = () => {
        handlePauseProgress();
        setUnload(true);
        setInterval(
            () => {
                dispatch({
                    type: 'REMOVE',
                    payload: {
                        id: id
                    }
                })
            }
        , 1000);
    };

    const handleStartProgress = () => {
        const timerId : ReturnType<typeof setInterval> = setInterval( () => {
            setProgress( (oldValue) => {
                if( oldValue < 100 ) {
                    return oldValue + 0.5;
                }
                handlePauseProgress();
                return oldValue;
            } );
        }, 20 );
        setIntervalId( timerId );
    };

    useEffect( () => { 
        handleStartProgress();
        }, []
    );

    useEffect( () => {
            if( progress === 100) {
                handleUnloadNotice();
            }
        }, [progress]
    );

    return ( 
        <NotificationDiv 
            className={ `${type === 'SUCCESS' ? 'success' : 'error'} ${ unload ? 'unload' : ''}` } 
            onMouseEnter={handleStartProgress}
            onMouseLeave={handlePauseProgress}    
        >
            <p className="message">{message}</p>
            <div className="progress-bar" style={{ width: `${progress}%` }} />
        </NotificationDiv>
     );
}
 
export default Notifications;