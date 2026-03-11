import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-not-found-page",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="section">
      <div class="site-container surface-card">
        <span class="eyebrow">404</span>
        <h1>Esta página no existe o ha sido redirigida.</h1>
        <p class="lead">
          La nueva base de Electroria corrige varias rutas rotas del sitio
          anterior. Si no encuentras lo que buscabas, usa los accesos
          principales.
        </p>
        <div class="hero-actions">
          <a class="button button-primary" routerLink="/">Ir al inicio</a>
          <a class="button button-secondary" routerLink="/servicios">Ver servicios</a>
          <a class="button button-secondary" routerLink="/contacto">Contactar</a>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundPageComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: "404 | Página no encontrada",
      description: "La URL solicitada no existe o ya no está disponible en la nueva web de Electroria.",
      path: "/404",
      noIndex: true,
    });
  }
}
