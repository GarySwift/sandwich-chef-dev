'use strict';

describe('Service: msgReport', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var msgReport;
  beforeEach(inject(function (_msgReport_) {
    msgReport = _msgReport_;
  }));

  it('should do something', function () {
    expect(!!msgReport).toBe(true);
  });

});
