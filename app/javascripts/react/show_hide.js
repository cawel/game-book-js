var ShowHide = React.createClass({
  render: function(){
    return ((this.props.condition) ? this.props.children : null);
  }
});
