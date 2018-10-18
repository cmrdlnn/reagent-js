import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomField extends Component {
  state = {
    value: '',
  }

  setValue = (value) => {
    this.setState({ value });
  }

  removeValue = () => {
    this.setState({ value: '' });
  }

  render() {
    const { component, name, ...props } = this.props;
    const { value } = this.state;

    return (
      <div className="c-field">
        {
          React.createElement(component, {
            ...props,
            customValue: value,
            removeValue: this.removeValue,
            setValue: this.setValue,
          })
        }
        <input name={name} type="hidden" value={value} />
      </div>
    );
  }
}

CustomField.propTypes = {
  component: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default CustomField;
