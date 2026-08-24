/**
 * Decorative medical-tech background for the homepage hero region.
 *
 * Purely presentational inline SVG: faint ECG trace (left), molecular
 * network nodes (upper corners), an abstract anatomical line-art torso
 * (right), a DNA-helix-inspired double curve (far right) and a few
 * soft medical plus marks. Static geometry only — no animation, no
 * network requests, no raster assets.
 *
 * Intensity is kept at roughly 3–10%: low-alpha strokes plus a radial
 * mask that dissolves the artwork behind the centered hero content.
 * The component is server-renderable and fully decorative.
 */
export function MedicalTechBackground() {
  return (
    <div
      data-testid="medical-tech-background"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 isolate select-none overflow-hidden opacity-90 dark:opacity-70"
    >
      {/* Desktop / tablet artwork */}
      <svg
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMin meet"
        className="hidden h-auto w-full md:block [mask-image:radial-gradient(ellipse_115%_92%_at_50%_36%,_transparent_34%,_black_78%)] [-webkit-mask-image:radial-gradient(ellipse_115%_92%_at_50%_36%,_transparent_34%,_black_78%)]"
      >
        {/* ECG waveform — left side */}
        <g
          className="text-sky-600/20 dark:text-sky-400/15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M-20 340 H96 L104 322 L112 340 H168 C176 340 178 328 186 328 C194 328 196 340 204 340 H252 L260 350 L272 258 L286 398 L298 306 L304 340 H420 L428 322 L436 340 H492 C500 340 502 328 510 328 C518 328 520 340 528 340 H576 L584 350 L596 258 L610 398 L622 306 L628 340 H780" />
        </g>
        <g
          className="text-slate-400/15 dark:text-slate-500/15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M-20 340 H96 L104 322 L112 340 H168 C176 340 178 328 186 328 C194 328 196 340 204 340 H252 L260 350 L272 258 L286 398 L298 306 L304 340 H420 L428 322 L436 340 H492 C500 340 502 328 510 328 C518 328 520 340 528 340 H576 L584 350 L596 258 L610 398 L622 306 L628 340 H780"
            transform="translate(0 46)"
            strokeDasharray="2 7"
          />
        </g>

        {/* Molecular network — upper left */}
        <g
          className="text-indigo-500/15 dark:text-indigo-400/10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path
            strokeWidth="1"
            d="M90 70 L150 40 L215 75 L255 135 L180 150 L115 125 Z M150 40 L180 150 M215 75 L180 150 M90 70 L215 75"
          />
          <path
            strokeWidth="1"
            d="M334 95 L317 124 L283 124 L266 95 L283 66 L317 66 Z"
          />
          <circle cx="90" cy="70" r="4" />
          <circle cx="150" cy="40" r="5" fill="currentColor" stroke="none" />
          <circle cx="215" cy="75" r="3.5" />
          <circle cx="255" cy="135" r="5.5" />
          <circle cx="180" cy="150" r="3" fill="currentColor" stroke="none" />
          <circle cx="115" cy="125" r="4" />
        </g>

        {/* Molecular network — upper right */}
        <g
          className="text-indigo-500/15 dark:text-indigo-400/10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path
            strokeWidth="1"
            d="M1130 60 L1190 38 L1250 70 L1275 130 L1210 145 L1160 120 Z M1190 38 L1210 145 M1130 60 L1250 70"
          />
          <path
            strokeWidth="1"
            d="M1109 105 L1095 129 L1067 129 L1053 105 L1067 81 L1095 81 Z"
          />
          <circle cx="1190" cy="38" r="4.5" />
          <circle cx="1275" cy="130" r="5" fill="currentColor" stroke="none" />
          <circle cx="1210" cy="145" r="3" />
          <circle cx="1160" cy="120" r="4" fill="currentColor" stroke="none" />
        </g>

        {/* Anatomical line-art impression — right side */}
        <g
          className="text-slate-500/12 dark:text-slate-400/[0.08]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        >
          <circle cx="1165" cy="150" r="46" />
          <path d="M1085 235 Q1165 203 1245 235" />
          <path d="M1085 235 L1068 340 L1075 620" />
          <path d="M1245 235 L1262 340 L1255 620" />
          <path
            d="M1165 236 V616"
            strokeDasharray="4 9"
          />
          <path d="M1160 288 Q1080 300 1068 344" />
          <path d="M1160 332 Q1084 344 1072 388" />
          <path d="M1160 376 Q1088 388 1076 432" />
          <path d="M1170 288 Q1250 300 1262 344" />
          <path d="M1170 332 Q1246 344 1258 388" />
          <path d="M1170 376 Q1242 388 1254 432" />
          <path d="M1076 476 Q1165 436 1254 476" />
          <path d="M1128 320 c-6 -11 -23 -9 -23 6 c0 13 15 21 23 31 c8 -10 23 -18 23 -31 c0 -15 -17 -17 -23 -6" />
        </g>

        {/* DNA-helix-inspired curves — far right */}
        <g
          className="text-blue-600/15 dark:text-blue-300/10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M1395 30 C1352 130, 1438 220, 1395 310 C1352 400, 1438 490, 1395 590" />
          <path d="M1395 30 C1438 130, 1352 220, 1395 310 C1438 400, 1352 490, 1395 590" />
          <path strokeWidth="1" d="M1388 96 H1402" />
          <path strokeWidth="1" d="M1368 152 H1422" />
          <path strokeWidth="1" d="M1374 206 H1416" />
          <path strokeWidth="1" d="M1387 262 H1403" />
          <path strokeWidth="1" d="M1387 358 H1403" />
          <path strokeWidth="1" d="M1368 414 H1422" />
          <path strokeWidth="1" d="M1374 468 H1416" />
          <path strokeWidth="1" d="M1388 524 H1402" />
        </g>

        {/* Soft medical plus symbols */}
        <g
          className="text-blue-500/15 dark:text-blue-400/10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M711 86 h18 m-9 -9 v18" />
          <path d="M854 176 h12 m-6 -6 v12" />
          <path d="M614 214 h10 m-5 -5 v10" />
          <path d="M974 118 h14 m-7 -7 v14" />
          <path d="M234 466 h16 m-8 -8 v16" />
          <path d="M694 470 h12 m-6 -6 v12" />
        </g>
      </svg>

      {/* Simplified mobile artwork */}
      <svg
        viewBox="0 0 400 360"
        preserveAspectRatio="xMidYMin meet"
        className="h-auto w-full opacity-70 md:hidden [mask-image:radial-gradient(ellipse_130%_95%_at_50%_30%,_transparent_30%,_black_80%)] [-webkit-mask-image:radial-gradient(ellipse_130%_95%_at_50%_30%,_transparent_30%,_black_80%)]"
      >
        <g
          className="text-sky-600/20 dark:text-sky-400/15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M-10 150 H58 L66 136 L74 150 H118 L126 158 L136 94 L146 194 L154 132 L158 150 H232 L240 136 L248 150 H310" />
        </g>

        <g
          className="text-indigo-500/15 dark:text-indigo-400/10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path
            strokeWidth="1"
            d="M298 62 L342 42 L372 84 L332 102 Z M342 42 L332 102"
          />
          <circle cx="298" cy="62" r="3.5" />
          <circle cx="372" cy="84" r="4.5" fill="currentColor" stroke="none" />
        </g>

        <g
          className="text-blue-500/15 dark:text-blue-400/10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M54 268 h16 m-8 -8 v16" />
          <path d="M330 246 h12 m-6 -6 v12" />
        </g>
      </svg>
    </div>
  );
}
