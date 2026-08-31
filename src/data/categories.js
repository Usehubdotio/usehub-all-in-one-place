/**
 * UseHub — Categories configuration
 */
import I from '../icons';

export const CATEGORIES = [
    { key: "all", label: "All in One", icon: I.Grid },
    { key: "ai_tools", label: "AI Tools", icon: I.Brain },
    { key: "cex", label: "CEXs (Most popular)", icon: I.Exchange },
    { key: "dex", label: "DEXs (Most popular)", icon: I.Swap },
    { key: "perps", label: "DEXs (Perpetual)", icon: I.Infinity },
    { key: "prediction", label: "Prediction Markets", icon: I.Crystal },
    { key: "ecosystems", label: "Blockchain Ecosystems", icon: I.Layers },
    { key: "wallets", label: "Wallets Interactions", icon: I.Wallet },
    { key: "multisig", label: "Multisig Services", icon: I.Users },
    { key: "bridges", label: "Bridges Interactions", icon: I.Link },
    { key: "ico", label: "ICO platforms", icon: I.Rocket },
    { key: "faucets", label: "Faucets", icon: I.Drop },
    { key: "fundraising", label: "Fundraising", icon: I.Fundraising },
    { key: "portfolio_hubs", label: "Portfolio of funds and Exchanges", icon: I.Briefcase },
    { key: "revoke_perms", label: "Revoke and Permissions", icon: I.Key },
    { key: "security", label: "Security and Protect", icon: I.Shield },
    { key: "insurance", label: "DeFi Insurance and Risk Management", icon: I.Umbrella },
    { key: "airdrops", label: "Airdrop Platforms", icon: I.Parachute },
    { key: "trading_tools", label: "Trading and Investment tools", icon: I.Candles },
    { key: "data_sources", label: "Crypto and Onchain Data", icon: I.Database },
    { key: "dashboards", label: "Dashboards", icon: I.Chart },
    { key: "news_research", label: "News and Research", icon: I.Newspaper },
    { key: "learn_free", label: "Learning free courses", icon: I.Graduation },
    { key: "jobs", label: "Job and Vacancies", icon: I.Briefcase },
];

/**
 * AI Tools subcategories — shown in the flyout submenu
 */
export const AI_SUBCATEGORIES = [
    { key: "ai_general", label: "General AI Assistants" },
    { key: "ai_search", label: "AI Search & Research" },
    { key: "ai_web3", label: "Web3 AI & Research" },
    { key: "ai_agents", label: "AI Agents & Automation" },
    { key: "ai_coding", label: "AI Coding, IDEs & App Builders" },
    { key: "ai_image_gen", label: "AI Image Generation & Design" },
    { key: "ai_video_gen", label: "AI Video Generation" },
    { key: "ai_image_video_edit", label: "AI Image & Video Editing" },
    { key: "ai_avatars", label: "AI Avatars & Influencers" },
    { key: "ai_music", label: "AI Music Generation" },
    { key: "ai_voice", label: "AI Voice, TTS & Dubbing" },
    { key: "ai_transcription", label: "AI Transcription & Subtitles" },
    { key: "ai_writing", label: "AI Writing & Content" },
    { key: "ai_documents", label: "AI Documents & Summarization" },
    { key: "ai_presentations", label: "AI Presentations" },
    { key: "ai_logo", label: "AI Logo & Branding" },
    { key: "ai_website", label: "AI Website Builders" },
    { key: "ai_uiux", label: "AI UI/UX Design" },
    { key: "ai_marketing", label: "AI Marketing & SEO" },
    { key: "ai_social", label: "AI Social Media Tools" },
];

/**
 * Wallet subcategories — shown in the flyout submenu
 */
export const WALLET_SUBCATEGORIES = [
    { key: "wallet_hot", label: "Hot Wallets" },
    { key: "wallet_cold", label: "Cold Wallets" },
    { key: "wallet_portfolio", label: "Portfolio Tracker" },
    { key: "wallet_network", label: "Network Tools" },
];
