import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContactFormComponent } from "../components/contact-form.component";
import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_PHONE,
  SITE_PHONE_ALT,
  SITE_PHONE_ALT_LABEL,
  SITE_PHONE_LABEL,
  SITE_WHATSAPP,
  buildBreadcrumbItems,
  contactPageFaqs,
} from "../content/site-content";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-contact-page",
  standalone: true,
  imports: [CommonModule, RouterModule, ContactFormComponent],
  template: `
    <section class="page-hero section">
      <div class="site-container page-hero__split">
        <div>
          <span class="eyebrow">Contacto</span>
          <h1>Presupuesto, revisión técnica o incidencia eléctrica.</h1>
          <p class="lead">
            Si necesitas una instalación nueva, una reforma, mantenimiento o
            una respuesta urgente, aquí tienes el canal directo de Electroria.
          </p>
        </div>

        <aside class="surface-card">
          <span class="panel-label">Datos de contacto</span>
          <ul class="plain-list">
            <li>{{ address }}</li>
            <li><a [href]="'tel:' + phone">{{ phoneLabel }}</a></li>
            <li><a [href]="'tel:' + phoneAlt">{{ phoneAltLabel }}</a></li>
            <li>
              <a [href]="whatsapp" target="_blank" rel="noopener">WhatsApp</a>
            </li>
            <li><a [href]="'mailto:' + email">{{ email }}</a></li>
          </ul>
        </aside>
      </div>
    </section>

    <app-contact-form></app-contact-form>

    <section class="section">
      <div class="site-container section-head">
        <span class="eyebrow">FAQ</span>
        <h2>Preguntas frecuentes antes de contactar.</h2>
      </div>
      <div class="site-container faq-list">
        <details class="faq-item" *ngFor="let item of faqs">
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>
  `,
})
export class ContactPageComponent implements OnInit {
  address = SITE_ADDRESS;
  email = SITE_EMAIL;
  phone = SITE_PHONE;
  phoneAlt = SITE_PHONE_ALT;
  phoneLabel = SITE_PHONE_LABEL;
  phoneAltLabel = SITE_PHONE_ALT_LABEL;
  whatsapp = SITE_WHATSAPP;
  faqs = contactPageFaqs;

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: "Contacto y presupuesto",
      description:
        "Contacta con Electroria para instalaciones eléctricas, cuadros a medida, mantenimiento, automatización y urgencias 24/7 en Vigo y Galicia.",
      path: "/contacto",
      keywords: [
        "contacto electricista vigo",
        "presupuesto instalacion electrica",
        "urgencias electricas galicia",
      ],
      schemas: [
        this.seo.createBreadcrumbSchema(
          buildBreadcrumbItems([
            { name: "Inicio", path: "/" },
            { name: "Contacto", path: "/contacto" },
          ])
        ),
        this.seo.createFaqSchema(this.faqs),
      ],
    });
  }
}
