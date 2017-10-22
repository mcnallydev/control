import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeaderTag, Title, IconContainer, Icon } from './styles';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: 'menu'
    }
  }

  onClick = () => {
    /*
    this.setState({
      icon: (this.state.icon === 'menu') ? 'close' : 'menu'
    }, () => {
      this.context.onClickMenu();
    });
    */
  }

  render() {
    return (
      <HeaderTag>
        <IconContainer onClick={this.onClick()}>
          <Icon className="material-icons">{this.state.icon}</Icon>
        </IconContainer>
        <Title>{this.props.title}</Title>
      </HeaderTag>
    );
  }
}

Header.contextTypes = {
  onClickMenu: PropTypes.func
};

Header.propTypes = {
  title: PropTypes.string
}

export default Header;
