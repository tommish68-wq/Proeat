import Link from "next/link";
import { Logo } from "@/components/logo";

const columns = [
  {
    title: "Plateforme",
    links: [
      { href: "/dashboard", label: "Tableau de bord" },
      { href: "/calculateur", label: "Calculateur de métabolisme" },
      { href: "/programme", label: "Générateur de programme" },
      { href: "/tracker", label: "Tracker de calories" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "/recettes", label: "Recettes" },
      { href: "/premium", label: "ProEat Premium" },
      { href: "/profil", label: "Espace membre" },
      { href: "/boutique", label: "Boutique", soon: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              La plateforme tout-en-un pour la nutrition, la musculation et la
              remise en forme. La performance, naturellement.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-leaf"
                    >
                      {link.label}
                      {"soon" in link && link.soon && (
                        <span className="ml-2 rounded-full bg-sand px-2 py-0.5 text-[10px] font-medium text-muted">
                          Bientôt
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} ProEat. Tous droits réservés.
          </p>
          <p className="text-xs text-muted">
            Discipline · Santé · Progression
          </p>
        </div>
      </div>
    </footer>
  );
}
