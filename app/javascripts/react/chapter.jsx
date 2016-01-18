console.log('loaded chapter JSX file !');

var Chapter = React.createClass({

  load_next_chapter : function(chapter_nb){
    var that = this;
    if (this.chapters[chapter_nb] ) {
      // display_next_chapter(chapters[chapter_nb])
    } else { 
      this.storiesDB.child(String(chapter_nb)).on("value", function(snapshot){
        console.log(snapshot.val());
        var chapter = snapshot.val();
        if( chapter == null ){
          console.log("Could not find the chapter '" + chapter_nb + "' for story '" + story_title + "'");
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

  getInitialState: function() {
    this.storiesDB = new Firebase('https://game-book-stories.firebaseio.com/stories/' + this.props['title-url-segment'] + '/chapters');
    this.chapters = []
    this.chapter = null;
    this.load_next_chapter(1);

    return { };
  },

  propTypes: {
    'title-url-segment' : React.PropTypes.string.isRequired
  },

  nextChapter: function(chapter_nb){
    this.load_next_chapter(chapter_nb);
  },

  renderChoices: function(){
    if ( !this.state.choices ){
      return '';
    } else {
      var rows = [];
      for (var i=0; i < this.state.choices.length; i++) {
        rows.push(
            <li key={i}>
            <a className='choice' href='#' onClick={this.nextChapter.bind(this, this.state.choices[i][1])}>{[this.state.choices[i][0]]}</a>
            </li>
        );
      }
      return rows;
    }
  },

  endOfStory: function(){
    return this.state.choices && this.state.choices.length > 0;
  },

  showEnd: function(){
    if( this.endOfStory() ){
      return '';
    } else {
      return (
        <div>
          <h2 className='choices-title'>The End</h2>
        </div>
        );
    }
  },

  render: function() {
    return (
      <div className='chapter'>
        <h1 className='title'>
          {this.state.title}
        </h1>

        <p className='text' dangerouslySetInnerHTML={{__html: this.state.text}}></p>

        <hr className='gradient'></hr>

        <ShowHide condition={this.endOfStory()}>
        <div >
          <h2 className='choices-title'>Your Choices:</h2>
            <ul className='choices'>
            {this.renderChoices()}
            </ul>
        </div>
        </ShowHide>

        {this.showEnd()}
      </div>
    )
  }


});
