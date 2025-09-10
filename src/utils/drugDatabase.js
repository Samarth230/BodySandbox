// Comprehensive Drug Database for Simulation Platform
// Contains detailed pharmaceutical information for simulation and analysis

export const COMPREHENSIVE_DRUG_DATABASE = [
  // Cardiovascular System
  {
    id: 'aspirin',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    class: 'NSAID/Antiplatelet',
    therapeuticArea: 'Cardiology',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Pain Relief', 'Fever Reduction', 'Cardiovascular Protection', 'Stroke Prevention'],
    mechanismOfAction: 'Aspirin irreversibly inhibits cyclooxygenase-1 and 2 (COX-1 and COX-2) enzymes, reducing prostaglandin synthesis. At low doses, it preferentially inhibits COX-1 in platelets, preventing thromboxane A2 formation and reducing platelet aggregation.',
    targetOrgans: ['heart', 'brain', 'stomach', 'blood-vessels'],
    dosageRange: { min: 81, max: 650, unit: 'mg' },
    commonDosage: 325,
    sideEffects: ['stomach irritation', 'bleeding risk', 'tinnitus', 'heartburn'],
    contraindications: ['bleeding disorders', 'stomach ulcers', 'severe kidney disease', 'children with viral infections'],
    organEffects: ['Heart', 'Brain', 'Stomach', 'Blood Vessels'],
    pharmacokinetics: {
      halfLife: '2-3 hours',
      bioavailability: '80-100%',
      proteinBinding: '80-90%',
      metabolism: 'Hepatic hydrolysis'
    },
    interactions: ['Warfarin', 'Methotrexate', 'ACE inhibitors', 'Alcohol'],
    dosageInfo: [
      { indication: 'Pain/Fever', dose: '325-650mg q4h', route: 'Oral' },
      { indication: 'Cardiovascular Protection', dose: '81mg once daily', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Rapid',
      distributionPattern: 'Systemic',
      peakEffectTime: '1-2 hours',
      eliminationRoute: 'Hepatic/Renal'
    }
  },

  {
    id: 'lisinopril',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    class: 'ACE Inhibitor',
    therapeuticArea: 'Cardiology',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Hypertension', 'Heart Failure', 'Post-MI', 'Diabetic Nephropathy'],
    mechanismOfAction: 'Lisinopril inhibits angiotensin-converting enzyme (ACE), preventing the conversion of angiotensin I to angiotensin II. This results in decreased vasoconstriction and aldosterone secretion, leading to reduced blood pressure and improved cardiac function.',
    targetOrgans: ['heart', 'kidneys', 'blood-vessels'],
    dosageRange: { min: 5, max: 40, unit: 'mg' },
    commonDosage: 10,
    sideEffects: ['dry cough', 'dizziness', 'fatigue', 'hyperkalemia'],
    contraindications: ['pregnancy', 'angioedema history', 'kidney artery stenosis'],
    organEffects: ['Heart', 'Kidneys', 'Blood Vessels'],
    pharmacokinetics: {
      halfLife: '12 hours',
      bioavailability: '25%',
      proteinBinding: 'Low',
      metabolism: 'Not metabolized'
    },
    interactions: ['Potassium supplements', 'NSAIDs', 'Lithium', 'Diuretics'],
    dosageInfo: [
      { indication: 'Hypertension', dose: '10-40mg once daily', route: 'Oral' },
      { indication: 'Heart Failure', dose: '5-20mg once daily', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Moderate',
      distributionPattern: 'Systemic',
      peakEffectTime: '6-8 hours',
      eliminationRoute: 'Renal'
    }
  },

  {
    id: 'atorvastatin',
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    class: 'HMG-CoA Reductase Inhibitor',
    therapeuticArea: 'Cardiology',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Hypercholesterolemia', 'Atherosclerosis', 'Primary Prevention', 'Familial Hypercholesterolemia'],
    mechanismOfAction: 'Atorvastatin competitively inhibits HMG-CoA reductase, the rate-limiting enzyme in cholesterol biosynthesis. This leads to decreased cholesterol synthesis, upregulation of LDL receptors, and increased clearance of LDL cholesterol from plasma.',
    targetOrgans: ['liver', 'heart', 'blood-vessels'],
    dosageRange: { min: 10, max: 80, unit: 'mg' },
    commonDosage: 20,
    sideEffects: ['muscle pain', 'liver enzyme elevation', 'headache', 'nausea'],
    contraindications: ['active liver disease', 'pregnancy', 'breastfeeding'],
    organEffects: ['Liver', 'Blood Vessels', 'Heart'],
    pharmacokinetics: {
      halfLife: '14 hours',
      bioavailability: '14%',
      proteinBinding: '98%',
      metabolism: 'CYP3A4'
    },
    interactions: ['Cyclosporine', 'Gemfibrozil', 'Niacin', 'Warfarin'],
    dosageInfo: [
      { indication: 'Hypercholesterolemia', dose: '10-80mg once daily', route: 'Oral' },
      { indication: 'Primary Prevention', dose: '20-40mg once daily', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Rapid',
      distributionPattern: 'Hepatic',
      peakEffectTime: '1-2 hours',
      eliminationRoute: 'Hepatic'
    }
  },

  {
    id: 'warfarin',
    name: 'Warfarin',
    genericName: 'Warfarin Sodium',
    class: 'Anticoagulant',
    therapeuticArea: 'Cardiology',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Atrial Fibrillation', 'DVT', 'PE', 'Mechanical Heart Valves'],
    mechanismOfAction: 'Warfarin inhibits vitamin K epoxide reductase complex subunit 1 (VKORC1), preventing the regeneration of vitamin K. This impairs the synthesis of vitamin K-dependent clotting factors (II, VII, IX, X), prolonging coagulation times.',
    targetOrgans: ['liver', 'blood', 'heart'],
    dosageRange: { min: 1, max: 15, unit: 'mg' },
    commonDosage: 5,
    sideEffects: ['bleeding', 'bruising', 'hair loss'],
    contraindications: ['active bleeding', 'pregnancy', 'severe liver disease'],
    organEffects: ['Liver', 'Blood', 'Vascular System'],
    pharmacokinetics: {
      halfLife: '36-42 hours',
      bioavailability: '100%',
      proteinBinding: '99%',
      metabolism: 'CYP2C9, CYP1A2'
    },
    interactions: ['Aspirin', 'Antibiotics', 'Amiodarone', 'Cranberry'],
    dosageInfo: [
      { indication: 'Atrial Fibrillation', dose: '2-10mg daily', route: 'Oral' },
      { indication: 'DVT/PE', dose: '5-10mg daily', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Complete',
      distributionPattern: 'Plasma',
      peakEffectTime: '72-96 hours',
      eliminationRoute: 'Hepatic'
    }
  },

  // Endocrine System
  {
    id: 'metformin',
    name: 'Metformin',
    genericName: 'Metformin HCl',
    class: 'Biguanide',
    therapeuticArea: 'Endocrinology',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Type 2 Diabetes', 'PCOS', 'Prediabetes', 'Insulin Resistance'],
    mechanismOfAction: 'Metformin decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity by increasing peripheral glucose uptake and utilization. It activates AMP-activated protein kinase (AMPK), a key cellular energy sensor.',
    targetOrgans: ['liver', 'pancreas', 'intestines'],
    dosageRange: { min: 500, max: 2000, unit: 'mg' },
    commonDosage: 1000,
    sideEffects: ['nausea', 'diarrhea', 'metallic taste'],
    contraindications: ['kidney disease', 'liver disease'],
    organEffects: ['Liver', 'Intestines', 'Muscle', 'Adipose Tissue'],
    pharmacokinetics: {
      halfLife: '4-6 hours',
      bioavailability: '50-60%',
      proteinBinding: 'Negligible',
      metabolism: 'Not metabolized'
    },
    interactions: ['Contrast agents', 'Alcohol', 'Cimetidine', 'Furosemide'],
    dosageInfo: [
      { indication: 'Type 2 Diabetes', dose: '500-2000mg daily', route: 'Oral' },
      { indication: 'PCOS', dose: '500-1500mg daily', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Moderate',
      distributionPattern: 'Tissue-specific',
      peakEffectTime: '2-3 hours',
      eliminationRoute: 'Renal'
    }
  },

  {
    id: 'insulin-glargine',
    name: 'Insulin Glargine',
    genericName: 'Insulin Glargine',
    class: 'Long-Acting Insulin',
    therapeuticArea: 'Endocrinology',
    administration: 'injection',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Type 1 Diabetes', 'Type 2 Diabetes'],
    mechanismOfAction: 'Insulin glargine is a long-acting insulin analog that binds to insulin receptors and promotes glucose uptake by cells, particularly in muscle and adipose tissue, while inhibiting hepatic glucose production.',
    targetOrgans: ['pancreas', 'liver', 'muscle'],
    dosageRange: { min: 10, max: 100, unit: 'units' },
    commonDosage: 20,
    sideEffects: ['hypoglycemia', 'injection site reactions', 'weight gain'],
    contraindications: ['hypoglycemia', 'diabetic ketoacidosis'],
    organEffects: ['Pancreas', 'Liver', 'Muscle', 'Adipose Tissue'],
    pharmacokinetics: {
      halfLife: '12-18 hours',
      bioavailability: '100%',
      proteinBinding: 'Low',
      metabolism: 'Tissue proteases'
    },
    interactions: ['Beta-blockers', 'Alcohol', 'MAOIs', 'Salicylates'],
    dosageInfo: [
      { indication: 'Type 1 Diabetes', dose: '0.4-1 unit/kg daily', route: 'Subcutaneous' },
      { indication: 'Type 2 Diabetes', dose: '10-100 units daily', route: 'Subcutaneous' }
    ],
    simulationData: {
      absorptionRate: 'Slow',
      distributionPattern: 'Systemic',
      peakEffectTime: '6-8 hours',
      eliminationRoute: 'Tissue degradation'
    }
  },

  // Gastrointestinal System
  {
    id: 'omeprazole',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    class: 'Proton Pump Inhibitor',
    therapeuticArea: 'Gastroenterology',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['GERD', 'Peptic Ulcer', 'H. pylori Eradication', 'Zollinger-Ellison Syndrome'],
    mechanismOfAction: 'Omeprazole irreversibly blocks the H+/K+-ATPase enzyme system (proton pump) in gastric parietal cells. This inhibits both basal and stimulated gastric acid secretion, providing sustained acid suppression.',
    targetOrgans: ['stomach', 'esophagus'],
    dosageRange: { min: 20, max: 80, unit: 'mg' },
    commonDosage: 40,
    sideEffects: ['headache', 'nausea', 'diarrhea'],
    contraindications: ['hypersensitivity to PPIs'],
    organEffects: ['Stomach', 'Duodenum', 'Esophagus'],
    pharmacokinetics: {
      halfLife: '0.5-1 hour',
      bioavailability: '35-76%',
      proteinBinding: '95%',
      metabolism: 'CYP2C19, CYP3A4'
    },
    interactions: ['Clopidogrel', 'Warfarin', 'Phenytoin', 'Diazepam'],
    dosageInfo: [
      { indication: 'GERD', dose: '20-40mg once daily', route: 'Oral' },
      { indication: 'Peptic Ulcer', dose: '20mg once daily', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Rapid',
      distributionPattern: 'Gastric-specific',
      peakEffectTime: '1-2 hours',
      eliminationRoute: 'Hepatic'
    }
  },

  {
    id: 'loperamide',
    name: 'Loperamide',
    genericName: 'Loperamide HCl',
    class: 'Antidiarrheal',
    therapeuticArea: 'Gastroenterology',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Acute Diarrhea', 'Chronic Diarrhea', 'IBS'],
    mechanismOfAction: 'Loperamide is an opioid receptor agonist that acts on μ-opioid receptors in the intestinal wall, slowing intestinal motility and increasing water and electrolyte absorption.',
    targetOrgans: ['intestines'],
    dosageRange: { min: 2, max: 16, unit: 'mg' },
    commonDosage: 4,
    sideEffects: ['constipation', 'drowsiness', 'abdominal cramps'],
    contraindications: ['bacterial diarrhea', 'pseudomembranous colitis'],
    organEffects: ['Intestines', 'GI Tract'],
    pharmacokinetics: {
      halfLife: '10-12 hours',
      bioavailability: '0.3%',
      proteinBinding: '97%',
      metabolism: 'CYP3A4, CYP2C8'
    },
    interactions: ['CYP3A4 inhibitors', 'P-glycoprotein inhibitors'],
    dosageInfo: [
      { indication: 'Acute Diarrhea', dose: '4mg initially, then 2mg after each loose stool', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Poor',
      distributionPattern: 'Local GI',
      peakEffectTime: '2-4 hours',
      eliminationRoute: 'Hepatic'
    }
  },

  // Infectious Disease
  {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    class: 'Penicillin Antibiotic',
    therapeuticArea: 'Infectious Disease',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Bacterial Infections', 'Pneumonia', 'UTI', 'Skin Infections'],
    mechanismOfAction: 'Amoxicillin inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs). This disrupts the cross-linking of peptidoglycan chains, leading to bacterial cell lysis and death.',
    targetOrgans: ['gi-tract', 'respiratory', 'urinary'],
    dosageRange: { min: 250, max: 875, unit: 'mg' },
    commonDosage: 500,
    sideEffects: ['nausea', 'vomiting', 'diarrhea', 'rash'],
    contraindications: ['penicillin allergy', 'mononucleosis'],
    organEffects: ['GI Tract', 'Respiratory System', 'Urinary System'],
    pharmacokinetics: {
      halfLife: '1-1.3 hours',
      bioavailability: '95%',
      proteinBinding: '20%',
      metabolism: 'Minimal'
    },
    interactions: ['Probenecid', 'Allopurinol', 'Oral contraceptives'],
    dosageInfo: [
      { indication: 'Mild Infections', dose: '250-500mg TID', route: 'Oral' },
      { indication: 'Severe Infections', dose: '500-875mg BID', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Rapid',
      distributionPattern: 'Wide distribution',
      peakEffectTime: '1-2 hours',
      eliminationRoute: 'Renal'
    }
  },

  {
    id: 'azithromycin',
    name: 'Azithromycin',
    genericName: 'Azithromycin',
    class: 'Macrolide Antibiotic',
    therapeuticArea: 'Infectious Disease',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Respiratory Infections', 'Skin Infections', 'STDs', 'Atypical Pneumonia'],
    mechanismOfAction: 'Azithromycin binds to the 50S ribosomal subunit of susceptible bacteria, inhibiting protein synthesis and leading to bacterial growth inhibition or death.',
    targetOrgans: ['respiratory', 'skin', 'urogenital'],
    dosageRange: { min: 250, max: 1000, unit: 'mg' },
    commonDosage: 500,
    sideEffects: ['nausea', 'diarrhea', 'abdominal pain', 'headache'],
    contraindications: ['macrolide allergy', 'severe liver disease'],
    organEffects: ['Respiratory System', 'GI Tract', 'Skin'],
    pharmacokinetics: {
      halfLife: '68 hours',
      bioavailability: '37%',
      proteinBinding: '51%',
      metabolism: 'Hepatic demethylation'
    },
    interactions: ['Warfarin', 'Digoxin', 'Cyclosporine', 'Theophylline'],
    dosageInfo: [
      { indication: 'Respiratory Infections', dose: '500mg on day 1, then 250mg daily x4 days', route: 'Oral' },
      { indication: 'Chlamydia', dose: '1000mg single dose', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Rapid',
      distributionPattern: 'Tissue-preferential',
      peakEffectTime: '2-3 hours',
      eliminationRoute: 'Biliary'
    }
  },

  // Pain Management & Inflammation
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    class: 'NSAID',
    therapeuticArea: 'Pain Management',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Pain', 'Inflammation', 'Fever', 'Arthritis'],
    mechanismOfAction: 'Ibuprofen inhibits cyclooxygenase (COX-1 and COX-2) enzymes, reducing prostaglandin synthesis. This results in decreased inflammation, pain, and fever while also affecting platelet aggregation.',
    targetOrgans: ['gi-tract', 'kidneys', 'blood-vessels', 'brain'],
    dosageRange: { min: 200, max: 800, unit: 'mg' },
    commonDosage: 400,
    sideEffects: ['stomach upset', 'heartburn', 'dizziness', 'headache'],
    contraindications: ['GI bleeding', 'severe heart failure', 'severe renal impairment'],
    organEffects: ['GI Tract', 'Kidneys', 'Blood Vessels', 'CNS'],
    pharmacokinetics: {
      halfLife: '2-4 hours',
      bioavailability: '80-100%',
      proteinBinding: '99%',
      metabolism: 'CYP2C9'
    },
    interactions: ['Warfarin', 'ACE inhibitors', 'Lithium', 'Methotrexate'],
    dosageInfo: [
      { indication: 'Pain/Fever', dose: '200-400mg q4-6h', route: 'Oral' },
      { indication: 'Arthritis', dose: '400-800mg TID-QID', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Rapid',
      distributionPattern: 'Systemic',
      peakEffectTime: '1-2 hours',
      eliminationRoute: 'Hepatic/Renal'
    }
  },

  {
    id: 'morphine',
    name: 'Morphine',
    genericName: 'Morphine Sulfate',
    class: 'Opioid Analgesic',
    therapeuticArea: 'Pain Management',
    administration: 'oral',
    fdaStatus: 'controlled',
    isSimulationReady: true,
    indications: ['Severe Pain', 'Cancer Pain', 'Post-operative Pain'],
    mechanismOfAction: 'Morphine binds to μ-opioid receptors in the brain, spinal cord, and other tissues, modulating pain perception and emotional response to pain.',
    targetOrgans: ['brain', 'spinal-cord', 'gi-tract'],
    dosageRange: { min: 5, max: 200, unit: 'mg' },
    commonDosage: 15,
    sideEffects: ['sedation', 'respiratory depression', 'constipation', 'nausea'],
    contraindications: ['respiratory depression', 'severe asthma', 'paralytic ileus'],
    organEffects: ['Brain', 'Spinal Cord', 'Respiratory System', 'GI Tract'],
    pharmacokinetics: {
      halfLife: '2-3 hours',
      bioavailability: '25-50%',
      proteinBinding: '30%',
      metabolism: 'Hepatic glucuronidation'
    },
    interactions: ['CNS depressants', 'MAOIs', 'Alcohol', 'Benzodiazepines'],
    dosageInfo: [
      { indication: 'Moderate Pain', dose: '15-30mg q4h', route: 'Oral' },
      { indication: 'Severe Pain', dose: '30-60mg q4h', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Variable',
      distributionPattern: 'CNS-preferential',
      peakEffectTime: '1-2 hours',
      eliminationRoute: 'Hepatic'
    }
  },

  // Neurology & Psychiatry
  {
    id: 'sertraline',
    name: 'Sertraline',
    genericName: 'Sertraline HCl',
    class: 'SSRI Antidepressant',
    therapeuticArea: 'Neurology',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: false,
    indications: ['Depression', 'Anxiety', 'PTSD', 'OCD'],
    mechanismOfAction: 'Sertraline selectively inhibits the reuptake of serotonin (5-HT) at the presynaptic neuronal membrane. This increases serotonin concentration in the synaptic cleft, enhancing serotonergic neurotransmission.',
    targetOrgans: ['brain', 'cns'],
    dosageRange: { min: 25, max: 200, unit: 'mg' },
    commonDosage: 50,
    sideEffects: ['nausea', 'headache', 'insomnia', 'sexual dysfunction'],
    contraindications: ['MAOI use within 14 days', 'pimozide use'],
    organEffects: ['Brain', 'CNS'],
    pharmacokinetics: {
      halfLife: '26 hours',
      bioavailability: '44%',
      proteinBinding: '98%',
      metabolism: 'CYP2B6, CYP2C19'
    },
    interactions: ['MAOIs', 'Warfarin', 'Digoxin', 'Lithium'],
    dosageInfo: [
      { indication: 'Depression', dose: '50-200mg once daily', route: 'Oral' },
      { indication: 'Anxiety', dose: '25-200mg once daily', route: 'Oral' }
    ]
  },

  {
    id: 'lorazepam',
    name: 'Lorazepam',
    genericName: 'Lorazepam',
    class: 'Benzodiazepine',
    therapeuticArea: 'Neurology',
    administration: 'oral',
    fdaStatus: 'controlled',
    isSimulationReady: true,
    indications: ['Anxiety', 'Insomnia', 'Seizures', 'Pre-operative Sedation'],
    mechanismOfAction: 'Lorazepam enhances the effect of GABA at the GABAA receptor, resulting in sedative, hypnotic, anxiolytic, anticonvulsant, and muscle relaxant properties.',
    targetOrgans: ['brain', 'cns'],
    dosageRange: { min: 0.5, max: 10, unit: 'mg' },
    commonDosage: 1,
    sideEffects: ['sedation', 'dizziness', 'weakness', 'confusion'],
    contraindications: ['narrow-angle glaucoma', 'severe respiratory insufficiency'],
    organEffects: ['Brain', 'CNS'],
    pharmacokinetics: {
      halfLife: '12-18 hours',
      bioavailability: '90%',
      proteinBinding: '85%',
      metabolism: 'Hepatic glucuronidation'
    },
    interactions: ['Alcohol', 'CNS depressants', 'Opioids'],
    dosageInfo: [
      { indication: 'Anxiety', dose: '0.5-2mg BID-TID', route: 'Oral' },
      { indication: 'Insomnia', dose: '2-4mg at bedtime', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Rapid',
      distributionPattern: 'CNS',
      peakEffectTime: '2 hours',
      eliminationRoute: 'Hepatic'
    }
  },

  // Respiratory System
  {
    id: 'albuterol',
    name: 'Albuterol',
    genericName: 'Albuterol Sulfate',
    class: 'Beta-2 Agonist',
    therapeuticArea: 'Respiratory',
    administration: 'inhalation',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Asthma', 'COPD', 'Exercise-Induced Bronchospasm'],
    mechanismOfAction: 'Albuterol is a selective beta-2 adrenergic receptor agonist that causes smooth muscle relaxation in the airways, leading to bronchodilation and improved airflow.',
    targetOrgans: ['lungs', 'bronchi'],
    dosageRange: { min: 90, max: 180, unit: 'mcg' },
    commonDosage: 90,
    sideEffects: ['tremor', 'nervousness', 'headache', 'tachycardia'],
    contraindications: ['hypersensitivity to albuterol'],
    organEffects: ['Lungs', 'Bronchi', 'Heart'],
    pharmacokinetics: {
      halfLife: '3-8 hours',
      bioavailability: '100% (inhalation)',
      proteinBinding: '10%',
      metabolism: 'Hepatic'
    },
    interactions: ['Beta-blockers', 'Digoxin', 'MAOIs', 'Tricyclic antidepressants'],
    dosageInfo: [
      { indication: 'Acute Bronchospasm', dose: '1-2 puffs q4-6h', route: 'Inhalation' },
      { indication: 'Exercise Prevention', dose: '2 puffs 15 min before exercise', route: 'Inhalation' }
    ],
    simulationData: {
      absorptionRate: 'Rapid',
      distributionPattern: 'Pulmonary',
      peakEffectTime: '30-60 minutes',
      eliminationRoute: 'Hepatic/Renal'
    }
  },

  {
    id: 'dextromethorphan',
    name: 'Dextromethorphan',
    genericName: 'Dextromethorphan HBr',
    class: 'Antitussive',
    therapeuticArea: 'Respiratory',
    administration: 'oral',
    fdaStatus: 'approved',
    isSimulationReady: true,
    indications: ['Dry Cough', 'Non-productive Cough'],
    mechanismOfAction: 'Dextromethorphan acts centrally on the cough center in the medulla oblongata, suppressing the cough reflex through NMDA receptor antagonism and sigma-1 receptor agonism.',
    targetOrgans: ['brain', 'respiratory'],
    dosageRange: { min: 15, max: 30, unit: 'mg' },
    commonDosage: 15,
    sideEffects: ['drowsiness', 'dizziness', 'nausea', 'confusion at high doses'],
    contraindications: ['MAOI use within 14 days', 'severe respiratory depression'],
    organEffects: ['Brain', 'Respiratory System'],
    pharmacokinetics: {
      halfLife: '1.4-3.9 hours',
      bioavailability: '11%',
      proteinBinding: '60-70%',
      metabolism: 'CYP2D6'
    },
    interactions: ['MAOIs', 'SSRIs', 'Quinidine'],
    dosageInfo: [
      { indication: 'Cough', dose: '15mg q4h or 30mg q6-8h', route: 'Oral' }
    ],
    simulationData: {
      absorptionRate: 'Rapid',
      distributionPattern: 'CNS',
      peakEffectTime: '1-3 hours',
      eliminationRoute: 'Hepatic'
    }
  }
];

// Drug Categories for filtering
export const DRUG_CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'nsaid', label: 'Pain Relief (NSAID)' },
  { value: 'ace-inhibitor', label: 'ACE Inhibitors' },
  { value: 'statin', label: 'Statins' },
  { value: 'anticoagulant', label: 'Blood Thinners' },
  { value: 'biguanide', label: 'Diabetes (Biguanide)' },
  { value: 'insulin', label: 'Insulin' },
  { value: 'ppi', label: 'Acid Reduction' },
  { value: 'antibiotic', label: 'Antibiotics' },
  { value: 'opioid', label: 'Opioid Analgesics' },
  { value: 'ssri', label: 'Antidepressants' },
  { value: 'benzodiazepine', label: 'Anxiolytics' },
  { value: 'beta-agonist', label: 'Bronchodilators' },
  { value: 'antitussive', label: 'Cough Suppressants' }
];

// Therapeutic Areas
export const THERAPEUTIC_AREAS = [
  { value: 'all', label: 'All Areas' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'endocrinology', label: 'Endocrinology' },
  { value: 'gastroenterology', label: 'Gastroenterology' },
  { value: 'infectious-disease', label: 'Infectious Disease' },
  { value: 'pain-management', label: 'Pain Management' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'respiratory', label: 'Respiratory' }
];

// Simulation-ready drugs (filtered helper)
export const getSimulationReadyDrugs = () => {
  return COMPREHENSIVE_DRUG_DATABASE?.filter(drug => drug?.isSimulationReady);
};

// Search functionality
export const searchDrugs = (searchTerm, drugs = COMPREHENSIVE_DRUG_DATABASE) => {
  if (!searchTerm || searchTerm?.length < 2) return drugs;
  
  const term = searchTerm?.toLowerCase();
  return drugs?.filter(drug => 
    drug?.name?.toLowerCase()?.includes(term) ||
    drug?.genericName?.toLowerCase()?.includes(term) ||
    drug?.class?.toLowerCase()?.includes(term) ||
    drug?.indications?.some(indication => 
      indication?.toLowerCase()?.includes(term)
    ) ||
    drug?.therapeuticArea?.toLowerCase()?.includes(term)
  );
};

// Filter drugs by category
export const filterDrugsByCategory = (category, drugs = COMPREHENSIVE_DRUG_DATABASE) => {
  if (category === 'all') return drugs;
  
  return drugs?.filter(drug => 
    drug?.class?.toLowerCase()?.includes(category?.toLowerCase()) ||
    drug?.therapeuticArea?.toLowerCase()?.includes(category?.toLowerCase())
  );
};

// Get drug by ID
export const getDrugById = (id, drugs = COMPREHENSIVE_DRUG_DATABASE) => {
  return drugs?.find(drug => drug?.id === id);
};

// Category icons mapping
export const getCategoryIcon = (category) => {
  const iconMap = {
    'nsaid': 'Pill',
    'ace-inhibitor': 'Heart',
    'statin': 'TrendingDown',
    'anticoagulant': 'Droplets',
    'biguanide': 'Activity',
    'insulin': 'Syringe',
    'ppi': 'Shield',
    'antibiotic': 'Shield',
    'opioid': 'Zap',
    'ssri': 'Brain',
    'benzodiazepine': 'Moon',
    'beta-agonist': 'Wind',
    'antitussive': 'Mic'
  };
  
  return iconMap?.[category?.toLowerCase()] || 'Pill';
};

export default COMPREHENSIVE_DRUG_DATABASE;