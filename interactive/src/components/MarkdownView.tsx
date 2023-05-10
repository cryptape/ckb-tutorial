import { ParentComponent } from 'solid-js';
import '~/assets/markdown.css';

interface Props {
  content?: string;
  class?: string;
}

const MarkdownView: ParentComponent<Props> = (props) => {
  return <article class={`markdown ${props.class}`}>{props.children}</article>;
};

export default MarkdownView;
