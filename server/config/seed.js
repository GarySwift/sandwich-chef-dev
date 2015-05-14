/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
// var Item = require('../api/item/item.model');
var Ingred = require('../api/ingred/ingred.model');
var Product = require('../api/product/product.model');
var Sandwich = require('../api/sandwich/sandwich.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'gary@me.com',
    password: 'password'
  }, function() {
      console.log('finished populating users');
    }
  );
});

// Product.find({}).remove( function () {
  // Item.create({
  //   'name' : 'Tomatoes',
  //   'category' : 'salad',
  //   'price' : '0.4',
  //   'inStock' : true,
  // }, {
  // );
// });

Ingred.find({}).remove(function() {
  Ingred.create(
  {
    "name" : "Waterford Blaa",
    "category" : "bread",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431434052/rx9desx2u4gjaw1tljck.png",
    "imageId" : "rx9desx2u4gjaw1tljck",
    "inStock" : true
  }, {
    "name" : "Ciabatta",
    "category" : "bread",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431434157/gwoqcuqv5uswbl7hzxwa.png",
    "imageId" : "gwoqcuqv5uswbl7hzxwa",
    "inStock" : true
  }, {
    "name" : "Bagel",
    "category" : "bread",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431434308/n5zwayikc9dme5cdxohf.png",
    "imageId" : "n5zwayikc9dme5cdxohf",
    "inStock" : true
  }, {
    "name" : "White Sliced Bread",
    "category" : "bread",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431434360/vdtdbx8z8tmqjs6izmaa.png",
    "imageId" : "vdtdbx8z8tmqjs6izmaa",
    "inStock" : true
  }, {
    "name" : "Rye Bread",
    "category" : "bread",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431434504/nyckdiwej87btgynnkvy.png",
    "imageId" : "nyckdiwej87btgynnkvy",
    "inStock" : true,
  }, {
    "name" : "Salami",
    "notes" : "",
    "category" : "cold-cut",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431441145/q9snebv1alt31qnkohr4.png",
    "imageId" : "q9snebv1alt31qnkohr4",
    "inStock" : true,
  }, {
    "name" : "Sliced Ham",
    "category" : "cold-cut",
    "inStock" : true,
    "imageId" : "p1pvwdliqoxzvylwnyiz",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431441308/p1pvwdliqoxzvylwnyiz.png",
    "notes" : ""
  }, {
    "name" : "Sliced Turkey",
    "notes" : "",
    "category" : "cold-cut",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431441366/cbnqypysjmofebvv09pv.png",
    "imageId" : "cbnqypysjmofebvv09pv",
    "inStock" : true,
  }, {
    "name" : "Shredded Iceberg Lettuce",
    "notes" : "",
    "category" : "salad",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431441622/dqqv9goxnax4zh6p6a40.png",
    "imageId" : "dqqv9goxnax4zh6p6a40",
    "inStock" : true,
  }, {
    "name" : "Tomatoes",
    "notes" : "",
    "category" : "salad",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431442279/mnpdgfudwdxmjxzvz90j.png",
    "imageId" : "mnpdgfudwdxmjxzvz90j",
    "inStock" : true,
  }, {
    "name" : "Sweetcorn",
    "notes" : "",
    "category" : "salad",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431442328/vxeqhy4uwuey7tydplkm.png",
    "imageId" : "vxeqhy4uwuey7tydplkm",
    "inStock" : true,
  }, {
    "name" : "Red Onion",
    "notes" : "",
    "category" : "salad",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431442555/pdhdtgermtgvjlghjyyy.png",
    "imageId" : "pdhdtgermtgvjlghjyyy",
    "inStock" : true,
  }, {
    "name" : "Mixed Peppers",
    "notes" : "",
    "category" : "salad",
    "inStock" : true,
  }, {
    "name" : "Cucumber",
    "notes" : "",
    "category" : "salad",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431444074/udj7ww5tsmkbdjrsge6s.png",
    "imageId" : "udj7ww5tsmkbdjrsge6s",
    "inStock" : true,
  }, {
    "name" : "Bacon",
    "notes" : "",
    "category" : "hot-meat",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431444437/u0bbfimemum0xubbls1w.png",
    "imageId" : "u0bbfimemum0xubbls1w",
    "inStock" : true,
  }, {
    "name" : "Italian Style Meatballs",
    "notes" : "",
    "category" : "hot-meat",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431444920/y9oflfvdat1xi7fivcxt.png",
    "imageId" : "y9oflfvdat1xi7fivcxt",
    "inStock" : true,
  }, {
    "name" : "Pulled Pork",
    "notes" : "",
    "category" : "hot-meat",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431445111/vidovwo4hkzk8ug75uie.png",
    "imageId" : "vidovwo4hkzk8ug75uie",
    "inStock" : true,
  }, {
    "name" : "Southern Fried Chicken",
    "notes" : "",
    "category" : "hot-meat",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431445247/kkwkkw47rfhbzggmcqib.png",
    "imageId" : "kkwkkw47rfhbzggmcqib",
    "inStock" : true,
  }, {
    "name" : "Tuna Salad",
    "notes" : "",
    "category" : "seafood",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431445357/djnwh33s4ksk6tcpt6iz.png",
    "imageId" : "djnwh33s4ksk6tcpt6iz",
    "inStock" : true,
  }, {
    "name" : "Baked Salmon",
    "notes" : "",
    "category" : "seafood",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431445399/qo4fdzor2b5sl7nojew7.png",
    "imageId" : "qo4fdzor2b5sl7nojew7",
    "inStock" : true,
  }, {
    "name" : "Grated Red Cheddar",
    "notes" : "",
    "category" : "extra",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431445453/tow3jws3on74wrbkwdsl.png",
    "imageId" : "tow3jws3on74wrbkwdsl",
    "inStock" : true,
  }, {
    "name" : "Creamy Coleslaw",
    "notes" : "",
    "category" : "extra",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431445581/qijpct0z41mj3qj2lwdx.png",
    "imageId" : "qijpct0z41mj3qj2lwdx",
    "inStock" : true,
  }, {
    "name" : "Curried Egg Salad",
    "notes" : "",
    "category" : "extra",
    "imageUrl" : "http://res.cloudinary.com/gary-swift/image/upload/v1431445726/m2vpg81uqyegs75z3nvy.png",
    "imageId" : "m2vpg81uqyegs75z3nvy",
    "inStock" : true,
  }
  , function() {
      console.log('finished populating ingredients');
    }
  );
});

// Sandwich.find({}).remove( function () {
  // Sandwich.create({
// });