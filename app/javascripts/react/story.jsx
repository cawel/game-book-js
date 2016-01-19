console.log('loaded story JSX file !');

var Story = React.createClass({

  load_next_chapter : function(chapter_nb){
    var that = this;

    if (this.chapters[chapter_nb] ) {
      // display_next_chapter(chapters[chapter_nb])
    } else { 
      this.storiesDB.child(String(chapter_nb)).on("value", function(snapshot){
        var chapter = snapshot.val();
        console.log(chapter);

        if( chapter == null ){
          console.log("Could not find the chapter '" + chapter_nb + "' for story '" + that.props.title_url_segment + "'");
        }else{
          that.setState({
            text: chapter['text'],
            title: chapter['title'],
            choices: chapter['choices']
          });
        }
      });
    }
  },

  nextChapter: function(chapter_nb){
    this.load_next_chapter(chapter_nb);
  },

  getInitialState: function() {
    this.storiesDB = new Firebase('https://game-book-stories.firebaseio.com/stories/' + this.props.title_url_segment + '/chapters');
    this.chapters = []
    this.chapter = null;
    this.load_next_chapter(1);

    return { };
  },

  propTypes: {
    title_url_segment : React.PropTypes.string.isRequired
  },

  render: function() {
    console.log(this.props.title_url_segment);

    return (
      <Chapter text={this.state.text} title={this.state.title} choices={this.state.choices} nextChapter={this.nextChapter}></Chapter>
    )
  }
});
