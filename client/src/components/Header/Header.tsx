import { ChangeEvent } from "react";
import Topbar from "./Topbar/Topbar";

type Props = {
    query: string,
    queryHandler: (event : ChangeEvent<HTMLInputElement>) => void
}

const Header = ( { query, queryHandler } : Props ) => {
    return ( 
        <>
            <Topbar query={query} queryHandler={queryHandler}  />
        </>
     );
}
 
export default Header;