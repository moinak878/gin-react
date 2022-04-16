package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
)

func main() {
  
  router := gin.Default()
  router.Use(cors.Middleware(cors.Config{
	Origins:        "*",
	Methods:        "GET, PUT, POST, DELETE",
	RequestHeaders: "Origin, Authorization, Content-Type",
	ExposedHeaders: "",
	Credentials: false,
	ValidateHeaders: false,
}))
  api := router.Group("/api")
  {
    api.GET("/get", func(ctx *gin.Context) {
      ctx.JSON(200, gin.H{"data": "hello, world"})
    })

    api.POST("/post",postData)
  }


  
  router.Run(":8080")
}
type CreatePostInput struct {
  Email string `json:"email" binding:"required"`
  Name  string `json:"name" binding:"required"`
}

func postData(c *gin.Context){
  c.Header("Content-Type", "application/json")
  var input CreatePostInput 
  if err := c.ShouldBindJSON(&input); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
  return
  }
  println(string(input.Name))
  println(string(input.Email))
  c.JSON(http.StatusOK, gin.H {
    "message":"data successfully submitted",
  })
  
}

