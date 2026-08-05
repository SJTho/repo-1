// mcqData.js

const demoPool = [
  {
  stem: "A 45‑year‑old woman presents with progressive dysphagia for solids then liquids. Barium swallow shows a bird‑beak appearance. What is the diagnosis?",
  options: ["Achalasia", "Peptic stricture", "Oesophageal cancer", "Diffuse oesophageal spasm"],
  correctIndex: 0,
  explanation: "Bird‑beak tapering is classic for achalasia.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "Which artery supplies the majority of the blood to the biliary tree?",
  options: ["Right hepatic artery", "Left hepatic artery", "Cystic artery", "Gastroduodenal artery"],
  correctIndex: 0,
  explanation: "The right hepatic artery provides most of the biliary blood supply.",
  topic: "General Surgery",
  level: "MRCS"
},
{
  stem: "A patient with acute pancreatitis develops hypoxia on day 3. What is the most likely cause?",
  options: ["ARDS", "Pulmonary embolism", "Pleural effusion", "Aspiration pneumonia"],
  correctIndex: 0,
  explanation: "Early respiratory deterioration in pancreatitis is commonly due to ARDS.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "A 22‑year‑old man is stabbed in the left chest. He is hypotensive with absent breath sounds. What is the immediate management?",
  options: ["Needle decompression", "Chest drain insertion", "Thoracotomy", "Intubation"],
  correctIndex: 1,
  explanation: "Traumatic haemothorax requires immediate chest drain insertion.",
  topic: "Trauma and Orthopaedics",
  level: "MRCS"
},
{
  stem: "Which nerve is at risk during thyroidectomy when ligating the superior thyroid artery?",
  options: ["External branch of superior laryngeal nerve", "Recurrent laryngeal nerve", "Hypoglossal nerve", "Vagus nerve"],
  correctIndex: 0,
  explanation: "The external branch of the SLN runs close to the superior thyroid vessels.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "A 70‑year‑old man presents with sudden flank pain and hypotension. CT shows a ruptured AAA. What is the best management?",
  options: ["Immediate transfer to theatre", "IV fluids then CT angiography", "Endovascular repair next morning", "Observation"],
  correctIndex: 0,
  explanation: "Ruptured AAA requires immediate operative intervention.",
  topic: "Vascular Surgery",
  level: "MBBS"
},
{
  stem: "Which tumour marker is most associated with hepatocellular carcinoma?",
  options: ["AFP", "CEA", "CA19‑9", "CA125"],
  correctIndex: 0,
  explanation: "AFP is elevated in many cases of HCC.",
  topic: "General Surgery",
  level: "MRCS"
},
{
  stem: "A 30‑year‑old man has a mid‑shaft humeral fracture. Which nerve is most likely injured?",
  options: ["Radial nerve", "Median nerve", "Ulnar nerve", "Musculocutaneous nerve"],
  correctIndex: 0,
  explanation: "The radial nerve runs in the spiral groove and is vulnerable in mid‑shaft fractures.",
  topic: "Trauma and Orthopaedics",
  level: "MRCS"
},
{
  stem: "A patient with ulcerative colitis develops toxic megacolon. What is the best next step?",
  options: ["IV steroids and urgent surgical review", "Oral mesalazine", "Colonoscopy", "Discharge with follow‑up"],
  correctIndex: 0,
  explanation: "Toxic megacolon requires IV steroids and urgent surgical involvement.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "Which nerve is responsible for sensation over the deltoid region?",
  options: ["Axillary nerve", "Radial nerve", "Suprascapular nerve", "Median nerve"],
  correctIndex: 0,
  explanation: "The axillary nerve supplies the regimental badge area.",
  topic: "Trauma and Orthopaedics",
  level: "MBBS"
},
{
  stem: "A 60‑year‑old woman has jaundice, pruritus, and pale stools. What is the most likely diagnosis?",
  options: ["Obstructive jaundice", "Gilbert’s syndrome", "Haemolysis", "Hepatitis A"],
  correctIndex: 0,
  explanation: "Pale stools and pruritus indicate cholestasis.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "A trauma patient has unilateral dilated pupil and bradycardia. What is the diagnosis?",
  options: ["Uncal herniation", "Epidural haematoma", "Subdural haematoma", "Cerebellar stroke"],
  correctIndex: 0,
  explanation: "Uncal herniation compresses CN III causing a blown pupil.",
  topic: "Neurosurgery",
  level: "FRCS"
},
{
  stem: "Which condition is associated with a positive Rovsing’s sign?",
  options: ["Appendicitis", "Cholecystitis", "Pancreatitis", "Diverticulitis"],
  correctIndex: 0,
  explanation: "Rovsing’s sign indicates appendiceal irritation.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "A 50‑year‑old man has haematemesis and hypotension. What is the first-line investigation?",
  options: ["Urgent endoscopy", "CT abdomen", "Abdominal ultrasound", "Barium swallow"],
  correctIndex: 0,
  explanation: "Upper GI bleeding requires urgent endoscopy.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "Which electrolyte abnormality is most associated with tetany?",
  options: ["Hypocalcaemia", "Hypercalcaemia", "Hyperkalaemia", "Hyponatraemia"],
  correctIndex: 0,
  explanation: "Low calcium causes neuromuscular excitability.",
  topic: "General Surgery",
  level: "MRCS"
},
{
  stem: "A 40‑year‑old man has severe epigastric pain radiating to the back. Lipase is elevated. What is the diagnosis?",
  options: ["Acute pancreatitis", "Gastritis", "Peptic ulcer disease", "Cholecystitis"],
  correctIndex: 0,
  explanation: "Raised lipase confirms pancreatitis.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "Which nerve is at risk during inguinal hernia repair?",
  options: ["Ilioinguinal nerve", "Femoral nerve", "Sciatic nerve", "Obturator nerve"],
  correctIndex: 0,
  explanation: "The ilioinguinal nerve runs close to the inguinal canal.",
  topic: "General Surgery",
  level: "MRCS"
},
{
  stem: "A 75‑year‑old man has sudden painless loss of vision in one eye. Fundoscopy shows a cherry‑red spot. Diagnosis?",
  options: ["Central retinal artery occlusion", "Retinal detachment", "Glaucoma", "Optic neuritis"],
  correctIndex: 0,
  explanation: "Cherry‑red spot is classic for CRAO.",
  topic: "Vascular Surgery",
  level: "FRCS"
},
{
  stem: "Which condition causes a positive Murphy’s sign?",
  options: ["Acute cholecystitis", "Pancreatitis", "Appendicitis", "Renal colic"],
  correctIndex: 0,
  explanation: "Murphy’s sign indicates gallbladder inflammation.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "A 30‑year‑old man has a tibial fracture and develops severe pain out of proportion. What is the diagnosis?",
  options: ["Compartment syndrome", "Cellulitis", "DVT", "Nerve injury"],
  correctIndex: 0,
  explanation: "Pain out of proportion is the hallmark of compartment syndrome.",
  topic: "Trauma and Orthopaedics",
  level: "MRCS"
},
{
  stem: "Which condition is associated with Courvoisier’s sign?",
  options: ["Pancreatic cancer", "Gallstones", "Cholangitis", "Hepatitis"],
  correctIndex: 0,
  explanation: "Painless jaundice with palpable gallbladder suggests malignancy.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "A patient with diverticulitis develops peritonitis. What is the likely Hinchey classification?",
  options: ["Hinchey III", "Hinchey I", "Hinchey II", "Hinchey IV"],
  correctIndex: 0,
  explanation: "Hinchey III is purulent peritonitis.",
  topic: "General Surgery",
  level: "FRCS"
},
{
  stem: "Which nerve is responsible for wrist extension?",
  options: ["Radial nerve", "Median nerve", "Ulnar nerve", "Posterior interosseous nerve"],
  correctIndex: 0,
  explanation: "The radial nerve innervates wrist extensors.",
  topic: "Trauma and Orthopaedics",
  level: "MBBS"
},
{
  stem: "A 60‑year‑old man has a pulsatile groin mass. What is the diagnosis?",
  options: ["Femoral artery aneurysm", "Inguinal hernia", "Lymphadenopathy", "Varicose vein"],
  correctIndex: 0,
  explanation: "A pulsatile groin mass is a femoral aneurysm.",
  topic: "Vascular Surgery",
  level: "MRCS"
},
{
  stem: "Which condition is associated with coffee‑ground vomit?",
  options: ["Upper GI bleed", "Lower GI bleed", "Pancreatitis", "Cholecystitis"],
  correctIndex: 0,
  explanation: "Coffee‑ground vomit indicates digested blood.",
  topic: "General Surgery",
  level: "MBBS"
},
{
  stem: "A 50‑year‑old man has haematuria and flank pain. CT shows a 6 mm ureteric stone. Best management?",
  options: ["Conservative management", "Immediate surgery", "Stent insertion", "Lithotripsy"],
  correctIndex: 0,
  explanation: "Stones <10 mm usually pass spontaneously.",
  topic: "Urology",
  level: "MBBS"
},
{
  stem: "Which nerve is responsible for thumb opposition?",
  options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Axillary nerve"],
  correctIndex: 0,
  explanation: "The median nerve innervates the thenar muscles.",
  topic: "TRauma and Orthopaedics",
  level: "MRCS"
},
{
  stem: "A patient with pancreatitis develops a fluid collection after 4 weeks. What is the diagnosis?",
  options: ["Pancreatic pseudocyst", "Abscess", "Necrosis", "Seroma"],
  correctIndex: 0,
  explanation: "Pseudocysts form after 4 weeks.",
  topic: "General Surgery",
  level: "FRCS"
},
{
  stem: "Which condition causes a positive Battle’s sign?",
  options: ["Basal skull fracture", "Mandibular fracture", "Orbital fracture", "Cervical spine injury"],
  correctIndex: 0,
  explanation: "Battle’s sign indicates posterior skull base fracture.",
  topic: "Neurosurgery",
  level: "MRCS"
},
{
  stem: "A 40‑year‑old man has a penetrating abdominal injury with hypotension. What is the first priority?",
  options: ["Control haemorrhage", "CT scan", "FAST scan", "IV antibiotics"],
  correctIndex: 0,
  explanation: "In trauma, haemorrhage control is the first priority.",
  topic: "Trauma and Orthopaedics",
  level: "FRCS"
},

{
    stem: "A 65‑year‑old man presents with sudden severe epigastric pain and CT shows pneumoperitoneum. What is the most likely diagnosis?",
    options: ["Perforated peptic ulcer", "Acute pancreatitis", "Mesenteric ischaemia", "Small bowel obstruction"],
    correctIndex: 0,
    explanation: "Free air under the diaphragm with acute pain strongly suggests perforated peptic ulcer.",
    topic: "General Surgery",
    level: "MBBS"
  },

  {
    stem: "During laparoscopic cholecystectomy, the critical view of safety requires identification of:",
    options: ["Cystic artery and common bile duct", "Cystic duct and cystic artery", "Right hepatic duct and cystic duct", "Common hepatic duct and cystic artery"],
    correctIndex: 1,
    explanation: "The critical view requires clearing Calot’s triangle and identifying cystic duct + cystic artery only.",
    topic: "General Surgery",
    level: "MRCS"
  },

  {
    stem: "A trauma patient has hypotension, distended neck veins, and muffled heart sounds. What is the diagnosis?",
    options: ["Tension pneumothorax", "Cardiac tamponade", "Massive haemothorax", "Neurogenic shock"],
    correctIndex: 1,
    explanation: "Beck’s triad indicates cardiac tamponade.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS"
  },

  {
    stem: "Which artery is most commonly injured in an anterior shoulder dislocation?",
    options: ["Axillary artery", "Subclavian artery", "Brachial artery", "Circumflex humeral artery"],
    correctIndex: 0,
    explanation: "The axillary artery is vulnerable due to traction during anterior dislocation.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS"
  },

  {
    stem: "A 60‑year‑old man has painless haematuria. What is the most likely diagnosis?",
    options: ["Bladder cancer", "UTI", "Renal colic", "BPH"],
    correctIndex: 0,
    explanation: "Painless haematuria is bladder cancer until proven otherwise.",
    topic: "Urology",
    level: "MBBS"
  },

  {
    stem: "Which electrolyte abnormality is most associated with ileus?",
    options: ["Hypokalaemia", "Hyperkalaemia", "Hyponatraemia", "Hypercalcaemia"],
    correctIndex: 0,
    explanation: "Low potassium impairs smooth muscle contraction.",
    topic: "General Surgery",
    level: "MBBS"
  },

  /* ------------------------------ Cardiothoracic Surgery ------------------------------ */
  {
    stem: "Which valve is most commonly affected in rheumatic heart disease?",
    options: ["Aortic", "Mitral", "Pulmonary", "Tricuspid"],
    correctIndex: 1,
    explanation: "The mitral valve is most frequently involved due to autoimmune-mediated damage.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS"
  },
  {
    stem: "Which investigation is most sensitive for detecting early myocardial ischemia?",
    options: ["Chest X-ray", "Troponin I", "ECG", "Cardiac MRI"],
    correctIndex: 3,
    explanation: "Cardiac MRI detects perfusion defects and ischemia earlier than ECG or biomarkers.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS"
  },
  {
    stem: "Which congenital heart defect causes a continuous ‘machinery’ murmur?",
    options: ["ASD", "VSD", "PDA", "Tetralogy of Fallot"],
    correctIndex: 2,
    explanation: "Patent ductus arteriosus produces a characteristic continuous murmur.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS"
  },
  {
    stem: "Which artery is most commonly used for CABG due to long-term patency?",
    options: ["Radial artery", "Internal mammary artery", "Saphenous vein", "Ulnar artery"],
    correctIndex: 1,
    explanation: "The left internal mammary artery has superior long-term patency.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS"
  },

  /* ------------------------------ Core Surgery ------------------------------ */
  {
    stem: "Which suture material is absorbable?",
    options: ["Prolene", "Nylon", "Vicryl", "Silk"],
    correctIndex: 2,
    explanation: "Vicryl is a synthetic absorbable suture commonly used in soft tissue closure.",
    topic: "Core Surgery",
    level: "MBBS"
  },
  {
    stem: "Which instrument is used for blunt dissection?",
    options: ["Scalpel", "Metzenbaum scissors", "Kocher forceps", "Babcock forceps"],
    correctIndex: 1,
    explanation: "Metzenbaum scissors are designed for fine blunt dissection.",
    topic: "Core Surgery",
    level: "MRCS"
  },
  {
    stem: "Which hernia has the highest risk of strangulation?",
    options: ["Direct inguinal", "Indirect inguinal", "Femoral", "Umbilical"],
    correctIndex: 2,
    explanation: "Femoral hernias have a narrow neck and high strangulation risk.",
    topic: "Core Surgery",
    level: "FRCS"
  },
  {
    stem: "Which fluid is most appropriate for initial resuscitation in trauma?",
    options: ["0.9% saline", "5% dextrose", "Hartmann’s solution", "Albumin"],
    correctIndex: 2,
    explanation: "Hartmann’s solution is preferred due to balanced electrolytes.",
    topic: "Core Surgery",
    level: "MBBS"
  },

  /* ------------------------------ General Surgery ------------------------------ */
  {
    stem: "Which electrolyte abnormality most commonly causes ileus?",
    options: ["Hypokalaemia", "Hyperkalaemia", "Hyponatraemia", "Hypercalcaemia"],
    correctIndex: 0,
    explanation: "Low potassium impairs smooth muscle contraction.",
    topic: "General Surgery",
    level: "MBBS"
  },
  {
    stem: "Which condition is associated with a ‘bird beak’ appearance on barium swallow?",
    options: ["Achalasia", "GORD", "Peptic stricture", "Zenker’s diverticulum"],
    correctIndex: 0,
    explanation: "Achalasia causes narrowing at the LES producing a bird-beak appearance.",
    topic: "General Surgery",
    level: "MRCS"
  },
  {
    stem: "Which artery is most commonly injured in a bleeding duodenal ulcer?",
    options: ["Left gastric", "Gastroduodenal", "Splenic", "Right gastroepiploic"],
    correctIndex: 1,
    explanation: "Posterior duodenal ulcers erode the gastroduodenal artery.",
    topic: "General Surgery",
    level: "FRCS"
  },
  {
    stem: "Which condition causes painless jaundice and a palpable gallbladder?",
    options: ["Gallstones", "Pancreatic cancer", "Cholangitis", "Hepatitis"],
    correctIndex: 1,
    explanation: "Courvoisier’s sign suggests malignant obstruction of the biliary tree.",
    topic: "General Surgery",
    level: "MRCS"
  },

  /* ------------------------------ Maxillofacial Surgery ------------------------------ */
  {
    stem: "Which fracture pattern is associated with periorbital ecchymosis (‘raccoon eyes’)?",
    options: ["Mandibular fracture", "Zygomatic fracture", "Le Fort II fracture", "Nasal fracture"],
    correctIndex: 2,
    explanation: "Le Fort II fractures disrupt midfacial structures causing periorbital bruising.",
    topic: "Maxillofacial Surgery",
    level: "MRCS"
  },
  {
    stem: "Which nerve is at risk during parotid surgery?",
    options: ["Hypoglossal", "Facial", "Glossopharyngeal", "Trigeminal"],
    correctIndex: 1,
    explanation: "The facial nerve divides within the parotid gland.",
    topic: "Maxillofacial Surgery",
    level: "FRCS"
  },
  {
    stem: "Which condition presents with trismus and deviation of the uvula?",
    options: ["Peritonsillar abscess", "Epiglottitis", "Ludwig’s angina", "Retropharyngeal abscess"],
    correctIndex: 0,
    explanation: "Peritonsillar abscess causes swelling that pushes the uvula away.",
    topic: "Maxillofacial Surgery",
    level: "MBBS"
  },
  {
    stem: "Which bone forms the majority of the hard palate?",
    options: ["Maxilla", "Palatine bone", "Zygoma", "Sphenoid"],
    correctIndex: 0,
    explanation: "The palatal processes of the maxilla form most of the hard palate.",
    topic: "Maxillofacial Surgery",
    level: "MBBS"
  },

  /* ------------------------------ Neurosurgery ------------------------------ */
  {
    stem: "Which brain tumour is most associated with a ‘butterfly’ appearance on MRI?",
    options: ["Meningioma", "Glioblastoma", "Acoustic neuroma", "Pituitary adenoma"],
    correctIndex: 1,
    explanation: "Glioblastoma multiforme crosses the corpus callosum producing a butterfly pattern.",
    topic: "Neurosurgery",
    level: "FRCS"
  },
  {
    stem: "Which condition causes a positive Babinski sign?",
    options: ["Lower motor neuron lesion", "Upper motor neuron lesion", "Peripheral neuropathy", "Cerebellar lesion"],
    correctIndex: 1,
    explanation: "UMN lesions cause dorsiflexion of the big toe.",
    topic: "Neurosurgery",
    level: "MBBS"
  },
  {
    stem: "Which artery is most commonly involved in epidural hematoma?",
    options: ["Middle meningeal artery", "Anterior cerebral artery", "Basilar artery", "Posterior communicating artery"],
    correctIndex: 0,
    explanation: "Temporal bone fractures tear the middle meningeal artery.",
    topic: "Neurosurgery",
    level: "MRCS"
  },
  {
    stem: "Which condition presents with intention tremor?",
    options: ["Parkinson’s disease", "Cerebellar lesion", "Essential tremor", "Dystonia"],
    correctIndex: 1,
    explanation: "Cerebellar dysfunction causes tremor during movement.",
    topic: "Neurosurgery",
    level: "MBBS"
  },

  /* ------------------------------ Otolaryngology ------------------------------ */
  {
    stem: "Which organism most commonly causes acute otitis media?",
    options: ["Strep. pneumoniae", "E. coli", "Pseudomonas", "Staph. aureus"],
    correctIndex: 0,
    explanation: "Strep. pneumoniae is the leading cause of otitis media.",
    topic: "Otolaryngology",
    level: "MBBS"
  },
  {
    stem: "Which condition causes inspiratory stridor?",
    options: ["Asthma", "Epiglottitis", "COPD", "Bronchitis"],
    correctIndex: 1,
    explanation: "Epiglottitis obstructs the upper airway causing stridor.",
    topic: "Otolaryngology",
    level: "MRCS"
  },
  {
    stem: "Which sinus is most commonly infected in acute sinusitis?",
    options: ["Frontal", "Maxillary", "Ethmoid", "Sphenoid"],
    correctIndex: 1,
    explanation: "The maxillary sinus drains poorly and is most often infected.",
    topic: "Otolaryngology",
    level: "MBBS"
  },
  {
    stem: "Which cancer is most associated with hoarseness and smoking?",
    options: ["Oral SCC", "Nasopharyngeal carcinoma", "Laryngeal carcinoma", "Thyroid carcinoma"],
    correctIndex: 2,
    explanation: "Laryngeal SCC is strongly linked to smoking.",
    topic: "Otolaryngology",
    level: "FRCS"
  },

  /* ------------------------------ Paediatric Surgery ------------------------------ */
  {
    stem: "Which condition causes projectile non-bilious vomiting in infants?",
    options: ["Malrotation", "Pyloric stenosis", "Duodenal atresia", "Intussusception"],
    correctIndex: 1,
    explanation: "Hypertrophic pyloric stenosis causes forceful vomiting.",
    topic: "Paediatric Surgery",
    level: "MBBS"
  },
  {
    stem: "Which condition presents with currant jelly stool?",
    options: ["Hirschsprung disease", "Intussusception", "Meckel’s diverticulum", "Necrotising enterocolitis"],
    correctIndex: 1,
    explanation: "Intussusception causes mucosal sloughing producing currant jelly stool.",
    topic: "Paediatric Surgery",
    level: "MRCS"
  },
  {
    stem: "Which congenital condition is associated with failure of neural crest migration?",
    options: ["Hirschsprung disease", "Malrotation", "Omphalocele", "Gastroschisis"],
    correctIndex: 0,
    explanation: "Hirschsprung disease results from absent ganglion cells.",
    topic: "Paediatric Surgery",
    level: "FRCS"
  },
  {
    stem: "Which condition presents with bilious vomiting shortly after birth?",
    options: ["Pyloric stenosis", "Malrotation with volvulus", "Tracheoesophageal fistula", "Meconium ileus"],
    correctIndex: 1,
    explanation: "Bilious vomiting in neonates suggests obstruction distal to the ampulla.",
    topic: "Paediatric Surgery",
    level: "MBBS"
  },

  /* ------------------------------ Plastic Surgery ------------------------------ */
  {
    stem: "Which burn depth is characterised by blistering and pain?",
    options: ["Superficial", "Superficial partial thickness", "Deep partial thickness", "Full thickness"],
    correctIndex: 1,
    explanation: "Superficial partial thickness burns blister and are painful.",
    topic: "Plastic Surgery",
    level: "MBBS"
  },
  {
    stem: "Which flap maintains its own blood supply?",
    options: ["Skin graft", "Split-thickness graft", "Full-thickness graft", "Pedicled flap"],
    correctIndex: 3,
    explanation: "Pedicled flaps retain vascular supply from the donor site.",
    topic: "Plastic Surgery",
    level: "MRCS"
  },
  {
    stem: "Which nerve is most commonly injured in carpal tunnel syndrome?",
    options: ["Median", "Ulnar", "Radial", "Musculocutaneous"],
    correctIndex: 0,
    explanation: "Median nerve compression causes classic symptoms.",
    topic: "Plastic Surgery",
    level: "MBBS"
  },
  {
    stem: "Which condition presents with Dupuytren’s contracture?",
    options: ["Flexor tendon rupture", "Palmar fascia thickening", "Median nerve palsy", "Trigger finger"],
    correctIndex: 1,
    explanation: "Fibrosis of the palmar fascia causes finger flexion deformities.",
    topic: "Plastic Surgery",
    level: "FRCS"
  },

  /* ------------------------------ Trauma and Orthopaedics ------------------------------ */
  {
    stem: "Which fracture is associated with wrist drop?",
    options: ["Colles fracture", "Mid-shaft humerus fracture", "Scaphoid fracture", "Olecranon fracture"],
    correctIndex: 1,
    explanation: "Radial nerve injury occurs in humeral shaft fractures.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS"
  },
  {
    stem: "Which hip fracture has the highest risk of avascular necrosis?",
    options: ["Intertrochanteric", "Subtrochanteric", "Intracapsular", "Greater trochanteric"],
    correctIndex: 2,
    explanation: "Intracapsular fractures disrupt the femoral head blood supply.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS"
  },
  {
    stem: "Which condition causes a positive Trendelenburg sign?",
    options: ["ACL tear", "Gluteus medius weakness", "Sciatica", "Hip osteoarthritis"],
    correctIndex: 1,
    explanation: "Weak hip abductors cause pelvic drop.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS"
  },
  {
    stem: "Which fracture is most associated with fat embolism syndrome?",
    options: ["Femoral shaft fracture", "Clavicle fracture", "Radius fracture", "Pelvic fracture"],
    correctIndex: 0,
    explanation: "Long bone fractures release marrow fat into circulation.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS"
  },

  /* ------------------------------ Urology ------------------------------ */
  {
    stem: "Which stone type is radiolucent on X-ray?",
    options: ["Calcium oxalate", "Struvite", "Uric acid", "Cystine"],
    correctIndex: 2,
    explanation: "Uric acid stones do not appear on plain radiographs.",
    topic: "Urology",
    level: "MRCS"
  },
  {
    stem: "Which condition causes painless haematuria in older adults?",
    options: ["UTI", "Renal cell carcinoma", "Prostatitis", "Urethritis"],
    correctIndex: 1,
    explanation: "RCC often presents with painless haematuria.",
    topic: "Urology",
    level: "FRCS"
  },
  {
    stem: "Which test is first-line for suspected testicular torsion?",
    options: ["CT", "MRI", "Doppler ultrasound", "X-ray"],
    correctIndex: 2,
    explanation: "Doppler ultrasound assesses blood flow to the testis.",
    topic: "Urology",
    level: "MBBS"
  },
  {
    stem: "Which condition presents with a ‘bag of worms’ appearance?",
    options: ["Hydrocele", "Varicocele", "Epididymitis", "Torsion"],
    correctIndex: 1,
    explanation: "Varicocele causes dilated pampiniform plexus veins.",
    topic: "Urology",
    level: "MBBS"
  },

  /* ------------------------------ Vascular Surgery ------------------------------ */
  {
    stem: "Which aneurysm size warrants elective repair in asymptomatic patients?",
    options: ["4 cm", "4.5 cm", "5.5 cm", "6.5 cm"],
    correctIndex: 2,
    explanation: "AAA repair is recommended at ≥5.5 cm.",
    topic: "Vascular Surgery",
    level: "FRCS"
  },
  {
    stem: "Which condition causes calf claudication?",
    options: ["Aortic stenosis", "Popliteal artery stenosis", "Femoral artery stenosis", "Iliac artery stenosis"],
    correctIndex: 2,
    explanation: "Femoral artery disease reduces calf perfusion.",
    topic: "Vascular Surgery",
    level: "MRCS"
  },
  {
    stem: "Which sign indicates acute limb ischemia?",
    options: ["Warmth", "Hyperpigmentation", "Pulselessness", "Varicosities"],
    correctIndex: 2,
    explanation: "Pulselessness is one of the classic ‘6 Ps’.",
    topic: "Vascular Surgery",
    level: "MBBS"
  },
  {
    stem: "Which condition is associated with a ‘string of beads’ appearance on angiography?",
    options: ["Atherosclerosis", "Fibromuscular dysplasia", "Takayasu arteritis", "Buerger’s disease"],
    correctIndex: 1,
    explanation: "FMD causes alternating stenosis and dilation.",
    topic: "Vascular Surgery",
    level: "FRCS"
  }
]