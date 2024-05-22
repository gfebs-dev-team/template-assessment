//@index('./*.vue', f=> `import ${f.name} from "${f.path}.vue";`)
import Base from "./Base.vue";
import Choice from "./Choice.vue";
import Radio from "./Radio.vue";
//@endindex
export {
  //@index('./*.vue', f=> `${f.name},`)
  Base,
  Choice,
  Radio,
  //@endindex
  //@index('./*.vue', f=> `${f.name} as Question${f.name},`)
  Base as QuestionBase,
  Choice as QuestionChoice,
  Radio as QuestionRadio,
  //@endindex
};

// CTRL + SHIFT + P
