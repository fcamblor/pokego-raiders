package com.pokeraiders.dao

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Repository
class PlayersRepository(@Autowired val jdbcTemplate: JdbcTemplate) {

  fun allUsers(): List<Player> = jdbcTemplate.query("SELECT ID, AMI_CODE, NICK_NAME FROM PLAYERS", { rs: ResultSet, _: Int ->
    Player(rs.getInt("id"), rs.getString("ami_code"), rs.getString("nick_name"))
  })
}

data class Player(val id: Int,
                  val amiCode: String = "",
                  val nickName: String = "")
