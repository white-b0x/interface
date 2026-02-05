import { SwapConfigKey } from '@universe/gating'
import { ETHEREUM_LOGO } from 'ui/src/assets'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from 'uniswap/src/features/chains/evm/rpc'
import { buildChainTokens } from 'uniswap/src/features/chains/evm/tokens'
import { NetworkLayer, RPCType, UniverseChainId, UniverseChainInfo } from 'uniswap/src/features/chains/types'
import { Platform } from 'uniswap/src/features/platforms/types/Platform'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { buildUSC } from 'uniswap/src/features/tokens/stablecoin'

// ETC stablecoins - USC (Classic USD) is the primary stablecoin on ETC
const tokens = buildChainTokens({
  stables: {
    // Classic USD Stablecoin (USC) on ETC mainnet
    USDC: buildUSC('0xDE093684c796204224BC081f937aa059D903c52a', UniverseChainId.Etc),
  },
})

// ETC RPC endpoints
const ETC_RPC_URLS = ['https://etc.rivet.link', 'https://etc.etcdesktop.com', 'https://etc.mytokenpocket.vip']

export const ETC_CHAIN_INFO = {
  id: UniverseChainId.Etc,
  name: 'Ethereum Classic',
  testnet: false,
  platform: Platform.EVM,
  assetRepoNetworkName: 'ethereum-classic',
  backendChain: {
    // ETC is not supported by Uniswap backend
    chain: undefined as never,
    backendSupported: false,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: 60000,
  bridge: 'https://bridge.blockscout.com/',
  docs: 'https://ethereumclassic.org/',
  elementName: ElementName.ChainEthereum, // Reuse Ethereum element
  explorer: {
    name: 'Blockscout',
    url: 'https://etc.blockscout.com/' as const,
    apiURL: 'https://etc.blockscout.com/api',
  },
  interfaceName: 'etc',
  label: 'Ethereum Classic',
  logo: ETHEREUM_LOGO,
  nativeCurrency: {
    name: 'Ethereum Classic',
    symbol: 'ETC',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: ETHEREUM_LOGO,
  },
  networkLayer: NetworkLayer.L1,
  pendingTransactionsRetryOptions: undefined,
  rpcUrls: {
    [RPCType.Default]: { http: ETC_RPC_URLS },
    [RPCType.Public]: { http: ETC_RPC_URLS },
    [RPCType.Private]: { http: ETC_RPC_URLS },
    [RPCType.Interface]: { http: ETC_RPC_URLS },
    [RPCType.Fallback]: { http: ETC_RPC_URLS },
  },
  urlParam: 'etc',
  statusPage: undefined,
  tokens,
  supportsV4: false, // V4 requires EIP-1153 (post-Olympia upgrade)
  supportsNFTs: true,
  wrappedNativeCurrency: {
    name: 'Wrapped Ether',
    symbol: 'WETC',
    decimals: 18,
    // WETC address on ETC mainnet
    address: '0x1953cab0E5bFa6D4a9BaD6E05fD46C1CC6527a5a',
  },
  gasConfig: {
    send: {
      configKey: SwapConfigKey.EthSendMinGasAmount,
      default: 20, // .002 ETC
    },
    swap: {
      configKey: SwapConfigKey.EthSwapMinGasAmount,
      default: 150, // .015 ETC
    },
  },
  tradingApiPollingIntervalMs: 5000,
} as const satisfies UniverseChainInfo
