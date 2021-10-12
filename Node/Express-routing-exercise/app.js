const express = require('express');
const ExpressError = require("./expressError")



const app = express();

const { findMode, findMean, findMedian } = require('./functions');

app.get('/mean', function(request, response, next) {
    try {
        let query = request.query.nums;
        if (query === undefined) {
            throw new ExpressError("Numbers are required", 400)
        }
        let nums = query.split(',');
        nums = nums.map(num => parseInt(num));
        if (nums.includes(NaN)) {
            throw new ExpressError("A given value was not a number", 400)
        }
        let mean = findMean(nums);
        return response.json({ "operation": "mean", "value": mean})
    } catch (err) {
        return next(err);
    }
})

app.get('/median', (req,res,next) => {
    try {
        let query = req.query.nums;
        if (query === undefined) {
            throw new ExpressError("Numbers are required", 400)
        }
        let nums = query.split(',');
        nums = nums.map(num => parseInt(num));
        if (nums.includes(NaN)) {
            throw new ExpressError("A given value was not a number", 400)
        }
        let median = findMedian(nums);
    
        return res.json({ "operation": "median", "value": median });
    } catch (err) {
        return next(err)
    }
})

app.get('/mode', (req,res,next) => {
    try {
        let query = req.query.nums;
        if (query === undefined) {
            throw new ExpressError("Numbers are required", 400)
        }
        let nums = query.split(',');
        nums = nums.map(num => parseInt(num));
        if (nums.includes(NaN)) {
            throw new ExpressError("A given value was not a number", 400)
        }
        let mode = findMode(nums);
        return res.json({ "operation": "mode", "value": mode });
    } catch (err) {
        return next(err);
    }
})

app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({error: {message, status}});
});

app.listen(3000, function () {
  console.log('App on port 3000');
});