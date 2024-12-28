package hu.zmesko.Appointment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.repository.ListCrudRepository;

import hu.zmesko.Appointment.model.Appointment;

public interface RepositoryInterface extends ListCrudRepository<Appointment, Integer>{

    List<Appointment> findAllByNameContains(String name);

    @NativeQuery(value = "SELECT * FROM APPOINTMENT ORDER BY ID DESC LIMIT 1")
    Appointment findLastId();
}
