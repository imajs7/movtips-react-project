import styled from "styled-components";

const NotFoundDiv = styled.div`
    height: 400px;
    display: grid;
    place-content: center;
`;

const NotFound = () => {
    return ( 
        <NotFoundDiv>
            <h2>404 | Page not found</h2>
        </NotFoundDiv>
     );
}
 
export default NotFound;