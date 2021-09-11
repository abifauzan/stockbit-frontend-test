import {
    Box,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
} from '@chakra-ui/react';
import { motion } from "framer-motion";

const BoxMotion = motion(Box)

function MovieCard({ item }) {
    // console.log(item.imdbID)
    return (
            <BoxMotion
                role={'group'}
                p={6}
                maxW={'300px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                cursor='pointer'
                initial={{ opacity: 0, y: '200px'}}
                animate={{ opacity: 1, y: 0}}
                zIndex={1}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${item.Poster})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                        filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={item.Poster}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                    {item.Type}
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                    {item.Title}
                </Heading>
                <Stack direction={'row'} align={'center'}>
                    <Text fontWeight={800} fontSize={'xl'}>
                    {item.Year}
                    </Text>
                    {/* <Text textDecoration={'line-through'} color={'gray.600'}>
                    $199
                    </Text> */}
                </Stack>
                </Stack>
            </BoxMotion>
    );
}

export default MovieCard;