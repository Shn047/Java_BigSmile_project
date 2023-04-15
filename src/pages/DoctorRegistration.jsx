import { Button, Container, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const DoctorRegistration = () => {

  const navigation = useNavigate();

  const initial = {
    name: "",
    email: "",
  }
  const formik = useFormik({
    initialValues: initial,
    onSubmit: async(values) => {
      var id="";
      const result = await fetch("http://localhost:8080/doctor/create/account", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(data => data.json().then(data => {
        console.log(data);
        id = data?.doctorId;
        console.log(id);
        values = initial;
        if(id != "") {
          navigation(`/doctor/${id}`)
        }
      })).catch(err => console.log(err, " Failed "))
      
    }
  })

  return (
    <Container height="100vh" display="flex" flexDirection="column" justifyContent={'center'} alignItems="center">
      <Text as="h1" fontSize={'32px'} fontWeight="bold">Big Smile</Text>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '6px'}}>
        {/* <legend fontSize={'6px'}>Registeration</legend> */}
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Button colorScheme="teal" type="submit" width="full">Submit</Button>
      </form>
    </Container>
  )
}

export default DoctorRegistration