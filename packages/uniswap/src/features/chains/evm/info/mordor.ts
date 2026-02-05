import { SwapConfigKey } from '@universe/gating'
import { ETHEREUM_LOGO } from 'ui/src/assets'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from 'uniswap/src/features/chains/evm/rpc'
import { buildChainTokens } from 'uniswap/src/features/chains/evm/tokens'
import { NetworkLayer, RPCType, UniverseChainId, UniverseChainInfo } from 'uniswap/src/features/chains/types'
import { Platform } from 'uniswap/src/features/platforms/types/Platform'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { buildUSC } from 'uniswap/src/features/tokens/stablecoin'

// Mordor testnet stablecoins - USC (Classic USD) on Mordor
const tokens = buildChainTokens({
  stables: {
    // Classic USD Stablecoin (USC) on Mordor testnet
    USDC: buildUSC('0xDE093684c796204224BC081f937aa059D903c52a', UniverseChainId.Mordor),
  },
})

// Mordor RPC endpoints
const MORDOR_RPC_URLS = ['https://rpc.mordor.etccooperative.org', 'https://mordor.etcdesktop.com']

export const MORDOR_CHAIN_INFO = {
  id: UniverseChainId.Mordor,
  name: 'Mordor Testnet',
  testnet: true,
  platform: Platform.EVM,
  assetRepoNetworkName: undefined,
  backendChain: {
    // Mordor is testnet-only, no backend support
    chain: undefined as never,
    backendSupported: false,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: 60000,
  bridge: undefined,
  docs: 'https://ethereumclassic.org/development/testnets',
  elementName: ElementName.ChainEthereum, // Reuse Ethereum element
  explorer: {
    name: 'Blockscout',
    url: 'https://etc-mordor.blockscout.com/' as const,
    apiURL: 'https://etc-mordor.blockscout.com/api',
  },
  interfaceName: 'mordor',
  label: 'Mordor Testnet',
  logo: ETHEREUM_LOGO,
  nativeCurrency: {
    name: 'Mordor ETC',
    symbol: 'METC',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: ETHEREUM_LOGO,
  },
  networkLayer: NetworkLayer.L1,
  pendingTransactionsRetryOptions: undefined,
  rpcUrls: {
    [RPCType.Default]: { http: MORDOR_RPC_URLS },
    [RPCType.Public]: { http: MORDOR_RPC_URLS },
    [RPCType.Private]: { http: MORDOR_RPC_URLS },
    [RPCType.Interface]: { http: MORDOR_RPC_URLS },
    [RPCType.Fallback]: { http: MORDOR_RPC_URLS },
  },
  urlParam: 'mordor',
  statusPage: undefined,
  tokens,
  supportsV4: false, // V4 requires EIP-1153 (post-Olympia upgrade)
  supportsNFTs: true,
  wrappedNativeCurrency: {
    name: 'Wrapped Ether',
    symbol: 'WETC',
    decimals: 18,
    // WETC address on Mordor testnet (same as mainnet)
    address: '0x1953cab0E5bFa6D4a9BaD6E05fD46C1CC6527a5a',
  },
  gasConfig: {
    send: {
      configKey: SwapConfigKey.EthSendMinGasAmount,
      default: 20,
    },
    swap: {
      configKey: SwapConfigKey.EthSwapMinGasAmount,
      default: 150,
    },
  },
  tradingApiPollingIntervalMs: 2000,
} as const satisfies UniverseChainInfo
