package com.bigSmile.bigSmile.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Transactional
@Table(name = "doctor")
public class Doctor {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long id;
    @Column(name = "doctor_name")
    private String name;
    @Column(name = "doctor_email")
    private String email;
    // one doctor can have many appointments
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "doctor")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Appointment> appointments;

//    ===================================================

    public Long getDoctorId() {
        return id;
    }

    public void setDoctorId(Long doctorId) {
        this.id = doctorId;
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

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(Appointment appointments) {
        this.appointments.add(appointments);
    }

    public void updateAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
}
