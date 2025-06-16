package com.springboot.rekruteIT.repository;

import com.springboot.rekruteIT.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Correct method for username OR email search
    Optional<User> findByUsernameOrEmail(String username, String email);

    Optional<User> findById(Integer integer);

    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
