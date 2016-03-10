var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/:id', {
            templateUrl: 'Detail.html',
            controller: 'DetController'
        }).
        when('/', {
            templateUrl: 'list.html',
            controller: 'customersCtrl'
        });
}]);

app.controller('customersCtrl', function($scope, $http)
{
    $http.get("apartment.json").then(function (response) {
        $scope.myData = response.data.apartments;
    });

    $scope.pageSize=5;
    $scope.first=0;
    $scope.pageNum=$scope.first/$scope.pageSize+1;
    $scope.reverse = true;

    $scope.prePage = function()
    {
        $scope.first-=$scope.pageSize;
        $scope.pageNum=$scope.first/$scope.pageSize+1;
    };

    $scope.nxtPage = function()
    {
        $scope.first+=$scope.pageSize;
        $scope.pageNum=$scope.first/$scope.pageSize+1;
    };

    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };
});

app.controller("DetController", function($scope, $routeParams,  $location) {
    $scope.idx=$routeParams.id;
    $scope.Name = $scope.myData[$scope.idx-1].name;
    $scope.Price = $scope.myData[$scope.idx-1].price;
    $scope.Popularity = $scope.myData[$scope.idx-1].popularity;
    $scope.Description = $scope.myData[$scope.idx-1].description;

    $scope.home=function(path)
    {
        $location.path(path);
    };
});