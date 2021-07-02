// Rendering THE BOARD OF SET CARD 


export function render(state) {
    return renderBoard(state.board);
  }


  function renderBoard(board) {
    return `
        <table>${board.map(renderRow).join("\n")}</table>`;
  }
  
  function renderRow(row) {
    return `<tr>${row.map(renderField).join("\n")}</tr>`;
  }

  function renderField(field) {
   // const td = field.parentNode;
   // const tr = td.parentNode;
    //console.log(field);
    let cssBackgorund="background: ";
    if(field.isVisible)
    {
      cssBackgorund+="rgba(255,165,0, 0.4)";
    }
   
  
    return `<td style=" ${cssBackgorund}; border:${field.isSelected ? "5px solid red " : "5px solid #ebad04"}" ><img src=${field.img} , id=${field.name}>
                    </img></td>`;
  }

  export function renderPreviousMove(cards){
    return `<span>Previous Move <\span><table>${renderRow(cards)}</table>`;
  }
 export function RenderMessage (message) {
    document.getElementById("message").className =  "neutral";
    document.getElementById("message").innerHTML = "<p>" + message + "</p>";
  };
