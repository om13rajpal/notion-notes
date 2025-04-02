package utils

import (
	"fmt"

	"github.com/om13rajpal/notion-notes/config"
	"gopkg.in/gomail.v2"
)

func SendMail(to string) {
	d := gomail.NewDialer("smtp.gmail.com", 587, config.EMAIL, config.EMAIL_PASSWORD)

	m := gomail.NewMessage()

	m.SetHeader("From", config.EMAIL)
	m.SetHeader("To", to)
	m.SetHeader("Subject", "Welcome to Om's Notion Notes")
	m.SetBody("text/html", "<p>Welcome to Om's Notion Notes</p><br><p>I am glad to have you on board.</p><br><p>Om Rajpal</p>")

	err := d.DialAndSend(m)

	if err != nil {
		fmt.Println(err)
	}
}
