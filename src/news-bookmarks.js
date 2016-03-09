'use strict';

angular.module('news-bookmarks', ['megazord'])
    .controller('news-bookmarks-controller', ['$scope', '_router', '_screen', '_screenParams','localStorageService','lodash' ,'$ionicHistory','$ionicNavBarDelegate','$rootScope',
    	function ($scope, _router, _screen, _screenParams, localStorageService, _, $ionicHistory, $ionicNavBarDelegate, $rootScope) {
        _screen.initialize($scope, _screenParams); 
       // $ionicNavBarDelegate.showBackButton(false);

        $scope.goBack = function() {
        	$ionicHistory.goBack(); 
        }

        function getNews() {

        	var keys = localStorageService.keys(); 
        	$scope.keys = keys; 
        	var news = []; 
        	var sections = [];
        	_.each(keys, function(key) {
        		news.push(localStorageService.get(key)); 
        	})
        	for (var i=0; i<news.length; i+=2) {
	            var section = [];
	            for (var j=i; j<i+2 && j<news.length; j++) {
	                section.push(news[j]);
	            }
	            sections.push(section);
	        }
        	return sections; 
        }
        $scope.$on('$ionicView.beforeEnter', function() {
        	$scope.sections = getNews(); 
        })

        $scope.goTo = function(news) {
        	_router.fireEvent({
        		name: 'goToDetail',
        		params: {
        			data: news
        		}
        	})
        }
        //Add your controller logic here.
    }]);