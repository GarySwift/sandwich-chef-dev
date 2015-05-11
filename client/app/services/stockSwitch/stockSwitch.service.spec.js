'use strict';

describe('Service: stockSwitch', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var stockSwitch;
  beforeEach(inject(function (_stockSwitch_) {
    stockSwitch = _stockSwitch_;
  }));

  it('should do something', function () {
    expect(!!stockSwitch).toBe(true);
  });

});
