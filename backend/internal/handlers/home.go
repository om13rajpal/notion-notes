package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleHome(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{
		"status":  false,
		"message": "notion notes backend is up and running",
	})
}
