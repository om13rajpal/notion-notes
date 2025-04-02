package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/om13rajpal/notion-notes/internal/database"
	"github.com/om13rajpal/notion-notes/internal/models"
	"github.com/om13rajpal/notion-notes/utils"
)

func SignupHandler(c *gin.Context) {
	var user models.User

	err := c.BindJSON(&user)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Invalid request",
		})
	}

	password, err := utils.HashPassword(user.Password)

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status":  false,
			"message": "Error hashing password",
		})
		return
	}

	user.Password = password

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := database.UserCollection.InsertOne(ctx, user)

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status":  false,
			"message": "Error inserting user",
		})
		return
	}

	go utils.SendMail(user.Email)

	token, err := utils.GenerateToken()

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status":  false,
			"message": "Error generating token",
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"status":  true,
		"token":   token,
		"message": "User created successfully",
		"data":    result,
	})
}

func LoginHandler(c *gin.Context) {
	var user models.User

	err := c.BindJSON(&user)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"status":  false,
			"message": "Invalid request",
		})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var foundUser models.User
	err = database.UserCollection.FindOne(ctx, models.User{Email: user.Email}).Decode(&foundUser)

	if err != nil {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{
			"status":  false,
			"message": "Invalid email or password",
		})
		return
	}

	isValidPassword := utils.CheckPassword(user.Password, foundUser.Password)

	if !isValidPassword {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{
			"status":  false,
			"message": "Invalid email or password",
		})
		return
	}

	token, err := utils.GenerateToken()

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"status":  false,
			"message": "Error generating token",
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"status":  true,
		"token":   token,
		"message": "Login successful",
	})
}
