package com.pokeraiders.dao.utils

import org.springframework.boot.test.util.TestPropertyValues
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.ConfigurableApplicationContext
import org.testcontainers.containers.PostgreSQLContainer
import java.time.Duration

class PokeraiderPostgresContainerInitializer private constructor() :
        ApplicationContextInitializer<ConfigurableApplicationContext> {

  override fun initialize(applicationContext: ConfigurableApplicationContext) {
    startWith(applicationContext);
  }

  companion object {
    private var started: Boolean = false;
    fun startWith(applicationContext: ConfigurableApplicationContext) {
      if(!started) {
        val postgreSQLContainer = PostgreSQLContainer<Nothing>("postgres:12")
        postgreSQLContainer.withDatabaseName("pokeraiders");
        postgreSQLContainer.withStartupTimeout(Duration.ofSeconds(300));
        postgreSQLContainer.start();

        TestPropertyValues.of(
                "spring.datasource.url="+postgreSQLContainer.jdbcUrl,
                "spring.datasource.username="+postgreSQLContainer.username,
                "spring.datasource.password="+postgreSQLContainer.password,
        ).applyTo(applicationContext.environment);

        Runtime.getRuntime().addShutdownHook(Thread() {
          postgreSQLContainer.stop();
        });

        started = true;
      }
    }
  }
}


