import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'react-md-menu';
import { FormInput, FormInputDropdown, FormInputDropdownLabel } from './styles';
// data
import years from '../../../data/years.json';
import months from '../../../data/months.json';
import days from '../../../data/days.json';

class Birthday extends Component {

  constructor(props) {
    super(props);
    this.state = {
      birthday: '',
      form: {
        birthdayYear: '',
        birthdayMonth: '',
        birthdayDay: '',
      },
      labels: {
        birthdayYear: 'Año',
        birthdayMonth: 'Mes',
        birthdayDay: 'Día',
      },
      dropdownYear: false,
      dropdownMonth: false,
      dropdownDay: false,
      options: {
        years: years,
        months: months,
        days: days
      }
    }
  }

  propOnChange() {
    // call onChange prop
    if (this.state.form.birthdayYear !== '' && this.state.form.birthdayMonth !== '' && this.state.form.birthdayDay !== '') {
      this.props.onChange(`${this.state.form.birthdayDay}/${this.state.form.birthdayMonth}/${this.state.form.birthdayYear}`, this.props.identifier);
    } else {
      this.props.onChange('', this.props.identifier);
    }
  }

  onSelect = (option, identifier) => {
    let key = '';
    switch (identifier) {
    case 'birthdayYear':
      key = 'dropdownYear';
      break;
    case 'birthdayMonth':
      key = 'dropdownMonth';
      break;
    case 'birthdayDay':
      key = 'dropdownDay';
      break;
    default:
    }

    // set states
    this.setState({
      labels : Object.assign({}, this.state.labels, {[identifier]: option.label}),
      form : Object.assign({}, this.state.form, {[identifier]: option.value}),
      [key]: false
    }, () => {
      this.propOnChange();
    });
  }

  render() {
    return (
      <FormInput>
        <FormInputDropdown width="57px">
          <FormInputDropdownLabel
            display={this.state.dropdownDay}
            width="42px"
            onClick={() => {this.setState({dropdownDay: true})}}
          >
            {this.state.labels.birthdayDay}
          </FormInputDropdownLabel>
          <Menu
            identifier="birthdayDay"
            open={this.state.dropdownDay}
            options={this.state.options.days}
            onClick={this.onSelect}
          />
        </FormInputDropdown>
        <FormInputDropdown width="121px">
          <FormInputDropdownLabel
            display={this.state.dropdownMonth}
            width="106px"
            onClick={() => {this.setState({dropdownMonth: true})}}
          >
            {this.state.labels.birthdayMonth}
          </FormInputDropdownLabel>
          <Menu
            identifier="birthdayMonth"
            open={this.state.dropdownMonth}
            options={this.state.options.months}
            onClick={this.onSelect}
          />
        </FormInputDropdown>
        <FormInputDropdown width="75px">
          <FormInputDropdownLabel
            display={this.state.dropdownYear}
            width="60px"
            onClick={() => {this.setState({dropdownYear: true})}}
          >
            {this.state.labels.birthdayYear}
          </FormInputDropdownLabel>
          <Menu
            identifier="birthdayYear"
            open={this.state.dropdownYear}
            options={this.state.options.years}
            onClick={this.onSelect}
          />
        </FormInputDropdown>
      </FormInput>
    );
  }
}

Birthday.propTypes = {
  identifier: PropTypes.string.isRequired
}


export default Birthday;
