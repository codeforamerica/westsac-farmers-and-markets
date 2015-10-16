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
      controller: 'FormController',
      templateUrl: 'templates/add_market.html'
    })
    .state('thanks', {
      url: '/thanks',
      controller: 'FormController',
      templateUrl: 'templates/thanks.html'
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
])
.controller('FormController', ['$scope', 'leafletData',
  function ($scope, $stateParams, leafletData) {

    $scope.hola = "homa mundo";

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











