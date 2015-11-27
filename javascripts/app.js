$(function() {
  console.log("firing document ready event!");

  var current_chapter;

  var show_next_chapter = function(chapter_nb){
    $.getJSON('/chapters/' + chapter_nb + '.js', function(result){
      console.log(result);
      current_chapter = result;
      $('.chapter > .title').text(current_chapter.title);
      $('.chapter > .text').text(current_chapter.text);

      $('.chapter > .choices').empty();
      current_chapter.choices.forEach(function(choice){
        $('.chapter > .choices').append("<a data-next-chapter-nb='" + choice[1] + "' class='choice' href='#'>" + choice[0] + "</a>");
      });

      // edge case for the last chapter
      if(current_chapter.choices.length == 0){
        $('.choices-title').remove();
      }
    });
  };

  show_next_chapter(1);

  $(document).on('click', '.choices > a.choice', function(el){
    next_chapter_nb = $(el.target).data('next-chapter-nb');
    show_next_chapter(next_chapter_nb);
  });
});
