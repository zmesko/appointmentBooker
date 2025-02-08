package hu.zmesko.Appointment.repository;

import org.springframework.data.repository.ListCrudRepository;

import hu.zmesko.Appointment.model.User;

public interface UsersRepository extends ListCrudRepository<User, String> {

    User findByUsername(String username);
}
