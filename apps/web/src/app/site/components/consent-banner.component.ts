import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AnalyticsService } from "../services/analytics.service";

@Component({
  selector: "app-consent-banner",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside
      *ngIf="visible"
      class="consent-banner"
      role="region"
      aria-label="Configuración de cookies y medición"
    >
      <p>
        Usamos medición anónima de visitas para mejorar el sitio.
        Las cookies analíticas solo se cargan si aceptas.
      </p>
      <div class="consent-banner__actions">
        <button
          class="button button-primary consent-banner__button"
          type="button"
          (click)="decide('granted')"
        >
          Aceptar
        </button>
        <button
          class="button button-ghost consent-banner__button"
          type="button"
          (click)="decide('denied')"
        >
          Solo necesarias
        </button>
      </div>
      <a class="consent-banner__link" routerLink="/cookies">Política de cookies</a>
    </aside>
  `,
})
export class ConsentBannerComponent implements OnInit {
  visible = false;

  constructor(
    private readonly analytics: AnalyticsService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.analytics.bootstrap();
    this.visible = this.analytics.hasConsent() === null && this.analytics.isEnabled();
  }

  decide(decision: "granted" | "denied"): void {
    this.analytics.grantConsent(decision);
    this.visible = false;
  }
}
