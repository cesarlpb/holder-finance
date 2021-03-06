const LimitOrder = {
  contractAddress: "",
  contractName: "LimitOrder",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_router",
          type: "address",
        },
        {
          internalType: "address",
          name: "_factory",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_tradeID",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_tradeOwner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_tokenA",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_amountA",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_tokenB",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_amountB",
          type: "uint256",
        },
      ],
      name: "NewTrade",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_tradeID",
          type: "uint256",
        },
      ],
      name: "TradeCanceled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_tradeID",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_tradeOwner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_tradeExecutor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_fee",
          type: "uint256",
        },
      ],
      name: "TradeExecuted",
      type: "event",
    },
    {
      inputs: [],
      name: "UniswapFactoryAddress",
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
      inputs: [],
      name: "UniswapRouter",
      outputs: [
        {
          internalType: "contract IUniswapV2Router01",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "UniswapRouterAddress",
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
          name: "_tradeID",
          type: "uint256",
        },
      ],
      name: "cancelTrade",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenA",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amountA",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_tokenB",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amountB",
          type: "uint256",
        },
      ],
      name: "createTrade",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "currentTime",
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
          name: "_tradeID",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_feePercentage",
          type: "uint256",
        },
      ],
      name: "executeTrade",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "isOwner",
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
          internalType: "address",
          name: "_tokenA",
          type: "address",
        },
        {
          internalType: "address",
          name: "_tokenB",
          type: "address",
        },
      ],
      name: "isValidPair",
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
      inputs: [],
      name: "owner",
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
          name: "_tradeID",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_feePercentage",
          type: "uint256",
        },
      ],
      name: "profitableTrade",
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
          name: "_start",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_end",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_feePercentage",
          type: "uint256",
        },
      ],
      name: "profitableTradeMultiple",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_feePercentage",
          type: "uint256",
        },
      ],
      name: "profitableTradeMultiple",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_tradeID",
          type: "uint256",
        },
      ],
      name: "revertTrade",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum limitOrderFee.TradeStatus",
          name: "_status",
          type: "uint8",
        },
      ],
      name: "statusTrade",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_tradeOwner",
          type: "address",
        },
        {
          internalType: "enum limitOrderFee.TradeStatus",
          name: "_status",
          type: "uint8",
        },
      ],
      name: "statusTradeByOwner",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalTrades",
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
          internalType: "address",
          name: "_tradeOwner",
          type: "address",
        },
      ],
      name: "tradeByOwner",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "trades",
      outputs: [
        {
          internalType: "uint256",
          name: "ID",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "tradeOwner",
          type: "address",
        },
        {
          internalType: "address",
          name: "tokenA",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amountA",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "tokenB",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amountB",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amountFee",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "creationDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "closeDate",
          type: "uint256",
        },
        {
          internalType: "enum limitOrderFee.TradeStatus",
          name: "status",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

module.exports = LimitOrder;
