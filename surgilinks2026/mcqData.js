const demoPool = [
  // General Surgery (10)
  {
    stem: "A 54-year-old man presents with right upper quadrant pain, fever, and jaundice. Ultrasound shows a dilated common bile duct with a stone. What is the most likely diagnosis?",
    options: ["Ascending cholangitis", "Acute cholecystitis", "Gallstone pancreatitis", "Mirizzi syndrome"],
    correctIndex: 0,
    explanation: "Charcot’s triad of fever, jaundice, and right upper quadrant pain with a dilated, obstructed bile duct is classic for ascending cholangitis. This is a surgical emergency requiring prompt antibiotics and biliary decompression, often via ERCP.",
    topic: "General Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old woman presents with epigastric pain radiating to the back and vomiting. Serum amylase is markedly elevated. What is the most likely diagnosis?",
    options: ["Acute pancreatitis", "Peptic ulcer disease", "Acute cholecystitis", "Gastritis"],
    correctIndex: 0,
    explanation: "Acute pancreatitis typically presents with severe epigastric pain radiating to the back, nausea, and elevated amylase or lipase. Gallstones and alcohol are common causes. Early aggressive fluid resuscitation and monitoring for complications are essential.",
    topic: "General Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with progressive dysphagia for solids. Endoscopy reveals an ulcerated mass in the distal oesophagus. What is the most likely diagnosis?",
    options: ["Oesophageal adenocarcinoma", "Achalasia", "Peptic stricture", "Oesophageal squamous carcinoma"],
    correctIndex: 0,
    explanation: "Distal oesophageal malignancies are most commonly adenocarcinomas, often arising from Barrett’s oesophagus. Progressive dysphagia for solids and an ulcerated distal mass strongly support this diagnosis, requiring staging and multidisciplinary oncological and surgical management.",
    topic: "General Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 72-year-old woman presents with iron deficiency anaemia. Colonoscopy reveals a friable mass in the caecum. What is the most likely diagnosis?",
    options: ["Right-sided colon cancer", "Crohn’s disease", "Ulcerative colitis", "Diverticulosis"],
    correctIndex: 0,
    explanation: "Right-sided colon cancers often present with occult bleeding and iron deficiency anaemia rather than obstruction. A friable caecal mass on colonoscopy is highly suspicious for carcinoma and requires biopsy, staging, and consideration of right hemicolectomy.",
    topic: "General Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with acute abdominal pain and a tender, irreducible groin lump. He is tachycardic and febrile. What is the most likely diagnosis?",
    options: ["Strangulated inguinal hernia", "Femoral hernia", "Hydrocele", "Varicocele"],
    correctIndex: 0,
    explanation: "A painful, irreducible groin lump with systemic signs suggests a strangulated inguinal hernia. Bowel within the hernia sac becomes ischaemic, making this a surgical emergency requiring urgent exploration and possible bowel resection.",
    topic: "General Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 48-year-old man presents with painless jaundice and weight loss. Ultrasound shows a mass in the pancreatic head with bile duct dilatation. What is the most likely diagnosis?",
    options: ["Pancreatic adenocarcinoma", "Cholangiocarcinoma", "Gallstone obstruction", "Autoimmune pancreatitis"],
    correctIndex: 0,
    explanation: "Pancreatic head adenocarcinoma commonly presents with painless jaundice due to distal bile duct obstruction. Weight loss and a pancreatic head mass with biliary dilatation strongly support this diagnosis, requiring CT staging and consideration of resection or palliation.",
    topic: "General Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with sudden severe abdominal pain. Upright chest X-ray shows free air under the diaphragm. What is the most likely diagnosis?",
    options: ["Perforated peptic ulcer", "Acute pancreatitis", "Mesenteric ischaemia", "Acute cholecystitis"],
    correctIndex: 0,
    explanation: "Free intraperitoneal air under the diaphragm on erect chest X-ray strongly suggests a perforated hollow viscus, most commonly a perforated peptic ulcer. Urgent resuscitation and surgical repair are required to prevent sepsis and multi-organ failure.",
    topic: "General Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old woman presents with right iliac fossa pain, fever, and anorexia. Ultrasound shows a non-compressible blind-ending tubular structure. What is the most likely diagnosis?",
    options: ["Acute appendicitis", "Crohn’s disease", "Ovarian torsion", "Ectopic pregnancy"],
    correctIndex: 0,
    explanation: "A non-compressible blind-ending tubular structure in the right iliac fossa on ultrasound is characteristic of an inflamed appendix. Clinical features of localized pain, fever, and anorexia support acute appendicitis requiring appendicectomy.",
    topic: "General Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with progressive jaundice and dark urine. Blood tests show elevated conjugated bilirubin and alkaline phosphatase. What is the most likely underlying process?",
    options: ["Obstructive jaundice", "Haemolytic jaundice", "Gilbert’s syndrome", "Acute hepatitis"],
    correctIndex: 0,
    explanation: "Conjugated hyperbilirubinaemia with cholestatic liver function tests suggests obstructive jaundice, often due to stones or malignancy. Imaging such as ultrasound or MRCP is required to identify the site and cause of biliary obstruction.",
    topic: "General Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with severe epigastric pain after heavy alcohol intake. Serum lipase is elevated. What is the most likely diagnosis?",
    options: ["Acute pancreatitis", "Gastritis", "Peptic ulcer disease", "Acute cholecystitis"],
    correctIndex: 0,
    explanation: "Alcohol is a major cause of acute pancreatitis, presenting with severe epigastric pain, vomiting, and raised lipase. Management is supportive with aggressive fluid resuscitation, analgesia, and monitoring for complications such as necrosis or organ failure.",
    topic: "General Surgery",
    level: "MRCS",
    flaggedSet: 0
  },

  // Trauma and Orthopaedics (10)
  {
    stem: "A 25-year-old man falls onto his outstretched hand. He has snuffbox tenderness. Initial X-rays are normal. What is the most likely injury?",
    options: ["Scaphoid fracture", "Colles’ fracture", "Lunate dislocation", "Radial head fracture"],
    correctIndex: 0,
    explanation: "Snuffbox tenderness after a fall on an outstretched hand is highly suggestive of a scaphoid fracture, even with normal initial X-rays. Immobilisation in a thumb spica and repeat imaging are required due to risk of avascular necrosis.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old woman presents after a fall with a shortened, externally rotated leg. What is the most likely diagnosis?",
    options: ["Displaced intracapsular neck of femur fracture", "Posterior hip dislocation", "Tibial shaft fracture", "Pelvic fracture"],
    correctIndex: 0,
    explanation: "A shortened, externally rotated leg in an elderly patient following a fall is classic for a displaced intracapsular neck of femur fracture. Early surgery reduces complications such as thromboembolism, pressure sores, and loss of independence.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with knee pain after twisting injury. He reports locking and giving way. What is the most likely structure injured?",
    options: ["Medial meniscus", "Anterior cruciate ligament", "Lateral collateral ligament", "Patellar tendon"],
    correctIndex: 0,
    explanation: "Locking and intermittent giving way after a twisting knee injury are typical of a meniscal tear, especially the medial meniscus. MRI confirms the diagnosis and arthroscopic repair or partial meniscectomy may be required.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old manual worker presents with shoulder pain and painful arc between 60–120 degrees of abduction. What is the most likely diagnosis?",
    options: ["Rotator cuff impingement", "Frozen shoulder", "Glenohumeral osteoarthritis", "Acromioclavicular joint arthritis"],
    correctIndex: 0,
    explanation: "A painful arc of abduction between 60–120 degrees is characteristic of rotator cuff impingement, often involving supraspinatus. Management includes physiotherapy, NSAIDs, and possible subacromial steroid injection or decompression if symptoms persist.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 22-year-old rugby player presents with shoulder deformity after a tackle. The acromion is prominent and the clavicle elevated. What is the most likely injury?",
    options: ["Acromioclavicular joint dislocation", "Anterior shoulder dislocation", "Clavicle fracture", "Scapular fracture"],
    correctIndex: 0,
    explanation: "Prominent acromion with elevated clavicle following direct trauma to the shoulder suggests acromioclavicular joint dislocation. Management depends on severity, ranging from sling and physiotherapy to surgical stabilisation in high-demand patients.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with chronic low back pain radiating to the leg, worse on walking and relieved by sitting. What is the most likely diagnosis?",
    options: ["Lumbar spinal stenosis", "Lumbar disc prolapse", "Sacroiliitis", "Facet joint arthritis"],
    correctIndex: 0,
    explanation: "Neurogenic claudication with leg pain worse on walking and relieved by flexion or sitting is typical of lumbar spinal stenosis. MRI confirms canal narrowing and decompressive surgery may be required if conservative measures fail.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with sudden onset heel pain after feeling a snap while playing tennis. He cannot plantarflex the foot. What is the most likely diagnosis?",
    options: ["Achilles tendon rupture", "Plantar fasciitis", "Calcaneal fracture", "Ankle sprain"],
    correctIndex: 0,
    explanation: "A sudden snap in the posterior ankle with inability to plantarflex and a positive Thompson test is classic for Achilles tendon rupture. Management may be operative or non-operative, but early functional rehabilitation is important.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old woman presents with wrist pain and tingling in the thumb, index, and middle fingers, worse at night. What is the most likely diagnosis?",
    options: ["Carpal tunnel syndrome", "Ulnar neuropathy", "Radial tunnel syndrome", "De Quervain’s tenosynovitis"],
    correctIndex: 0,
    explanation: "Nocturnal paresthesia in the median nerve distribution with positive Phalen’s or Tinel’s tests suggests carpal tunnel syndrome. Initial management includes splinting and steroid injection; refractory cases may require surgical decompression.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with progressive knee pain, stiffness, and varus deformity. X-ray shows joint space narrowing and osteophytes. What is the most likely diagnosis?",
    options: ["Osteoarthritis of the knee", "Rheumatoid arthritis", "Gouty arthritis", "Septic arthritis"],
    correctIndex: 0,
    explanation: "Joint space narrowing, osteophytes, and varus deformity in an older patient are typical of knee osteoarthritis. Management includes weight loss, physiotherapy, analgesia, and ultimately joint replacement if conservative measures fail.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 28-year-old man presents with anterior shoulder dislocation. Which nerve is most commonly injured?",
    options: ["Axillary nerve", "Radial nerve", "Musculocutaneous nerve", "Ulnar nerve"],
    correctIndex: 0,
    explanation: "Anterior shoulder dislocation commonly injures the axillary nerve, leading to deltoid weakness and sensory loss over the regimental badge area. Neurovascular assessment is essential before and after reduction.",
    topic: "Trauma and Orthopaedics",
    level: "MRCS",
    flaggedSet: 0
  },

  // Neurosurgery (10)
  {
    stem: "A 45-year-old man presents with sudden severe occipital headache, vomiting, and neck stiffness. CT head shows diffuse subarachnoid blood. What is the most likely source?",
    options: ["Ruptured anterior communicating artery aneurysm", "Middle cerebral artery aneurysm", "Basilar artery aneurysm", "Venous sinus thrombosis"],
    correctIndex: 0,
    explanation: "Spontaneous subarachnoid haemorrhage is most commonly due to rupture of an anterior communicating artery berry aneurysm. Sudden severe headache and meningeal signs require urgent CT, neurosurgical assessment, and aneurysm securing by clipping or coiling.",
    topic: "Neurosurgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 72-year-old woman presents with progressive gait disturbance, urinary incontinence, and cognitive decline. MRI shows ventriculomegaly with normal cortical thickness. What is the most likely diagnosis?",
    options: ["Normal pressure hydrocephalus", "Alzheimer’s disease", "Vascular dementia", "Obstructive hydrocephalus from tumour"],
    correctIndex: 0,
    explanation: "The triad of gait disturbance, urinary incontinence, and cognitive impairment with ventriculomegaly but preserved cortex is typical of normal pressure hydrocephalus. CSF drainage trials and ventriculoperitoneal shunting can improve symptoms.",
    topic: "Neurosurgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man sustains a head injury. CT shows a biconvex hyperdense lesion between skull and dura. What is the most likely diagnosis?",
    options: ["Epidural haematoma", "Acute subdural haematoma", "Chronic subdural haematoma", "Intracerebral haemorrhage"],
    correctIndex: 0,
    explanation: "A biconvex (lentiform) hyperdense collection between skull and dura is characteristic of an epidural haematoma, often due to middle meningeal artery injury. Lucid interval followed by deterioration is typical and requires urgent surgical evacuation.",
    topic: "Neurosurgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with a pituitary macroadenoma develops bitemporal hemianopia. Which structure is compressed?",
    options: ["Optic chiasm", "Optic nerve", "Optic tract", "Lateral geniculate nucleus"],
    correctIndex: 0,
    explanation: "Pituitary macroadenomas enlarge superiorly and compress the optic chiasm, causing bitemporal hemianopia. Visual field testing and MRI are essential, and management includes transsphenoidal resection and possible adjuvant medical or radiotherapy.",
    topic: "Neurosurgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with unilateral facial pain triggered by chewing and light touch. MRI shows vascular compression of the trigeminal nerve root. What is the first-line medical treatment?",
    options: ["Carbamazepine", "Gabapentin", "Amitriptyline", "Sodium valproate"],
    correctIndex: 0,
    explanation: "Classical trigeminal neuralgia due to vascular compression is best treated initially with carbamazepine, which stabilises neuronal membranes. Refractory cases may require microvascular decompression or ablative procedures.",
    topic: "Neurosurgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 25-year-old man has a T12 burst fracture after a fall. He has intact motor function but loss of pain and temperature below the lesion. What is the most likely syndrome?",
    options: ["Anterior cord syndrome", "Central cord syndrome", "Brown-Séquard syndrome", "Posterior cord syndrome"],
    correctIndex: 0,
    explanation: "Loss of pain and temperature with preserved motor function suggests anterior cord syndrome, often due to anterior spinal artery compromise. Prognosis is poorer than central cord, and management focuses on stabilisation and rehabilitation.",
    topic: "Neurosurgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with thunderclap headache. CT head is normal. What is the next investigation to exclude subarachnoid haemorrhage?",
    options: ["Lumbar puncture", "MRI brain", "CT venogram", "EEG"],
    correctIndex: 0,
    explanation: "If CT is normal but clinical suspicion of subarachnoid haemorrhage remains high, lumbar puncture is required to look for xanthochromia. This helps detect small bleeds missed on early CT imaging.",
    topic: "Neurosurgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man has progressive unilateral hearing loss and imbalance. MRI shows a cerebellopontine angle mass. What is the most likely diagnosis?",
    options: ["Vestibular schwannoma", "Meningioma", "Ependymoma", "Metastasis"],
    correctIndex: 0,
    explanation: "Unilateral sensorineural hearing loss with a cerebellopontine angle mass is most commonly due to vestibular schwannoma (acoustic neuroma). Management depends on size and symptoms, including observation, radiosurgery, or microsurgical excision.",
    topic: "Neurosurgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with head trauma has a lucid interval followed by rapid deterioration. What is the most likely cause?",
    options: ["Epidural haematoma", "Subdural haematoma", "Diffuse axonal injury", "Cerebral contusion"],
    correctIndex: 0,
    explanation: "A lucid interval after head trauma followed by rapid neurological decline is classic for epidural haematoma, usually arterial. Urgent CT and surgical evacuation are required to prevent brain herniation.",
    topic: "Neurosurgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with acute cauda equina syndrome. What is the most important immediate investigation?",
    options: ["MRI lumbar spine", "CT lumbar spine", "X-ray lumbar spine", "Ultrasound spine"],
    correctIndex: 0,
    explanation: "Cauda equina syndrome with saddle anaesthesia, bladder dysfunction, and bilateral leg symptoms requires urgent MRI to identify compressive pathology. Early decompression improves neurological and sphincter outcomes.",
    topic: "Neurosurgery",
    level: "MRCS",
    flaggedSet: 0
  },

  // Urology (10)
  {
    stem: "A 65-year-old man presents with poor urinary stream, hesitancy, and nocturia. Digital rectal examination reveals a smooth, enlarged prostate. What is the most likely diagnosis?",
    options: ["Benign prostatic hyperplasia", "Prostate cancer", "Prostatitis", "Urethral stricture"],
    correctIndex: 0,
    explanation: "Lower urinary tract symptoms with a smooth, enlarged prostate on examination are typical of benign prostatic hyperplasia. Management includes lifestyle measures, alpha-blockers, 5-alpha-reductase inhibitors, and possible TURP if refractory.",
    topic: "Urology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with colicky flank pain radiating to the groin and haematuria. What is the most likely diagnosis?",
    options: ["Ureteric calculus", "Pyelonephritis", "Renal tumour", "Bladder carcinoma"],
    correctIndex: 0,
    explanation: "Severe colicky flank pain radiating to the groin with haematuria is classic for ureteric colic due to a stone. Non-contrast CT KUB is the investigation of choice to confirm size and location.",
    topic: "Urology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old smoker presents with painless visible haematuria. What is the most likely diagnosis?",
    options: ["Transitional cell carcinoma of bladder", "Renal cell carcinoma", "Benign prostatic hyperplasia", "Urinary tract infection"],
    correctIndex: 0,
    explanation: "Painless visible haematuria in a smoker is highly suspicious for transitional cell carcinoma of the bladder. Cystoscopy with biopsy is essential for diagnosis and staging.",
    topic: "Urology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with a painless testicular lump. Ultrasound shows a solid intratesticular mass. What is the most likely diagnosis?",
    options: ["Testicular germ cell tumour", "Epididymal cyst", "Hydrocele", "Varicocele"],
    correctIndex: 0,
    explanation: "A painless solid intratesticular mass is highly suspicious for a testicular germ cell tumour. Radical inguinal orchidectomy is both diagnostic and therapeutic, followed by staging and oncological management.",
    topic: "Urology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man has PSA 40 ng/mL and hard, irregular prostate on examination. What is the most likely diagnosis?",
    options: ["Prostate cancer", "Benign prostatic hyperplasia", "Prostatitis", "Urethral stricture"],
    correctIndex: 0,
    explanation: "Markedly elevated PSA with a hard, irregular prostate suggests prostate cancer. Multiparametric MRI and biopsy confirm diagnosis and guide staging and treatment options such as surgery, radiotherapy, or hormonal therapy.",
    topic: "Urology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 28-year-old man presents with sudden onset scrotal pain and high-riding testis. Cremasteric reflex is absent. What is the most likely diagnosis?",
    options: ["Testicular torsion", "Epididymo-orchitis", "Inguinal hernia", "Hydrocele"],
    correctIndex: 0,
    explanation: "Acute scrotal pain with high-riding testis and absent cremasteric reflex is classic for testicular torsion. This is a surgical emergency requiring urgent exploration and detorsion to preserve testicular viability.",
    topic: "Urology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with recurrent urinary tract infections and poor stream. Uroflowmetry shows low flow rate. What is the most likely diagnosis?",
    options: ["Urethral stricture", "Benign prostatic hyperplasia", "Neurogenic bladder", "Bladder carcinoma"],
    correctIndex: 0,
    explanation: "Recurrent infections and obstructive voiding symptoms with low flow rate suggest urethral stricture. Retrograde urethrogram confirms location and length, guiding endoscopic or open reconstruction.",
    topic: "Urology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with flank mass and weight loss. CT shows an enhancing renal mass. What is the most likely diagnosis?",
    options: ["Renal cell carcinoma", "Angiomyolipoma", "Simple renal cyst", "Pyelonephritis"],
    correctIndex: 0,
    explanation: "Enhancing solid renal mass on CT is typical of renal cell carcinoma. Management includes partial or radical nephrectomy depending on size and stage, with consideration of systemic therapy for advanced disease.",
    topic: "Urology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with lower urinary tract symptoms and recurrent haematuria. Cystoscopy shows papillary bladder lesions. What is the most likely diagnosis?",
    options: ["Non-muscle invasive bladder cancer", "Benign prostatic hyperplasia", "Interstitial cystitis", "Renal cell carcinoma"],
    correctIndex: 0,
    explanation: "Papillary bladder lesions on cystoscopy with haematuria suggest non-muscle invasive bladder cancer. Transurethral resection and intravesical therapy are standard, with surveillance cystoscopy for recurrence.",
    topic: "Urology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with stress incontinence after radical prostatectomy. What is the most likely mechanism?",
    options: ["Sphincteric incompetence", "Detrusor overactivity", "Urethral stricture", "Bladder outlet obstruction"],
    correctIndex: 0,
    explanation: "Post-prostatectomy stress incontinence is usually due to intrinsic sphincteric incompetence from damage to the external urethral sphincter. Pelvic floor exercises and surgical options such as slings or artificial sphincters may be required.",
    topic: "Urology",
    level: "MRCS",
    flaggedSet: 0
  },

  // Vascular Surgery (10)
  {
    stem: "A 68-year-old man presents with sudden onset severe leg pain, pallor, pulselessness, and paralysis. What is the most likely diagnosis?",
    options: ["Acute limb ischaemia", "Deep vein thrombosis", "Cellulitis", "Compartment syndrome"],
    correctIndex: 0,
    explanation: "The six Ps—pain, pallor, pulselessness, paresthesia, paralysis, and poikilothermia—are classic for acute limb ischaemia. Urgent vascular assessment and revascularisation are required to salvage the limb.",
    topic: "Vascular Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man with hypertension has a pulsatile abdominal mass. Ultrasound shows a 6 cm infrarenal aneurysm. What is the most likely diagnosis?",
    options: ["Abdominal aortic aneurysm", "Retroperitoneal tumour", "Pancreatic pseudocyst", "Renal mass"],
    correctIndex: 0,
    explanation: "A pulsatile abdominal mass with ultrasound showing a dilated infrarenal aorta is diagnostic of abdominal aortic aneurysm. Size over 5.5 cm generally warrants elective repair due to rupture risk.",
    topic: "Vascular Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old smoker presents with intermittent calf pain on walking that is relieved by rest. What is the most likely diagnosis?",
    options: ["Peripheral arterial disease", "Deep vein thrombosis", "Lumbar spinal stenosis", "Chronic compartment syndrome"],
    correctIndex: 0,
    explanation: "Intermittent claudication—exercise-induced calf pain relieved by rest—is typical of peripheral arterial disease. Risk factor modification and antiplatelet therapy are essential; severe cases may require revascularisation.",
    topic: "Vascular Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old woman presents with painful, swollen leg after long-haul flight. Duplex ultrasound shows femoral vein thrombosis. What is the most likely diagnosis?",
    options: ["Deep vein thrombosis", "Cellulitis", "Superficial thrombophlebitis", "Lymphoedema"],
    correctIndex: 0,
    explanation: "Acute unilateral leg swelling with venous thrombus on ultrasound is diagnostic of deep vein thrombosis. Anticoagulation is required to prevent pulmonary embolism and post-thrombotic syndrome.",
    topic: "Vascular Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with ulceration over the medial malleolus and varicose veins. What is the most likely underlying pathology?",
    options: ["Chronic venous insufficiency", "Peripheral arterial disease", "Diabetic neuropathy", "Pressure ulcer"],
    correctIndex: 0,
    explanation: "Medial malleolar ulcers with varicose veins are typical of chronic venous insufficiency. Management includes compression therapy, wound care, and addressing superficial venous reflux.",
    topic: "Vascular Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man presents with transient right arm weakness and aphasia lasting 20 minutes. Carotid Doppler shows 80% stenosis of left internal carotid artery. What is the most likely diagnosis?",
    options: ["Symptomatic carotid stenosis", "Migraine aura", "Seizure", "Multiple sclerosis"],
    correctIndex: 0,
    explanation: "Transient focal neurological symptoms with high-grade ipsilateral carotid stenosis indicate symptomatic carotid disease. Carotid endarterectomy or stenting reduces stroke risk when performed promptly.",
    topic: "Vascular Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with blue toe syndrome and livedo reticularis after vascular surgery. What is the most likely cause?",
    options: ["Cholesterol embolisation", "Deep vein thrombosis", "Raynaud’s phenomenon", "Vasculitis"],
    correctIndex: 0,
    explanation: "Blue toe syndrome and livedo reticularis following vascular manipulation suggest cholesterol embolisation from atherosclerotic plaques. Management is supportive and focuses on risk factor control.",
    topic: "Vascular Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old woman presents with digital ulceration and sclerodactyly. What is the most likely vascular complication?",
    options: ["Raynaud’s phenomenon", "Buerger’s disease", "Takayasu arteritis", "Giant cell arteritis"],
    correctIndex: 0,
    explanation: "Digital ulceration and sclerodactyly in systemic sclerosis are associated with severe Raynaud’s phenomenon. Vasodilators and sometimes prostacyclin infusions are used to improve blood flow and prevent tissue loss.",
    topic: "Vascular Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with rest pain in the foot and dependent rubor. What is the most likely diagnosis?",
    options: ["Critical limb ischaemia", "Deep vein thrombosis", "Cellulitis", "Neuropathic pain"],
    correctIndex: 0,
    explanation: "Rest pain and dependent rubor indicate critical limb ischaemia, representing advanced peripheral arterial disease. Urgent vascular assessment and revascularisation are needed to prevent limb loss.",
    topic: "Vascular Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with sudden tearing chest pain radiating to the back and blood pressure discrepancy between arms. What is the most likely diagnosis?",
    options: ["Acute aortic dissection", "Myocardial infarction", "Pulmonary embolism", "Pericarditis"],
    correctIndex: 0,
    explanation: "Tearing chest pain radiating to the back with inter-arm blood pressure difference is classic for acute aortic dissection. CT angiography confirms diagnosis and guides urgent medical or surgical management.",
    topic: "Vascular Surgery",
    level: "MRCS",
    flaggedSet: 0
  },

  // Paediatric Surgery (10)
  {
    stem: "A 3-week-old boy presents with projectile non-bilious vomiting and weight loss. Ultrasound shows thickened pylorus. What is the most likely diagnosis?",
    options: ["Hypertrophic pyloric stenosis", "Duodenal atresia", "Gastro-oesophageal reflux", "Malrotation with volvulus"],
    correctIndex: 0,
    explanation: "Projectile non-bilious vomiting in a young infant with pyloric muscle hypertrophy on ultrasound is classic for hypertrophic pyloric stenosis. Management is fluid resuscitation followed by pyloromyotomy.",
    topic: "Paediatric Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 2-day-old neonate has bilious vomiting and a double bubble sign on X-ray. What is the most likely diagnosis?",
    options: ["Duodenal atresia", "Pyloric stenosis", "Hirschsprung disease", "Meconium ileus"],
    correctIndex: 0,
    explanation: "Bilious vomiting with a double bubble sign indicates duodenal obstruction, most commonly duodenal atresia. It is associated with Down syndrome and requires surgical correction.",
    topic: "Paediatric Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 1-day-old neonate fails to pass meconium and has abdominal distension. Contrast enema shows a transition zone in the rectosigmoid. What is the most likely diagnosis?",
    options: ["Hirschsprung disease", "Meconium ileus", "Small bowel atresia", "Imperforate anus"],
    correctIndex: 0,
    explanation: "Failure to pass meconium with a transition zone on contrast enema is typical of Hirschsprung disease due to aganglionic distal bowel. Definitive treatment is resection of the aganglionic segment.",
    topic: "Paediatric Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 6-year-old boy presents with painless scrotal swelling that transilluminates. What is the most likely diagnosis?",
    options: ["Hydrocele", "Inguinal hernia", "Varicocele", "Testicular tumour"],
    correctIndex: 0,
    explanation: "Painless scrotal swelling that transilluminates is typical of a hydrocele. In children, many resolve spontaneously; persistent or large hydroceles may require surgical correction.",
    topic: "Paediatric Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 4-year-old boy presents with intermittent abdominal pain, vomiting, and red currant jelly stools. Ultrasound shows a target sign. What is the most likely diagnosis?",
    options: ["Intussusception", "Appendicitis", "Meckel’s diverticulum", "Volvulus"],
    correctIndex: 0,
    explanation: "Colicky pain, vomiting, and red currant jelly stools with a target sign on ultrasound are classic for intussusception. Air or contrast enema reduction is both diagnostic and therapeutic.",
    topic: "Paediatric Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 5-year-old girl presents with recurrent urinary tract infections and a palpable abdominal mass. Ultrasound shows hydronephrosis. What is the most likely diagnosis?",
    options: ["Pelvi-ureteric junction obstruction", "Vesicoureteric reflux", "Polycystic kidney disease", "Neuroblastoma"],
    correctIndex: 0,
    explanation: "Hydronephrosis with recurrent infections and mass in a child suggests pelvi-ureteric junction obstruction. Diuretic renography assesses function and drainage, guiding surgical pyeloplasty.",
    topic: "Paediatric Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 2-year-old boy presents with an inguinal swelling that appears on crying and disappears at rest. What is the most likely diagnosis?",
    options: ["Inguinal hernia", "Hydrocele", "Lymphadenopathy", "Varicocele"],
    correctIndex: 0,
    explanation: "Intermittent groin swelling that appears with crying and reduces spontaneously is typical of an inguinal hernia. In children, repair is recommended due to high risk of incarceration.",
    topic: "Paediatric Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 1-day-old neonate has excessive salivation and coughing with feeds. X-ray shows nasogastric tube coiled in upper oesophagus. What is the most likely diagnosis?",
    options: ["Oesophageal atresia with distal fistula", "Duodenal atresia", "Tracheomalacia", "Laryngomalacia"],
    correctIndex: 0,
    explanation: "Coiled nasogastric tube in the upper oesophagus with respiratory symptoms suggests oesophageal atresia, usually with distal tracheo-oesophageal fistula. Surgical repair is required after stabilisation.",
    topic: "Paediatric Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 7-year-old boy presents with right lower quadrant pain and fever. Ultrasound shows an enlarged, non-compressible appendix. What is the most likely diagnosis?",
    options: ["Acute appendicitis", "Mesenteric adenitis", "Crohn’s disease", "Intussusception"],
    correctIndex: 0,
    explanation: "Non-compressible enlarged appendix on ultrasound with localized pain and fever is diagnostic of acute appendicitis. Appendicectomy is the standard treatment.",
    topic: "Paediatric Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 3-year-old girl presents with a midline neck swelling that moves with tongue protrusion. What is the most likely diagnosis?",
    options: ["Thyroglossal duct cyst", "Branchial cyst", "Lymphadenopathy", "Dermoid cyst"],
    correctIndex: 0,
    explanation: "Midline neck swelling that moves with tongue protrusion is characteristic of a thyroglossal duct cyst. Sistrunk procedure, including excision of the cyst and central hyoid, is definitive treatment.",
    topic: "Paediatric Surgery",
    level: "MRCS",
    flaggedSet: 0
  },

  // Otolaryngology (10)
  {
    stem: "A 45-year-old man presents with progressive hoarseness and dysphagia. He is a heavy smoker. Laryngoscopy shows a vocal cord mass. What is the most likely diagnosis?",
    options: ["Laryngeal squamous cell carcinoma", "Vocal cord polyp", "Reflux laryngitis", "Papillomatosis"],
    correctIndex: 0,
    explanation: "Hoarseness and dysphagia in a smoker with a vocal cord mass strongly suggest laryngeal squamous cell carcinoma. Biopsy confirms diagnosis and staging guides surgery, radiotherapy, or chemoradiation.",
    topic: "Otolaryngology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old woman presents with recurrent sinusitis, nasal obstruction, and facial pain. Endoscopy shows nasal polyps. What is the most likely underlying condition?",
    options: ["Chronic rhinosinusitis with polyps", "Allergic rhinitis", "Deviated nasal septum", "Acute sinusitis"],
    correctIndex: 0,
    explanation: "Nasal obstruction, facial pain, and endoscopic polyps indicate chronic rhinosinusitis with nasal polyps. Management includes topical steroids, saline irrigation, and possible functional endoscopic sinus surgery.",
    topic: "Otolaryngology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 5-year-old child presents with snoring, mouth breathing, and recurrent otitis media. Examination shows enlarged adenoids. What is the most likely diagnosis?",
    options: ["Adenoid hypertrophy causing obstruction", "Tonsillitis", "Allergic rhinitis", "Choanal atresia"],
    correctIndex: 0,
    explanation: "Snoring, mouth breathing, and recurrent otitis media in a child with enlarged adenoids suggest adenoid hypertrophy causing nasopharyngeal obstruction and Eustachian tube dysfunction. Adenoidectomy may be indicated.",
    topic: "Otolaryngology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with unilateral hearing loss and tinnitus. Audiogram shows sensorineural loss. What is the most likely diagnosis?",
    options: ["Presbycusis", "Vestibular schwannoma", "Otitis media with effusion", "Otosclerosis"],
    correctIndex: 0,
    explanation: "Unilateral sensorineural hearing loss with tinnitus raises suspicion of vestibular schwannoma. MRI of the internal auditory meatus is required to confirm diagnosis.",
    topic: "Otolaryngology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old woman presents with episodic vertigo, fluctuating hearing loss, and tinnitus. What is the most likely diagnosis?",
    options: ["Ménière’s disease", "Benign paroxysmal positional vertigo", "Vestibular neuritis", "Labyrinthitis"],
    correctIndex: 0,
    explanation: "The triad of episodic vertigo, fluctuating sensorineural hearing loss, and tinnitus is characteristic of Ménière’s disease. Management includes dietary modification, vestibular suppressants, and sometimes intratympanic therapy.",
    topic: "Otolaryngology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with recurrent epistaxis from Little’s area. What is the most likely cause?",
    options: ["Anterior septal vessel bleeding", "Posterior nasal bleeding", "Nasopharyngeal tumour", "Hereditary haemorrhagic telangiectasia"],
    correctIndex: 0,
    explanation: "Most epistaxis arises from Kiesselbach’s plexus in Little’s area on the anterior septum. Local pressure, cautery, and nasal packing are standard treatments.",
    topic: "Otolaryngology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 7-year-old child presents with recurrent sore throats and obstructive sleep symptoms. Tonsils are enlarged. What is the most likely diagnosis?",
    options: ["Chronic tonsillitis with hypertrophy", "Peritonsillar abscess", "Epiglottitis", "Laryngotracheobronchitis"],
    correctIndex: 0,
    explanation: "Recurrent sore throats and obstructive sleep symptoms with enlarged tonsils suggest chronic tonsillitis with hypertrophy. Tonsillectomy may be indicated based on frequency and severity.",
    topic: "Otolaryngology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with unilateral neck mass and referred otalgia. He is a smoker. What is the most likely diagnosis?",
    options: ["Oropharyngeal carcinoma with nodal metastasis", "Reactive lymphadenopathy", "Thyroid nodule", "Parotid tumour"],
    correctIndex: 0,
    explanation: "Unilateral neck mass with referred ear pain in a smoker suggests oropharyngeal carcinoma with nodal metastasis. Flexible nasoendoscopy and biopsy are required.",
    topic: "Otolaryngology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 3-year-old child presents with inspiratory stridor and barking cough. What is the most likely diagnosis?",
    options: ["Laryngotracheobronchitis (croup)", "Epiglottitis", "Foreign body aspiration", "Asthma"],
    correctIndex: 0,
    explanation: "Barking cough and inspiratory stridor in a young child are typical of croup. Management includes steroids and nebulised adrenaline in severe cases.",
    topic: "Otolaryngology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with progressive dysphagia and weight loss. Endoscopy shows a hypopharyngeal mass. What is the most likely diagnosis?",
    options: ["Hypopharyngeal squamous cell carcinoma", "Benign stricture", "Zenker’s diverticulum", "Achalasia"],
    correctIndex: 0,
    explanation: "Progressive dysphagia and weight loss with a hypopharyngeal mass are highly suspicious for squamous cell carcinoma. Biopsy and staging are essential for planning surgery and radiotherapy.",
    topic: "Otolaryngology",
    level: "MRCS",
    flaggedSet: 0
  },

  // Maxillofacial Surgery (10)
  {
    stem: "A 25-year-old man presents after assault with malocclusion and mobility of the maxillary teeth. What is the most likely fracture pattern?",
    options: ["Le Fort I fracture", "Le Fort II fracture", "Le Fort III fracture", "Zygomatic complex fracture"],
    correctIndex: 0,
    explanation: "Mobility of the maxillary alveolus with malocclusion suggests a Le Fort I fracture, a horizontal maxillary fracture. CT imaging confirms the pattern and guides fixation.",
    topic: "Maxillofacial Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with flattened cheek, diplopia, and infraorbital nerve paraesthesia after trauma. What is the most likely diagnosis?",
    options: ["Zygomatic complex fracture", "Mandibular fracture", "Nasal fracture", "Orbital floor blowout"],
    correctIndex: 0,
    explanation: "Flattened cheek, diplopia, and infraorbital nerve symptoms are typical of zygomatic complex fracture. CT imaging and surgical reduction with fixation may be required.",
    topic: "Maxillofacial Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with trismus, fever, and pericoronal swelling around a partially erupted lower third molar. What is the most likely diagnosis?",
    options: ["Pericoronitis", "Dental abscess", "Osteomyelitis", "Temporomandibular joint dysfunction"],
    correctIndex: 0,
    explanation: "Inflammation around a partially erupted third molar with trismus and fever suggests pericoronitis. Management includes irrigation, antibiotics, and eventual extraction.",
    topic: "Maxillofacial Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old smoker presents with non-healing ulcer on the lateral tongue. What is the most likely diagnosis?",
    options: ["Squamous cell carcinoma of tongue", "Aphthous ulcer", "Traumatic ulcer", "Lichen planus"],
    correctIndex: 0,
    explanation: "Persistent ulcer on the lateral tongue in a smoker is highly suspicious for squamous cell carcinoma. Biopsy confirms diagnosis and staging guides surgical and oncological treatment.",
    topic: "Maxillofacial Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with mandibular deviation on opening and clicking in the temporomandibular joint. What is the most likely diagnosis?",
    options: ["Temporomandibular joint dysfunction", "Mandibular fracture", "Parotid tumour", "Osteomyelitis"],
    correctIndex: 0,
    explanation: "Joint clicking and deviation on opening suggest temporomandibular joint dysfunction, often due to disc displacement. Management includes conservative measures such as splints, physiotherapy, and analgesia.",
    topic: "Maxillofacial Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 20-year-old man presents with step deformity at the angle of the mandible and malocclusion after trauma. What is the most likely diagnosis?",
    options: ["Mandibular fracture", "Zygomatic fracture", "Maxillary fracture", "Nasal fracture"],
    correctIndex: 0,
    explanation: "Step deformity and malocclusion after trauma are typical of mandibular fracture. Panoramic radiograph or CT confirms the fracture and guides open reduction and internal fixation.",
    topic: "Maxillofacial Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with unilateral facial swelling and pain. CT shows a parotid mass. What is the most likely benign tumour?",
    options: ["Pleomorphic adenoma", "Warthin tumour", "Lipoma", "Haemangioma"],
    correctIndex: 0,
    explanation: "Pleomorphic adenoma is the most common benign parotid tumour, presenting as a slow-growing, painless mass. Superficial parotidectomy is standard treatment to prevent malignant transformation.",
    topic: "Maxillofacial Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with facial nerve palsy and parotid mass. What is the most likely diagnosis?",
    options: ["Malignant parotid tumour", "Pleomorphic adenoma", "Warthin tumour", "Benign lymphadenopathy"],
    correctIndex: 0,
    explanation: "Facial nerve palsy in the presence of a parotid mass strongly suggests malignancy. Imaging and biopsy are required, and treatment involves radical parotidectomy with possible nerve reconstruction.",
    topic: "Maxillofacial Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 10-year-old child presents with painless swelling of the mandible and multilocular radiolucency on X-ray. What is the most likely diagnosis?",
    options: ["Ameloblastoma", "Osteosarcoma", "Fibrous dysplasia", "Dentigerous cyst"],
    correctIndex: 0,
    explanation: "Multilocular radiolucency in the mandible suggests ameloblastoma, a benign but locally aggressive tumour. Surgical resection with adequate margins is required.",
    topic: "Maxillofacial Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with facial trauma and CSF rhinorrhoea. What is the most likely underlying injury?",
    options: ["Anterior skull base fracture", "Nasal bone fracture", "Zygomatic fracture", "Mandibular fracture"],
    correctIndex: 0,
    explanation: "CSF rhinorrhoea after facial trauma indicates anterior skull base fracture involving cribriform plate. CT imaging and neurosurgical input are required to manage leak and prevent meningitis.",
    topic: "Maxillofacial Surgery",
    level: "MRCS",
    flaggedSet: 0
  },

  // Core Surgery (10)
  {
    stem: "A 30-year-old woman presents with acute right iliac fossa pain, fever, and raised inflammatory markers. What is the most likely diagnosis?",
    options: ["Acute appendicitis", "Ovarian torsion", "Ectopic pregnancy", "Crohn’s disease"],
    correctIndex: 0,
    explanation: "Localized right iliac fossa pain with fever and raised inflammatory markers is typical of acute appendicitis. Clinical assessment and imaging guide decision for appendicectomy.",
    topic: "Core Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with sudden onset severe chest pain and sweating. ECG shows ST elevation in leads II, III, and aVF. What is the most likely diagnosis?",
    options: ["Inferior myocardial infarction", "Pulmonary embolism", "Aortic dissection", "Pericarditis"],
    correctIndex: 0,
    explanation: "ST elevation in inferior leads with typical chest pain indicates inferior myocardial infarction. Urgent reperfusion therapy is required.",
    topic: "Core Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old woman presents with breast lump, peau d’orange, and nipple retraction. What is the most likely diagnosis?",
    options: ["Invasive breast carcinoma", "Fibroadenoma", "Breast cyst", "Mastitis"],
    correctIndex: 0,
    explanation: "Skin changes such as peau d’orange and nipple retraction with a breast lump are highly suspicious for invasive carcinoma. Triple assessment confirms diagnosis.",
    topic: "Core Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with weight loss, anaemia, and change in bowel habit. What is the most likely diagnosis?",
    options: ["Colorectal carcinoma", "Irritable bowel syndrome", "Diverticular disease", "Coeliac disease"],
    correctIndex: 0,
    explanation: "Weight loss, anaemia, and altered bowel habit in an older patient are classic red flags for colorectal carcinoma. Colonoscopy and biopsy confirm diagnosis.",
    topic: "Core Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old woman presents with right upper quadrant pain after fatty meals and positive Murphy’s sign. What is the most likely diagnosis?",
    options: ["Acute cholecystitis", "Biliary colic", "Peptic ulcer disease", "Pancreatitis"],
    correctIndex: 0,
    explanation: "Right upper quadrant pain with positive Murphy’s sign suggests acute cholecystitis. Ultrasound confirms gallstones and wall thickening, guiding cholecystectomy.",
    topic: "Core Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with painful swelling in the groin that reduces on lying down. What is the most likely diagnosis?",
    options: ["Inguinal hernia", "Femoral hernia", "Lymphadenopathy", "Hydrocele"],
    correctIndex: 0,
    explanation: "Reducible groin swelling that appears on standing is typical of inguinal hernia. Elective repair prevents complications such as incarceration.",
    topic: "Core Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with haematemesis and melena. Endoscopy shows a bleeding duodenal ulcer. What is the most likely diagnosis?",
    options: ["Peptic ulcer disease", "Mallory-Weiss tear", "Oesophageal varices", "Gastric carcinoma"],
    correctIndex: 0,
    explanation: "Bleeding duodenal ulcer on endoscopy confirms peptic ulcer disease as the source of upper GI bleeding. Endoscopic therapy and proton pump inhibitors are mainstays.",
    topic: "Core Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with painless jaundice and palpable gallbladder. What is the most likely diagnosis?",
    options: ["Carcinoma of the head of pancreas", "Gallstone disease", "Hepatitis", "Primary sclerosing cholangitis"],
    correctIndex: 0,
    explanation: "Painless jaundice with palpable gallbladder (Courvoisier’s sign) suggests malignant obstruction, most commonly pancreatic head carcinoma. Imaging and staging are required.",
    topic: "Core Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with acute scrotal pain and swelling. Doppler ultrasound shows increased blood flow. What is the most likely diagnosis?",
    options: ["Epididymo-orchitis", "Testicular torsion", "Hydrocele", "Varicocele"],
    correctIndex: 0,
    explanation: "Acute scrotal pain with increased blood flow on Doppler suggests epididymo-orchitis rather than torsion. Antibiotics and scrotal support are main treatments.",
    topic: "Core Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old woman presents with tender, erythematous breast lump during lactation. What is the most likely diagnosis?",
    options: ["Breast abscess", "Fibroadenoma", "Breast carcinoma", "Galactocele"],
    correctIndex: 0,
    explanation: "Painful erythematous lump in a lactating woman suggests breast abscess. Ultrasound and drainage with antibiotics are required.",
    topic: "Core Surgery",
    level: "MRCS",
    flaggedSet: 0
  },

  // Cardiothoracic Surgery (10)
  {
    stem: "A 65-year-old man presents with exertional chest pain relieved by rest. ECG is normal at rest. What is the most likely diagnosis?",
    options: ["Stable angina", "Unstable angina", "Pericarditis", "Pulmonary embolism"],
    correctIndex: 0,
    explanation: "Predictable exertional chest pain relieved by rest is typical of stable angina due to fixed coronary stenosis. Management includes risk factor control and antianginal therapy.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with sudden onset pleuritic chest pain and dyspnoea after long-haul flight. What is the most likely diagnosis?",
    options: ["Pulmonary embolism", "Pneumothorax", "Myocardial infarction", "Pericarditis"],
    correctIndex: 0,
    explanation: "Pleuritic chest pain and dyspnoea with risk factors such as immobility suggest pulmonary embolism. CT pulmonary angiography confirms diagnosis.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 25-year-old man presents with sudden pleuritic chest pain and dyspnoea. Chest X-ray shows collapsed lung with visible pleural line. What is the most likely diagnosis?",
    options: ["Spontaneous pneumothorax", "Pulmonary embolism", "Pneumonia", "Pericarditis"],
    correctIndex: 0,
    explanation: "Visible pleural line with absent lung markings beyond indicates pneumothorax. In a young man without trauma, this is likely spontaneous. Management depends on size and symptoms.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man presents with progressive dyspnoea, orthopnoea, and ankle swelling. What is the most likely diagnosis?",
    options: ["Congestive heart failure", "COPD", "Pulmonary embolism", "Pericardial effusion"],
    correctIndex: 0,
    explanation: "Dyspnoea, orthopnoea, and peripheral oedema are classic for congestive heart failure. Echocardiography assesses ventricular function and valve disease.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with fever, pleuritic chest pain, and pericardial rub. What is the most likely diagnosis?",
    options: ["Acute pericarditis", "Myocardial infarction", "Pulmonary embolism", "Pneumonia"],
    correctIndex: 0,
    explanation: "Pleuritic chest pain with pericardial rub suggests acute pericarditis. ECG often shows diffuse ST elevation. Treatment is anti-inflammatory medication.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with syncope and harsh ejection systolic murmur radiating to carotids. What is the most likely diagnosis?",
    options: ["Aortic stenosis", "Mitral regurgitation", "Pulmonary stenosis", "Hypertrophic cardiomyopathy"],
    correctIndex: 0,
    explanation: "Syncope and ejection systolic murmur radiating to carotids are typical of aortic stenosis. Echocardiography assesses severity and need for valve replacement.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old woman presents with dyspnoea and haemoptysis. CT shows central lung mass obstructing bronchus. What is the most likely diagnosis?",
    options: ["Squamous cell carcinoma of lung", "Adenocarcinoma", "Small cell carcinoma", "Benign hamartoma"],
    correctIndex: 0,
    explanation: "Central lung mass with haemoptysis is typical of squamous cell carcinoma. Bronchoscopy and biopsy confirm diagnosis.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with chest trauma and hypotension. Ultrasound shows pericardial fluid with right ventricular collapse. What is the most likely diagnosis?",
    options: ["Cardiac tamponade", "Pulmonary contusion", "Pneumothorax", "Aortic rupture"],
    correctIndex: 0,
    explanation: "Pericardial fluid with right ventricular diastolic collapse indicates cardiac tamponade. Urgent pericardiocentesis or surgical drainage is required.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with chronic cough, sputum production, and barrel-shaped chest. What is the most likely diagnosis?",
    options: ["COPD", "Asthma", "Bronchiectasis", "Interstitial lung disease"],
    correctIndex: 0,
    explanation: "Chronic cough, sputum, and hyperinflated chest are typical of COPD. Spirometry confirms airflow obstruction.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with sudden onset tearing chest pain radiating to the back. CT shows dissection of ascending aorta. What is the most likely diagnosis?",
    options: ["Type A aortic dissection", "Type B aortic dissection", "Myocardial infarction", "Pulmonary embolism"],
    correctIndex: 0,
    explanation: "Dissection involving ascending aorta is Type A and requires urgent surgical repair due to risk of rupture and tamponade.",
    topic: "Cardiothoracic Surgery",
    level: "MRCS",
    flaggedSet: 0
  },

  // General Surgery (10)
  {
    stem: "A 45-year-old woman presents with right upper quadrant pain after fatty meals. Ultrasound shows gallstones without duct dilatation. What is the most likely diagnosis?",
    options: ["Biliary colic", "Acute cholecystitis", "Gallstone pancreatitis", "Ascending cholangitis"],
    correctIndex: 0,
    explanation: "Intermittent right upper quadrant pain after fatty meals with gallstones but no inflammatory signs or duct dilatation is typical of biliary colic. Pain is due to transient cystic duct obstruction and usually settles spontaneously.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with burning epigastric pain relieved by food and antacids. What is the most likely diagnosis?",
    options: ["Duodenal ulcer", "Gastric ulcer", "Acute pancreatitis", "Gastritis"],
    correctIndex: 0,
    explanation: "Epigastric pain that improves with food and antacids is characteristic of duodenal ulcer disease. Gastric ulcers more often worsen with food. H. pylori infection and NSAIDs are common causes requiring eradication and acid suppression.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with progressive difficulty swallowing solids, then liquids, and weight loss. What is the most likely diagnosis?",
    options: ["Oesophageal carcinoma", "Achalasia", "Peptic stricture", "Diffuse oesophageal spasm"],
    correctIndex: 0,
    explanation: "Progressive dysphagia for solids then liquids with weight loss is highly suggestive of oesophageal carcinoma. Endoscopy with biopsy is required to confirm the diagnosis and plan staging and treatment.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    // General Surgery (10)

    stem: "A 35-year-old woman presents with sudden right upper quadrant pain after a fatty meal. She is afebrile and ultrasound shows gallstones but no wall thickening. What is the most likely diagnosis?",
    options: ["Biliary colic", "Acute cholecystitis", "Ascending cholangitis", "Gallstone pancreatitis"],
    correctIndex: 0,
    explanation: "Short-lived right upper quadrant pain after fatty food with gallstones but no inflammatory changes suggests biliary colic. Pain settles with analgesia, and elective cholecystectomy is usually advised to prevent recurrent episodes.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with burning epigastric pain relieved by antacids. Endoscopy shows a small duodenal ulcer. What is the most likely underlying cause?",
    options: ["Helicobacter pylori infection", "NSAID use", "Zollinger–Ellison syndrome", "Crohn’s disease"],
    correctIndex: 0,
    explanation: "Most duodenal ulcers are caused by Helicobacter pylori infection, which increases gastric acid secretion. Eradication therapy with antibiotics and proton pump inhibitors is standard treatment to prevent recurrence.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with progressive difficulty swallowing solids. He has long-standing reflux symptoms. What is the most likely diagnosis?",
    options: ["Oesophageal stricture", "Achalasia", "Oesophageal cancer", "Diffuse oesophageal spasm"],
    correctIndex: 0,
    explanation: "Long-standing reflux can cause peptic oesophageal stricture, leading to progressive dysphagia for solids. Endoscopy confirms the diagnosis and allows dilatation and acid suppression therapy.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 25-year-old man presents with periumbilical pain that later localises to the right iliac fossa with mild fever. What is the most likely diagnosis?",
    options: ["Acute appendicitis", "Mesenteric adenitis", "Renal colic", "Gastroenteritis"],
    correctIndex: 0,
    explanation: "Classical appendicitis begins with vague periumbilical pain that localises to the right iliac fossa, often with anorexia and low-grade fever. Clinical diagnosis is common and usually followed by appendicectomy.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old woman presents with a painless breast lump discovered on self-examination. What is the most appropriate initial investigation?",
    options: ["Triple assessment", "Immediate mastectomy", "MRI breast", "Fine needle aspiration alone"],
    correctIndex: 0,
    explanation: "Triple assessment—clinical examination, imaging (mammogram or ultrasound), and tissue sampling—is the standard initial approach to any breast lump. It provides accurate diagnosis and guides further management.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with a reducible swelling in the right groin that appears on standing and disappears when lying down. What is the most likely diagnosis?",
    options: ["Inguinal hernia", "Femoral hernia", "Hydrocele", "Lymphadenopathy"],
    correctIndex: 0,
    explanation: "A groin swelling that is reducible and appears with increased intra-abdominal pressure is typical of an inguinal hernia. Elective repair is usually recommended to prevent incarceration or strangulation.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with jaundice, dark urine, and pale stools. What is the most likely type of jaundice?",
    options: ["Obstructive jaundice", "Haemolytic jaundice", "Gilbert’s syndrome", "Physiological jaundice"],
    correctIndex: 0,
    explanation: "Dark urine and pale stools indicate reduced bile reaching the intestine and increased conjugated bilirubin excretion in urine, typical of obstructive jaundice. Common causes include gallstones and malignancy.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old woman presents with epigastric pain radiating to the back and raised serum amylase. What is the most likely diagnosis?",
    options: ["Acute pancreatitis", "Gastritis", "Peptic ulcer disease", "Cholecystitis"],
    correctIndex: 0,
    explanation: "Severe epigastric pain radiating to the back with elevated amylase is typical of acute pancreatitis. Common causes include gallstones and alcohol. Management is supportive with fluids and analgesia.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with rectal bleeding and change in bowel habit. What is the most important initial investigation?",
    options: ["Colonoscopy", "Abdominal X-ray", "Ultrasound abdomen", "Plain CT scan"],
    correctIndex: 0,
    explanation: "Rectal bleeding and altered bowel habit in an older patient raise suspicion of colorectal cancer. Colonoscopy allows direct visualisation and biopsy, making it the key initial investigation.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old woman presents with a tender lump at the umbilicus that becomes more prominent on coughing. What is the most likely diagnosis?",
    options: ["Umbilical hernia", "Lipoma", "Sister Mary Joseph nodule", "Sebaceous cyst"],
    correctIndex: 0,
    explanation: "A tender lump at the umbilicus that increases with coughing suggests an umbilical hernia. Small hernias may be observed, but symptomatic or enlarging ones usually require surgical repair.",
    topic: "General Surgery",
    level: "MBBS",
    flaggedSet: 0
  },

  // Trauma and Orthopaedics (10)
  {
    stem: "A 70-year-old woman falls and presents with hip pain. The leg is shortened and externally rotated. What is the most likely diagnosis?",
    options: ["Neck of femur fracture", "Posterior hip dislocation", "Pelvic fracture", "Tibial fracture"],
    correctIndex: 0,
    explanation: "A shortened, externally rotated leg after a fall in an elderly patient is classic for neck of femur fracture. Early surgery reduces complications and improves mobility outcomes.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 25-year-old man falls on his outstretched hand and has pain over the radial side of the wrist. Snuffbox tenderness is present. What is the most likely injury?",
    options: ["Scaphoid fracture", "Colles’ fracture", "Lunate dislocation", "Radial head fracture"],
    correctIndex: 0,
    explanation: "Snuffbox tenderness after a fall on an outstretched hand is highly suggestive of scaphoid fracture. Immobilisation and repeat imaging are important due to risk of non-union and avascular necrosis.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with knee pain after a twisting injury. He reports locking and clicking. What is the most likely structure injured?",
    options: ["Medial meniscus", "Anterior cruciate ligament", "Lateral collateral ligament", "Patellar tendon"],
    correctIndex: 0,
    explanation: "Locking and clicking after a twisting injury are typical of a meniscal tear, especially the medial meniscus. MRI confirms the diagnosis and arthroscopy may be needed.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old woman presents with shoulder pain and difficulty lifting her arm above her head. Pain is worst between 60–120 degrees of abduction. What is the most likely diagnosis?",
    options: ["Rotator cuff impingement", "Frozen shoulder", "Glenohumeral arthritis", "Acromioclavicular arthritis"],
    correctIndex: 0,
    explanation: "Painful arc between 60–120 degrees of abduction is characteristic of rotator cuff impingement. Physiotherapy and NSAIDs are first-line; persistent symptoms may need subacromial injection.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 22-year-old rugby player presents with shoulder pain after a tackle. The shoulder appears squared off and the arm is held abducted and externally rotated. What is the most likely diagnosis?",
    options: ["Anterior shoulder dislocation", "Posterior shoulder dislocation", "Clavicle fracture", "Acromioclavicular dislocation"],
    correctIndex: 0,
    explanation: "Squared-off shoulder with abduction and external rotation is typical of anterior shoulder dislocation. Reduction and immobilisation are required, followed by physiotherapy.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with chronic low back pain radiating to the leg, worse on walking and relieved by sitting. What is the most likely diagnosis?",
    options: ["Lumbar spinal stenosis", "Lumbar disc prolapse", "Sacroiliitis", "Facet joint arthritis"],
    correctIndex: 0,
    explanation: "Leg pain worse on walking and relieved by sitting or bending forward suggests lumbar spinal stenosis. MRI confirms canal narrowing and guides conservative or surgical treatment.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man feels a sudden snap in his heel while playing sport and cannot plantarflex the foot. What is the most likely diagnosis?",
    options: ["Achilles tendon rupture", "Ankle sprain", "Calcaneal fracture", "Plantar fasciitis"],
    correctIndex: 0,
    explanation: "Sudden snap with inability to plantarflex and a positive Thompson test is typical of Achilles tendon rupture. Early diagnosis and appropriate immobilisation or surgery are important.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old woman presents with wrist pain and tingling in the thumb, index, and middle fingers, worse at night. What is the most likely diagnosis?",
    options: ["Carpal tunnel syndrome", "Ulnar neuropathy", "Radial tunnel syndrome", "De Quervain’s tenosynovitis"],
    correctIndex: 0,
    explanation: "Nocturnal tingling in the median nerve distribution suggests carpal tunnel syndrome. Splinting and steroid injections are initial treatments; surgery may be needed if symptoms persist.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with knee pain, stiffness, and crepitus. X-ray shows joint space narrowing and osteophytes. What is the most likely diagnosis?",
    options: ["Osteoarthritis of the knee", "Rheumatoid arthritis", "Gout", "Septic arthritis"],
    correctIndex: 0,
    explanation: "Joint space narrowing and osteophytes in an older patient are typical of osteoarthritis. Management includes weight loss, analgesia, physiotherapy, and possibly joint replacement.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 28-year-old man presents with anterior shoulder dislocation. Which nerve is most commonly injured?",
    options: ["Axillary nerve", "Radial nerve", "Ulnar nerve", "Median nerve"],
    correctIndex: 0,
    explanation: "The axillary nerve is commonly injured in anterior shoulder dislocation, causing deltoid weakness and sensory loss over the lateral shoulder. Neurovascular examination is essential.",
    topic: "Trauma and Orthopaedics",
    level: "MBBS",
    flaggedSet: 0
  },

  // Neurosurgery (10)
  {
    stem: "A 45-year-old man presents with sudden severe headache described as ‘worst ever’. He has neck stiffness. What is the most likely diagnosis?",
    options: ["Subarachnoid haemorrhage", "Migraine", "Tension headache", "Cluster headache"],
    correctIndex: 0,
    explanation: "Sudden severe ‘thunderclap’ headache with neck stiffness is typical of subarachnoid haemorrhage. CT head and further investigations are required urgently.",
    topic: "Neurosurgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old woman presents with progressive gait disturbance, urinary incontinence, and memory problems. What is the most likely diagnosis?",
    options: ["Normal pressure hydrocephalus", "Alzheimer’s disease", "Parkinson’s disease", "Vascular dementia"],
    correctIndex: 0,
    explanation: "The triad of gait disturbance, urinary incontinence, and cognitive decline suggests normal pressure hydrocephalus. Imaging shows enlarged ventricles and shunting may improve symptoms.",
    topic: "Neurosurgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man sustains a head injury and later develops a biconvex hyperdense lesion on CT between skull and dura. What is the most likely diagnosis?",
    options: ["Epidural haematoma", "Subdural haematoma", "Intracerebral haemorrhage", "Contusion"],
    correctIndex: 0,
    explanation: "A biconvex (lentiform) hyperdense collection between skull and dura is typical of epidural haematoma, often due to middle meningeal artery injury. Urgent neurosurgical intervention is needed.",
    topic: "Neurosurgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A patient with a pituitary tumour develops loss of peripheral vision in both eyes. What is the most likely visual field defect?",
    options: ["Bitemporal hemianopia", "Homonymous hemianopia", "Central scotoma", "Monocular blindness"],
    correctIndex: 0,
    explanation: "Pituitary tumours compress the optic chiasm, causing bitemporal hemianopia. Visual field testing and MRI help confirm the diagnosis.",
    topic: "Neurosurgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with unilateral facial pain triggered by light touch and chewing. What is the most likely diagnosis?",
    options: ["Trigeminal neuralgia", "Migraine", "Cluster headache", "Temporomandibular joint dysfunction"],
    correctIndex: 0,
    explanation: "Brief, severe facial pain triggered by light stimuli is typical of trigeminal neuralgia. Carbamazepine is first-line treatment.",
    topic: "Neurosurgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with thunderclap headache but CT head is normal. What is the next investigation to exclude subarachnoid haemorrhage?",
    options: ["Lumbar puncture", "MRI brain", "EEG", "Plain X-ray skull"],
    correctIndex: 0,
    explanation: "If CT is normal but suspicion of subarachnoid haemorrhage remains, lumbar puncture is performed to look for xanthochromia in CSF.",
    topic: "Neurosurgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man has progressive unilateral hearing loss and imbalance. MRI shows a mass at the cerebellopontine angle. What is the most likely diagnosis?",
    options: ["Vestibular schwannoma", "Meningioma", "Glioma", "Metastasis"],
    correctIndex: 0,
    explanation: "Unilateral sensorineural hearing loss with a cerebellopontine angle mass is typical of vestibular schwannoma (acoustic neuroma).",
    topic: "Neurosurgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A patient with head trauma has a brief loss of consciousness, then a lucid interval, followed by rapid deterioration. What is the most likely cause?",
    options: ["Epidural haematoma", "Subdural haematoma", "Diffuse axonal injury", "Concussion"],
    correctIndex: 0,
    explanation: "A lucid interval followed by deterioration is classic for epidural haematoma. Urgent CT and surgical evacuation are required.",
    topic: "Neurosurgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with saddle anaesthesia, urinary retention, and bilateral leg weakness. What is the most likely diagnosis?",
    options: ["Cauda equina syndrome", "Lumbar disc prolapse without deficit", "Sciatica", "Peripheral neuropathy"],
    correctIndex: 0,
    explanation: "Saddle anaesthesia and bladder dysfunction with bilateral leg weakness indicate cauda equina syndrome, a neurosurgical emergency requiring urgent imaging and decompression.",
    topic: "Neurosurgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with progressive visual loss and a calcified suprasellar mass on imaging. What is the most likely diagnosis?",
    options: ["Craniopharyngioma", "Pituitary adenoma", "Meningioma", "Glioma"],
    correctIndex: 0,
    explanation: "Calcified suprasellar mass with visual symptoms is typical of craniopharyngioma. It often affects children and young adults.",
    topic: "Neurosurgery",
    level: "MBBS",
    flaggedSet: 0
  },

  // Urology (10)
  {
    stem: "A 65-year-old man presents with poor urinary stream, hesitancy, and nocturia. Digital rectal examination reveals a smooth, enlarged prostate. What is the most likely diagnosis?",
    options: ["Benign prostatic hyperplasia", "Prostate cancer", "Prostatitis", "Urethral stricture"],
    correctIndex: 0,
    explanation: "Lower urinary tract symptoms with a smooth enlarged prostate suggest benign prostatic hyperplasia. Medical therapy with alpha-blockers is often first-line.",
    topic: "Urology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with colicky flank pain radiating to the groin and haematuria. What is the most likely diagnosis?",
    options: ["Ureteric stone", "Pyelonephritis", "Renal tumour", "Bladder carcinoma"],
    correctIndex: 0,
    explanation: "Severe colicky flank pain radiating to the groin with haematuria is typical of ureteric colic due to a stone. Non-contrast CT KUB is the investigation of choice.",
    topic: "Urology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old smoker presents with painless visible haematuria. What is the most likely diagnosis?",
    options: ["Bladder transitional cell carcinoma", "Renal cell carcinoma", "Benign prostatic hyperplasia", "Urinary tract infection"],
    correctIndex: 0,
    explanation: "Painless visible haematuria in a smoker is highly suspicious for bladder cancer. Cystoscopy and biopsy confirm the diagnosis.",
    topic: "Urology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with a painless testicular lump. What is the most likely diagnosis?",
    options: ["Testicular tumour", "Epididymal cyst", "Hydrocele", "Varicocele"],
    correctIndex: 0,
    explanation: "A painless solid testicular lump is suspicious for testicular cancer. Ultrasound and tumour markers help confirm the diagnosis.",
    topic: "Urology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 28-year-old man presents with sudden onset scrotal pain and high-riding testis. What is the most likely diagnosis?",
    options: ["Testicular torsion", "Epididymo-orchitis", "Inguinal hernia", "Hydrocele"],
    correctIndex: 0,
    explanation: "Acute scrotal pain with high-riding testis is typical of testicular torsion, a surgical emergency requiring urgent exploration.",
    topic: "Urology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with recurrent urinary tract infections and poor urinary stream. What is the most likely diagnosis?",
    options: ["Urethral stricture", "Benign prostatic hyperplasia", "Neurogenic bladder", "Bladder carcinoma"],
    correctIndex: 0,
    explanation: "Obstructive symptoms with recurrent infections suggest urethral stricture. Urethrogram confirms the diagnosis.",
    topic: "Urology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with flank mass and weight loss. CT shows a solid enhancing renal mass. What is the most likely diagnosis?",
    options: ["Renal cell carcinoma", "Simple cyst", "Angiomyolipoma", "Pyelonephritis"],
    correctIndex: 0,
    explanation: "Solid enhancing renal mass is typical of renal cell carcinoma. Nephrectomy is the main treatment.",
    topic: "Urology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with lower urinary tract symptoms and PSA mildly elevated. Prostate feels smooth and enlarged. What is the most likely diagnosis?",
    options: ["Benign prostatic hyperplasia", "Prostate cancer", "Prostatitis", "Urethral stricture"],
    correctIndex: 0,
    explanation: "Smooth enlarged prostate with mild PSA elevation suggests benign prostatic hyperplasia rather than cancer.",
    topic: "Urology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with stress incontinence after prostate surgery. What is the most likely mechanism?",
    options: ["Sphincter weakness", "Detrusor overactivity", "Urethral stricture", "Bladder outlet obstruction"],
    correctIndex: 0,
    explanation: "Leakage on coughing or exertion after prostate surgery is usually due to sphincter weakness.",
    topic: "Urology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with painful swelling of the scrotum and fever. Doppler ultrasound shows increased blood flow. What is the most likely diagnosis?",
    options: ["Epididymo-orchitis", "Testicular torsion", "Hydrocele", "Varicocele"],
    correctIndex: 0,
    explanation: "Painful scrotal swelling with increased blood flow suggests epididymo-orchitis, often due to infection.",
    topic: "Urology",
    level: "MBBS",
    flaggedSet: 0
  },

  // Vascular Surgery (10)
  {
    stem: "A 65-year-old smoker presents with calf pain on walking that is relieved by rest. What is the most likely diagnosis?",
    options: ["Peripheral arterial disease", "Deep vein thrombosis", "Lumbar spinal stenosis", "Chronic compartment syndrome"],
    correctIndex: 0,
    explanation: "Intermittent claudication—exercise-induced calf pain relieved by rest—is typical of peripheral arterial disease.",
    topic: "Vascular Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man has a pulsatile abdominal mass. Ultrasound shows a dilated infrarenal aorta. What is the most likely diagnosis?",
    options: ["Abdominal aortic aneurysm", "Retroperitoneal tumour", "Pancreatic cyst", "Renal mass"],
    correctIndex: 0,
    explanation: "Pulsatile abdominal mass with dilated aorta is diagnostic of abdominal aortic aneurysm.",
    topic: "Vascular Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old woman presents with painful, swollen leg after long-haul flight. What is the most likely diagnosis?",
    options: ["Deep vein thrombosis", "Cellulitis", "Lymphoedema", "Varicose veins"],
    correctIndex: 0,
    explanation: "Acute unilateral leg swelling after immobility suggests deep vein thrombosis. Ultrasound confirms the diagnosis.",
    topic: "Vascular Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with ulceration over the medial malleolus and varicose veins. What is the most likely underlying problem?",
    options: ["Chronic venous insufficiency", "Peripheral arterial disease", "Diabetic neuropathy", "Pressure ulcer"],
    correctIndex: 0,
    explanation: "Medial malleolar ulcers with varicose veins are typical of chronic venous insufficiency.",
    topic: "Vascular Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man presents with transient weakness of the right arm and speech difficulty lasting 10 minutes. What is the most likely diagnosis?",
    options: ["Transient ischaemic attack", "Migraine aura", "Seizure", "Multiple sclerosis"],
    correctIndex: 0,
    explanation: "Brief focal neurological symptoms that resolve completely are typical of transient ischaemic attack.",
    topic: "Vascular Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with rest pain in the foot and dependent rubor. What is the most likely diagnosis?",
    options: ["Critical limb ischaemia", "Deep vein thrombosis", "Cellulitis", "Neuropathic pain"],
    correctIndex: 0,
    explanation: "Rest pain and colour change indicate critical limb ischaemia, an advanced stage of peripheral arterial disease.",
    topic: "Vascular Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with sudden tearing chest pain radiating to the back. What is the most likely diagnosis?",
    options: ["Aortic dissection", "Myocardial infarction", "Pulmonary embolism", "Pericarditis"],
    correctIndex: 0,
    explanation: "Tearing chest pain radiating to the back is classic for aortic dissection.",
    topic: "Vascular Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old woman presents with cold, painful fingers that turn white then blue in cold weather. What is the most likely diagnosis?",
    options: ["Raynaud’s phenomenon", "Buerger’s disease", "Takayasu arteritis", "Giant cell arteritis"],
    correctIndex: 0,
    explanation: "Triphasic colour change in fingers with cold exposure is typical of Raynaud’s phenomenon.",
    topic: "Vascular Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with varicose veins and aching legs. What is the first-line management?",
    options: ["Compression stockings", "Immediate surgery", "Anticoagulation", "Thrombolysis"],
    correctIndex: 0,
    explanation: "Compression stockings and lifestyle changes are first-line for symptomatic varicose veins.",
    topic: "Vascular Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with sudden leg pain, pallor, and absent pulses. What is the most likely diagnosis?",
    options: ["Acute limb ischaemia", "Deep vein thrombosis", "Cellulitis", "Compartment syndrome"],
    correctIndex: 0,
    explanation: "Pain, pallor, and pulselessness are classic signs of acute limb ischaemia.",
    topic: "Vascular Surgery",
    level: "MBBS",
    flaggedSet: 0
  },

  // Paediatric Surgery (10)
  {
    stem: "A 3-week-old boy presents with projectile non-bilious vomiting and weight loss. What is the most likely diagnosis?",
    options: ["Hypertrophic pyloric stenosis", "Duodenal atresia", "Gastro-oesophageal reflux", "Malrotation"],
    correctIndex: 0,
    explanation: "Projectile non-bilious vomiting in a young infant is typical of hypertrophic pyloric stenosis.",
    topic: "Paediatric Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 2-day-old neonate has bilious vomiting and a double bubble sign on X-ray. What is the most likely diagnosis?",
    options: ["Duodenal atresia", "Pyloric stenosis", "Hirschsprung disease", "Meconium ileus"],
    correctIndex: 0,
    explanation: "Double bubble sign with bilious vomiting indicates duodenal obstruction, commonly duodenal atresia.",
    topic: "Paediatric Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 1-day-old neonate fails to pass meconium and has abdominal distension. What is the most likely diagnosis?",
    options: ["Hirschsprung disease", "Meconium ileus", "Small bowel atresia", "Imperforate anus"],
    correctIndex: 0,
    explanation: "Failure to pass meconium with distension suggests Hirschsprung disease due to aganglionic distal bowel.",
    topic: "Paediatric Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 6-year-old boy presents with painless scrotal swelling that transilluminates. What is the most likely diagnosis?",
    options: ["Hydrocele", "Inguinal hernia", "Varicocele", "Testicular tumour"],
    correctIndex: 0,
    explanation: "Transilluminating scrotal swelling is typical of hydrocele.",
    topic: "Paediatric Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 4-year-old boy presents with intermittent abdominal pain, vomiting, and red currant jelly stools. What is the most likely diagnosis?",
    options: ["Intussusception", "Appendicitis", "Meckel’s diverticulum", "Volvulus"],
    correctIndex: 0,
    explanation: "Colicky pain and red currant jelly stools are classic for intussusception.",
    topic: "Paediatric Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 2-year-old boy presents with an inguinal swelling that appears on crying and disappears at rest. What is the most likely diagnosis?",
    options: ["Inguinal hernia", "Hydrocele", "Lymphadenopathy", "Varicocele"],
    correctIndex: 0,
    explanation: "Intermittent groin swelling with crying suggests inguinal hernia.",
    topic: "Paediatric Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 1-day-old neonate has excessive salivation and coughing with feeds. Nasogastric tube cannot be passed into the stomach. What is the most likely diagnosis?",
    options: ["Oesophageal atresia", "Duodenal atresia", "Tracheomalacia", "Laryngomalacia"],
    correctIndex: 0,
    explanation: "Failure to pass nasogastric tube with respiratory symptoms suggests oesophageal atresia.",
    topic: "Paediatric Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 7-year-old boy presents with right lower quadrant pain and fever. What is the most likely diagnosis?",
    options: ["Acute appendicitis", "Mesenteric adenitis", "Crohn’s disease", "Intussusception"],
    correctIndex: 0,
    explanation: "Localized right lower quadrant pain with fever is typical of appendicitis.",
    topic: "Paediatric Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 3-year-old girl presents with a midline neck swelling that moves with tongue protrusion. What is the most likely diagnosis?",
    options: ["Thyroglossal duct cyst", "Branchial cyst", "Lymphadenopathy", "Dermoid cyst"],
    correctIndex: 0,
    explanation: "Midline neck swelling moving with tongue suggests thyroglossal duct cyst.",
    topic: "Paediatric Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 5-year-old boy presents with recurrent urinary tract infections and hydronephrosis on ultrasound. What is the most likely diagnosis?",
    options: ["Pelvi-ureteric junction obstruction", "Vesicoureteric reflux", "Polycystic kidney disease", "Neuroblastoma"],
    correctIndex: 0,
    explanation: "Hydronephrosis with recurrent infections suggests pelvi-ureteric junction obstruction.",
    topic: "Paediatric Surgery",
    level: "MBBS",
    flaggedSet: 0
  },

  // Otolaryngology (10)
  {
    stem: "A 45-year-old man presents with progressive hoarseness and is a heavy smoker. What is the most likely diagnosis?",
    options: ["Laryngeal carcinoma", "Vocal cord polyp", "Reflux laryngitis", "Acute laryngitis"],
    correctIndex: 0,
    explanation: "Persistent hoarseness in a smoker is suspicious for laryngeal carcinoma.",
    topic: "Otolaryngology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old woman presents with nasal obstruction, facial pain, and nasal polyps. What is the most likely diagnosis?",
    options: ["Chronic rhinosinusitis with polyps", "Allergic rhinitis", "Acute sinusitis", "Deviated septum"],
    correctIndex: 0,
    explanation: "Nasal obstruction and polyps with facial pain suggest chronic rhinosinusitis with polyps.",
    topic: "Otolaryngology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 5-year-old child presents with snoring, mouth breathing, and recurrent ear infections. What is the most likely diagnosis?",
    options: ["Adenoid hypertrophy", "Tonsillitis", "Allergic rhinitis", "Choanal atresia"],
    correctIndex: 0,
    explanation: "Snoring and mouth breathing with recurrent otitis media suggest adenoid hypertrophy.",
    topic: "Otolaryngology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with unilateral hearing loss and tinnitus. What is the most likely diagnosis?",
    options: ["Presbycusis", "Vestibular schwannoma", "Otitis media", "Otosclerosis"],
    correctIndex: 0,
    explanation: "Unilateral sensorineural hearing loss with tinnitus raises suspicion of vestibular schwannoma.",
    topic: "Otolaryngology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old woman presents with episodic vertigo, fluctuating hearing loss, and tinnitus. What is the most likely diagnosis?",
    options: ["Ménière’s disease", "BPPV", "Vestibular neuritis", "Labyrinthitis"],
    correctIndex: 0,
    explanation: "Vertigo with fluctuating hearing loss and tinnitus is typical of Ménière’s disease.",
    topic: "Otolaryngology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with recurrent nosebleeds from the anterior septum. What is the most likely site?",
    options: ["Little’s area", "Posterior nasal cavity", "Nasopharynx", "Middle turbinate"],
    correctIndex: 0,
    explanation: "Most epistaxis arises from Little’s area on the anterior septum.",
    topic: "Otolaryngology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 7-year-old child presents with recurrent sore throats and enlarged tonsils. What is the most likely diagnosis?",
    options: ["Chronic tonsillitis", "Peritonsillar abscess", "Epiglottitis", "Croup"],
    correctIndex: 0,
    explanation: "Recurrent sore throats with enlarged tonsils suggest chronic tonsillitis.",
    topic: "Otolaryngology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with unilateral neck mass and referred ear pain. He is a smoker. What is the most likely diagnosis?",
    options: ["Oropharyngeal carcinoma", "Reactive lymphadenopathy", "Thyroid nodule", "Parotid tumour"],
    correctIndex: 0,
    explanation: "Neck mass with referred otalgia in a smoker suggests oropharyngeal carcinoma.",
    topic: "Otolaryngology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 3-year-old child presents with barking cough and inspiratory stridor. What is the most likely diagnosis?",
    options: ["Croup", "Epiglottitis", "Foreign body aspiration", "Asthma"],
    correctIndex: 0,
    explanation: "Barking cough and stridor in a young child are typical of croup.",
    topic: "Otolaryngology",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with progressive dysphagia and weight loss. Endoscopy shows a hypopharyngeal mass. What is the most likely diagnosis?",
    options: ["Hypopharyngeal carcinoma", "Benign stricture", "Zenker’s diverticulum", "Achalasia"],
    correctIndex: 0,
    explanation: "Progressive dysphagia with mass is suspicious for hypopharyngeal carcinoma.",
    topic: "Otolaryngology",
    level: "MBBS",
    flaggedSet: 0
  },

  // Maxillofacial Surgery (10)
  {
    stem: "A 25-year-old man presents after assault with malocclusion and mobility of the upper teeth. What is the most likely fracture?",
    options: ["Le Fort I fracture", "Le Fort II fracture", "Le Fort III fracture", "Zygomatic fracture"],
    correctIndex: 0,
    explanation: "Mobility of upper alveolus with malocclusion suggests Le Fort I fracture.",
    topic: "Maxillofacial Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with flattened cheek and infraorbital numbness after trauma. What is the most likely diagnosis?",
    options: ["Zygomatic complex fracture", "Mandibular fracture", "Nasal fracture", "Orbital floor fracture"],
    correctIndex: 0,
    explanation: "Flattened cheek and infraorbital nerve symptoms suggest zygomatic complex fracture.",
    topic: "Maxillofacial Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with trismus and pain around a partially erupted lower wisdom tooth. What is the most likely diagnosis?",
    options: ["Pericoronitis", "Dental abscess", "Osteomyelitis", "TMJ dysfunction"],
    correctIndex: 0,
    explanation: "Inflammation around a partially erupted wisdom tooth with trismus suggests pericoronitis.",
    topic: "Maxillofacial Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old smoker presents with a non-healing ulcer on the lateral tongue. What is the most likely diagnosis?",
    options: ["Squamous cell carcinoma", "Aphthous ulcer", "Traumatic ulcer", "Lichen planus"],
    correctIndex: 0,
    explanation: "Persistent ulcer on lateral tongue in a smoker is suspicious for squamous cell carcinoma.",
    topic: "Maxillofacial Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with jaw clicking and pain on opening. What is the most likely diagnosis?",
    options: ["TMJ dysfunction", "Mandibular fracture", "Parotid tumour", "Osteomyelitis"],
    correctIndex: 0,
    explanation: "Clicking and pain on jaw movement suggest temporomandibular joint dysfunction.",
    topic: "Maxillofacial Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 20-year-old man presents with step deformity at the angle of the mandible and malocclusion after trauma. What is the most likely diagnosis?",
    options: ["Mandibular fracture", "Zygomatic fracture", "Maxillary fracture", "Nasal fracture"],
    correctIndex: 0,
    explanation: "Step deformity and malocclusion indicate mandibular fracture.",
    topic: "Maxillofacial Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with a slow-growing, painless parotid mass. What is the most likely benign tumour?",
    options: ["Pleomorphic adenoma", "Warthin tumour", "Lipoma", "Haemangioma"],
    correctIndex: 0,
    explanation: "Pleomorphic adenoma is the most common benign parotid tumour.",
    topic: "Maxillofacial Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with facial nerve palsy and parotid mass. What is the most likely diagnosis?",
    options: ["Malignant parotid tumour", "Pleomorphic adenoma", "Warthin tumour", "Benign lymphadenopathy"],
    correctIndex: 0,
    explanation: "Facial nerve palsy with parotid mass suggests malignancy.",
    topic: "Maxillofacial Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 10-year-old child presents with painless swelling of the mandible and multilocular radiolucency on X-ray. What is the most likely diagnosis?",
    options: ["Ameloblastoma", "Osteosarcoma", "Fibrous dysplasia", "Dentigerous cyst"],
    correctIndex: 0,
    explanation: "Multilocular radiolucency in mandible suggests ameloblastoma.",
    topic: "Maxillofacial Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with facial trauma and clear fluid leaking from the nose. What is the most likely underlying injury?",
    options: ["Anterior skull base fracture", "Nasal bone fracture", "Zygomatic fracture", "Mandibular fracture"],
    correctIndex: 0,
    explanation: "CSF rhinorrhoea after facial trauma indicates anterior skull base fracture.",
    topic: "Maxillofacial Surgery",
    level: "MBBS",
    flaggedSet: 0
  },

  // Core Surgery (10)
  {
    stem: "A 30-year-old woman presents with acute right iliac fossa pain, fever, and raised white cell count. What is the most likely diagnosis?",
    options: ["Acute appendicitis", "Ovarian torsion", "Ectopic pregnancy", "Crohn’s disease"],
    correctIndex: 0,
    explanation: "Localized right iliac fossa pain with fever and raised WCC is typical of appendicitis.",
    topic: "Core Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with sudden chest pain and sweating. ECG shows ST elevation in leads II, III, and aVF. What is the most likely diagnosis?",
    options: ["Inferior myocardial infarction", "Pulmonary embolism", "Aortic dissection", "Pericarditis"],
    correctIndex: 0,
    explanation: "ST elevation in inferior leads indicates inferior myocardial infarction.",
    topic: "Core Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old woman presents with a firm breast lump. What is the standard initial approach?",
    options: ["Triple assessment", "Immediate mastectomy", "MRI alone", "Fine needle aspiration alone"],
    correctIndex: 0,
    explanation: "Triple assessment—clinical exam, imaging, and biopsy—is standard for breast lumps.",
    topic: "Core Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with weight loss, anaemia, and change in bowel habit. What is the most likely diagnosis?",
    options: ["Colorectal carcinoma", "Irritable bowel syndrome", "Diverticular disease", "Coeliac disease"],
    correctIndex: 0,
    explanation: "Weight loss and anaemia with altered bowel habit suggest colorectal cancer.",
    topic: "Core Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old woman presents with right upper quadrant pain and positive Murphy’s sign. What is the most likely diagnosis?",
    options: ["Acute cholecystitis", "Biliary colic", "Peptic ulcer", "Pancreatitis"],
    correctIndex: 0,
    explanation: "Murphy’s sign and RUQ pain suggest acute cholecystitis.",
    topic: "Core Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with reducible groin swelling that appears on standing. What is the most likely diagnosis?",
    options: ["Inguinal hernia", "Femoral hernia", "Lymphadenopathy", "Hydrocele"],
    correctIndex: 0,
    explanation: "Reducible groin swelling is typical of inguinal hernia.",
    topic: "Core Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with haematemesis and melena. Endoscopy shows a bleeding duodenal ulcer. What is the most likely diagnosis?",
    options: ["Peptic ulcer disease", "Mallory-Weiss tear", "Oesophageal varices", "Gastric carcinoma"],
    correctIndex: 0,
    explanation: "Bleeding duodenal ulcer indicates peptic ulcer disease.",
    topic: "Core Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with painless jaundice and palpable gallbladder. What is the most likely diagnosis?",
    options: ["Pancreatic head carcinoma", "Gallstones", "Hepatitis", "Primary sclerosing cholangitis"],
    correctIndex: 0,
    explanation: "Painless jaundice with palpable gallbladder suggests malignant obstruction, often pancreatic cancer.",
    topic: "Core Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with acute scrotal pain and swelling. Doppler shows increased blood flow. What is the most likely diagnosis?",
    options: ["Epididymo-orchitis", "Testicular torsion", "Hydrocele", "Varicocele"],
    correctIndex: 0,
    explanation: "Increased blood flow with pain suggests epididymo-orchitis.",
    topic: "Core Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old woman presents with tender, erythematous breast lump during breastfeeding. What is the most likely diagnosis?",
    options: ["Breast abscess", "Fibroadenoma", "Carcinoma", "Galactocele"],
    correctIndex: 0,
    explanation: "Painful erythematous lump in lactation suggests breast abscess.",
    topic: "Core Surgery",
    level: "MBBS",
    flaggedSet: 0
  },

  // Cardiothoracic Surgery (10)
  {
    stem: "A 65-year-old man presents with exertional chest pain relieved by rest. What is the most likely diagnosis?",
    options: ["Stable angina", "Unstable angina", "Pericarditis", "Pulmonary embolism"],
    correctIndex: 0,
    explanation: "Predictable exertional chest pain relieved by rest is typical of stable angina.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with sudden pleuritic chest pain and dyspnoea after long-haul flight. What is the most likely diagnosis?",
    options: ["Pulmonary embolism", "Pneumothorax", "Myocardial infarction", "Pericarditis"],
    correctIndex: 0,
    explanation: "Pleuritic chest pain and dyspnoea with immobility history suggest pulmonary embolism.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 25-year-old man presents with sudden pleuritic chest pain and dyspnoea. Chest X-ray shows collapsed lung with visible pleural line. What is the most likely diagnosis?",
    options: ["Spontaneous pneumothorax", "Pulmonary embolism", "Pneumonia", "Pericarditis"],
    correctIndex: 0,
    explanation: "Visible pleural line with absent lung markings indicates pneumothorax.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man presents with progressive dyspnoea, orthopnoea, and ankle swelling. What is the most likely diagnosis?",
    options: ["Congestive heart failure", "COPD", "Pulmonary embolism", "Pericardial effusion"],
    correctIndex: 0,
    explanation: "Dyspnoea, orthopnoea, and oedema are classic for heart failure.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with fever, pleuritic chest pain, and pericardial rub. What is the most likely diagnosis?",
    options: ["Acute pericarditis", "Myocardial infarction", "Pulmonary embolism", "Pneumonia"],
    correctIndex: 0,
    explanation: "Pericardial rub and pleuritic pain suggest acute pericarditis.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with syncope and harsh ejection systolic murmur radiating to carotids. What is the most likely diagnosis?",
    options: ["Aortic stenosis", "Mitral regurgitation", "Pulmonary stenosis", "Hypertrophic cardiomyopathy"],
    correctIndex: 0,
    explanation: "Ejection systolic murmur radiating to carotids is typical of aortic stenosis.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old woman presents with dyspnoea and haemoptysis. CT shows central lung mass obstructing bronchus. What is the most likely diagnosis?",
    options: ["Squamous cell carcinoma", "Adenocarcinoma", "Small cell carcinoma", "Benign hamartoma"],
    correctIndex: 0,
    explanation: "Central lung mass with haemoptysis is typical of squamous cell carcinoma.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with chest trauma and hypotension. Ultrasound shows pericardial fluid with right ventricular collapse. What is the most likely diagnosis?",
    options: ["Cardiac tamponade", "Pulmonary contusion", "Pneumothorax", "Aortic rupture"],
    correctIndex: 0,
    explanation: "Pericardial fluid with RV collapse indicates cardiac tamponade.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with chronic cough, sputum production, and barrel-shaped chest. What is the most likely diagnosis?",
    options: ["COPD", "Asthma", "Bronchiectasis", "Interstitial lung disease"],
    correctIndex: 0,
    explanation: "Chronic cough and hyperinflated chest are typical of COPD.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old man presents with sudden tearing chest pain radiating to the back. CT shows dissection of ascending aorta. What is the most likely diagnosis?",
    options: ["Type A aortic dissection", "Type B aortic dissection", "Myocardial infarction", "Pulmonary embolism"],
    correctIndex: 0,
    explanation: "Dissection involving ascending aorta is Type A and needs urgent surgery.",
    topic: "Cardiothoracic Surgery",
    level: "MBBS",
    flaggedSet: 0
  },
  // 1 — General Surgery
  {
    stem: "A 68-year-old man with Child–Pugh B cirrhosis presents with a 4.2 cm hepatocellular carcinoma in segment VIII. He has mild ascites, no encephalopathy, and portal vein patency. MDT discussion considers resection versus ablation. What is the most appropriate definitive management?",
    options: ["Liver resection", "Radiofrequency ablation", "Transarterial chemoembolisation", "Systemic therapy"],
    correctIndex: 0,
    explanation: "A solitary HCC >3 cm in a patient with compensated cirrhosis and preserved portal flow is best treated with anatomical resection when feasible. RFA is less effective for lesions >3 cm. TACE is reserved for multifocal or unresectable disease.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 2 — General Surgery
  {
    stem: "A 54-year-old woman presents with obstructive jaundice. CT shows a 2.8 cm pancreatic head mass abutting but not encasing the SMV, with no arterial involvement. CA19-9 is elevated. She is otherwise fit. MDT considers neoadjuvant therapy versus upfront surgery. What is the optimal management?",
    options: ["Upfront pancreaticoduodenectomy", "Neoadjuvant chemoradiotherapy", "ERCP stenting then observation", "Palliative chemotherapy"],
    correctIndex: 0,
    explanation: "Borderline resectable disease requires careful assessment of venous involvement. SMV abutment without encasement is resectable, and upfront pancreaticoduodenectomy is appropriate. Neoadjuvant therapy is reserved for venous encasement or arterial involvement.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 3 — General Surgery
  {
    stem: "A 72-year-old man presents with acute mesenteric ischaemia. CT angiography shows SMA occlusion with preserved distal collateral flow. He is haemodynamically stable but has peritonism. MDT considers endovascular thrombectomy versus open exploration. What is the most appropriate next step?",
    options: ["Immediate laparotomy with revascularisation", "Endovascular thrombectomy alone", "Systemic anticoagulation only", "Observation with serial exams"],
    correctIndex: 0,
    explanation: "Peritonism indicates bowel infarction risk. Even with endovascular options, FRCS-level decision-making prioritises immediate laparotomy for assessment and revascularisation. Endovascular therapy alone is inappropriate when peritonism is present.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 4 — General Surgery
  {
    stem: "A 61-year-old man undergoes emergency laparotomy for perforated sigmoid diverticulitis. Dense inflammation prevents safe primary anastomosis. He is haemodynamically stable post-resuscitation. MDT considers Hartmann’s procedure versus resection with primary anastomosis and diverting ileostomy. What is the optimal operative strategy?",
    options: ["Hartmann’s procedure", "Primary anastomosis with ileostomy", "Laparoscopic washout only", "Damage-control laparotomy"],
    correctIndex: 0,
    explanation: "In severe diverticulitis with perforation and hostile pelvis, Hartmann’s procedure remains safest. Primary anastomosis with diversion is reserved for selected stable patients with less inflammation. Laparoscopic washout is inferior in purulent/faecal peritonitis.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 5 — General Surgery
  {
    stem: "A 48-year-old woman presents with recurrent biliary colic. MRCP shows a 7 mm CBD stone with mild duct dilatation. She has no cholangitis or pancreatitis. MDT considers ERCP versus laparoscopic bile duct exploration. What is the most appropriate management?",
    options: ["Laparoscopic cholecystectomy with bile duct exploration", "ERCP then interval cholecystectomy", "Observation", "Percutaneous transhepatic cholangiography"],
    correctIndex: 0,
    explanation: "In fit patients, single-stage laparoscopic cholecystectomy with bile duct exploration avoids ERCP complications and is recommended in many centres. ERCP-first is acceptable but two-stage. FRCS-level practice favours single-stage management when expertise exists.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 6 — Trauma & Orthopaedics
  {
    stem: "A 32-year-old man sustains a high-energy tibial plateau fracture with significant soft tissue swelling. CT shows bicondylar involvement with depression and comminution. MDT considers immediate ORIF versus staged fixation. What is the most appropriate management strategy?",
    options: ["Staged external fixation followed by delayed ORIF", "Immediate ORIF", "Non-operative management", "Primary arthroplasty"],
    correctIndex: 0,
    explanation: "High-energy bicondylar plateau fractures with soft tissue compromise require staged management. External fixation allows soft tissue recovery before definitive ORIF. Immediate ORIF risks wound breakdown and infection.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 7 — Trauma & Orthopaedics
  {
    stem: "A 74-year-old woman presents with displaced intracapsular neck of femur fracture. She was independently mobile before injury. MDT considers hemiarthroplasty versus total hip replacement. What is the most appropriate operative choice?",
    options: ["Total hip replacement", "Hemiarthroplasty", "Dynamic hip screw", "Cannulated screws"],
    correctIndex: 0,
    explanation: "Active, independently mobile patients with displaced intracapsular fractures benefit from total hip replacement due to superior functional outcomes. Hemiarthroplasty is reserved for lower-demand patients.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 8 — Trauma & Orthopaedics
  {
    stem: "A 29-year-old man presents with shoulder instability after multiple anterior dislocations. MRI shows a large Hill–Sachs lesion and significant glenoid bone loss. MDT considers arthroscopic Bankart repair versus Latarjet procedure. What is the most appropriate management?",
    options: ["Latarjet procedure", "Arthroscopic Bankart repair", "Open capsular shift", "Non-operative rehabilitation"],
    correctIndex: 0,
    explanation: "Significant glenoid bone loss and engaging Hill–Sachs lesions require bony augmentation. Latarjet provides stability by restoring glenoid arc and sling effect. Bankart repair alone risks recurrence.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 9 — Trauma & Orthopaedics
  {
    stem: "A 67-year-old man presents with progressive lumbar stenosis causing neurogenic claudication. MRI shows multilevel stenosis with grade I spondylolisthesis. MDT considers decompression alone versus decompression with fusion. What is the most appropriate operative strategy?",
    options: ["Decompression with fusion", "Decompression alone", "Interspinous device insertion", "Non-operative management"],
    correctIndex: 0,
    explanation: "In stenosis with spondylolisthesis, decompression alone risks instability progression. Fusion stabilises the segment and improves outcomes. Interspinous devices have inferior long-term results.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 10 — Trauma & Orthopaedics
  {
    stem: "A 45-year-old man presents with septic arthritis of the knee. Synovial fluid shows high neutrophils and positive Gram stain. MDT considers arthroscopic washout versus open arthrotomy. What is the most appropriate management?",
    options: ["Urgent arthroscopic washout", "Open arthrotomy", "IV antibiotics alone", "Joint aspiration only"],
    correctIndex: 0,
    explanation: "Septic arthritis requires urgent surgical washout. Arthroscopy provides effective lavage with less morbidity. Open arthrotomy is reserved for complex or inaccessible joints.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 11 — Neurosurgery
  {
    stem: "A 56-year-old man presents with progressive myelopathy. MRI shows severe cervical canal stenosis at C4–C6 with cord signal change. MDT considers anterior cervical discectomy and fusion versus posterior laminectomy. What is the most appropriate operative approach?",
    options: ["Anterior cervical decompression and fusion", "Posterior laminectomy", "Laminoplasty", "Non-operative management"],
    correctIndex: 0,
    explanation: "Multilevel stenosis with kyphosis or anterior compression is best treated with anterior decompression and fusion. Posterior decompression is less effective when kyphosis is present.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 12 — Neurosurgery
  {
    stem: "A 48-year-old woman presents with a 2.5 cm vestibular schwannoma causing progressive hearing loss. MDT considers microsurgical resection versus stereotactic radiosurgery. What is the most appropriate management?",
    options: ["Stereotactic radiosurgery", "Microsurgical resection", "Observation", "Fractionated radiotherapy"],
    correctIndex: 0,
    explanation: "Tumours <3 cm with preserved facial nerve function are ideal for stereotactic radiosurgery, offering excellent tumour control with lower morbidity than microsurgery.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 13 — Neurosurgery
  {
    stem: "A 62-year-old man presents with acute subdural haematoma after trauma. CT shows 12 mm thickness with 8 mm midline shift. He is GCS 10. MDT considers craniotomy versus burr hole drainage. What is the most appropriate management?",
    options: ["Urgent craniotomy", "Burr hole drainage", "ICP monitoring only", "Conservative management"],
    correctIndex: 0,
    explanation: "Acute subdural haematomas with mass effect require urgent craniotomy for evacuation. Burr holes are inadequate for acute clotted haematomas.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 14 — Neurosurgery
  {
    stem: "A 70-year-old woman presents with normal pressure hydrocephalus. Tap test shows improvement. MDT considers VP shunt versus endoscopic third ventriculostomy. What is the most appropriate management?",
    options: ["Ventriculoperitoneal shunt", "Endoscopic third ventriculostomy", "Observation", "Lumbar drain"],
    correctIndex: 0,
    explanation: "NPH responds best to VP shunting. ETV is ineffective because the pathology is impaired CSF absorption, not obstruction.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 15 — Neurosurgery
  {
    stem: "A 44-year-old man presents with a 3 cm convexity meningioma causing seizures. MRI shows no sinus invasion. MDT considers resection versus radiosurgery. What is the most appropriate management?",
    options: ["Microsurgical resection", "Radiosurgery", "Observation", "Fractionated radiotherapy"],
    correctIndex: 0,
    explanation: "Convexity meningiomas are easily accessible and best treated with complete microsurgical resection, offering cure in most cases.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 16 — Urology
  {
    stem: "A 68-year-old man presents with high-risk prostate cancer (Gleason 4+4, PSA 32, T3a). MRI shows extracapsular extension without nodal disease. MDT considers radical prostatectomy versus radiotherapy with ADT. What is the most appropriate management?",
    options: ["Radical prostatectomy", "Radiotherapy with ADT", "Active surveillance", "Brachytherapy alone"],
    correctIndex: 0,
    explanation: "High-risk, organ-confined disease with extracapsular extension can be managed with radical prostatectomy in fit patients. Radiotherapy with ADT is an alternative but surgery offers pathological staging.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 17 — Urology
  {
    stem: "A 72-year-old man presents with gross haematuria. CT urogram shows a 4 cm upper tract urothelial carcinoma. MDT considers nephroureterectomy versus endoscopic ablation. What is the most appropriate management?",
    options: ["Radical nephroureterectomy", "Endoscopic ablation", "Intravesical therapy", "Surveillance"],
    correctIndex: 0,
    explanation: "High-grade or large upper tract urothelial carcinoma requires radical nephroureterectomy. Endoscopic ablation is reserved for low-grade, small lesions.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 18 — Urology
  {
    stem: "A 59-year-old man presents with a 6 cm renal mass confined to the kidney. MDT considers partial versus radical nephrectomy. What is the most appropriate management?",
    options: ["Partial nephrectomy", "Radical nephrectomy", "Ablation", "Active surveillance"],
    correctIndex: 0,
    explanation: "Nephron-sparing surgery is preferred for T1 lesions when technically feasible. A 6 cm mass (T1b) is suitable for partial nephrectomy in experienced centres.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 19 — Urology
  {
    stem: "A 44-year-old man presents with testicular cancer. CT shows retroperitoneal nodes 2.5 cm. Tumour markers are normal. MDT considers surveillance versus RPLND. What is the most appropriate management?",
    options: ["Primary RPLND", "Surveillance", "Chemotherapy", "Radiotherapy"],
    correctIndex: 0,
    explanation: "Stage IIa non-seminomatous germ cell tumours with small-volume nodal disease can be managed with primary RPLND in experienced centres.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 20 — Vascular Surgery
  {
    stem: "A 72-year-old man presents with a 6.4 cm infrarenal AAA. He is fit with suitable anatomy for EVAR. MDT considers EVAR versus open repair. What is the most appropriate management?",
    options: ["EVAR", "Open repair", "Surveillance", "Medical therapy only"],
    correctIndex: 0,
    explanation: "EVAR offers lower perioperative morbidity in anatomically suitable patients. Open repair is reserved for unsuitable anatomy or younger patients requiring long-term durability.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 21 — Vascular Surgery
  {
    stem: "A 66-year-old woman presents with critical limb ischaemia. Angiography shows long-segment SFA occlusion with good distal runoff. MDT considers bypass versus endovascular angioplasty. What is the most appropriate management?",
    options: ["Endovascular angioplasty", "Femoral–popliteal bypass", "Amputation", "Medical therapy only"],
    correctIndex: 0,
    explanation: "Endovascular-first strategy is recommended for SFA occlusions with good distal runoff. Bypass is reserved for failed endovascular therapy or unsuitable anatomy.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 22 — Vascular Surgery
  {
    stem: "A 70-year-old man presents with symptomatic high-grade carotid stenosis. CTA shows 80% stenosis. MDT considers carotid endarterectomy versus stenting. What is the most appropriate management?",
    options: ["Carotid endarterectomy", "Carotid stenting", "Medical therapy alone", "Observation"],
    correctIndex: 0,
    explanation: "CEA remains gold standard for symptomatic high-grade stenosis. Stenting is reserved for high surgical risk or hostile neck anatomy.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },
  // 26 — Otolaryngology
  {
    stem: "A 58-year-old man presents with progressive dysphagia, hoarseness, and a 3 cm supraglottic mass. CT shows pre-epiglottic space invasion but no cartilage destruction. MDT considers transoral laser microsurgery versus open partial laryngectomy versus chemoradiotherapy. What is the most appropriate definitive management?",
    options: ["Open partial laryngectomy", "Transoral laser microsurgery", "Primary chemoradiotherapy", "Observation"],
    correctIndex: 0,
    explanation: "Pre-epiglottic space invasion limits transoral approaches. Open partial laryngectomy offers oncological control while preserving laryngeal function. Chemoradiotherapy is an alternative but carries higher long-term functional morbidity in selected supraglottic disease.",
    topic: "Otolaryngology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 27 — Otolaryngology
  {
    stem: "A 44-year-old woman presents with recurrent epistaxis and nasal obstruction. Endoscopy reveals a vascular mass on the posterior nasal septum. CT shows no bony erosion. MDT considers endoscopic excision versus embolisation. What is the most appropriate management?",
    options: ["Endoscopic excision", "Preoperative embolisation alone", "Open resection", "Observation"],
    correctIndex: 0,
    explanation: "Posterior septal vascular lesions without bony invasion are best treated with endoscopic excision. Embolisation is reserved for highly vascular tumours such as JNA. FRCS-level practice prioritises minimally invasive definitive surgery.",
    topic: "Otolaryngology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 28 — Otolaryngology
  {
    stem: "A 62-year-old man presents with unilateral conductive hearing loss. CT temporal bone shows a small attic cholesteatoma with scutum erosion. MDT considers canal wall up versus canal wall down mastoidectomy. What is the most appropriate operative strategy?",
    options: ["Canal wall up mastoidectomy", "Canal wall down mastoidectomy", "Myringoplasty alone", "Observation"],
    correctIndex: 0,
    explanation: "Small attic cholesteatomas with limited erosion are suitable for canal wall up mastoidectomy, preserving anatomy while achieving disease clearance. Canal wall down is reserved for extensive disease or poor ventilation.",
    topic: "Otolaryngology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 29 — Maxillofacial Surgery
  {
    stem: "A 48-year-old man presents with a T2N2b oral tongue squamous carcinoma. MRI shows deep muscle invasion but no mandibular involvement. MDT considers partial glossectomy with neck dissection versus chemoradiotherapy. What is the most appropriate management?",
    options: ["Partial glossectomy with neck dissection", "Primary chemoradiotherapy", "Laser excision", "Observation"],
    correctIndex: 0,
    explanation: "Deep muscle invasion and nodal disease require surgical resection with neck dissection for optimal oncological control. Chemoradiotherapy is reserved for unresectable disease or postoperative high-risk features.",
    topic: "Maxillofacial Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 30 — Maxillofacial Surgery
  {
    stem: "A 36-year-old man presents with a displaced bilateral mandibular angle fracture after assault. He has malocclusion and trismus. MDT considers closed reduction versus ORIF. What is the most appropriate management?",
    options: ["Open reduction and internal fixation", "Closed reduction", "Intermaxillary fixation alone", "Observation"],
    correctIndex: 0,
    explanation: "Bilateral angle fractures with displacement and malocclusion require ORIF to restore occlusion and mandibular stability. Closed reduction is inadequate for unstable bilateral injuries.",
    topic: "Maxillofacial Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 31 — Maxillofacial Surgery
  {
    stem: "A 59-year-old woman presents with a parotid mass and facial nerve weakness. MRI shows a heterogeneous lesion involving the deep lobe. MDT considers superficial versus total parotidectomy. What is the most appropriate management?",
    options: ["Total parotidectomy", "Superficial parotidectomy", "Observation", "Radiotherapy alone"],
    correctIndex: 0,
    explanation: "Facial nerve weakness indicates malignancy. Deep lobe involvement requires total parotidectomy with nerve preservation or reconstruction. Superficial parotidectomy is inadequate for deep lobe disease.",
    topic: "Maxillofacial Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 32 — Maxillofacial Surgery
  {
    stem: "A 42-year-old man presents with a large ameloblastoma involving the posterior mandible. CT shows cortical breach but no soft tissue invasion. MDT considers enucleation versus segmental resection. What is the most appropriate management?",
    options: ["Segmental mandibulectomy", "Enucleation", "Curettage", "Observation"],
    correctIndex: 0,
    explanation: "Ameloblastomas are locally aggressive. Cortical breach requires segmental resection to achieve clear margins. Enucleation has high recurrence rates and is inappropriate for extensive disease.",
    topic: "Maxillofacial Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 33 — Cardiothoracic Surgery
  {
    stem: "A 68-year-old man presents with severe symptomatic aortic stenosis. Echo shows valve area 0.6 cm² and mean gradient 52 mmHg. CT shows suitable anatomy for TAVI. MDT considers TAVI versus surgical AVR. What is the most appropriate management?",
    options: ["TAVI", "Surgical AVR", "Balloon valvuloplasty", "Medical therapy"],
    correctIndex: 0,
    explanation: "In older patients with suitable anatomy, TAVI offers excellent outcomes with lower perioperative morbidity. Surgical AVR remains standard for younger or low-risk patients.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 34 — Cardiothoracic Surgery
  {
    stem: "A 72-year-old woman presents with a 5.8 cm ascending aortic aneurysm. She is fit with no connective tissue disorder. MDT considers open repair versus surveillance. What is the most appropriate management?",
    options: ["Open ascending aortic repair", "Surveillance", "Endovascular repair", "Medical therapy only"],
    correctIndex: 0,
    explanation: "Ascending aortic aneurysms >5.5 cm require open repair due to rupture risk. Endovascular options are limited in the ascending aorta.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 35 — Cardiothoracic Surgery
  {
    stem: "A 64-year-old man presents with multivessel coronary artery disease including proximal LAD involvement. He has diabetes and preserved LV function. MDT considers PCI versus CABG. What is the most appropriate management?",
    options: ["CABG", "PCI", "Medical therapy only", "Hybrid revascularisation"],
    correctIndex: 0,
    explanation: "CABG offers superior long-term outcomes in diabetic patients with multivessel disease, especially with proximal LAD involvement. PCI has higher restenosis rates.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 36 — Cardiothoracic Surgery
  {
    stem: "A 55-year-old man presents with a large left pleural empyema. CT shows loculated collections and thickened pleura. MDT considers VATS decortication versus chest tube drainage alone. What is the most appropriate management?",
    options: ["VATS decortication", "Chest tube drainage alone", "Antibiotics only", "Open thoracotomy"],
    correctIndex: 0,
    explanation: "Loculated empyema with pleural thickening requires VATS decortication for effective clearance. Chest tube drainage alone is inadequate in organised empyema.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 37 — Cardiothoracic Surgery
  {
    stem: "A 70-year-old man presents with severe MR due to posterior leaflet prolapse. LV function is preserved. MDT considers repair versus replacement. What is the most appropriate management?",
    options: ["Mitral valve repair", "Mitral valve replacement", "Medical therapy", "Percutaneous clip"],
    correctIndex: 0,
    explanation: "Posterior leaflet prolapse is highly repairable with excellent long-term outcomes. Repair is preferred over replacement when feasible.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 38 — General Surgery
  {
    stem: "A 63-year-old man presents with obstructing left-sided colon cancer. CT shows no distant metastases. MDT considers emergency resection with primary anastomosis versus Hartmann’s procedure. He is haemodynamically stable. What is the most appropriate management?",
    options: ["Resection with primary anastomosis", "Hartmann’s procedure", "Stenting then elective resection", "Loop colostomy"],
    correctIndex: 0,
    explanation: "Stable patients with left-sided obstruction can undergo resection with primary anastomosis when bowel condition allows. Hartmann’s is reserved for instability or hostile abdomen.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 39 — General Surgery
  {
    stem: "A 71-year-old woman presents with a 3 cm GIST in the stomach. Biopsy shows low mitotic index. MDT considers resection versus imatinib. What is the most appropriate management?",
    options: ["Laparoscopic wedge resection", "Imatinib therapy", "Observation", "Total gastrectomy"],
    correctIndex: 0,
    explanation: "Small gastric GISTs with low mitotic index are treated with limited resection. Imatinib is reserved for high-risk or unresectable disease.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 40 — General Surgery
  {
    stem: "A 59-year-old man presents with recurrent small bowel obstruction. CT shows a single adhesive band. MDT considers laparoscopic adhesiolysis versus conservative management. He has had multiple admissions. What is the most appropriate management?",
    options: ["Laparoscopic adhesiolysis", "Conservative management", "Open laparotomy", "Observation"],
    correctIndex: 0,
    explanation: "Recurrent obstruction due to a single band is best treated with laparoscopic adhesiolysis, reducing future episodes and morbidity.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 41 — Trauma & Orthopaedics
  {
    stem: "A 52-year-old man presents with a comminuted distal radius fracture with dorsal displacement. MDT considers volar plating versus external fixation. What is the most appropriate management?",
    options: ["Volar locking plate fixation", "External fixation", "Casting", "Percutaneous pinning"],
    correctIndex: 0,
    explanation: "Comminuted intra-articular distal radius fractures benefit from volar locking plate fixation, providing stable reduction and early mobilisation.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 42 — Trauma & Orthopaedics
  {
    stem: "A 66-year-old woman presents with severe knee osteoarthritis and varus deformity. MDT considers unicompartmental versus total knee replacement. What is the most appropriate management?",
    options: ["Total knee replacement", "Unicompartmental knee replacement", "High tibial osteotomy", "Non-operative management"],
    correctIndex: 0,
    explanation: "Varus deformity with tricompartmental involvement requires total knee replacement. Unicompartmental replacement is reserved for isolated medial disease.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 43 — Trauma & Orthopaedics
  {
    stem: "A 41-year-old man presents with chronic Achilles tendinopathy refractory to conservative therapy. MDT considers surgical debridement versus gastrocnemius recession. What is the most appropriate management?",
    options: ["Surgical debridement", "Gastrocnemius recession", "Platelet-rich plasma injection", "Shockwave therapy"],
    correctIndex: 0,
    explanation: "Refractory Achilles tendinopathy with degenerative changes benefits from surgical debridement. Gastrocnemius recession is reserved for equinus contracture.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 44 — Neurosurgery
  {
    stem: "A 58-year-old woman presents with trigeminal neuralgia refractory to carbamazepine. MRI shows vascular compression of the nerve root entry zone. MDT considers microvascular decompression versus radiosurgery. What is the most appropriate management?",
    options: ["Microvascular decompression", "Radiosurgery", "Percutaneous rhizotomy", "Continued medical therapy"],
    correctIndex: 0,
    explanation: "Microvascular decompression offers the best long-term relief for classical trigeminal neuralgia with vascular compression. Radiosurgery is an alternative for high-risk patients.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 45 — Neurosurgery
  {
    stem: "A 72-year-old man presents with chronic subdural haematoma causing gait disturbance. CT shows a 1.5 cm collection with midline shift. MDT considers burr hole drainage versus craniotomy. What is the most appropriate management?",
    options: ["Burr hole drainage", "Craniotomy", "Conservative management", "Middle meningeal artery embolisation"],
    correctIndex: 0,
    explanation: "Burr hole drainage is first-line for chronic subdural haematoma. Craniotomy is reserved for loculated or recurrent cases.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 46 — Neurosurgery
  {
    stem: "A 49-year-old man presents with a 4 cm cerebellar metastasis causing hydrocephalus. MDT considers resection versus radiosurgery. What is the most appropriate management?",
    options: ["Microsurgical resection", "Radiosurgery", "Observation", "Whole-brain radiotherapy"],
    correctIndex: 0,
    explanation: "Large posterior fossa metastases causing mass effect require surgical decompression to prevent herniation. Radiosurgery is suitable for smaller lesions.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 47 — Urology
  {
    stem: "A 71-year-old man presents with muscle-invasive bladder cancer (T2). MDT considers radical cystectomy versus chemoradiotherapy. He is fit with good renal function. What is the most appropriate management?",
    options: ["Radical cystectomy", "Chemoradiotherapy", "TURBT alone", "Intravesical therapy"],
    correctIndex: 0,
    explanation: "Radical cystectomy is gold standard for muscle-invasive bladder cancer in fit patients. Chemoradiotherapy is an alternative for bladder preservation.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 48 — Urology
  {
    stem: "A 66-year-old man presents with a 1.8 cm renal mass. MDT considers surveillance versus partial nephrectomy. He is fit with normal renal function. What is the most appropriate management?",
    options: ["Partial nephrectomy", "Active surveillance", "Ablation", "Radical nephrectomy"],
    correctIndex: 0,
    explanation: "Small renal masses in fit patients are best treated with partial nephrectomy, preserving renal function while providing oncological control.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 49 — Vascular Surgery
  {
    stem: "A 69-year-old woman presents with acute limb ischaemia. CTA shows embolic occlusion of the popliteal artery with good distal runoff. MDT considers thrombolysis versus embolectomy. What is the most appropriate management?",
    options: ["Surgical embolectomy", "Catheter-directed thrombolysis", "Anticoagulation alone", "Observation"],
    correctIndex: 0,
    explanation: "Embolic occlusions with good distal runoff are best treated with surgical embolectomy, providing rapid reperfusion. Thrombolysis is reserved for thrombosis or distal disease.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 50 — Vascular Surgery
  {
    stem: "A 72-year-old man presents with a 70% femoral artery stenosis causing lifestyle-limiting claudication. MDT considers angioplasty versus bypass. What is the most appropriate management?",
    options: ["Endovascular angioplasty", "Femoral–popliteal bypass", "Medical therapy only", "Amputation"],
    correctIndex: 0,
    explanation: "Endovascular-first strategy is recommended for focal femoral stenosis causing significant symptoms. Bypass is reserved for long-segment disease or failed endovascular therapy.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },
  // 51 — Vascular Surgery
  {
    stem: "A 74-year-old man presents with a 5.6 cm juxtarenal abdominal aortic aneurysm. His anatomy is unsuitable for standard EVAR due to short neck length. MDT considers fenestrated EVAR versus open repair. He is fit with no major comorbidities. What is the most appropriate management?",
    options: ["Fenestrated EVAR", "Open repair", "Surveillance", "Medical therapy only"],
    correctIndex: 0,
    explanation: "Fenestrated EVAR is preferred for juxtarenal aneurysms when anatomy is unsuitable for standard EVAR and the patient is fit. It avoids the morbidity of open repair while providing durable proximal fixation.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 52 — Vascular Surgery
  {
    stem: "A 68-year-old woman presents with acute mesenteric ischaemia. CTA shows SMA thrombosis with poor distal perfusion. She is haemodynamically unstable with metabolic acidosis. MDT considers endovascular thrombectomy versus open embolectomy with bowel assessment. What is the most appropriate management?",
    options: ["Open embolectomy with laparotomy", "Endovascular thrombectomy", "Systemic anticoagulation only", "Observation"],
    correctIndex: 0,
    explanation: "Haemodynamic instability and metabolic acidosis indicate bowel compromise. Open embolectomy with laparotomy allows revascularisation and direct bowel assessment. Endovascular therapy alone is inappropriate in unstable patients.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 53 — Vascular Surgery
  {
    stem: "A 72-year-old man presents with a symptomatic popliteal aneurysm causing embolic foot ischaemia. Duplex shows thrombus within the aneurysm. MDT considers bypass versus endovascular stent grafting. What is the most appropriate management?",
    options: ["Open bypass with aneurysm exclusion", "Endovascular stent graft", "Anticoagulation alone", "Observation"],
    correctIndex: 0,
    explanation: "Symptomatic popliteal aneurysms with thrombus require open bypass with aneurysm exclusion. Endovascular stents have higher failure rates due to knee flexion and are reserved for selected cases.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 54 — Otolaryngology
  {
    stem: "A 61-year-old man presents with T3N1 laryngeal carcinoma involving the paraglottic space. He has good pulmonary reserve. MDT considers organ-preserving chemoradiotherapy versus total laryngectomy. What is the most appropriate management?",
    options: ["Total laryngectomy", "Chemoradiotherapy", "Laser resection", "Observation"],
    correctIndex: 0,
    explanation: "Paraglottic space invasion reduces the success of organ-preserving therapy. Total laryngectomy offers superior oncological control for T3 disease with deep invasion.",
    topic: "Otolaryngology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 55 — Otolaryngology
  {
    stem: "A 47-year-old woman presents with a 2 cm parapharyngeal space tumour displacing the carotid laterally. MRI suggests pleomorphic adenoma. MDT considers transoral versus transcervical approach. What is the most appropriate management?",
    options: ["Transcervical excision", "Transoral excision", "Observation", "Radiotherapy"],
    correctIndex: 0,
    explanation: "Parapharyngeal tumours displacing the carotid laterally require transcervical access for safe vascular control. Transoral excision risks haemorrhage and incomplete resection.",
    topic: "Otolaryngology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 56 — Otolaryngology
  {
    stem: "A 70-year-old man presents with chronic otorrhoea and hearing loss. CT shows extensive cholesteatoma with lateral semicircular canal fistula. MDT considers canal wall down mastoidectomy versus canal wall up. What is the most appropriate management?",
    options: ["Canal wall down mastoidectomy", "Canal wall up mastoidectomy", "Myringoplasty", "Observation"],
    correctIndex: 0,
    explanation: "Extensive cholesteatoma with labyrinthine fistula requires canal wall down mastoidectomy for complete disease clearance and safe management of the fistula.",
    topic: "Otolaryngology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 57 — Maxillofacial Surgery
  {
    stem: "A 63-year-old man presents with a T3N2 oral cavity carcinoma involving the floor of mouth. MRI shows mandibular invasion. MDT considers marginal versus segmental mandibulectomy. What is the most appropriate management?",
    options: ["Segmental mandibulectomy", "Marginal mandibulectomy", "Chemoradiotherapy", "Observation"],
    correctIndex: 0,
    explanation: "Mandibular invasion requires segmental mandibulectomy to achieve oncological margins. Marginal resection is inadequate when cortical breach is present.",
    topic: "Maxillofacial Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 58 — Maxillofacial Surgery
  {
    stem: "A 52-year-old woman presents with a large parotid tumour involving the facial nerve trunk. MDT considers nerve sacrifice with grafting versus nerve preservation. What is the most appropriate management?",
    options: ["Nerve sacrifice with grafting", "Nerve preservation", "Radiotherapy alone", "Observation"],
    correctIndex: 0,
    explanation: "Tumours involving the facial nerve trunk require nerve sacrifice with grafting to achieve clear margins. Preservation risks incomplete resection and recurrence.",
    topic: "Maxillofacial Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 59 — Maxillofacial Surgery
  {
    stem: "A 34-year-old man presents with panfacial fractures after high-energy trauma. He is intubated and haemodynamically stable. MDT considers early definitive fixation versus staged reconstruction. What is the most appropriate management?",
    options: ["Staged reconstruction", "Immediate definitive fixation", "Conservative management", "Observation"],
    correctIndex: 0,
    explanation: "Panfacial fractures require staged reconstruction beginning with restoration of occlusion and stable midface. Immediate full fixation risks soft tissue compromise.",
    topic: "Maxillofacial Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 60 — Cardiothoracic Surgery
  {
    stem: "A 71-year-old man presents with a 3.5 cm left upper lobe lung tumour invading the chest wall. PET-CT shows no nodal disease. MDT considers lobectomy with chest wall resection versus stereotactic radiotherapy. What is the most appropriate management?",
    options: ["Lobectomy with chest wall resection", "Stereotactic radiotherapy", "Chemotherapy alone", "Observation"],
    correctIndex: 0,
    explanation: "Chest wall invasion in operable patients requires en bloc resection with lobectomy. Radiotherapy is reserved for inoperable patients.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 61 — Cardiothoracic Surgery
  {
    stem: "A 66-year-old woman presents with severe tricuspid regurgitation secondary to long-standing pulmonary hypertension. MDT considers repair versus replacement. What is the most appropriate management?",
    options: ["Tricuspid valve repair", "Tricuspid valve replacement", "Medical therapy only", "Percutaneous intervention"],
    correctIndex: 0,
    explanation: "Repair is preferred for functional tricuspid regurgitation, offering better long-term outcomes and lower prosthetic complications. Replacement is reserved for irreparable pathology.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 62 — Cardiothoracic Surgery
  {
    stem: "A 58-year-old man presents with a large pericardial effusion causing tamponade. MDT considers pericardiocentesis versus surgical pericardial window. What is the most appropriate management?",
    options: ["Surgical pericardial window", "Pericardiocentesis", "Medical therapy only", "Observation"],
    correctIndex: 0,
    explanation: "Tamponade requires urgent drainage. Surgical pericardial window provides definitive treatment and prevents recurrence, especially when effusion is large or loculated.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 63 — General Surgery
  {
    stem: "A 69-year-old man presents with obstructive jaundice. CT shows a resectable hilar cholangiocarcinoma (Bismuth IIIa). MDT considers extended right hepatectomy versus stenting followed by chemoradiotherapy. What is the most appropriate management?",
    options: ["Extended right hepatectomy", "Stenting then chemoradiotherapy", "Observation", "Palliative chemotherapy"],
    correctIndex: 0,
    explanation: "Resectable hilar cholangiocarcinoma requires extended hepatectomy with biliary reconstruction. Non-surgical options are reserved for unresectable disease.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 64 — General Surgery
  {
    stem: "A 55-year-old woman presents with a 2 cm mid-rectal cancer. MRI shows T2 disease without nodal involvement. MDT considers TEMS versus low anterior resection. What is the most appropriate management?",
    options: ["TEMS excision", "Low anterior resection", "Chemoradiotherapy", "Observation"],
    correctIndex: 0,
    explanation: "Early T2 rectal cancers without nodal disease can be treated with TEMS in selected cases, avoiding major surgery. Careful selection is essential.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 65 — General Surgery
  {
    stem: "A 72-year-old man presents with a large ventral hernia and loss of domain. MDT considers component separation versus bridged mesh repair. What is the most appropriate management?",
    options: ["Component separation", "Bridged mesh repair", "Laparoscopic repair", "Observation"],
    correctIndex: 0,
    explanation: "Loss of domain requires component separation to restore abdominal wall continuity. Bridged mesh repairs have high recurrence rates.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 66 — Trauma & Orthopaedics
  {
    stem: "A 44-year-old man presents with a high-grade ACL tear and associated lateral meniscal root injury. MDT considers ACL reconstruction alone versus combined repair. What is the most appropriate management?",
    options: ["Combined ACL reconstruction and meniscal root repair", "ACL reconstruction alone", "Non-operative management", "Meniscectomy"],
    correctIndex: 0,
    explanation: "Meniscal root tears significantly affect knee biomechanics. Combined ACL reconstruction and root repair restores stability and reduces osteoarthritis risk.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 67 — Trauma & Orthopaedics
  {
    stem: "A 71-year-old woman presents with a periprosthetic femoral fracture around a stable hip stem. MDT considers ORIF versus revision arthroplasty. What is the most appropriate management?",
    options: ["ORIF", "Revision arthroplasty", "Non-operative management", "External fixation"],
    correctIndex: 0,
    explanation: "Stable stems with periprosthetic fractures are treated with ORIF. Revision is reserved for loose stems.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 68 — Trauma & Orthopaedics
  {
    stem: "A 59-year-old man presents with severe shoulder arthritis and irreparable rotator cuff tear. MDT considers anatomic versus reverse shoulder arthroplasty. What is the most appropriate management?",
    options: ["Reverse shoulder arthroplasty", "Anatomic shoulder arthroplasty", "Hemiarthroplasty", "Non-operative management"],
    correctIndex: 0,
    explanation: "Irreparable cuff tears require reverse shoulder arthroplasty, which relies on deltoid function rather than rotator cuff integrity.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 69 — Neurosurgery
  {
    stem: "A 61-year-old woman presents with a 1.8 cm pituitary macroadenoma causing bitemporal hemianopia. MDT considers transsphenoidal resection versus radiotherapy. What is the most appropriate management?",
    options: ["Transsphenoidal resection", "Radiotherapy", "Medical therapy", "Observation"],
    correctIndex: 0,
    explanation: "Macroadenomas causing visual compromise require transsphenoidal decompression. Radiotherapy is reserved for residual or recurrent disease.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 70 — Neurosurgery
  {
    stem: "A 73-year-old man presents with lumbar stenosis and degenerative scoliosis. MDT considers decompression alone versus decompression with fusion. He has significant coronal imbalance. What is the most appropriate management?",
    options: ["Decompression with fusion", "Decompression alone", "Interspinous device", "Non-operative management"],
    correctIndex: 0,
    explanation: "Degenerative scoliosis with imbalance requires decompression and fusion to restore alignment and prevent progression.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 71 — Neurosurgery
  {
    stem: "A 49-year-old woman presents with a 2 cm cavernoma causing seizures. MDT considers resection versus observation. What is the most appropriate management?",
    options: ["Microsurgical resection", "Observation", "Radiosurgery", "Medical therapy alone"],
    correctIndex: 0,
    explanation: "Symptomatic cavernomas causing seizures benefit from microsurgical resection, offering excellent seizure control.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 72 — Urology
  {
    stem: "A 58-year-old man presents with high-grade non-muscle invasive bladder cancer refractory to BCG. MDT considers radical cystectomy versus further intravesical therapy. What is the most appropriate management?",
    options: ["Radical cystectomy", "Further intravesical therapy", "Chemoradiotherapy", "Observation"],
    correctIndex: 0,
    explanation: "BCG-refractory high-grade NMIBC requires radical cystectomy due to high progression risk.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 73 — Urology
  {
    stem: "A 66-year-old man presents with a 3 cm renal mass in a solitary kidney. MDT considers partial nephrectomy versus ablation. What is the most appropriate management?",
    options: ["Partial nephrectomy", "Ablation", "Radical nephrectomy", "Surveillance"],
    correctIndex: 0,
    explanation: "Nephron-sparing surgery is essential in solitary kidneys. Partial nephrectomy offers oncological control while preserving renal function.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 74 — Vascular Surgery
  {
    stem: "A 71-year-old woman presents with a symptomatic carotid web causing recurrent TIAs. MDT considers endarterectomy versus stenting. What is the most appropriate management?",
    options: ["Carotid endarterectomy", "Carotid stenting", "Medical therapy alone", "Observation"],
    correctIndex: 0,
    explanation: "Carotid webs are best treated with endarterectomy, reducing embolic risk. Stenting is an alternative but has higher restenosis rates.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 75 — Cardiothoracic Surgery
  {
    stem: "A 68-year-old man presents with a large anterior mediastinal mass compressing the SVC. CT suggests thymoma. MDT considers surgical resection versus induction therapy. What is the most appropriate management?",
    options: ["Surgical resection", "Induction chemoradiotherapy", "Observation", "Biopsy only"],
    correctIndex: 0,
    explanation: "Resectable thymomas causing SVC compression require upfront surgical resection. Induction therapy is reserved for unresectable disease.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },
  // 76 — General Surgery
  {
    stem: "A 64-year-old man presents with recurrent right-sided abdominal pain and weight loss. CT shows a 3.5 cm mass in the terminal ileum with mesenteric lymphadenopathy. Colonoscopy confirms a neuroendocrine tumour. MDT considers segmental resection versus right hemicolectomy. What is the most appropriate management?",
    options: ["Right hemicolectomy", "Segmental ileal resection", "Somatostatin analogues alone", "Observation"],
    correctIndex: 0,
    explanation: "Terminal ileal NETs commonly metastasise to mesenteric nodes. Right hemicolectomy ensures adequate lymphadenectomy and oncological clearance. Segmental resection risks inadequate nodal harvest.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 77 — General Surgery
  {
    stem: "A 71-year-old woman presents with a symptomatic para-oesophageal hernia causing postprandial pain and anaemia. CT shows organoaxial volvulus without ischaemia. MDT considers laparoscopic repair versus conservative management. What is the most appropriate management?",
    options: ["Laparoscopic para-oesophageal hernia repair", "Conservative management", "Endoscopic reduction alone", "Open repair"],
    correctIndex: 0,
    explanation: "Symptomatic para-oesophageal hernias with volvulus require surgical repair to prevent strangulation. Laparoscopic repair with gastropexy is standard. Conservative management risks acute complications.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 78 — Trauma & Orthopaedics
  {
    stem: "A 57-year-old man presents with a comminuted acetabular fracture involving the posterior wall and column. CT shows marginal impaction. MDT considers ORIF versus acute total hip replacement. What is the most appropriate management?",
    options: ["ORIF", "Acute total hip replacement", "Non-operative management", "External fixation"],
    correctIndex: 0,
    explanation: "Posterior wall and column fractures with marginal impaction require anatomical ORIF. Acute THR is reserved for elderly patients with non-reconstructable fractures.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 79 — Trauma & Orthopaedics
  {
    stem: "A 69-year-old woman presents with a periprosthetic knee fracture above a stable femoral component. MDT considers locking plate fixation versus revision arthroplasty. What is the most appropriate management?",
    options: ["Locking plate fixation", "Revision arthroplasty", "Casting", "External fixation"],
    correctIndex: 0,
    explanation: "Stable prostheses with periprosthetic fractures are treated with locking plate fixation. Revision is indicated only when the component is loose.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 80 — Trauma & Orthopaedics
  {
    stem: "A 45-year-old man presents with chronic lateral ankle instability after multiple sprains. MRI shows ATFL rupture and CFL attenuation. MDT considers Broström repair versus tendon graft reconstruction. What is the most appropriate management?",
    options: ["Broström repair", "Tendon graft reconstruction", "Non-operative rehabilitation", "Arthrodesis"],
    correctIndex: 0,
    explanation: "Broström repair is first-line for chronic lateral instability with repairable ligaments. Tendon graft reconstruction is reserved for failed repairs or severe attenuation.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 81 — Neurosurgery
  {
    stem: "A 52-year-old woman presents with a 3 cm anterior communicating artery aneurysm. CTA shows a broad neck. MDT considers microsurgical clipping versus endovascular coiling. What is the most appropriate management?",
    options: ["Microsurgical clipping", "Endovascular coiling", "Flow diversion", "Observation"],
    correctIndex: 0,
    explanation: "Broad-necked ACom aneurysms are best treated with microsurgical clipping, providing durable occlusion. Coiling has higher recurrence risk in wide-neck aneurysms.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 82 — Neurosurgery
  {
    stem: "A 63-year-old man presents with a large intraventricular tumour causing obstructive hydrocephalus. MDT considers endoscopic resection versus microsurgical craniotomy. What is the most appropriate management?",
    options: ["Microsurgical resection", "Endoscopic resection", "Shunt insertion alone", "Observation"],
    correctIndex: 0,
    explanation: "Large intraventricular tumours require microsurgical resection for safe removal. Endoscopic techniques are suitable only for small, accessible lesions.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 83 — Neurosurgery
  {
    stem: "A 71-year-old woman presents with a 4 cm convexity metastasis causing mass effect. MDT considers resection versus radiosurgery. What is the most appropriate management?",
    options: ["Microsurgical resection", "Radiosurgery", "Whole-brain radiotherapy", "Observation"],
    correctIndex: 0,
    explanation: "Large symptomatic metastases require surgical decompression. Radiosurgery is reserved for smaller lesions or postoperative control.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 84 — Urology
  {
    stem: "A 59-year-old man presents with metastatic renal cell carcinoma with a large symptomatic primary tumour. MDT considers cytoreductive nephrectomy versus systemic therapy alone. He is fit with good performance status. What is the most appropriate management?",
    options: ["Cytoreductive nephrectomy", "Systemic therapy alone", "Ablation", "Observation"],
    correctIndex: 0,
    explanation: "Fit patients with symptomatic primary tumours benefit from cytoreductive nephrectomy before systemic therapy. It improves symptom control and may enhance systemic treatment response.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 85 — Urology
  {
    stem: "A 68-year-old man presents with a 4 cm upper tract urothelial carcinoma. MDT considers nephron-sparing endoscopic ablation versus nephroureterectomy. He has CKD stage 3. What is the most appropriate management?",
    options: ["Nephroureterectomy", "Endoscopic ablation", "Intravesical therapy", "Observation"],
    correctIndex: 0,
    explanation: "High-grade or large UTUC requires nephroureterectomy despite CKD. Endoscopic ablation is reserved for low-grade, small lesions.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 86 — Urology
  {
    stem: "A 72-year-old man presents with locally advanced prostate cancer invading the bladder neck. MDT considers radical prostatectomy versus radiotherapy with ADT. What is the most appropriate management?",
    options: ["Radiotherapy with ADT", "Radical prostatectomy", "Active surveillance", "Brachytherapy"],
    correctIndex: 0,
    explanation: "Locally advanced disease invading the bladder neck is best treated with radiotherapy and ADT. Surgery carries high morbidity and limited oncological benefit.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 87 — Vascular Surgery
  {
    stem: "A 74-year-old man presents with a type B aortic dissection complicated by persistent pain and hypertension despite medical therapy. CTA shows true lumen compression. MDT considers TEVAR versus continued medical therapy. What is the most appropriate management?",
    options: ["TEVAR", "Medical therapy alone", "Open repair", "Observation"],
    correctIndex: 0,
    explanation: "Complicated type B dissections with persistent pain or malperfusion require TEVAR to restore true lumen flow. Medical therapy alone is inadequate.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 88 — Vascular Surgery
  {
    stem: "A 63-year-old woman presents with lifestyle-limiting claudication. CTA shows isolated iliac stenosis. MDT considers angioplasty versus bypass. What is the most appropriate management?",
    options: ["Endovascular angioplasty", "Iliac bypass", "Medical therapy only", "Amputation"],
    correctIndex: 0,
    explanation: "Endovascular angioplasty is first-line for isolated iliac stenosis, offering excellent patency with low morbidity. Bypass is reserved for failed endovascular therapy.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 89 — Otolaryngology
  {
    stem: "A 58-year-old man presents with a T4a maxillary sinus carcinoma invading the orbital floor. MDT considers craniofacial resection versus chemoradiotherapy. What is the most appropriate management?",
    options: ["Craniofacial resection", "Chemoradiotherapy", "Endoscopic resection", "Observation"],
    correctIndex: 0,
    explanation: "T4a maxillary sinus cancers with orbital invasion require craniofacial resection for oncological control. Chemoradiotherapy is reserved for unresectable disease.",
    topic: "Otolaryngology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 90 — Otolaryngology
  {
    stem: "A 67-year-old woman presents with progressive unilateral nasal obstruction. CT shows a mass in the olfactory cleft. Biopsy confirms esthesioneuroblastoma. MDT considers craniofacial resection versus radiotherapy alone. What is the most appropriate management?",
    options: ["Craniofacial resection with adjuvant radiotherapy", "Radiotherapy alone", "Chemotherapy alone", "Observation"],
    correctIndex: 0,
    explanation: "Esthesioneuroblastoma requires craniofacial resection with adjuvant radiotherapy for optimal control. Radiotherapy alone has inferior outcomes.",
    topic: "Otolaryngology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 91 — Maxillofacial Surgery
  {
    stem: "A 72-year-old man presents with osteoradionecrosis of the mandible causing severe pain and exposed bone. MDT considers conservative therapy versus segmental resection with free flap reconstruction. What is the most appropriate management?",
    options: ["Segmental resection with free flap reconstruction", "Conservative therapy", "Hyperbaric oxygen alone", "Observation"],
    correctIndex: 0,
    explanation: "Advanced osteoradionecrosis with exposed bone requires segmental resection and vascularised free flap reconstruction. Conservative therapy is insufficient for severe disease.",
    topic: "Maxillofacial Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 92 — Maxillofacial Surgery
  {
    stem: "A 49-year-old woman presents with a large odontogenic keratocyst involving the ramus and angle. MDT considers enucleation versus resection. What is the most appropriate management?",
    options: ["Resection", "Enucleation", "Marsupialisation", "Observation"],
    correctIndex: 0,
    explanation: "Large OKCs with cortical thinning or expansion require resection to prevent recurrence. Enucleation has high recurrence rates in extensive disease.",
    topic: "Maxillofacial Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 93 — Cardiothoracic Surgery
  {
    stem: "A 61-year-old man presents with a centrally located non-small cell lung cancer involving the main bronchus. MDT considers sleeve lobectomy versus pneumonectomy. What is the most appropriate management?",
    options: ["Sleeve lobectomy", "Pneumonectomy", "Radiotherapy", "Observation"],
    correctIndex: 0,
    explanation: "Sleeve lobectomy preserves lung function while achieving oncological clearance. Pneumonectomy is reserved for non-reconstructable disease.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 94 — Cardiothoracic Surgery
  {
    stem: "A 72-year-old woman presents with severe MR due to anterior leaflet prolapse. MDT considers repair versus replacement. What is the most appropriate management?",
    options: ["Mitral valve repair", "Mitral valve replacement", "Percutaneous clip", "Medical therapy"],
    correctIndex: 0,
    explanation: "Anterior leaflet prolapse is repairable in experienced centres. Repair offers better long-term outcomes than replacement.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 95 — Cardiothoracic Surgery
  {
    stem: "A 68-year-old man presents with a large pericardial cyst causing compression of the right atrium. MDT considers surgical excision versus observation. What is the most appropriate management?",
    options: ["Surgical excision", "Observation", "Percutaneous drainage", "Medical therapy"],
    correctIndex: 0,
    explanation: "Symptomatic pericardial cysts causing compression require surgical excision. Observation is appropriate only for asymptomatic lesions.",
    topic: "Cardiothoracic Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 96 — General Surgery
  {
    stem: "A 73-year-old man presents with a large symptomatic incisional hernia with significant loss of domain. MDT considers preoperative botulinum toxin with progressive pneumoperitoneum versus immediate component separation. What is the most appropriate management?",
    options: ["Preoperative botulinum toxin with progressive pneumoperitoneum", "Immediate component separation", "Bridged mesh repair", "Observation"],
    correctIndex: 0,
    explanation: "Large loss-of-domain hernias benefit from preoperative botulinum toxin and pneumoperitoneum to facilitate safe closure and reduce tension. Immediate component separation risks respiratory compromise.",
    topic: "General Surgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 97 — Trauma & Orthopaedics
  {
    stem: "A 62-year-old woman presents with a Vancouver B2 periprosthetic femoral fracture with a loose stem. MDT considers revision arthroplasty versus ORIF. What is the most appropriate management?",
    options: ["Revision arthroplasty", "ORIF", "External fixation", "Non-operative management"],
    correctIndex: 0,
    explanation: "Vancouver B2 fractures with a loose stem require revision arthroplasty with long-stem fixation. ORIF alone is inadequate.",
    topic: "Trauma and Orthopaedics",
    level: "FRCS",
    flaggedSet: 0
  },

  // 98 — Neurosurgery
  {
    stem: "A 55-year-old man presents with a large skull base meningioma encasing the ICA. MDT considers subtotal resection with adjuvant radiotherapy versus radical resection. What is the most appropriate management?",
    options: ["Subtotal resection with adjuvant radiotherapy", "Radical resection", "Observation", "Medical therapy"],
    correctIndex: 0,
    explanation: "ICA encasement makes radical resection unsafe. Subtotal resection followed by radiotherapy provides optimal control with lower morbidity.",
    topic: "Neurosurgery",
    level: "FRCS",
    flaggedSet: 0
  },

  // 99 — Urology
  {
    stem: "A 71-year-old man presents with ureteric obstruction due to retroperitoneal fibrosis. MDT considers ureterolysis versus long-term stenting. What is the most appropriate management?",
    options: ["Ureterolysis", "Long-term stenting", "Nephrostomy", "Observation"],
    correctIndex: 0,
    explanation: "Ureterolysis provides definitive relief in retroperitoneal fibrosis. Long-term stenting is reserved for high-risk surgical candidates.",
    topic: "Urology",
    level: "FRCS",
    flaggedSet: 0
  },

  // 100 — Vascular Surgery
  {
    stem: "A 68-year-old woman presents with a symptomatic subclavian artery stenosis causing vertebrobasilar insufficiency. MDT considers angioplasty versus bypass. What is the most appropriate management?",
    options: ["Endovascular angioplasty", "Subclavian–carotid bypass", "Medical therapy only", "Observation"],
    correctIndex: 0,
    explanation: "Endovascular angioplasty is first-line for subclavian stenosis, offering excellent patency and symptom resolution. Bypass is reserved for failed endovascular therapy.",
    topic: "Vascular Surgery",
    level: "FRCS",
    flaggedSet: 0
  }
];