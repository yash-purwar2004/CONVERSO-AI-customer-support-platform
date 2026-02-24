package com.example.conversoBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class ConversoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConversoBackendApplication.class, args);
	}

}