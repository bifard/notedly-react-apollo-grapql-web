import React, { useEffect } from "react";
const MyNotes = () => {
  useEffect(()=> {
    document.title = 'My notes - Notedly';
  })

  return (
    <div>
      <p>There are my notes</p>
    </div>
  );
}

export default MyNotes;