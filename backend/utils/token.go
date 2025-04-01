package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/om13rajpal/notion-notes/config"
)

func GenerateToken() (string, error) {
	claims := jwt.MapClaims{
		"iss": "omrajpal",
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(config.JWT_SECRET))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
