package hu.zmesko.Appointment.repository;

import org.springframework.data.repository.ListCrudRepository;

import hu.zmesko.Appointment.model.DisabledDay;

public interface DisabledDayRepository extends ListCrudRepository<DisabledDay, Integer>{

}
