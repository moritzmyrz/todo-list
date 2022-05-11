import React from "react";
import { connect } from "react-redux";
import { AddIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import { FormControl, FormErrorMessage, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { addTodo } from "../../redux/actions/todosAction";

function TodoInput(props) {
    const { item, addItem } = props;
    const validate = (value: string) => {
        if (!value) return "This section is required!";
    };
    return (
        <Formik
            initialValues={{ value: "" }}
            onSubmit={({ value }, actions) => {
                setTimeout(() => {
                    const newItem = Object.assign({}, item, { text: value });
                    addItem(newItem);
                    actions.setSubmitting(false);
                }, 1500);
            }}>
            {(props) => (
                <Form>
                    <Field name={"value"} validate={validate}>
                        {({ field, form }) => (
                            <FormControl id={"add-form-control"} isInvalid={form.errors.value && form.touched.value}>
                                <InputGroup>
                                    <Input autoComplete={"off"} autoFocus={false} isTruncated {...field} id={"add-input"} />
                                    <InputRightElement>
                                        <IconButton bgColor={"transparent"} type={"submit"} isLoading={props.isSubmitting} aria-label="add task">
                                            <AddIcon />
                                        </IconButton>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{form.errors.value}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    )
}
export const mapState = state => {
    const { item } = state.todosReducer;
    return { item };
};
export const mapDispatch = { addItem: addTodo };

export default connect(mapState, mapDispatch)(TodoInput);
