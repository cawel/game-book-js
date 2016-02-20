$(function() {
  console.log("Fired 'document ready' event!");

  // load a new story when the user clicks a link
  $('.main').on('click', '.home a', function(el){
    var storyTitle = $(el.target).text().toLowerCase().replace(' ', '-');
    var story = Story(storyTitle, '.main');
    story.start();
  });

  $(document).ajaxError(function (e, xhr, settings, error) {
    console.log(error);
  });
});


function Story(storyTitle, domContainer){

  var exports = {};

  var chapters = [];
  var storiesDB = new Firebase('https://game-book-stories.firebaseio.com/stories/' + storyTitle + '/chapters');

  var start = function(){
    $(domContainer).load('templates/plain/story.html', function(){
      loadNextChapter(1);
    });
  };
  exports.start = start;

  var showNextChapter = function(chapter){
    $('.chapter > .title').html(chapter.title);
    $('.chapter > .text').html(chapter.text);

    $('.chapter > .choices').empty();
    chapter.choices = chapter.choices || [];

    chapter.choices.forEach(function(choice){
      $('.chapter > .choices').append("<ul>");
      $('.chapter > .choices').append("<li><a data-next-chapter-nb='" + choice[1] + "' class='choice' href='#'>" + choice[0] + "</a></li>");
      $('.chapter > .choices').append("</ul>");
      preloadChapters(choice[1]);
    });

    // edge case for the last chapter
    if(chapter.choices.length === 0){
      $('.choices-title').text('The End.');
    }
  };

  var loadNextChapter = function(chapterNb){
    if (chapters[chapterNb]) {
      showNextChapter(chapters[chapterNb]);
    } else { 
      fetchChapter(String(chapterNb), function(chapter){
        if (chapter) showNextChapter(chapter);
      });
    }
  };

  var fetchChapter = function(chapterNb, callback){
    // fetches data from remote db on Firebase.io
    storiesDB.child(String(chapterNb)).on("value", function(snapshot){
      chapter = snapshot.val();
      if( !chapter ){
        console.log("Could not find the chapter '" + chapterNb + "' for story '" + storyTitle + "'");
        chapter = null;
      }
      callback(chapter);
    });
  };

  var preloadChapters = function(chapterNb){
    fetchChapter(String(chapterNb), function(chapter){
      if (chapter) chapters[chapterNb] = chapter;
    });
  };

  $(domContainer).on('click', 'a.choice', function(el){
    var nextChapterNb = $(el.target).data('next-chapter-nb');
    loadNextChapter(nextChapterNb);
  });

  return exports;
}
