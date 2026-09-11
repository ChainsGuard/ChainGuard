# ChainGuard Project Structure

## Overview

The project has been restructured to follow a feature-based architecture with clear separation of concerns.

## Directory Structure

```
src/
├── features/                    # Feature-based modules
│   ├── auth/                    # Authentication & key management
│   │   ├── components/          # Auth UI components
│   │   ├── services/            # Auth services (keyring, session, etc.)
│   │   └── types/               # Auth type definitions
│   ├── blockchain/              # Multi-chain support
│   │   ├── components/          # Blockchain UI components
│   │   ├── services/            # Contract, Stellar, Soroban services
│   │   └── types/               # Blockchain type definitions
│   ├── documents/               # Document management
│   │   ├── components/          # Document UI components
│   │   ├── services/            # IPFS, storage, erasure coding services
│   │   └── types/               # Document type definitions
│   ├── guardian/                # Guardian & approvals
│   │   ├── components/          # Guardian UI components
│   │   ├── services/            # Push notification services
│   │   └── types/               # Guardian type definitions
│   ├── nft/                     # NFT access passes
│   │   ├── components/          # NFT UI components
│   │   ├── services/            # NFT services
│   │   └── types/               # NFT type definitions
│   └── vault/                   # Vault management
│       ├── components/          # Vault UI components
│       ├── services/            # Vault services
│       └── types/               # Vault type definitions
├── shared/                      # Shared utilities & components
│   ├── components/              # Reusable UI components
│   ├── hooks/                   # Shared React hooks
│   ├── utils/                   # General utilities
│   ├── types/                   # Shared type definitions
│   └── services/                # Shared services (audit, telemetry, etc.)
├── core/                        # Core infrastructure
│   ├── crypto/                  # Cryptographic services & utilities
│   │   ├── components/          # Crypto UI components
│   │   ├── services/            # Crypto services (BLS, ZK proofs, etc.)
│   │   └── types/               # Crypto type definitions
│   └── storage/                 # Storage services
├── context/                     # React context providers
├── layouts/                     # Layout components
├── styles/                      # CSS/styling files
├── workers/                     # Web workers
└── __tests__/                   # Test files
```

## Key Features

### 1. Feature-Based Architecture
Each feature module is self-contained with its own components, services, and types. This promotes:
- Better code organization
- Easier maintenance
- Clear dependency boundaries
- Improved code reuse

### 2. Barrel Exports
Each feature module has an `index.ts` file that exports all public APIs. This enables:
- Clean import statements
- Easy refactoring
- Better TypeScript support

### 3. Separation of Concerns
- **Components**: UI logic only
- **Services**: Business logic and data access
- **Types**: TypeScript type definitions
- **Utils**: Pure utility functions

## Import Examples

### Before (flat structure):
```typescript
import { contractService } from '../services/contract.service';
import { ipfsService } from '../services/ipfs.service';
import { blsKeyringService } from '../services/blsKeyring.service';
```

### After (feature-based):
```typescript
import { contractService } from '../features/blockchain';
import { ipfsService } from '../features/documents';
import { blsKeyringService } from '../core/crypto';
```

## Module Dependencies

### Auth Module
- Dependencies: Core crypto, shared utils
- Used by: All other modules (for authentication)

### Blockchain Module
- Dependencies: Core crypto, auth module
- Used by: Documents, guardian, NFT modules

### Documents Module
- Dependencies: Blockchain, core crypto
- Used by: Vault, guardian modules

### Guardian Module
- Dependencies: Auth, blockchain, documents
- Used by: Vault module

### NFT Module
- Dependencies: Auth, blockchain
- Used by: Vault module

### Vault Module
- Dependencies: All other feature modules
- Main entry point for the application

## Best Practices

1. **Use barrel exports**: Always import from the feature's index.ts
2. **Keep features self-contained**: Don't import from other features' internal files
3. **Use shared modules**: For common utilities and components
4. **Follow naming conventions**:
   - Components: PascalCase (e.g., `VaultCard.tsx`)
   - Services: camelCase with `.service.ts` suffix
   - Types: PascalCase with `.ts` extension
5. **Maintain dependency direction**: Features should depend on shared/core, not on each other

## Migration Notes

1. Update import paths in existing code
2. Use the new barrel exports for cleaner imports
3. Move any remaining files to their appropriate feature modules
4. Update tests to reflect new import paths
