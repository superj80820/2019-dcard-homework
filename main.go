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
	dcard.Use(middleware.RateLimit())
	// dcard.Use(ACL.MiddlewareRateLimit()) TODO: should implement
	{
		dcard.GET("/*path", reverseProxy("http://localhost:3000/"))
	}

	router.Run()
}
