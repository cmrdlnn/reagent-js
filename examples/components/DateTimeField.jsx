import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import ClearIcon from 'material-ui/svg-icons/content/clear';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-end',
  },
};

export default class DateTimePicker extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    removeValue: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    defaultValue: null,
    value: null,
  }

  constructor(props) {
    super(props);
    const dateTime = this.initialTime();
    console.log(props, dateTime)

    if (dateTime) {
      props.setValue(dateTime);
    }

    this.state = {
      dateTime: dateTime ? new Date(dateTime) : null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setValue(nextProps.value);
    }
  }

  initialTime = () => {
    const { defaultValue, value } = this.props;

    return value || defaultValue;
  }

  getDateOrCurrentTime = () => {
    const { dateTime } = this.state;

    return dateTime || new Date();
  }

  getDisplayTime = () => {
    const { dateTime } = this.state;

    return dateTime
      ? dateTime.toLocaleString('ru-RU')
      : '';
  }

  openDatePicker = () => {
    this.datePicker.show();
  }

  handleFocus = (e) => {
    e.target.blur();
  }

  handleAcceptDate = (date) => {
    this.setTime(date, this.getDateOrCurrentTime());
    this.setDateTime(date, () => {
      setTimeout(() => {
        this.timePicker.show();
      }, 150);
    });
  }

  handleAcceptTime = (time) => {
    const { dateTime } = this.state;

    const newDateTime = new Date(dateTime);

    this.setTime(newDateTime, time);
    this.setDateTime(newDateTime);
  }

  setTime = (date, time) => {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());

    return date;
  }

  setDateTime = (dateTime, callback) => {
    const { setValue } = this.props;

    this.setState({ dateTime }, () => {
      setValue(dateTime.toISOString());

      if (callback) callback();
    });
  }

  clearState = () => {
    const { removeValue } = this.props;

    this.setState({ dateTime: null }, removeValue);
  }

  render() {
    return (
      <div style={styles.container}>
        <TextField
          onClick={this.openDatePicker}
          onFocus={this.handleFocus}
          value={this.getDisplayTime()}
        />
        <IconButton onClick={this.clearState}>
          <ClearIcon />
        </IconButton>
        <DatePickerDialog
          autoOk
          cancelLabel="Закрыть"
          DateTimeFormat={Intl.DateTimeFormat}
          firstDayOfWeek={1}
          initialDate={this.getDateOrCurrentTime()}
          locale="ru-RU"
          onAccept={this.handleAcceptDate}
          ref={(node) => { this.datePicker = node; }}
        />
        <TimePickerDialog
          autoOk
          cancelLabel="Закрыть"
          format="24hr"
          initialTime={this.getDateOrCurrentTime()}
          minutesStep={1}
          onAccept={this.handleAcceptTime}
          ref={(node) => { this.timePicker = node; }}
        />
      </div>
    );
  }
}
