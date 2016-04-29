angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
	$scope.signIn = function() {
		$state.go('tab.leads');
	};
})

.controller('LeadCtrl', function($scope, $state, $ionicHistory) {

	$scope.goBack = function() {
		window.location = '/#/tab/leads';
	};

});