"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  Edit3,
  Flame,
  Medal,
  Ruler,
  Scale,
  Target,
  TrendingDown,
  Trophy,
  Zap,
} from "lucide-react";
import {
  useFoodLog,
  useProfile,
  useWeights,
  type Profile,
} from "@/lib/store";
import { Badge, Button, Field, ProgressBar, SectionHeading, Skeleton } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const goalLabels: Record<Profile["goal"], string> = {
  seche: "Sèche",
  maintien: "Maintien",
  masse: "Prise de masse",
};

function EditProfileForm({
  profile,
  onSave,
  onCancel,
}: {
  profile: Profile;
  onSave: (p: Profile) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<Profile>(profile);
  const num = (v: string) => Math.max(0, Number(v) || 0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
      className="space-y-4"
    >
      <Field label="Prénom / pseudo" htmlFor="p-name">
        <input
          id="p-name"
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          className="field"
          required
        />
      </Field>
      <Field label="Objectif">
        <div className="flex gap-2">
          {(Object.keys(goalLabels) as Profile["goal"][]).map((g) => (
            <button
              key={g}
              type="button"
              data-active={draft.goal === g}
              onClick={() => setDraft({ ...draft, goal: g })}
              className="chip"
            >
              {goalLabels[g]}
            </button>
          ))}
        </div>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Poids cible (kg)" htmlFor="p-weight">
          <input
            id="p-weight"
            type="number"
            step="0.1"
            value={draft.targetWeight}
            onChange={(e) => setDraft({ ...draft, targetWeight: num(e.target.value) })}
            className="field"
          />
        </Field>
        <Field label="Taille (cm)" htmlFor="p-height">
          <input
            id="p-height"
            type="number"
            value={draft.height}
            onChange={(e) => setDraft({ ...draft, height: num(e.target.value) })}
            className="field"
          />
        </Field>
        <Field label="Calories cibles" htmlFor="p-kcal">
          <input
            id="p-kcal"
            type="number"
            value={draft.targetKcal}
            onChange={(e) => setDraft({ ...draft, targetKcal: num(e.target.value) })}
            className="field"
          />
        </Field>
        <Field label="Protéines cibles (g)" htmlFor="p-prot">
          <input
            id="p-prot"
            type="number"
            value={draft.targetProtein}
            onChange={(e) => setDraft({ ...draft, targetProtein: num(e.target.value) })}
            className="field"
          />
        </Field>
        <Field label="Glucides cibles (g)" htmlFor="p-carbs">
          <input
            id="p-carbs"
            type="number"
            value={draft.targetCarbs}
            onChange={(e) => setDraft({ ...draft, targetCarbs: num(e.target.value) })}
            className="field"
          />
        </Field>
        <Field label="Lipides cibles (g)" htmlFor="p-fat">
          <input
            id="p-fat"
            type="number"
            value={draft.targetFat}
            onChange={(e) => setDraft({ ...draft, targetFat: num(e.target.value) })}
            className="field"
          />
        </Field>
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">Enregistrer</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
}

export function ProfileContent() {
  const [profile, setProfile, profileReady] = useProfile();
  const [weights, , weightsReady] = useWeights();
  const [log, , logReady] = useFoodLog();
  const [editing, setEditing] = useState(false);

  const sorted = useMemo(
    () => weights.slice().sort((a, b) => a.date.localeCompare(b.date)),
    [weights]
  );
  const currentWeight = sorted.length ? sorted[sorted.length - 1].weight : null;
  const startWeight = sorted.length ? sorted[0].weight : null;
  const delta =
    currentWeight !== null && startWeight !== null
      ? Math.round((currentWeight - startWeight) * 10) / 10
      : 0;

  const trackedDays = useMemo(() => new Set(log.map((e) => e.date)).size, [log]);
  const totalMeals = log.length;

  const toGoal =
    currentWeight !== null
      ? Math.round(Math.abs(currentWeight - profile.targetWeight) * 10) / 10
      : null;

  /* Progression vers le poids cible (part du poids de départ) */
  const goalProgress = useMemo(() => {
    if (currentWeight === null || startWeight === null) return 0;
    const total = Math.abs(startWeight - profile.targetWeight);
    if (total === 0) return 100;
    const done = Math.abs(startWeight - currentWeight);
    return Math.min(100, Math.round((done / total) * 100));
  }, [currentWeight, startWeight, profile.targetWeight]);

  const badges = useMemo(
    () => [
      {
        icon: Zap,
        title: "Premier pas",
        description: "Créer son profil ProEat",
        earned: true,
      },
      {
        icon: Flame,
        title: "Régularité",
        description: "Tracker ses repas 7 jours",
        earned: trackedDays >= 7,
      },
      {
        icon: Scale,
        title: "Pesée assidue",
        description: "Enregistrer 5 pesées",
        earned: weights.length >= 5,
      },
      {
        icon: TrendingDown,
        title: "Momentum",
        description: "Progresser vers son objectif",
        earned: goalProgress >= 25,
      },
      {
        icon: Medal,
        title: "Mi-parcours",
        description: "Atteindre 50 % de l'objectif",
        earned: goalProgress >= 50,
      },
      {
        icon: Trophy,
        title: "Objectif atteint",
        description: "Atteindre son poids cible",
        earned: toGoal !== null && toGoal <= 0.5,
      },
    ],
    [trackedDays, weights.length, goalProgress, toGoal]
  );

  const earnedCount = badges.filter((b) => b.earned).length;
  const ready = profileReady && weightsReady && logReady;

  const memberSince = new Date(profile.memberSince).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          align="left"
          eyebrow="Espace membre"
          title="Votre profil"
          description="Vos objectifs, votre progression et vos récompenses, au même endroit."
        />
      </Reveal>

      {!ready ? (
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl lg:col-span-2" />
        </div>
      ) : (
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* -------- Carte identité -------- */}
          <Reveal>
            <div className="card p-7 text-center">
              <div className="relative mx-auto h-24 w-24">
                <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-leaf-deep to-leaf font-display text-3xl font-semibold text-white dark:from-leaf dark:to-leaf-mid dark:text-[#08130d]">
                  {profile.name.trim().charAt(0).toUpperCase() || "P"}
                </div>
                <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-card bg-gold text-white">
                  <Award className="h-4 w-4" />
                </span>
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-ink">
                {profile.name}
              </h2>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-muted">
                <Calendar className="h-3.5 w-3.5" />
                Membre depuis {memberSince}
              </p>
              <div className="mt-3 flex justify-center">
                <Badge tone="leaf">
                  <Target className="h-3 w-3" />
                  Objectif : {goalLabels[profile.goal]}
                </Badge>
              </div>
              <div className="mt-6 grid grid-cols-3 divide-x divide-line border-t border-line pt-5 text-center">
                <div>
                  <p className="text-lg font-bold text-ink">{currentWeight ?? "—"}</p>
                  <p className="text-[11px] text-muted">kg actuel</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-ink">{profile.targetWeight}</p>
                  <p className="text-[11px] text-muted">kg cible</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-ink">{profile.height}</p>
                  <p className="text-[11px] text-muted">cm</p>
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => setEditing(!editing)}
                className="mt-6 w-full"
              >
                <Edit3 className="h-4 w-4" />
                {editing ? "Fermer" : "Modifier mon profil"}
              </Button>
            </div>
          </Reveal>

          {/* -------- Progression + stats -------- */}
          <div className="space-y-6 lg:col-span-2">
            {editing ? (
              <Reveal>
                <div className="card p-7">
                  <h3 className="mb-5 font-semibold text-ink">Modifier mes informations</h3>
                  <EditProfileForm
                    profile={profile}
                    onSave={(p) => {
                      setProfile(p);
                      setEditing(false);
                    }}
                    onCancel={() => setEditing(false)}
                  />
                </div>
              </Reveal>
            ) : (
              <>
                <Reveal>
                  <div className="card p-7">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-ink">
                        Progression vers l’objectif
                      </h3>
                      <span className="text-2xl font-bold text-leaf">{goalProgress}%</span>
                    </div>
                    <div className="mt-4">
                      <ProgressBar value={goalProgress} max={100} />
                    </div>
                    <p className="mt-3 text-sm text-muted">
                      {delta !== 0 && (
                        <>
                          <span className={`font-semibold ${delta < 0 ? "text-leaf" : "text-ink"}`}>
                            {delta > 0 ? "+" : ""}
                            {delta} kg
                          </span>{" "}
                          depuis le début ·{" "}
                        </>
                      )}
                      {toGoal !== null && toGoal > 0.5
                        ? `plus que ${toGoal} kg avant votre poids cible.`
                        : "objectif atteint, bravo !"}
                    </p>
                  </div>
                </Reveal>

                <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {(
                    [
                      [Flame, `${trackedDays}`, "jours trackés"],
                      [Ruler, `${totalMeals}`, "repas enregistrés"],
                      [Scale, `${weights.length}`, "pesées"],
                      [Award, `${earnedCount}/${badges.length}`, "badges obtenus"],
                    ] as const
                  ).map(([Icon, value, label]) => (
                    <StaggerItem key={label}>
                      <div className="card p-5 text-center">
                        <Icon className="mx-auto h-5 w-5 text-leaf" />
                        <p className="mt-2 text-xl font-bold text-ink">{value}</p>
                        <p className="text-xs text-muted">{label}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>

                {/* -------- Historique -------- */}
                <Reveal>
                  <div className="card p-7">
                    <h3 className="font-semibold text-ink">Historique de poids</h3>
                    <ul className="mt-4 max-h-64 space-y-2 overflow-y-auto pr-1">
                      {sorted
                        .slice()
                        .reverse()
                        .map((w, i, arr) => {
                          const prev = arr[i + 1];
                          const diff = prev
                            ? Math.round((w.weight - prev.weight) * 10) / 10
                            : 0;
                          return (
                            <li
                              key={w.date}
                              className="flex items-center justify-between rounded-xl border border-line px-4 py-2.5 text-sm"
                            >
                              <span className="text-muted">
                                {new Date(w.date + "T12:00:00").toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-3">
                                {prev && diff !== 0 && (
                                  <span
                                    className={`text-xs font-medium ${
                                      diff < 0 ? "text-leaf" : "text-muted"
                                    }`}
                                  >
                                    {diff > 0 ? "+" : ""}
                                    {diff} kg
                                  </span>
                                )}
                                <span className="font-semibold text-ink">{w.weight} kg</span>
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </Reveal>
              </>
            )}
          </div>

          {/* -------- Badges -------- */}
          <Reveal className="lg:col-span-3">
            <div className="card p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-ink">Badges</h3>
                <Badge tone="gold">
                  {earnedCount} / {badges.length} débloqués
                </Badge>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {badges.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`rounded-2xl border p-4 text-center transition-all ${
                      b.earned
                        ? "border-gold/40 bg-gold/10"
                        : "border-line opacity-45 grayscale"
                    }`}
                  >
                    <div
                      className={`mx-auto grid h-11 w-11 place-items-center rounded-full ${
                        b.earned ? "bg-gold text-white" : "bg-sand text-muted"
                      }`}
                    >
                      <b.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-2.5 text-xs font-semibold text-ink">{b.title}</p>
                    <p className="mt-0.5 text-[10px] leading-tight text-muted">
                      {b.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
