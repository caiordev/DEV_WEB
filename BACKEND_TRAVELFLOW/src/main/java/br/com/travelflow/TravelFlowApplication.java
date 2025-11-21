package br.com.travelflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TravelFlowApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelFlowApplication.class, args);
	}

}
