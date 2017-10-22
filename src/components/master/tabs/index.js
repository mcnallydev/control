import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'found';
import { TabsTag, Items, Item, LinkClassName, LinkClassNameActive } from './styles';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
    };
  }

  isActive(index) {
    if (parseInt(index, 10) === parseInt(this.state.selected, 10)) {
      return LinkClassNameActive;
    } else {
      return LinkClassName;
    }
  }

  render() {
    const items = this.props.items.map((item, index) =>
      <Item key={index}>
        <Link
          className={this.isActive(index)}
          to={item.href}>
          {item.text}
        </Link>
      </Item>
    );

    return (
      <TabsTag>
        <Items>
          {items}
        </Items>
      </TabsTag>
    );
  }
}

Tabs.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.string
}

export default Tabs;
