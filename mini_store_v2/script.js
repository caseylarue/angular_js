	// inject the ngRoute dependency in the module.
    var myApp = angular.module('myApp', ['ngRoute']);
    //  use the config method to set up routing:
    myApp.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/view1.html'
        })
        .when('/partial2',{
            templateUrl: 'partials/view2.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
		
	myApp.controller('customersController', function ($scope){
		$scope.customers = [
			{name:'Michael', created_at: Date.now()},
			{name:'Debbie', created_at: Date.now()},
			{name:'Jason', created_at: Date.now()}
		]

		console.log($scope.customers);

		$scope.removeCustomer = function(customer){
			$scope.customers.splice($scope.customers.indexOf(customer), 1);
		}

		$scope.addCustomer = function(){
			$scope.newCustomer.created_at = Date.now();
			$scope.customers.push($scope.newCustomer);
			$scope.newFriend = {};
		}
	})

