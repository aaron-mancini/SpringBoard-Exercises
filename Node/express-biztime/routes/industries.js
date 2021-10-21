const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const results = await db.query(`SELECT i.industry, ci.company_code FROM industries AS i
                                        LEFT JOIN company_industries AS ci
                                        ON i.code = ci.industry_code`);
        let industries = [];
        for (let industry of results.rows) {
            let details = {};
            details.industry = industry.industry;
            console.log(industry.company_code)
            details.companies = industry.company_code;
            industries.push(details)
        }
        return res.json({ industries: industries });
    } catch (e) {
        return next(e);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { code, industry } = req.body;
        const results = await db.query(`INSERT INTO industries (code, industry)
                                        VALUES (1$,2$)
                                        RETURNING code, industry`, [code,industry]);
        return res.status(201).json({ industry: results.rows[0] });
    } catch (e) {
        return next(e);
    }
})

module.exports = router;