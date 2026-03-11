import { enableProdMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

import { AppComponent } from "./app/app.component";
import { config } from "./app/app.config.browser";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

function showConsoleGreeting(): void {
  if (!environment.production || typeof window === "undefined") {
    return;
  }

  console.log(
    "%cELECTRORIA%cSSR",
    "background: #101a2e; color: #f5f7fb; padding: 8px 12px; border: 1px solid #1c5eff; border-right: 0; border-radius: 999px 0 0 999px; font: 700 12px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; letter-spacing: 0.18em;",
    "background: #fff3d1; color: #101a2e; padding: 8px 12px; border: 1px solid #e0a100; border-left: 0; border-radius: 0 999px 999px 0; font: 700 12px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; letter-spacing: 0.18em;"
  );
  console.log(
    "%cInstalaciones electricas, cuadros a medida y mantenimiento con base SSR preparada para crecer.",
    "color: #101a2e; font: 700 16px/1.45 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; margin-top: 8px;"
  );
  console.log(
    "%cSi estas revisando esto, probablemente estas auditando la nueva base publica de Electroria.",
    "color: #51607a; font: 600 12px/1.6 'Manrope', ui-sans-serif, system-ui, sans-serif;"
  );

  if (typeof console.table === "function") {
    console.table([
      {
        perfil: "Servicio",
        encaje: "Instalaciones, cuadros, mantenimiento, automatizacion y urgencias",
        acceso: "https://electroria.com/contacto",
      },
      {
        perfil: "Contacto",
        encaje: "Presupuestos y revisiones tecnicas",
        acceso: "oficina@electroria.com / 682 04 78 02",
      },
    ]);
  }

  console.log(
    "%cLa web publica consume Talkaris en white-label y queda lista para publicar blog desde Auctorio.",
    "color: #1c5eff; font: 600 12px/1.6 'Manrope', ui-sans-serif, system-ui, sans-serif;"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  bootstrapApplication(AppComponent, config)
    .then(() => showConsoleGreeting())
    .catch((err) => console.error(err));
});
