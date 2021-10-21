process.env.NODE_ENV = "test";

const request = require("supertest");
const db = require("../db");

const app = require("../app");

let testCompany = { code: "pnc", name: "PNC Bank", description: "a bank" }
let testcomp;

beforeEach(async function() {
    let res = await db.query(`INSERT INTO companies (code, name, description) 
                                VALUES ('pnc', 'PNC Bank', 'a bank')
                                RETURNING code, name, description`);
    testcomp = res.rows[0];
})

afterEach(async function() {
    await db.query(`DELETE FROM companies`);
})

afterAll(async function() {
    await db.end();
});

describe("GET /companies", function() {
    test("Gets a list of companies", async function() {
        const resp = await request(app).get(`/companies`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ companies: [testcomp] });
    })
})

describe("GET /companies/:code", function() {
    test("Gets a single company", async function() {
        const resp = await request(app).get(`/companies/${testcomp.code}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ company: testcomp, invoices: [] });
    })

    test("Responds with 404 if can't find company", async function() {
        const resp = await request(app).get(`/companies/asdf`);
        expect(resp.statusCode).toBe(404);
    })
})

describe("POST /companies", function() {
    test("Creates a new company", async function() {
        const resp = await request(app).post(`/companies`)
            .send({
                code: "apple",
                name: "Apple Inc.",
                description: "they make apples."
            });
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({ company: {
            code: "apple-inc",
            name: "Apple Inc.",
            description: "they make apples."
        }});
    })
})

describe("PATCH /companies/:code", function(){
    test("Updates a single company", async function() {
        const resp = await request(app).patch(`/companies/${testcomp.code}`)
            .send({
                name: "still pnc",
                description: "still a bank"
            });
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            company: {
                code: "pnc",
                name: "still pnc",
                description: "still a bank"
            }});
    })

    test("Responds with 404 if can't find company", async function() {
        const resp = await request(app).patch(`/companies/asdf`);
        expect(resp.statusCode).toEqual(404);
    })
})

describe("DELETE /companies/:code", function(){
    test("Deletes a company", async function() {
        const resp = await request(app).delete(`/companies/${testcomp.code}`);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({ msg: "Deleted" })
    })
})