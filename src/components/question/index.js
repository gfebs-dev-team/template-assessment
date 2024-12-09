//@index('./*.vue', f=> `import ${f.name} from "${f.path}.vue";`)
import Base from "./Base.vue";
import Checkbox from "./Checkbox.vue";
import Choice from "./Choice.vue";
import Fill from "./Fill.vue";
import Input from "./Input.vue";
import MultipleCheck from "./MultipleCheck.vue";
import Radio from "./Radio.vue";
import Select from "./Select.vue";
//@endindex
export {
  //@index('./*.vue', f=> `${f.name},`)
  Base,
  Checkbox,
  Choice,
  Fill,
  Input,
  MultipleCheck,
  Radio,
  Select,
  //@endindex
  //@index('./*.vue', f=> `${f.name} as Question${f.name},`)
  Base as QuestionBase,
  Checkbox as QuestionCheckbox,
  Choice as QuestionChoice,
  Fill as QuestionFill,
  Input as QuestionInput,
  MultipleCheck as QuestionMultipleCheck,
  Radio as QuestionRadio,
  Select as QuestionSelect,
  //@endindex
};

// CTRL + SHIFT + P
