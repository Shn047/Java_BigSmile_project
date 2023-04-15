import { AddIcon, ChevronDownIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Checkbox, Container, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import { ErrorNoti, SuccessNoti } from '../components/notification';

const Doctor = () => {

  const {id} = useParams();
  const [doctorName, setDoctorName] = useState("");
  const [appointmentList, setAppointmentList] = useState([]);
  const { isOpen, onOpen, onClose} = useDisclosure();
  const [method, setMethod] = useState("");
  const [api, setApi] = useState()
  const [appointmentId, setAppointmentId] = useState("");

  useEffect(() => {
    switch(method) {
      case "add": {
        setApi(`http://localhost:8080/doctor/${id}/appointment/create`)
        break;
      };
      case "edit": {
        setApi(`http://localhost:8080/doctor/${id}/edit/${appointmentId}`)
        break;
      };
      case "delete": {
        break;
      };
      default: break;
    }
    console.log(id);
    console.log(method);
  }, [method])

  const fetchDoctor = async () => {
    await fetch(`http://localhost:8080/doctor/${id}`)
    .then(result => result.json().then(data => {
      setDoctorName(data?.name);
      console.log(doctorName);
      setAppointmentList(data?.appointments);
    }))
  }

  useEffect(() => {
    fetchDoctor();
  }, [id])

  const initial = {
    "time": "",
    "doctorName": doctorName
  }
  console.log(initial)
  console.log(appointmentList);

  const formik = useFormik({
    initialValues: initial,
    onSubmit: async(values) => {
      await fetch(api, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "time": values.time,
          "doctorName": doctorName
        })
      })
      .then(result => result.json().then(data => {
        console.log(data);
        fetchDoctor();
        onClose();
      })).catch(err => console.log(err, " Failed ", values))
      console.log('Submitted 44')
    }
  })

  const handleDelete = async (appointment_id) => {
    await fetch(`http://localhost:8080/doctor/${id}/delete/${appointment_id}`,{
      method: 'DELETE'
    }).then(result => result.json().then(data => {
        SuccessNoti("Booking Cancelled Successfully!")
        console.log(result);
        console.log(data, 'data')
    })).catch(err => console.log(err, "Failed"))
    fetchDoctor();
  }

  return (
    <Container maxWidth="full" display="flex" flexDirection="column" justifyContent={'flex-start'} alignItems={'center'} padding="0">
      <Header doctor={true}/>
      <Container maxWidth="full" padding="52px">
        <Text as="h1" fontSize={'32px'} fontWeight="bold" marginBottom="32px">Welcome! {doctorName}</Text>
        <HStack spacing="12px" alignItems={'center'} marginBottom={'12px'}>
          <Text as="p" fontSize={'16px'} fontWeight="light">This is the booking slot for you today. Sir!</Text>
          <Button onClick={() => {
            onOpen()
            setMethod("add")
          }}>Create Slot<AddIcon marginLeft="2" boxSize={3}/></Button>

          {/* Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Booking Slot</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '6px'}}>
                  {/* <legend fontSize={'6px'}>Registeration</legend> */}
                  <label htmlFor="time">Time</label>
                  <Input
                    id="time"
                    name="time"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.time}
                  />
                  {/* <label htmlFor="doctorName">Doctor Name</label>
                  <Input id="doctorName" namer="doctorName" type="doctorName" value={doctorName} onChange={formik.handleChange}/> */}
                  <Button colorScheme="teal" type="submit" width="full">Submit</Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </HStack>
        <TableContainer>
          <Table variant="simple">
            <TableCaption placement={'bottom'}>End of Slots</TableCaption>
            <Thead>
              <Tr>
                <Th width="50px" justifyContent={'center'} alignItems="center">No.</Th>
                <Th>Slot</Th>
                <Th>Patient Name</Th>
                <Th>Comments</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td><Checkbox></Checkbox></Td>
                <Td>-----</Td>
                <Td>-----</Td>
                <Td>-----</Td>
                <Td>-----</Td>
              </Tr>
              {appointmentList?.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td><Checkbox></Checkbox></Td>
                    <Td>{item?.time}</Td>
                    <Td>{item?.patientName}</Td>
                    <Td>{item?.comment ? item.comment : "no comment"}</Td>
                    <Td>
                      <Menu>
                        {({ isOpen }) => (
                          <>
                          <MenuButton isActive={isOpen} as={Button}>
                            <EditIcon />
                          </MenuButton>
                          <MenuList>
                            <MenuItem onClick={() => {
                              onOpen();
                              setMethod("edit");
                              setAppointmentId(item?.id);
                              formik.values.time = item?.time
                            }}>Edit</MenuItem>
                            <MenuItem bgColor={'red.100'} onClick={() => handleDelete(item?.id)}>Delete</MenuItem>
                          </MenuList>
                          </>
                        )}
                      </Menu>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Container>
  )
}

export default Doctor