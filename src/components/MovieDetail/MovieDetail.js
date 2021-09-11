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
                justifyContent="space-between">
                <Box
                display="flex"
                flex="1"
                marginRight="3"
                position="relative"
                alignItems="center">
                <Box
                    width={{ base: '100%', sm: '85%' }}
                    zIndex="2"
                    marginLeft={{ base: '0', sm: '5%' }}
                    marginTop="5%">
                    <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    <Image
                        borderRadius="lg"
                        src={movieDetail.Poster}
                        alt="some good alt text"
                        objectFit="contain"
                    />
                    </Link>
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
                <BlogAuthor name="John Doe" date={new Date('2021-04-06T19:01:27Z')} />
                </Box>
            </Box>
          ) : (
            <Text>Loading...</Text>
          )}
          
      </Container>
  );
}

export default MovieDetail;