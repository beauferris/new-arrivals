import { Flex, Box, Skeleton, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react"


const SkeletonProduct = () => {
    return (
        <Stack mb='3' >
            <Skeleton height={500} />
            <Flex >
                <SkeletonText width='80%' />
                <SkeletonCircle ml='1' size={10} />
            </Flex>

        </Stack>
    )
}

export default SkeletonProduct