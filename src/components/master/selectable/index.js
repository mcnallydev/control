import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

class Selectable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  isActive() {
    return (this.state.value === this.props.selected);
  }

  onClick = () => {
    this.props.onClick(this.props.selected, this.props.identifier);
  }

  render() {
    return (
      <Container onClick={this.onClick} active={this.isActive()} width={this.props.width}>
      {this.props.children}
      </Container>
    );
  }

}

Selectable.propTypes = {
  identifier: PropTypes.string.isRequired,
  value: PropTypes.string,
  selected: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
}

export default Selectable;
