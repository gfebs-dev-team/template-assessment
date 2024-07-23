export const startDrag = (event) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("id", event.target.id);
};

export const onDrop = (event) => {
  const itemID = event.dataTransfer.getData("id");
  const drag = document.getElementById(itemID);
  const drop = event.target;
  drop.appendChild(drag);
  return drag.id + "[.]" + drop.id;
};

export const dataHandler = (event) => {
  const itemID = event.dataTransfer.getData("id");
  const drag = document.getElementById(itemID);
  const drop = event.target;
  if (drop.classList.contains("drag")) {
    let dragParent = drag.parentElement;
    //console.log(dragParent.id + ":" + drag.id);
    let dropParent = drop.parentElement;
    //console.log(dropParent.id + ":" + drop.id);

    const dragPI = dragParent.dataset.index;
    const dropPI = dropParent.dataset.index;
    console.log(dropParent.id + ": " + dropPI);
    const ret = [
      true,
      { index: Number(dragPI), value: itemID + "[.]" + dragParent.id },
      { index: Number(dropPI), value: drop.id + "[.]" + dropParent.id },
    ];

    console.log(ret);

    return ret;
  } else {
    return [false, drag.id + "[.]" + drop.id];
  }
};

export const swap = (event) => {
  const itemID = event.dataTransfer.getData("id");
  const drag = document.getElementById(itemID);
  const drop = event.target;
  let dragParent = drag.parentElement;
  let dropParent = drop.parentElement;

  dragParent.appendChild(drop);
  dropParent.appendChild(drag);

  dragParent = drag.parentElement;
  dropParent = drop.parentElement;

  //console.log(itemID + "[.]" + dragParent.id);
  // console.log(drop.id + "[.]" + dropParent.id);
};

export function setElems(s) {
  let elems = s.split("[.]");
  console.log(elems);
  const drag = document.getElementById(elems[0]);
  const drop = document.getElementById(elems[1]);
  drop.appendChild(drag);
}
