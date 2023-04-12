package com.bigSmile.bigSmile.controller;

import com.bigSmile.bigSmile.model.Patient;
import com.bigSmile.bigSmile.repository.PatientRepository;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/patients")
    public List<Patient> getAllPatient() {
        return patientRepository.findAll();
    }

    @GetMapping("/patient/{id}")
    public Patient getPatient(@PathVariable long id) throws ClassNotFoundException {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ClassNotFoundException("Not Found"));
    }

    @PostMapping("/patient/create/account")
    public Patient createPatientAccount(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }
//    @PutMapping("/patient/create/appointment")
//    public ResponseEntity<String> updatePatientAppointment(@RequestBody )
}
