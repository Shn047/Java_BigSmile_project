package com.bigSmile.bigSmile.repository;

import com.bigSmile.bigSmile.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
