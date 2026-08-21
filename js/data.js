const guides = [
    {
        id: "burns",
        title: "Burns",
        icon: "bi-fire",
        category: "Injuries",
        urgency: "Act promptly",
        description: "General guidance for minor heat, chemical, or electrical burns.",
        overview:
            "Burns can damage skin and deeper tissue. Ensure the area is safe and obtain professional assessment for serious, chemical, electrical, or extensive burns.",
        steps: [
            "Move away from the heat source only if it is safe to do so.",
            "Cool the affected area gently with cool running water.",
            "Remove nearby jewelry or loose items unless stuck to the skin.",
            "Cover loosely with a clean, non-fluffy dressing and seek advice as appropriate."
        ],
        avoid: [
            "Do not apply ice, butter, toothpaste, or creams.",
            "Do not remove material stuck to the skin."
        ],
        urgent: [
            "The burn is large, deep, chemical, electrical, or affects the face, hands, feet, joints, or genitals.",
            "There is difficulty breathing, smoke exposure, or signs of shock."
        ],
        related: ["cuts", "electric-shock"]
    },

    {
        id: "cuts",
        title: "Cuts & Wounds",
        icon: "bi-bandaid",
        category: "Injuries",
        urgency: "Assess severity",
        description: "General information for everyday cuts and wounds.",
        overview:
            "Wounds vary in severity. Prioritize your safety and get professional help for deep, contaminated, or persistent bleeding wounds.",
        steps: [
            "Wash your hands if possible and ensure the scene is safe.",
            "Apply gentle, direct pressure using a clean cloth or dressing.",
            "When bleeding is controlled, protect the wound with a clean covering.",
            "Seek clinical advice for wound assessment and tetanus concerns."
        ],
        avoid: [
            "Do not probe a wound or remove deeply embedded objects.",
            "Do not use unclean materials directly on the wound."
        ],
        urgent: [
            "Bleeding does not stop, is heavy, or spurts.",
            "The wound is deep, gaping, contaminated, or caused by an animal or human bite."
        ],
        related: ["bleeding", "fractures"]
    },

    {
        id: "bleeding",
        title: "Bleeding",
        icon: "bi-droplet-half",
        category: "Urgent care",
        urgency: "Urgent attention",
        description: "General information on responding to visible bleeding.",
        overview:
            "Heavy bleeding may be life-threatening. Contact local emergency services immediately when bleeding is severe or will not stop.",
        steps: [
            "Make sure it is safe to approach and use protective barriers when available.",
            "Apply firm, direct pressure with a clean dressing.",
            "Keep pressure steady and follow emergency dispatcher instructions.",
            "Help the person stay still and monitor them while waiting for professionals."
        ],
        avoid: [
            "Do not repeatedly lift the dressing to check the wound.",
            "Do not remove an embedded object."
        ],
        urgent: [
            "Bleeding is severe, persistent, spurting, or associated with weakness or fainting.",
            "There is an embedded object or a serious injury."
        ],
        related: ["cuts", "fainting"]
    },

    {
        id: "choking",
        title: "Choking",
        icon: "bi-lungs",
        category: "Breathing",
        urgency: "Call for help",
        description: "Recognize choking and seek urgent emergency support.",
        overview:
            "Choking can quickly prevent normal breathing. Call local emergency services if the person cannot breathe, speak, or cough effectively.",
        steps: [
            "Encourage coughing if the person can cough or speak.",
            "If they cannot breathe effectively, call local emergency services.",
            "Provide age-appropriate first-aid measures only if trained, or follow dispatcher instructions.",
            "If they become unresponsive, seek immediate emergency assistance and follow professional guidance."
        ],
        avoid: [
            "Do not give food or drink.",
            "Do not blindly sweep inside the mouth."
        ],
        urgent: [
            "The person cannot breathe, speak, or cough, or becomes unresponsive."
        ],
        related: ["fainting", "poisoning"]
    },

    {
        id: "fainting",
        title: "Fainting",
        icon: "bi-activity",
        category: "Urgent care",
        urgency: "Monitor closely",
        description: "General guidance when someone loses consciousness or feels faint.",
        overview:
            "Fainting may have many causes. A loss of consciousness always deserves careful assessment, especially when symptoms are new or severe.",
        steps: [
            "Check the area is safe and assess responsiveness.",
            "Call emergency services if they are unresponsive or have concerning symptoms.",
            "If safe and appropriate, help them lie down and keep them comfortable.",
            "Monitor breathing and follow emergency dispatcher guidance."
        ],
        avoid: [
            "Do not leave an unconscious person alone.",
            "Do not give food or drink until fully alert."
        ],
        urgent: [
            "They do not quickly regain consciousness, have chest pain, breathing difficulty, injury, seizure-like activity, or repeated fainting."
        ],
        related: ["bleeding", "heat"]
    },

    {
        id: "fractures",
        title: "Fractures & Injuries",
        icon: "bi-person-arms-up",
        category: "Injuries",
        urgency: "Avoid movement",
        description: "General safety information for suspected fractures and injuries.",
        overview:
            "A suspected fracture or serious injury needs professional assessment. Avoid unnecessary movement and protect the area from further harm.",
        steps: [
            "Make the area safe and assess for serious bleeding or danger.",
            "Encourage the person to remain still and support the injured area.",
            "Avoid moving them unless there is immediate danger.",
            "Seek urgent medical assessment, especially after significant trauma."
        ],
        avoid: [
            "Do not try to straighten a limb or push a bone back.",
            "Do not move someone with possible head, neck, or back injury unless necessary for safety."
        ],
        urgent: [
            "There is deformity, severe pain, numbness, open wound, or injury to head, neck, spine, pelvis, or thigh."
        ],
        related: ["cuts", "bleeding"]
    },

    {
        id: "heat",
        title: "Heat-Related Emergencies",
        icon: "bi-sun",
        category: "Environment",
        urgency: "Cool safely",
        description: "Recognize heat-related illness and seek professional help when concerned.",
        overview:
            "Heat illness can worsen quickly. Move to a cooler place when safe and seek urgent help for confusion, collapse, seizures, or worsening symptoms.",
        steps: [
            "Move to a cool, shaded, or air-conditioned place if safe.",
            "Encourage rest and loosen excess clothing.",
            "Cool the person gradually with cool cloths or air circulation.",
            "Contact professional help for severe symptoms or concerns."
        ],
        avoid: [
            "Do not assume symptoms will resolve without monitoring.",
            "Do not give drinks to someone who is confused or not fully alert."
        ],
        urgent: [
            "Confusion, collapse, seizure, very hot skin, vomiting, or symptoms that worsen."
        ],
        related: ["fainting", "poisoning"]
    },

    {
        id: "electric-shock",
        title: "Electric Shock",
        icon: "bi-lightning-charge",
        category: "Environment",
        urgency: "Do not touch source",
        description: "Safety information following an electrical incident.",
        overview:
            "Electrical injuries may cause invisible internal harm. Treat every electrical incident seriously and seek professional assessment.",
        steps: [
            "Do not touch the person until the electrical source is safely disconnected.",
            "Call emergency services for serious shock, burns, collapse, or high-voltage exposure.",
            "Once safe, check responsiveness and breathing.",
            "Follow professional instructions and arrange medical assessment."
        ],
        avoid: [
            "Do not touch a person still in contact with electricity.",
            "Do not approach downed power lines."
        ],
        urgent: [
            "Any loss of consciousness, burn, chest symptoms, ongoing pain, or high-voltage exposure."
        ],
        related: ["burns", "fainting"]
    },

    {
        id: "poisoning",
        title: "Poisoning Information",
        icon: "bi-capsule",
        category: "Urgent care",
        urgency: "Get expert advice",
        description: "General next steps after a suspected poisoning or exposure.",
        overview:
            "Suspected poisoning needs prompt expert guidance. Contact local poison-information or emergency services; keep product details available.",
        steps: [
            "Move away from the source if it is safe to do so.",
            "Contact appropriate local poison-information or emergency services promptly.",
            "Keep the container, label, or details of the substance available.",
            "Follow professional instructions exactly."
        ],
        avoid: [
            "Do not induce vomiting unless a professional tells you to.",
            "Do not give anything by mouth to an unconscious or confused person."
        ],
        urgent: [
            "Breathing difficulty, loss of consciousness, seizure, severe pain, or a harmful substance exposure."
        ],
        related: ["choking", "heat"]
    },

    {
        id: "other",
        title: "Other Emergency Situations",
        icon: "bi-life-preserver",
        category: "General",
        urgency: "When unsure, seek help",
        description: "A starting point for urgent situations not listed elsewhere.",
        overview:
            "If you are unsure how serious a situation is, it is safer to seek qualified medical or emergency advice promptly.",
        steps: [
            "Ensure you are not entering danger.",
            "Assess if there is an immediate threat to life or safety.",
            "Contact local emergency services for serious or uncertain situations.",
            "Stay with the person if safe and follow professional instructions."
        ],
        avoid: [
            "Do not delay calling for help because you are uncertain.",
            "Do not put yourself in danger."
        ],
        urgent: [
            "There is any immediate danger to life, breathing, consciousness, severe pain, or serious injury."
        ],
        related: ["bleeding", "fainting"]
    }
];

const checklistItems = [
    "Keep emergency contact information accessible",
    "Know the location of nearby medical facilities",
    "Keep basic emergency supplies available",
    "Learn basic emergency response principles",
    "Keep important medical information accessible"
];
