import { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Link,
    Image,
    Text,
    HStack,
    Tag,
    Wrap,
    WrapItem,
    useColorModeValue,
    Container,
    Button,
    Spinner,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMovie,
  fetchMovie,
} from './MovieDetailSlice'
import { useHistory, useParams } from 'react-router-dom';
import { checkObjectLength } from '../../utils/Util';
import { motion } from "framer-motion";

const BlogTags = (props) => {
    return (
      <Wrap spacing={2} marginTop={props.marginTop} mb='5'>
        {props.tags.map((tag) => {
          return (
            <WrapItem>
              <Tag size={'md'} variant="solid" colorScheme="linkedin" key={tag}>
                {tag}
              </Tag>
            </WrapItem>
          );
        })}
      </Wrap>
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

const ImageMotion = motion(Image)

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
                      <ImageMotion
                        borderRadius="lg"
                        src={movieDetail.Poster}
                        alt="some good alt text"
                        objectFit="contain"
                        initial={{ opacity: 0, x: '-200px'}}
                        animate={{ opacity: 1, x: 0}}
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
                <BlogTags tags={movieDetail.Genre.split(',')} />
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
                </Box>
            </Box>
          ) : (
            <Box w='100%' py='1rem'><Spinner size='lg' /></Box>
          )}
          
      </Container>
  );
}

export default MovieDetail;