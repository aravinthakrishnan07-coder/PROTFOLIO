import { RotateCcw } from 'lucide-react';
import { type MouseEvent, useMemo, useRef, useState } from 'react';

interface DataPoint {
  id: number;
  x: number;
  y: number;
}

type PresetKey = 'study' | 'linear' | 'scatter';

const PRESETS: Record<PresetKey, { label: string; points: DataPoint[] }> = {
  study: {
    label: 'Study Trend',
    points: [
      { id: 1, x: 1.2, y: 2.1 },
      { id: 2, x: 2.4, y: 3.3 },
      { id: 3, x: 3.5, y: 4.0 },
      { id: 4, x: 4.8, y: 5.5 },
      { id: 5, x: 6.1, y: 6.2 },
      { id: 6, x: 7.4, y: 7.8 },
      { id: 7, x: 8.6, y: 8.5 },
    ],
  },
  linear: {
    label: 'Tight Fit',
    points: [
      { id: 101, x: 1.5, y: 2.0 },
      { id: 102, x: 3.0, y: 3.6 },
      { id: 103, x: 4.5, y: 5.1 },
      { id: 104, x: 6.0, y: 6.5 },
      { id: 105, x: 7.5, y: 8.1 },
      { id: 106, x: 9.0, y: 9.4 },
    ],
  },
  scatter: {
    label: 'Noisy Sample',
    points: [
      { id: 201, x: 1.0, y: 3.2 },
      { id: 202, x: 2.2, y: 2.1 },
      { id: 203, x: 3.8, y: 5.4 },
      { id: 204, x: 5.1, y: 4.2 },
      { id: 205, x: 6.4, y: 7.1 },
      { id: 206, x: 7.9, y: 6.3 },
      { id: 207, x: 9.1, y: 8.9 },
    ],
  },
};

const SVG_W = 540;
const SVG_H = 320;
const PAD_L = 46;
const PAD_R = 20;
const PAD_T = 20;
const PAD_B = 38;
const PLOT_W = SVG_W - PAD_L - PAD_R;
const PLOT_H = SVG_H - PAD_T - PAD_B;

function toSvgX(x: number) {
  return PAD_L + (x / 10) * PLOT_W;
}

function toSvgY(y: number) {
  return PAD_T + ((10 - y) / 10) * PLOT_H;
}

export function RegressionWorkbench() {
  const [activePreset, setActivePreset] = useState<PresetKey>('study');
  const [points, setPoints] = useState<DataPoint[]>(PRESETS.study.points);
  const [showResiduals, setShowResiduals] = useState(true);
  const nextIdRef = useRef(1000);

  const stats = useMemo(() => {
    const n = points.length;
    if (n < 2) {
      return { slope: 0, intercept: 0, mse: 0, r2: 0 };
    }

    const meanX = points.reduce((acc, p) => acc + p.x, 0) / n;
    const meanY = points.reduce((acc, p) => acc + p.y, 0) / n;

    let num = 0;
    let den = 0;
    for (const p of points) {
      num += (p.x - meanX) * (p.y - meanY);
      den += (p.x - meanX) * (p.x - meanX);
    }

    const slope = den === 0 ? 0 : num / den;
    const intercept = meanY - slope * meanX;

    let ssRes = 0;
    let ssTot = 0;
    for (const p of points) {
      const yHat = slope * p.x + intercept;
      ssRes += (p.y - yHat) ** 2;
      ssTot += (p.y - meanY) ** 2;
    }

    const mse = ssRes / n;
    const r2 = ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot);

    return { slope, intercept, mse, r2 };
  }, [points]);

  const handlePresetChange = (key: PresetKey) => {
    setActivePreset(key);
    setPoints(PRESETS[key].points);
  };

  const handleSvgClick = (event: MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scaleX = SVG_W / rect.width;
    const scaleY = SVG_H / rect.height;
    const rawX = (event.clientX - rect.left) * scaleX;
    const rawY = (event.clientY - rect.top) * scaleY;

    const dataX = ((rawX - PAD_L) / PLOT_W) * 10;
    const dataY = 10 - ((rawY - PAD_T) / PLOT_H) * 10;

    if (dataX < 0 || dataX > 10 || dataY < 0 || dataY > 10) return;

    nextIdRef.current += 1;
    setPoints((prev) => [
      ...prev,
      {
        id: nextIdRef.current,
        x: Number(dataX.toFixed(2)),
        y: Number(dataY.toFixed(2)),
      },
    ]);
  };

  const handleRemovePoint = (e: MouseEvent<SVGGElement>, id: number) => {
    e.stopPropagation();
    if (points.length <= 2) return;
    setPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const yAt0 = stats.intercept;
  const yAt10 = stats.slope * 10 + stats.intercept;

  const lineStart = { x: 0, y: yAt0 };
  const lineEnd = { x: 10, y: yAt10 };

  const safeSlope = Math.abs(stats.slope) < 0.005 ? 0 : stats.slope;
  const safeIntercept = Math.abs(stats.intercept) < 0.005 ? 0 : stats.intercept;
  const sign = safeIntercept >= 0 ? '+' : '-';

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6">
      {/* Top Bar of Workbench */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
        <div>
          <p className="text-xs font-medium text-zinc-500">
            Interactive Lab · Ordinary Least Squares
          </p>
          <h2 className="mt-0.5 text-base font-semibold tracking-tight text-zinc-950">
            Linear Regression Explorer
          </h2>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1">
          {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handlePresetChange(key)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                activePreset === key
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {PRESETS[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Plot Area */}
      <div className="my-4 flex-1">
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-[#FAFAFB]">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            onClick={handleSvgClick}
            role="img"
            aria-label="Interactive Linear Regression scatter plot. Click anywhere inside the grid to add data points, or click an existing point to remove it."
            className="block h-auto w-full cursor-crosshair select-none"
          >
            <defs>
              <clipPath id="plot-clip">
                <rect x={PAD_L} y={PAD_T} width={PLOT_W} height={PLOT_H} />
              </clipPath>
            </defs>

            {/* Grid Lines */}
            {[0, 2, 4, 6, 8, 10].map((tick) => (
              <g key={tick}>
                <line
                  x1={toSvgX(tick)}
                  y1={PAD_T}
                  x2={toSvgX(tick)}
                  y2={PAD_T + PLOT_H}
                  stroke="#E4E4E7"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? undefined : '3 3'}
                />
                <line
                  x1={PAD_L}
                  y1={toSvgY(tick)}
                  x2={PAD_L + PLOT_W}
                  y2={toSvgY(tick)}
                  stroke="#E4E4E7"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? undefined : '3 3'}
                />
                <text
                  x={toSvgX(tick)}
                  y={SVG_H - 14}
                  textAnchor="middle"
                  className="fill-zinc-500 font-mono text-[10px]"
                >
                  {tick}
                </text>
                <text
                  x={PAD_L - 10}
                  y={toSvgY(tick) + 3}
                  textAnchor="end"
                  className="fill-zinc-500 font-mono text-[10px]"
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* Axes labels */}
            <text
              x={PAD_L + PLOT_W / 2}
              y={SVG_H - 2}
              textAnchor="middle"
              className="fill-zinc-500 text-[10px] font-medium"
            >
              Input Feature (x)
            </text>
            <text
              x={13}
              y={PAD_T + PLOT_H / 2}
              textAnchor="middle"
              transform={`rotate(-90 13 ${PAD_T + PLOT_H / 2})`}
              className="fill-zinc-500 text-[10px] font-medium"
            >
              Output (y)
            </text>

            {/* Residual vertical error lines */}
            {showResiduals &&
              points.map((p) => {
                const predictedY = stats.slope * p.x + stats.intercept;
                return (
                  <line
                    key={`res-${p.id}`}
                    x1={toSvgX(p.x)}
                    y1={toSvgY(p.y)}
                    x2={toSvgX(p.x)}
                    y2={toSvgY(predictedY)}
                    stroke="#94A3B8"
                    strokeWidth="1.25"
                    strokeDasharray="3 2"
                    clipPath="url(#plot-clip)"
                  />
                );
              })}

            {/* Regression Best-Fit Line */}
            <line
              x1={toSvgX(lineStart.x)}
              y1={toSvgY(lineStart.y)}
              x2={toSvgX(lineEnd.x)}
              y2={toSvgY(lineEnd.y)}
              stroke="#2563EB"
              strokeWidth="2.5"
              clipPath="url(#plot-clip)"
            />

            {/* Data Points */}
            {points.map((p) => (
              <g
                key={p.id}
                onClick={(e) => handleRemovePoint(e, p.id)}
                className="cursor-pointer"
              >
                <circle
                  cx={toSvgX(p.x)}
                  cy={toSvgY(p.y)}
                  r="9"
                  fill="transparent"
                />
                <circle
                  cx={toSvgX(p.x)}
                  cy={toSvgY(p.y)}
                  r="5"
                  fill="#09090B"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <title>{`(${p.x}, ${p.y}) — click to remove`}</title>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
          <span>Click grid to add point · Click dot to remove</span>
          <div className="flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-zinc-700">
              <input
                type="checkbox"
                checked={showResiduals}
                onChange={(e) => setShowResiduals(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-zinc-300 accent-[#2563EB]"
              />
              <span>Show residuals</span>
            </label>
            <button
              type="button"
              onClick={() => handlePresetChange(activePreset)}
              className="inline-flex items-center gap-1 font-medium text-zinc-700 hover:text-zinc-950 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Computed Metrics Row */}
      <div className="grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4">
        <div>
          <p className="text-xs text-zinc-500">Best-Fit Equation</p>
          <p className="mt-1 font-mono text-sm font-medium text-zinc-950 tabular-nums">
            y = {safeSlope.toFixed(2)}x {sign} {Math.abs(safeIntercept).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Mean Squared Error</p>
          <p className="mt-1 font-mono text-sm font-medium text-zinc-950 tabular-nums">
            {stats.mse.toFixed(3)}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">R² Fit Score</p>
          <p className="mt-1 font-mono text-sm font-medium text-[#2563EB] tabular-nums">
            {stats.r2.toFixed(3)}
          </p>
        </div>
      </div>
    </div>
  );
}
