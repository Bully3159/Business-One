import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  ReferenceLine,
} from "recharts";
import {
  ArrowUpRight,
  ChartBar,
  Table as TableIcon,
} from "@phosphor-icons/react";
import { Panel, fmt } from "./components";
export const palette = [
  "#00a9a0",
  "#4157dc",
  "#92b6ff",
  "#e9b45b",
  "#566878",
  "#cfdae1",
  "#d3f2ec",
];
export const short = (n) =>
  Math.abs(n) >= 1e6
    ? (n / 1e6).toLocaleString("nl-NL", { maximumFractionDigits: 1 }) + " mln"
    : Math.abs(n) >= 1000
      ? (n / 1000).toLocaleString("nl-NL", { maximumFractionDigits: 1 }) + "k"
      : n.toLocaleString("nl-NL", { maximumFractionDigits: 0 });
export function MetricDeck({ items }) {
  return (
    <div className="metric-deck">
      {items.map(({ label, value, unit = "SRD", series, tag, go }, i) => (
        <button
          key={label}
          className={"metric-tile metric-" + i}
          onClick={go}
          disabled={!go}
        >
          <div className="metric-top">
            <span>{label}</span>
            <ArrowUpRight size={18} />
          </div>
          <strong>
            {fmt(value)} <small>{unit}</small>
          </strong>
          <div className="metric-bottom">
            <span>{tag}</span>
            {series && (
              <div className="spark" aria-label="Indicatieve maandtrend">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={series.map((v) => ({ v }))}>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={i === 0 ? "#8ef3d4" : "#00a9a0"}
                      fill={i === 0 ? "#ffffff18" : "#00a9a018"}
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
export function Donut({
  title,
  sub,
  items,
  center,
  caption,
  onSelect,
  unit = "SRD",
}) {
  const [focus, setFocus] = useState(null);
  const data = items.map(([name, value], i) => ({
    name,
    value,
    color: palette[i % palette.length],
  }));
  return (
    <Panel title={title} sub={sub} className="donut-panel">
      <div className="donut-content">
        <div
          className="donut-chart"
          role="img"
          aria-label={items.map(([l, v]) => `${l}: ${fmt(v)}`).join("; ")}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius="73%"
                outerRadius="95%"
                paddingAngle={
                  data.filter((d) => d.value > 0).length > 1 ? 4 : 0
                }
                cornerRadius={5}
                stroke="none"
                startAngle={90}
                endAngle={-270}
                isAnimationActive={false}
                onMouseEnter={(_, i) => setFocus(i)}
                onMouseLeave={() => setFocus(null)}
                onClick={(_, i) => onSelect?.(i)}
              >
                {data.map((d, i) => (
                  <Cell
                    key={d.name}
                    fill={d.color}
                    opacity={focus === null || focus === i ? 1 : 0.3}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [fmt(v), unit]}
                contentStyle={{
                  border: "1px solid #e6e9ef",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <strong>
              {focus === null ? center : short(data[focus].value)}
            </strong>
            <span>{focus === null ? caption : data[focus].name}</span>
          </div>
        </div>
        <div className="donut-legend">
          {data.map((d, i) => (
            <button
              key={d.name}
              onMouseEnter={() => setFocus(i)}
              onMouseLeave={() => setFocus(null)}
              onClick={() => onSelect?.(i)}
              disabled={!onSelect}
            >
              <i style={{ background: d.color }} />
              <span>{d.name}</span>
              <strong>{short(d.value)}</strong>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}
export function HorizontalBars({
  title,
  sub,
  items,
  unit = "SRD",
  color = "#00a9a0",
  onSelect,
}) {
  return (
    <Panel title={title} sub={sub} className="horizontal-panel">
      <div
        className="horizontal-chart"
        style={{ height: Math.max(210, items.length * 40) }}
        role="img"
        aria-label={items.map(([n, v]) => `${n}: ${fmt(v)} ${unit}`).join("; ")}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={items.map(([name, value]) => ({ name, value }))}
            layout="vertical"
            margin={{ top: 5, right: 28, left: 8, bottom: 5 }}
          >
            <CartesianGrid
              horizontal={false}
              stroke="#edf0f3"
              strokeDasharray="3 5"
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#657586", fontSize: 10 }}
              tickFormatter={short}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={130}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#536174", fontSize: 10 }}
              tickFormatter={(v) => (v.length > 23 ? v.slice(0, 21) + "…" : v)}
            />
            <Tooltip
              cursor={{ fill: "#edf8f6" }}
              formatter={(v) => [fmt(v), unit]}
              contentStyle={{
                border: "1px solid #e6e9ef",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <ReferenceLine x={0} stroke="#ccd7de" />
            <Bar
              dataKey="value"
              fill={color}
              radius={[0, 5, 5, 0]}
              maxBarSize={18}
              isAnimationActive={false}
              onClick={(_, i) => onSelect?.(i)}
            >
              {items.map(([n, v], i) => (
                <Cell
                  key={n}
                  fill={v < 0 ? "#d68b63" : color}
                  opacity={1 - i * 0.055}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
export function StockVisual({ labels, values, onSelect, selected }) {
  const total = values.reduce((a, b) => a + b, 0);
  return (
    <Panel title="Voorraadprofiel" sub="Alle artikel/magazijnposities">
      <div
        className="stock-strip"
        role="group"
        aria-label={labels.map((l, i) => `${l}: ${values[i]}`).join("; ")}
      >
        {values.map(
          (v, i) =>
            v > 0 && (
              <button
                key={labels[i]}
                aria-label={labels[i] + ": " + v}
                style={{
                  width: `${(v / total) * 100}%`,
                  background: palette[i % palette.length],
                }}
                onClick={() => onSelect?.(selected === i ? null : i)}
                title={labels[i] + ": " + v}
              />
            ),
        )}
      </div>
      <div className="stock-profile-legend">
        {labels.map((l, i) => (
          <button
            key={l}
            className={selected === i ? "active" : ""}
            onClick={() => onSelect?.(selected === i ? null : i)}
            disabled={!onSelect}
          >
            <i style={{ background: palette[i % palette.length] }} />
            <span>{l}</span>
            <strong>{values[i].toLocaleString("nl-NL")}</strong>
          </button>
        ))}
      </div>
    </Panel>
  );
}
