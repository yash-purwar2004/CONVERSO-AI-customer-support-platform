package com.example.conversoBackend.user.services.interfaces;

import java.util.List;


import com.example.conversoBackend.user.model.User;

public interface userService {

    // READ USER
    User getUserById(String tenantId, String userId);
    List<User> getAllUsers(String tenantId); // ADMIN ONLY

    // UPDATE USER
    User updateUser(String tenantId, String userId, User entity);

    // DELETE USER
    void deleteUser(String tenantId, String userId);

    // USER STATUS MANAGEMENT
    void activateUser(String tenantId, String userId);
    void deactivateUser(String tenantId, String userId);

    // PASSWORD MANAGEMENT
    void forgotPassword(String email);





}
