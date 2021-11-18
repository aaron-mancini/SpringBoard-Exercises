"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");
const Job = require("../models/job");

const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");

const router = new express.Router();

/** POST / { job } =>  { job }
 *
 * job should be { title, salary, equity, company_handle }
 *
 * Returns { title, salary, equity, company_handle }
 *
 * Authorization required: Admin
 */

router.post("/", ensureAdmin, async function (req, res, next) {
try {
    const validator = jsonschema.validate(req.body, jobNewSchema);
    if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
    }

    const job = await Job.create(req.body);
    return res.status(201).json({ job });
} catch (err) {
    return next(err);
}
});

/** GET /  =>
 *   { jobs: [ { title, salary, equity, companyHandle }, ...] }
 *
 * Can filter on provided search filters:
 * - minSalary
 * - hasEquity
 * - title (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
try {
    let query = req.query;
    if (Object.keys(query).length) {
    const jobs = await Job.filter(query);
    if (jobs.length === 0) throw new BadRequestError(`No company found with given query:${JSON.stringify(query)}`)
    return res.json({ jobs })
    }
    
    const jobs = await Job.findAll();
    return res.json({ jobs });
} catch (err) {
    return next(err);
}
});

/** GET /[handle]  =>  { jobs }
 *
 *  Job is { title, salary, equity, companyHandle }
 *   
 *
 * Authorization required: none
 */

router.get("/:handle", async function (req, res, next) {
try {
    const jobs = await Job.get(req.params.handle);
    return res.json({ jobs });
} catch (err) {
    return next(err);
}
});

/** PATCH /[id] { fld1, fld2, ... } => { job }
 *
 * Patches job data.
 *
 * fields can be: { title, salary, equity }
 *
 * Returns { title, salary, equity, companyHandle }
 *
 * Authorization required: Admin
 */

router.patch("/:id", ensureAdmin, async function (req, res, next) {
try {
    const validator = jsonschema.validate(req.body, jobUpdateSchema);
    if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
    }

    const job = await Job.update(req.params.id, req.body);
    return res.json({ job });
} catch (err) {
    return next(err);
}
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization: Admin
 */

router.delete("/:id", ensureAdmin, async function (req, res, next) {
try {
    await Job.remove(req.params.id);
    return res.json({ deleted: req.params.id });
} catch (err) {
    return next(err);
}
});

  
module.exports = router;
  