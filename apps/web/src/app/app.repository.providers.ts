import { Provider } from "@angular/core";
import { BLOG_REPOSITORY } from "./domain/repositories/blog.repository";
import { CONTACT_REPOSITORY } from "./domain/repositories/contact.repository";
import { ApiBlogRepository } from "./infrastructure/repositories/api/api-blog.repository";
import { ApiContactRepository } from "./infrastructure/repositories/api/api-contact.repository";

export const repositoryProviders: Provider[] = [
  ApiBlogRepository,
  ApiContactRepository,
  {
    provide: BLOG_REPOSITORY,
    useExisting: ApiBlogRepository,
  },
  {
    provide: CONTACT_REPOSITORY,
    useExisting: ApiContactRepository,
  },
];
