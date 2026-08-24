/**
 * Decorative medical-tech background for the homepage hero region.
 *
 * Purely presentational inline SVG: ECG waveform (left), molecular
 * network nodes (upper corners), anatomical line-art torso (right),
 * DNA double-helix (far right) and medical plus marks. Static
 * geometry only — no animation, no network requests, no raster assets.
 *
 * Intensity targets ~25–40% effective visual presence. The radial mask
 * keeps the center clean for hero readability. The component is
 * server-renderable and fully decorative.
 */
export function MedicalTechBackground() {
  return (
    <div
      data-testid="medical-tech-background"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 isolate select-none overflow-hidden opacity-100 dark:opacity-90"
    >
      {/* Desktop / tablet artwork */}
      <svg
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMin meet"
        className="hidden h-auto w-full md:block [mask-image:radial-gradient(ellipse_120%_95%_at_50%_38%,_transparent_14%,_black_73%)] [-webkit-mask-image:radial-gradient(ellipse_120%_95%_at_50%_38%,_transparent_14%,_black_73%)]"
      >
        {/* ECG waveform — left side */}
        <g
          className="text-sky-600/50 dark:text-sky-400/30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M-40 340 H96 L104 322 L112 340 H168 C176 340 178 328 186 328 C194 328 196 340 204 340 H252 L260 350 L272 258 L286 398 L298 306 L304 340 H420 L428 322 L436 340 H492 C500 340 502 328 510 328 C518 328 520 340 528 340 H576 L584 350 L596 258 L610 398 L622 306 L628 340 H780 L788 322 L796 340 H860 C868 340 870 328 878 328 C886 328 888 340 896 340 H950" />
        </g>
        <g
          className="text-sky-500/30 dark:text-sky-400/18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M-40 340 H96 L104 322 L112 340 H168 C176 340 178 328 186 328 C194 328 196 340 204 340 H252 L260 350 L272 258 L286 398 L298 306 L304 340 H420 L428 322 L436 340 H492 C500 340 502 328 510 328 C518 328 520 340 528 340 H576 L584 350 L596 258 L610 398 L622 306 L628 340 H780 L788 322 L796 340 H860 C868 340 870 328 878 328 C886 328 888 340 896 340 H950"
            transform="translate(0 42)"
            strokeDasharray="2 6"
          />
        </g>

        {/* Molecular network — upper left */}
        <g
          className="text-indigo-500/42 dark:text-indigo-400/26"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path
            strokeWidth="1.2"
            d="M90 70 L150 40 L215 75 L255 135 L180 150 L115 125 Z M150 40 L180 150 M215 75 L180 150 M90 70 L215 75"
          />
          <path
            strokeWidth="1.2"
            d="M334 95 L317 124 L283 124 L266 95 L283 66 L317 66 Z"
          />
          <circle cx="90" cy="70" r="5" />
          <circle cx="150" cy="40" r="6" fill="currentColor" stroke="none" />
          <circle cx="215" cy="75" r="4.5" />
          <circle cx="255" cy="135" r="6.5" />
          <circle cx="180" cy="150" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="115" cy="125" r="5" />
          <circle cx="266" cy="95" r="3" />
          <circle cx="317" cy="66" r="3" />
        </g>

        {/* Molecular network — upper right */}
        <g
          className="text-indigo-500/42 dark:text-indigo-400/26"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path
            strokeWidth="1.2"
            d="M1130 60 L1190 38 L1250 70 L1275 130 L1210 145 L1160 120 Z M1190 38 L1210 145 M1130 60 L1250 70"
          />
          <path
            strokeWidth="1.2"
            d="M1109 105 L1095 129 L1067 129 L1053 105 L1067 81 L1095 81 Z"
          />
          <circle cx="1190" cy="38" r="5.5" />
          <circle cx="1275" cy="130" r="6" fill="currentColor" stroke="none" />
          <circle cx="1210" cy="145" r="3.5" />
          <circle cx="1160" cy="120" r="5" fill="currentColor" stroke="none" />
          <circle cx="1053" cy="105" r="3" />
          <circle cx="1095" cy="81" r="3" />
        </g>

        {/* Anatomical line-art — right side */}
        <g
          className="text-slate-500/32 dark:text-slate-400/20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        >
          {/* Head */}
          <circle cx="1165" cy="150" r="48" />
          {/* Shoulders */}
          <path d="M1085 235 Q1165 200 1245 235" />
          {/* Torso sides */}
          <path d="M1085 235 L1068 340 L1075 620" />
          <path d="M1245 235 L1262 340 L1255 620" />
          {/* Central sternum */}
          <path
            d="M1165 236 V616"
            strokeDasharray="4 8"
          />
          {/* Rib arcs left */}
          <path d="M1160 272 Q1076 286 1064 332" />
          <path d="M1160 308 Q1080 322 1068 368" />
          <path d="M1160 344 Q1084 358 1072 404" />
          <path d="M1160 380 Q1088 394 1076 440" />
          {/* Rib arcs right */}
          <path d="M1170 272 Q1254 286 1266 332" />
          <path d="M1170 308 Q1250 322 1262 368" />
          <path d="M1170 344 Q1246 358 1258 404" />
          <path d="M1170 380 Q1242 394 1254 440" />
          {/* Diaphragm curve */}
          <path d="M1076 476 Q1165 430 1254 476" />
          {/* Heart outline */}
          <path d="M1128 320 c-6 -12 -24 -10 -24 5 c0 14 16 22 24 32 c8 -10 24 -18 24 -32 c0 -15 -18 -17 -24 -5" />
          {/* Pelvis hint */}
          <path d="M1100 520 Q1165 540 1230 520" />
        </g>

        {/* DNA-helix — far right */}
        <g
          className="text-blue-600/42 dark:text-blue-300/28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {/* Double helix strands */}
          <path d="M1395 20 C1348 130, 1442 220, 1395 320 C1348 420, 1442 510, 1395 600" />
          <path d="M1395 20 C1442 130, 1348 220, 1395 320 C1348 420, 1442 510, 1395 600" />
          {/* Connecting rungs */}
          <path strokeWidth="1.2" d="M1384 80 H1406" />
          <path strokeWidth="1.2" d="M1362 140 H1428" />
          <path strokeWidth="1.2" d="M1370 200 H1420" />
          <path strokeWidth="1.2" d="M1384 260 H1406" />
          <path strokeWidth="1.2" d="M1384 360 H1406" />
          <path strokeWidth="1.2" d="M1362 420 H1428" />
          <path strokeWidth="1.2" d="M1370 480 H1420" />
          <path strokeWidth="1.2" d="M1384 540 H1406" />
          {/* Cross-rungs for depth */}
          <path strokeWidth="0.8" d="M1390 110 L1400 110" />
          <path strokeWidth="0.8" d="M1376 170 L1414 170" />
          <path strokeWidth="0.8" d="M1378 230 L1412 230" />
          <path strokeWidth="0.8" d="M1390 290 L1400 290" />
          <path strokeWidth="0.8" d="M1390 390 L1400 390" />
          <path strokeWidth="0.8" d="M1376 450 L1414 450" />
          <path strokeWidth="0.8" d="M1378 510 L1412 510" />
          <path strokeWidth="0.8" d="M1390 570 L1400 570" />
        </g>

        {/* Medical plus symbols */}
        <g
          className="text-blue-500/36 dark:text-blue-400/24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M711 86 h18 m-9 -9 v18" />
          <path d="M854 176 h14 m-7 -7 v14" />
          <path d="M614 214 h12 m-6 -6 v12" />
          <path d="M974 118 h16 m-8 -8 v16" />
          <path d="M234 466 h18 m-9 -9 v18" />
          <path d="M694 470 h14 m-7 -7 v14" />
        </g>
      </svg>

      {/* Simplified mobile artwork */}
      <svg
        viewBox="0 0 400 360"
        preserveAspectRatio="xMidYMin meet"
        className="h-auto w-full opacity-85 md:hidden [mask-image:radial-gradient(ellipse_130%_95%_at_50%_30%,_transparent_24%,_black_80%)] [-webkit-mask-image:radial-gradient(ellipse_130%_95%_at_50%_30%,_transparent_24%,_black_80%)]"
      >
        {/* ECG waveform */}
        <g
          className="text-sky-600/38 dark:text-sky-400/24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M-10 150 H58 L66 136 L74 150 H118 L126 158 L136 94 L146 194 L154 132 L158 150 H232 L240 136 L248 150 H310 L318 136 L326 150 H380" />
        </g>

        {/* Molecular network */}
        <g
          className="text-indigo-500/32 dark:text-indigo-400/20"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path
            strokeWidth="1.2"
            d="M298 62 L342 42 L372 84 L332 102 Z M342 42 L332 102"
          />
          <circle cx="298" cy="62" r="4" />
          <circle cx="372" cy="84" r="5" fill="currentColor" stroke="none" />
        </g>

        {/* Medical plus symbols */}
        <g
          className="text-blue-500/28 dark:text-blue-400/18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M54 268 h18 m-9 -9 v18" />
          <path d="M330 246 h14 m-7 -7 v14" />
        </g>
      </svg>
    </div>
  );
}
