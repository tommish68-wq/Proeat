"use client";

import { Play, Sparkles } from "lucide-react";
import { getGuide, hasGuide } from "@/lib/exercise-guides";

/* ------------------------------------------------------------------ */
/* MediaSlot — emplacement démo visuelle (GIF / vidéo / schéma).       */
/* Aujourd'hui : placeholder propre à la charte. Demain : passez src   */
/* et le média se branche sans toucher au reste.                       */
/* ------------------------------------------------------------------ */

export function MediaSlot({ src, alt = "" }: { src?: string; alt?: string }) {
  if (src) {
    return src.endsWith(".mp4") || src.endsWith(".webm") ? (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="aspect-video w-full rounded-2xl object-cover"
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="aspect-video w-full rounded-2xl object-cover"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="grid aspect-video w-full place-items-center rounded-2xl border-2 border-dashed border-leaf/30 bg-leaf-faint"
    >
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-leaf-deep text-white">
          <Play className="ml-0.5 h-5 w-5" />
        </span>
        <p className="mt-2.5 font-tech text-[11px] uppercase tracking-[0.14em] text-muted">
          Démo vidéo — bientôt
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ExerciseDemo — la fiche « comment faire » : média + étapes + coach  */
/* ------------------------------------------------------------------ */

export function ExerciseDemo({
  name,
  mediaSrc,
  compact = false,
}: {
  name: string;
  mediaSrc?: string;
  compact?: boolean;
}) {
  const guide = getGuide(name);
  const generic = !hasGuide(name);

  return (
    <div className={compact ? "space-y-4" : "space-y-4 rounded-2xl bg-sand/50 p-5"}>
      <MediaSlot src={mediaSrc} alt={`Démonstration : ${name}`} />

      {generic && (
        <p className="text-xs text-muted">
          Fiche dédiée à venir pour cet exercice — en attendant, les
          fondamentaux qui marchent partout :
        </p>
      )}

      <ol className="space-y-2">
        {guide.steps.map((step, i) => (
          <li key={step} className="flex gap-2.5 text-sm leading-relaxed text-ink">
            <span className="grid h-5 w-5 shrink-0 translate-y-0.5 place-items-center rounded-full bg-leaf-soft text-[11px] font-bold text-leaf">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      {/* Le conseil du coach — même langage visuel que les astuces du chef */}
      <p className="flex items-start gap-2 rounded-xl bg-gold/10 px-3.5 py-2.5 text-sm leading-relaxed text-[#7c5a33]">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          <span className="font-semibold">Conseil du coach : </span>
          {guide.coachTip}
        </span>
      </p>
    </div>
  );
}
