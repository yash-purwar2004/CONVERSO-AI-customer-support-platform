package com.example.conversoBackend.tenant.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.conversoBackend.tenant.model.Tenant;
import com.example.conversoBackend.tenant.services.interfaces.TenantService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController // marks this class as a REST controller, enabling Spring to handle HTTP requests and responses
@RequestMapping("/tenants") // base path for all tenant-related endpoints
public class TenantController {

    @Autowired
    private TenantService tenantService;
    
    @PostMapping("/createTenant")
    public Tenant createTenant(@RequestBody Tenant tenant) {
        return tenantService.createTenant(tenant);
    }


    @GetMapping("/id/{tenantId}")
    public Tenant getTenantById(@PathVariable String tenantId) {
        return tenantService.getTenantById(tenantId);
    }

    @GetMapping("/all")
    public Iterable<Tenant> getAllTenants() {
        return tenantService.getAllTenants();
    }

    @PostMapping("/updateTenant/{tenantId}")
    public Tenant updateTenant(@PathVariable String tenantId, @RequestBody Tenant tenant) { 
        return tenantService.updateTenant(tenantId, tenant);
    }   

   @DeleteMapping("/{tenantId}")
    public void deleteTenant(@PathVariable String tenantId) {
        tenantService.deleteTenant(tenantId);
    }

    @PostMapping("/activateTenant/{tenantId}")
    public void activateTenant(@PathVariable String tenantId) { //
        tenantService.activateTenant(tenantId);
    }

    @PostMapping("/deactivateTenant/{tenantId}")
    public void deactivateTenant(@PathVariable String tenantId) {
        tenantService.deactivateTenant(tenantId);
    }
    
}
