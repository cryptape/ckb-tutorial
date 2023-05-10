import { createContext, ParentComponent, useContext } from 'solid-js';
import { WebContainer } from '@webcontainer/api';
import { createStore } from 'solid-js/store';

export interface AppContext {
  webContainer?: WebContainer;
}

const appContext = createContext<AppContext>();

export const useAppContext = () => {
  return useContext(appContext);
};

export const AppProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<AppContext>();
  window.addEventListener('load', async () => {
    const webContainerInstance = await WebContainer.boot();
    setState({ webContainer: webContainerInstance });
  });

  return <appContext.Provider value={state}>{props.children}</appContext.Provider>;
};
