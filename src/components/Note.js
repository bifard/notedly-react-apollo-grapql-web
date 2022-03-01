import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { format, parseISO } from "date-fns";
import styled from "styled-components";
import { useApolloClient, useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../gql/query";
import NoteUser from "./NoteUser";

const StyledNote = styled.article`
  max-width: 800px;
  margin: 0;
`;
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

const MetaInfo = styled.div`
  padding-right: 1em;
`;

const UserActions = styled.div`
  margin-left: auto;
`;
const Note = ({ note }) => {
  const {data} = useQuery(IS_LOGGED_IN);

  return (
   <StyledNote>
     <MetaData>
       <MetaInfo>
        <img
          src={note.author.avatar}
          alt={`${note.author.username} avatar`}
          height='50px'
        />
       </MetaInfo>
       <MetaInfo>
         <em>by</em> {note.author.username} <br />
         {format(parseISO(note.createdAt), 'MMM do YYY')}
       </MetaInfo>
       {data.isLoggedIn ? (
          <UserActions>
              <NoteUser note = {note}/>
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {note.favoriteCount}
          </UserActions>
         )}
     </MetaData>
     <ReactMarkdown children={note.content}/>
   </StyledNote>
  );
}

export default Note;