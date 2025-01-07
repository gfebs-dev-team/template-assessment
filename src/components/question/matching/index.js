//@index('./*.vue', f=> `import ${f.name} from "@{f.path}.vue";`)
import Base from "./Base.vue";
import Drag from "./Drag.vue";
import Drop from "./Drop.vue";
import Dropdown from "./Dropdown.vue";
import Sequence from "./Sequence.vue";
//@endindex
export {
  //@index('./*.vue', f=> `${f.name},`)
  Base,
  Drag,
  Drop,
  Dropdown,
  Sequence,
  //@endindex
  //@index('./*.vue', f=> `${f.name} as Matching${f.name},`)
  Base as Matching,
  Drag as MatchingDrag,
  Drop as MatchingDrop,
  Dropdown as MatchingDropdown,
  Sequence as MatchingSequence,
  //@endindex
};

// CTRL + SHIFT + P
