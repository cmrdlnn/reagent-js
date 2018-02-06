import React, { Component, PropTypes } from 'react';

class CustomField extends Component {
  setValue = (value) => { this.result.value = value; }

  removeValue = () => { this.result.value = ''; }

  render() {
    const { component, name } = this.props;

    return (
      <div className="c-field">
        {
          React.createElement(component, {
            ...this.props,
            setValue: this.setValue,
            removeValue: this.removeValue
          })
        }
        <input ref={(ref) => { this.result = ref; }} type="hidden" name={name} />
      </div>
    );
  }
}

CustomField.propTypes = {
  component: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default CustomField;
