import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Stack,
    InputGroup,
    InputRightElement,
    forwardRef,
    CloseButton,
    Box,
    Text,
    Divider,
  } from "@chakra-ui/react"
import { useState, useRef, useEffect } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import {
    selectMovies,
    fetchInitialData,
    fetchMoreData,
    fetchInitialMovies,
    fetchMoreMovies,
    selectTotalResults,
} from '../../components/MovieList/MovieListSlice'
import usePrevious from '../../hooks/usePrevious';
import { useHistory, useParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import BoxAlert from '../BoxAlert/BoxAlert';

const containerVariants = {
    expanded: {
      height: "auto",
      opacity: 1,
    },
    collapsed: {
      height: "0em",
      opacity: 0,
    },
    initial: {
        height: "0em",
        opacity: 0,
    },
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

const InputRightElementWrap = motion(InputRightElement);
const StackWrap = motion(Stack);

function SearchBox(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [parentRef, isClickedOutside] = useClickOutside();
    const inputRef = useRef();
    const [isLoading, setLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [noMovieList, setNoMovieList] = useState(false);

    const movieSelector = useSelector(selectMovies)
    const dispatch = useDispatch()
    const history = useHistory()

    const isEmpty = !movieList || movieList.length === 0;

    const changeHandler = (e) => {
        e.preventDefault();
        if (e.target.value.trim() === "") setNoMovieList(false);

        if (e.target.value.length >= 2) {
            setIsExpanded(true);
        }
    
        setSearchQuery(e.target.value);
    };

    const expandContainer = () => {
        // setIsExpanded(true);
    };


    const collapseContainer = () => {
        setIsExpanded(false);
        setSearchQuery("");
        setLoading(false);
        setNoMovieList(false);
        setMovieList([]);
        if (inputRef.current) inputRef.current.value = "";
    };

    const searchMoviesQuery = async () => {
        if (!searchQuery || searchQuery.trim() === "") return;
    
        setLoading(true);
        setNoMovieList(false);
    
        dispatch(fetchInitialMovies({name: searchQuery}))
    
        
    
        setLoading(false);
    };

    const handleSearchMovie = () => {
        if (searchQuery.length > 2) {
            history.push(`/movie/${searchQuery}`)
        }
    }


    useEffect(() => {
        if (movieSelector.length === 0) {
            setNoMovieList(true)
        } else {
            setMovieList(movieSelector)
        }

    }, [movieSelector])

    useEffect(() => {
        if (isClickedOutside) collapseContainer();
    }, [isClickedOutside]);

    console.log(movieList)

    useDebounce(searchQuery, 500, searchMoviesQuery);
    return (

        <Stack 
            w='100%'
            spacing={4} 
            direction="column" 
            justify='center'
            align="center"
            ref={parentRef}
        >
            <FormControl id="email" spacing={40}>
                <FormLabel>Search Movie</FormLabel>

                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type="text" 
                        placeholder='Example: Batman' 
                        onChange={changeHandler}
                        onFocus={expandContainer}
                        ref={inputRef}
                        value={searchQuery}
                        autoComplete="off"
                    />
                    {isExpanded && (
                        <InputRightElementWrap 
                            width="4.5rem"
                            key="close-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={collapseContainer}
                            transition={{ duration: 0.2 }}
                        >
                            <CloseButton bg='blue.400' color='white' />
                        </InputRightElementWrap>
                    )}
                    
                </InputGroup>
            </FormControl>

            <AnimatePresence exitBeforeEnter>
                <StackWrap 
                    animate={isExpanded ? "expanded" : "collapsed"}
                    variants={containerVariants}
                    transition={containerTransition}
                    initial="initial"
                    exit='collapsed'
                    direction='column' 
                    bg='gray.100' 
                    w='100%' 
                    borderRadius='5' 
                    padding='1'
                >
                    {movieList.length > 0 ? movieList.map(el => (
                        <Box 
                            key={el.imdbID}
                            onClick={() => {
                                // setSearchQuery(el.Title)
                                history.push(`/movie/${el.Title}`)
                            }}
                        ><Text fontSize='lg'>{el.Title}</Text><Divider /></Box>
                    )) : (
                        <BoxAlert />
                    )}
                </StackWrap>
            </AnimatePresence>
            
            <Button colorScheme="blue" onClick={handleSearchMovie}>Button</Button>
        </Stack>

    );
}

export default SearchBox;