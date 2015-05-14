'use strict';

describe('Service: fileUploaderMngr', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var fileUploaderMngr;
  beforeEach(inject(function (_fileUploaderMngr_) {
    fileUploaderMngr = _fileUploaderMngr_;
  }));

  it('should do something', function () {
    expect(!!fileUploaderMngr).toBe(true);
  });

});
