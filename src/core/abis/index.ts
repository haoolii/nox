const L1BridgeAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "challenger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "defender",
        type: "address",
      },
    ],
    name: "ChallengeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "loser",
        type: "address",
      },
    ],
    name: "ChallengeEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "challenger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "defender",
        type: "address",
      },
    ],
    name: "ChallengeInvalid",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "challengeStatus",
    outputs: [
      {
        internalType: "enum ChallengeStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "createChallenge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentChallengeId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "currentResponder",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "lastMoveBlockNumber",
            type: "uint256",
          },
        ],
        internalType: "struct Participant",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "proof",
        type: "bytes",
      },
    ],
    name: "endChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "getChallengeData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "L",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "R",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "challenger",
            type: "address",
          },
          {
            internalType: "address",
            name: "defender",
            type: "address",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "preState",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "stepCount",
                type: "uint256",
              },
            ],
            internalType: "struct PreChallengeState",
            name: "challengerPreChallengeState",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "preState",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "stepCount",
                type: "uint256",
              },
            ],
            internalType: "struct PreChallengeState",
            name: "defenderPreChallengeState",
            type: "tuple",
          },
          {
            internalType: "enum ChallengeStatus",
            name: "status",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "address",
                name: "addr",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "lastMoveBlockNumber",
                type: "uint256",
              },
            ],
            internalType: "struct Participant",
            name: "current",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "addr",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "lastMoveBlockNumber",
                type: "uint256",
              },
            ],
            internalType: "struct Participant",
            name: "next",
            type: "tuple",
          },
        ],
        internalType: "struct ChallengeBasicData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChallengePeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "getChallengerPreChallengeState",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "preState",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "stepCount",
            type: "uint256",
          },
        ],
        internalType: "struct PreChallengeState",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "step",
        type: "uint256",
      },
    ],
    name: "getChallengerState",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCodeProof",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "getDefenderPreChallengeState",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "preState",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "stepCount",
            type: "uint256",
          },
        ],
        internalType: "struct PreChallengeState",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "step",
        type: "uint256",
      },
    ],
    name: "getDefenderState",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "isTimedOut",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "nextResponder",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "lastMoveBlockNumber",
            type: "uint256",
          },
        ],
        internalType: "struct Participant",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "stateHash",
        type: "bytes32",
      },
    ],
    name: "respondState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
    ],
    name: "setChallengePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "instRoot",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "funcRoot",
        type: "bytes32",
      },
    ],
    name: "setCodeProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "timeout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "preState",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "stepCount",
            type: "uint256",
          },
        ],
        internalType: "struct PreChallengeState",
        name: "state",
        type: "tuple",
      },
    ],
    name: "updatePreChallengeState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "InitDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "WithdrawFinalized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "l1Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "depositERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "l1Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "depositERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "depositNative",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "checkpoint",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "headerHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "withdrawRoot",
        type: "bytes32",
      },
      {
        internalType: "bytes32[]",
        name: "withdrawProof",
        type: "bytes32[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "finalizeWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "l1Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "finalizeWithdrawERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "l1Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "finalizeWithdrawERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "finalizeWithdrawNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initDeposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "withdrawHash",
        type: "bytes32",
      },
    ],
    name: "withdrawStatus",
    outputs: [
      {
        internalType: "enum WithdrawStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromBlock",
        type: "uint256",
      },
    ],
    name: "CommitReverted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "submitter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "checkpoint",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "commitHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "l1BlockNumber",
        type: "uint256",
      },
    ],
    name: "CommitSubmitted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "verifiers",
        type: "address[]",
      },
    ],
    name: "addVerifiers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "checkpoint",
        type: "uint256",
      },
    ],
    name: "getCommit",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "checkpoint",
        type: "uint256",
      },
    ],
    name: "getCommitDetail",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "commitHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "l1BlockNumber",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "submitter",
            type: "address",
          },
        ],
        internalType: "struct Commit",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLatestL2Checkpoint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "verifiers",
        type: "address[]",
      },
    ],
    name: "removeVerifiers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "setL2CheckpointFixedLength",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "commitHashes",
        type: "bytes32[]",
      },
      {
        internalType: "uint256[]",
        name: "checkpoints",
        type: "uint256[]",
      },
    ],
    name: "submitCommits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const L2BridgeAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "DepositFinalized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "blockCheckpoint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkpointFixedLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "depositMessage",
        type: "bytes",
      },
    ],
    name: "depositFinalized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "l1Token",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "finalizeDepositERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "l1Token",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "finalizeDepositERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "finalizeDepositNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "isCheckpoint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentCheckpointBlockNumber",
        type: "uint256",
      },
    ],
    name: "lastCheckpointBlockNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lastCheckpointBlockNumber",
        type: "uint256",
      },
    ],
    name: "nextCheckpointBlockNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "setCheckpointFixedLength",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "erc20",
        type: "address",
      },
    ],
    name: "setNativeERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "l2Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "l2Token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "withdrawERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "withdrawHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "withdrawProof",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lastCheckpointBlockNumber",
        type: "uint256",
      },
    ],
    name: "withdrawRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "l1Token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "l2Token",
        type: "address",
      },
    ],
    name: "L2ERC20Created",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "l1Token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "l2Token",
        type: "address",
      },
    ],
    name: "L2ERC721Created",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    name: "createL2ERC20",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    name: "createL2ERC721",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
    ],
    name: "l1ERC20TokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l2Token",
        type: "address",
      },
    ],
    name: "l1ERC721TokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
    ],
    name: "l2ERC20TokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_l1Token",
        type: "address",
      },
    ],
    name: "l2ERC721TokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
    ],
    name: "setL1ChainId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export { L1BridgeAbi, L2BridgeAbi };
