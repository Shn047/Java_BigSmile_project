package com.bigSmile.bigSmile.controller;

import com.bigSmile.bigSmile.CancelMail;
import com.bigSmile.bigSmile.MailSender;
import com.bigSmile.bigSmile.model.Appointment;
import com.bigSmile.bigSmile.model.Doctor;
import com.bigSmile.bigSmile.model.Patient;
import com.bigSmile.bigSmile.repository.AppointmentRepository;
import com.bigSmile.bigSmile.repository.DoctorRepository;
import com.bigSmile.bigSmile.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class DoctorController {
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private PatientRepository patientRepository;


    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @GetMapping("/doctor/{id}")
    public Doctor getDoctor(@PathVariable long id) throws ClassNotFoundException {
        return doctorRepository.findById(id)
                .orElseThrow(() ->new ClassNotFoundException());
    }

    @GetMapping("/doctor/{id}/getAppointments")
    public List<Appointment> getDoctorAppointments(@PathVariable long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow();
        return doctor.getAppointments();
    }

    @PostMapping("/doctor/create/account")
    public Doctor createDoctorAccount(@RequestBody Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @PutMapping("/doctor/{doctor_id}/appointment/create")
    public Doctor createDoctorAppointments(@RequestBody Appointment appointments,
                                                           @PathVariable long doctor_id) throws ClassNotFoundException {

        Doctor doctor = doctorRepository.findById(doctor_id).orElseThrow(() -> new ClassNotFoundException("doctor not found"));
        doctor.setAppointments(appointments);
        doctorRepository.save(doctor);
        return doctor;
    }

    @PutMapping("/doctor/{doctor_id}/edit/{appointment_id}")
    public Doctor editDoctorAppointment(@RequestBody Appointment appointment, @PathVariable(name = "doctor_id") long doctor_id,
                                                        @PathVariable(name = "appointment_id") long appointment_id) throws Exception {

        Doctor doctor = doctorRepository.findById(doctor_id).orElseThrow(() -> new ClassNotFoundException("doctor not found"));

        List<Appointment> appointments = doctor.getAppointments();
        for(Appointment appointment1: appointments) {
            if(appointment1.getId().equals(appointment_id)){
                appointment1.setTime(appointment.getTime());
                appointmentRepository.save(appointment1);
                return doctor;
            }
        }
        return null;
    }

    @DeleteMapping("/doctor/{doctor_id}/delete/{appointment_id}")
    public Doctor deleteDoctorAppointment(@PathVariable(name = "doctor_id") long doctor_id,
                                          @PathVariable(name = "appointment_id") long appointment_id) throws Exception {
//        Doctor doctor = doctorRepository.findById(doctor_id).orElseThrow(() -> new ClassNotFoundException("doctor not found"));
//        List<Appointment> appointments = doctor.getAppointments();
//        Appointment appointment = appointmentRepository.findById(appointment_id).orElseThrow(() -> new ClassNotFoundException("appointment not found"));
//        appointments.remove(appointment);
//        doctor.updateAppointments(appointments);
//        doctorRepository.save(doctor);
//        Patient patient = null;
//        List<Doctor> doctors = doctorRepository.findAll();
//        for(Doctor dr: doctors){
//            List<Appointment> DoctorAppointments = dr.getAppointments();
//            for(Appointment x: DoctorAppointments) {
//                if(x.equals(appointment)) {
//                    doctor = dr;
//                }
//            }
//        }
//        MailSender.sendMail(patient.getEmail(), "swanhtetnaing047.mdy@gmail.com", patient.getName(), doctor.getName(), appointment1.getTime());
        Doctor doctor = doctorRepository.findById(doctor_id).orElseThrow(() -> new ClassNotFoundException("doctor not found"));
        List<Appointment> appointments = doctor.getAppointments();
        Appointment appointment = appointmentRepository.findById(appointment_id).orElseThrow(() -> new ClassNotFoundException("appointment not found"));

        // Getting the corresponding patient before deleting
        List<Patient> patients = patientRepository.findAll();
        for (Patient pt: patients) {
            if(pt.getName().equals(appointment.getPatientName())) {
                CancelMail.sendMail(pt.getEmail(), "swanhtetnaing047.mdy@gmail.com", pt.getName(), doctor.getName(), appointment.getTime());
            }
        }

        appointments.remove(appointment);
        doctor.updateAppointments(appointments);
        doctorRepository.save(doctor);

        return doctor;
    }

}
