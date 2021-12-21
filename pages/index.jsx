import { useState, useEffect } from 'react';
import produce from 'immer';

const Notes = props => props.data.map(note => <div> - {note.text}</div>);

export default () => {
  const initialData = [{ text: 'Loading Notes ... ' }];
  const [data, setData] = useState(initialData);

  const handleClick = () => {
    const text = document.querySelector('#noteinput').value.trim();
    if (text) {
      const nextState = produce(data, draftState => {
        draftState.push({ text });
      });
      document.querySelector('#noteinput').value = '';

      if (typeof window !== 'undefined') {
        localStorage.setItem('data', JSON.stringify(nextState));
      }

      setData(nextState);
    }
  };

  const handleDelete = () => {
    const nextState = produce(data, draftState => {
      draftState.pop();
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('data', JSON.stringify(nextState));
    }

    setData(nextState);
  };

  const handleClear = () => {
    const nextState = produce(data, draftState => {
      draftState.splice(0, draftState.length);
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('data', JSON.stringify(nextState));
    }

    setData(nextState);
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getData = localStorage.getItem('data');

      if (getData !== '' && getData !== null) {
        return setData(JSON.parse(getData));
      }
      return setData([]);
    }
  }, 0);

  return (
    <>
        <p style={{position: 'absolute', bottom: 10,right:20, fontSize: '100%',fontFamily: 'comic sans ms'}}>a note taking app made for people who cant remember shit</p>
        <p style={{textAlign: "right",fontSize: '90%',fontFamily: 'small fonts'}}>made by brendan</p>
        <p style={{textAlignVertical: "center",textAlign: "center",fontWeight: 'bold',fontStyle: 'italic',fontFamily: 'arial', color: 'red', fontSize: '400%'}}>Wassup fucker, take some notes you lazy bitch</p>
        <input id="noteinput" style={{ width: "80%" }} type="text" onKeyDown={event => {if(event.key == 'Enter') {handleClick()}}} placeholder="Enter a new note" />
        <button onClick={() => handleClick()}>Add note</button>
        <button onClick={() => handleDelete()}>Delete last note</button>
        <button onClick={() => handleClear()}>Clear all notes</button>
        <p style={{fontSize: '170%', fontFamily: 'calibri'}}><Notes data={data}/></p>
      </>
  );
};