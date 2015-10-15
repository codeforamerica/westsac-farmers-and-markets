angular.module('marketsApp', ['ui.bootstrap','ui.router','nemLogging','leaflet-directive'])
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
    .state('add-market', {
      url: '/add-market',
      controller: 'MarketsController',
      templateUrl: 'templates/add_market.html'
    })
    .state('farmer', {
      url: '/farmer',
      templateUrl: 'templates/farmer.html'
    });

  $urlRouterProvider.otherwise('/home');
})
.controller('MarketsController', ['$scope', 'SheetItems', '$stateParams', 'leafletData',
  function ($scope, SheetItems, $stateParams) {

    $scope.id = $stateParams.marketID;

    angular.extend($scope, {
                westsac: {
                    lat: 38.58031,  
                    lng: -121.53016,
                    zoom: 13
                }
    });

    SheetItems.query(function(data) {
      //data processing can happen here
      $scope.markets = data;   

          // add marker
      $scope.markers = new Array();
      for(i=0; i<data.length; ++i){
        $scope.markers.push({
          lat: data[i].latitude,
          lng: data[i].longitude
        });
      } 
  	});

  }

]).factory('SheetItems', ['$rootScope',
  function($rootScope){
    return {
      query: function(callback) {
        Tabletop.init({
          key: 'https://docs.google.com/spreadsheets/d/1kjoos8G2ON6hnkskgEg5RL95PQk-kPNNq7MB2N0NyfI/pubhtml',
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











