package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/om13rajpal/notion-notes/internal/handlers"
)

func InitRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()
	router.SetTrustedProxies(nil)

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
	}))
	

	router.GET("/", handlers.HandleHome)
	router.POST("/signup", handlers.SignupHandler)
	router.POST("/login", handlers.LoginHandler)

	return router
}
