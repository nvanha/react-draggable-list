import React, { useState } from "react";
import PropTypes from "prop-types";
import "./draggable-list.css";
import DraggableListItem from "./DraggableListItem";

const DraggableList = (props) => {
  const [data, setData] = useState(props.data);
  const [dragStartIndex, setDragStartIndex] = useState(null);

  /**
   * Get index of dragged item
   */
  const onDragStart = (index) => setDragStartIndex(index);

  /**
   * Update list when item dropped
   */
  const onDrop = (dropIndex) => {
    // console.log(dropIndex);

    // Get dragged item
    const dragItem = data[dragStartIndex];

    // Delete drag item in list
    let list = [...data];
    list.splice(dragStartIndex, 1);

    // Update list
    if (dragStartIndex < dropIndex) {
      setData([
        ...list.slice(0, dropIndex - 1),
        dragItem,
        ...list.slice(dropIndex - 1, list.length),
      ]);
    } else {
      setData([
        ...list.slice(0, dropIndex),
        dragItem,
        ...list.slice(dropIndex, list.length),
      ]);
    }
  };

  return (
    <ul className="draggable-list">
      {data.map((item, index) => (
        <DraggableListItem
          key={index}
          index={index}
          onDragStart={(index) => onDragStart(index)}
          onDrop={(index) => onDrop(index)}
        >
          {props.renderItemContent(item)}
        </DraggableListItem>
      ))}

      {/**
       * Add last item so u can drag item to last position
       * Last item dont need onDragStart, b/c it can't be dragged
       */}
      <DraggableListItem
        key={data.length}
        index={data.length}
        draggable={false}
        onDrop={(index) => onDrop(index)}
      />
    </ul>
  );
};

DraggableList.propTypes = {
  data: PropTypes.array,
  renderItemContent: PropTypes.func,
};

export default DraggableList;
