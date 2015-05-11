'use strict';

describe('Service: imageMngr', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var imageMngr;
  beforeEach(inject(function (_imageMngr_) {
    imageMngr = _imageMngr_;
  }));

  it('should do something', function () {
    expect(!!imageMngr).toBe(true);
  });

});
