process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let milk = { name: "Milk", price: 1.99 };

beforeEach(function() {
    items.push(milk);
});

afterEach(function() {
    items.length = 0;
});

describe("GET /items", function() {
    test("Gets a list of items", async function() {
      const resp = await request(app).get(`/items`);
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual({ items: [milk]});
    });
});

describe("GET /items/:name", function() {
    test("Gets a single item", async function() {
        const resp = await request(app).get(`/items/${milk.name}`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({ item: milk });
    });

    test("Responds with 404 if can't find item", async function() {
        const resp = await request(app).get(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("POST /items", function() {
    test("Creates a new item", async function() {
        const resp = await request(app).post(`/items`).send({ name: "cheese", price: 8.99 })

        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({added: { name: "cheese", price: 8.99 }});
    });
});

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
        const resp = await request(app).patch(`/items/${milk.name}`).send({ name: "Chocolate Milk", price: 2.99 });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: { name: "Chocolate Milk", price: 2.99 }});
    });

    test("Responds with 404 if id invalid", async function() {
        const resp = await request(app).patch(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function() {
    test("Deletes a single item", async function() {
        const resp = await request(app).delete(`/items/${milk.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
});