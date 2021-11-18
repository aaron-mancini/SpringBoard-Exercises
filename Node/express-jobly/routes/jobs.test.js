"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  AuthToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /jobs", function () {
  const newJob = {
    title: "new",
    salary: 10000,
    equity: "0",
    companyHandle: "c1",
  };

  test("ok for admins", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${AuthToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      job: newJob,
    });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
          title: "new",
          salary: 10000,
        })
        .set("authorization", `Bearer ${AuthToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
          ...newJob,
          salary: "not-a-number",
        })
        .set("authorization", `Bearer ${AuthToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    expect(resp.body).toEqual({
      jobs:
          [
            {
                title: "t1",
                salary: 80000,
                equity: "0",
                companyHandle: "c1",
              },
              {
                title: "t2",
                salary: 80000,
                equity: "0",
                companyHandle: "c3",
              },
              {
                title: "t3",
                salary: 80000,
                equity: "0",
                companyHandle: "c3",
              },
          ],
    });
  });

  test("filter works", async function () {
    const resp = await request(app).get("/jobs?title=3");
    expect(resp.body).toEqual({
      jobs:
          [
            {
                title: "t3",
                salary: 80000,
                equity: "0",
                companyHandle: "c3",
            }
          ],
    })
  });

  test("filter fails properly", async function () {
    const resp = await request(app).get("/jobs?title=c&minSalary=100000")
    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toHaveProperty("error");
  })

  test("fails: test next() handler", async function () {
    // there's no normal failure event which will cause this route to fail ---
    // thus making it hard to test that the error-handler works with it. This
    // should cause an error, all right :)
    await db.query("DROP TABLE jobs CASCADE");
    const resp = await request(app)
        .get("/jobs")
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(500);
  });
});

/************************************** GET /jobs/:id */

describe("GET /jobs/:handle", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/jobs/c1`);
    expect(resp.body).toEqual({
      jobs: [ {
        title: "t1",
        salary: 80000,
        equity: "0",
        companyHandle: "c1",
      }],
    });
  });

  test("not found for no such job", async function () {
    const resp = await request(app).get(`/jobs/aasdf`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /jobs/:id */

describe("PATCH /jobs/:id", function () {
  test("works for admins", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          title: "t1-new",
        })
        .set("authorization", `Bearer ${AuthToken}`);
    expect(resp.body).toEqual({
      job: {
        title: "t1-new",
        salary: 80000,
        equity: "0",
        companyHandle: "c1",
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          title: "t1-new",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such job", async function () {
    const resp = await request(app)
        .patch(`/job/5`)
        .send({
          title: "new nope",
        })
        .set("authorization", `Bearer ${AuthToken}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on handle change attempt", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          id: 5,
        })
        .set("authorization", `Bearer ${AuthToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on invalid data", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          salary: "not-a-num",
        })
        .set("authorization", `Bearer ${AuthToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /companies/:handle */

describe("DELETE /jobs/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .delete(`/jobs/1`)
        .set("authorization", `Bearer ${AuthToken}`);
    expect(resp.body).toEqual({ deleted: "1" });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/jobs/1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for nonAdmin user", async function () {
    const resp = await request(app)
        .delete(`/jobs/1`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  })

  test("not found for no such job", async function () {
    const resp = await request(app)
        .delete(`/jobs/10`)
        .set("authorization", `Bearer ${AuthToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});
