package com.pokeraiders.services

import com.google.common.util.concurrent.RateLimiter
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.postForEntity
import org.springframework.web.util.UriComponentsBuilder

@Service
class GoogleReCaptchaService(
        @Value("\${google.recaptcha.secret}") private val secret: String,
        @Value("\${google.recaptcha.url.verify}") private val recaptchaVerifyUri: String,
        @Value("\${google.recaptcha.max.query.per.minute}") private val recaptchaMaxQueryPerMinute: Int
) {
  private val rateLimiter: RateLimiter;

  init {
    this.rateLimiter = RateLimiter.create(recaptchaMaxQueryPerMinute / 60.0);
  }

  fun checkRecaptcha(captcha: String?): Boolean {
    // Blocking to avoid DDoSes
    this.rateLimiter.acquire(1);

    val uri = UriComponentsBuilder.fromHttpUrl(recaptchaVerifyUri)
            .queryParam("response", captcha)
            .queryParam("secret", secret)
            .build()
            .encode()
            .toUri()

    val response = RestTemplate().postForEntity<RecaptchaResponse>(uri, HttpMethod.POST).body
    return response!!.success;
  }
}

private data class RecaptchaResponse(
        val success: Boolean,
        val challengeTs: String? = null,
        val score: Int,
        val errorCodes: String? = null
)