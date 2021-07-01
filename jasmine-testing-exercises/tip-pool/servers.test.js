describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic 
    serverNameInput.value = 'Alice';
    billAmtInput.value = '';
    tipAmtInput.value = '';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should update server table', function() { // copied from springboard solution for testing
    submitServerInfo();
    updateServerTable();

    let curTdList = document.querySelectorAll('#serverTable tbody tr td');

    expect(curTdList.length).toEqual(2);
    expect(curTdList[0].innerText).toEqual('Alice');
    expect(curTdList[1].innerText).toEqual('$0.00');
  });

  

  afterEach(function() {
    // serverNameInput.value = '';
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
    // billAmtInput.value = '';
    // tipAmtInput.value = '';
    // document.querySelectorAll('tbody')[0].innerHTML = '';
    // document.querySelectorAll('tbody')[1].innerHTML = '';
  });
});
