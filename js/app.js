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
  $scope.display = ['bigpicture', 'whattodo', 'futureofea'];
  $scope.url = $routeParams;
}]);

eaMediaApp.controller('DisplayController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.display = $routeParams.display;
    $http.get('json/' + $routeParams.display + '.json').success(function(data) {
      $scope.first = data[0];
      $scope.talks = data.slice(1);
    });
    $scope.causes = [
      {'text': 'ALL', 'tag': '', 'state': false},
      {'text': 'STRATEGY', 'tag': 'strategy', 'state': false},
      {'text': 'TECH', 'tag': 'tech', 'state': false},
      {'text': 'EDUCATION', 'tag': 'education', 'state': false},
      {'text': 'ANIMAL SUFFERING', 'tag': 'animals', 'state': false},
      {'text': 'QUALITY OF LIFE', 'tag': 'suffering', 'state': false},
      {'text': 'EX-RISK', 'tag': 'exrisk', 'state': false}
    ];
    $scope.toggle = function() {
      this.button.state = !this.button.state;
      $scope.filterBy = this.button.tag;
    }
}]);

eaMediaApp.filter('trustURL', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  }
});
