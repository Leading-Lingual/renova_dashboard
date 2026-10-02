import { create as actualCreate, type StateCreator } from "zustand";
type Persisted = { persist: { clearStorage: () => void } };

const isPersisted = (store: object): store is Persisted =>
  "persist" in store;

const resetFns = new Set<() => void>();

export const resetAllStores = () => {
  resetFns.forEach((reset) => reset());
};

export const create = (<T>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    const initialState = store.getInitialState();
    resetFns.add(() => {
      store.setState(initialState, true);
      if (isPersisted(store)) {
        store.persist.clearStorage();
      }
    });
    return store;
  };
}) as typeof actualCreate;
