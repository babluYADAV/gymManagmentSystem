const data = [
  {
    id: 1,
    category: "Strength Training",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80",
    description: "Build muscle and increase strength with expert guidance.",
    programs: [
      {
        id: "st1",
        name: "Bodybuilding",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
        duration: "12 Weeks",
        level: "Advanced"
      },
      {
        id: "st2",
        name: "Power Lifting",
        image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80",
        duration: "10 Weeks",
        level: "Intermediate"
      },
      {
        id: "st3",
        name: "Weight Training",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
        duration: "8 Weeks",
        level: "Beginner"
      }
    ]
  },

  {
    id: 2,
    category: "Cardio Workout",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1200&q=80",
    description: "High-energy cardio sessions to burn fat effectively.",
    programs: [
      {
        id: "cw1",
        name: "HIIT Training",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
        duration: "6 Weeks",
        level: "Advanced"
      },
      {
        id: "cw2",
        name: "Treadmill Running",
        image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80",
        duration: "4 Weeks",
        level: "Beginner"
      },
      {
        id: "cw3",
        name: "Cycling",
        image: "https://images.unsplash.com/photo-1524594154908-eddc4c70c7b3?auto=format&fit=crop&w=800&q=80",
        duration: "5 Weeks",
        level: "Intermediate"
      }
    ]
  },

  {
    id: 3,
    category: "Yoga & Flexibility",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
    description: "Improve flexibility and mental focus with yoga training.",
    programs: [
      {
        id: "yf1",
        name: "Hatha Yoga",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
        duration: "6 Weeks",
        level: "Beginner"
      },
      {
        id: "yf2",
        name: "Power Yoga",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
        duration: "8 Weeks",
        level: "Intermediate"
      },
      {
        id: "yf3",
        name: "Stretch & Mobility",
        image: "https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?auto=format&fit=crop&w=800&q=80",
        duration: "4 Weeks",
        level: "All Levels"
      }
    ]
  },

  {
    id: 4,
    category: "Personal Training",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80",
    description: "One-on-one customized training programs.",
    programs: [
      {
        id: "pt1",
        name: "1-on-1 Coaching",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
        duration: "Monthly",
        level: "All Levels"
      },
      {
        id: "pt2",
        name: "Online Coaching",
        image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
        duration: "8 Weeks",
        level: "All Levels"
      }
    ]
  },

  {
    id: 5,
    category: "CrossFit",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    description: "High-intensity workouts for strength and endurance.",
    programs: [
      {
        id: "cf1",
        name: "CrossFit Beginner",
        image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80",
        duration: "6 Weeks",
        level: "Beginner"
      },
      {
        id: "cf2",
        name: "CrossFit Pro",
        image: "https://images.unsplash.com/photo-1549570652-97324981a6fd?auto=format&fit=crop&w=800&q=80",
        duration: "10 Weeks",
        level: "Advanced"
      }
    ]
  },

  {
    id: 6,
    category: "Nutrition Planning",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    description: "Personalized meal plans for optimal performance.",
    programs: [
      {
        id: "np1",
        name: "Weight Loss Diet",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        duration: "6 Weeks",
        level: "All Levels"
      },
      {
        id: "np2",
        name: "Muscle Gain Diet",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
        duration: "8 Weeks",
        level: "Intermediate"
      }
    ]
  }
];

export default data;
