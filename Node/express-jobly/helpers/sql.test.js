const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

let jsToSql = {
    firstName: "first_name",
    lastName: "last_name",
    isAdmin: "is_admin",
  }

describe("sqlForPartialUpdate", function () {
    test("Returns error with no data", function () {
        let data = {};

        try {
            sqlForPartialUpdate(data, jsToSql);
        } catch (error) {
            expect(error instanceof BadRequestError).toBeTruthy();
            expect(error.message).toEqual("No data");
        }
    });

    test("works", function () {
        let data = {age: 28}
        let result = sqlForPartialUpdate(data, jsToSql);

        expect(result).toEqual({ setCols: "\"age\"=$1", values: [28]})
    })
})