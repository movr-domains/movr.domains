import React from "react";

export type StateType = {
  provider?: any | null;
  web3Provider?: any | null;
  address?: string | null;
  chainId?: number | null;
  movrName?: string | null;
};

export type ActionType =
  | {
      type: "SET_WEB3_PROVIDER";
      provider?: StateType["provider"];
      web3Provider?: StateType["web3Provider"];
      address?: StateType["address"];
      chainId?: StateType["chainId"];
      movrName?: StateType["movrName"];
    }
  | {
      type: "SET_ADDRESS";
      address?: StateType["address"];
    }
  | {
      type: "SET_CHAIN_ID";
      chainId?: StateType["chainId"];
    }
  | {
      type: "RESET_WEB3_PROVIDER";
    }
  | {
      type: "SET_MOVR_NAME";
      movrName?: StateType["movrName"];
    };

export const web3InitialState: StateType = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
  movrName: null,
};

export function web3Reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
        movrName: action.movrName,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };

    case "SET_MOVR_NAME":
      return {
        ...state,
        movrName: action.movrName,
      };
    case "RESET_WEB3_PROVIDER":
      return web3InitialState;
  }
}

const Web3Context = React.createContext<any>({
  web3InitialState,
  web3Reducer,
});
export default Web3Context;
