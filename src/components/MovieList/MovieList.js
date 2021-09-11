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
import usePrevious from '../../hooks/usePrevious';
import { useHistory, useParams } from 'react-router-dom';

function MovieList(props) {
    const [movieList, setMovieList] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const [hasMore, setHasMore] = useState(false)

    const [page, setPage] = useState(1)

    const movieSelector = useSelector(selectMovies)
    const totalResultsSelector = useSelector(selectTotalResults)
    const hasMoreArticleSelector = useSelector(selectHasMoreArticle)
    const selectStatusSelector = useSelector(selectStatus)
    const selectStatusFetchMoreSelector = useSelector(selectStatusFetchMore)

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

    window.onscroll = () => {
        // console.log(window.innerHeight, document.documentElement.scrollTop, document.documentElement.offsetHeight)
        // console.log('hasMoreArticleSelector', hasMoreArticleSelector)
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
          if(hasMoreArticleSelector && page <= Math.ceil(totalResult / 10)) {
            fetchMore(page)
          }
        }
      }

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchInitialMovies({name: movieSearchName}))
        }, 1500);
    }, [dispatch, movieSearchName])

    useEffect(() => {
        if (movieSelector.length > 0) {
            setTotalResult(Number(totalResultsSelector))
            setMovieList(movieSelector)
            setPage(page+1)
        }
    }, [movieSelector, page, totalResultsSelector])

    const fetchMore = page => {
        setTimeout(() => {
            dispatch(fetchMoreMovies({name: movieSearchName, nextPage: page}))
        }, 1500);
    }


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
            // setHasMore(true)
            // console.log('hashMore', hasMore)
            // console.log('page', page)
          }
        }
    };

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
                        // maxW={'5xl'} 
                        align='center'
                        justify='center'
                        // direction='row'
                        // spacing={{ base: 18, md: 10 }}
                        spacing='30px'
                        // py={{ base: 10, md: 10 }}
                    >
                        {/* <BoxAlert /> */}
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

                    {selectStatusFetchMoreSelector === 'loading' && <Box>
                        <Text>Loading...</Text>
                        <Spinner size='xl' />
                    </Box>}
                    
            </Stack>
        </Container>
    );
}

export default MovieList;