import { createContext } from "react";
import Store from "./Store";
import UIStore from "./UIStore";

const store = new Store();
store.seedbookPosts();
const uiStore = new UIStore();

export const storeContext = createContext({store: store, uiStore: uiStore});
