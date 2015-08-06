var eaMediaApp = angular.module('eaMediaApp', ['ngRoute']);

eaMediaApp.config(function($routeProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'partials/main.html',
      controller:  'MainController'
    }).when('/:display', {
      templateUrl: 'partials/display.html',
      controller:  'DisplayController'
    }).when('/:display/:video', {
      templateUrl: 'partials/video.html',
      controller:  'VideoController'
    }).otherwise({
      redirectTo: '/main'
    });
});

eaMediaApp.controller('MainController', function($scope) {
});

eaMediaApp.controller('HeaderController', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.display = ['cal', 'mel', 'oxf'];
  $scope.url = $routeParams;
}]);

eaMediaApp.controller('DisplayController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.display = $routeParams.display;
    $http.get('json/' + $routeParams.display + '.json').success(function(data) {
      $scope.first = data[0];
      $scope.talks = data.slice(1);
    });
    $scope.styles = [
      {'text': 'Lectures/Talks', 'tag': 'lecture', 'state': false},
      {'text': 'Panels', 'tag': 'panel', 'state': false},
      {'text': 'Workshops', 'tag': 'workshop', 'state': false},
      {'text': 'Q & A', 'tag': 'q&a', 'state': false},
      {'text': 'Show All', 'tag': '', 'state': false}
    ];
    $scope.causes = [
      {'text': 'Strategy', 'tag': 'strategy', 'state': false},
      {'text': 'Technology', 'tag': 'tech', 'state': false},
      {'text': 'Education', 'tag': 'education', 'state': false},
      {'text': 'Animal Suffering', 'tag': 'animals', 'state': false},
      {'text': 'Quality of Life', 'tag': 'suffering', 'state': false},
      {'text': 'Existential Risk', 'tag': 'exrisk', 'state': false}
    ];
    $scope.toggle = function() {
      this.button.state = !this.button.state;
      $scope.filterBy = this.button.tag;
    }
}]);

eaMediaApp.controller('VideoController', ['$scope', '$http', '$routeParams', '$sce', function($scope, $http, $routeParams, $sce) {
    $scope.format = 'basic';
    $http.get('json/projects/' + $routeParams.project + '.json').success(function(data) {
      $scope.contents = data[0];
      if ($scope.contents.hasOwnProperty('videoURLs')) {
        $scope.format = 'video';
      }
      if ($scope.contents.hasOwnProperty('articleLink')) {
        $scope.hasLink = true;
      }
      if ($scope.contents.hasOwnProperty('articleURLs')) {
        $scope.format = 'article';
      }
      if ($scope.contents.hasOwnProperty('pdfURLs')) {
        $scope.format = 'pdf';
      }
    });
}]);

eaMediaApp.filter('trustURL', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  }
});
