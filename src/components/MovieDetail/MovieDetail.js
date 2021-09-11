import { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Link,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    Wrap,
    WrapItem,
    SpaceProps,
    useColorModeValue,
    Container,
    VStack,
    Button,
    Stack,
    StackDivider,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMovie,
  fetchMovieData,
  fetchMovie,
} from './MovieDetailSlice'
import usePrevious from '../../hooks/usePrevious';
import { useHistory, useParams } from 'react-router-dom';
import { checkObjectLength } from '../../utils/Util';

const BlogTags = (props) => {
    return (
      <HStack spacing={2} marginTop={props.marginTop}>
        {props.tags.map((tag) => {
          return (
            <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
              {tag}
            </Tag>
          );
        })}
      </HStack>
    );
};

export const BlogAuthor = (props) => {
    return (
      <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
        <Image
          borderRadius="full"
          boxSize="40px"
          src="https://100k-faces.glitch.me/random-image"
          alt={`Avatar of ${props.name}`}
        />
        <Text fontWeight="medium">{props.name}</Text>
        <Text>—</Text>
        <Text>{props.date.toLocaleDateString()}</Text>
      </HStack>
    );
};

function MovieDetail(props) {
  const [movieDetail, setMovieDetail] = useState({})

  const dispatch = useDispatch()
  const movieSelector = useSelector(selectMovie)

  const history = useHistory()
  const { name: movieSearchName } = useParams()

  useEffect(() => {
    dispatch(fetchMovie(movieSearchName))
  }, [dispatch, movieSearchName])

  useEffect(() => {
    if (checkObjectLength(movieSelector)) {
      setMovieDetail(movieSelector)
    }
}, [movieSelector])

  console.log(movieSelector)

  const bgGradient = useColorModeValue(
    'radial(orange.600 1px, transparent 1px)',
    'radial(orange.300 1px, transparent 1px)'
  )
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  return (
      <Container maxW={'7xl'} p="12">
          {/* <Heading as="h1">Stories by Chakra Templates</Heading> */}
          <Button 
            bg='blue.400'
            color='white'
            leftIcon={<ArrowBackIcon />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
          {checkObjectLength(movieDetail) ? (
              <Box
                marginTop={{ base: '1', sm: '5' }}
                display="flex"
                flexDirection={{ base: 'column', sm: 'row' }}
                justifyContent="center">
                <Box
                display="flex"
                flex="1"
                marginRight="3"
                position="relative"
                justifyContent='center'
                alignItems="center">
                <Box
                    width={{ base: '100%', sm: '85%' }}
                    zIndex="2"
                    marginLeft={{ base: '0', sm: '5%' }}
                    justifyContent='center'
                    alignItems="center"
                    marginTop="5%">
                      <Image
                        borderRadius="lg"
                        src={movieDetail.Poster}
                        alt="some good alt text"
                        objectFit="contain"
                    />
                    {/* <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    <Image
                        borderRadius="lg"
                        src={movieDetail.Poster}
                        alt="some good alt text"
                        objectFit="contain"
                    />
                    </Link> */}
                </Box>
                <Box zIndex="1" width="100%" position="absolute" height="100%">
                    <Box
                    bgGradient={bgGradient}
                    backgroundSize="20px 20px"
                    opacity="0.4"
                    height="100%"
                    />
                </Box>
                </Box>
                <Box
                display="flex"
                flex="1"
                flexDirection="column"
                justifyContent="center"
                marginTop={{ base: '3', sm: '0' }}>
                <BlogTags tags={['Engineering', 'Product']} />
                <Heading marginTop="1">
                    <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    {movieDetail.Title}
                    </Link>
                </Heading>
                <Text
                    as="p"
                    marginTop="2"
                    color={textColor}
                    fontSize="lg">
                    {movieDetail.Plot}
                </Text>
                    
                <Stack 
                    
                    w='100%'
                    textAlign='left'
                    px='1rem'
                    spacing='0'
                    divider={<StackDivider borderColor={borderColor} /> }
                >
                        <Text 
                            py='0.5rem'
                            px='0.5rem'
                            fontWeight={600} 
                            borderRadius='5'
                        >Title</Text>
                </Stack>


                </Box>
            </Box>
          ) : (
            <Text>Loading...</Text>
          )}
          
      </Container>
  );
}

export default MovieDetail;