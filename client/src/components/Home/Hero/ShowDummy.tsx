import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const DummyDiv = styled.div`
    position: fixed;
    z-index: 9999999999;
    box-shadow: 0 0 20px rgb(0 0 0 / 0.4);
    padding: 40px;
    border-radius: 5px;
    color: #333;
    background-color: #e2e2e2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .icon {
        color: red;
        font-size: 22px;
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 15px;
    }
    h2 {
        margin-block-end: 20px;
    }
`;

type Props = {
    dummyDisabler: () => void
};

const ShowDummy = ( { dummyDisabler } : Props ) => {
    return ( 
        <DummyDiv>
            <FontAwesomeIcon className="icon" icon={faTimes} onClick={dummyDisabler}/>
            <h2>This is a dummy app</h2>
            <p>All functionalities aren't enabled</p>
        </DummyDiv>
     );
}
 
export default ShowDummy;