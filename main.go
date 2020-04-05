package main

import (
	middleware "dcard-homework/middleware"
	"net/http/httputil"
	"net/url"

	"github.com/gin-gonic/gin"
)

func reverseProxy(target string) gin.HandlerFunc {
	url, err := url.Parse(target)
	if err != nil {
		/// TODO error handling
	}
	proxy := httputil.NewSingleHostReverseProxy(url)
	return func(c *gin.Context) {
		proxy.ServeHTTP(c.Writer, c.Request)
	}
}

func main() {
	router := gin.Default()

	dcard := router.Group("/dcard")
	dcard.Use(middleware.MaxAllowed(1)) //限制同時連線的數量，以避免mongoDB的limit collection產生race condition。TODO: 對特定IP限制同時連線的數量，而不是全部的IP，這樣才不會對效能產生影響，應該可用redis實作
	dcard.Use(middleware.RateLimit())
	// dcard.Use(ACL.MiddlewareRateLimit()) TODO: should implement
	{
		dcard.GET("/*path", reverseProxy("http://localhost:3000/"))
	}

	router.Run()
}
