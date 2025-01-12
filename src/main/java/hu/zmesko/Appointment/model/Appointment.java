package hu.zmesko.Appointment.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Appointment {

    @Id
    private Integer id;
    private String name;
    private String email;
    private String mobileNumber;
    private LocalDateTime bookedAppointment;
    private LocalDateTime timeWhenBooked = LocalDateTime.now();

    public Appointment() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public LocalDateTime getBookedAppointment() {
        return bookedAppointment;
    }

    public void setBookedAppointment(LocalDateTime bookedAppointment) {
        this.bookedAppointment = bookedAppointment;
    }

    public LocalDateTime getTimeWhenBooked() {
        return timeWhenBooked;
    }

    public void setTimeWhenBooked(LocalDateTime timeWhenBooked) {
        this.timeWhenBooked = timeWhenBooked;
    }

}
