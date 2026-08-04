// mcqData.js

const demoPool = [
  {
  stem: "A 45‑year‑old woman presents with progressive dysphagia for solids then liquids. Barium swallow shows a bird‑beak appearance. What is the diagnosis?",
  options: ["Achalasia", "Peptic stricture", "Oesophageal cancer", "Diffuse oesophageal spasm"],
  correctIndex: 0,
  explanation: "Bird‑beak tapering is classic for achalasia.",
  topic: "Upper GI",
  level: "Finals"
},
{
  stem: "Which artery supplies the majority of the blood to the biliary tree?",
  options: ["Right hepatic artery", "Left hepatic artery", "Cystic artery", "Gastroduodenal artery"],
  correctIndex: 0,
  explanation: "The right hepatic artery provides most of the biliary blood supply.",
  topic: "HPB",
  level: "MRCS"
},
{
  stem: "A patient with acute pancreatitis develops hypoxia on day 3. What is the most likely cause?",
  options: ["ARDS", "Pulmonary embolism", "Pleural effusion", "Aspiration pneumonia"],
  correctIndex: 0,
  explanation: "Early respiratory deterioration in pancreatitis is commonly due to ARDS.",
  topic: "HPB",
  level: "Finals"
},
{
  stem: "A 22‑year‑old man is stabbed in the left chest. He is hypotensive with absent breath sounds. What is the immediate management?",
  options: ["Needle decompression", "Chest drain insertion", "Thoracotomy", "Intubation"],
  correctIndex: 1,
  explanation: "Traumatic haemothorax requires immediate chest drain insertion.",
  topic: "Trauma",
  level: "MRCS"
},
{
  stem: "Which nerve is at risk during thyroidectomy when ligating the superior thyroid artery?",
  options: ["External branch of superior laryngeal nerve", "Recurrent laryngeal nerve", "Hypoglossal nerve", "Vagus nerve"],
  correctIndex: 0,
  explanation: "The external branch of the SLN runs close to the superior thyroid vessels.",
  topic: "General",
  level: "Finals"
},
{
  stem: "A 70‑year‑old man presents with sudden flank pain and hypotension. CT shows a ruptured AAA. What is the best management?",
  options: ["Immediate transfer to theatre", "IV fluids then CT angiography", "Endovascular repair next morning", "Observation"],
  correctIndex: 0,
  explanation: "Ruptured AAA requires immediate operative intervention.",
  topic: "Vascular",
  level: "Finals"
},
{
  stem: "Which tumour marker is most associated with hepatocellular carcinoma?",
  options: ["AFP", "CEA", "CA19‑9", "CA125"],
  correctIndex: 0,
  explanation: "AFP is elevated in many cases of HCC.",
  topic: "HPB",
  level: "MRCS"
},
{
  stem: "A 30‑year‑old man has a mid‑shaft humeral fracture. Which nerve is most likely injured?",
  options: ["Radial nerve", "Median nerve", "Ulnar nerve", "Musculocutaneous nerve"],
  correctIndex: 0,
  explanation: "The radial nerve runs in the spiral groove and is vulnerable in mid‑shaft fractures.",
  topic: "Orthopaedics",
  level: "MRCS"
},
{
  stem: "A patient with ulcerative colitis develops toxic megacolon. What is the best next step?",
  options: ["IV steroids and urgent surgical review", "Oral mesalazine", "Colonoscopy", "Discharge with follow‑up"],
  correctIndex: 0,
  explanation: "Toxic megacolon requires IV steroids and urgent surgical involvement.",
  topic: "Colorectal",
  level: "Finals"
},
{
  stem: "Which nerve is responsible for sensation over the deltoid region?",
  options: ["Axillary nerve", "Radial nerve", "Suprascapular nerve", "Median nerve"],
  correctIndex: 0,
  explanation: "The axillary nerve supplies the regimental badge area.",
  topic: "Orthopaedics",
  level: "Finals"
},
{
  stem: "A 60‑year‑old woman has jaundice, pruritus, and pale stools. What is the most likely diagnosis?",
  options: ["Obstructive jaundice", "Gilbert’s syndrome", "Haemolysis", "Hepatitis A"],
  correctIndex: 0,
  explanation: "Pale stools and pruritus indicate cholestasis.",
  topic: "HPB",
  level: "Finals"
},
{
  stem: "A trauma patient has unilateral dilated pupil and bradycardia. What is the diagnosis?",
  options: ["Uncal herniation", "Epidural haematoma", "Subdural haematoma", "Cerebellar stroke"],
  correctIndex: 0,
  explanation: "Uncal herniation compresses CN III causing a blown pupil.",
  topic: "Neurotrauma",
  level: "JCIE"
},
{
  stem: "Which condition is associated with a positive Rovsing’s sign?",
  options: ["Appendicitis", "Cholecystitis", "Pancreatitis", "Diverticulitis"],
  correctIndex: 0,
  explanation: "Rovsing’s sign indicates appendiceal irritation.",
  topic: "General",
  level: "Finals"
},
{
  stem: "A 50‑year‑old man has haematemesis and hypotension. What is the first-line investigation?",
  options: ["Urgent endoscopy", "CT abdomen", "Abdominal ultrasound", "Barium swallow"],
  correctIndex: 0,
  explanation: "Upper GI bleeding requires urgent endoscopy.",
  topic: "Upper GI",
  level: "Finals"
},
{
  stem: "Which electrolyte abnormality is most associated with tetany?",
  options: ["Hypocalcaemia", "Hypercalcaemia", "Hyperkalaemia", "Hyponatraemia"],
  correctIndex: 0,
  explanation: "Low calcium causes neuromuscular excitability.",
  topic: "General",
  level: "MRCS"
},
{
  stem: "A 40‑year‑old man has severe epigastric pain radiating to the back. Lipase is elevated. What is the diagnosis?",
  options: ["Acute pancreatitis", "Gastritis", "Peptic ulcer disease", "Cholecystitis"],
  correctIndex: 0,
  explanation: "Raised lipase confirms pancreatitis.",
  topic: "HPB",
  level: "Finals"
},
{
  stem: "Which nerve is at risk during inguinal hernia repair?",
  options: ["Ilioinguinal nerve", "Femoral nerve", "Sciatic nerve", "Obturator nerve"],
  correctIndex: 0,
  explanation: "The ilioinguinal nerve runs close to the inguinal canal.",
  topic: "General",
  level: "MRCS"
},
{
  stem: "A 75‑year‑old man has sudden painless loss of vision in one eye. Fundoscopy shows a cherry‑red spot. Diagnosis?",
  options: ["Central retinal artery occlusion", "Retinal detachment", "Glaucoma", "Optic neuritis"],
  correctIndex: 0,
  explanation: "Cherry‑red spot is classic for CRAO.",
  topic: "Vascular",
  level: "JCIE"
},
{
  stem: "Which condition causes a positive Murphy’s sign?",
  options: ["Acute cholecystitis", "Pancreatitis", "Appendicitis", "Renal colic"],
  correctIndex: 0,
  explanation: "Murphy’s sign indicates gallbladder inflammation.",
  topic: "HPB",
  level: "Finals"
},
{
  stem: "A 30‑year‑old man has a tibial fracture and develops severe pain out of proportion. What is the diagnosis?",
  options: ["Compartment syndrome", "Cellulitis", "DVT", "Nerve injury"],
  correctIndex: 0,
  explanation: "Pain out of proportion is the hallmark of compartment syndrome.",
  topic: "Orthopaedics",
  level: "MRCS"
},
{
  stem: "Which condition is associated with Courvoisier’s sign?",
  options: ["Pancreatic cancer", "Gallstones", "Cholangitis", "Hepatitis"],
  correctIndex: 0,
  explanation: "Painless jaundice with palpable gallbladder suggests malignancy.",
  topic: "HPB",
  level: "Finals"
},
{
  stem: "A patient with diverticulitis develops peritonitis. What is the likely Hinchey classification?",
  options: ["Hinchey III", "Hinchey I", "Hinchey II", "Hinchey IV"],
  correctIndex: 0,
  explanation: "Hinchey III is purulent peritonitis.",
  topic: "Colorectal",
  level: "JCIE"
},
{
  stem: "Which nerve is responsible for wrist extension?",
  options: ["Radial nerve", "Median nerve", "Ulnar nerve", "Posterior interosseous nerve"],
  correctIndex: 0,
  explanation: "The radial nerve innervates wrist extensors.",
  topic: "Orthopaedics",
  level: "Finals"
},
{
  stem: "A 60‑year‑old man has a pulsatile groin mass. What is the diagnosis?",
  options: ["Femoral artery aneurysm", "Inguinal hernia", "Lymphadenopathy", "Varicose vein"],
  correctIndex: 0,
  explanation: "A pulsatile groin mass is a femoral aneurysm.",
  topic: "Vascular",
  level: "MRCS"
},
{
  stem: "Which condition is associated with coffee‑ground vomit?",
  options: ["Upper GI bleed", "Lower GI bleed", "Pancreatitis", "Cholecystitis"],
  correctIndex: 0,
  explanation: "Coffee‑ground vomit indicates digested blood.",
  topic: "Upper GI",
  level: "Finals"
},
{
  stem: "A 50‑year‑old man has haematuria and flank pain. CT shows a 6 mm ureteric stone. Best management?",
  options: ["Conservative management", "Immediate surgery", "Stent insertion", "Lithotripsy"],
  correctIndex: 0,
  explanation: "Stones <10 mm usually pass spontaneously.",
  topic: "Urology",
  level: "Finals"
},
{
  stem: "Which nerve is responsible for thumb opposition?",
  options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Axillary nerve"],
  correctIndex: 0,
  explanation: "The median nerve innervates the thenar muscles.",
  topic: "Orthopaedics",
  level: "MRCS"
},
{
  stem: "A patient with pancreatitis develops a fluid collection after 4 weeks. What is the diagnosis?",
  options: ["Pancreatic pseudocyst", "Abscess", "Necrosis", "Seroma"],
  correctIndex: 0,
  explanation: "Pseudocysts form after 4 weeks.",
  topic: "HPB",
  level: "JCIE"
},
{
  stem: "Which condition causes a positive Battle’s sign?",
  options: ["Basal skull fracture", "Mandibular fracture", "Orbital fracture", "Cervical spine injury"],
  correctIndex: 0,
  explanation: "Battle’s sign indicates posterior skull base fracture.",
  topic: "Neurotrauma",
  level: "MRCS"
},
{
  stem: "A 40‑year‑old man has a penetrating abdominal injury with hypotension. What is the first priority?",
  options: ["Control haemorrhage", "CT scan", "FAST scan", "IV antibiotics"],
  correctIndex: 0,
  explanation: "In trauma, haemorrhage control is the first priority.",
  topic: "Trauma",
  level: "JCIE"
},

{
    stem: "A 65‑year‑old man presents with sudden severe epigastric pain and CT shows pneumoperitoneum. What is the most likely diagnosis?",
    options: ["Perforated peptic ulcer", "Acute pancreatitis", "Mesenteric ischaemia", "Small bowel obstruction"],
    correctIndex: 0,
    explanation: "Free air under the diaphragm with acute pain strongly suggests perforated peptic ulcer.",
    topic: "Upper GI",
    level: "Finals"
  },

  {
    stem: "During laparoscopic cholecystectomy, the critical view of safety requires identification of:",
    options: ["Cystic artery and common bile duct", "Cystic duct and cystic artery", "Right hepatic duct and cystic duct", "Common hepatic duct and cystic artery"],
    correctIndex: 1,
    explanation: "The critical view requires clearing Calot’s triangle and identifying cystic duct + cystic artery only.",
    topic: "HPB",
    level: "MRCS"
  },

  {
    stem: "A trauma patient has hypotension, distended neck veins, and muffled heart sounds. What is the diagnosis?",
    options: ["Tension pneumothorax", "Cardiac tamponade", "Massive haemothorax", "Neurogenic shock"],
    correctIndex: 1,
    explanation: "Beck’s triad indicates cardiac tamponade.",
    topic: "Trauma",
    level: "Finals"
  },

  {
    stem: "Which artery is most commonly injured in an anterior shoulder dislocation?",
    options: ["Axillary artery", "Subclavian artery", "Brachial artery", "Circumflex humeral artery"],
    correctIndex: 0,
    explanation: "The axillary artery is vulnerable due to traction during anterior dislocation.",
    topic: "Orthopaedics",
    level: "MRCS"
  },

  {
    stem: "A 60‑year‑old man has painless haematuria. What is the most likely diagnosis?",
    options: ["Bladder cancer", "UTI", "Renal colic", "BPH"],
    correctIndex: 0,
    explanation: "Painless haematuria is bladder cancer until proven otherwise.",
    topic: "Urology",
    level: "Finals"
  },

  {
    stem: "Which electrolyte abnormality is most associated with ileus?",
    options: ["Hypokalaemia", "Hyperkalaemia", "Hyponatraemia", "Hypercalcaemia"],
    correctIndex: 0,
    explanation: "Low potassium impairs smooth muscle contraction.",
    topic: "General",
    level: "Finals"
  }
];
