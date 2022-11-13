import Hero from "./Hero/Hero";
import FilteredList from "../commons/FilteredList/FilteredList";

type Props = {
    route: string,
    query: string
}

const Home = ( { route, query } : Props ) => {
    return ( 
        <>
            <Hero route="movies-in-theaters" />
            <FilteredList route="movies-in-theaters" query={query} />
        </>
     );
}
 
export default Home;