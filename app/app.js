angular.module('marketsApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'MarketsController'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'templates/about.html',
      controller: 'MarketsController'
    })
    .state('market', {
      url: '/market/{marketID:int}',
      controller: 'MarketsController',
      templateUrl: 'templates/market.html'
    })
    .state('farmer', {
      url: '/farmer',
      templateUrl: 'templates/farmer.html'
    });

  $urlRouterProvider.otherwise('/home');
})
.controller('MarketsController', ['$scope', 'SheetItems', '$stateParams',
  function ($scope, SheetItems, $stateParams) {

    $scope.id = $stateParams.marketID;

    SheetItems.query(function(data) {
      //data processing can happen here
      $scope.markets = data;    
  	});

  }

]).factory('SheetItems', ['$rootScope',
  function($rootScope){
    return {
      query: function(callback) {
        Tabletop.init({
          key: 'https://docs.google.com/spreadsheets/d/1kjoos8G2ON6hnkskgEg5RL95PQk-kPNNq7MB2N0NyfI/pubhtml}',
          simpleSheet: true,
          parseNumbers: true,
          callback: function(data, tabletop) {
            if(callback && typeof(callback) === "function") {
              $rootScope.$apply(function() {
                callback(data);
              });
            }
          }
        });
      }
    };
  }]);

// https://docs.google.com/spreadsheets/d/1kjoos8G2ON6hnkskgEg5RL95PQk-kPNNq7MB2N0NyfI/pubhtml