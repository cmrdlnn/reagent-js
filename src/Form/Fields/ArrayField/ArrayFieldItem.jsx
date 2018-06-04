import React, { PropTypes } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import Field from '../Field';

const ArrayFieldItem = ({
  alignItems,
  index,
  items,
  buttonStyle,
  parentName,
  onRemove,
  value,
  withChildren,
}) => {
  const deleteButton = (
    <FloatingActionButton
      mini
      onClick={onRemove}
      secondary={false}
      style={buttonStyle}
    >
      <DeleteIcon />
    </FloatingActionButton>
  );
  const { title } = items;
  const preparedItems = { ...items };
  let children = deleteButton;

  if (title) {
    preparedItems.title = `${title} №${index + 1}`;
    if (!withChildren) {
      children = null;
      preparedItems.children = deleteButton;
    }
  }

  return (
    <div style={{ alignItems, display: 'flex' }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Field
          field={preparedItems}
          parentName={`${parentName}[${index}]`}
          required={items.required}
          value={value}
        />
      </div>
      <div>
        { children }
      </div>
    </div>
  );
};

ArrayFieldItem.defaultProps = {
  alignItems: 'center',
  buttonStyle: null,
  value: null,
  withChildren: true,
};

ArrayFieldItem.propTypes = {
  alignItems: PropTypes.string,
  buttonStyle: PropTypes.objectOf(
    PropTypes.string,
  ),
  index: PropTypes.number.isRequired,
  items: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  parentName: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  value: PropTypes.any,
  withChildren: PropTypes.bool,
};

export default ArrayFieldItem;
