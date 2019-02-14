import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { isEmpty } from 'lodash';
import {
    Form,
    FormGroup,
    Label,
    Button,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import Input from '../formComponents/Input';

const validate = (values) => {
    const errors = {};
    if (isEmpty(values.task)) {
      errors.task = 'Task text is required';
    }
    return errors;
};
  
// eslint-disable-next-line import/no-mutable-exports
let TaskForm = (props) => {
    const {
        handleSubmit,
    } = props;

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="task-input">
                    What's on your mind?
                </Label>
                <InputGroup>
                    <Field
                        name="task"
                        component={Input}
                        placeholder="Buy milk"
                    />
                    <InputGroupAddon addonType="append">
                        <Button
                            type="submit"
                            color="success"
                        >
                            Submit
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </Form>
    );
};
  
export default reduxForm({
    form: 'TASK',
    validate,
})(TaskForm);
