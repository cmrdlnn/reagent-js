import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

import FloatingActionButton from 'material-ui/FloatingActionButton';

import AddIcon from 'material-ui/svg-icons/content/add';

import ArrayFieldItem from './ArrayFieldItem';

import './array_field.less';

class ArrayField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || [],
    };
  }

  componentWillMount() {
    this.createItemProps();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items.type !== this.props.items.type) {
      this.createItemProps(nextProps);
    }
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView({
      behavior: 'smooth',
      block: this.scrollHeight < window.innerHeight ? 'start' : 'end',
    });
  }

  createItemProps = (props = this.props) => {
    const { title, type } = props.items;
    let itemProps = {};

    if (['array', 'object'].includes(type)) {
      if (title) {
        itemProps = { withChildren: false };
      } else {
        itemProps = { alignItems: 'flex-start', buttonStyle: { marginTop: '1rem' } };
      }
    }

    this.setState({ itemProps });
  }

  handleRemove(index) {
    this.setState({ value: this.state.value.filter((el, i) => i !== index) });
  }

  handleAddComponents() {
    const { max } = this.props;

    if (max) {
      if (this.state.value.length < max) {
        this.setState({ value: this.state.value.concat([null]) });
      }
    } else {
      this.setState({ value: this.state.value.concat([null]) });
    }
  }

  render() {
    const { children, direction, items, name, required, title } = this.props;
    const { itemProps, value } = this.state;

    return (
      <div
        className={`c-dynamic-field${
          direction === 'horizontal' ? ' c-dynamic-field_horizontal' : ''
        }`}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h4 className="c-array-field__title">
            {
            required ? (
              <div>
                { title && `${title} *` }
                <input
                  className="c-array-field__required-input"
                  required
                  value={value.length || ''}
                />

              </div>
            ) : (
              title
            )
          }
          </h4>
          <FloatingActionButton
            secondary
            mini
            onClick={() => this.handleAddComponents()}
          >
            <AddIcon />
          </FloatingActionButton>
          { children }
        </div>
        {value.map((val, index) => (
          <ArrayFieldItem
            index={index}
            items={items}
            key={index}
            onRemove={() => this.handleRemove(index)}
            parentName={name}
            value={val}
            {...itemProps}
          />
        ))}
      </div>
    );
  }
}

ArrayField.defaultProps = {
  children: null,
  direction: null,
  required: false,
  title: null,
  value: [],
};

ArrayField.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
  items: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.arrayOf(
    PropTypes.any,
  ),
};

export default ArrayField;
