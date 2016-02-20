console.log('loaded story JSX file !');

var Story = React.createClass({

  fetchNextChapter: function (chapterNb, callback) {
    var that = this;

    console.log('About to fetch chapter ' + chapterNb + '.');
    this.storiesDB.child(String(chapterNb)).on("value", function (snapshot) {
      var chapter = snapshot.val();
      console.log(chapter);

      if (chapter == null) {
        console.log("Could not find the chapter '" + chapterNb + "' for story '" + that.props.titleUrlSegment + "'");
        return;
      }

      that.chapters[chapterNb] = chapter;
      if(callback){
        callback(chapter);
      }
    });
  },

  displayChapter: function(chapter){
    this.setState({
      text: chapter.text,
      title: chapter.title,
      choices: chapter.choices
    });
  },

  nextChapter: function (chapterNb) {
    var chapter = this.chapters[chapterNb];
    if (chapter) {
      console.log('Read chapter ' + chapterNb + ' from cache.');
      this.displayChapter(chapter);
      return;
    }

    this.fetchNextChapter(chapterNb, this.displayChapter);
  },

  getInitialState: function() {
    this.storiesDB = new Firebase('https://game-book-stories.firebaseio.com/stories/' + this.props.titleUrlSegment + '/chapters');
    this.chapters = []
    this.chapter = null;
    this.fetchNextChapter(1, this.displayChapter);

    return { };
  },

  propTypes: {
    titleUrlSegment : React.PropTypes.string.isRequired
  },

  render: function() {
    console.log(this.props.titleUrlSegment);

    return (
      <Chapter text={this.state.text} 
      title={this.state.title} 
      choices={this.state.choices} 
      nextChapter={this.nextChapter}
      fetchNextChapter={this.fetchNextChapter} ></Chapter>
    )
  }
});
