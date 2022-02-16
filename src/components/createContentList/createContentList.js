import React, { useState, useEffect } from 'react';
import './createContentList.css'
import ContentItem from "./contentItem"


const CreateContentList = (props) => {
    const [contentList, setContentList] = useState([]);
    const [dragId, setDragId] = useState();
    const [dragging, setDragging] = useState();


    const initContentList = () => {
        let initArray = props.contentList;
        console.log("content", initArray);
        setContentList(props.contentList);
        console.log("contentlist", contentList);
    }

    const handleContentUpdateURL = (num, event) => {
        event.persist();
        let newArr = contentList;
        let value = event.target.value;
        let item = contentList[num]
        newArr[num].url = event.target.value;
        console.log(newArr)

        setContentList(newArr);
        console.log(num);
        console.log(event.target.value)
    };


    const simpleAddContent = () => {
        let newItem = {
            "name": "test name 2",
            "url": "test name 3",
            "num": contentList.length
        }
        props.handleContentListUpdate([...contentList, newItem]);
        setContentList([...contentList, newItem]);
        console.log(contentList);
    }



    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);

    };


    const handleDrop = (ev) => {
        const dragItem = contentList.find((item) => item.name === dragId);
        const dropItem = contentList.find((item) => item.name === ev.currentTarget.id);

        const dragItemOrder = dragItem.num;
        const dropItemOrder = dropItem.num;

        const newContentList = contentList.map((item) => {
            if (item.name === dragId) {
                item.num = dropItemOrder;
            }
            if (item.name === ev.currentTarget.id) {
                item.num = dragItemOrder;
            }
            return item;
        });

        setContentList(newContentList);
        props.handleContentListUpdate(contentList)
    };

    const renderContent = () => {
        if (contentList.length !== 0) {
            return (
                <>
                    {contentList
                        .sort((a, b) => a.num - b.num)
                        .map((item) => (
                            <ContentItem
                                key={item.num}
                                itemName={item.name}
                                itemURL={item.url}
                                itemNum={item.num}
                                handleDrag={handleDrag}
                                handleDrop={handleDrop}
                            />
                        ))}
                </>
            )
        }
        else {
            return (
                <div className="c-content-item">
                    <p className="c-content-item-name">Click the Add Button Below to Create a Content</p>
                </div>
            )
        }
    }

    // UseEffects
    useEffect(() => {
        setContentList(props.contentList);
    }, [props.contentList]);

    return (
        <div className="c-content-list">
            {renderContent()}
            <button onClick={() => simpleAddContent()} className="c-content-add-item-btn">Add New Item</button>
        </div>
    )
};

export default CreateContentList;



/*

        if (contentList.length !== 0) {
            return (
                <>
                    {contentList.map((item) => (
                        <div key={item.num} className="c-content-item">
                            <p className="c-content-item-name">{item.name}</p>
                            <p className="c-content-item-url">{item.url}</p>
                            <input className="c-content-item-input"
                                value={item.url}
                                onChange={(event) => handleContentUpdateURL(item.num, event)}
                                placeholder="Name"
                            />
                        </div>
                    ))}
                </>
            )
        }




*/