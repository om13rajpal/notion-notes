package config

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	PORT           string
	MONGO_URI      string
	JWT_SECRET     string
	EMAIL          string
	EMAIL_PASSWORD string
)

func LoadEnv() {
	godotenv.Load()
	PORT = getEnv("PORT", "5000")
	MONGO_URI = getEnv("MONGO_URI", "mongodb://localhost:27017/notes")
	JWT_SECRET = getEnv("JWT_SECRET", "golang")
	EMAIL = getEnv("EMAIL", "")
	EMAIL_PASSWORD = getEnv("EMAIL_PASSWORD", "")
}

func getEnv(key string, fallback string) string {
	value, exists := os.LookupEnv(key)

	if exists {
		return value
	}

	return fallback
}
