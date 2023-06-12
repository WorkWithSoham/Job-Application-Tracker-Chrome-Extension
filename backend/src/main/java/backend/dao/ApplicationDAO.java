package backend.dao;

import backend.entity.Application;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationDAO extends CrudRepository<Application, Integer> {

    @NotNull
    @Override
    @Transactional
    <S extends Application> S save(@NotNull S entity);

    @NotNull
    Optional<Application> findById(@NotNull Integer integer);

    @Override
    void deleteById(@NotNull Integer integer);

    @NotNull
    @Query(value = "select * from jobext.application", nativeQuery = true)
    List<Application> findAll();
}
