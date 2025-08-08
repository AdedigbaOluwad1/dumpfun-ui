/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/dumpfun.json`.
 */
export type Dumpfun = {
  address: "dumpz8FfmeKTUHg3WiZYTxwsFQAQSrCqpD4y474XBdR";
  metadata: {
    name: "dumpfun";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "buy";
      discriminator: [102, 6, 61, 18, 1, 218, 235, 234];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "mint";
        },
        {
          name: "associatedUser";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "buyer";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "mint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "bondingCurve";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  95,
                  99,
                  117,
                  114,
                  118,
                  101,
                ];
              },
              {
                kind: "account";
                path: "mint";
              },
            ];
          };
        },
        {
          name: "associatedBondingCurve";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "bondingCurve";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "mint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "globalFeeVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116,
                ];
              },
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
        {
          name: "eventAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121,
                ];
              },
            ];
          };
        },
        {
          name: "program";
        },
      ];
      args: [
        {
          name: "amountInSol";
          type: "u64";
        },
        {
          name: "slippageBasisPoints";
          type: {
            option: "u64";
          };
        },
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "creator";
          writable: true;
          signer: true;
        },
        {
          name: "mint";
        },
        {
          name: "mintAuthority";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  109,
                  105,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121,
                ];
              },
            ];
          };
        },
        {
          name: "associatedBondingCurve";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "bondingCurve";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "mint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "bondingCurve";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  95,
                  99,
                  117,
                  114,
                  118,
                  101,
                ];
              },
              {
                kind: "account";
                path: "mint";
              },
            ];
          };
        },
        {
          name: "globalFeeVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116,
                ];
              },
            ];
          };
        },
        {
          name: "metadata";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 101, 116, 97, 100, 97, 116, 97];
              },
              {
                kind: "const";
                value: [
                  11,
                  112,
                  101,
                  177,
                  227,
                  209,
                  124,
                  69,
                  56,
                  157,
                  82,
                  127,
                  107,
                  4,
                  195,
                  205,
                  88,
                  184,
                  108,
                  115,
                  26,
                  160,
                  253,
                  181,
                  73,
                  182,
                  209,
                  188,
                  3,
                  248,
                  41,
                  70,
                ];
              },
              {
                kind: "account";
                path: "mint";
              },
            ];
            program: {
              kind: "const";
              value: [
                11,
                112,
                101,
                177,
                227,
                209,
                124,
                69,
                56,
                157,
                82,
                127,
                107,
                4,
                195,
                205,
                88,
                184,
                108,
                115,
                26,
                160,
                253,
                181,
                73,
                182,
                209,
                188,
                3,
                248,
                41,
                70,
              ];
            };
          };
        },
        {
          name: "tokenMetadataProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
        {
          name: "eventAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121,
                ];
              },
            ];
          };
        },
        {
          name: "program";
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        },
      ];
    },
    {
      name: "sell";
      discriminator: [51, 230, 133, 164, 1, 127, 131, 173];
      accounts: [
        {
          name: "seller";
          writable: true;
          signer: true;
        },
        {
          name: "mint";
        },
        {
          name: "associatedUser";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "seller";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "mint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "bondingCurve";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  95,
                  99,
                  117,
                  114,
                  118,
                  101,
                ];
              },
              {
                kind: "account";
                path: "mint";
              },
            ];
          };
        },
        {
          name: "associatedBondingCurve";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "bondingCurve";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "mint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "globalFeeVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116,
                ];
              },
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "eventAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121,
                ];
              },
            ];
          };
        },
        {
          name: "program";
        },
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "isPercentage";
          type: "bool";
        },
        {
          name: "slippageBasisPoints";
          type: {
            option: "u64";
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: "bondingCurve";
      discriminator: [23, 183, 248, 55, 96, 216, 172, 96];
    },
  ];
  events: [
    {
      name: "onBuyEvent";
      discriminator: [81, 2, 6, 96, 103, 233, 253, 247];
    },
    {
      name: "onInitializeEvent";
      discriminator: [37, 127, 138, 63, 69, 22, 224, 13];
    },
    {
      name: "onSellEvent";
      discriminator: [4, 120, 200, 231, 56, 79, 233, 255];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "insufficientFunds";
      msg: "Insufficient funds for the operation.";
    },
    {
      code: 6001;
      name: "bondingCurveComplete";
      msg: "Bonding curve complete.";
    },
    {
      code: 6002;
      name: "slippageExceeded";
      msg: "Slippage tolerance exceeded";
    },
    {
      code: 6003;
      name: "mathOverflow";
      msg: "Math overflow occurred";
    },
    {
      code: 6004;
      name: "invalidPercentage";
      msg: "Invalid percentage. Must be between 0-10000 basis points";
    },
    {
      code: 6005;
      name: "insufficientTokenBalance";
      msg: "Insufficient token balance";
    },
    {
      code: 6006;
      name: "invalidAmount";
      msg: "Invalid amount";
    },
    {
      code: 6007;
      name: "insufficientReserves";
      msg: "Insufficient reserves";
    },
  ];
  types: [
    {
      name: "bondingCurve";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "realSolReserves";
            type: "u64";
          },
          {
            name: "realTokenReserves";
            type: "u64";
          },
          {
            name: "virtualSolReserves";
            type: "u64";
          },
          {
            name: "virtualTokenReserves";
            type: "u64";
          },
          {
            name: "totalTokenSupply";
            type: "u64";
          },
          {
            name: "isBondingCurveComplete";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "onBuyEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "buyer";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "solSpent";
            type: "u64";
          },
          {
            name: "tokensReceived";
            type: "u64";
          },
          {
            name: "feePaid";
            type: "u64";
          },
          {
            name: "virtualSolReserves";
            type: "u64";
          },
          {
            name: "virtualTokenReserves";
            type: "u64";
          },
          {
            name: "realSolReserves";
            type: "u64";
          },
          {
            name: "realTokenReserves";
            type: "u64";
          },
          {
            name: "isBondingCurveComplete";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "onInitializeEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "bondingCurve";
            type: "pubkey";
          },
          {
            name: "associatedBondingCurve";
            type: "pubkey";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "symbol";
            type: "string";
          },
          {
            name: "uri";
            type: "string";
          },
          {
            name: "virtualSolReserves";
            type: "u64";
          },
          {
            name: "virtualTokenReserves";
            type: "u64";
          },
          {
            name: "realSolReserves";
            type: "u64";
          },
          {
            name: "realTokenReserves";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "onSellEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seller";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "tokensSold";
            type: "u64";
          },
          {
            name: "solReceived";
            type: "u64";
          },
          {
            name: "feePaid";
            type: "u64";
          },
          {
            name: "virtualSolReserves";
            type: "u64";
          },
          {
            name: "virtualTokenReserves";
            type: "u64";
          },
          {
            name: "realSolReserves";
            type: "u64";
          },
          {
            name: "realTokenReserves";
            type: "u64";
          },
        ];
      };
    },
  ];
};
