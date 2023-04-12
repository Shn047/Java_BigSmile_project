package com.bigSmile.bigSmile.repository;

import com.bigSmile.bigSmile.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
