export type Category = "All" | "Aptitude & Verbal" | "MAANG Company Practice" | "Product Based Companies" | "Service Based Companies" | "Core Aptitude" | "Core Verbal" | "Programming Basics" | "Data Structures" | "System Design Mock" | "Logical Reasoning" | "Data Interpretation" | "HR & Behavioral Mock";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCard {
  id: string; title: string; company: string; category: Category; tag: string; tagColor: string;
  icon: string; duration: string; questions: number; difficulty: Difficulty; available: boolean; gradient: string;
}

export interface CategoryInfo {
  id: Category; label: string; icon: string; count: number; gradient: string; slug: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: "Aptitude & Verbal", label: "Aptitude & Verbal Test", icon: "🎯", count: 38, gradient: "linear-gradient(135deg, #028090, #00A896)", slug: "free-aptitude-verbal" },
  { id: "MAANG Company Practice", label: "MAANG Company Practice", icon: "💎", count: 5, gradient: "linear-gradient(135deg, #4285F4, #0F9D58)", slug: "maang-company-practice" },
  { id: "Product Based Companies", label: "Product Based Companies", icon: "🚀", count: 4, gradient: "linear-gradient(135deg, #FF9900, #FF6B00)", slug: "product-based-companies" },
  { id: "Service Based Companies", label: "Service Based Companies", icon: "🏢", count: 3, gradient: "linear-gradient(135deg, #3395FF, #0055CC)", slug: "service-based-companies" },
  { id: "Core Aptitude", label: "Core Aptitude Practice", icon: "🧮", count: 5, gradient: "linear-gradient(135deg, #7B2C8B, #A83DBF)", slug: "core-aptitude" },
  { id: "Core Verbal", label: "Core Verbal Ability", icon: "📖", count: 4, gradient: "linear-gradient(135deg, #E50914, #B30007)", slug: "core-verbal" },
  { id: "Logical Reasoning", label: "Logical Reasoning", icon: "🧠", count: 4, gradient: "linear-gradient(135deg, #0081FB, #00C6FF)", slug: "logical-reasoning" },
  { id: "Data Interpretation", label: "Data Interpretation", icon: "📊", count: 3, gradient: "linear-gradient(135deg, #0058A3, #003D73)", slug: "data-interpretation" },
  { id: "Programming Basics", label: "Programming Basics", icon: "💻", count: 4, gradient: "linear-gradient(135deg, #00A4EF, #7FBA00)", slug: "programming-basics" },
  { id: "Data Structures", label: "Data Structures & Algos", icon: "🌳", count: 4, gradient: "linear-gradient(135deg, #F7A500, #F7001C)", slug: "data-structures" },
  { id: "System Design Mock", label: "System Design Mock", icon: "⚙️", count: 3, gradient: "linear-gradient(135deg, #555555, #999999)", slug: "system-design-mock" },
  { id: "HR & Behavioral Mock", label: "HR & Behavioral Mock", icon: "🤝", count: 3, gradient: "linear-gradient(135deg, #FF0000, #CC0000)", slug: "hr-behavioral-mock" },
];

const g = (a: string, b: string) => `linear-gradient(135deg, ${a}, ${b})`;

export const TEST_CARDS: TestCard[] = [
  // ══════════════════════════════════════
  // FREE APTITUDE & VERBAL — Levels
  // ══════════════════════════════════════
  { id: "basic", title: "Basic Aptitude & Verbal Test", company: "Foundation Pack", category: "Aptitude & Verbal", tag: "START HERE", tagColor: "var(--primary)", icon: "🎯", duration: "60 Mins", questions: 50, difficulty: "Easy", available: true, gradient: g("#028090","#00A896") },
  { id: "intermediate", title: "Intermediate Aptitude Test", company: "Foundation Pack", category: "Aptitude & Verbal", tag: "LEVEL UP", tagColor: "#b07800", icon: "⚡", duration: "75 Mins", questions: 60, difficulty: "Medium", available: false, gradient: g("#F7A500","#FF8C00") },
  { id: "advanced", title: "Advanced Aptitude Test", company: "Foundation Pack", category: "Aptitude & Verbal", tag: "EXPERT", tagColor: "var(--accent)", icon: "🔥", duration: "90 Mins", questions: 75, difficulty: "Hard", available: false, gradient: g("#E50914","#B30007") },

  // ── Aptitude Topics (20) ──
  { id: "apt-percentages", title: "Percentages", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "📐", duration: "20 Mins", questions: 15, difficulty: "Easy", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-profit-loss", title: "Profit & Loss", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "💰", duration: "20 Mins", questions: 15, difficulty: "Easy", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-time-work", title: "Time & Work", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "⏱️", duration: "20 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-time-distance", title: "Time, Speed & Distance", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "🚗", duration: "20 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-ratio", title: "Ratio & Proportion", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "⚖️", duration: "20 Mins", questions: 15, difficulty: "Easy", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-averages", title: "Averages", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "📊", duration: "15 Mins", questions: 12, difficulty: "Easy", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-si-ci", title: "Simple & Compound Interest", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "🏦", duration: "20 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-mixtures", title: "Mixtures & Alligation", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "🧪", duration: "15 Mins", questions: 12, difficulty: "Medium", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-algebra", title: "Algebra & Equations", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "🔢", duration: "20 Mins", questions: 15, difficulty: "Hard", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-number-system", title: "Number System", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "🔟", duration: "20 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-geometry", title: "Geometry & Mensuration", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "📏", duration: "25 Mins", questions: 18, difficulty: "Hard", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-permutation", title: "Permutation & Combination", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "🎲", duration: "25 Mins", questions: 15, difficulty: "Hard", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-probability", title: "Probability", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "🎰", duration: "20 Mins", questions: 15, difficulty: "Hard", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-pipes", title: "Pipes & Cisterns", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "🚰", duration: "15 Mins", questions: 12, difficulty: "Medium", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-boats", title: "Boats & Streams", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "⛵", duration: "15 Mins", questions: 12, difficulty: "Medium", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-trains", title: "Trains", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "🚂", duration: "15 Mins", questions: 12, difficulty: "Easy", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-ages", title: "Problems on Ages", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "👶", duration: "15 Mins", questions: 12, difficulty: "Easy", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-calendar", title: "Calendar & Clocks", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "📅", duration: "15 Mins", questions: 12, difficulty: "Medium", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-logarithm", title: "Logarithms", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "📈", duration: "20 Mins", questions: 15, difficulty: "Hard", available: false, gradient: g("#028090","#00A896") },
  { id: "apt-surds", title: "Surds & Indices", company: "Aptitude Topic", category: "Aptitude & Verbal", tag: "APTITUDE", tagColor: "var(--primary)", icon: "√", duration: "20 Mins", questions: 15, difficulty: "Hard", available: false, gradient: g("#028090","#00A896") },

  // ── Verbal Topics (15) ──
  { id: "ver-reading", title: "Reading Comprehension", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "📖", duration: "25 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-synonyms", title: "Synonyms & Antonyms", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "🔤", duration: "15 Mins", questions: 20, difficulty: "Easy", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-analogy", title: "Analogies", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "🔗", duration: "15 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-sentence-correction", title: "Sentence Correction", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "✏️", duration: "20 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-fill-blanks", title: "Fill in the Blanks", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "📝", duration: "15 Mins", questions: 15, difficulty: "Easy", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-para-jumbles", title: "Para Jumbles", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "🔀", duration: "20 Mins", questions: 12, difficulty: "Hard", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-cloze", title: "Cloze Test", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "📄", duration: "20 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-idioms", title: "Idioms & Phrases", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "💬", duration: "15 Mins", questions: 15, difficulty: "Easy", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-one-word", title: "One Word Substitution", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "🎯", duration: "15 Mins", questions: 15, difficulty: "Easy", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-error-spotting", title: "Error Spotting", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "🔍", duration: "20 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-active-passive", title: "Active & Passive Voice", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "🔄", duration: "15 Mins", questions: 12, difficulty: "Easy", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-direct-indirect", title: "Direct & Indirect Speech", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "💭", duration: "15 Mins", questions: 12, difficulty: "Easy", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-precis", title: "Precis Writing", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "✂️", duration: "20 Mins", questions: 10, difficulty: "Hard", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-vocab", title: "Vocabulary Builder", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "📚", duration: "15 Mins", questions: 20, difficulty: "Medium", available: false, gradient: g("#05668D","#028090") },
  { id: "ver-articles", title: "Articles & Prepositions", company: "Verbal Topic", category: "Aptitude & Verbal", tag: "VERBAL", tagColor: "var(--secondary)", icon: "📎", duration: "15 Mins", questions: 15, difficulty: "Easy", available: false, gradient: g("#05668D","#028090") },

  // ══════════════════════════════════════
  // MAANG COMPANIES (5)
  // ══════════════════════════════════════
  { id: "google", title: "Google Prep Suite", company: "Google", category: "MAANG Company Practice", tag: "MAANG", tagColor: "#4285F4", icon: "🔵", duration: "90 Mins", questions: 60, difficulty: "Hard", available: false, gradient: g("#4285F4","#0F9D58") },
  { id: "amazon", title: "Amazon Leadership Test", company: "Amazon", category: "MAANG Company Practice", tag: "MAANG", tagColor: "#FF9900", icon: "🟠", duration: "75 Mins", questions: 55, difficulty: "Hard", available: false, gradient: g("#FF9900","#FF6B00") },
  { id: "meta", title: "Meta Engineering", company: "Meta", category: "MAANG Company Practice", tag: "MAANG", tagColor: "#0081FB", icon: "🔷", duration: "80 Mins", questions: 60, difficulty: "Hard", available: false, gradient: g("#0081FB","#00C6FF") },
  { id: "apple", title: "Apple Innovation Test", company: "Apple", category: "MAANG Company Practice", tag: "MAANG", tagColor: "#555555", icon: "🍎", duration: "70 Mins", questions: 50, difficulty: "Hard", available: false, gradient: g("#555555","#999999") },
  { id: "netflix", title: "Netflix Problem Solver", company: "Netflix", category: "MAANG Company Practice", tag: "MAANG", tagColor: "#E50914", icon: "🎬", duration: "75 Mins", questions: 55, difficulty: "Hard", available: false, gradient: g("#E50914","#B30007") },

  // ══════════════════════════════════════
  // PRODUCT BASED (4)
  // ══════════════════════════════════════
  { id: "microsoft", title: "Microsoft Azure Test", company: "Microsoft", category: "Product Based Companies", tag: "PRODUCT", tagColor: "#00A4EF", icon: "🪟", duration: "75 Mins", questions: 55, difficulty: "Hard", available: false, gradient: g("#00A4EF","#7FBA00") },
  { id: "razorpay", title: "Razorpay Fintech Pro", company: "Razorpay", category: "Product Based Companies", tag: "PRODUCT", tagColor: "#3395FF", icon: "💳", duration: "60 Mins", questions: 50, difficulty: "Medium", available: false, gradient: g("#3395FF","#0055CC") },
  { id: "flipkart", title: "Flipkart E-Commerce", company: "Flipkart", category: "Product Based Companies", tag: "PRODUCT", tagColor: "#F7A500", icon: "🛒", duration: "65 Mins", questions: 50, difficulty: "Medium", available: false, gradient: g("#F7A500","#F7001C") },
  { id: "adobe", title: "Adobe Creative Labs", company: "Adobe", category: "Product Based Companies", tag: "PRODUCT", tagColor: "#FF0000", icon: "🎨", duration: "60 Mins", questions: 50, difficulty: "Medium", available: false, gradient: g("#FF0000","#CC0000") },

  // ══════════════════════════════════════
  // SERVICE BASED (3)
  // ══════════════════════════════════════
  { id: "tcs", title: "TCS National Qualifier", company: "TCS", category: "Service Based Companies", tag: "SERVICE", tagColor: "#0058A3", icon: "🏢", duration: "90 Mins", questions: 65, difficulty: "Medium", available: false, gradient: g("#0058A3","#003D73") },
  { id: "infosys", title: "Infosys InfyTQ", company: "Infosys", category: "Service Based Companies", tag: "SERVICE", tagColor: "#007CC3", icon: "🌐", duration: "75 Mins", questions: 55, difficulty: "Medium", available: false, gradient: g("#007CC3","#00A0DC") },
  { id: "wipro", title: "Wipro NLTH Elite", company: "Wipro", category: "Service Based Companies", tag: "SERVICE", tagColor: "#7B2C8B", icon: "💼", duration: "70 Mins", questions: 55, difficulty: "Easy", available: false, gradient: g("#7B2C8B","#A83DBF") },

  // ══════════════════════════════════════
  // CORE APTITUDE (5)
  // ══════════════════════════════════════
  { id: "core-quant-easy", title: "Quantitative Basics", company: "Core Practice", category: "Core Aptitude", tag: "CORE", tagColor: "#7B2C8B", icon: "🧮", duration: "30 Mins", questions: 25, difficulty: "Easy", available: false, gradient: g("#7B2C8B","#A83DBF") },
  { id: "core-quant-med", title: "Quantitative Intermediate", company: "Core Practice", category: "Core Aptitude", tag: "CORE", tagColor: "#7B2C8B", icon: "📊", duration: "45 Mins", questions: 35, difficulty: "Medium", available: false, gradient: g("#7B2C8B","#A83DBF") },
  { id: "core-quant-hard", title: "Quantitative Advanced", company: "Core Practice", category: "Core Aptitude", tag: "CORE", tagColor: "#7B2C8B", icon: "🔥", duration: "60 Mins", questions: 40, difficulty: "Hard", available: false, gradient: g("#7B2C8B","#A83DBF") },
  { id: "core-di-mock", title: "Data Interpretation Mock", company: "Core Practice", category: "Core Aptitude", tag: "CORE", tagColor: "#7B2C8B", icon: "📈", duration: "30 Mins", questions: 20, difficulty: "Medium", available: false, gradient: g("#7B2C8B","#A83DBF") },
  { id: "core-speed-math", title: "Speed Mathematics", company: "Core Practice", category: "Core Aptitude", tag: "CORE", tagColor: "#7B2C8B", icon: "⚡", duration: "20 Mins", questions: 30, difficulty: "Easy", available: false, gradient: g("#7B2C8B","#A83DBF") },

  // ══════════════════════════════════════
  // CORE VERBAL (4)
  // ══════════════════════════════════════
  { id: "core-grammar", title: "English Grammar Mastery", company: "Core Practice", category: "Core Verbal", tag: "CORE", tagColor: "#E50914", icon: "📖", duration: "30 Mins", questions: 25, difficulty: "Easy", available: false, gradient: g("#E50914","#B30007") },
  { id: "core-reading", title: "Advanced Reading Comp", company: "Core Practice", category: "Core Verbal", tag: "CORE", tagColor: "#E50914", icon: "📚", duration: "40 Mins", questions: 20, difficulty: "Hard", available: false, gradient: g("#E50914","#B30007") },
  { id: "core-vocab-adv", title: "GRE-Level Vocabulary", company: "Core Practice", category: "Core Verbal", tag: "CORE", tagColor: "#E50914", icon: "🎓", duration: "25 Mins", questions: 30, difficulty: "Hard", available: false, gradient: g("#E50914","#B30007") },
  { id: "core-verbal-mix", title: "Verbal Ability Mix", company: "Core Practice", category: "Core Verbal", tag: "CORE", tagColor: "#E50914", icon: "🎯", duration: "45 Mins", questions: 35, difficulty: "Medium", available: false, gradient: g("#E50914","#B30007") },

  // ══════════════════════════════════════
  // LOGICAL REASONING (4)
  // ══════════════════════════════════════
  { id: "lr-seating", title: "Seating Arrangement", company: "Reasoning", category: "Logical Reasoning", tag: "LOGIC", tagColor: "#0081FB", icon: "🪑", duration: "30 Mins", questions: 20, difficulty: "Hard", available: false, gradient: g("#0081FB","#00C6FF") },
  { id: "lr-blood", title: "Blood Relations", company: "Reasoning", category: "Logical Reasoning", tag: "LOGIC", tagColor: "#0081FB", icon: "👨‍👩‍👧‍👦", duration: "20 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#0081FB","#00C6FF") },
  { id: "lr-syllogism", title: "Syllogisms", company: "Reasoning", category: "Logical Reasoning", tag: "LOGIC", tagColor: "#0081FB", icon: "🧩", duration: "25 Mins", questions: 20, difficulty: "Medium", available: false, gradient: g("#0081FB","#00C6FF") },
  { id: "lr-coding", title: "Coding & Decoding", company: "Reasoning", category: "Logical Reasoning", tag: "LOGIC", tagColor: "#0081FB", icon: "🔐", duration: "20 Mins", questions: 15, difficulty: "Easy", available: false, gradient: g("#0081FB","#00C6FF") },

  // ══════════════════════════════════════
  // DATA INTERPRETATION (3)
  // ══════════════════════════════════════
  { id: "di-tables", title: "Tables & Caselets", company: "DI Practice", category: "Data Interpretation", tag: "DI", tagColor: "#0058A3", icon: "📋", duration: "30 Mins", questions: 20, difficulty: "Medium", available: false, gradient: g("#0058A3","#003D73") },
  { id: "di-charts", title: "Bar & Pie Charts", company: "DI Practice", category: "Data Interpretation", tag: "DI", tagColor: "#0058A3", icon: "📊", duration: "30 Mins", questions: 20, difficulty: "Easy", available: false, gradient: g("#0058A3","#003D73") },
  { id: "di-mixed", title: "Mixed DI Challenge", company: "DI Practice", category: "Data Interpretation", tag: "DI", tagColor: "#0058A3", icon: "🧮", duration: "45 Mins", questions: 30, difficulty: "Hard", available: false, gradient: g("#0058A3","#003D73") },

  // ══════════════════════════════════════
  // PROGRAMMING BASICS (4)
  // ══════════════════════════════════════
  { id: "prog-c", title: "C Programming Quiz", company: "Programming", category: "Programming Basics", tag: "CODE", tagColor: "#00A4EF", icon: "©️", duration: "30 Mins", questions: 25, difficulty: "Easy", available: false, gradient: g("#00A4EF","#7FBA00") },
  { id: "prog-python", title: "Python Fundamentals", company: "Programming", category: "Programming Basics", tag: "CODE", tagColor: "#00A4EF", icon: "🐍", duration: "30 Mins", questions: 25, difficulty: "Easy", available: false, gradient: g("#00A4EF","#7FBA00") },
  { id: "prog-java", title: "Java OOP Concepts", company: "Programming", category: "Programming Basics", tag: "CODE", tagColor: "#00A4EF", icon: "☕", duration: "35 Mins", questions: 30, difficulty: "Medium", available: false, gradient: g("#00A4EF","#7FBA00") },
  { id: "prog-sql", title: "SQL Queries", company: "Programming", category: "Programming Basics", tag: "CODE", tagColor: "#00A4EF", icon: "🗄️", duration: "30 Mins", questions: 25, difficulty: "Medium", available: false, gradient: g("#00A4EF","#7FBA00") },

  // ══════════════════════════════════════
  // DATA STRUCTURES & ALGOS (4)
  // ══════════════════════════════════════
  { id: "ds-arrays", title: "Arrays & Strings", company: "DSA", category: "Data Structures", tag: "DSA", tagColor: "#F7A500", icon: "📦", duration: "35 Mins", questions: 20, difficulty: "Easy", available: false, gradient: g("#F7A500","#F7001C") },
  { id: "ds-linked", title: "Linked Lists & Stacks", company: "DSA", category: "Data Structures", tag: "DSA", tagColor: "#F7A500", icon: "🔗", duration: "35 Mins", questions: 20, difficulty: "Medium", available: false, gradient: g("#F7A500","#F7001C") },
  { id: "ds-trees", title: "Trees & Graphs", company: "DSA", category: "Data Structures", tag: "DSA", tagColor: "#F7A500", icon: "🌳", duration: "40 Mins", questions: 20, difficulty: "Hard", available: false, gradient: g("#F7A500","#F7001C") },
  { id: "ds-dp", title: "Dynamic Programming", company: "DSA", category: "Data Structures", tag: "DSA", tagColor: "#F7A500", icon: "♻️", duration: "45 Mins", questions: 15, difficulty: "Hard", available: false, gradient: g("#F7A500","#F7001C") },

  // ══════════════════════════════════════
  // SYSTEM DESIGN MOCK (3)
  // ══════════════════════════════════════
  { id: "sd-basics", title: "System Design Basics", company: "SD Practice", category: "System Design Mock", tag: "DESIGN", tagColor: "#555555", icon: "⚙️", duration: "30 Mins", questions: 20, difficulty: "Easy", available: false, gradient: g("#555555","#999999") },
  { id: "sd-hld", title: "High-Level Design", company: "SD Practice", category: "System Design Mock", tag: "DESIGN", tagColor: "#555555", icon: "🏗️", duration: "45 Mins", questions: 25, difficulty: "Medium", available: false, gradient: g("#555555","#999999") },
  { id: "sd-scalability", title: "Scalability & Caching", company: "SD Practice", category: "System Design Mock", tag: "DESIGN", tagColor: "#555555", icon: "📡", duration: "45 Mins", questions: 20, difficulty: "Hard", available: false, gradient: g("#555555","#999999") },

  // ══════════════════════════════════════
  // HR & BEHAVIORAL (3)
  // ══════════════════════════════════════
  { id: "hr-situational", title: "Situational Judgement", company: "HR Practice", category: "HR & Behavioral Mock", tag: "HR", tagColor: "#FF0000", icon: "🎭", duration: "25 Mins", questions: 20, difficulty: "Easy", available: false, gradient: g("#FF0000","#CC0000") },
  { id: "hr-leadership", title: "Leadership Principles", company: "HR Practice", category: "HR & Behavioral Mock", tag: "HR", tagColor: "#FF0000", icon: "👔", duration: "30 Mins", questions: 20, difficulty: "Medium", available: false, gradient: g("#FF0000","#CC0000") },
  { id: "hr-star", title: "STAR Method Practice", company: "HR Practice", category: "HR & Behavioral Mock", tag: "HR", tagColor: "#FF0000", icon: "⭐", duration: "30 Mins", questions: 15, difficulty: "Medium", available: false, gradient: g("#FF0000","#CC0000") },
];

export const DIFF_PILL: Record<Difficulty, { bg: string; color: string }> = {
  Easy: { bg: "rgba(0,168,150,0.12)", color: "var(--success)" },
  Medium: { bg: "rgba(247,165,0,0.15)", color: "#b07800" },
  Hard: { bg: "rgba(240,93,94,0.1)", color: "var(--accent-dark)" },
};
