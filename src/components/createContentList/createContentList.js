import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import DeleteIcon from "assets/deleteIcon"
import DragIcon from "assets/dragIcon"
import styles from "./createContentList.module.css"



// reorders the list and the id's associated
const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);
   for (let i = 1; i < result.length + 1; i++) {
      result[i - 1].id = i;
   }
   return result;
};


const getItemStyle = (isDragging, draggableStyle) => ({
   // some basic styles to make the items look a bit nicer
   userSelect: "none",
   borderRadius: 10,
   // change background colour if dragging
   background: isDragging && 'gray',

   // styles we need to apply on draggables
   ...draggableStyle
});

const CreateContentList = (props) => {
   const [items, setItems] = useState([]);

   const onDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) {
         return;
      }

      const newItems = reorder(
         items,
         result.source.index,
         result.destination.index
      );
      props.handleContentListUpdate(newItems)
      setItems(newItems)

   }

   const simpleAddContent = () => {
      // make sure it auto sends to bottom
      let newItem = {
         "name": "",
         "url": "",
         "id": items.length + 1
      }
      props.handleContentListUpdate([...items, newItem]);
   }

   const deleteItem = (index) => {
      let result = items;
      result.splice(index, 1);
      for (let i = 1; i < result.length + 1; i++) {
         result[i - 1].id = i;
      }
      props.handleContentListUpdate([...result]);
   }

   const changeName = (event, index) => {
      let result = items;
      result[index].name = event.target.value;
      props.handleContentListUpdate([...result]);
   }

   const changeURL = (event, index) => {
      let result = items;
      result[index].url = event.target.value;
      props.handleContentListUpdate([...result]);
   }

   const getData = (arr) => {
      setItems(arr)
   }

   // UseEffects
   useEffect(() => {
      getData(props.contentList)
   }, [props.contentList]);


   // Normally you would want to split things out into separate components.
   // But in this example everything is just done in one place for simplicity
   if (items.length !== 0) {
      return (
         <div className={styles.contentListRoot}>
            <DragDropContext style={{ overflowX: "hidden" }} onDragEnd={onDragEnd}>
               <Droppable style={{ overflowX: "hidden" }} droppableId="droppable">
                  {(provided, snapshot) => (
                     <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                     >
                        <h2 className={styles.widgetTitle}>Content List</h2>
                        {items.map((item, index) => (
                           <Draggable key={item.id} draggableId={"item=" + item.id} index={index}>
                              {(provided, snapshot) => (
                                 <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={styles.linkItem}
                                    style={getItemStyle(
                                       snapshot.isDragging,
                                       provided.draggableProps.style
                                    )}
                                 >
                                    <DragIcon className={styles.dragIcon} onClick={() => deleteItem(index)} />
                                    <div className={styles.inputCol}>
                                       <input
                                          value={item.name}
                                          onChange={(event) => changeName(event, index)}
                                          className={styles.itemInput}
                                          placeholder="Name"
                                          style={{ fontWeight: 600 }}
                                       />

                                       <input
                                          value={item.url}
                                          onChange={(event) => changeURL(event, index)}
                                          className={styles.itemInput}
                                          placeholder="URL"
                                       />
                                    </div>

                                    <DeleteIcon className={styles.deleteIcon} onClick={() => deleteItem(index)} style={{ cursor: 'pointer' }} />
                                 </div>
                              )}
                           </Draggable>
                        ))}
                        {provided.placeholder}
                     </div>
                  )}
               </Droppable>
            </DragDropContext>
            <button onClick={() => simpleAddContent()} className={styles.addLinkBtn}>Add New Item</button>
         </div>
      );
   } else {
      return (
         <div className={styles.contentListRoot}>
            <h2 className={styles.widgetTitle}>Content List</h2>
            <button onClick={() => simpleAddContent()} className={styles.addLinkBtn}>Add New Item</button>
         </div>
      );
   }
}

export default CreateContentList;
