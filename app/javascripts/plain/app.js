$(function() {
  console.log("firing document ready event!");

  // load a new story upon user selection
  $('.main').on('click', '.home a', function(el){
    var story_title = $(el.target).text().toLowerCase().replace(' ', '-');
    var story = Story(story_title, '.main');
    story.start();
  });

  $(document).ajaxError(function (e, xhr, settings, error) {
    console.log(error);
  });
});


function Story(story_title, dom_container){

  var chapters = [];
  var storiesDB = new Firebase('https://game-book-stories.firebaseio.com/stories/' + story_title + '/chapters');

  var start = function(){
    $(dom_container).load('templates/plain/story.html', function(){
      load_next_chapter(1);
    });
  }

  var display_next_chapter = function(chapter){
    $('.chapter > .title').html(chapter.title);
    $('.chapter > .text').html(chapter.text);

    $('.chapter > .choices').empty();
    if ( chapter.choices == undefined ) chapter.choices = [];
    chapter.choices.forEach(function(choice){
      $('.chapter > .choices').append("<ul>");
      $('.chapter > .choices').append("<li><a data-next-chapter-nb='" + choice[1] + "' class='choice' href='#'>" + choice[0] + "</a></li>");
      $('.chapter > .choices').append("</ul>");
      // preload_chapters(choice[1]);
    });

    // edge case for the last chapter
    if(chapter.choices.length == 0){
      $('.choices-title').text('The End.');
    }
  }

  var load_next_chapter = function(chapter_nb){
    if (chapters[chapter_nb] ) {
      display_next_chapter(chapters[chapter_nb])
    } else { 
      storiesDB.child(String(chapter_nb)).on("value", function(snapshot){
        var chapter = snapshot.val();
        if( chapter == null ){
          console.log("Could not find the chapter '" + chapter_nb + "' for story '" + story_title + "'");
        }else{
          display_next_chapter(snapshot.val());
        }
      });
    }
  };

  var preload_chapters = function(chapter_nb){
    $.getJSON(story_endpoint_url(chapter_nb), function(chapter){
      chapters[chapter_nb] = chapter;
    });
  }

  $(dom_container).on('click', 'a.choice', function(el){
    next_chapter_nb = $(el.target).data('next-chapter-nb');
    load_next_chapter(next_chapter_nb);
  });

  return {
    start : start
  }
}
