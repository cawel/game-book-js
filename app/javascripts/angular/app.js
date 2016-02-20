(function() {
  var app = angular.module('gameBook', ['firebase', 'gameBook.directives.chapter']);

  app.controller('StoryController', function($scope, $compile){
    var url = 'https://game-book-stories.firebaseio.com/stories/' + $.selected_story + '/chapters'
    var storiesDB = new Firebase(url);
    var chapters = [];

    var fetchFromFirebase = function(chapterNb, callback){
      storiesDB.child(String(chapterNb)).on("value", function(snapshot){
        console.log('Fetching chapter ' + chapterNb + ' from remote.');
        var chapter = snapshot.val();
        if(chapter){
          chapters[chapterNb] = chapter;
          if(callback) callback(chapter);
        }

        console.log("Could not find the chapter '" + chapterNb + "'");
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

    $scope.selectChapter = function(chapterNb){
      var chapter = chapters[chapterNb];
      if (chapter){
        console.log('Reading chapter ' + chapterNb + ' from cache.');
        showChapter(chapter);
        return;
      }

      fetchFromFirebase(chapterNb, showChapter);
    };

    // start at the first chapter
    $scope.selectChapter('1');
  });

})();
