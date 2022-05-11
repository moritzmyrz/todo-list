import produce from "immer";
import { v4 as uuidv4 } from "uuid"
import { ITodoItem } from "../../interfaces";
import { actionType } from "../actionType";

function todosReducer(state = { item: {}, items: [] }, { type, item }: { type: actionType; item: ITodoItem }) {
    switch (type) {
        case actionType.ADD:
            if (!item.text.length) return state;
            const newItem = {
                text: item.text,
                id: uuidv4(),
                completed: false,
                timestamp: Date.now()
            };
            return Object.assign({}, state, {
                item: { ...newItem },
                items: [...(state.items), newItem]
            });
        case actionType.DELETE:
            if (!item.id) return state;
            return Object.assign({}, state, {
                items: [...(state.items.filter(data => data.id !== item.id))]
            });

        case actionType.EDIT:
            if (!item.id && !item.text.length) return state;
            const editIndex = state.items.findIndex(data => data.id === item.id);
            const nextEditData = produce(state.items, draft => {
                draft[editIndex] = item;
            });
            return Object.assign({}, state, {
                items: [...nextEditData]
            });
        case actionType.MARK:
            if (!item.id && !item.text.length) return state;
            const markIndex = state.items.findIndex(data => data.id === item.id);
            const nextMarkData = produce(state.items, draft => {
                draft[markIndex] = item;
            });
            return Object.assign({}, state, {
                items: [...nextMarkData]
            });
        default:
            return state;
    }
}

export default todosReducer;
