import { Component, createEffect, Show } from 'solid-js';
import 'xterm/css/xterm.css';
import { EditorProvider } from '~/components/EditorProvider';
import { EditorView } from 'codemirror';

interface Props {
  editor: EditorProvider;
}

const EditorBuilder: Component<Props> = (props) => {
  let terminalRef: HTMLElement | any;
  let codeEditorRef: HTMLElement | any;

  createEffect(() => {
    if (props.editor.initialized) {
      void props.editor.openTerminal(terminalRef);
      new EditorView({
        state: props.editor.state,
        parent: codeEditorRef,
      });
    }
  });

  return (
    <Show
      when={props.editor.initialized}
      keyed
      fallback={<div class="flex h-full items-center justify-center">Editor initializing... </div>}
    >
      <div class="flex flex-col overflow-hidden h-full">
        <div class="px-4 bg-gray-100 border-b py-2">index.ts</div>
        <div ref={codeEditorRef} class="flex-auto overflow-y-auto" />
        <div class="flex flex-col">
          <div class="flex-none border-b border-t px-4 py-2 bg-gray-100 flex items-center justify-between">
            <span>Terminal</span>
            <button onClick={() => props.editor.terminal.clear()}>Clear</button>
          </div>
          <div class="flex-none p-4" ref={terminalRef}></div>
        </div>
      </div>
    </Show>
  );
};
export default EditorBuilder;
