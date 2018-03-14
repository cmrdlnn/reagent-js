import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import Field from '../Field'

const ArrayFieldItem = ({ index, onRemove, items, name, title, value, required }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Field
        field={items}
        parentName={name}
        required={items.required}
        value={value}
      />
    </div>
    <div>
      <FloatingActionButton
        mini={true}
        secondary={false}
        onClick={onRemove}
        style={{marginRight: '0.25rem'}}
      >
        <DeleteIcon/>
      </FloatingActionButton>
    </div>
  </div>
)

export default ArrayFieldItem
