'use strict';

describe('Service: haiku', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var haiku;
  beforeEach(inject(function (_haiku_) {
    haiku = _haiku_;
  }));

  it('should do something', function () {
    expect(!!haiku).toBe(true);
  });

});
