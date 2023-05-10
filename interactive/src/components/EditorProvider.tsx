import { FileLoader } from '~/components/FileLoader';
import { Terminal } from 'xterm';
import { SpawnOptions, WebContainer } from '@webcontainer/api';
import { createStore } from 'solid-js/store';
import { createEffect, createSignal } from 'solid-js';
import { EditorState, StateField } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';

interface CreateOptions {
  fileLoader?: FileLoader;
  openFile?: string;
}

let webContainer: WebContainer;

const [booted, setBooted] = createSignal<boolean>(false);

export function startWebContainer() {
  window.addEventListener('load', async () => {
    webContainer = await WebContainer.boot();
    setBooted(true);
  });
}

export const createEditorProvider = (option: CreateOptions): EditorProvider => {

  const terminal = new Terminal({
    convertEol: true,
    rows: 15,
    theme: {
      foreground: 'rgb(55,56,58)',
      background: 'rgba(0,0,0,0)',
      cursor: 'black',
    },
  });

  const openTerminal = async (htmlElement: HTMLElement) => {
    state.terminal.open(htmlElement);
    const shellProcess = await webContainer.spawn('jsh');
    void shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          state.terminal.write(data);
        },
      }),
    );
    const input = shellProcess.input.getWriter();
    state.terminal.onData((data) => {
      input?.write(data);
    });
  };

  const spawn = async (command: string, args: string[], options?: SpawnOptions) => {
    const shellProcess = await webContainer.spawn(command, args, options);
    void shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          state.terminal.write(data);
        },
      }),
    );
  };
  const changeFile = async (content: string) => {
    if (option.openFile) {
      await webContainer.fs.writeFile(option.openFile, content);
    }
  };

  const [state, setState] = createStore<EditorProvider>({
    initialized: false,
    terminal,
    openTerminal,
    spawn,
  });

  createEffect(() => {
    if (booted()) {
      void init();
    }
  });

  const listenChangesExtension = StateField.define({
    create: () => null,
    update: (value, transaction) => {
      if (transaction.docChanged) {
        console.log('file content changed');
        void changeFile(transaction.newDoc.toJSON().join('\n'));
      }
      return null;
    },
  });
  const init = async () => {
    const files = await option.fileLoader?.getFileSystem();
    if (files) {
      await webContainer.mount(files);
      if (option.openFile) {
        const code = await webContainer.fs.readFile(option.openFile, 'utf-8');
        const state = EditorState.create({
          doc: code,
          extensions: [listenChangesExtension, basicSetup, javascript({ typescript: true })],
        });
        setState({ state });
      }
      setState({ initialized: true });
    }
  };

  return state;
};

export interface EditorProvider {
  initialized: boolean;
  terminal: Terminal;
  openTerminal: (htmlElement: HTMLElement) => Promise<void>;
  spawn: (command: string, args: string[], options?: SpawnOptions) => Promise<void>;
  state?: EditorState;
}
