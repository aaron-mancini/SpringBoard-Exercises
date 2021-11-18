"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
      /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, company_handle }
   *
   * Returns { title, salary, equity, company_handle }
   *
   * Throws BadRequestError if job already in database.
   * */

    static async create({ title, salary, equity, companyHandle }) {
        const duplicateCheck = await db.query(
            `SELECT title
             FROM jobs
             WHERE title = $1 AND company_handle = $2`,
          [title, companyHandle]);

        if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate job: ${title}, ${companyHandle}`);
        
        const result = await db.query(
            `INSERT INTO jobs
                (title, salary, equity, company_handle)
                VALUES ($1, $2, $3, $4)
                RETURNING title, salary, equity, company_handle AS "companyHandle"`,
            [
            title,
            salary,
            equity,
            companyHandle,
            ],
        );
        const job = result.rows[0];
    
        return job;
    }

      /** Find all jobs.
   *
   * Returns [{ title, salary, equity, company_handle }, ...]
   * */

    static async findAll() {
        const jobsRes = await db.query(
            `SELECT title,
                    salary,
                    equity,
                    company_handle AS "companyHandle"
            FROM jobs
            ORDER BY title`);
        return jobsRes.rows;
    }

      /** Given a job company_handle, return jobs for that company.
   *
   * Returns [{ title, salary, equity, company_handle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

    static async get(handle) {
        const jobRes = await db.query(
            `SELECT title,
                    salary,
                    equity,
                    company_handle AS "companyHandle"
            FROM jobs
            WHERE company_handle = $1`,
            [handle]);

        const job = jobRes.rows;

        if (job.length === 0) throw new NotFoundError(`No jobs: ${handle}`);

        return job;
    }

    /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: { title, salary, equity }
   *
   * Returns { title, salary, equity, company_handle }
   *
   * Throws NotFoundError if not found.
   */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                companyHandle: "company_handle",
            });
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE jobs 
                            SET ${setCols} 
                            WHERE id = ${idVarIdx} 
                            RETURNING title, 
                                    salary, 
                                    equity, 
                                    company_handle AS "companyHandle"`;
        const result = await db.query(querySql, [...values, id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);

        return job;
    }

      /** Filter jobs based on title, minSalary and/or hasEquity
     *
     * Throws NotFoundError if no job is found.
     **/

    static async filter(query) {
        let createFilter = [];
        if(query.title) {
            createFilter.push(`LOWER(title) LIKE '%${query.title}%'`)
        }
        if (query.minSalary) {
            createFilter.push(`salary >= ${query.minSalary}`)
        }
        if (query.hasEquity) {
            createFilter.push(`equity = ${query.hasEquity}`)
        }
        let filter = createFilter.join(" AND ")

        const result = await db.query(
            `SELECT title,
                    salary,
                    equity,
                    company_handle AS "companyHandle"
            FROM jobs
            WHERE ${filter}
            ORDER BY title`
        )
        const jobs = result.rows;

        if (!jobs) throw new NotFoundError(`No jobs found with given query.`)

        return jobs;
    }

        /** Delete given job from database; returns undefined.
     *
     * Throws NotFoundError if job not found.
     **/

    static async remove(id) {
        const result = await db.query(
            `DELETE
            FROM jobs
            WHERE id = $1
            RETURNING id`,
            [id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);
    }
}

module.exports = Job;