import type { Block, Log } from "@ethersproject/providers";
import type Sqlite from "better-sqlite3";
import type { Transaction } from "ethers";

import { SqliteCacheStore } from "./sqliteCacheStore";

export type ContractMetadata = {
  contractAddress: string;
  startBlock: number;
  endBlock: number;
};

export type ContractCall = {
  key: string; // `${chainId}-${blockNumber}-${contractAddress}-${data}`
  result: string; // Stringified JSON of the contract call result
};

export interface BaseCacheStore {
  db: Sqlite.Database;

  migrate(): Promise<void>;

  getContractMetadata(
    contractAddress: string
  ): Promise<ContractMetadata | null>;

  upsertContractMetadata(
    attributes: ContractMetadata
  ): Promise<ContractMetadata>;

  upsertLog(log: Log): Promise<void>;

  insertBlock(block: Block): Promise<void>;

  insertTransactions(transactions: Transaction[]): Promise<void>;

  getLogs(addresses: string[], fromBlock: number): Promise<Log[]>;

  getBlock(blockHash: string): Promise<Block | null>;

  getTransaction(transactionHash: string): Promise<Transaction | null>;

  upsertContractCall(contractCall: ContractCall): Promise<void>;

  getContractCall(contractCallKey: string): Promise<ContractCall | null>;
}

export type CacheStore = SqliteCacheStore;
