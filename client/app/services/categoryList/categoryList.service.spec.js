'use strict';

describe('Service: categoryList', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var categoryList;
  beforeEach(inject(function (_categoryList_) {
    categoryList = _categoryList_;
  }));

  it('should do something', function () {
    expect(!!categoryList).toBe(true);
  });

});
