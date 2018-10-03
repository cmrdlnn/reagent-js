import React, { PropTypes, Component } from 'react';
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel';
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline';
import ReactTextMask from 'react-text-mask';
import ReactMaskedinput from 'react-maskedinput';

class MaskedTextField extends Component {
  constructor(props) {
    super(props);

    const { errorText, defaultValue } = props;
    const value = defaultValue || props.value;

    this.state = {
      errorText,
      focused: false,
      value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextState = ['errorText', 'value'].reduce((accum, prop) => {
      // eslint-disable-next-line no-param-reassign
      if (nextProps[prop] !== this.props[prop]) accum[prop] = nextProps[prop];
      return accum;
    }, {});

    this.setState(nextState);
  }

  handleFocus = () => {
    this.setState({ focused: true });
  }

  handleBlur = (e) => {
    const { validationMessage, value } = e.target;
    const { errorText, onChange } = this.props;

    this.setState({ focused: false, errorText: errorText || validationMessage }, () => {
      validationMessage == '' && onChange && onChange(e, value);
    });
  }

  handleChange = (event) => {
    const { value } = event.target;
    const { onChange } = this.props;

    this.setState({ value }, () => {
      onChange && onChange(event, value);
    });
  }

  render() {
    const {
      mask,
      name,
      pattern,
      placeholder,
      required,
      title,
    } = this.props;
    const {
      errorText,
      focused,
      value,
    } = this.state;
    const { muiTheme } = this.context;
    const { hintColor, focusColor, errorColor } = muiTheme.textField;
    const MaskedInput = typeof mask === 'string' ? ReactMaskedinput : ReactTextMask;

    return (
      <div className="c-text-field">
        <TextFieldLabel
          className="c-text-field__label"
          muiTheme={muiTheme}
          htmlFor={name}
          shrink={focused || !!value}
          style={{
            color: errorText ? errorColor : focused ? focusColor : hintColor,
          }}
        >
          {title}
        </TextFieldLabel>
        <MaskedInput
          autoComplete="off"
          className="c-text-field__input"
          id={name}
          mask={mask}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          pattern={pattern}
          placeholder={focused ? placeholder : ' '}
          ref="input"
          required={required}
          value={value}
        />
        <TextFieldUnderline
          muiTheme={muiTheme}
          focus={focused}
          error={!!errorText}
        />
        <ErrorText
          muiTheme={muiTheme}
          errorText={errorText}
        />
      </div>
    );
  }
}

const ErrorText = ({ errorText, muiTheme }) => (errorText ? (
  <div
    style={{
      color: muiTheme.textField.errorColor,
      fontSize: '12px',
      position: 'absolute',
      bottom: '-1rem',
      whiteSpace: 'nowrap',
    }}
  >
    { errorText }
  </div>
) : null);

MaskedTextField.propTypes = {
  defaultValue: PropTypes.string,
  errorText: PropTypes.string,
  mask: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
};

MaskedTextField.defaultProps = {
  defaultValue: null,
  errorText: null,
  onChange: null,
  pattern: null,
  placeholder: '',
  required: false,
  title: null,
  value: null,
};

MaskedTextField.contextTypes = {
  muiTheme: PropTypes.object,
};

export default MaskedTextField;
