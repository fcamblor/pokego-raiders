package com.pokeraiders

import com.pokeraiders.dao.PlayersRepository
import com.pokeraiders.dao.utils.PokeraiderPostgresContainerInitializer
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ContextConfiguration


@SpringBootTest
@ContextConfiguration(initializers = [PokeraiderPostgresContainerInitializer::class])
class PokeraidersApiApplicationTests(@Autowired val playersRepository: PlayersRepository) {

  @Test
  fun contextLoads() {
    assertThat(playersRepository.allUsers().size).isEqualTo(1)
    assertThat(playersRepository.allUsers().get(0).nickName).isEqualTo("fcr33140")
  }
}
