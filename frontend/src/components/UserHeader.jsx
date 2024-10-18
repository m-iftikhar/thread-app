import { VStack } from "@chakra-ui/react"
import { Flex,Box,Avatar,Text,Link,useToast } from "@chakra-ui/react"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { Menu,MenuButton, MenuList,Portal,MenuItem } from "@chakra-ui/react"

const UserHeader = () => {
    const toast = useToast();
    const copyURL = () => {
		const currentURL = window.location.href;
		navigator.clipboard.writeText(currentURL).then(() => {
			toast({
				title: "Success.",
				status: "success",
				description: "Profile link copied.",
				duration: 3000,
				isClosable: true,
			});
		});
	};
  return (
   <VStack gap={4} alignItems={"start"}>
    <Flex justifyContent={"space-between"} w={"full"}>
       <Box>
        <Text fontsize={"2x1"} fontWeight={"bold"}>
          Markzuckerberg
        </Text>
        <Flex gap={2} alignItems={"center"}>
        <Text fontsize={"sm"}> Markzuckerberg</Text>
        <Text fontsize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}> Threads.net</Text>
        </Flex>

       </Box>
       <Box>
        <Avatar name='Iftikhar' src='/pic2.jpg' size={{base:"md",md:"xl"}}/>
       </Box>
    </Flex>
    <Text>Co-Founder, and executive CEO of thread app</Text>
    <Flex justifyContent={"space-between"} w={"full"}>

    <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"}> 3.2k followers</Text>
        <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
    </Flex>
    <Flex>
        <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"}/>
        </Box>
        <Box className='icon-container'>
						<Menu>
							<MenuButton>
								<CgMoreO size={24} cursor={"pointer"} />
							</MenuButton>
							<Portal>
								<MenuList bg={"gray.dark"}>
									<MenuItem bg={"gray.dark"} onClick={copyURL} >
										Copy link
									</MenuItem>
								</MenuList>
							</Portal>
						</Menu>
					</Box>
    </Flex>
    </Flex>
    <Flex w={"full"}>
				<Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
					<Text fontWeight={"bold"}> Threads</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Replies</Text>
				</Flex>
			</Flex>
   </VStack>
  )
}

export default UserHeader
