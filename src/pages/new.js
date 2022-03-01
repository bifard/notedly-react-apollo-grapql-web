import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import NoteForm from "../components/NoteForm";
import { NEW_NOTE } from "../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";



const NewNote = () => {
  const navigation = useNavigate();
  useEffect(()=>{
    document.title = 'New Note - Notedly';
  });

  const [data, {loading, error}] = useMutation(NEW_NOTE, {
    refetchQueries: [{query: GET_NOTES}, {query:  GET_MY_NOTES}],
    onCompleted: data => {
      navigation(`/note/${data.newNote.id}`)
    }
  })
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data}/>
    </>
  );
}

export default NewNote;