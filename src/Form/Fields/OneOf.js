import React, { PropTypes, Component } from 'react'

import Field from './ObjectField'
import SelectField from './SelectField'

class OneOf extends Component {
  constructor(props) {
    super(props)
    const {value, keyField, items} = props
    let selectedItem
    if (value) {
      if (value[keyField]) {
        selectedItem = items.findIndex(item => item.properties[keyField].value == value[keyField])
      } else {
        const keys = Object.keys(value)
        selectedItem = items.findIndex(item => keys.every(key => item.properties[key]))
      }
    }
    selectedItem = !selectedItem || selectedItem === -1 ? 0 : selectedItem
    this.state = { selectedItem }
  }
  _handleChange(value) {
    this.setState({selectedItem: value})
  }
  render() {
    //console.debug('OneOf', this.props, this.state)
    const { items, keyField, parentName, title, value } = this.props
    const titles = items.map ((item, index) => ({title: item.title, id: index}))
    const { selectedItem } = this.state
    const { properties, required } = items[selectedItem]
    const keyFieldTitle = keyField && items[0].properties[keyField].title || title
    return (
      <div style={{width: '100%'}}>
        <SelectField
          value={selectedItem}
          title={keyFieldTitle}
          name={`${parentName}[title]`}
          onChange={this._handleChange.bind(this)}
          items={titles}
        />
        <Field
          name={parentName}
          value={value}
          properties={properties}
          required={required}
        />
      </div>
    )
  }
}

OneOf.propTypes = {
  keyField: PropTypes.string.isRequired
}

export default OneOf
