package middleware

import (
	noSQL "dcard-homework/model"
	"dcard-homework/utils"
	"fmt"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func RateLimit() gin.HandlerFunc {
	////////// Closure function //////////
	setPassHeader := func(c *gin.Context, remaining string, resetTime string) {
		c.Writer.Header().Set("X-RateLimit-Remaining", remaining)
		c.Writer.Header().Set("X-RateLimit-Reset", resetTime)
	}
	respondWithError := func(c *gin.Context, code int, message string) {
		resp := map[string]string{"error": message}
		c.JSON(code, resp)
		c.Abort()
	}

	////////// Use singleton DB //////////
	client := noSQL.GetInstanceDB()
	collection := client.Database("test").Collection("limit")

	return func(c *gin.Context) {
		ipaddress := c.ClientIP()

		checkExistResult, checkExistError := noSQL.CheckExist(collection, bson.M{"ipaddress": ipaddress})
		if checkExistError != nil {
			fmt.Println("checkExistError()", checkExistError)
			respondWithError(c, 500, "DB error")
			return
		}
		if checkExistResult {
			readIPDocumentResult, readIPDocumentError := noSQL.ReadIPDocument(collection, bson.M{"ipaddress": ipaddress})
			if readIPDocumentError != nil {
				fmt.Println("readIPDocumentError()", readIPDocumentError)
				respondWithError(c, 500, "DB error")
				return
			}
			if readIPDocumentResult.IPAddress == ipaddress {
				if utils.IsLessThanAnHour(readIPDocumentResult.ExpiresTime) {
					if readIPDocumentResult.Count < 1000 {
						noSQL.UpdateIPDocument(collection, ipaddress, bson.D{{"$set", bson.D{{"count", readIPDocumentResult.Count + 1}}}})
						setPassHeader(c, strconv.Itoa(1000-readIPDocumentResult.Count-1), time.Unix(readIPDocumentResult.ExpiresTime+3600, 0).Format(time.RFC3339))
						c.Next()
					} else if readIPDocumentResult.Count >= 1000 {
						respondWithError(c, 429, "Too Many Requests")
						return
					}
				} else {
					now := time.Now().Unix()
					noSQL.UpdateIPDocument(collection, ipaddress, bson.D{{"$set", bson.M{"count": 0, "expirestime": now}}})
					setPassHeader(c, "999", time.Unix(now+3600, 0).Format(time.RFC3339))
					c.Next()
				}
			}
		} else {
			now := time.Now().Unix()
			insertIPDocumentResult, insertIPDocumentError := noSQL.InsertIPDocument(collection, ipaddress, now)
			if insertIPDocumentError != nil {
				fmt.Println("insertIPDocumentError(): ", insertIPDocumentError)
				respondWithError(c, 500, "DB error")
				return
			}
			fmt.Println(insertIPDocumentResult)
			setPassHeader(c, "999", time.Unix(now+3600, 0).Format(time.RFC3339))
			c.Next()
		}
	}
}
