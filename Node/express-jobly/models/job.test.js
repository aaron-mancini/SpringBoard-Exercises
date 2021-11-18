"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newJob = {
    title: "new",
    salary: 10000,
    equity: "0",
    companyHandle: "c1",
  };

  test("works", async function () {
    let job = await Job.create(newJob);
    expect(job).toEqual(newJob);

    const result = await db.query(
          `SELECT title, salary, equity, company_handle
           FROM jobs
           WHERE title = 'new'`);
    expect(result.rows).toEqual([
      {
        title: "new",
        salary: 10000,
        equity: "0",
        company_handle: "c1",
      },
    ]);
  });

  test("bad request with dupe", async function () {
    try {
      await Job.create(newJob);
      await Job.create(newJob);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
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
        companyHandle: "c2",
      },
      {
        title: "t3",
        salary: 80000,
        equity: "0",
        companyHandle: "c3",
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let job = await Job.get("c1");
    expect(job).toEqual([{
        title: "t1",
        salary: 80000,
        equity: "0",
        companyHandle: "c1",
    }]);
  });

  test("not found if no such company", async function () {
    try {
      await Job.get(10);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    title: "New",
    salary: 10,
    equity: "0.1",
  };

  test("works", async function () {
    let job = await Job.update(1, updateData);
    expect(job).toEqual({
      ...updateData,
      companyHandle: 'c1',
    });

    const result = await db.query(
          `SELECT title, salary, equity, company_handle
           FROM jobs
           WHERE id = 1`);
    expect(result.rows).toEqual([{
        title: "New",
        salary: 10,
        equity: "0.1",
        company_handle: 'c1',
    }]);
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
      title: "New",
      salary: 10,
      equity: null,
    };

    let job = await Job.update(1, updateDataSetNulls);
    expect(job).toEqual({
      ...updateDataSetNulls,
      companyHandle: 'c1',
    });

    const result = await db.query(
          `SELECT title, salary, equity, company_handle
           FROM jobs
           WHERE id = 1`);
    expect(result.rows).toEqual([{
        title: "New",
        salary: 10,
        equity: null,
        company_handle: 'c1',
    }]);
  });

  test("not found if no such job", async function () {
    try {
      await Job.update(10, updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Job.update(1, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** filter */

describe("filter", function () {
  test("works with just title", async function () {
    let result = await Job.filter({title: "t"});
    expect(result).toHaveLength(3);
  });

  test("works with just minSalary", async function () {
    let result = await Job.filter({minSalary: 80000});

    expect(result).toHaveLength(3);
  });

  test("works with both title and salary", async function () {
    let result = await Job.filter({title: "t1", minSalary: 80000});

    expect(result).toHaveLength(1);
  })

  test("not found if no such companies", async function () {
    try {
      await Job.filter({title: "asdfasdfas"})
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Job.remove(1);
    const res = await db.query(
        "SELECT title FROM jobs WHERE title='t1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such job", async function () {
    try {
      await Job.remove(10);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
