'use strict';

describe('Service: fileUploader', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var fileUploader;
  beforeEach(inject(function (_fileUploader_) {
    fileUploader = _fileUploader_;
  }));

  it('should do something', function () {
    expect(!!fileUploader).toBe(true);
  });

});
