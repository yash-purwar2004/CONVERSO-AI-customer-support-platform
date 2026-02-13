package com.example.conversoBackend.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.conversoBackend.user.model.User;


public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    Optional<User> findByTenantIdAndId(String tenantId, String id);

    List<User> findByTenantId(String tenantId);

    boolean existsByEmail(String email);

}
