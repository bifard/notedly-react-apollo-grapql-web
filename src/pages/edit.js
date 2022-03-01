import React from 'react';
import {useMutation, useQuery} from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom';

import { GET_ME, GET_NOTE } from '../gql/query';
import NoteForm from '../components/NoteForm';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = () => {
  const {id} = useParams();
  const navigation = useNavigate();

  const {loading, error, data} = useQuery(GET_NOTE, { variables: {id} });
  const {data: userdata, loading: loadingUser, error: errorUser} = useQuery(GET_ME);
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    }, 
    onCompleted: ()=> {
      navigation(`/note/${id}`)
    }
  })
  console.log(useQuery(GET_ME))
  if(loading || loadingUser) return `Loading...`
  if(error || errorUser) return <p>Error! Note not found</p>
  if(userdata.me.id !== data.note.author.id){
    return <p>you do not have access to edit this note</p>
  }else{
    return <NoteForm content={data.note.content} action={editNote}/>
  }
}

export default EditNote;