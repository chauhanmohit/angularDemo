'use strict'
app.controller('mainController',['$scope','MapService','$http',function($scope,MapService,$http){
    $scope.location = {} ;
	$scope.newPlaceAddress = "Chicago" ;
	getData();
        if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
                        console.log(position.coords);
			$scope.location= position.coords;
		});
	}
        
        $scope.getAddress = function(){
            var address = $scope.newPlaceAddress ? $scope.newPlaceAddress : "Chicago" ;
            MapService.geocodeAddress(address).then(function (location) {
                var pos = {"latitude":location.G,"longitude":location.K} ;
                $scope.location = pos ;
                $scope.getDataFromApi() ;
            });
        }
                
        $scope.getDataFromApi = function(){
            $http.get('https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=within_circle%28location,%2041.883811,%20-87.631749,%20500%29')
	   // $http.get('https://data.cityofchicago.org/resource/6zsd-86xi.json')
            .success(function(res,status,config,header){
                console.log("Data comes in success section");
                $scope.shortlistedData = res ;
            }).error(function(err,status,config,header){
                console.log("Error comes in this section");
            });
        }
        
        $scope.showInfo = function(evt, id , loc){
            $scope.des = loc ;
            $scope.showInfoWindow.apply(this, [evt, 'foo']);
        }
	
	function getData(){
	    $http.get('https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=within_circle%28location,%2041.883811,%20-87.631749,%20500%29')
	   // $http.get('https://data.cityofchicago.org/resource/6zsd-86xi.json')
            .success(function(res,status,config,header){
                console.log("Data comes in success section");
                $scope.shortlistedData = res ;
            }).error(function(err,status,config,header){
                console.log("Error comes in this section");
            });
	}
}]);
