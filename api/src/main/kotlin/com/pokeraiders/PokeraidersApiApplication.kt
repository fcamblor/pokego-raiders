package com.pokeraiders

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PokeraidersApiApplication

fun main(args: Array<String>) {
	runApplication<PokeraidersApiApplication>(*args)
}
