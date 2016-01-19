console.log('loaded chapter JSX file !');

var Chapter = React.createClass({

  propTypes: {
    title : React.PropTypes.string,
    text : React.PropTypes.string,
    choices : React.PropTypes.array,
    nextChapter : React.PropTypes.func,
  },

  renderChoices: function(){
    if ( !this.props.choices ){
      return '';
    } else {
      var rows = [];
      for (var i=0; i < this.props.choices.length; i++) {
        rows.push(
            <li key={i}>
            <a className='choice' href='#' onClick={this.props.nextChapter.bind(null, this.props.choices[i][1])}>{[this.props.choices[i][0]]}</a>
            </li>
        );
      }
      return rows;
    }
  },

  endOfStory: function(){
    return this.props.choices && this.props.choices.length > 0;
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
          {this.props.title}
        </h1>

        <p className='text' dangerouslySetInnerHTML={{__html: this.props.text}}></p>

        <hr className='gradient'></hr>

        <ShowHide condition={this.endOfStory()}>
        <div>
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
