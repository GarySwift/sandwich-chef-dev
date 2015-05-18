'use strict';

describe('Service: errorReport', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var errorReport;
  beforeEach(inject(function (_errorReport_) {
    errorReport = _errorReport_;
  }));

  it('should do something', function () {
    expect(!!errorReport).toBe(true);
  });

});
