const courses = [
    {
        "_id": "67ed959dba3d51f9974e1cc6",
        "title": "Introduction to Algebra",
        "description": "A comprehensive introduction to algebraic concepts for middle school students. This course covers basic algebraic expressions, equations, and problem-solving strategies.",
        "subject": "Mathematics",
        "gradeLevel": "Middle School",
        "price": 49.99,
        "content": "This course includes:\n- Basic algebraic expressions\n- Solving linear equations\n- Introduction to variables\n- Word problems\n- Basic graphing\n- Practice exercises and quizzes",
        "learningObjectives": [
            "Understand and use algebraic expressions",
            "Solve basic linear equations",
            "Apply algebraic concepts to real-world problems",
            "Develop problem-solving skills"
        ],
        "materials": [
            "Graph paper",
            "Scientific calculator",
            "Course workbook (PDF included)",
            "Online practice problems"
        ],
        "duration": "8 weeks",
        "tags": [
            "algebra",
            "mathematics",
            "middle school",
            "equations",
            "problem solving"
        ],
        "rating": 0,
        "length": 3
    },
    {
        "_id": "67ed959dba3d51f9974e1cc7",
        "title": "Creative Writing Workshop",
        "description": "An engaging course designed to help students develop their creative writing skills through various exercises and projects.",
        "subject": "English",
        "gradeLevel": "High School",
        "price": 39.99,
        "content": "Course modules include:\n- Character development\n- Plot structure\n- Setting description\n- Dialogue writing\n- Short story creation\n- Peer review sessions",
        "learningObjectives": [
            "Create well-developed characters",
            "Structure engaging plots",
            "Write effective dialogue",
            "Develop descriptive writing skills",
            "Receive and apply feedback"
        ],
        "materials": [
            "Writing journal",
            "Course handbook",
            "Writing prompts",
            "Peer review guidelines"
        ],
        "duration": "10 weeks",
        "tags": [
            "writing",
            "creative writing",
            "english",
            "storytelling",
            "literature"
        ],
        "rating": 0,
        "length": 3
    },
    {
        "_id": "67ed959dba3d51f9974e1cc8",
        "title": "World History: Ancient Civilizations",
        "description": "Explore the fascinating world of ancient civilizations, from Egypt to Rome, and understand their impact on modern society.",
        "subject": "History",
        "gradeLevel": "High School",
        "price": 59.99,
        "content": "Topics covered:\n- Ancient Egypt\n- Greek civilization\n- Roman Empire\n- Ancient China\n- Mesopotamia\n- Cultural comparisons",
        "learningObjectives": [
            "Understand major ancient civilizations",
            "Analyze historical events and their impact",
            "Compare different cultural developments",
            "Evaluate historical sources"
        ],
        "materials": [
            "Digital textbook",
            "Historical maps",
            "Primary source documents",
            "Interactive timeline"
        ],
        "duration": "12 weeks",
        "tags": [
            "history",
            "ancient civilizations",
            "world history",
            "social studies",
            "archaeology"
        ],
        "rating": 0,
        "length": 5
    },
    {
        "_id": "67ed959dba3d51f9974e1cc9",
        "title": "Introduction to Physics",
        "description": "A hands-on introduction to basic physics concepts through experiments and real-world applications.",
        "subject": "Science",
        "gradeLevel": "High School",
        "price": 69.99,
        "content": "Course content:\n- Newton's Laws\n- Energy and work\n- Waves and sound\n- Electricity basics\n- Simple machines\n- Lab experiments",
        "learningObjectives": [
            "Apply Newton's Laws to real situations",
            "Understand energy conservation",
            "Analyze wave properties",
            "Conduct basic physics experiments"
        ],
        "materials": [
            "Lab equipment list",
            "Physics simulation software",
            "Measurement tools",
            "Safety guidelines"
        ],
        "duration": "14 weeks",
        "tags": [
            "physics",
            "science",
            "experiments",
            "STEM",
            "laboratory"
        ],
        "rating": 0,
        "length": 8
    },
    {
        "_id": "67ed959dba3d51f9974e1cca",
        "title": "Spanish Language Fundamentals",
        "description": "Learn the basics of Spanish language through interactive lessons and cultural immersion.",
        "subject": "Languages",
        "gradeLevel": "High School",
        "price": 79.99,
        "content": "Course structure:\n- Basic vocabulary\n- Grammar fundamentals\n- Pronunciation practice\n- Cultural context\n- Conversation practice\n- Interactive exercises",
        "learningObjectives": [
            "Master basic Spanish vocabulary",
            "Understand fundamental grammar",
            "Develop speaking confidence",
            "Learn about Spanish-speaking cultures"
        ],
        "materials": [
            "Textbook and workbook",
            "Audio recordings",
            "Flashcards",
            "Online practice platform"
        ],
        "duration": "16 weeks",
        "tags": [
            "spanish",
            "languages",
            "foreign language",
            "culture",
            "communication"
        ],
        "rating": 0,
        "length": 5
    },
    {
        "_id": "67ed959dba3d51f9974e1ccb",
        "title": "Chemistry Basics",
        "description": "An introductory course to fundamental chemistry concepts, perfect for students beginning their scientific journey.",
        "subject": "Science",
        "gradeLevel": "Middle School",
        "price": 54.99,
        "content": "Course modules include:\n- Atomic structure\n- Periodic table\n- Chemical bonds\n- Acids and bases\n- Chemical reactions\n- Safety in the lab",
        "learningObjectives": [
            "Understand atomic structure",
            "Master periodic table basics",
            "Learn about chemical bonding",
            "Practice safe laboratory procedures"
        ],
        "materials": [
            "Chemistry set",
            "Safety goggles",
            "Lab manual",
            "Periodic table chart"
        ],
        "duration": "10 weeks",
        "tags": [
            "chemistry",
            "science",
            "middle school",
            "laboratory",
            "STEM"
        ],
        "rating": 0,
        "length": 9
    },
    {
        "_id": "67ed959dba3d51f9974e1ccc",
        "title": "Art History: Modern Masters",
        "description": "Explore the world of modern art from Impressionism to Contemporary movements, with a focus on major artists and their works.",
        "subject": "Art",
        "gradeLevel": "High School",
        "price": 44.99,
        "content": "Topics covered:\n- Impressionism\n- Post-Impressionism\n- Modernism\n- Abstract Expressionism\n- Pop Art\n- Contemporary movements",
        "learningObjectives": [
            "Identify major art movements",
            "Analyze artistic techniques",
            "Understand cultural context",
            "Develop art appreciation skills"
        ],
        "materials": [
            "Digital art gallery access",
            "Art history textbook",
            "Virtual museum tours",
            "Study guides"
        ],
        "duration": "12 weeks",
        "tags": [
            "art",
            "art history",
            "modern art",
            "culture",
            "visual arts"
        ],
        "rating": 0,
        "length": 10
    },
    {
        "_id": "67ed959dba3d51f9974e1ccd",
        "title": "Computer Science Fundamentals",
        "description": "An introduction to computer science concepts and basic programming using Python.",
        "subject": "Computer Science",
        "gradeLevel": "High School",
        "price": 64.99,
        "content": "Course content:\n- Basic programming concepts\n- Python syntax\n- Algorithms and logic\n- Data structures\n- Problem-solving strategies\n- Project-based learning",
        "learningObjectives": [
            "Write basic Python programs",
            "Understand programming logic",
            "Solve computational problems",
            "Develop algorithmic thinking"
        ],
        "materials": [
            "Python development environment",
            "Online coding platform access",
            "Programming exercises",
            "Project templates"
        ],
        "duration": "14 weeks",
        "tags": [
            "programming",
            "computer science",
            "python",
            "coding",
            "STEM"
        ],
        "rating": 0,
        "length": 3
    },
    {
        "_id": "67ed959dba3d51f9974e1cce",
        "title": "Environmental Science",
        "description": "Study the natural world and human impact on the environment through hands-on activities and field studies.",
        "subject": "Science",
        "gradeLevel": "High School",
        "price": 59.99,
        "content": "Topics include:\n- Ecosystems\n- Climate change\n- Renewable energy\n- Biodiversity\n- Environmental policy\n- Field research methods",
        "learningObjectives": [
            "Understand ecosystem dynamics",
            "Analyze environmental issues",
            "Evaluate sustainability practices",
            "Conduct environmental research"
        ],
        "materials": [
            "Field guide",
            "Data collection tools",
            "Environmental monitoring kit",
            "Research journal"
        ],
        "duration": "16 weeks",
        "tags": [
            "environmental science",
            "ecology",
            "sustainability",
            "field studies",
            "research"
        ],
        "rating": 0,
        "length": 20
    },
    {
        "_id": "67ed959dba3d51f9974e1ccf",
        "title": "Music Theory and Composition",
        "description": "Learn the fundamentals of music theory and develop your composition skills through practical exercises.",
        "subject": "Music",
        "gradeLevel": "High School",
        "price": 49.99,
        "content": "Course structure:\n- Basic notation\n- Scales and modes\n- Harmony and chords\n- Rhythm and meter\n- Melody writing\n- Composition techniques",
        "learningObjectives": [
            "Read and write music notation",
            "Understand harmonic progressions",
            "Create original compositions",
            "Analyze musical structure"
        ],
        "materials": [
            "Music theory workbook",
            "Notation software",
            "Audio examples",
            "Practice exercises"
        ],
        "duration": "12 weeks",
        "tags": [
            "music",
            "music theory",
            "composition",
            "harmony",
            "performance"
        ],
        "rating": 0,
        "length": 12
    },
    {
        "_id": "67ed959dba3d51f9974e1cd0",
        "title": "Public Speaking and Debate",
        "description": "Develop confidence in public speaking and learn the art of debate through structured practice and feedback.",
        "subject": "Communication",
        "gradeLevel": "High School",
        "price": 54.99,
        "content": "Modules include:\n- Speech preparation\n- Delivery techniques\n- Debate formats\n- Argument construction\n- Body language\n- Audience engagement",
        "learningObjectives": [
            "Deliver effective presentations",
            "Construct logical arguments",
            "Master debate techniques",
            "Develop confidence in speaking"
        ],
        "materials": [
            "Public speaking guide",
            "Debate handbook",
            "Video recording equipment",
            "Practice scenarios"
        ],
        "duration": "10 weeks",
        "tags": [
            "public speaking",
            "debate",
            "communication",
            "presentation",
            "leadership"
        ],
        "rating": 0,
        "length": 8
    },
    {
        "_id": "67ed959dba3d51f9974e1cd1",
        "title": "World Geography",
        "description": "Explore the physical and human geography of our world through interactive maps and case studies.",
        "subject": "Geography",
        "gradeLevel": "Middle School",
        "price": 49.99,
        "content": "Topics covered:\n- Physical geography\n- Human geography\n- Climate zones\n- Cultural regions\n- Economic systems\n- Global issues",
        "learningObjectives": [
            "Understand geographic concepts",
            "Analyze global patterns",
            "Interpret maps and data",
            "Evaluate human-environment interactions"
        ],
        "materials": [
            "World atlas",
            "Interactive maps",
            "Case study materials",
            "Geography tools"
        ],
        "duration": "12 weeks",
        "tags": [
            "geography",
            "world studies",
            "maps",
            "culture",
            "global studies"
        ],
        "rating": 0,
        "length": 8
    },
    {
        "_id": "67ed959dba3d51f9974e1cd2",
        "title": "Introduction to Psychology",
        "description": "An engaging introduction to basic psychological concepts and human behavior.",
        "subject": "Psychology",
        "gradeLevel": "High School",
        "price": 59.99,
        "content": "Course content:\n- Brain and behavior\n- Learning and memory\n- Personality theories\n- Social psychology\n- Developmental psychology\n- Research methods",
        "learningObjectives": [
            "Understand basic psychological concepts",
            "Apply psychology to daily life",
            "Analyze human behavior",
            "Evaluate psychological research"
        ],
        "materials": [
            "Psychology textbook",
            "Case studies",
            "Research articles",
            "Interactive activities"
        ],
        "duration": "14 weeks",
        "tags": [
            "psychology",
            "behavior",
            "mental health",
            "research",
            "human development"
        ],
        "rating": 0,
        "length": 52
    }
]

module.exports = courses;
