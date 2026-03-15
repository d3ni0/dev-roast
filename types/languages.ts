export const LANGUAGES = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "php", label: "PHP" },
  { id: "ruby", label: "Ruby" },
  { id: "csharp", label: "C#" },
  { id: "kotlin", label: "Kotlin" },
  { id: "swift", label: "Swift" },
  { id: "scala", label: "Scala" },
  { id: "haskell", label: "Haskell" },
  { id: "elixir", label: "Elixir" },
] as const;

export type LanguageId = (typeof LANGUAGES)[number]["id"];
