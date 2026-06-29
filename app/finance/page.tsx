"use client";

import { useState } from "react";
import useSWR from "swr";
import { Search, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function formatIDR(usd: number, rate: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(usd * rate);
}

function formatUSD(usd: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(usd);
}

function PriceCard({ name, symbol, price, change, changePercent, priceIDR, type }: {
  name: string;
  symbol: string;
  price: string;
  change?: string;
  changePercent: number;
  priceIDR?: string;
  type: "crypto" | "stock";
}) {
  const isPositive = changePercent >= 0;
  return (
    <div className="rounded-2xl border border-border p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{symbol}</p>
          <p className="font-heading font-semibold">{name}</p>
        </div>
        <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium border ${
          isPositive
            ? "bg-green-500/10 text-green-400 border-green-500/20"
            : "bg-red-500/10 text-red-400 border-red-500/20"
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(changePercent).toFixed(2)}%
        </span>
      </div>
      <div>
        <p className="font-heading text-2xl font-bold">{price}</p>
        {priceIDR && <p className="text-sm text-muted-foreground mt-0.5">{priceIDR}</p>}
        {change && <p className={`text-xs mt-1 ${isPositive ? "text-green-400" : "text-red-400"}`}>{isPositive ? "+" : ""}{change} today</p>}
      </div>
      <p className="text-[10px] text-muted-foreground">{type === "stock" ? "⚠️ Data delayed ~15 min" : "🔄 Live via CoinGecko"}</p>
    </div>
  );
}

function CryptoSection() {
  const [search, setSearch] = useState("");
  const [searchId, setSearchId] = useState("");
  const [inputVal, setInputVal] = useState("");

  const { data: bitcoin, isLoading: btcLoading } = useSWR(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,idr&include_24hr_change=true",
    fetcher, { refreshInterval: 60000 }
  );

  const { data: searchData, isLoading: searchLoading } = useSWR(
    searchId ? `https://api.coingecko.com/api/v3/simple/price?ids=${searchId}&vs_currencies=usd,idr&include_24hr_change=true` : null,
    fetcher, { refreshInterval: 60000 }
  );

  const { data: searchList } = useSWR(
    search.length > 1 ? `https://api.coingecko.com/api/v3/search?query=${search}` : null,
    fetcher
  );

  const handleSelect = (id: string, name: string) => {
    setSearchId(id);
    setInputVal(name);
    setSearch("");
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-heading text-xl font-bold">₿ Crypto</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {btcLoading ? (
          <div className="rounded-2xl border border-border p-5 animate-pulse h-32" />
        ) : bitcoin?.bitcoin ? (
          <PriceCard
            name="Bitcoin"
            symbol="BTC"
            price={formatUSD(bitcoin.bitcoin.usd)}
            priceIDR={formatIDR(bitcoin.bitcoin.idr, 1)}
            changePercent={bitcoin.bitcoin.usd_24h_change}
            type="crypto"
          />
        ) : null}

        {searchId && (
          searchLoading ? (
            <div className="rounded-2xl border border-border p-5 animate-pulse h-32" />
          ) : searchData?.[searchId] ? (
            <PriceCard
              name={inputVal}
              symbol={searchId.toUpperCase()}
              price={formatUSD(searchData[searchId].usd)}
              priceIDR={"Rp " + new Intl.NumberFormat("id-ID").format(searchData[searchId].idr)}
              changePercent={searchData[searchId].usd_24h_change}
              type="crypto"
            />
          ) : null
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <div className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            value={inputVal}
            onChange={(e) => { setInputVal(e.target.value); setSearch(e.target.value); setSearchId(""); }}
            placeholder="Search crypto (e.g. ethereum)"
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
          />
        </div>
        {search.length > 1 && searchList?.coins?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-background shadow-lg z-10 max-h-48 overflow-y-auto">
            {searchList.coins.slice(0, 6).map((coin: { id: string; name: string; symbol: string }) => (
              <button
                key={coin.id}
                onClick={() => handleSelect(coin.id, coin.name)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-foreground/5 transition-colors"
              >
                <span>{coin.name}</span>
                <span className="text-xs text-muted-foreground uppercase">{coin.symbol}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StockSection() {
  const [searchInput, setSearchInput] = useState("");
  const [ticker, setTicker] = useState("");

  const quickPicks = ["^JKSE", "BBCA.JK", "BBRI.JK", "TLKM.JK", "GOTO.JK"];
  const quickLabels: Record<string, string> = {
    "^JKSE": "IHSG", "BBCA.JK": "BBCA", "BBRI.JK": "BBRI", "TLKM.JK": "TLKM", "GOTO.JK": "GOTO"
  };

  const { data: ihsg, isLoading: ihsgLoading } = useSWR(
    "/api/stock?ticker=%5EJKSE",
    fetcher, { refreshInterval: 300000 }
  );

  const { data: stockData, isLoading: stockLoading } = useSWR(
    ticker ? `/api/stock?ticker=${encodeURIComponent(ticker)}` : null,
    fetcher, { refreshInterval: 300000 }
  );

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-heading text-xl font-bold">📈 Saham Indonesia</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {ihsgLoading ? (
          <div className="rounded-2xl border border-border p-5 animate-pulse h-32" />
        ) : ihsg?.price ? (
          <PriceCard
            name="IHSG"
            symbol="^JKSE"
            price={new Intl.NumberFormat("id-ID").format(ihsg.price)}
            changePercent={ihsg.changePercent}
            change={ihsg.change?.toFixed(2)}
            type="stock"
          />
        ) : null}

        {ticker && (
          stockLoading ? (
            <div className="rounded-2xl border border-border p-5 animate-pulse h-32" />
          ) : stockData?.price ? (
            <PriceCard
              name={stockData.name || ticker}
              symbol={ticker.replace(".JK", "")}
              price={new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(stockData.price)}
              changePercent={stockData.changePercent}
              change={stockData.change?.toFixed(0)}
              type="stock"
            />
          ) : null
        )}
      </div>

      {/* Quick picks */}
      <div className="flex flex-wrap gap-2">
        {quickPicks.map((t) => (
          <button
            key={t}
            onClick={() => setTicker(t === "^JKSE" ? "" : t)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              ticker === t
                ? "bg-amber-500 text-black border-amber-500"
                : "border-border text-muted-foreground hover:border-amber-500/40"
            }`}
          >
            {quickLabels[t]}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 max-w-sm">
        <div className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 flex-1">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
            placeholder="e.g. BBCA, TLKM, ANTM"
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
          />
        </div>
        <button
          onClick={() => setTicker(searchInput + ".JK")}
          className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-black hover:bg-amber-400 transition-colors"
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default function FinancePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 flex flex-col gap-16">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold">Finance</h1>
        <p className="text-muted-foreground">Live crypto & stock prices — for personal reference.</p>
      </div>

      <CryptoSection />
      <StockSection />
    </div>
  );
}