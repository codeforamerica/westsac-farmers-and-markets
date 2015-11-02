Markets App
===========

This app was design for helping people find sources of fresh local food within their city. I mean to be very easy to re-deploy and customize. The backend is simply a [google sheet](https://docs.google.com/spreadsheets/d/1kjoos8G2ON6hnkskgEg5RL95PQk-kPNNq7MB2N0NyfI/edit#gid=1297961578) and a google form for entering the data directly in from the app.

Stack
-----
- [AngularJS 1.4.0](https://angularjs.org)
- [angular-tabletop](https://github.com/times/angular-tabletop)
- [Leaflet 0.7.5](http://leafletjs.com/)
- [Twitter Bootstrap](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)


Get Started
-----------
To get started is pretty seamless. Just clone the repo, cd into the repo directory and start a simple server.

```
	$ git clone https://github.com/codeforamerica/westsac-farmers-and-markets
	$ cd westsac-farmers-and-markets
	$ python -m SimpleHTTPServer
```

## Using the Api from [Farmers](https://github.com/codeforamerica/westsac-farm-stand)

If the developer try to inject the data directly it will have problems with CORS. In our case we inject *ngResource* in our app and use *jsonp* to get the data. 

```javascript
angular.module('marketsApp', ['ui.bootstrap','ui.router','nemLogging','leaflet-directive','ngResource'])

.controller('MarketController', ['$scope', 'SheetItems', '$stateParams', '$http', '$resource',
  function ($scope, SheetItems, $stateParams, $http, $resource) {

    $http.jsonp('http://westsac-farmstand.herokuapp.com/api/users/?callback=JSON_CALLBACK').success(function (data) {
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
 );
 ```
This will connect you to the api and you are ready to go.

How to use it?
--------------

### About

Markets is an app to help citizen to find fresh local food sources within the city. Is design to be very easy to re-deploy and make it work in another city in matter of few hours.

### Single Market

Clicking in a single Market will take the user to the particular market place. This info is been populated from a [google sheet](https://docs.google.com/spreadsheets/d/1kjoos8G2ON6hnkskgEg5RL95PQk-kPNNq7MB2N0NyfI/edit#gid=1297961578) with is published on the web. 

It has the relevant information about the market, a description, phone number, location, contact email, website, and if is a urban farm stand, it will have a list of the farmers participating. 

### Single Farmer

Clicking on the farmer, it will take you to a single page with the information that the farmers have provide in the Farmer's App.

### Adding a Market

To add a market:
1. Click on the link in the top right corner which says *add a market*.
2. Fill all the fields and click submit.
3. Go back to the front page and verified your market has been added. 

### To Edit a Market
To edit some market you just have to go to the [google sheet](https://docs.google.com/spreadsheets/d/1kjoos8G2ON6hnkskgEg5RL95PQk-kPNNq7MB2N0NyfI/edit#gid=1297961578) and edit the corresponding cell. That you can edit depends on the permissions on the corresponding google sheets. That the document is public don't necessarily means you can do changes.  

