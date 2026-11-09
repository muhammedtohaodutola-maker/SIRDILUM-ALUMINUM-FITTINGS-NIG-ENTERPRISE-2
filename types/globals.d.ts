export {};

// Global Type Definitions for Clerk Authentication & Roles
// Defines custom metadata attached to Clerk user accounts and JWT session tokens

export type UserRole =
  | 'admin'
  | 'org:admin'
  | 'fabricator'
  | 'contractor'
  | 'client'
  | 'org:member';

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: UserRole;
    };
    role?: UserRole;
  }

  interface UserPublicMetadata {
    role?: UserRole;
    company_name?: string;
    phone?: string;
  }
}

