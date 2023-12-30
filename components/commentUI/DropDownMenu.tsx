

import React, {useState} from "react";

  export default function DropdownMenu () {
    const [showMenu, setShowMenu]= useState(true);
    const [menuPosition,setMenuPosition] = useState({top:0, left:0});

    const handleOptionClick=(event:React.MouseEvent<HTMLButtonElement>) =>{
        const buttonPosition=event.currentTarget.getBoundingClientRect();
        setMenuPosition({top:buttonPosition.bottom + window.scrollY,
                         left:buttonPosition.left + window.scrollX })
        setShowMenu(!showMenu);

        return (
            <div>
                {showMenu && (
                    <div style={{
                        position:"absolute",
                        top:menuPosition.top,
                        left:menuPosition.left,
                        zIndex:1,
                        padding:10,
                        backgroundColor:"rgba(0,10,10,0.1)"
                    }}>
                   <div>option 1</div>
                   <div>option 2</div>
                   <div>option 3</div>
                   <div>option 4</div>
                    </div>
                )}
            </div>
        )
    }

   
  }              

  