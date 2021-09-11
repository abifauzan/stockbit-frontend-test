import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import SearchBox from '../SearchBox/SearchBox';
import { Illustration } from './Illustration';
import { AnimatePresence, motion } from "framer-motion";

const HeadingMotion = motion(Heading)
const TextMotion = motion(Text)
const StackMotion = motion(Stack)
const FlexMotion = motion(Flex)

function Landing(props) {
    return (
        <AnimatePresence exitBeforeEnter>
            <Container maxW={'5xl'}>
                <Stack
                    textAlign={'center'}
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    // py={{ base: 20, md: 28 }}
                >

                    <HeadingMotion
                        fontWeight={600}
                        fontSize={{ base: '4xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}
                        pt={{ base: 8, md: 10 }}
                        px={[10, 0]}
                        initial={{ opacity: 0, y: '-200px'}}
                        animate={{ opacity: 1, y: 0}}
                    >
                        Search your{' '}

                        <Text as={'span'} color={'blue.400'}>
                            favorite movie
                        </Text>
                    </HeadingMotion>
                    <TextMotion 
                        fontSize={['lg', '2xl']} 
                        color={useColorModeValue('gray.600', 'white')} 
                        maxW={'xl'}
                        initial={{ opacity: 0, y: '-200px'}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ delay: 0.2 }}
                    >
                    Use your own words, or search with titles or IMDB ID. <br />We find movies for you to watch.
                    </TextMotion>

                    {/* <Stack spacing={6} direction={'row'}>
                        <Button
                            rounded={'full'}
                            px={6}
                            colorScheme={'orange'}
                            bg={'orange.400'}
                            _hover={{ bg: 'orange.500' }}>
                            Get started
                        </Button>
                        <Button rounded={'full'} px={6}>
                            Learn more
                        </Button>
                    </Stack> */}

                    <StackMotion 
                        w='100%' 
                        align='center'
                        initial={{ opacity: 0, x: '-200px'}}
                        animate={{ opacity: 1, x: 0}}
                        transition={{ delay: 0.5 }}
                    >
                        <SearchBox />
                    </StackMotion>

                    <FlexMotion 
                        w={'full'}
                        initial={{ opacity: 0, y: '200px'}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ delay: 0.7 }}
                    >
                        <Illustration
                            height={{ sm: '24rem', lg: '28rem' }}
                            mt={{ base: 12, sm: 16 }}
                        />
                    </FlexMotion>
                </Stack>
            </Container>
        </AnimatePresence>
    );
}

export default Landing;