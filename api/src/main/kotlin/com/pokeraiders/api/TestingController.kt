package com.pokeraiders.api

import com.pokeraiders.dao.PlayersRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/testing")
class TestingController(
        private val playersRepository: PlayersRepository
) {

  @GetMapping("/players")
  @ResponseBody
  fun list() = playersRepository.allUsers()
}
