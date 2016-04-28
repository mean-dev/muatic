angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
	$scope.signIn = function() {
		$state.go('tab.dash');
	};
});