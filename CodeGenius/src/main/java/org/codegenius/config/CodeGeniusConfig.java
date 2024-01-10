package org.codegenius.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class CodeGeniusConfig {
    @Value("${openai.key}")
    private String apiKey;

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate template = new RestTemplate();

        template.getInterceptors().add(((request, body, execution) -> {
            request.getHeaders().add("Authorization", "Bearer " + apiKey);
            return execution.execute(request, body);
        }));

        return template;
    }
}