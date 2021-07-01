describe('Payment tests (with setup and teardown)', function() {
    beforeEach(function(){
        serverNameInput.value = 'Alice'
        billAmtInput.value = '100';
        tipAmtInput.value = '15';
    })
it('should update the servers earnings', function() {
    submitServerInfo();
    submitPaymentInfo();
    
    expect(document.getElementById('server1').children[1].innerText).toEqual('$15.00');
  });
    afterEach(function(){
        serverId = 0;
        serverTbody.innerHTML = '';
        paymentTbody.innerHTML = '';
        allPayments = {};
        paymentId = {};
        allServers = {};
        billAmtInput.value = '';
        tipAmtInput.value = '';
    })
})
