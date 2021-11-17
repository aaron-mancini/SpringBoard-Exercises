process.env.NODE_ENV = "test";

const db = require("./db");
const Book = require("./models/book");
const request = require("supertest");
const app = require("./app");

describe("Test book routes", function () {
    let isbn = "0691161518";
    let OGBook = {
        isbn: isbn,
        amazon_url: "http://a.co/eobPtX2",
        author: "Matthew Lane",
        language: "english",
        pages: 264,
        publisher: "Princeton University Press",
        title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        year: 2017
      }

    beforeEach(async function () {
        await db.query("DELETE FROM books");
        
        let book = await Book.create(OGBook);
    });

    test("get all books - /books", async function () {
        let response = await request(app)
            .get("/books");

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(expect.objectContaining(
            {books: expect.any(Array)
            }
          )
        )
        expect(response.body.books.length).toEqual(1);
    });

    describe("test get by isbn route", function () {
        test("get book by isbn - /:isbn", async function () {
            let response = await request(app)
                .get(`/books/${isbn}`);
            
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual(expect.objectContaining(
                {book: expect.any(Object)
                }
              )
            )
            expect(response.body.book.author).toEqual("Matthew Lane")
        });

        test("handles invalid isbn", async function () {
            let response = await request(app)
                .get("/books/1")

            expect(response.statusCode).toEqual(404);
        })
    })

    describe("Test post route", function () {
        test("post a book - /books", async function () {
            let book = {
                isbn: "123456789",
                amazon_url: "http://test.com/test",
                author: "Test Author",
                language: "test",
                pages: 123,
                publisher: "Test Publisher",
                title: "Test Title",
                year: 2021
              }
            let response = await request(app)
              .post("/books")
              .send(book);
            
            expect(response.statusCode).toEqual(201);
            expect(response.body).toEqual(expect.objectContaining(
                {book: book
                }
              )
            )
        });

        test("post a invalid book - /books", async function () {
            let book = {
                isbn: "123456789",
                amazon_url: "http://test.com/test",
                language: "test",
                pages: 123,
                publisher: "Test Publisher",
                title: "Test Title",
                year: 2021
              }
            let response = await request(app)
              .post("/books")
              .send(book);
            
            expect(response.statusCode).toEqual(400);
            expect(response.text).toContain("instance requires property \\\"author\\\"")
        });
    })

    describe("tests for update route", function () {
        let book = {
            amazon_url: "http://a.co/eobPtX2",
            author: "Test",
            language: "english",
            pages: 264,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            year: 2017
          }
        let expectedBook = {
            isbn: isbn,
            amazon_url: "http://a.co/eobPtX2",
            author: "Test",
            language: "english",
            pages: 264,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            year: 2017
          }
        test("update a book by isbn - /:isbn", async function () {
            let response = await request(app)
                .put(`/books/${isbn}`)
                .send(book);

            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual(expect.objectContaining(
                {book: expectedBook
                }
              )
            )
        });

        test("attempt to update invaild book", async function () {
            let response = await request(app)
                .put("/books/1")
                .send(book);

            expect(response.statusCode).toEqual(404);
        });

        test("attempt to update valid book with invaild response", async function () {
            let response = await request(app)
                .put(`/books/${isbn}`)
                .send({            
                    amazon_url: "http://a.co/eobPtX2",
                    author: "Test",
                    pages: 264,
                    publisher: "Princeton University Press",
                    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                    year: 2017
                });

            expect(response.statusCode).toEqual(400);
            expect(response.text).toContain("instance requires property \\\"language\\\"")
        });
    })


    test("delete a book by isbn - /:isbn", async function () {
        let response = await request(app)
            .delete(`/books/${isbn}`)

        expect(response.statusCode).toEqual(200);
        expect(response.text).toContain("Book deleted")
    });
});

afterAll(async function () {
    await db.end();
});