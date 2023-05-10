import { Component, For, Suspense } from 'solid-js';
import { GitRepoFileLoader } from '~/components/FileLoader';
import { createEditorProvider } from '~/components/EditorProvider';
import EditorBuilder from '~/components/EditorBuilder';
import MarkdownView from '~/components/MarkdownView';
import SplitPane from '~/components/SplitPane';
import HelloWordArticle from '~/content/hello-world.md';

const IndexPage: Component = () => {
  const editor = createEditorProvider({
    fileLoader: new GitRepoFileLoader('Flouse/ckb-tthw', { subPath: 'js' }),
    openFile: './index.ts',
  });

  const other: { title: string; to: string }[] = [
    {
      title: 'Java',
      to: '#',
    },
    {
      title: 'Rust',
      to: '#',
    },
    {
      title: 'Go',
      to: '#',
    },
  ];

  return (
    <div class="flex flex-col h-screen w-screen overflow-clip">
      <div class="flex-none px-6 py-4 bg-gray-950 flex justify-between items-center">
        <div>
          <span class="font-bold text-lg mr-2 text-gray-50">Interactive Tutorial</span>
          <span class="text-gray-500 text-sm"> Time to Hello World on CKB</span>
        </div>
        <div class="space-x-4">
          <For each={other}>
            {(item) => (
              <a class="text-gray-50 hover:text-emerald-400" href={item.to}>
                {item.title}
              </a>
            )}
          </For>
        </div>
      </div>
      <div class="flex-auto flex overflow-hidden">
        <SplitPane sizes={[35,65]} gutterClass="bg-gray-200 hover:cursor-col-resize" gutterSize={4}>
          <div class="overflow-y-auto h-full">
            <Suspense
              fallback={<div class="flex justify-center items-center h-full">Loading...</div>}
            >
              <MarkdownView class="px-10">
                <HelloWordArticle />
              </MarkdownView>
            </Suspense>
          </div>
          <div>
            <EditorBuilder editor={editor} />
          </div>
        </SplitPane>
      </div>
    </div>
  );
};

export default IndexPage;
