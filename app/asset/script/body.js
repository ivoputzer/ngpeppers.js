var angular = require('angular')
  , ngRoute = require('angular-route')
  , ngAnimate = require('angular-animate')

angular.module('ngpeppers', ['ngRoute', 'ngAnimate'])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        controller: 'main',
        templateUrl: 'main.html',
      })
      .when('/about', {
        controller: 'about',
        templateUrl: 'about.html',
      })
      .when('/info', {
        controller: 'info',
        templateUrl: 'info.html',
      })
      .otherwise({redirectTo: '/'})
  }])

  .run(['$rootScope', '$location', function($rootScope, $location){

  }])

  .controller('ngpeppers', ['$scope', function($scope){
    console.log('ng-peppers -- controller loaded')
  }])

  .controller('main', ['$scope', function($scope){
    console.log('ng-peppers -- controller loaded')
  }])

  .controller('about', ['$scope', function($scope){
    console.log('ng-peppers -- controller loaded')
  }])

  .controller('info', ['$scope', function($scope){
    console.log('ng-peppers -- controller loaded')
  }])