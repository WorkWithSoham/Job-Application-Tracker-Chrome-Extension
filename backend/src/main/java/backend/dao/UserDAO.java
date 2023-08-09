package backend.dao;

import backend.entity.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDAO extends CrudRepository<User, Integer> {

    @NotNull
    @Override
    <S extends User> S save(@NotNull S entity);

    @NotNull
    Optional<User> findById(@NotNull Integer integer);

    @NotNull
//    @Query(value = "select * from user", nativeQuery = true)
    List<User> findAll();

    void deleteById(@NotNull Integer user_id);

    @Query("SELECT u FROM User u WHERE u.email = :email")
    User findByEmail(@NotNull String email);

}
