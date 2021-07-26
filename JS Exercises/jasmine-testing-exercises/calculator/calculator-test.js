
it('should calculate the monthly payment correctly', function () {
  expect(calculateMonthlyPayment({amount: 5000, years: 2, rate: 6})).toEqual('221.60')
});


it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({amount: 5009, years: 2, rate: 6})).toEqual('222.00')
});

/// etc
it('should return result with very large loan', () => {
  expect(calculateMonthlyPayment({amount: 500000, years: 10, rate: 8})).toEqual('6066.38')
});

it('should return result with bad intrest rate', () => {
  expect(calculateMonthlyPayment({amount: 10000, years: 5, rate: 89})).toEqual('751.94')
});

it('should return result with very high monthly payment', () => {
  expect(calculateMonthlyPayment({amount: 200000, years: 1, rate: 32})).toEqual('19694.71')
});