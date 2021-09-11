import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Box,
    Wrap, 
    WrapItem
} from '@chakra-ui/react';
import BoxAlert from '../BoxAlert/BoxAlert';
import MovieCard from '../MovieCard/MovieCard';
import {
    selectMovies,
    fetchInitialData,
    fetchMoreData,
    fetchInitialMovies,
    fetchMoreMovies,
    selectTotalResults,
} from './MovieListSlice'
import usePrevious from '../../hooks/usePrevious';
import { useHistory, useParams } from 'react-router-dom';

function MovieList(props) {
    const [movieList, setMovieList] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const [hasMore, setHasMore] = useState(false)

    const [page, setPage] = useState(1)

    const movieSelector = useSelector(selectMovies)
    const totalResultsSelector = useSelector(selectTotalResults)
    const dispatch = useDispatch()

    const prevPage = usePrevious(page)

    const listMovieRef = useRef()
    const history = useHistory()
    const { name: movieSearchName } = useParams()

    useEffect(() => {
        window.addEventListener('scroll', onScroll, false)

        return () => {
            window.removeEventListener('scroll', onScroll, false)
        }
    }, [])

    useEffect(() => {
        dispatch(fetchInitialMovies({name: movieSearchName}))
    }, [dispatch, movieSearchName])

    useEffect(() => {
        if (movieSelector.length > 0) {
            setTotalResult(Number(totalResultsSelector))
            setMovieList(movieSelector)
        }
    }, [movieSelector, totalResultsSelector])

    useEffect(() => {
        if (hasMore && page === prevPage) {
            console.log(page, prevPage)

            setPage(page+1)
            setHasMore(false)
            // if (page <= Math.ceil(totalResult / 10)) {
            //     dispatch(fetchMoreMovies({name: 'batman', nextPage: page}))
            // }
        }
    }, [dispatch, hasMore, movieSelector, totalResult, page, prevPage])

    // useEffect(() => {
    //     // Fetch Initial Movies
    //     if (!isFetchMore && movieSelector.length === 0) {

    //         dispatch(fetchInitialMovies({name: 'batman'}))
    //         // const getMovies = dispatch(fetchMoreMovies('batman'))

    //     // Store neccessary State
    //     } else if (!isFetchMore && movieSelector.length > 0) {

    //         setTotalResult(Number(totalResultsSelector))
    //         setMovieList(movieSelector)
            
    //     // Otherwise fetch more data
    //     } 
    //     // else if (isFetchMore && movieSelector.length > 0) {
    //     //     setIsFetchMore(false)
    //     //     if (page <= Math.ceil(totalResult / 10)) {
    //     //         dispatch(fetchMoreMovies({name: 'batman', nextPage: page}))
    //     //     }
    //     // }

    // }, [dispatch, movieSelector, isFetchMore, totalResultsSelector])

    // useEffect(() => {
    //     if (reachedBottom) {
    //         setReachedBottom(false)
    //         // console.log(reachedBottom)
    //         // console.log('trigger fetch more data')
    //     }
    // }, [reachedBottom])

    // console.log('page', page)

    const onScroll = () => {
        if (listMovieRef.current) {
          const boundingRect = listMovieRef.current.getBoundingClientRect()
          if (boundingRect.bottom === window.innerHeight) {
            // setReachedBottom(true)
            setHasMore(true)
            // console.log('hashMore', hasMore)
            // console.log('page', page)
          }
        }
    };

    const handleMore = () => {
        // setIsFetchMore(true)
        const paging = Math.ceil(totalResult / 10)
        // setPage(page+1)
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
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                    pb={10}
                >
                    Search movie : {' '} <br/>

                    <Text as={'span'} color={'blue.400'}>
                        Spider Man...
                    </Text>
                </Heading>

                
                    <Wrap 
                        ref={listMovieRef}
                        // maxW={'5xl'} 
                        align='center'
                        justify='center'
                        // direction='row'
                        // spacing={{ base: 18, md: 10 }}
                        spacing='30px'
                        // py={{ base: 10, md: 10 }}
                    >
                        {/* <BoxAlert /> */}
                        {movieList.length > 0 ? movieList.map((el, index) => (
                            <WrapItem 
                                key={el.imdbID}
                                onClick={() => history.push(`/movie/${el.Title}/detail`)}
                                pb={10}
                            >
                                <MovieCard item={el} />
                            </WrapItem>
                        )) : (
                            <Text>
                                Loading...
                            </Text>
                        )}
                        
                    </Wrap>

                <Button
                    onClick={handleMore}
                    disabled={page === Math.ceil(totalResult / 10)}
                    bg='blue.400'
                    color='white'
                >
                    Add more
                </Button>
                

            </Stack>
        </Container>
    );
}

export default MovieList;