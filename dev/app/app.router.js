app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/");

		$stateProvider
		
		.state('home', {
			url: '/',
			templateUrl: 'app/templates/home.html'
		})	
	}
]);