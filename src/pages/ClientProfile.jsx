import { ArrowDownIcon, UpDownIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Card, CardBody, CardFooter, CardHeader, Container, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

const ClientProfile = () => {

  // const object = {
  //   name: "saipepu", // field
  //   method: () => { // method
  //     console.log('Hello no')
  //   }
  // }
  // object.method();

  const {id} = useParams();
  const [appointmentList, setAppointmentList] = useState([]);
  const [patient, setPatient] = useState({});
  
  const fetchPatient = async() => {
    console.log(id);
    await fetch(`http://localhost:8080/patient/${id}`)
    .then(result => result.json().then(data => {
      console.log(data);
      setAppointmentList(data.appointment);
      setPatient(data);
    }))
  }
  useEffect(() => {
    fetchPatient();
  }, [id])
  console.log(appointmentList);

  return (
    <Container maxWidth="full" display="flex" flexDirection="column" justifyContent={'flex-start'} alignItems={'center'} padding="0">
      <Header />
      <Container minWidth="full" display="flex" flexDirection="column" justifyContent={'flex-start'} alignItems={'flex-start'} margin="0" padding="32px">
        <Text as='h1' fontSize="32px">Welcome {patient?.name}</Text>
        Your appointment for today!
        <SimpleGrid width="100%" spacing="24px" padding="24px" templateColumns={'repeat(auto-fill, minmax(250px, 1fr))'}>
          {appointmentList?.map((item, index) => {
            return (
                <Card minWidth="250px" maxWidth="fit-content" height="fit-content" key={index}>
                  <CardHeader paddingBottom="6px">
                    {item?.time}am
                  </CardHeader>
                  <CardBody paddingTop="6px" width="full">
                    <Box width="full" display="flex" alignItems={'end'} whiteSpace="nowrap">
                      with - <Text as="h3" fontSize={"24px"} fontWeight={"bold"} marginLeft={'6px'}>Dr. {item?.doctorName}</Text>
                    </Box>
                  </CardBody>
                  <CardFooter>
                    <Accordion width={'full'} allowToggle>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              Notes
                            </Box>
                            <UpDownIcon boxSize={3} />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          - no comment -
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </CardFooter>
                </Card>
              )
            })}
        </SimpleGrid>
      </Container>
    </Container>
  )
}

export default ClientProfile