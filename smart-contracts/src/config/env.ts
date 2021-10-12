import { config } from "dotenv";
config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const MUMBAI_TESTNET = "https://rpc-mumbai.maticvigil.com/";
export const MUMBAI_TESTNET_CHAIN_ID = 80001;
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
export const CONTRACT_URI = process.env.CONTRACT_URI ?? ""
export const WETH_CONTRACT_ADDRESS = process.env.WETH_CONTRACT_ADDRESS ?? ""
export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY ?? ""
export const DEFAULT_TOKEN_URI = process.env.DEFAULT_TOKEN_URI ?? ""
export const IPFS_API_KEY = process.env.IPFS_API_KEY ?? ""
export const IPFS_API_SECRET = process.env.IPFS_API_SECRET ?? ""
