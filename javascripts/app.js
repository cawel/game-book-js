var GAME_BOOK_APP = function() {

  var chapters = {
    1 : {
      title : 'Chapter 1', 
      text : 'This is the text for the 1st chapter.', 
      choices : [['Go to chapter 2', 2], ['Go to chapter 3', 3]]
    },
    2 : {
      title : 'Chapter 2', 
      text : 'This is the text for chapter 2',
      choices : [['Go to chapter 1', 1], ['Go to chapter 3', 3]]
    },
    3 : {
      title : 'Chapter 3', 
      text : 'This is the text for the final chapter!',
      choices : []
    }
  };
  return { 
    chapters : chapters
  };

}();

$(function() {
  console.log("firing document ready event!");
  var chapters = GAME_BOOK_APP.chapters;

  var show_next_chapter = function(chapter_nb){
    current_chapter = chapters[chapter_nb];
    $('.chapter > .title').text(current_chapter.title);
    $('.chapter > .text').text(current_chapter.text);
    $('.chapter > .choices').empty();
    current_chapter.choices.forEach(function(choice){
      $('.chapter > .choices').append("<a data-next-chapter-nb='" + choice[1] + "' class='choice' href='#'>" + choice[0] + "</a>");
    });
  };

  show_next_chapter(1);

  $(document).on('click', '.choices > a.choice', function(el){
    next_chapter_nb = $(el.target).data('next-chapter-nb');
    show_next_chapter(next_chapter_nb);
  });
});
