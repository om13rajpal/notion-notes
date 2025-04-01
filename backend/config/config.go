package config

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	PORT string
	MONGO_URI string
)

func LoadEnv() {
	godotenv.Load()
	PORT = getEnv("PORT", "5000")
	MONGO_URI = getEnv("MONGO_URI", "mongodb://localhost:27017/notes")
}

func getEnv(key string, fallback string) string {
	value, exists := os.LookupEnv(key)

	if exists {
		return value
	}

	return fallback
}
