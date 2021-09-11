import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
} from '@chakra-ui/react';
import SearchBox from '../SearchBox/SearchBox';
import { Illustration } from './Illustration';


function Landing(props) {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>

                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                >
                    Search your{' '}

                    <Text as={'span'} color={'blue.400'}>
                        favorite movie
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                Never miss a meeting. Never be late for one too. Keep track of your
                meetings and receive smart reminders in appropriate times. Read your
                smart “Daily Agenda” every morning.
                </Text>

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

                <Stack w='100%' align='center'>
                    <SearchBox />
                </Stack>

                <Flex w={'full'}>
                    <Illustration
                        height={{ sm: '24rem', lg: '28rem' }}
                        mt={{ base: 12, sm: 16 }}
                    />
                </Flex>
            </Stack>
        </Container>
    );
}

export default Landing;