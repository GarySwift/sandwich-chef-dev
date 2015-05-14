'use strict';

describe('Service: sandwich', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var sandwich;
  beforeEach(inject(function (_sandwich_) {
    sandwich = _sandwich_;
  }));

  it('should do something', function () {
    expect(!!sandwich).toBe(true);
  });

});
