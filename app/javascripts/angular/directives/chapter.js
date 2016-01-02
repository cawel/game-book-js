angular.module('gameBook.directives.chapter', [])
.directive('chapter', function($sce){

  return {
    restrict: 'E',
    scope: {
      selectChapter : '='
    },
    replace: true,
    templateUrl: 'chapter.html',
    link: function (scope, element) {
      scope.chapter = scope.$parent.chapter;
      scope.renderHtml = function(html_code) {
        return $sce.trustAsHtml(html_code);
      };
    }
  };
});
