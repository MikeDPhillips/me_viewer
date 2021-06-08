import React from "react";
import "./App.css"
import  dataList  from './data/allChars.json'
import nameList from './data/names.json'
import { MdDeleteForever } from "react-icons/md"
import { useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";


export const CharacterList = () => {
  console.log("Running characterlist")
  const [data, setData] = useState(dataList);
  const [names, setNames] = useState(nameList)
  //window.localStorage.setItem('nameList', JSON.stringify(nameList));

  const updateNames = (newName) => {
    console.log("Updating names")
    console.log(newName)
    let nameClone = [...names, newName].sort()
    //window.localStorage.setItem('nameList', JSON.stringify(nameClone));
    setNames(nameClone);
    console.log(names);
  }


  //console.log( JSON.stringify(nameList))
  const [changes, setChanges] = useState([]);
  const [removes, setRemoves] = useState([]);

  const addRemove = (newChange) => {
    console.log("addRemove called")
    setRemoves(prevRemoves => [...prevRemoves, newChange])
  }

  const addChange = (newChange) => {
    console.log("addChange called")
    console.log(newChange);
    setChanges(prevChanges => [...prevChanges, newChange])
    console.log(changes);
  }

  const onSub = (e, orig, meName) => {
    console.log("Called onSub");
    e.target.offsetParent.bgColor="gray";
    if (!meName || !meName.length)
      return;
    const changeString = `${orig},${meName}`;
    console.log(changeString);
    addChange(changeString);

    updateNames(meName);
  }


  const changeMe = (original, newName) => {
    console.log("Called changeMe")
    console.log("Original character name")
    console.log(original);
    const arrayCopy = data.map((row) => {
      if (row.char === original) {
        row.meChar = newName;
      }
      return (row);
    })
    setData(arrayCopy);
    console.log("New array after change")
    console.log(data);
    return(newName);
  }


  const removeRow = (e) => {
    console.log("Called removeRow")
    if (e.target.title === "delButton") {
      const rowName = e.target.id;
      setData(data.filter((row) => row.char !== rowName));
      addRemove(rowName);
    }
  };
  const useName = (e) => {
    console.log("Called useName")
    const name = e.target.id.replace("use_", "");
    console.log(name);
    const arrayCopy = data.map((row) => {
      if (row.char === name) {
        row.meChar = row.char;
      }
      return (row);
    })
    setData(arrayCopy);
    console.log(data);

  };
  return (
      <>
        <HomePageHeader/>
        <button id="save-remove" className={"save-all"}
                onClick={() => {
                  //Now save the removals
                  if (removes && removes.length) {
                    let blob = new Blob([removes.join('\n')], {type: 'text/plain'})
                    let element2 = document.createElement("a");
                    element2.href = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
                    element2.download = `removals ${Date().toLocaleString()}.txt`
                    element2.style.display = 'none';
                    if (typeof element2.download === 'undefined') {
                      element2.setAttribute('target', '_blank');
                    }
                    document.body.appendChild(element2);
                    element2.click();
                  }


                }}>
          Save Removals to File
        </button>
        <button id="save-changes" className={"save-all"}
                onClick={() => {
                  let blob = new Blob([changes.join('\n')], {type: 'text/plain'})
                  let element = document.createElement("a");
                  element.href = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
                  element.download = `changes ${Date().toLocaleString()}.txt`
                  element.style.display = 'none';
                  if (typeof element.download === 'undefined') {
                    element.setAttribute('target', '_blank');
                  }
                  document.body.appendChild(element);
                  element.click();
                  }
                }>
          Save Changes to File
        </button>
        <div className="character-container">
          <table>
            <tbody>
            {data.map((data, key) => {
              return (
                  <Char
                      key={key}
                      char={data.char}
                      meChar={data.meChar}
                      delClick={removeRow}
                      useClick={useName}
                      onChange={changeMe}
                      onSub={onSub}
                      namesList={names}
                  />
              );
            })}
            </tbody>
          </table>
        </div>
      </>
  );
};

const HomePageHeader = () => {
  return (
      <h2>Character list</h2>
  );
};

const Char = ({char, meChar, delClick, useClick, onChange, onSub, namesList}) => {
  return (

        <tr>
          <td className={"char"}><p><button title="delButton"
                      id={char}
              onClick={ delClick}>
            <MdDeleteForever/>
              </button>
             <a
                 href={"https://lotr.fandom.com/wiki/Special:Search?query=" + char}
                 target="_blank" rel="noreferrer noopener">
                 {char}</a></p>
          </td>
          <td className="transfer"><button
              title="useButton"
              id={"use_"+ char}
              onClick={useClick}>
            Use As Is</button>
          </td>
          <td className="me_char">
              <NameForm orig={char}
                        meName={meChar}
                        changeMe={onChange}
                        namesList={namesList}/>
          </td>
          <td className="save"><button
              onClick={ e => {onSub(e, char, meChar);}}
          >Save</button>
          </td>
        </tr>
  );
};



export function NameForm( {orig, meName, changeMe, namesList}) {

  //if (name !== meName)
  //  setName(meName);
  return (
      <div>
        <FreeSolo orig={orig} meName={meName} changeMe={changeMe} namesList={namesList}/>
        <a href={"https://lotr.fandom.com/wiki/Special:Search?query=" + meName}>
          View</a>
      </div>
  )
}


export default function FreeSolo({orig, meName, changeMe, namesList}) {

  let [name, setName] = useState(orig);


  //console.log("Free solog name state is " + name);
  return (
      <div style={{ width: 300 }}>
          <Autocomplete
              id={`ac_${orig}`}
              freeSolo
              autoSelect
              options={namesList}
              value = {meName}
              onChange = { (e, newValue) => {
                setName(newValue);
                changeMe(orig, newValue);
              }
              }
              onInputChange={ (e, newValue) => {

              }}
              renderInput={params => (
                  <TextField
                      {...params}
                      id={orig}
                      label=""
                      margin="normal"
                      variant="outlined"
                     // onChange={(e) => {
                     //   console.log("Change Event Fired");
                     //  setName(changeMe(e));
                     // onChange = { (e) =>handleChange(e)}
                  />
              )
              }
          />
      </div>
  );

}
