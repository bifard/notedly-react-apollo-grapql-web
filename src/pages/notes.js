import React from 'react';
import {useQuery} from '@apollo/client'
import { useParams } from 'react-router-dom';

import Note from '../components/Note';
import { GET_NOTE } from '../gql/query';


const NotePage = () => {
  const {id} = useParams();
  const {loading, error, data} = useQuery(GET_NOTE, { variables: {id} });
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error</p>
  return <Note note={data.note}/>
}

export default NotePage;