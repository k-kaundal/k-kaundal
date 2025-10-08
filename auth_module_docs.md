# Multi-Provider Authentication Module for NestJS
## Complete Technical Documentation

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture](#system-architecture)
3. [Design Patterns & Principles](#design-patterns--principles)
4. [Module Structure](#module-structure)
5. [Core Components](#core-components)
6. [API Endpoints Specification](#api-endpoints-specification)
7. [Authentication Flows](#authentication-flows)
8. [Provider Implementation Guide](#provider-implementation-guide)
9. [Configuration Guide](#configuration-guide)
10. [Security Considerations](#security-considerations)
11. [Testing Strategy](#testing-strategy)
12. [Deployment Guide](#deployment-guide)
13. [Error Handling](#error-handling)
14. [Performance Optimization](#performance-optimization)
15. [Monitoring & Logging](#monitoring--logging)

---

## Executive Summary

### Purpose
This authentication module provides a flexible, provider-agnostic authentication system for NestJS applications, enabling seamless integration with multiple authentication providers (Firebase, Auth0, custom implementations) through a unified interface.

### Key Features
- **Provider Independence**: Switch between Firebase, Auth0, or custom providers without code changes
- **Complete Auth Flow**: Registration, login, logout, token refresh, password management
- **Security First**: JWT tokens, bcrypt hashing, token revocation, rate limiting
- **Production Ready**: Comprehensive error handling, logging, monitoring
- **Fully Tested**: Unit, integration, and E2E test coverage
- **Type Safe**: Full TypeScript support with strong typing

### Technology Stack
- **Framework**: NestJS 10.x
- **Language**: TypeScript 5.x
- **Authentication**: JWT, Passport
- **Providers**: Firebase Admin SDK, Auth0 (extensible)
- **Validation**: class-validator, class-transformer
- **Testing**: Jest, Supertest
- **Security**: bcrypt, jsonwebtoken

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Application                        │
│                  (Web / Mobile / Desktop)                    │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS
                         │ REST API
┌────────────────────────▼────────────────────────────────────┐
│                    API Gateway / Load Balancer               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│               NestJS Application Server                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Auth Module (This Package)                  │  │
│  │  ┌────────────┐  ┌──────────────┐  ┌──────────────┐ │  │
│  │  │ Controller │→│  Auth Service │→│ Email Service│ │  │
│  │  └────────────┘  └──────┬───────┘  └──────────────┘ │  │
│  │                         │                             │  │
│  │                  ┌──────▼────────┐                    │  │
│  │                  │Provider Factory│                   │  │
│  │                  └──────┬────────┘                    │  │
│  │                         │                             │  │
│  │         ┌───────────────┼──────────────┐             │  │
│  │         │               │              │             │  │
│  │  ┌──────▼─────┐  ┌─────▼──────┐ ┌────▼──────┐      │  │
│  │  │  Firebase  │  │   Auth0    │ │  Custom   │      │  │
│  │  │  Provider  │  │  Provider  │ │  Provider │      │  │
│  │  └──────┬─────┘  └─────┬──────┘ └────┬──────┘      │  │
│  └─────────┼──────────────┼─────────────┼─────────────┘  │
└────────────┼──────────────┼─────────────┼────────────────┘
             │              │             │
┌────────────▼────┐  ┌──────▼──────┐  ┌──▼──────────┐
│   Firebase      │  │   Auth0     │  │  Custom DB  │
│   Auth + DB     │  │   Service   │  │  (Postgres) │
└─────────────────┘  └─────────────┘  └─────────────┘
```

### Component Interaction Flow

```
User Request → Controller → Guards → Service → Provider → External Service
     ↓                                   ↓          ↓
Response ← DTO Transformation ← Business Logic ← Data Layer
```

### Design Philosophy

**Separation of Concerns**
- Controllers handle HTTP layer only
- Services contain business logic
- Providers abstract external service integration
- Guards manage authorization/authentication
- DTOs ensure data validation

**Dependency Inversion**
- Depend on abstractions (IAuthProvider interface)
- Concrete implementations (FirebaseProvider) depend on interface
- Factory pattern enables runtime provider selection

**Single Responsibility**
- Each class has one reason to change
- AuthService manages auth logic
- EmailService handles email operations
- Each provider implements one authentication system

---

## Design Patterns & Principles

### 1. Strategy Pattern
**Purpose**: Allow selection of authentication provider at runtime

**Implementation**:
```
IAuthProvider Interface
    ↓
FirebaseAuthProvider implements IAuthProvider
Auth0Provider implements IAuthProvider
CustomProvider implements IAuthProvider
```

**Benefits**:
- Add new providers without modifying existing code
- Switch providers via configuration
- Test each provider independently

### 2. Factory Pattern
**Purpose**: Create provider instances based on configuration

**Flow**:
```
Configuration → Factory.create() → Correct Provider Instance
```

**Benefits**:
- Centralized provider creation logic
- Configuration validation in one place
- Easy to add new provider types

### 3. Dependency Injection
**Purpose**: Loose coupling between components

**NestJS Integration**:
- Providers registered in module
- Injected via constructor
- Testable with mock implementations

### 4. Guard Pattern
**Purpose**: Protect routes and validate access

**Guards**:
- **AuthGuard**: Validates JWT tokens
- **RolesGuard**: Checks user permissions

### 5. Decorator Pattern
**Purpose**: Add metadata and extract information

**Decorators**:
- **@CurrentUser()**: Extract authenticated user from request
- **@Roles()**: Define required roles for endpoint

---

## Module Structure

### Directory Organization

```
@yourorg/nestjs-auth/
│
├── src/                                # Source code
│   ├── interfaces/                     # Type definitions
│   │   ├── auth-provider.interface.ts  # Provider contract
│   │   ├── auth-user.interface.ts      # User model
│   │   ├── auth-config.interface.ts    # Configuration types
│   │   └── index.ts                    # Barrel export
│   │
│   ├── providers/                      # Provider implementations
│   │   ├── firebase/
│   │   │   ├── firebase-auth.provider.ts
│   │   │   ├── firebase-auth.config.ts
│   │   │   └── firebase-auth.module.ts
│   │   ├── auth0/
│   │   │   └── auth0-auth.provider.ts
│   │   └── index.ts
│   │
│   ├── factory/                        # Provider factory
│   │   ├── auth-provider.factory.ts
│   │   └── auth-provider.factory.spec.ts
│   │
│   ├── services/                       # Business logic
│   │   ├── auth.service.ts
│   │   ├── auth.service.spec.ts
│   │   ├── token.service.ts
│   │   └── email.service.ts
│   │
│   ├── controllers/                    # HTTP endpoints
│   │   ├── auth.controller.ts
│   │   └── auth.controller.spec.ts
│   │
│   ├── dto/                           # Data Transfer Objects
│   │   ├── register.dto.ts
│   │   ├── login.dto.ts
│   │   ├── forgot-password.dto.ts
│   │   ├── reset-password.dto.ts
│   │   ├── change-password.dto.ts
│   │   └── index.ts
│   │
│   ├── guards/                        # Route protection
│   │   ├── auth.guard.ts
│   │   └── roles.guard.ts
│   │
│   ├── decorators/                    # Custom decorators
│   │   ├── current-user.decorator.ts
│   │   └── roles.decorator.ts
│   │
│   ├── exceptions/                    # Custom exceptions
│   │   └── auth.exceptions.ts
│   │
│   ├── constants/                     # Constants
│   │   └── auth.constants.ts
│   │
│   ├── auth.module.ts                 # Main module
│   └── index.ts                       # Public API exports
│
├── test/                              # Test suites
│   ├── unit/                          # Unit tests
│   │   ├── auth-provider.interface.spec.ts
│   │   ├── firebase-adapter.spec.ts
│   │   └── provider-factory.spec.ts
│   ├── integration/                   # Integration tests
│   │   ├── firebase-integration.spec.ts
│   │   └── auth-flow.spec.ts
│   └── e2e/                          # End-to-end tests
│       └── auth.e2e-spec.ts
│
├── docs/                             # Documentation
│   ├── API.md
│   ├── CONTRIBUTING.md
│   └── MIGRATION.md
│
├── package.json                      # Package configuration
├── tsconfig.json                     # TypeScript config
├── jest.config.js                    # Jest configuration
├── .env.example                      # Environment template
├── .gitignore
├── .eslintrc.js
├── .prettierrc
└── README.md                         # Quick start guide
```

### File Responsibilities

| File/Directory | Purpose | Key Exports |
|----------------|---------|-------------|
| `interfaces/` | Type definitions and contracts | IAuthProvider, IAuthUser |
| `providers/` | Provider implementations | FirebaseAuthProvider |
| `factory/` | Provider instantiation logic | AuthProviderFactory |
| `services/` | Business logic layer | AuthService, EmailService |
| `controllers/` | HTTP request handlers | AuthController |
| `dto/` | Input validation schemas | RegisterDto, LoginDto |
| `guards/` | Route protection logic | AuthGuard, RolesGuard |
| `decorators/` | Parameter extraction | @CurrentUser(), @Roles() |
| `exceptions/` | Custom error classes | InvalidCredentialsException |

---

## Core Components

### 1. IAuthProvider Interface

**Purpose**: Define the contract that all authentication providers must implement

**Methods**:

| Method | Purpose | Input | Output |
|--------|---------|-------|--------|
| `register()` | Create new user account | email, password, metadata | IAuthUser |
| `login()` | Authenticate user | email, password | user, accessToken, refreshToken |
| `logout()` | Invalidate user session | userId | void |
| `verifyToken()` | Validate JWT token | token | IAuthUser |
| `refreshToken()` | Generate new access token | refreshToken | accessToken, refreshToken |
| `changePassword()` | Update user password | userId, oldPass, newPass | void |
| `forgotPassword()` | Initiate password reset | email | resetToken |
| `resetPassword()` | Complete password reset | token, newPassword | void |
| `getUser()` | Retrieve user details | userId | IAuthUser |
| `updateUser()` | Modify user information | userId, data | IAuthUser |
| `deleteUser()` | Remove user account | userId | void |

**Why This Interface?**
- Ensures consistency across providers
- Makes testing easier with mock implementations
- Allows provider switching without code changes
- Documents expected behavior

### 2. AuthProviderFactory

**Purpose**: Create the appropriate provider instance based on configuration

**Responsibilities**:
1. **Validate Configuration**: Ensure all required fields are present
2. **Instantiate Provider**: Create correct provider based on type
3. **Handle Errors**: Throw descriptive errors for invalid configs

**Validation Rules**:
- Provider type must be specified
- JWT configuration required
- Provider-specific config must be complete
- Credentials must be valid format

**Supported Providers**:
- **Firebase**: Requires projectId, privateKey, clientEmail
- **Auth0**: Requires domain, clientId, clientSecret
- **Custom**: Requires custom implementation class

**Error Scenarios**:
- Missing configuration → "Configuration required"
- Invalid provider type → "Unsupported provider: {type}"
- Incomplete Firebase config → "Firebase config incomplete"
- Missing JWT secret → "JWT configuration required"

### 3. FirebaseAuthProvider

**Purpose**: Implement authentication using Firebase Admin SDK

**Key Features**:
1. **User Management**
   - Create users in Firebase Auth
   - Store additional data in Firestore
   - Update user profiles
   - Delete users and associated data

2. **Password Security**
   - Firebase handles password hashing
   - Additional bcrypt hashing for local storage
   - Password strength validation
   - Secure password reset flow

3. **Token Management**
   - JWT access tokens (short-lived: 1 hour)
   - JWT refresh tokens (long-lived: 7 days)
   - Token revocation support
   - Custom claims support

4. **Session Management**
   - Track last login time
   - Revoke all sessions on password change
   - Support for multiple concurrent sessions

**Firebase Integration Points**:

| Firebase Service | Usage | Purpose |
|------------------|-------|---------|
| Firebase Auth | User credentials | Password authentication |
| Firestore | User data | Additional user information |
| Firestore | Password resets | Reset token storage |
| Firestore | User metadata | Creation, update timestamps |

**Data Storage Strategy**:

**Firebase Auth** (Managed by Firebase):
- Email
- Password hash
- Email verification status
- Phone number
- Photo URL

**Firestore** (Managed by your app):
- Display name
- Additional metadata
- Password hash (for local verification)
- Last login timestamp
- Password reset tokens

### 4. AuthService

**Purpose**: Orchestrate authentication operations and business logic

**Responsibilities**:
1. Call appropriate provider methods
2. Add business logic layer
3. Handle cross-cutting concerns (logging, metrics)
4. Coordinate with other services (email)

**Service Dependencies**:
- **IAuthProvider**: For authentication operations
- **EmailService**: For sending emails
- **Logger**: For audit trails

**Why a Service Layer?**
- Separate business logic from provider implementation
- Add validation before calling provider
- Coordinate multiple operations (e.g., send email after register)
- Provide consistent error handling

### 5. EmailService

**Purpose**: Handle all email communications

**Email Types**:
1. **Welcome Email**: Sent after registration
2. **Password Reset**: Sent with reset token
3. **Password Changed**: Confirmation notification
4. **Email Verification**: Verify email ownership

**Configuration**:
- SMTP host and port
- Authentication credentials
- From address
- Email templates

**Features**:
- HTML email templates
- Graceful degradation (logs if email fails)
- Non-blocking sends (don't fail auth if email fails)
- Template variables support

### 6. Guards

#### AuthGuard
**Purpose**: Protect routes requiring authentication

**Process**:
1. Extract `Authorization` header
2. Validate format: `Bearer {token}`
3. Verify token with AuthService
4. Attach user to request object
5. Allow/deny request

**Usage**:
```typescript
@UseGuards(AuthGuard)
@Get('profile')
getProfile(@CurrentUser() user) {
  return user;
}
```

#### RolesGuard
**Purpose**: Enforce role-based access control

**Process**:
1. Read required roles from metadata
2. Check user has required role
3. Allow/deny based on roles

**Usage**:
```typescript
@Roles('admin', 'moderator')
@UseGuards(AuthGuard, RolesGuard)
@Delete('user/:id')
deleteUser() {}
```

### 7. DTOs (Data Transfer Objects)

**Purpose**: Validate and transform incoming data

**Benefits**:
- Type safety
- Automatic validation
- Clear API contracts
- OpenAPI documentation support

**DTO Examples**:

**RegisterDto**:
- `email`: Valid email format, required
- `password`: Minimum 8 characters, required
- `displayName`: Optional string

**LoginDto**:
- `email`: Valid email, required
- `password`: Required

**ChangePasswordDto**:
- `oldPassword`: Current password, required
- `newPassword`: Minimum 8 characters, required

**Validation Rules**:
- Email: RFC 5322 compliant
- Password: Min 8 chars, recommended: 1 upper, 1 lower, 1 number, 1 special
- Passwords: Must not be same as old password

---

## API Endpoints Specification

### Base URL
```
Production: https://api.yourapp.com/v1/auth
Development: http://localhost:3000/auth
```

### Authentication Header
```
Authorization: Bearer {access_token}
```

---

### 1. Register New User

**Endpoint**: `POST /auth/register`

**Description**: Create a new user account

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "displayName": "John Doe"
}
```

**Success Response** (201 Created):
```json
{
  "message": "User registered successfully",
  "user": {
    "uid": "firebase-generated-uid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "emailVerified": false,
    "metadata": {
      "createdAt": "2025-01-15T10:30:00Z",
      "lastLoginAt": "2025-01-15T10:30:00Z"
    }
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:

| Status | Error | Reason |
|--------|-------|--------|
| 400 | Bad Request | Invalid email format or password too short |
| 409 | Conflict | Email already registered |
| 500 | Internal Server Error | Database or service error |

**Validation Rules**:
- Email must be valid format
- Password minimum 8 characters
- Display name optional, max 100 characters

**Side Effects**:
1. User created in Firebase Auth
2. User document created in Firestore
3. Welcome email sent (async)
4. Access and refresh tokens generated

---

### 2. Login

**Endpoint**: `POST /auth/login`

**Description**: Authenticate user and receive tokens

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Success Response** (200 OK):
```json
{
  "message": "Login successful",
  "user": {
    "uid": "firebase-generated-uid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "emailVerified": true
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:

| Status | Error | Reason |
|--------|-------|--------|
| 401 | Unauthorized | Invalid email or password |
| 400 | Bad Request | Missing email or password |
| 429 | Too Many Requests | Rate limit exceeded |

**Security Features**:
- Failed attempts tracked
- Rate limiting applied
- Last login time updated
- Old tokens revoked (optional)

---

### 3. Logout

**Endpoint**: `POST /auth/logout`

**Description**: Invalidate user session and revoke tokens

**Headers**:
```
Authorization: Bearer {access_token}
```

**Success Response** (200 OK):
```json
{
  "message": "Logout successful"
}
```

**Error Responses**:

| Status | Error | Reason |
|--------|-------|--------|
| 401 | Unauthorized | Invalid or expired token |

**Side Effects**:
1. Refresh tokens revoked in Firebase
2. User session terminated
3. Token added to blocklist (if implemented)

---

### 4. Refresh Token

**Endpoint**: `POST /auth/refresh`

**Description**: Generate new access token using refresh token

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response** (200 OK):
```json
{
  "message": "Token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:

| Status | Error | Reason |
|--------|-------|--------|
| 401 | Unauthorized | Invalid or expired refresh token |
| 403 | Forbidden | Token revoked |

**Token Rotation**:
- New refresh token issued with each refresh
- Old refresh token invalidated
- Prevents token reuse attacks

---

### 5. Forgot Password

**Endpoint**: `POST /auth/forgot-password`

**Description**: Initiate password reset process

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Success Response** (200 OK):
```json
{
  "message": "If the email exists, a password reset link has been sent"
}
```

**Note**: Always returns success to prevent email enumeration

**Process Flow**:
1. Check if user exists
2. Generate secure reset token (JWT)
3. Store token in database with expiration
4. Send email with reset link
5. Return generic success message

**Reset Token Specifications**:
- **Algorithm**: HS256 (HMAC with SHA-256)
- **Expiration**: 1 hour
- **Payload**: userId, email, type: 'password-reset'
- **Storage**: Firestore with expiration timestamp
- **One-time use**: Marked as used after consumption

**Email Content**:
```
Subject: Password Reset Request

Hello,

You requested a password reset. Click the link below:
https://yourapp.com/reset-password?token={resetToken}

This link expires in 1 hour.

If you didn't request this, please ignore this email.
```

---

### 6. Reset Password

**Endpoint**: `POST /auth/reset-password`

**Description**: Complete password reset using token from email

**Request Body**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword": "NewSecurePass456!"
}
```

**Success Response** (200 OK):
```json
{
  "message": "Password reset successfully"
}
```

**Error Responses**:

| Status | Error | Reason |
|--------|-------|--------|
| 401 | Unauthorized | Invalid or expired token |
| 400 | Bad Request | Token already used |
| 400 | Bad Request | Password doesn't meet requirements |

**Validation Process**:
1. Verify token signature
2. Check token type is 'password-reset'
3. Verify token not expired
4. Check token not already used
5. Validate new password strength
6. Update password in Firebase Auth
7. Store password hash in Firestore
8. Mark token as used
9. Revoke all refresh tokens
10. Send confirmation email

**Security Measures**:
- Token is single-use
- All sessions terminated
- User must re-login
- Audit log entry created

---

### 7. Change Password (Authenticated)

**Endpoint**: `POST /auth/change-password`

**Description**: Change password while logged in

**Headers**:
```
Authorization: Bearer {access_token}
```

**Request Body**:
```json
{
  "oldPassword": "CurrentPass123!",
  "newPassword": "NewSecurePass456!"
}
```

**Success Response** (200 OK):
```json
{
  "message": "Password changed successfully"
}
```

**Error Responses**:

| Status | Error | Reason |
|--------|-------|--------|
| 401 | Unauthorized | Not authenticated |
| 400 | Bad Request | Old password incorrect |
| 400 | Bad Request | New password same as old |
| 400 | Bad Request | Password doesn't meet requirements |

**Process Flow**:
1. Verify user authentication
2. Verify old password correct
3. Validate new password strength
4. Ensure new password != old password
5. Update password in Firebase Auth
6. Store password hash in Firestore
7. Revoke all refresh tokens (force re-login)
8. Send confirmation email
9. Update password change timestamp

**Security Considerations**:
- Requires current password verification
- All sessions terminated (user re-authenticates)
- Password history check (optional)
- Notification sent to email

---

### 8. Get Current User

**Endpoint**: `GET /auth/me`

**Description**: Retrieve authenticated user information

**Headers**:
```
Authorization: Bearer {access_token}
```

**Success Response** (200 OK):
```json
{
  "user": {
    "uid": "firebase-generated-uid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "emailVerified": true,
    "phoneNumber": "+1234567890",
    "photoURL": "https://example.com/photo.jpg",
    "metadata": {
      "createdAt": "2025-01-15T10:30:00Z",
      "lastLoginAt": "2025-01-20T14:20:00Z"
    }
  }
}
```

**Error Responses**:

| Status | Error | Reason |
|--------|-------|--------|
| 401 | Unauthorized | Invalid or expired token |

---

## Authentication Flows

### Registration Flow

```
┌──────┐                                  ┌──────────┐
│Client│                                  │  Server  │
└───┬──┘                                  └────┬─────┘
    │                                          │
    │ POST /auth/register                      │
    │ { email, password, displayName }         │
    │─────────────────────────────────────────>│
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Validate Input (DTO)    │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Check Email Available   │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Create User (Firebase)  │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Store User Data (DB)    │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Generate JWT Tokens     │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Send Welcome Email      │
    │                          │ (async, non-blocking)   │
    │                          └───────────────┬────────┘
    │                                          │
    │ 201 Created                              │
    │ { user, accessToken, refreshToken }      │
    │<─────────────────────────────────────────│
    │                                          │
```

### Login Flow

```
┌──────┐                                  ┌──────────┐
│Client│                                  │  Server  │
└───┬──┘                                  └────┬─────┘
    │                                          │
    │ POST /auth/login                         │
    │ { email, password }                      │
    │─────────────────────────────────────────>│
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Validate Input          │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Find User by Email      │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Verify Password         │
    │                          │ (Firebase/bcrypt)       │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Generate JWT Tokens     │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Update Last Login       │
    │                          └───────────────┬────────┘
    │                                          │
    │ 200 OK                                   │
    │ { user, accessToken, refreshToken }      │
    │<─────────────────────────────────────────│
    │                                          │
```

### Password Reset Flow

```
┌──────┐            ┌──────────┐            ┌────────┐
│Client│            │  Server  │            │  Email │
└───┬──┘            └────┬─────┘            └───┬────┘
    │                    │                      │
    │ Step 1: Request Reset                     │
    │                    │                      │
    │ POST /forgot-password                     │
    │ { email }          │                      │
    │───────────────────>│                      │
    │                    │                      │
    │        ┌───────────▼────────┐             │
    │        │ Find User           │             │
    │        └───────────┬────────┘             │
    │                    │                      │
    │        ┌───────────▼────────┐             │
    │        │ Generate Token      │             │
    │        │ (JWT, 1hr exp)      │             │
    │        └───────────┬────────┘             │
    │                    │                      │
    │        ┌───────────▼────────┐             │
    │        │ Store in Database   │             │
    │        │ with expiration     │             │
    │        └───────────┬────────┘             │
    │                    │                      │
    │                    │ Send Reset Email     │
    │                    │─────────────────────>│
    │                    │                      │
    │ 200 OK             │                      │ Reset Link
    │ { message }        │                      │ with Token
    │<───────────────────│                      │────────>
    │                    │                      │  User
    │                    │                      │
    │ Step 2: Click Link in Email               │
    │                    │                      │
    │ GET /reset-password?token=xxx             │
    │ (User clicks link) │                      │
    │                    │                      │
    │ Step 3: Submit New Password               │
    │                    │                      │
    │ POST /reset-password                      │
    │ { token, newPassword }                    │
    │───────────────────>│                      │
    │                    │                      │
    │        ┌───────────▼────────┐             │
    │        │ Verify Token        │             │
    │        │ - Valid signature   │             │
    │        │ - Not expired       │             │
    │        │ - Not used          │             │
    │        └───────────┬────────┘             │
    │                    │                      │
    │        ┌───────────▼────────┐             │
    │        │ Update Password     │             │
    │        └───────────┬────────┘             │
    │                    │                      │
    │        ┌───────────▼────────┐             │
    │        │ Mark Token as Used  │             │
    │        └───────────┬────────┘             │
    │                    │                      │
    │        ┌───────────▼────────┐             │
    │        │ Revoke All Sessions │             │
    │        └───────────┬────────┘             │
    │                    │                      │
    │                    │ Confirmation Email   │
    │                    │─────────────────────>│
    │                    │                      │
    │ 200 OK             │                      │
    │ { message }        │                      │
    │<───────────────────│                      │
    │                    │                      │
```

### Change Password Flow

```
┌──────┐                                  ┌──────────┐
│Client│                                  │  Server  │
└───┬──┘                                  └────┬─────┘
    │                                          │
    │ POST /change-password                    │
    │ Authorization: Bearer {token}            │
    │ { oldPassword, newPassword }             │
    │─────────────────────────────────────────>│
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Verify JWT Token        │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Get User from Token     │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Verify Old Password     │
    │                          │ (compare with hash)     │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Validate New Password   │
    │                          │ - Strength check        │
    │                          │ - Not same as old       │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Update in Firebase Auth │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Store Hash in Firestore│
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Revoke All Tokens       │
    │                          │ (Force Re-login)        │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Send Confirmation Email │
    │                          └───────────────┬────────┘
    │                                          │
    │ 200 OK                                   │
    │ { message }                              │
    │<─────────────────────────────────────────│
    │                                          │
    │ User Must Re-login with New Password     │
    │                                          │
```

### Token Refresh Flow

```
┌──────┐                                  ┌──────────┐
│Client│                                  │  Server  │
└───┬──┘                                  └────┬─────┘
    │                                          │
    │ Access Token Expired (401)               │
    │<─────────────────────────────────────────│
    │                                          │
    │ POST /refresh                            │
    │ { refreshToken }                         │
    │─────────────────────────────────────────>│
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Verify Refresh Token    │
    │                          │ - Valid signature       │
    │                          │ - Not expired           │
    │                          │ - Not revoked           │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Get User from Token     │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Generate New Tokens     │
    │                          │ - New access token      │
    │                          │ - New refresh token     │
    │                          └───────────────┬────────┘
    │                                          │
    │                          ┌───────────────▼────────┐
    │                          │ Invalidate Old Refresh  │
    │                          │ (Token Rotation)        │
    │                          └───────────────┬────────┘
    │                                          │
    │ 200 OK                                   │
    │ { accessToken, refreshToken }            │
    │<─────────────────────────────────────────│
    │                                          │
    │ Retry Original Request with New Token    │
    │                                          │
```

---

## Provider Implementation Guide

### Creating a Custom Provider

#### Step 1: Implement the Interface

Create a class that implements `IAuthProvider`:

```typescript
export class CustomAuthProvider implements IAuthProvider {
  constructor(private config: CustomAuthConfig) {
    // Initialize your auth system
  }

  async register(email: string, password: string, metadata?: Record<string, any>): Promise<IAuthUser> {
    // Your implementation
  }

  async login(email: string, password: string): Promise<{ user: IAuthUser; accessToken: string; refreshToken: string }> {
    // Your implementation
  }

  // Implement all other methods...
}
```

#### Step 2: Add Configuration Type

```typescript
export interface CustomAuthConfig {
  databaseUrl: string;
  apiKey: string;
  // Add your specific config
}
```

#### Step 3: Register in Factory

Update `AuthProviderFactory`:

```typescript
export enum AuthProviderType {
  FIREBASE = 'firebase',
  AUTH0 = 'auth0',
  CUSTOM = 'custom', // Add your provider
}

static create(config: AuthModuleConfig): IAuthProvider {
  switch (config.provider) {
    case 'firebase':
      return new FirebaseAuthProvider(config.firebase, config.jwt);
    case 'custom':
      return new CustomAuthProvider(config.custom);
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
}
```

#### Step 4: Update Configuration Interface

```typescript
export interface AuthModuleConfig {
  provider: 'firebase' | 'auth0' | 'custom';
  firebase?: FirebaseAuthConfig;
  auth0?: Auth0Config;
  custom?: CustomAuthConfig; // Add your config type
  jwt: JWTConfig;
}
```

### Auth0 Provider Example

Here's how you would implement Auth0:

**Key Considerations**:
1. **Auth0 SDK**: Use `auth0` npm package
2. **Management API**: For user CRUD operations
3. **Token Handling**: Auth0 provides its own tokens
4. **Password Reset**: Use Auth0's reset flow

**Implementation Outline**:

```typescript
export class Auth0Provider implements IAuthProvider {
  private auth0Client: ManagementClient;
  
  constructor(config: Auth0Config) {
    this.auth0Client = new ManagementClient({
      domain: config.domain,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    });
  }

  async register(email: string, password: string, metadata?: Record<string, any>): Promise<IAuthUser> {
    // Create user via Auth0 Management API
    const auth0User = await this.auth0Client.createUser({
      email,
      password,
      connection: 'Username-Password-Authentication',
      user_metadata: metadata,
    });
    
    return this.mapAuth0UserToAuthUser(auth0User);
  }

  async login(email: string, password: string): Promise<{ user: IAuthUser; accessToken: string; refreshToken: string }> {
    // Use Auth0 Authentication API
    const response = await fetch(`https://${this.config.domain}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'password',
        username: email,
        password: password,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        audience: this.config.audience,
        scope: 'openid profile email',
      }),
    });
    
    const tokens = await response.json();
    const user = await this.getUserFromToken(tokens.access_token);
    
    return {
      user,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    };
  }

  // Implement other methods...
}
```

### Database-Backed Custom Provider

**For PostgreSQL/MySQL/MongoDB**:

**Key Components**:
1. **User Repository**: Handle database operations
2. **Password Hashing**: Use bcrypt
3. **Token Generation**: Use jsonwebtoken
4. **Session Management**: Store sessions in Redis/database

**Example Structure**:

```typescript
export class DatabaseAuthProvider implements IAuthProvider {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private hashingService: HashingService,
  ) {}

  async register(email: string, password: string, metadata?: Record<string, any>): Promise<IAuthUser> {
    // Check if user exists
    const exists = await this.userRepository.findByEmail(email);
    if (exists) throw new UserAlreadyExistsException();

    // Hash password
    const passwordHash = await this.hashingService.hash(password);

    // Create user
    const user = await this.userRepository.create({
      email,
      passwordHash,
      ...metadata,
    });

    return this.mapDatabaseUserToAuthUser(user);
  }

  async login(email: string, password: string): Promise<LoginResult> {
    // Find user
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new InvalidCredentialsException();

    // Verify password
    const valid = await this.hashingService.compare(password, user.passwordHash);
    if (!valid) throw new InvalidCredentialsException();

    // Generate tokens
    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken(user);

    return {
      user: this.mapDatabaseUserToAuthUser(user),
      accessToken,
      refreshToken,
    };
  }

  // Implement other methods...
}
```

---

## Configuration Guide

### Environment Variables

**Required Variables**:

```bash
# Provider Selection
AUTH_PROVIDER=firebase  # Options: firebase, auth0, custom

# JWT Configuration (Always Required)
JWT_SECRET=your-super-secret-key-minimum-32-characters
JWT_EXPIRATION=3600  # 1 hour in seconds
JWT_REFRESH_EXPIRATION=604800  # 7 days in seconds
```

**Firebase Configuration**:

```bash
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com  # Optional
```

**Auth0 Configuration**:

```bash
# Auth0 Settings
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_AUDIENCE=your-api-identifier
```

**Email Configuration** (Optional):

```bash
# SMTP Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false  # true for 465, false for other ports
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Email Settings
EMAIL_FROM=noreply@yourapp.com
EMAIL_FROM_NAME=Your App Name
```

**Application Settings**:

```bash
# General
NODE_ENV=development  # development, production, test
PORT=3000
FRONTEND_URL=http://localhost:3000

# Security
RATE_LIMIT_WINDOW=900000  # 15 minutes in ms
RATE_LIMIT_MAX_REQUESTS=100
```

### Module Configuration

#### Basic Configuration (Synchronous)

```typescript
import { Module } from '@nestjs/common';
import { AuthModule } from '@yourorg/nestjs-auth';

@Module({
  imports: [
    AuthModule.forRoot({
      provider: 'firebase',
      firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      },
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
        refreshExpiresIn: '7d',
      },
      email: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD,
      },
    }),
  ],
})
export class AppModule {}
```

#### Advanced Configuration (Asynchronous)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@yourorg/nestjs-auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    AuthModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        // Load configuration asynchronously
        // Can fetch from database, remote config, etc.
        
        return {
          provider: configService.get('AUTH_PROVIDER'),
          firebase: {
            projectId: configService.get('FIREBASE_PROJECT_ID'),
            privateKey: configService.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
            clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
          },
          jwt: {
            secret: configService.get('JWT_SECRET'),
            expiresIn: configService.get('JWT_EXPIRATION', '3600'),
            refreshExpiresIn: configService.get('JWT_REFRESH_EXPIRATION', '604800'),
          },
          email: {
            host: configService.get('SMTP_HOST'),
            port: configService.get('SMTP_PORT'),
            user: configService.get('SMTP_USER'),
            password: configService.get('SMTP_PASSWORD'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

#### Configuration Validation

```typescript
import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  // Provider
  AUTH_PROVIDER: Joi.string().valid('firebase', 'auth0', 'custom').required(),
  
  // JWT
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRATION: Joi.number().default(3600),
  JWT_REFRESH_EXPIRATION: Joi.number().default(604800),
  
  // Firebase
  FIREBASE_PROJECT_ID: Joi.when('AUTH_PROVIDER', {
    is: 'firebase',
    then: Joi.string().required(),
  }),
  FIREBASE_PRIVATE_KEY: Joi.when('AUTH_PROVIDER', {
    is: 'firebase',
    then: Joi.string().required(),
  }),
  FIREBASE_CLIENT_EMAIL: Joi.when('AUTH_PROVIDER', {
    is: 'firebase',
    then: Joi.string().email().required(),
  }),
  
  // Email (Optional)
  SMTP_HOST: Joi.string().optional(),
  SMTP_PORT: Joi.number().optional(),
  SMTP_USER: Joi.string().email().optional(),
  SMTP_PASSWORD: Joi.string().optional(),
});

// Use in ConfigModule
ConfigModule.forRoot({
  validationSchema: configValidationSchema,
})
```

### Firebase Setup Guide

#### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name
4. Enable/disable Google Analytics
5. Click "Create Project"

#### 2. Enable Authentication

1. In Firebase Console, click "Authentication"
2. Click "Get Started"
3. Enable "Email/Password" sign-in method
4. Optional: Enable email verification

#### 3. Create Firestore Database

1. Click "Firestore Database"
2. Click "Create Database"
3. Choose "Start in production mode"
4. Select location
5. Click "Enable"

#### 4. Generate Service Account

1. Go to Project Settings (gear icon)
2. Click "Service Accounts" tab
3. Click "Generate New Private Key"
4. Save the JSON file securely
5. Extract values for environment variables:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

#### 5. Configure Security Rules

**Firestore Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Password resets (server-side only)
    match /passwordResets/{resetId} {
      allow read, write: if false; // Only via Admin SDK
    }
  }
}
```

**Firebase Auth Settings**:
- Enable email enumeration protection
- Set password policy (min length, require uppercase, etc.)
- Configure authorized domains

---

## Security Considerations

### Password Security

**Hashing Algorithm**:
- **Primary**: bcrypt with salt rounds = 10
- **Alternative**: Argon2id (more secure, higher resource usage)
- **Never**: MD5, SHA1, plain text

**Password Requirements**:
- Minimum 8 characters (recommend 12+)
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character
- No common passwords (check against known lists)

**Password Storage**:
```typescript
// Firebase Auth handles password hashing internally
await admin.auth().createUser({ email, password });

// For custom providers, use bcrypt
import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;
const hash = await bcrypt.hash(password, SALT_ROUNDS);
```

### Token Security

**JWT Best Practices**:

1. **Short-lived Access Tokens**
   - Expiration: 15 minutes to 1 hour
   - Stored in memory (not localStorage)
   - Sent in Authorization header

2. **Long-lived Refresh Tokens**
   - Expiration: 7-30 days
   - Stored in httpOnly secure cookie
   - Rotated on each use
   - Revocable server-side

3. **Token Structure**:
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "uid": "user-id",
    "email": "user@example.com",
    "type": "access",
    "iat": 1234567890,
    "exp": 1234571490
  },
  "signature": "..."
}
```

4. **Token Validation**:
   - Verify signature
   - Check expiration
   - Validate issuer
   - Check token type
   - Verify not revoked

**Token Storage Client-Side**:

| Storage Type | Access Token | Refresh Token |
|--------------|--------------|---------------|
| Memory | ✅ Recommended | ❌ Lost on refresh |
| localStorage | ❌ XSS vulnerable | ❌ XSS vulnerable |
| sessionStorage | ⚠️ Acceptable | ❌ Lost on tab close |
| httpOnly Cookie | ⚠️ CSRF risk | ✅ Recommended |

### CORS Configuration

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

### Rate Limiting

**Implementation**:
```typescript
import * as rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to login endpoint
@Post('login')
@UseGuards(ThrottlerGuard)
async login(@Body() dto: LoginDto) {
  // ...
}
```

**Rate Limits by Endpoint**:

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/auth/register` | 3 requests | 1 hour |
| `/auth/login` | 5 requests | 15 minutes |
| `/auth/forgot-password` | 3 requests | 1 hour |
| `/auth/reset-password` | 5 requests | 15 minutes |
| `/auth/change-password` | 10 requests | 1 hour |
| `/auth/refresh` | 20 requests | 15 minutes |

### HTTPS/TLS

**Requirements**:
- All API endpoints MUST use HTTPS in production
- Minimum TLS 1.2
- Strong cipher suites only
- HSTS (HTTP Strict Transport Security) enabled

**Configuration**:
```typescript
app.use(helmet({
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}));
```

### Input Validation

**Always Validate**:
- Email format
- Password strength
- Token format
- Request body structure
- Query parameters

**Use DTOs with class-validator**:
```typescript
export class RegisterDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  password: string;
}
```

### SQL Injection Prevention

**Use Parameterized Queries**:
```typescript
// ❌ Bad - SQL Injection vulnerable
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ Good - Parameterized
const query = 'SELECT * FROM users WHERE email = ?';
await db.query(query, [email]);

// ✅ Better - ORM (TypeORM, Prisma)
await userRepository.findOne({ where: { email } });
```

### XSS Prevention

**Sanitize Output**:
- Escape HTML in responses
- Use Content Security Policy headers
- Validate and sanitize user input

**CSP Header**:
```typescript
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", 'data:', 'https:'],
  },
}));
```

### CSRF Protection

**For Cookie-based Auth**:
```typescript
import * as csurf from 'csurf';

app.use(csurf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  },
}));
```

---

## Testing Strategy

### Testing Pyramid

```
        /\
       /  \
      / E2E \
     /───────\
    /  Integ. \
   /───────────\
  /    Unit     \
 /───────────────\
```

- **70% Unit Tests**: Fast, isolated, mock dependencies
- **20% Integration Tests**: Test provider integration
- **10% E2E Tests**: Full flow testing

### Unit Testing

#### Testing the Interface Contract

**Purpose**: Ensure all methods are defined

```typescript
describe('IAuthProvider Interface Contract', () => {
  it('should have all required methods', () => {
    const methods = [
      'register', 'login', 'logout',
      'verifyToken', 'refreshToken',
      'changePassword', 'forgotPassword', 'resetPassword',
      'getUser', 'updateUser', 'deleteUser'
    ];
    
    methods.forEach(method => {
      expect(typeof IAuthProvider.prototype[method]).toBe('function');
    });
  });
});
```

#### Testing Firebase Provider

**Mock Firebase Admin SDK**:

```typescript
jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  auth: () => ({
    createUser: jest.fn(),
    getUserByEmail: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  }),
  firestore: () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
      })),
    })),
  }),
}));

describe('FirebaseAuthProvider', () => {
  let provider: FirebaseAuthProvider;
  
  beforeEach(() => {
    provider = new FirebaseAuthProvider(mockConfig, mockJwtConfig);
  });

  describe('register', () => {
    it('should create user successfully', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'test@example.com',
      };
      
      admin.auth().createUser.mockResolvedValue(mockUser);
      
      const result = await provider.register('test@example.com', 'password123');
      
      expect(result.uid).toBe('test-uid');
      expect(result.email).toBe('test@example.com');
    });

    it('should throw on duplicate email', async () => {
      admin.auth().createUser.mockRejectedValue({
        code: 'auth/email-already-exists'
      });
      
      await expect(
        provider.register('test@example.com', 'password123')
      ).rejects.toThrow(UserAlreadyExistsException);
    });
  });
});
```

#### Testing Auth Service

```typescript
describe('AuthService', () => {
  let service: AuthService;
  let mockProvider: jest.Mocked<IAuthProvider>;

  beforeEach(() => {
    mockProvider = {
      register: jest.fn(),
      login: jest.fn(),
      // ... mock all methods
    };
    
    service = new AuthService(mockProvider);
  });

  it('should delegate register to provider', async () => {
    const mockUser = { uid: '123', email: 'test@test.com' };
    mockProvider.register.mockResolvedValue(mockUser);

    const result = await service.register('test@test.com', 'pass123');

    expect(mockProvider.register).toHaveBeenCalledWith(
      'test@test.com',
      'pass123',
      undefined
    );
    expect(result).toEqual(mockUser);
  });
});
```

### Integration Testing

**Purpose**: Test with real Firebase/database

```typescript
describe('Firebase Integration', () => {
  let authService: AuthService;
  let testUser: IAuthUser;
  const testEmail = `test-${Date.now()}@example.com`;

  beforeAll(async () => {
    // Setup test Firebase project
    const module = await Test.createTestingModule({
      imports: [AuthModule.forRoot(testConfig)],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should complete full auth flow', async () => {
    // Register
    testUser = await authService.register(testEmail, 'TestPass123!');
    expect(testUser.email).toBe(testEmail);

    // Login
    const loginResult = await authService.login(testEmail, 'TestPass123!');
    expect(loginResult.accessToken).toBeDefined();

    // Change Password
    await authService.changePassword(
      testUser.uid,
      'TestPass123!',
      'NewPass456!'
    );

    // Verify can login with new password
    const newLogin = await authService.login(testEmail, 'NewPass456!');
    expect(newLogin.user.uid).toBe(testUser.uid);
  });

  afterAll(async () => {
    // Cleanup: delete test user
    if (testUser) {
      await authService.deleteUser(testUser.uid);
    }
  });
});
```

### E2E Testing

**Purpose**: Test complete HTTP flows

```typescript
describe('Auth E2E', () => {
  let app: INestApplication;
  let accessToken: string;
  const testEmail = `e2e-${Date.now()}@example.com`;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('POST /auth/register', () => {
    it('should register successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: testEmail,
          password: 'TestPass123!',
          displayName: 'Test User',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.user.email).toBe(testEmail);
          expect(res.body.accessToken).toBeDefined();
          accessToken = res.body.accessToken;
        });
    });

    it('should fail with invalid email', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'invalid-email',
          password: 'TestPass123!',
        })
        .expect(400);
    });
  });

  describe('GET /auth/me', () => {
    it('should return user with valid token', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.user.email).toBe(testEmail);
        });
    });

    it('should fail without token', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

### Test Coverage Goals

| Component | Target Coverage | Priority |
|-----------|----------------|----------|
| Providers | 90%+ | High |
| Services | 85%+ | High |
| Controllers | 80%+ | Medium |
| Guards | 90%+ | High |
| DTOs | 100% | Medium |
| Utilities | 85%+ | Medium |

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

---

## Deployment Guide

### Pre-Deployment Checklist

**Security**:
- [ ] All secrets in environment variables (not hardcoded)
- [ ] HTTPS/TLS configured
- [ ] CORS configured for production domains
- [ ] Rate limiting enabled
- [ ] Security headers configured (Helmet)
- [ ] Input validation on all endpoints
- [ ] SQL injection protection verified

**Configuration**:
- [ ] Environment variables set for production
- [ ] Database connection pool configured
- [ ] Firebase service account configured
- [ ] Email service configured
- [ ] Logging configured
- [ ] Monitoring configured

**Testing**:
- [ ] All tests passing
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] E2E tests on staging environment

**Documentation**:
- [ ] API documentation updated
- [ ] README updated
- [ ] Changelog updated
- [ ] Deployment runbook created

### Environment Setup

#### Development
```bash
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=debug
```

#### Staging
```bash
NODE_ENV=staging
PORT=3000
FRONTEND_URL=https://staging.yourapp.com
LOG_LEVEL=info
```

#### Production
```bash
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://yourapp.com
LOG_LEVEL=warn
```

### Docker Deployment

**Dockerfile**:
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Security: Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000

CMD ["node", "dist/main"]
```

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  auth-api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    env_file:
      - .env.production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Kubernetes Deployment

**deployment.yaml**:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: auth-service
  template:
    metadata:
      labels:
        app: auth-service
    spec:
      containers:
      - name: auth-service
        image: yourorg/auth-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        envFrom:
        - secretRef:
            name: auth-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

**service.yaml**:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: auth-service
spec:
  selector:
    app: auth-service
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

**secrets.yaml**:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: auth-secrets
type: Opaque
data:
  JWT_SECRET: <base64-encoded-secret>
  FIREBASE_PRIVATE_KEY: <base64-encoded-key>
  FIREBASE_CLIENT_EMAIL: <base64-encoded-email>
```

### Cloud Platform Deployment

#### AWS (Elastic Beanstalk)

**Create Application**:
```bash
eb init -p node.js-18 auth-service --region us-east-1
eb create auth-production
```

**Configure Environment Variables**:
```bash
eb setenv NODE_ENV=production \
  JWT_SECRET=your-secret \
  FIREBASE_PROJECT_ID=your-project
```

**Deploy**:
```bash
npm run build
eb deploy
```

#### Google Cloud (Cloud Run)

**Build Container**:
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/auth-service
```

**Deploy**:
```bash
gcloud run deploy auth-service \
  --image gcr.io/PROJECT_ID/auth-service \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production
```

#### Azure (App Service)

**Create App Service**:
```bash
az webapp create \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --name auth-service \
  --runtime "NODE|18-lts"
```

**Configure**:
```bash
az webapp config appsettings set \
  --resource-group myResourceGroup \
  --name auth-service \
  --settings NODE_ENV=production JWT_SECRET=your-secret
```

**Deploy**:
```bash
az webapp deployment source config-zip \
  --resource-group myResourceGroup \
  --name auth-service \
  --src ./dist.zip
```

### Database Migration

**For Custom Providers with Database**:

```typescript
// migrations/001_create_users_table.ts
export async function up(db: Database) {
  await db.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('email').unique().notNullable();
    table.string('password_hash').notNullable();
    table.string('display_name');
    table.boolean('email_verified').defaultTo(false);
    table.timestamps(true, true);
    table.index('email');
  });
}

export async function down(db: Database) {
  await db.schema.dropTable('users');
}
```

**Run Migrations**:
```bash
npm run migrate:latest
```

### Health Checks

**Implement Health Endpoint**:
```typescript
@Controller('health')
export class HealthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  @Get()
  async check(): Promise<HealthCheckResult> {
    const checks = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        auth: await this.checkAuthService(),
        email: await this.checkEmailService(),
        database: await this.checkDatabase(),
      },
    };

    const allHealthy = Object.values(checks.services).every(s => s.status === 'up');
    
    return {
      ...checks,
      status: allHealthy ? 'healthy' : 'degraded',
    };
  }

  private async checkAuthService() {
    try {
      // Perform basic auth check
      return { status: 'up', latency: 10 };
    } catch (error) {
      return { status: 'down', error: error.message };
    }
  }
}
```

### Monitoring Setup

**Prometheus Metrics**:
```typescript
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
})
export class AppModule {}
```

**Custom Metrics**:
```typescript
import { Counter, Histogram } from 'prom-client';

export class MetricsService {
  private loginAttempts = new Counter({
    name: 'auth_login_attempts_total',
    help: 'Total number of login attempts',
    labelNames: ['status'],
  });

  private loginDuration = new Histogram({
    name: 'auth_login_duration_seconds',
    help: 'Login request duration',
    buckets: [0.1, 0.5, 1, 2, 5],
  });

  recordLoginAttempt(success: boolean) {
    this.loginAttempts.inc({ status: success ? 'success' : 'failure' });
  }

  recordLoginDuration(duration: number) {
    this.loginDuration.observe(duration);
  }
}
```

---

## Error Handling

### Error Types

**Custom Exception Classes**:

```typescript
// Authentication Errors
export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid email or password', HttpStatus.UNAUTHORIZED);
  }
}

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('User with this email already exists', HttpStatus.CONFLICT);
  }
}

export class InvalidTokenException extends HttpException {
  constructor(message = 'Invalid or expired token') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class PasswordMismatchException extends HttpException {
  constructor() {
    super('Current password is incorrect', HttpStatus.BAD_REQUEST);
  }
}

// Rate Limiting Errors
export class RateLimitException extends HttpException {
  constructor() {
    super('Too many requests, please try again later', HttpStatus.TOO_MANY_REQUESTS);
  }
}

// Token Errors
export class TokenExpiredException extends InvalidTokenException {
  constructor() {
    super('Token has expired');
  }
}

export class TokenRevokedException extends InvalidTokenException {
  constructor() {
    super('Token has been revoked');
  }
}
```

### Global Exception Filter

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'Internal server error';
    let error = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object') {
        message = exceptionResponse['message'] || message;
        error = exceptionResponse['error'] || error;
      } else {
        message = exceptionResponse;
      }
    }

    // Log error
    console.error({
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      status,
      message,
      stack: exception instanceof Error ? exception.stack : undefined,
    });

    // Send response
    response.status(status).json({
      statusCode: status,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

### Error Response Format

**Standard Error Response**:
```json
{
  "statusCode": 401,
  "error": "UNAUTHORIZED",
  "message": "Invalid email or password",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "path": "/auth/login"
}
```

**Validation Error Response**:
```json
{
  "statusCode": 400,
  "error": "BAD_REQUEST",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "constraint": "isEmail",
      "message": "email must be a valid email address"
    },
    {
      "field": "password",
      "constraint": "minLength",
      "message": "password must be at least 8 characters"
    }
  ],
  "timestamp": "2025-01-15T10:30:00.000Z",
  "path": "/auth/register"
}
```

### Error Codes Reference

| Code | Status | Description | User Action |
|------|--------|-------------|-------------|
| `INVALID_CREDENTIALS` | 401 | Wrong email/password | Verify credentials |
| `USER_EXISTS` | 409 | Email already registered | Use different email or login |
| `USER_NOT_FOUND` | 404 | User doesn't exist | Check email or register |
| `INVALID_TOKEN` | 401 | Token invalid/expired | Re-authenticate |
| `TOKEN_EXPIRED` | 401 | Access token expired | Use refresh token |
| `TOKEN_REVOKED` | 403 | Token was revoked | Re-authenticate |
| `PASSWORD_MISMATCH` | 400 | Old password incorrect | Verify current password |
| `WEAK_PASSWORD` | 400 | Password too weak | Use stronger password |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests | Wait and retry |
| `EMAIL_NOT_VERIFIED` | 403 | Email not verified | Check email for verification |
| `VALIDATION_ERROR` | 400 | Input validation failed | Fix input errors |
| `SERVER_ERROR` | 500 | Internal error | Contact support |

---

## Performance Optimization

### Caching Strategy

**Token Verification Cache**:
```typescript
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private authProvider: IAuthProvider,
  ) {}

  async verifyToken(token: string): Promise<IAuthUser> {
    // Check cache first
    const cacheKey = `token:${token}`;
    const cached = await this.cacheManager.get<IAuthUser>(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Verify with provider
    const user = await this.authProvider.verifyToken(token);

    // Cache for 5 minutes
    await this.cacheManager.set(cacheKey, user, { ttl: 300 });

    return user;
  }
}
```

**User Data Cache**:
```typescript
async getUser(userId: string): Promise<IAuthUser> {
  const cacheKey = `user:${userId}`;
  const cached = await this.cacheManager.get<IAuthUser>(cacheKey);
  
  if (cached) return cached;

  const user = await this.authProvider.getUser(userId);
  await this.cacheManager.set(cacheKey, user, { ttl: 3600 }); // 1 hour

  return user;
}
```

### Database Optimization

**Connection Pooling**:
```typescript
// For PostgreSQL with TypeORM
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  extra: {
    max: 20, // Maximum connections
    min: 5,  // Minimum connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
});
```

**Indexes**:
```sql
-- Users table
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Password resets
CREATE INDEX idx_password_resets_token ON password_resets(token);
CREATE INDEX idx_password_resets_expires ON password_resets(expires_at);
```

### Request Optimization

**Compression**:
```typescript
import * as compression from 'compression';

app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  threshold: 1024, // Only compress if size > 1KB
}));
```

**Response Pagination**:
```typescript
@Get('users')
async getUsers(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
) {
  const skip = (page - 1) * limit;
  const users = await this.authService.getUsers({ skip, limit });
  
  return {
    data: users,
    meta: {
      page,
      limit,
      total: await this.authService.getUserCount(),
    },
  };
}
```

### Async Operations

**Non-blocking Email Sends**:
```typescript
async register(email: string, password: string) {
  const user = await this.authProvider.register(email, password);

  // Send email asynchronously (don't block response)
  this.emailService.sendWelcomeEmail(user.email, user.displayName)
    .catch(err => this.logger.error('Failed to send welcome email', err));

  return user;
}
```

**Background Jobs**:
```typescript
import { Queue } from 'bull';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('email') private emailQueue: Queue,
  ) {}

  async forgotPassword(email: string) {
    const token = await this.authProvider.forgotPassword(email);

    // Add to queue for background processing
    await this.emailQueue.add('password-reset', {
      email,
      token,
    });

    return { message: 'Reset email will be sent if the email exists' };
  }
}
```

### Load Balancing

**Stateless Design**:
- No session state in application memory
- All state in database/cache
- Allows horizontal scaling

**Health Checks for Load Balancer**:
```typescript
@Get('health')
async health() {
  return {
    status: 'ok',
    timestamp: Date.now(),
  };
}
```

---

## Monitoring & Logging

### Logging Strategy

**Log Levels**:
- **ERROR**: Critical failures requiring immediate attention
- **WARN**: Warning conditions that should be reviewed
- **INFO**: Normal application events
- **DEBUG**: Detailed information for debugging

**Structured Logging**:
```typescript
import { Logger } from '@nestjs/common';

export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async login(email: string, password: string) {
    this.logger.log({
      message: 'Login attempt',
      email,
      timestamp: new Date().toISOString(),
    });

    try {
      const result = await this.authProvider.login(email, password);
      
      this.logger.log({
        message: 'Login successful',
        userId: result.user.uid,
        email,
      });

      return result;
    } catch (error) {
      this.logger.error({
        message: 'Login failed',
        email,
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}
```

### Audit Logging

**Security Events to Log**:
- User registration
- Login attempts (success/failure)
- Password changes
- Password resets
- Token generation
- Token revocation
- Account deletion

**Audit Log Entry**:
```typescript
interface AuditLogEntry {
  event: string;
  userId?: string;
  email?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  metadata?: Record<string, any>;
}

@Injectable()
export class AuditLogger {
  async log(entry: AuditLogEntry) {
    // Store in database or log aggregation service
    await this.auditLogRepository.create(entry);
  }
}
```

### Application Metrics

**Key Metrics to Track**:

1. **Authentication Metrics**
   - Login success rate
   - Login failure rate
   - Average login time
   - Token generation rate

2. **Performance Metrics**
   - Request latency (p50, p95, p99)
   - Throughput (requests/second)
   - Error rate
   - Database query time

3. **Business Metrics**
   - New registrations per day
   - Active users
   - Password reset requests
   - Failed login attempts per user

**Implementation with Prometheus**:
```typescript
import { Counter, Histogram } from 'prom-client';

export class AuthMetrics {
  loginAttempts = new Counter({
    name: 'auth_login_attempts_total',
    help: 'Total login attempts',
    labelNames: ['status', 'provider'],
  });

  loginDuration = new Histogram({
    name: 'auth_login_duration_seconds',
    help: 'Login duration in seconds',
    buckets: [0.1, 0.5, 1, 2, 5],
  });

  registrations = new Counter({
    name: 'auth_registrations_total',
    help: 'Total user registrations',
  });
}
```

### Alerting Rules

**Critical Alerts**:
- Error rate > 5% for 5 minutes
- Login success rate < 90% for 10 minutes
- API latency p95 > 2 seconds for 5 minutes
- Database connection failures

**Warning Alerts**:
- Error rate > 2% for 10 minutes
- Unusual spike in registrations
- High rate of password reset requests
- Cache hit rate < 80%

### Monitoring Dashboard

**Key Dashboard Panels**:

1. **Overview**
   - Total requests/minute
   - Error rate
   - Average response time
   - Active users

2. **Authentication**
   - Login success/failure rate
   - Registration rate
   - Password reset requests
   - Token refresh rate

3. **Performance**
   - Request latency percentiles
   - Database query time
   - Cache hit rate
   - Memory usage

4. **Errors**
   - Error rate by type
   - Top error messages
   - Failed requests by endpoint

---

## Conclusion

This authentication module provides a production-ready, secure, and scalable solution for NestJS applications. By following the patterns and practices outlined in this documentation, you can:

✅ Implement secure authentication with multiple providers
✅ Maintain clean, testable code
✅ Scale horizontally as your application grows
✅ Monitor and debug issues effectively
✅ Extend functionality with minimal effort

### Next Steps

1. **Installation**: Follow the installation guide to set up the package
2. **Configuration**: Configure your chosen provider (Firebase, Auth0, or custom)
3. **Integration**: Integrate the auth module into your NestJS application
4. **Testing**: Run the test suite to verify functionality
5. **Deployment**: Deploy using the deployment guide
6. **Monitoring**: Set up monitoring and logging

### Support & Resources

- **Documentation**: Full API reference available
- **GitHub**: Report issues and contribute
- **Discord**: Join community for support
- **Email**: Technical support available
