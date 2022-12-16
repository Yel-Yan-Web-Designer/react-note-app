import React from 'react';
import ReactMde from 'react-mde';
import * as Showdown from "showdown";

const Editor = ({ updateNotes, findCurrentSelectedNote }) => {

  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  return (
    <div className='editor-container'>
      <ReactMde
        value={findCurrentSelectedNote.body}
        onChange={updateNotes}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  )
}

export default Editor;