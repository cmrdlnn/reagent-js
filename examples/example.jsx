import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem';
import { Form } from '../src';
import AceEditor from 'react-ace';
import 'brace/mode/json';

import 'brace/theme/monokai';
const def = `{
  "type": "object",
  "properties": {
    "test": {
      "type": "string",
      "title": "Test"
    }
  }
}`;
class App extends Component {
  getChildContext() {}

  static childContextTypes = {
    MultiSelectField: PropTypes.shape({
      text: PropTypes.strins,
      searchFieldHintText: PropTypes.string,
      emptyText: PropTypes.string,
      hasMoreText: PropTypes.string,
      foundedText: PropTypes.string
    })
  };

  render() {
    const items = getBigDict();
    return (
      <Form
        schema={{
          type: 'object',
          properties: {
            date: {
              type: 'date',
              title: 'date'
            },
            string: {
              type: 'string',
              title: 'string'
            },
            string1: {
              type: 'string',
              title: 'string'
            },
            string2: {
              type: 'string',
              title: 'string'
            },
            array: {
              type: 'array',
              title: 'array',
              items: {
                type: 'object',
                properties: {
                  someData: {
                    type: 'string',
                    title: 'someData'
                  },
                  someData2: {
                    type: 'string',
                    title: 'someData2'
                  }
                }
              }
            },
            string3: {
              type: 'string',
              title: 'string'
            },
            string4: {
              type: 'string',
              title: 'string'
            },
            string5: {
              type: 'string',
              title: 'string'
            }
          }
        }}
        onSubmit={data => console.log('res:', data)}
      />
    );
  }
}

class Custom extends Component {
  constructor(props) {
    super(props);
    this.state = { suggestions: [] };
  }

  changeValudation = message => {
    this.search.refs.searchTextField.input.setCustomValidity(message || '');
  };

  fetchAddresses = query => {
    fetch(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Token d177d046fac9679f5c6ce6bc0e8cb4c915244bf5',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ query })
      }
    )
      .then(response => response.json())
      .then(json => {
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
        )
      }
    }
  ];

  render() {
    const { suggestions } = this.state;

    return (
      <AutoComplete
        dataSource={suggestions.map(suggestion => suggestion.value)}
        filter={AutoComplete.noFilter}
        floatingLabelText='ФИАС'
        fullWidth
        onNewRequest={this.handleSelect}
        onUpdateInput={this.handleChange}
        ref={ref => {
          this.search = ref;
        }}
        required
      />
    );
  }
}

Custom.propTypes = {
  removeValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};

function getBigDict() {
  let dict = [];
  for (let i = 0; i < 300; i++) {
    dict.push({
      id: i,
      title: `example №${i}`,
      description: Date.now()
    });
  }
  return dict;
}
export default App;
