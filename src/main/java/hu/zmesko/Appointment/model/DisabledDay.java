package hu.zmesko.Appointment.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class DisabledDay {
    @Id 
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "disabledday_seq")
    @SequenceGenerator(name = "disabledday_seq", sequenceName = "disabledday_seq", allocationSize = 1)
    private Integer id;
    private String name;
    private LocalDate disabledDay;
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public LocalDate getDisabledDay() {
        return disabledDay;
    }
    public void setDisabledDay(LocalDate disabledDay) {
        this.disabledDay = disabledDay;
    }

    
}
