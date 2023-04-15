import { Button, ButtonGroup, Container, HStack, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Header = ({client}) => {

  const {id} = useParams();
  const navigation = useNavigate();
  const navigate = () => {
    console.log(client);
    if(client) {
      navigation(`/client/profile/${id}`)
    }
  }
  const NavigateHome = () => {
    console.log(id);
      navigation(`/client/${id}`)
  }
  return (
    <Container padding="12px" margin="0" maxWidth="full" h="fit-content" boxShadow="md">
      <HStack justifyContent={'space-between'} padding="12px 32px">
        <Text as='b' fontSize="4xl">Big Smile</Text>
        <HStack spacing='12'>
          <Link onClick={() => NavigateHome()}>Home</Link>
          <Link>About</Link>
          <Link>Contact</Link>
          <Button onClick={() => 
          navigate()
          }>P</Button>
        </HStack>
      </HStack>
    </Container>
  )
}

export default Header