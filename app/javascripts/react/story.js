console.log('loaded story JSX file !');

var Story = React.createClass({
  displayName: 'Story',

  propTypes: {
    title_url_segment: React.PropTypes.string.isRequired
  },

  render: function () {
    console.log(this.props.title_url_segment);

    return React.createElement(Chapter, { 'title-url-segment': this.props.title_url_segment });
  }
});
