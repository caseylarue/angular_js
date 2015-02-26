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


///// Customer  ///////////////////////////////////////////
    myApp.factory('customerFactory', function () {
		var customers = [
  			{name:'Michael', created_at: Date.now()},
  			{name:'Debbie', created_at: Date.now()},
  			{name:'Jason', created_at: Date.now()}
	  	];

	  	var orders = [
	  		{customer: 'casey', product: 'shoes', qty: '1', created_at: Date.now()},
	  		{customer: 'casey', product: 'shoes', qty: '1', created_at: Date.now()},
	  		{customer: 'michael', product: 'shoes', qty: '1', created_at: Date.now()} 
	  	];

	  	var factory = {};

	  	factory.getOrders = function(callback){
	  		callback(orders);
	  	}

	  	factory.addOrder = function(info, callback){
	  		info.created_at = Date.now();
	  		orders.push(info);
	  		callback(orders);
	  	}

	  	factory.getCustomers = function (callback){
	  		callback(customers);
	  	}

	  	factory.addCustomer = function(info, callback){
	  		info.created_at = Date.now();
				customers.push(info);
				callback(customers);
	  	}

	  	factory.removeCustomer = function(info){
	  		
	  		// console.log("customers", customers);
	  		console.log(customers);
	  		customers.splice(info, 1);
	  		alert(info);
	  	}

	  	// factory.removeCustomer = function(info, callback){
	  	// 	console.log("customers", customers);
	  	// 	console.log("info", info);
	  	// 	customers.splice(customers.indexOf(info), 1);
	  	// }

	  	return factory
	});



    myApp.controller('customersController', function ($scope, customerFactory){
    	
    	$scope.customers = [];

    	customerFactory.getCustomers(function (data){
    		$scope.customers = data;
    	})

    	$scope.addCustomer = function(name){
    		for(var i=0; i<$scope.customers.length; i++){
    				console.log($scope.customers[i].name);
    				console.log("new_customer", $scope.newCustomer.name);
    			if($scope.customers[i].name === $scope.newCustomer.name){
    				console.log("we have a match!")
    				break;
    			}
    			else {
    				console.log("no match! and post to table!");
					customerFactory.addCustomer($scope.newCustomer, function(data){
	    				$scope.customers = data;
	    				$scope.newCustomer = {};
		    		})
		    		break;
    			}		
    		}
    	}

    	$scope.removeCustomer = function($index){
    		// alert($index);
    		// console.log("hi");
    		// customerFactory.removeCustomer($index);
    		// customerFactory.removeCustomer(customer, function(data){
    		// 	$scope.customers = data;
    		// })
    	}
    })

///// Orders  ///////////////////////////////////////////
		
    myApp.controller('ordersController', function ($scope, customerFactory){
    	
	    	$scope.orders = [];
	    	$scope.customers = [];

	    	customerFactory.getOrders(function (data){
	    		$scope.orders = data;
	    	})

	    	customerFactory.getCustomers(function (data){
    			$scope.customers = data;
    		})

	    	$scope.addOrder = function(newOrder){
	    		console.log($scope.newOrder);
	    		customerFactory.addOrder($scope.newOrder, function(data){
    				$scope.orders = data;
		    	})
	    	}

    	})

