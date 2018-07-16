import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem';

class Custom extends Component {
  constructor(props) {
    super(props);
    this.state = { suggestions: [] };
  }

  changeValudation = (message) => {
    this.search.refs.searchTextField.input.setCustomValidity(message || '');
  };

  fetchAddresses = (query) => {
    fetch(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${atob('ZDE3N2QwNDZmYWM5Njc5ZjVjNmNlNmJjMGU4Y2I0YzkxNTI0NGJmNQ==')}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ query }),
      },
    )
      .then(response => response.json())
      .then((json) => {
        this.setState({ suggestions: json.suggestions });
      });
  };

  handleChange = (searchText, dataSource, { source }) => {
    if (source === 'touchTap') return;

    this.props.removeValue();
    this.changeValudation('Адрес представлен в неверном формате');

    clearTimeout(this.fetcher);

    if (searchText === '') {
      this.setState({ suggestions: [] });
      return;
    }

    this.setState({ suggestions: this.loader() });
    this.fetcher = setTimeout(() => this.fetchAddresses(searchText), 1000);
  };

  handleSelect = (value, index) => {
    this.props.setValue(JSON.stringify(this.state.suggestions[index]));
    this.changeValudation();
  };

  loader = () => [
    {
      value: {
        text: '',
        value: (
          <MenuItem disabled>
            <CircularProgress style={{ display: 'block', margin: 'auto' }} />
          </MenuItem>
        ),
      },
    },
  ];

  render() {
    const { required } = this.props;
    const { suggestions } = this.state;

    return (
      <AutoComplete
        dataSource={suggestions.map(suggestion => suggestion.value)}
        filter={AutoComplete.noFilter}
        floatingLabelText="ФИАС"
        fullWidth
        onNewRequest={this.handleSelect}
        onUpdateInput={this.handleChange}
        ref={(ref) => {
          this.search = ref;
        }}
        required={required}
      />
    );
  }
}

Custom.propTypes = {
  removeValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
};

Custom.defaultProps = {
  required: false,
};

export default Custom;
