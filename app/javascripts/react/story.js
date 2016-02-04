console.log('loaded story JSX file !');

var Story = React.createClass({
  displayName: 'Story',

  fetchNextChapter: function (chapter_nb, callback) {
    var that = this;

    console.log('About to fetch chapter ' + chapter_nb + '.');
    this.storiesDB.child(String(chapter_nb)).on("value", function (snapshot) {
      var chapter = snapshot.val();
      console.log(chapter);

      if (chapter == null) {
        console.log("Could not find the chapter '" + chapter_nb + "' for story '" + that.props.title_url_segment + "'");
      } else {
        that.chapters[chapter_nb] = chapter;
        if (callback) {
          callback(chapter);
        }
      }
    });
  },

  displayChapter: function (chapter) {
    this.setState({
      text: chapter['text'],
      title: chapter['title'],
      choices: chapter['choices']
    });
  },

  nextChapter: function (chapter_nb) {
    var chapter = this.chapters[chapter_nb];
    if (chapter) {
      console.log('Read chapter ' + chapter_nb + ' from cache.');
      this.displayChapter(chapter);
    } else {
      this.fetchNextChapter(chapter_nb, this.displayChapter);
    }
  },

  getInitialState: function () {
    this.storiesDB = new Firebase('https://game-book-stories.firebaseio.com/stories/' + this.props.title_url_segment + '/chapters');
    this.chapters = [];
    this.chapter = null;
    this.fetchNextChapter(1, this.displayChapter);

    return {};
  },

  propTypes: {
    title_url_segment: React.PropTypes.string.isRequired
  },

  render: function () {
    console.log(this.props.title_url_segment);

    return React.createElement(Chapter, { text: this.state.text,
      title: this.state.title,
      choices: this.state.choices,
      nextChapter: this.nextChapter,
      fetchNextChapter: this.fetchNextChapter });
  }
});
