import React, { Component, PropTypes } from 'react';

import TextFieldLabel from 'material-ui/TextField/TextFieldLabel';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import FileUpload from 'material-ui/svg-icons/file/file-upload';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import './style.less';

class FileField extends Component {
  constructor(props) {
    super(props);
    const { defaultValue, value } = props;
    const fieldValue = value || defaultValue || [];
    this.state = {
      filename: fieldValue.length > 0 ? fieldValue[0].filename : '',
      focused: false,
      hasValue: fieldValue.length > 0,
      passedValue: fieldValue.length && fieldValue,
    };
  }

  componentDidMount() {
    this.validation();
  }

  handleChange = (e) => {
    const { onChange } = this.props;
    const { name: filename } = e.target.files[0];
    this.setState({ hasValue: true, filename });
    if (onChange) onChange(e);
  }

  validation = () => {
    const { hasValue } = this.state;
    const { required } = this.props;
    const { filename } = this;

    if (required && !hasValue) {
      filename.setCustomValidity('Загрузите файл');
    } else {
      filename.setCustomValidity('');
    }
  }

  handleClick = () => {
    const { hasValue } = this.state;

    if (hasValue) {
      this.handleReset();
    } else {
      this.input.click();
    }
  }

  handleReset = () => {
    this.setState({ hasValue: false, filename: null, passedValue: null });
    this.input.value = '';
  }

  handleFocus = () => this.setState({ focused: true })

  handleBlur = () => this.setState({ focused: false }, this.validation)

  render() {
    const { accept, required, name, title } = this.props;
    const { muiTheme } = this.context;
    const { primary1Color, secondaryTextColor } = muiTheme.palette;
    const { hasValue, filename, focused, passedValue } = this.state;
    const fileInputProps = passedValue
      ? {
        type: 'hidden',
        value: JSON.stringify(passedValue),
      }
      : {
        required: !!required,
        type: 'file',
      };

    return (
      <div
        className="file-upload-widget"
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        tabIndex={1}
        title={title}
      >
        <TextFieldLabel
          className={`file-upload-widget__label ${hasValue || focused ? 'file-upload-widget__label_focused' : ''}`}
          muiTheme={muiTheme}
          htmlFor={name}
          shrink={hasValue === true || focused}
          style={{
            color: hasValue || focused ? primary1Color : secondaryTextColor,
          }}
        >
          { required ? `${title} *` : title }
        </TextFieldLabel>
        <input
          className={`file-upload-widget__file-name ${hasValue || focused ? 'file-upload-widget__file-name_focused' : ''}`}
          ref={(ref) => { this.filename = ref; }}
          tabIndex={-1}
          type="text"
          value={filename || 'Выберите файл для загрузки'}
        />
        <FloatingActionButton
          className="file-upload-widget__button"
          mini
          onClick={this.handleClick}
          tabIndex={-1}
        >
          {
            hasValue ? <NavigationClose /> : <FileUpload />
          }
        </FloatingActionButton>
        <input
          accept={accept}
          className="file-upload-widget__input"
          id={name}
          name={name}
          onChange={this.handleChange}
          ref={(ref) => { this.input = ref; }}
          {...fileInputProps}
        />
      </div>
    );
  }
}

FileField.defaultProps = {
  accept: null,
  defaultValue: null,
  onChange: null,
  required: false,
  title: null,
  value: null,
};

FileField.propTypes = {
  accept: PropTypes.string,
  defaultValue: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      last_modified: PropTypes.number.isRequired,
      mime_type: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    }),
  ),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  title: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      last_modified: PropTypes.number.isRequired,
      mime_type: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    }),
  ),
};

FileField.contextTypes = {
  muiTheme: PropTypes.object,
};

export default FileField;
