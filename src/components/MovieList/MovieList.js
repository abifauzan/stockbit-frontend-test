import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Heading,
    Stack,
    Text,
    Box,
    Wrap, 
    WrapItem,
    Spinner,

} from '@chakra-ui/react';
import MovieCard from '../MovieCard/MovieCard';
import {
    selectMovies,
    fetchInitialMovies,
    fetchMoreMovies,
    selectTotalResults,
    selectHasMoreArticle,
    selectStatus,
    selectStatusFetchMore,
} from './MovieListSlice'
import { useHistory, useParams } from 'react-router-dom';

function MovieList(props) {
    const [movieList, setMovieList] = useState([])
    const [totalResult, setTotalResult] = useState(0)

    const [page, setPage] = useState(1)

    const movieSelector = useSelector(selectMovies)
    const totalResultsSelector = useSelector(selectTotalResults)
    const hasMoreArticleSelector = useSelector(selectHasMoreArticle)
    const selectStatusSelector = useSelector(selectStatus)
    const selectStatusFetchMoreSelector = useSelector(selectStatusFetchMore)

    const dispatch = useDispatch()

    const listMovieRef = useRef()
    const history = useHistory()
    const { name: movieSearchName } = useParams()

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {

            if(hasMoreArticleSelector && page <= Math.ceil(totalResult / 10)) {
                fetchMore(page)
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchInitialMovies({name: movieSearchName}))
            setPage(page+1)

        }, 1500);

    }, [])


    useEffect(() => {
        if (movieSelector.length > 0) {

            setTotalResult(totalResultsSelector)
            setMovieList(movieSelector)
        }
    }, [movieSelector, totalResultsSelector])

    const fetchMore = page => {
        dispatch(fetchMoreMovies({name: movieSearchName, nextPage: page}))
        setPage(page+1)
    }


    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 10, md: 10 }}
            >

                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                    lineHeight={'110%'}
                    pb={10}
                >
                    Search movie : {' '} <br/>

                    <Text as={'span'} color={'blue.400'}>
                        {movieSearchName}
                    </Text>
                </Heading>

                    <Wrap 
                        ref={listMovieRef}
                        align='center'
                        justify='center'
                        spacing='30px'
                    >
                        {selectStatusSelector !== 'loading' && movieList.length > 0 ? movieList.map((el, index) => (
                            <WrapItem 
                                key={el.imdbID}
                                onClick={() => history.push(`/movie/${el.Title}/detail`)}
                                pb={10}
                            >
                                <MovieCard item={el} />
                            </WrapItem>
                        )) : (
                            <Spinner size='xl' />
                        )}
                        
                    </Wrap>

                    {selectStatusFetchMoreSelector === 'loading' ? 
                    <Box>
                        <Text>Loading...</Text>
                        <Spinner size='xl' />
                    </Box> : ''}
                    
            </Stack>
        </Container>
    );
}

export default MovieList;