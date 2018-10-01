import React, { Component, PropTypes } from 'react';
import { Form } from '../src';

import fileValue from './data/file_value';
import Custom from './components/Custom';

function getBigDict() {
  const dict = [];
  for (let i = 0; i < 300; i += 1) {
    dict.push({
      id: i,
      title: `example №${i}`,
      description: Date.now(),
    });
  }
  return dict;
}

class App extends Component {
  static childContextTypes = {
    MultiSelectField: PropTypes.shape({
      text: PropTypes.strins,
      searchFieldHintText: PropTypes.string,
      emptyText: PropTypes.string,
      hasMoreText: PropTypes.string,
      foundedText: PropTypes.string,
    }),
  };

  getChildContext() {}

  render() {
    const items = getBigDict();

    return (
      <Form
        schema={{
          type: 'object',
          properties: {
            select: {
              items,
              modal: true,
              title: 'Поле типа "select"',
              type: 'select',
            },
            date: {
              type: 'date',
              title: 'date',
            },
            ReactTextMask: {
              mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
              title: 'Phone number',
              type: 'String with `react-text-mask`',
            },
            ReactMaskedinput: {
              mask: 'AAA 1111',
              title: 'License Plate',
              type: 'String with `react-maskedinput`',
            },
            string2: {
              type: 'string',
              title: 'string',
            },
            array: {
              type: 'array',
              title: 'array',
              items: {
                title: 'Элемент массива',
                type: 'object',
                properties: {
                  someData: {
                    type: 'string',
                    title: 'someData',
                  },
                  someData2: {
                    type: 'string',
                    title: 'someData2',
                  },
                },
              },
            },
            file: {
              accept: 'text/csv',
              required: true,
              title: 'Поле типа "Файл"',
              type: 'file',
            },
            custom: {
              type: 'custom',
              title: 'Кастомизированный компонент',
              component: Custom,
            },
          },
          required: ['ReactMaskedinput', 'ReactTextMask'],
        }}
        onSubmit={data => console.log('res:', data)}
        value={{
          file: fileValue,
          ReactMaskedinput: 'DFA 1523',
          ReactTextMask: '(123) 131-3131',
        }}
      />
    );
  }
}

export default App;
