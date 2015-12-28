app.config(['$httpProvider',
	function($httpProvider){
		// CORS
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}
])