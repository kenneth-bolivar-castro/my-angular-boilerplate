;(function() {
"use strict";

var app=angular.module("app",["templates","vendor","controllers","directives","factories","filters"]);app.factory("api",["$http","$q",function(e,t){return{}}]),app.config(["$httpProvider",function(e){e.defaults.useXDomain=!0,delete e.defaults.headers.common["X-Requested-With"]}]),app.config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/"),e.state("home",{url:"/",templateUrl:"app/templates/home.html"})}]),angular.module("vendor",["ui.router"]),angular.module("templates",[]).run(["$templateCache",function(e){e.put("app/templates/home.html","<h1>Home!!!</h1>")}]);var controllers=angular.module("controllers",[]),factories=angular.module("factories",[]),directives=angular.module("directives",[]),filters=angular.module("filters",[]);
}());
