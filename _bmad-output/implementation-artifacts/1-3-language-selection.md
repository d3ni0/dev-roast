# Story 1.3: Language Selection

Status: done

## Story

As a user,
I want to select the programming language of my code,
So that the roast analysis is accurate.

## Acceptance Criteria

1. **Given** I have pasted code **When** I select a language from a dropdown **Then** the selection is stored for the roast request
2. **And** common languages are available (JavaScript, TypeScript, Python, etc.)
3. **And** the selected language is passed to the editor for syntax highlighting

## Tasks / Subtasks

- [x] Task 1: Create LanguageSelector component (AC: #1, #2)
  - [x] 1.1 Create components/LanguageSelector.tsx with dropdown (select element)
  - [x] 1.2 Add common languages: JavaScript, TypeScript, Python, Java, C++, Go, Rust, PHP, Ruby
  - [x] 1.3 Export list of languages for reuse (types/languages.ts)
- [x] Task 2: Integrate language selector into CodeEditor (AC: #3)
  - [x] 2.1 Pass language prop to CodeEditor component
  - [x] 2.2 Update Monaco Editor's language (not defaultLanguage) based on selection
  - [x] 2.3 Persist language selection in CodeInputScreen state
- [x] Task 3: Wire LanguageSelector into CodeInputScreen (AC: #1, #2, #3)
  - [x] 3.1 Add LanguageSelector UI (above editor)
  - [x] 3.2 Use design tokens: bg-surface, border-primary, text-primary for dropdown
  - [x] 3.3 Store `code` and `language` in state for Story 2.2 roast request

### Review Follow-ups (AI)

- [ ] [AI-Review][Low] Verify Elixir language support in Monaco; remove or add fallback if unsupported [types/languages.ts:16]

## Dev Notes

### Architecture Compliance

- **Component:** LanguageSelector.tsx in components/ [Source: architecture.md#Project Structure]
- **State:** language stored in CodeInputScreen (parent), passed down to CodeEditor
- **Naming:** PascalCase for components, camelCase for state [Source: architecture.md#Naming Patterns]

### Languages List

Common languages for roast:
```typescript
JavaScript, TypeScript, Python, Java, C++, Go, Rust, PHP, Ruby, C#, Kotlin, Swift, Scala, Haskell, Elixir
```

### Monaco Language Mapping

Monaco language IDs: `javascript`, `typescript`, `python`, `java`, `cpp`, `go`, `rust`, `php`, `ruby`, `csharp`, `kotlin`, `swift`, `scala`, `haskell`

[Reference: @monaco-editor/react language IDs](https://microsoft.github.io/monaco-editor/docs.html#interfaces/languages.ILanguageExtensionPoint.html)

### Previous Story (1.2) Context

- CodeEditor.tsx has `defaultLanguage="javascript"` (hardcoded)
- Story 1.3 makes this dynamic via props
- CodeInputScreen manages both `code` and `language` state

### Design Tokens (From 1.1)

- **Select/Dropdown:** Use bg-surface, border-primary, text-primary, text-secondary
- **Focus:** accent-cta for visual feedback
- **Font:** Geist Sans (UI) for labels

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3]
- [Source: _bmad-output/planning-artifacts/architecture.md]
- [Source: docs/devroast-design-summary.md]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

- LanguageSelector.tsx created with 15 common languages (JavaScript, TypeScript, Python, etc.)
- types/languages.ts exports LANGUAGES array and LanguageId type
- CodeEditor.tsx updated to accept language prop; useEffect for theme detection (fixed SSR issue)
- CodeInputScreen.tsx integrates LanguageSelector above editor; manages both code and language state

### File List

- types/languages.ts
- components/LanguageSelector.tsx
- components/CodeEditor.tsx (updated)
- components/CodeInputScreen.tsx (updated)
