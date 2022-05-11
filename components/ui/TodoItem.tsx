import React from "react";
import { connect } from "react-redux";
import { ButtonGroup, Checkbox, Flex, IconButton, Input, InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { deleteTodo, editTodo, markTodo } from "../../redux/actions/todosAction";

function TodoItem(props) {
    const { deleteItem, editItem, markItem, item } = props;
    const [value, setValue] = React.useState(item.text);
    const [isEditing, setEditing] = React.useState(false);
    const [isCompleted, setCompleted] = React.useState(item.completed);
    const toggleEditing = () => setEditing(!isEditing);

    function DeleteButton() {
        return (
            <IconButton
                size={"sm"}
                variant={"ghost"}
                aria-label={"Delete item"}
                onClick={() => deleteItem(item)}>
                <DeleteIcon />
            </IconButton>
        )
    }
    function SaveButton() {
        return (
            <IconButton
                aria-label={"Save edit"}
                onClick={() => {
                    if (value.length) {
                        editItem(Object.assign({}, item, { text: value }));
                        return toggleEditing();
                    }
                    toggleEditing();
                    deleteItem(item);
                }}>
                <CheckIcon />
            </IconButton>
        )
    }

    return (
        <Flex>
            <InputGroup>
                <InputLeftAddon display={isEditing ? "none" : "inline-flex"}>
                    <Checkbox colorScheme={"teal"} isChecked={isCompleted} onChange={() => {
                        setCompleted(!isCompleted);
                        return markItem(Object.assign({}, item, { completed: !isCompleted }));
                    }}>
                    </Checkbox>
                </InputLeftAddon>
                <Input
                    autoFocus={isEditing}
                    value={value}
                    textDecoration={isCompleted ? "line-through" : "none"}
                    onChange={(event) => isEditing ? setValue(event.target.value) : undefined}
                    isReadOnly={!isEditing}
                    isTruncated />
                <InputRightAddon>
                    {isEditing ? (
                        <ButtonGroup size={"sm"} variant={"ghost"}>
                            <SaveButton />
                            <IconButton aria-label={"Close edit"} onClick={() => { setValue(item.text); toggleEditing(); }}><CloseIcon /></IconButton>
                        </ButtonGroup>) :
                        isCompleted ?
                            (<DeleteButton />) :
                            (<ButtonGroup size={"sm"} variant={"ghost"}>
                                <IconButton aria-label={"Edit item"} onClick={toggleEditing}><EditIcon /></IconButton>
                                <DeleteButton />
                            </ButtonGroup>)
                    }
                </InputRightAddon>
            </InputGroup>
        </Flex>
    )
};

export const mapDispatch = ({ deleteItem: deleteTodo, editItem: editTodo, markItem: markTodo });

export default connect(null, mapDispatch)(TodoItem);
