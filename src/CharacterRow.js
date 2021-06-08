import {MdDeleteForever} from "react-icons/md";
import React from "react";
import CharacterList from "./Characters";
import { MdDeleteForever } from "react-icons/md"


class CharacterRow extends React.Component {


render(char, me) => {
  return (
      <tr>
        <td className={"char"}><p><button title="delButton"
                                          id={char}
                                          onClick={ e=> {
                                            let delete_name = e.target.parentNode.id;
                                            remove(delete_name);
                                          }}><MdDeleteForever/>
        </button>
          {char}</p>
        </td>
        <td className="transfer"><button>Use As Is</button>
        </td>
        <td className="me_char"><input
            type="text"
            defaultValue={me}/>
        </td>
        <td className="save"><button>Save</button></td>
      </tr>
  )


const remove = (rowName) => {
  console.log("Removing " + rowName);
  const arrayCopy = this.data.filter( (row) => row.char !== rowName);
  this.data= arrayCopy;
}
};