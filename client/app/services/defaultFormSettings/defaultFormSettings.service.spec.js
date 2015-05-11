'use strict';

describe('Service: defaultFormSettings', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var defaultFormSettings;
  beforeEach(inject(function (_defaultFormSettings_) {
    defaultFormSettings = _defaultFormSettings_;
  }));

  it('should do something', function () {
    expect(!!defaultFormSettings).toBe(true);
  });

});
