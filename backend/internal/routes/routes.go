package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/om13rajpal/notion-notes/internal/handlers"
)

func InitRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()
	router.SetTrustedProxies(nil)

	router.GET("/", handlers.HandleHome)
	router.POST("/signup", handlers.SignupHandler)
	router.POST("/login", handlers.LoginHandler)

	return router
}