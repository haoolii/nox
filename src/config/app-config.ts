const ChainId = {
  l1: 11155111,
  l2: 9997,
};

const NETWORK = {
  [ChainId.l1]: {
    id: ChainId.l1,
    name: "Sepolia",
    network: "l1",
    nativeCurrency: {
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    },
    rpcUrls: {
      public: { http: ["https://sepolia-geth.alt.technology/"] },
      default: { http: ["https://sepolia-geth.alt.technology/"] },
    },
    blockExplorers: {
      default: {
        name: "explorer",
        url: "https://sepolia.etherscan.io",
      },
    },
  },
  [ChainId.l2]: {
    id: ChainId.l2,
    name: "Multi Sequencer Testnet L2",
    network: "l2",
    nativeCurrency: {
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    },
    rpcUrls: {
      public: { http: ["https://testnet-rollup-api.altlayer.io"] },
      default: { http: ["https://testnet-rollup-api.altlayer.io"] },
    },
    blockExplorers: {
      default: {
        name: "explorer",
        url: "https://testnet-rollup-explorer.altlayer.io/",
      },
    },
    // iconUrl: `${window.location.origin}/chains/alt.svg`,
  },
};

const networks = [NETWORK[ChainId.l1], NETWORK[ChainId.l2]];

const bridge = {
  l1: {
    ...NETWORK[ChainId.l1],
    bridgeAddress: "0x572Af1Afa5afCfc6Fdf1EB2913Aa4463037860E8",
    erc721GraphQlUrl:
      "https://testnet-graph-node.alt.technology/subgraphs/name/L2ERC721",
  },
  l2: {
    ...NETWORK[ChainId.l2],
    bridgeAddress: "0x2ee889DfBBde780e8BD3f6C3A18De9C64499e757",
    erc721GraphQlUrl:
      "https://testnet-graph-node.alt.technology/subgraphs/name/L2ERC721",
  },
  tokens: [
    {
      l1Address: "0x00000000000000000000000000000000000000800",
      l2Address: "0x00000000000000000000000000000000000000800",
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      type: "native",
    },
    {
      l1Address: "0x22C1317FE43132b22860e8b465548613d6151a9F",
      l2Address: "0x9cF46902553B0775E55156aA8613Bb4E363B92a5",
      name: "Multi sequencer test token",
      symbol: "MSEQ",
      decimals: 18,
      type: "erc20",
    },
    {
      l1Address: "0xB5E7041cA1B7024C77cEdCcB3da205a660643697",
      l2Address: "0x535079d59627e06d0613497EF2ab207A9880f469",
      name: "Multi sequencer test NFT",
      symbol: "MSNFT",
      decimals: 0,
      type: "erc721",
    },
  ],
};
export { networks, bridge };
