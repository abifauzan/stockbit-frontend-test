import {
    Input,
    Button,
    Stack,
    InputGroup,
    InputRightElement,
    CloseButton,
    Text,
    Flex,
    StackDivider,
    useColorModeValue,
    Spinner,
} from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import { useState, useRef, useEffect } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import {
    selectMovies,
    clearData,
    fetchInitialMovies,
    selectStatus,
} from '../../components/MovieList/MovieListSlice'
import { useHistory } from 'react-router-dom';
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
    const selectStatusSelector = useSelector(selectStatus)
    const dispatch = useDispatch()
    const history = useHistory()

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
        dispatch(clearData())
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
        setLoading(true)
        setIsExpanded(false)
        setTimeout(() => {
            if (searchQuery.length > 2) {
                dispatch(clearData())
                history.push(`/movie/${searchQuery}`)
                setLoading(false)
            }
        }, 1500);
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

    // console.log('selectStatusSelector', selectStatusSelector)

    useDebounce(searchQuery, 500, searchMoviesQuery);

    const linkHover = useColorModeValue('gray.200', 'gray.700')

    return (

        <Stack 
            w='100%'
            maxW={['100%', '60%']}
            spacing={4} 
            direction="column" 
            justify='center'
            align="center"
            ref={parentRef}
        >
            <Flex flexDirection='row' w='100%'>
                <InputGroup size="md" mr={[3, 5]}>
                    <Input
                        p={['1.5rem', '1.8rem']}
                        type="text" 
                        placeholder='Example: Batman' 
                        onChange={changeHandler}
                        onFocus={expandContainer}
                        ref={inputRef}
                        value={searchQuery}
                        autoComplete="off"
                        borderRadius='40'
                        _placeholder={useColorModeValue('gray.500', 'blue.500')}
                        color='gray.800'
                        bg={useColorModeValue('gray.100', 'white')}
                    />
                    {isExpanded && (
                        <InputRightElementWrap 
                            width="4.5rem"
                            mt={[1.5, 2]}
                            ml='2'
                            key="close-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={collapseContainer}
                            transition={{ duration: 0.2 }}
                        >
                            <CloseButton color='gray.500' />
                        </InputRightElementWrap>
                    )}
                        
                    
                </InputGroup>

                <Button 
                    borderRadius='40'
                    fontSize='lg'
                    p={['1.5rem', '1.8rem']}  
                    colorScheme="blue" 
                    onClick={handleSearchMovie}
                    disabled={searchQuery === ''}
                ><SearchIcon /></Button>
            </Flex>

            <AnimatePresence exitBeforeEnter>
                <StackWrap 
                    animate={isExpanded ? "expanded" : "collapsed"}
                    variants={containerVariants}
                    transition={containerTransition}
                    initial="initial"
                    exit='collapsed'
                    w='100%'
                    textAlign='left'
                    px='1rem'
                    spacing='0'
                    divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} /> }
                >
                    {selectStatusSelector === 'idle' && movieList.length > 0 ? movieList.map(el => (
                        <Text 
                            key={el.imdbID}
                            py='0.5rem'
                            px='0.5rem'
                            fontWeight={600} 
                            borderRadius='5'
                            _hover={{bg : linkHover}}
                            transition='0.2s all ease-in-out'
                            cursor='pointer'
                            onClick={() => {
                                setSearchQuery(el.Title)
                                setIsExpanded(false)
                                setLoading(true)
                                setTimeout(() => {
                                    setLoading(true)
                                    dispatch(clearData())
                                    history.push(`/movie/${el.Title}`)
                                }, 1500);
                            }}
                        >{el.Title}</Text>
                    )) : selectStatusSelector === 'loading' && movieList.length === 0 ? (
                        <Spinner size='lg' alignSelf='center' />
                    ) : <BoxAlert text='No Movie available' /> }
                </StackWrap>
            </AnimatePresence>
            {isLoading && <Spinner size='lg' />}
        </Stack>

    );
}

export default SearchBox;