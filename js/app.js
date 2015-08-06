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
      {'text': 'Talks', 'state': false},
      {'text': 'Panels', 'state': false},
      {'text': 'Workshops', 'state': false},
      {'text': 'Q & A', 'state': false}
    ];
    $scope.causes = [
      {'text': 'Strategy', 'state': false},
      {'text': 'Technology', 'state': false},
      {'text': 'Education', 'state': false},
      {'text': 'Animal Suffering', 'state': false},
      {'text': 'Quality of Life', 'state': false},
      {'text': 'Existential Risk', 'state': false}
    ];
    $scope.toggle = function() {
      this.button.state = !this.button.state;
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
