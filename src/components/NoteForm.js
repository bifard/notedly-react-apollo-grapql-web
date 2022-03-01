import React, { useState } from "react";
import styled from "styled-components";

import Button from "./Button";

const Wrapper = styled.div`
  height: 100%;
`;

const Form = styled.form`
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
`; 

const NoteForm = ({content, action}) => {
  const [values, setValues] = useState({content: content || ''});
  const onChange = event => {
    setValues( {
      ...values,
      [event.target.name] : event.target.value
    });
  }

  return (
    <Wrapper>
      <Form
        onSubmit={e => {
          e.preventDefault();
          action({
            variables: {
              ...values
            }
          });
        }}
      >
        <TextArea
          required
          type='text'
          name='content'
          placeholder='Note Content'
          value={values.content}
          onChange={onChange}
        />
        <Button type='submit'>Save</Button>
      </Form>
    </Wrapper>
  );
}

export default NoteForm;