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

