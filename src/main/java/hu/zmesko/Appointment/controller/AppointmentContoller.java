package hu.zmesko.Appointment.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.zmesko.Appointment.model.Appointment;
import hu.zmesko.Appointment.repository.RepositoryInterface;

@RestController
@RequestMapping("/api/appointment")
@CrossOrigin
public class AppointmentContoller {

    private final RepositoryInterface repository;

    public AppointmentContoller(RepositoryInterface repository) {
        this.repository = repository;
    }

    //Get last id
    /*@Bean
    CommandLineRunner commandLineRunner(){
        return args ->{
                if (repository.findLastId() == null) {
                    id = 1;
                }else {
                    id = repository.findLastId().getId() + 1;
                }
        };
    }*/

    @GetMapping("")
    public List<Appointment> findAll() {

        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Appointment> findById(@PathVariable int id) {
        return repository.findById(id);
    }

    @PostMapping("")
    public void addApointment(@RequestBody Appointment appointment) {
        repository.save(appointment);
    }

    @PutMapping("/{id}")
    public void updateById(@PathVariable int id, @RequestBody Appointment updatedAppointment) {
        updatedAppointment.setId(id);
        repository.save(updatedAppointment);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable int id) {

        repository.deleteById(id);
    }

    @GetMapping("/filter/{name}")
    public List<Appointment> findByName(@PathVariable String name) {
        return repository.findAllByNameContains(name);
    }
}
