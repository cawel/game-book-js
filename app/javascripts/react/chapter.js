console.log('loaded chapter JSX file !');

var Chapter = React.createClass({
  displayName: 'Chapter',

  propTypes: {
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    choices: React.PropTypes.array,
    nextChapter: React.PropTypes.func
  },

  renderChoices: function () {
    if (!this.props.choices) {
      return '';
    } else {
      var rows = [];
      for (var i = 0; i < this.props.choices.length; i++) {
        rows.push(React.createElement(
          'li',
          { key: i },
          React.createElement(
            'a',
            { className: 'choice', href: '#', onClick: this.props.nextChapter.bind(null, this.props.choices[i][1]) },
            [this.props.choices[i][0]]
          )
        ));
      }
      return rows;
    }
  },

  endOfStory: function () {
    return this.props.choices && this.props.choices.length > 0;
  },

  showEnd: function () {
    if (this.endOfStory()) {
      return '';
    } else {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          { className: 'choices-title' },
          'The End'
        )
      );
    }
  },

  render: function () {
    return React.createElement(
      'div',
      { className: 'chapter' },
      React.createElement(
        'h1',
        { className: 'title' },
        this.props.title
      ),
      React.createElement('p', { className: 'text', dangerouslySetInnerHTML: { __html: this.props.text } }),
      React.createElement('hr', { className: 'gradient' }),
      React.createElement(
        ShowHide,
        { condition: this.endOfStory() },
        React.createElement(
          'div',
          null,
          React.createElement(
            'h2',
            { className: 'choices-title' },
            'Your Choices:'
          ),
          React.createElement(
            'ul',
            { className: 'choices' },
            this.renderChoices()
          )
        )
      ),
      this.showEnd()
    );
  }

});
