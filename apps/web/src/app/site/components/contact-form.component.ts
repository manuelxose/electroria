import {
  DOCUMENT,
  CommonModule,
  isPlatformBrowser,
} from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  CONTACT_REPOSITORY,
  ContactRepository,
} from "src/app/domain/repositories/contact.repository";
import { getPublicRuntimeConfig } from "src/app/infrastructure/runtime/public-runtime-config";
import { environment } from "src/environments/environment";
import {
  contactBudgetRanges,
  contactPropertyTypes,
  contactServiceOptions,
  contactUrgencyOptions,
} from "../content/site-content";
import { AnalyticsService } from "../services/analytics.service";

type TurnstileWindow = Window &
  typeof globalThis & {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: Record<string, unknown>
      ) => string;
      reset: (widgetId?: string) => void;
    };
  };

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContactFormComponent implements OnInit {
  readonly turnstileElementId = "electroria-turnstile";

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  turnstileEnabled = false;

  serviceOptions = contactServiceOptions;
  propertyTypes = contactPropertyTypes;
  urgencyOptions = contactUrgencyOptions;
  budgetRanges = contactBudgetRanges;

  private turnstileSiteKey = "";
  private turnstileWidgetId: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly analytics: AnalyticsService,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Inject(CONTACT_REPOSITORY)
    private readonly contactRepository: ContactRepository
  ) {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.pattern(/^[+0-9()\s.-]{8,20}$/)]],
      company: [""],
      serviceType: ["", Validators.required],
      propertyType: ["", Validators.required],
      urgency: ["", Validators.required],
      budget: [""],
      message: ["", [Validators.required, Validators.minLength(20)]],
      website: [""],
      privacy: [false, Validators.requiredTrue],
      turnstileToken: [""],
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const runtime = getPublicRuntimeConfig();
    this.turnstileEnabled =
      runtime.turnstileEnabled
      ?? (environment.turnstileEnabled as boolean | undefined)
      ?? false;
    this.turnstileSiteKey =
      (runtime.turnstileSiteKey ?? environment.turnstileSiteKey ?? "").trim();

    if (!this.turnstileEnabled || !this.turnstileSiteKey) {
      return;
    }

    this.contactForm.controls["turnstileToken"]?.addValidators(Validators.required);
    this.contactForm.controls["turnstileToken"]?.updateValueAndValidity({ emitEvent: false });
    this.ensureTurnstileScript();
  }

  get f() {
    return this.contactForm.controls;
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      Object.values(this.contactForm.controls).forEach((control) =>
        control.markAsTouched()
      );
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    try {
      const service2 = [
        this.contactForm.value.propertyType,
        this.contactForm.value.urgency,
        this.contactForm.value.budget,
      ]
        .filter(Boolean)
        .join(" | ");

      await this.contactRepository.submitLead({
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone || undefined,
        company: this.contactForm.value.company || undefined,
        service1: this.contactForm.value.serviceType,
        service2,
        message: this.contactForm.value.message,
        sourcePath: this.router.url,
        sourceLabel: "formulario-web-electroria",
        propertyType: this.contactForm.value.propertyType,
        urgency: this.contactForm.value.urgency,
        budget: this.contactForm.value.budget || undefined,
        website: this.contactForm.value.website || "",
        privacy: Boolean(this.contactForm.value.privacy),
        turnstileToken: this.contactForm.value.turnstileToken || undefined,
      });

      this.isSubmitting = false;
      this.submitSuccess = true;
      this.analytics.trackEvent("quote_request_submitted", {
        service: this.contactForm.value.serviceType,
        source_path: this.router.url,
      });
      this.contactForm.reset({
        website: "",
        privacy: false,
        turnstileToken: "",
      });
      this.resetTurnstile();
      this.scrollToSuccess();
    } catch {
      this.isSubmitting = false;
      this.submitError = true;
      this.resetTurnstile();
    }
  }

  private scrollToSuccess(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setTimeout(() => {
      this.document
        .getElementById("success-message")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  private ensureTurnstileScript(): void {
    const view = this.document.defaultView as TurnstileWindow | null;
    if (view?.turnstile) {
      this.renderTurnstile();
      return;
    }

    const existing = this.document.getElementById("cf-turnstile-script");
    if (existing) {
      existing.addEventListener("load", () => this.renderTurnstile(), { once: true });
      return;
    }

    const script = this.document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => this.renderTurnstile(), { once: true });
    this.document.body.appendChild(script);
  }

  private renderTurnstile(): void {
    if (this.turnstileWidgetId) {
      return;
    }

    const container = this.document.getElementById(this.turnstileElementId);
    const view = this.document.defaultView as TurnstileWindow | null;
    if (!container || !view?.turnstile || !this.turnstileSiteKey) {
      return;
    }

    this.turnstileWidgetId = view.turnstile.render(container, {
      sitekey: this.turnstileSiteKey,
      theme: "light",
      callback: (token: string) => {
        this.contactForm.controls["turnstileToken"]?.setValue(token);
      },
      "expired-callback": () => {
        this.contactForm.controls["turnstileToken"]?.setValue("");
      },
      "error-callback": () => {
        this.contactForm.controls["turnstileToken"]?.setValue("");
      },
    });
  }

  private resetTurnstile(): void {
    if (!isPlatformBrowser(this.platformId) || !this.turnstileWidgetId) {
      return;
    }

    const view = this.document.defaultView as TurnstileWindow | null;
    view?.turnstile?.reset(this.turnstileWidgetId);
    this.contactForm.controls["turnstileToken"]?.setValue("");
  }
}
