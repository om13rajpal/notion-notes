package main

import (
	"github.com/om13rajpal/notion-notes/config"
	"github.com/om13rajpal/notion-notes/internal/database"
	"github.com/om13rajpal/notion-notes/internal/routes"
)

func main() {
	config.LoadEnv()
	database.ConnectMongo()

	r := routes.InitRouter()

	r.Run(":" + config.PORT)
}
