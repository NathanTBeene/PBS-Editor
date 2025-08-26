# PBS Editor Refactoring Guide

## Overview
This document outlines comprehensive refactoring recommendations for the PBS Editor React application to improve code maintainability, readability, and developer experience.

---

## 🎯 Priority 1: Critical Issues (Immediate Impact)

### 1. Color System Centralization
**Problem**: Hardcoded Tailwind classes scattered across 23+ files  
**Impact**: Difficult theme changes, inconsistent styling  
**Files Affected**: All component files  

**Solution**: Implement centralized theme system
```typescript
// src/lib/theme/colors.ts
export const theme = {
  colors: {
    primary: {
      bg: 'bg-slate-800',
      bgSecondary: 'bg-slate-700', 
      bgMuted: 'bg-slate-700/40',
      text: 'text-slate-200',
      textMuted: 'text-slate-300',
      textSubdued: 'text-slate-400',
      border: 'border-slate-500',
      borderDark: 'border-slate-700',
    },
    accent: {
      success: 'bg-emerald-600 hover:bg-emerald-700 text-emerald-100',
      successText: 'text-emerald-200',
      danger: 'text-rose-300 hover:text-rose-400',
      focus: 'focus:outline-none focus:ring-2 focus:ring-blue-300/70',
    },
    surface: {
      modal: 'bg-slate-950/40',
      card: 'bg-slate-700/40',
      button: 'bg-slate-700 hover:bg-slate-600',
      input: 'bg-transparent border border-slate-500 rounded-md px-3 py-2',
    }
  },
  layout: {
    section: 'bg-slate-700/40 rounded-lg shadow-lg p-6',
    container: 'max-w-4xl mx-auto space-y-8',
    grid: {
      two: 'grid grid-cols-1 md:grid-cols-2 gap-4',
      three: 'grid grid-cols-1 md:grid-cols-3 gap-4',
      four: 'grid grid-cols-2 md:grid-cols-4 gap-4',
    }
  }
} as const;

// Utility function for combining classes
export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');
```

**Migration Strategy**:
1. Replace all `className="bg-slate-800"` with `className={theme.colors.primary.bg}`
2. Create component-specific class combinations
3. Use `cn()` utility for conditional classes

### 2. Break Down Massive Files

#### PokemonPage.tsx (780 lines → ~200 lines)
**Current Issues**:
- Single file handling entire page logic
- 6 different input change handlers
- Inline form sections
- Mixed concerns (UI + state + validation)

**Refactor Plan**:
```
src/features/pokemon/
├── components/
│   ├── PokemonEditor.tsx          # Main container (150 lines)
│   ├── PokemonHeader.tsx          # Header with title/actions (80 lines)
│   ├── BasicInfoSection.tsx       # ID, name, category, etc. (60 lines)
│   ├── PhysicalAttributesSection.tsx  # Height, weight, color, shape (50 lines)
│   ├── GameMechanicsSection.tsx   # Catch rate, happiness, etc. (80 lines)
│   └── WildItemsSection.tsx       # Wild item configuration (60 lines)
├── hooks/
│   ├── usePokemonForm.ts          # Form state management (100 lines)
│   └── usePokemonValidation.ts    # Validation logic (50 lines)
└── types/
    └── pokemon-form.types.ts      # Form-specific types (30 lines)
```

**Example Component Split**:
```typescript
// src/features/pokemon/components/PokemonHeader.tsx
import { theme } from '../../../lib/theme/colors';

interface PokemonHeaderProps {
  pokemon: Pokemon;
  onSave: () => void;
  onReset: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export const PokemonHeader = ({ pokemon, onSave, onReset, onDelete, onSetDefault }: PokemonHeaderProps) => {
  return (
    <div className={cn(theme.colors.primary.bg, 'p-6 border-b-3', theme.colors.primary.borderDark, 'shadow-sm')}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {pokemon.name}
            {pokemon.formName && (
              <span className={theme.colors.primary.textMuted}>
                ({pokemon.formName})
              </span>
            )}
          </h1>
          {/* ... rest of header content */}
        </div>
        <PokemonActions 
          onSave={onSave}
          onReset={onReset} 
          onDelete={onDelete}
          onSetDefault={onSetDefault}
        />
      </div>
    </div>
  );
};
```

---

## 🎯 Priority 2: Component Architecture

### 3. Form State Management Overhaul
**Problem**: Manual state management with 6+ different handlers per page  
**Solution**: Implement unified form management

```typescript
// src/lib/hooks/useFormManager.ts
export function useFormManager<T extends Record<string, any>>(
  initialData: T,
  validationSchema?: (data: T) => ValidationResult
) {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const updateField = useCallback((field: keyof T, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field as string]: undefined }));
    }
  }, [errors]);
  
  const updateNestedField = useCallback((field: keyof T, subField: string, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: { ...prev[field], [subField]: value }
    }));
  }, []);
  
  const updateArrayField = useCallback((field: keyof T, index: number, value: any) => {
    setData(prev => {
      const array = [...(prev[field] as any[])];
      array[index] = value;
      return { ...prev, [field]: array };
    });
  }, []);
  
  const validate = useCallback(() => {
    if (!validationSchema) return true;
    const result = validationSchema(data);
    setErrors(result.errors || {});
    return result.isValid;
  }, [data, validationSchema]);
  
  return {
    data,
    errors,
    updateField,
    updateNestedField, 
    updateArrayField,
    validate,
    reset: () => setData(initialData)
  };
}
```

### 4. Over-Engineering Simplification

#### ArrayManager Component (120 lines → 40 lines each)
**Current Problem**: Single component handling 4 different input types with complex logic  
**Solution**: Create specialized components

```typescript
// src/components/ui/arrays/StringArrayManager.tsx (40 lines)
interface StringArrayManagerProps {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  maxItems?: number;
}

// src/components/ui/arrays/SelectArrayManager.tsx (40 lines)  
interface SelectArrayManagerProps {
  title: string;
  items: string[];
  options: string[];
  onChange: (items: string[]) => void;
  maxItems?: number;
}

// src/components/ui/arrays/AutocompleteArrayManager.tsx (45 lines)
// src/components/ui/arrays/AbilityArrayManager.tsx (50 lines)
```

#### Custom Select Simplification
**Problem**: 96 lines of complex viewport positioning logic  
**Recommendation**: Replace with Radix UI or Headless UI

```typescript
// Before: CustomSelect.tsx (96 lines)
// After: Using Radix UI Select (15 lines)
import * as Select from '@radix-ui/react-select';

export const CustomSelect = ({ options, value, onChange }: SelectProps) => (
  <Select.Root value={value} onValueChange={onChange}>
    <Select.Trigger className={theme.surface.input}>
      <Select.Value />
      <Select.Icon />
    </Select.Trigger>
    <Select.Content>
      {options.map(option => (
        <Select.Item key={option} value={option}>
          {option}
        </Select.Item>
      ))}
    </Select.Content>
  </Select.Root>
);
```

---

## 🎯 Priority 3: File Organization

### 5. Directory Structure Refactor
**Current Issues**: 
- Components scattered across generic folders
- "Pokemon Page" folder with spaces
- Mixed concerns in same directories

**Proposed Structure**:
```
src/
├── components/
│   ├── ui/                    # Rename "Base" → "ui"
│   │   ├── arrays/           # Array management components
│   │   ├── forms/            # Form components (inputs, selects)
│   │   ├── layout/           # Cards, modals, sections
│   │   └── feedback/         # Tooltips, alerts, loading states
│   └── layout/               # App-level layout components
│       ├── Navbar.tsx
│       └── Sidebar.tsx
├── features/                  # NEW: Feature-based organization
│   ├── pokemon/
│   │   ├── components/       # Pokemon-specific components  
│   │   ├── hooks/           # Pokemon-specific hooks
│   │   ├── services/        # Pokemon validation, etc.
│   │   └── types/           # Pokemon form types
│   ├── moves/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   └── abilities/
│       └── components/
├── lib/
│   ├── hooks/               # Generic hooks
│   ├── theme/               # NEW: Theme system
│   ├── utils/               # NEW: Utility functions
│   └── types/               # NEW: Shared types
└── pages/                   # Rename "routes" → "pages"
    ├── PokemonPage.tsx      # Thin wrapper around features
    ├── MovesPage.tsx
    └── AbilitiesPage.tsx
```

### 6. Hook Decomposition

#### usePokedex.ts (389 lines → ~100 lines each)
**Problem**: Single hook managing all data types and page state  
**Solution**: Split by domain

```typescript
// src/lib/hooks/data/usePokemonData.ts (~100 lines)
export const usePokemonData = () => {
  // Pokemon CRUD operations only
};

// src/lib/hooks/data/useMovesData.ts (~80 lines)  
export const useMovesData = () => {
  // Moves CRUD operations only
};

// src/lib/hooks/data/useAbilitiesData.ts (~60 lines)
export const useAbilitiesData = () => {
  // Abilities CRUD operations only
};

// src/lib/hooks/useAppState.ts (~50 lines)
export const useAppState = () => {
  // Page navigation and global state
};

// Updated provider
export const PokedexProvider = ({ children }) => {
  const pokemon = usePokemonData();
  const moves = useMovesData();  
  const abilities = useAbilitiesData();
  const appState = useAppState();
  
  return (
    <PokedexContext.Provider value={{ ...pokemon, ...moves, ...abilities, ...appState }}>
      {children}
    </PokedexContext.Provider>
  );
};
```

---

## 🎯 Priority 4: Code Quality Improvements

### 7. Consistent Component Patterns
**Problem**: Inconsistent prop patterns and component structure  
**Solution**: Establish patterns

```typescript
// Standard component interface pattern
interface ComponentProps {
  // Required props first
  data: DataType;
  onChange: (data: DataType) => void;
  
  // Optional props with defaults
  className?: string;
  disabled?: boolean;
  
  // Event handlers
  onSave?: () => void;
  onCancel?: () => void;
}

// Standard component structure
export const Component = ({ 
  data, 
  onChange, 
  className = '', 
  disabled = false,
  onSave,
  onCancel 
}: ComponentProps) => {
  // Hooks first
  const [localState, setLocalState] = useState();
  
  // Event handlers  
  const handleSubmit = useCallback(() => {
    // handler logic
  }, [dependencies]);
  
  // Early returns
  if (!data) return <LoadingState />;
  
  // Main render
  return (
    <div className={cn(theme.layout.section, className)}>
      {/* component content */}
    </div>
  );
};
```

### 8. Type Safety Improvements
**Problem**: Loose typing, any types, missing interfaces  
**Solution**: Strict typing

```typescript
// src/lib/types/forms.ts
export interface PokemonFormData extends Omit<Pokemon, 'id'> {
  // Form-specific fields that differ from model
}

export interface FormFieldProps<T = string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface ArrayFieldProps<T = string> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  maxItems?: number;
}
```

### 9. Performance Optimizations

```typescript
// Memoize expensive computations
const sortedMoves = useMemo(() => 
  moves.sort((a, b) => a.level - b.level), [moves]
);

// Memoize callback props to prevent unnecessary re-renders
const handleMoveChange = useCallback((index: number, field: string, value: any) => {
  setMoves(prev => prev.map((move, i) => 
    i === index ? { ...move, [field]: value } : move
  ));
}, []);

// Memoize heavy components
const MoveSection = memo(({ moves, onChange }: MoveSectionProps) => {
  // Component implementation
});
```

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1)
1. ✅ **Color System** - Create `src/lib/theme/colors.ts`
2. ✅ **Directory Restructure** - Move components to new structure  
3. **Form Hook** - Implement `useFormManager`

### Phase 2: Component Breakdown (Week 2)
1. **Split PokemonPage.tsx** into 6 components
2. **Split MovesPage.tsx** into 4 components  
3. **Replace ArrayManager** with specialized components

### Phase 3: Hook Decomposition (Week 3)
1. **Split usePokedex.ts** into domain-specific hooks
2. **Update PokedexProvider** to use new hooks
3. **Add validation hooks**

### Phase 4: Polish (Week 4)
1. **Replace CustomSelect** with library solution
2. **Add proper TypeScript** interfaces
3. **Performance optimizations**
4. **Add error boundaries**

---

## 📋 Quick Wins (Can implement immediately)

### 1. CSS Custom Properties for Colors
```css
/* src/index.css */
:root {
  --color-slate-800: #1e293b;
  --color-slate-700: #334155;  
  --color-slate-600: #475569;
  --color-slate-500: #64748b;
  --color-slate-400: #94a3b8;
  --color-slate-300: #cbd5e1;
  --color-slate-200: #e2e8f0;
}

.bg-primary { background: var(--color-slate-800); }
.bg-secondary { background: var(--color-slate-700); }
.text-primary { color: var(--color-slate-200); }
```

### 2. Utility Components
```typescript
// src/components/ui/Section.tsx
export const Section = ({ title, children, className = '' }: SectionProps) => (
  <section className={cn(theme.layout.section, className)}>
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </section>
);

// Usage: Replace all section boilerplate
<Section title="Basic Information">
  <InputGrid>
    <InputField label="Name" value={name} onChange={setName} />
    <InputField label="Category" value={category} onChange={setCategory} />
  </InputGrid>
</Section>
```

### 3. Constants Extraction
```typescript
// src/lib/constants/ui.ts
export const GRID_LAYOUTS = {
  two: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  three: 'grid grid-cols-1 md:grid-cols-3 gap-4',  
  four: 'grid grid-cols-2 md:grid-cols-4 gap-4',
} as const;

export const INPUT_CLASSES = {
  base: 'w-full px-3 py-2 border border-slate-500 rounded-md',
  focus: 'focus:outline-none focus:ring-2 focus:ring-blue-300/70',
  error: 'border-red-500 focus:ring-red-300/70',
} as const;
```

---

## ⚠️ Migration Notes

### Breaking Changes
1. **Import paths will change** for moved components
2. **Theme classes replace hardcoded** Tailwind classes
3. **Hook interfaces may change** when splitting usePokedex

### Backwards Compatibility
1. **Keep old imports working** with barrel exports during transition
2. **Gradual migration** - update one page at a time
3. **Fallback themes** for components not yet migrated

### Testing Strategy
1. **Component isolation** - Test each split component independently  
2. **Integration tests** - Ensure page still works after splits
3. **Visual regression** - Screenshots before/after theme changes

---

## 📊 Expected Benefits

### Developer Experience
- **50% reduction** in lines per file
- **Consistent patterns** across codebase  
- **Type safety** improvements
- **Faster development** with reusable components

### Maintainability  
- **Single source of truth** for colors/themes
- **Easier testing** with smaller components
- **Clear separation** of concerns
- **Consistent code style**

### Performance
- **Better code splitting** with feature organization
- **Reduced bundle size** with tree shaking
- **Memoization opportunities** with smaller components
- **Faster builds** with focused imports

---

*Last updated: $(date)*
*Priority: High - Addresses core maintainability issues*