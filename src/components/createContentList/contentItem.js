import React from "react";
import './createContentList.css'

const ContentItem = ({ itemName, itemURL, itemNum, handleDrag, handleDrop }) => {
    return (
        <div
            draggable={true}
            id={itemName}
            onDragOver={(ev) => ev.preventDefault()}
            onDragStart={handleDrag}
            onDrop={handleDrop}
            className="c-content-item"
        >
            <p className="c-content-item-name">{itemName}</p>
            <p className="c-content-item-url">{itemURL}</p>
        </div>
    );
};

export default ContentItem;
