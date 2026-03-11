import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  footerLinks,
  legalLinks,
  services,
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE_ALT_LABEL,
  SITE_PHONE_ALT,
  SITE_PHONE_LABEL,
  SITE_PHONE,
  SITE_REGION,
  SITE_TAGLINE,
} from "../content/site-content";

@Component({
  selector: "app-site-footer",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="site-footer">
      <div class="site-container footer-grid">
        <div class="footer-brand">
          <a class="brand" routerLink="/">
            <span class="brand-mark">ER</span>
            <span class="brand-copy">
              <strong>{{ siteName }}</strong>
              <small>Instalaciones electricas y cuadros a medida</small>
            </span>
          </a>
          <p>{{ tagline }}</p>
        </div>

        <div>
          <h3>Navegacion</h3>
          <ul class="footer-list">
            <li *ngFor="let item of quickLinks">
              <a [routerLink]="item.path">{{ item.label }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Servicios</h3>
          <ul class="footer-list">
            <li *ngFor="let service of serviceLinks">
              <a [routerLink]="service.seo.path">{{ service.shortName }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contacto</h3>
          <ul class="footer-list">
            <li><a [href]="'tel:' + phone">{{ phoneLabel }}</a></li>
            <li><a [href]="'tel:' + phoneAlt">{{ phoneAltLabel }}</a></li>
            <li><a [href]="'mailto:' + email">{{ email }}</a></li>
            <li>{{ address }}</li>
            <li>{{ region }}</li>
          </ul>
          <a class="button button-primary footer-button" routerLink="/contacto">
            Solicitar presupuesto
          </a>
        </div>
      </div>

      <div class="site-container footer-bar">
        <p>{{ siteName }} {{ year }}. Base corporativa en Angular SSR para captar, informar y convertir demanda real en Galicia.</p>
        <div class="footer-meta">
          <a *ngFor="let item of legalNav" [routerLink]="item.path">{{ item.label }}</a>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  quickLinks = footerLinks;
  legalNav = legalLinks;
  serviceLinks = services;
  address = SITE_ADDRESS;
  email = SITE_EMAIL;
  phone = SITE_PHONE;
  phoneAlt = SITE_PHONE_ALT;
  phoneAltLabel = SITE_PHONE_ALT_LABEL;
  phoneLabel = SITE_PHONE_LABEL;
  region = SITE_REGION;
  siteName = SITE_NAME;
  tagline = SITE_TAGLINE;
  year = new Date().getFullYear();
}
