package hu.zmesko.Appointment.repository;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import hu.zmesko.Appointment.model.Appointment;

@Repository
public class AppointmentsRespository {

    private final List<Appointment> appointments;

    private static int id = 1;

    public AppointmentsRespository(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public List<Appointment> showAll() {
        return appointments;
    }

    public Appointment findById(int id) {
        int i = 0;
        while (appointments.get(i).getId() != id && i < appointments.size()) {
            i++;
        }

        if (i < appointments.size()) {
            return appointments.get(i);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The id not found");
        }
    }

    public void addAppointment(Appointment appointment) {
        appointment.setId(id);
        appointments.add(appointment);
        id++;
    }

    public void updateById(int id, Appointment updateAppointment) {

        int i = 0;
        while (appointments.get(i).getId() != id && i < appointments.size()) {
            i++;
        }

        if (i < appointments.size()) {
            updateAppointment.setId(appointments.get(i).getId());
            updateAppointment.setTimeWhenBooked(appointments.get(i).getTimeWhenBooked());
            appointments.set(i, updateAppointment);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The id not found");
        }

    }

    public void deleteById(int id) {

        int i = 0;
        while (appointments.get(i).getId() != id && i < appointments.size()) {
            i++;
        }

        if (i < appointments.size()) {
            appointments.remove(i);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The id not found");
        }

    }
}
