angular.module('marketsApp', ['ui.bootstrap','ui.router','nemLogging','leaflet-directive','ngResource'])
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
      controller: 'MarketController',
      templateUrl: 'templates/market.html'
    })
    .state('add-market', {
      url: '/add-market',
      controller: 'FormController',
      templateUrl: 'templates/add_market.html'
    })
    .state('thanks', {
      url: '/thanks',
      controller: 'FormController',
      templateUrl: 'templates/thanks.html'
    })
    .state('farmer', {
      url: '/farmer/:farmerId',
      templateUrl: 'templates/farmer.html',
      controller: 'FarmerController'
    });

  $urlRouterProvider.otherwise('/home');
})
.controller('MarketsController', ['$scope', 'SheetItems', '$stateParams', 'leafletData',
  function ($scope, SheetItems, $stateParams, $http) {

    $scope.id = $stateParams.marketID;

    var splitFarmers = function(farmers){
      famersArray = farmers.split(",");
      return farmersArray;
    };

    $scope.spliting = splitFarmers;

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
])
.controller('MarketController', ['$scope', 'SheetItems', '$stateParams', '$http', '$resource',
  function ($scope, SheetItems, $stateParams, $http, $resource) {

    $http.jsonp('http://localhost:5000/api/users/?callback=JSON_CALLBACK').success(function (data) {
        console.log("BLOG pass");
    $scope.farmers = data; // response data 
    }).error(function (data) {
        console.log("BLOG failed");
    });

    $scope.farmerInMarket = function(item, array){
      if (array.indexOf(item) > -1) {
        console.log(true);
        return true;
      } else {
        console.log(false);
        return false;
      }
    }

    $scope.id = $stateParams.marketID;

    SheetItems.query(function(data) {
      //data processing can happen here
      $scope.markets = data;   
      
    });

  }
])
.controller('FarmerController', ['$scope', '$stateParams', '$http', '$resource',
  function ($scope, $stateParams, $http, $resource) {
    $scope.id = $stateParams.farmerId;

    $http.jsonp('http://localhost:5000/api/users/' + $scope.id + '?callback=JSON_CALLBACK').success(function (data) {
        console.log("BLOG pass");
    $scope.farmer = data; // response data 
    }).error(function (data) {
        console.log("BLOG failed");
    });

  }
])
.controller('FormController', ['$scope', 'leafletData',
  function ($scope, $stateParams, leafletData) {

    angular.extend($scope, {
                westsac: {
                    lat: 38.58031,  
                    lng: -121.53016,
                    zoom: 13
                },
                events: {}
    });

    $scope.markers = new Array();

    $scope.$on("leafletDirectiveMap.click", function(event, args){
          
          if ($scope.markers.length> 0) {
            $scope.markers = new Array();
          };

          var leafEvent = args.leafletEvent;
          $scope.markers.push({
             lat: leafEvent.latlng.lat,
             lng: leafEvent.latlng.lng,
             message: "My Added Marker"
              });
          $scope.latitude = leafEvent.latlng.lat;
          $scope.longitude = leafEvent.latlng.lng;
      });
  }
])
.factory('SheetItems', ['$rootScope',
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











