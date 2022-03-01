import React from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { DELETE_NOTE } from "../gql/mutation";
import ButtonAsLink from "./ButtonAsLink";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";


const DeleteNote = ({noteId}) => {
  const navigation = useNavigate();
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: noteId
    },
    refetchQueries: [{query: GET_MY_NOTES}, {query: GET_NOTES}],
    onCompleted: data => {
      navigation(`/mynotes`)
    }
  });
  return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>
}

export default DeleteNote;