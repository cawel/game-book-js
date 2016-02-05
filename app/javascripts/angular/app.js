(function() {
  var app = angular.module('gameBook', ['firebase', 'gameBook.directives.chapter']);

  app.controller('StoryController', function($scope, $compile){
    var url = 'https://game-book-stories.firebaseio.com/stories/' + $.selected_story + '/chapters'
    var storiesDB = new Firebase(url);
    var chapters = [];

    var fetchFromFirebase = function(chapter_nb, callback){
      storiesDB.child(String(chapter_nb)).on("value", function(snapshot){
        console.log('Fetching chapter ' + chapter_nb + ' from remote.');
        var chapter = snapshot.val();
        if(chapter){
          chapters[chapter_nb] = chapter;
          if(callback) callback(chapter);
        }else{
          console.log("Could not find the chapter '" + chapter_nb + "'");
        }
      });
    };

    var showChapter = function(chapter){
      $scope.chapter = chapter;
      var el = $compile("<chapter chapter='chapter' select-chapter='selectChapter'></chapter>")($scope);
      $(".chapter-container").html( el );

      // preload chapters
      angular.forEach($scope.chapter['choices'], function(choice){
        fetchFromFirebase(choice[1]);
      });
    };

    $scope.selectChapter = function(chapter_nb){
      var chapter = chapters[chapter_nb];
      if (chapter){
        console.log('Reading chapter ' + chapter_nb + ' from cache.');
        showChapter(chapter);
      }else {
        fetchFromFirebase(chapter_nb, showChapter);
      }
    };

    // start at the first chapter
    $scope.selectChapter('1');
  });

})();
