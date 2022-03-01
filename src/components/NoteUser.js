import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_ME } from "../gql/query";
import DeleteNote from "./DeleteNote";
import FavoriteNote from "./FavoriteNote";

const NoteUser = ({note}) => {
  const {loading, error, data} = useQuery(GET_ME);
  console.log(data)
  if(loading) return `Loading...`;
  if(error) return `Error! ${error.message}`;
  console.log(note.id)
  return (
    <> 
      <FavoriteNote
        me = {data.me}
        noteId = {note.id}
        favoriteCount = {note.favoriteCount}
      />
      <br/>  
      {data.me.id === note.author.id && (
          <>
            <DeleteNote noteId={note.id}/> <br/>
            <Link to={`/edit/${note.id}`}>Edit</Link>
          </>
        )
      }
    </>
  );
}

export default NoteUser;