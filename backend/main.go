package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Article struct {
	Title   string `json: "ArticleTitle"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}
type Nurse struct {
	FullName      string `json: "fullName"`
	Email         string `json:"desc"`
	Contact       string `json:"content"`
	WorkingDays   string `json:"workingDays"`
	DutyStartTime string `json:"dutyStartTime"`
	DutyEndTime   string `json:"dutyEndTime"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type Articles []Article

type Nurses []Nurse

func allArticles(w http.ResponseWriter, r *http.Request) {
	articles := Articles{
		Article{Title: "Test Title", Desc: "Test desc", Content: "Hello world"},
	}
	fmt.Println("Endpoint hit All articles endpoint")
	json.NewEncoder(w).Encode(articles)
}

func testLogin(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Test post endpoint worked")
}

func getNurse(w http.ResponseWriter, r *http.Request) {
	nurses := Nurses{
		Nurse{
			FullName:      "Full name",
			Email:         "test@test.test",
			Contact:       "1234567890",
			WorkingDays:   "Monday",
			DutyStartTime: "10:00am",
			DutyEndTime:   "10:00pm",
		},
	}
	fmt.Println("Endpoint hit All articles endpoint")
	json.NewEncoder(w).Encode(nurses)
}

func addNurse(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Add nurse endpoint worked")
}

func deleteNurse(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Delete endpoint worked")
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Home page endpoint hit")
}

func handleRequest() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/articles", allArticles).Methods(("GET"))

	myRouter.HandleFunc("/login", testLogin).Methods(("POST"))

	myRouter.HandleFunc("/nurse", getNurse).Methods(("Get"))
	myRouter.HandleFunc("/nurse", addNurse).Methods(("POST"))
	myRouter.HandleFunc("/nurse", deleteNurse).Methods(("DELETE"))
	log.Fatal(http.ListenAndServe(":8081", myRouter))
}

func main() {
	handleRequest()
}
