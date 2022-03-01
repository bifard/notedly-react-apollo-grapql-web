import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_ME } from "../gql/query";
import DeleteNote from "./DeleteNote";

const NoteUser = ({note}) => {
  const {loading, error, data} = useQuery(GET_ME);

  if(loading) return `Loading...`;
  if(error) return `Error! ${error.message}`;

  return (
    <> 
      Favorites : {note.favoriteCount}
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