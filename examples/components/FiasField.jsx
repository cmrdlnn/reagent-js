import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem';

class FiasField extends Component {
  constructor(props) {
    super(props);
    this.state = { suggestions: [] };
  }

  changeValidation = (message) => {
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
      .then(({ suggestions }) => {
        this.setState({ suggestions });
      });
  };

  handleChange = (searchText, dataSource, { source }) => {
    if (source === 'touchTap') return;

    this.props.removeValue();
    this.changeValidation('Адрес представлен в неверном формате');

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
    this.changeValidation();
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

FiasField.propTypes = {
  removeValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
};

FiasField.defaultProps = {
  required: false,
};

export default FiasField;
