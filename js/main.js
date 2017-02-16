
/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about",
         {templateUrl: "partials/about.html",
          controller: "PageCtrl"})

    .when("/shoes", {templateUrl: "partials/shoes.html", controller: "ShoesCtrl"})
    .when("/dress", {templateUrl: "partials/dress.html", controller: "dressCtrl"})
    .when("/ethenic", {templateUrl: "partials/ethenic-wear.html", controller: "ethnicCtrl"})
    .when("/login", {templateUrl: "partials/login.html", controller: "LoginCtrl"})
    .when("/addproduct", {templateUrl: "partials/addproduct.html", controller: "AddProductCtrl"})
    .when("/description/:name", {templateUrl: "partials/description.html", controller: "DescriptionCtrl"})
    .when("/cart", {templateUrl: "partials/cart.html",controller:"CartCtrl"})

    // else 404
    .otherwise({templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);



/**
 * Controls the Shoes page
 */

app.controller('CartCtrl', function ( $scope) {
 /*  retriving add to cart things form local*/
  var cartKey = JSON.parse(localStorage.getItem("CartToken"));
  console.log(cartKey);
  if(cartKey){
      $scope.cart = cartKey;
    }
});

/**
 * Controls the description page
 */

app.controller('DescriptionCtrl', function ( $scope,$location,$route) {
 //shows the selected shoping item details 
   var cartProduct = [];
   var myProduct = JSON.parse($route.current.params.name);
   console.log(myProduct);
  
   $scope.CatagoryName = myProduct.category;
   $scope.producttitle = myProduct.name;
   $scope.productdescription = myProduct.desc;
   $scope.productprice = myProduct.price;


    $scope.addToCart = function(){
      cartProduct.push(myProduct);
      localStorage.setItem("CartToken",JSON.stringify(cartProduct));
    };

});

/**
 * Controls the Shoes Product page
 */


app.controller('ShoesCtrl', function ( $scope) {
    var shoesKey = JSON.parse(localStorage.getItem("ShoesToken"));
    if(shoesKey){
      $scope.shoes = shoesKey;
    }
  
});

/**
 * Controls the Dress Product page
 */

app.controller('dressCtrl', function ( $scope) {

var dressKey = JSON.parse(localStorage.getItem("DressToken"));
if(dressKey){
  $scope.dress = dressKey;
}
  
});

/**
 * Controls the Ethenic Wear Product page
 */

app.controller('ethnicCtrl', function ( $scope) {

var ethnicKey = JSON.parse(localStorage.getItem("EthenicToken"));
if(ethnicKey){
  $scope.ethnic = ethnicKey;
}
  
});


/**
 * Controls the Login page
 */

app.controller('LoginCtrl', function ( $scope, $location) {

//setting user roles here
  $scope.login = function(logindata,path){
    console.log("wdwdwd");
  if(logindata.email === "admin@gmail.com"&& logindata.password === "pass"){
  
    console.log("login");
    var adminkey = {"admin_email":"admin@gmail.com","password":"pass","user_role":"admin"};
    localStorage.setItem("UserToken",JSON.stringify(adminkey));
    $location.path(path);
    
  }
  else{
  var userkey = {"user_email":"enduser@gmail.com","password":"pass","user_role":"enduser"};
    localStorage.setItem("UserToken",JSON.stringify(userkey));
   
  }
};

});

/**
 * Controls the Add Product page
  
 */

app.controller('AddProductCtrl', function ( $scope, $location) {
    console.log("wdwdwwww");
    //getting all categories s
  var shoesProductKey = JSON.parse(localStorage.getItem("ShoesToken"));
   var dressProductKey = JSON.parse(localStorage.getItem("DressToken"));
    var ethnicProductKey = JSON.parse(localStorage.getItem("EthenicToken"));
    if(shoesProductKey){
    $scope.shoeProducts = shoesProductKey;
    }
    else{
      $scope.shoeProducts = [];
    }
    if(dressProductKey){
    $scope.dressProducts = dressProductKey;
    }
    else{
      $scope.dressProducts = [];
    }
    if(ethnicProductKey){
    $scope.ethnicProducts = ethnicProductKey;
    }
    else{
    $scope.ethnicProducts = [];
    }

  $scope.productdetials = [{
    name: '',
    desc: '',
    price: '',
    quantity: '',
    category: '',
    comments: ''
  }];

  $scope.addProduct = function(productdetials){

  
    var index = $scope.productdetials.indexOf(productdetials);
    $scope.productdetials.splice(index,0);
    
    
    if(productdetials.category === "Shoes"){
          $scope.shoeProducts.push(angular.copy(productdetials));
          localStorage.setItem("ShoesToken",JSON.stringify($scope.shoeProducts));
           $( '<div class="alert alert-success" role="alert">Product Added Successfully.</div>' ).insertBefore( "form" ).delay(2000).fadeOut(400);
    }
    else if(productdetials.category === "Dress"){
          $scope.dressProducts.push(angular.copy(productdetials));
          localStorage.setItem("DressToken",JSON.stringify($scope.dressProducts));
          $( '<div class="alert alert-success" role="alert">Product Added Successfully.</div>' ).insertBefore( "form" ).delay(2000).fadeOut(400);
    }
    else if(productdetials.category === "Ethenic Wear"){
          $scope.ethnicProducts.push(angular.copy(productdetials));
          localStorage.setItem("EthenicToken",JSON.stringify($scope.ethnicProducts));
          $( '<div class="alert alert-success" role="alert">Product Added Successfully.</div>' ).insertBefore( "form" ).delay(2000).fadeOut(400);
    }
 
    
  };

});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});