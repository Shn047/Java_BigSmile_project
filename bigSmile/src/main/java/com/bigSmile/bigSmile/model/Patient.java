package com.bigSmile.bigSmile.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.List;

@Entity
@Transactional
@Table(name = "patient")
public class Patient {
    @Id
    @GeneratedValue
    private Long id;
    @Column(name = "patient_name")
    private String name;
    @Column(name = "patient_email")
    private String email;

    public List<Appointment> getAppointment() {
        return appointments;
    }
    public void updateAppointment(List<Appointment> appointments) {
        this.appointments = appointments;
    }
    public void setAppointment(Appointment appointment) {
        this.appointments.add(appointment);
    }

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_id")
    private List<Appointment> appointments;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public Appointment getAppointment() {
//        return appointment;
//    }
//
//    public void setAppointment(Appointment appointment) {
//        this.appointment = appointment;
//    }
}
