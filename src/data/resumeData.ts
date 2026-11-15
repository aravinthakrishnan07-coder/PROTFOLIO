export interface SkillEntry {
  id: string;
  name: string;
  category: 'programming' | 'tools' | 'soft' | 'languages';
  categoryLabel: string;
  proficiencyNote: string;
  detail: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  periodOrStatus: string;
  scoreLabel: string;
  scoreValue: string;
  highlights: string[];
}

export interface WorkflowStage {
  id: 'prepare' | 'train' | 'evaluate';
  stepNumber: string;
  title: string;
  resumePoint: string;
  explanation: string;
  codeSnippet: string;
}

export const RESUME_PROFILE = {
  name: 'Aravintha Krishnan R',
  role: 'B.Tech CSE (AI & ML) Student',
  location: 'Bengaluru, Karnataka',
  phone: '8838673603',
  email: 'aravinthakrishnan07@gmail.com',
  resumePdfPath: '/assets/aistudio/Aravintha_Krishnan_Resume_34c9ed19.pdf',
  careerObjective:
    'Second-year B.Tech Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning, seeking an internship opportunity to apply programming fundamentals, strengthen practical machine learning skills, and learn through real-world projects.',
  keyStats: [
    {
      value: '7.6',
      label: 'Current CGPA',
      context: 'Jain University · 2nd Year, 3rd Sem',
    },
    {
      value: '2029',
      label: 'Expected Graduation',
      context: 'B.Tech Computer Science (AI & ML)',
    },
    {
      value: '4',
      label: 'Programming Languages',
      context: 'Python · C · C++ · Java',
    },
    {
      value: '3',
      label: 'Spoken Languages',
      context: 'English · Tamil · Telugu',
    },
  ],
};

export const LINEAR_REGRESSION_PROJECT = {
  title: 'Linear Regression Model',
  domain: 'Machine Learning',
  summary:
    'A foundational supervised machine learning study focused on modeling the relationship between input features and continuous numerical targets using a best-fit linear line.',
  bullets: [
    'Exploring linear regression, a supervised learning technique used to predict numerical values from input data.',
    'Studying how input features relate to an output variable and how a best-fit line is used to make predictions.',
    'Learning the basic workflow of a machine learning model, including preparing data, training the model, and evaluating predictions.',
  ],
  workflowStages: [
    {
      id: 'prepare',
      stepNumber: '01',
      title: 'Preparing Input Data',
      resumePoint:
        'Preparing structured input features and numerical output variables before fitting a model.',
      explanation:
        'Organize paired observations (X input features and y numerical targets), inspect linear trends, and split observations into training and evaluation subsets.',
      codeSnippet: `# Step 01: Prepare input features (X) and target (y)
X = [[1.0], [2.0], [3.0], [4.0], [5.0]]
y = [2.4, 4.1, 5.8, 8.2, 9.7]`,
    },
    {
      id: 'train',
      stepNumber: '02',
      title: 'Training the Best-Fit Line',
      resumePoint:
        'Studying how input features relate to an output variable and how a best-fit line (y = mx + b) is fitted.',
      explanation:
        'Compute the slope (m) and intercept (b) by minimizing the sum of squared vertical residuals between observed targets and predicted line values.',
      codeSnippet: `# Step 02: Fit linear parameters (slope m, intercept b)
mean_x = sum(x[0] for x in X) / len(X)
mean_y = sum(y) / len(y)
slope = sum((x[0] - mean_x) * (yi - mean_y) for x, yi in zip(X, y)) / \\
        sum((x[0] - mean_x) ** 2 for x in X)
intercept = mean_y - slope * mean_x`,
    },
    {
      id: 'evaluate',
      stepNumber: '03',
      title: 'Evaluating Predictions',
      resumePoint:
        'Evaluating numerical predictions against actual values to measure model fit and error.',
      explanation:
        'Generate predictions on unseen or validation points and quantify accuracy using Mean Squared Error (MSE) and coefficient of determination (R²).',
      codeSnippet: `# Step 03: Predict numerical output and evaluate error
predictions = [slope * x[0] + intercept for x in X]
mse = sum((yi - pi) ** 2 for yi, pi in zip(y, predictions)) / len(y)`,
    },
  ] satisfies WorkflowStage[],
};

export const SKILLS_LIST: SkillEntry[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    categoryLabel: 'Programming Language',
    proficiencyNote: 'Core AI & ML Track',
    detail:
      'Primary language used for exploring supervised machine learning workflows, data preparation, and linear regression modeling.',
  },
  {
    id: 'c',
    name: 'C',
    category: 'programming',
    categoryLabel: 'Programming Language',
    proficiencyNote: 'Core Fundamentals',
    detail:
      'Structured programming, memory fundamentals, control flow, and core algorithmic problem-solving in B.Tech CSE coursework.',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'programming',
    categoryLabel: 'Programming Language',
    proficiencyNote: 'Object-Oriented & DSA',
    detail:
      'Object-oriented concepts, data structures, and foundational problem-solving exercises.',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'programming',
    categoryLabel: 'Programming Language',
    proficiencyNote: 'Intermediate',
    detail:
      'Intermediate proficiency in object-oriented design, classes, inheritance, and structured application logic.',
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    category: 'tools',
    categoryLabel: 'Development Tool',
    proficiencyNote: 'Primary IDE',
    detail:
      'Daily coding environment for Python scripts, C/C++ builds, Java modules, and debugging workflows.',
  },
  {
    id: 'problem-solving',
    name: 'Problem-solving',
    category: 'soft',
    categoryLabel: 'Soft Skill',
    proficiencyNote: 'Analytical Thinking',
    detail:
      'Breaking complex programming and mathematical problems into clear, testable steps.',
  },
  {
    id: 'teamwork',
    name: 'Teamwork',
    category: 'soft',
    categoryLabel: 'Soft Skill',
    proficiencyNote: 'Collaboration',
    detail:
      'Collaborating effectively with peers on coursework, lab exercises, and shared learning goals.',
  },
  {
    id: 'adaptability',
    name: 'Adaptability',
    category: 'soft',
    categoryLabel: 'Soft Skill',
    proficiencyNote: 'Growth Mindset',
    detail:
      'Adjusting quickly to new programming paradigms, tools, and project requirements.',
  },
  {
    id: 'time-management',
    name: 'Time Management',
    category: 'soft',
    categoryLabel: 'Soft Skill',
    proficiencyNote: 'Academic Discipline',
    detail:
      'Balancing B.Tech semester coursework, coding practice, and practical ML exploration.',
  },
  {
    id: 'quick-learning',
    name: 'Quick Learning',
    category: 'soft',
    categoryLabel: 'Soft Skill',
    proficiencyNote: 'Continuous Study',
    detail:
      'Rapidly picking up foundational machine learning concepts and applying them in code.',
  },
  {
    id: 'english',
    name: 'English',
    category: 'languages',
    categoryLabel: 'Spoken Language',
    proficiencyNote: 'Technical & Academic',
    detail: 'Fluent in academic writing, technical documentation, and team communication.',
  },
  {
    id: 'tamil',
    name: 'Tamil',
    category: 'languages',
    categoryLabel: 'Spoken Language',
    proficiencyNote: 'Fluent',
    detail: 'Fluent verbal and interpersonal communication.',
  },
  {
    id: 'telugu',
    name: 'Telugu',
    category: 'languages',
    categoryLabel: 'Spoken Language',
    proficiencyNote: 'Fluent',
    detail: 'Fluent verbal and interpersonal communication.',
  },
];

export const EDUCATION_LIST: EducationEntry[] = [
  {
    id: 'jain-university',
    institution: 'Jain University',
    credential: 'B.Tech, Computer Science Engineering (AI & ML)',
    periodOrStatus: '2nd Year, 3rd Semester · Expected Graduation: 2029',
    scoreLabel: 'CGPA',
    scoreValue: '7.6',
    highlights: [
      'Specializing in Artificial Intelligence and Machine Learning.',
      'Building core proficiency across Python, C, C++, and intermediate Java.',
      'Exploring supervised learning workflows through practical linear regression models.',
    ],
  },
  {
    id: 'class-xii',
    institution: 'Higher Secondary Education',
    credential: 'Class XII',
    periodOrStatus: 'Completed',
    scoreLabel: 'Aggregate',
    scoreValue: '75%',
    highlights: ['Completed senior secondary schooling prior to B.Tech enrollment.'],
  },
  {
    id: 'class-x',
    institution: 'Secondary Education',
    credential: 'Class X',
    periodOrStatus: 'Completed',
    scoreLabel: 'Aggregate',
    scoreValue: '75%',
    highlights: ['Completed secondary board certification.'],
  },
];
