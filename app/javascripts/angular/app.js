(function() {
  var app = angular.module('gameBook', ['firebase', 'gameBook.directives.chapter']);

  app.controller('StoryController', function($scope, $compile){
    var url = 'https://game-book-stories.firebaseio.com/stories/' + $.selected_story + '/chapters'
    var storiesDB = new Firebase(url);

    var fetchFromFirebase = function(chapter_nb, callback){
      storiesDB.child(String(chapter_nb)).on("value", function(snapshot){
        var chapter = snapshot.val();
        if( chapter == null ){
          console.log("Could not find the chapter '" + chapter_nb + "'");
        }else{
          callback(chapter);
        }
      });
    };

    $scope.selectChapter = function(chapter_nb){
      fetchFromFirebase(chapter_nb, function(chapter){
        $scope.chapter = chapter;
        var el = $compile("<chapter chapter='chapter' select-chapter='selectChapter'></chapter>")($scope);
        $(".chapter-container").html( el );
      });
    };

    // start at the first chapter
    $scope.selectChapter('1');
  });

})();
