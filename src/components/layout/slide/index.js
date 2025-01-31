//@index('./*.vue', f=> `import ${f.name} from "#{f.path}.vue";`)
import Base from "./Base.vue";
import Content from "./Content.vue";
//@endindex
export {
  //@index('./*.vue', f=> `${f.name},`)
  Base,
  Content,
  //@endindex
  //@index('./*.vue', f=> `${f.name} as Slide${f.name},`)
  Base as Slide,
  Content as SlideContent,
  //@endindex
};

// CTRL + SHIFT + P
