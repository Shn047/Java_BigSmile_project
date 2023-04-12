package com.bigSmile.bigSmile.controller;

import com.bigSmile.bigSmile.MailSender;
import com.bigSmile.bigSmile.model.Appointment;
import com.bigSmile.bigSmile.model.Doctor;
import com.bigSmile.bigSmile.model.Patient;
import com.bigSmile.bigSmile.repository.AppointmentRepository;
import com.bigSmile.bigSmile.repository.DoctorRepository;
import com.bigSmile.bigSmile.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @PutMapping("/appointment/{appointment_id}/book/{patient_id}")
    public Appointment bookAppointment(@RequestBody Appointment appointment,@PathVariable long appointment_id,
                                       @PathVariable long patient_id) throws Exception {
        Appointment appointment1 = appointmentRepository.findById(appointment_id).orElseThrow(() -> new ClassNotFoundException("Appointment not found"));
        appointment1.setPatientName(appointment.getPatientName());
        appointmentRepository.save(appointment1);

        Patient patient = patientRepository.findById(patient_id).orElseThrow(() -> new ClassCastException("Patient Not Found"));
        patient.setAppointment(appointment1);
        patientRepository.save(patient);
//        if(patient != null && appointment1.getPatientName() != null) {
        Doctor doctor = null;
        List<Doctor> doctors = doctorRepository.findAll();
        for(Doctor dr: doctors){
            List<Appointment> DoctorAppointments = dr.getAppointments();
            for(Appointment x: DoctorAppointments) {
                if(x.equals(appointment1)) {
                    doctor = dr;
                }
            }
        }
            MailSender.sendMail(patient.getEmail(), "swanhtetnaing047.mdy@gmail.com", patient.getName(), doctor.getName(), appointment1.getTime());
//        }
        return appointment1;
    }
}
