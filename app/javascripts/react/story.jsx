console.log('loaded story JSX file !');

var Story = React.createClass({

  propTypes: {
    title_url_segment : React.PropTypes.string.isRequired
  },

  render: function() {
    console.log(this.props.title_url_segment);

    return (
      <Chapter title-url-segment={this.props.title_url_segment}></Chapter>
    )
  }
});
