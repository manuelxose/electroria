import { Routes } from "@angular/router";
import { SiteLayoutComponent } from "./site/components/site-layout.component";

export const routes: Routes = [
  {
    path: "",
    component: SiteLayoutComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./site/pages/home-page.component").then((m) => m.HomePageComponent),
      },
      {
        path: "servicios",
        loadComponent: () =>
          import("./site/pages/services-page.component").then((m) => m.ServicesPageComponent),
      },
      {
        path: "servicios/:slug",
        loadComponent: () =>
          import("./site/pages/service-detail-page.component").then(
            (m) => m.ServiceDetailPageComponent
          ),
      },
      {
        path: "empresa",
        loadComponent: () =>
          import("./site/pages/info-page.component").then((m) => m.InfoPageComponent),
        data: { pageKey: "empresa" },
      },
      {
        path: "zonas",
        loadComponent: () =>
          import("./site/pages/info-page.component").then((m) => m.InfoPageComponent),
        data: { pageKey: "zonas" },
      },
      {
        path: "proyectos",
        loadComponent: () =>
          import("./site/pages/info-page.component").then((m) => m.InfoPageComponent),
        data: { pageKey: "proyectos" },
      },
      {
        path: "certificaciones",
        loadComponent: () =>
          import("./site/pages/info-page.component").then((m) => m.InfoPageComponent),
        data: { pageKey: "certificaciones" },
      },
      {
        path: "blog",
        loadComponent: () =>
          import("./site/pages/blog-page.component").then((m) => m.BlogPageComponent),
      },
      {
        path: "blog/categoria/:slug",
        loadComponent: () =>
          import("./site/pages/blog-category-page.component").then(
            (m) => m.BlogCategoryPageComponent
          ),
      },
      {
        path: "blog/:slug",
        loadComponent: () =>
          import("./site/pages/article-page.component").then((m) => m.ArticlePageComponent),
      },
      {
        path: "contacto",
        loadComponent: () =>
          import("./site/pages/contact-page.component").then((m) => m.ContactPageComponent),
      },
      {
        path: "aviso-legal",
        loadComponent: () =>
          import("./site/pages/info-page.component").then((m) => m.InfoPageComponent),
        data: { pageKey: "aviso-legal" },
      },
      {
        path: "privacidad",
        loadComponent: () =>
          import("./site/pages/info-page.component").then((m) => m.InfoPageComponent),
        data: { pageKey: "privacidad" },
      },
      {
        path: "cookies",
        loadComponent: () =>
          import("./site/pages/info-page.component").then((m) => m.InfoPageComponent),
        data: { pageKey: "cookies" },
      },
      {
        path: "404",
        loadComponent: () =>
          import("./site/pages/not-found-page.component").then((m) => m.NotFoundPageComponent),
      },
      {
        path: "**",
        loadComponent: () =>
          import("./site/pages/not-found-page.component").then((m) => m.NotFoundPageComponent),
      },
    ],
  },
];
