import { Button, ButtonGroup, Card, CardBody, CardHeader, Container, Heading, HStack, IconButton, Image, Input, InputGroup, InputRightElement, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import clinic_png from '../assets/clinic_png.png'
import { CheckIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ErrorNoti, SuccessNoti } from '../components/notification'

const Client = () => {

  const [patientName, setPatientName] = useState("");
  let { id } = useParams();
  const [slots, setSlots] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [bookSuccess, setBookSuccess] = useState(false);

  const getAllSlot = async() => {
    await fetch("http://localhost:8080/appointments", {
      method: 'GET',
    }).then(result => result.json().then(data => {
      setSlots(data);
      console.log(data);
    })).catch(error => console.log(error, ' Failed '))
  }
  useEffect(() => {
    getAllSlot();
  }, [])


  const fetchPatient = async() => {
    await fetch(`http://localhost:8080/patient/${id}`).then(result => result.json().then(data => {
      console.log(data);
      setPatientName(data?.name);
    }))
  }
  useEffect(() => {
    fetchPatient();
  }, [id])

  const handleBooking = async(appointment_id, time, doctorName) => {
    console.log(time, doctorName, appointment_id)
    setLoading(true);
    await fetch(`http://localhost:8080/appointment/${appointment_id}/book/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "time": time,
        "doctorName":  doctorName,
        "patientName": patientName
      })
      }).then(result => result.json().then(data => {
        setLoading(false);
        setBookSuccess(true);
        console.log(data);
        if(data?.patientName !== "") {
          SuccessNoti("Booking Complete Successfully!");
        } else {
          ErrorNoti("Ohhhh Noooo! Sth's Wrong!!")
        }
        setTimeout(() => {
          getAllSlot();
        }, 1000)
    }).catch(err => {
      setLoading(false);
      console.log(err, " Failed ");
    }))
  }

  return (
    <Container maxWidth="full" display="flex" flexDirection="column" justifyContent={'flex-start'} alignItems={'center'} padding="0">
      <ToastContainer/>
      <Header client={true} id={id}/>
      <Container maxWidth='full' height="300px" padding="0px 56px">
        <Image
            boxSize="full"
            objectFit="cover"
            src={clinic_png}
            alt="clinic picture"
          />
      </Container>
      <Container maxWidth='50%' padding="20px" position="relative">
        <Container maxWidth='100%' padding="20px" position="absolute" top="-120%">
          <InputGroup size="md">
            <Input
              pr="24px"
              type="text"
              placeholder="Search By Doctor Name"
              backgroundColor="white"
              boxShadow="md"
            />
            <InputRightElement width="fit-content" height="full">
              <Button h="full" size="sm">
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </Container>
      </Container>
      <SimpleGrid padding="0px 56px" maxW="full" spacing="12" templateColumns={'repeat(auto-fill, minmax(200px, 1fr))'}>
          {slots?.map((item,index) => {
            if(item?.patientName == null || item?.patientName == "") {
              return (
                <Card minW="200px" key={index}>
                  <CardHeader>
                    <Heading as="h2" size="lg">
                      {item?.time}
                    </Heading>
                    <Text as="p" fontSize="22px">
                      Dr. {item?.doctorName}
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <ButtonGroup spacing='2' width="full">
                      {isLoading ? (
                          <Button isLoading variant='solid' colorScheme='gray'>
                            Book Now
                          </Button>
                      ) : !bookSuccess ? (
                          <Button onClick={() => handleBooking(item?.id, item?.time, item?.doctorName)} variant='solid' colorScheme='teal'>
                            Book Now
                          </Button>
                      ) : (
                        <Button colorScheme='green' leftIcon={<CheckIcon />}>
                            Completed
                        </Button>
                      )}
                      <IconButton airal-label="share" icon={<ExternalLinkIcon />} />
                    </ButtonGroup>
                  </CardBody>
                </Card>
              ) 
            } else {
              return (
                ""
              )
            }
            
          })}
      </SimpleGrid>
    </Container>
  )
}

export default Client