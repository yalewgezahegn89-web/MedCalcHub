"use client";

import { useState } from "react";
import {
AlertTriangle,
CheckCircle2,
Clipboard,
Printer,
Share2,
Check,
} from "lucide-react";

import { generateCalculatorReport } from "@/lib/pdf/generate-report";

type ResultCardProps = {
label: string;
value: string | number;
unit?: string;
interpretation?: string;
status?: "low" | "normal" | "high" | "critical";
};

export default function ResultCard({
label,
value,
unit,
interpretation,
status = "normal",
}: ResultCardProps) {
const [copied, setCopied] = useState(false);

const badge = {
low: {
color:
"bg-blue-100 text-blue-700 border-blue-200",
icon: <AlertTriangle className="h-4 w-4" />,
label: "Low",
},
normal: {
color:
"bg-emerald-100 text-emerald-700 border-emerald-200",
icon: <CheckCircle2 className="h-4 w-4" />,
label: "Normal",
},
high: {
color:
"bg-amber-100 text-amber-700 border-amber-200",
icon: <AlertTriangle className="h-4 w-4" />,
label: "High",
},
critical: {
color:
"bg-red-100 text-red-700 border-red-200",
icon: <AlertTriangle className="h-4 w-4" />,
label: "Critical",
},
}[status];

async function copyResult() {
await navigator.clipboard.writeText(
`${label}

Result: ${value}${unit ? ` ${unit}` : ""}

${interpretation ?? ""}`,
);

setCopied(true);

setTimeout(() => {
setCopied(false);
}, 2000);
}

function exportPdf() {
generateCalculatorReport({
calculator: label,
result: String(value),
unit,
interpretation,
});
}

function printResult() {
window.print();
}

async function shareResult() {
const text = `${label}

Result: ${value}${unit ? ` ${unit}` : ""}

${interpretation ?? ""}`;

if (navigator.share) {
await navigator.share({
title: label,
text,
});
} else {
await navigator.clipboard.writeText(text);
setCopied(true);

setTimeout(() => {
setCopied(false);
}, 2000);
}
}

return (
<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

<div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-6 text-white">
<h2 className="text-lg font-semibold">
{label}
</h2>

<div className="mt-4 text-5xl font-bold">
{value}

{unit && (
<span className="ml-2 text-xl font-medium opacity-80">
{unit}
</span>
)}
</div>
</div>

<div className="space-y-6 p-8">

<div
className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${badge.color}`}
>
{badge.icon}
{badge.label}
</div>

{interpretation && (
<div>
<h3 className="font-semibold">
Interpretation
</h3>

<p className="mt-2 text-slate-600">
{interpretation}
</p>
</div>
)}

<div className="flex flex-wrap gap-3 pt-4">

<button
onClick={copyResult}
className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-50"
>
{copied ? (
<>
<Check className="h-4 w-4 text-green-600" />
Copied
</>
) : (
<>
<Clipboard className="h-4 w-4" />
Copy
</>
)}
</button>

<button
onClick={shareResult}
className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-50"
>
<Share2 className="h-4 w-4" />
Share
</button>

<button
onClick={printResult}
className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-50"
>
<Printer className="h-4 w-4" />
Print
</button>

<button
onClick={exportPdf}
className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-50"
>
<Printer className="h-4 w-4" />
PDF
</button>

</div>

</div>

</div>
);
}