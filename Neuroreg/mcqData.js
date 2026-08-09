const demoPool = [
  {
    stem: "A 52-year-old woman presents with sudden severe headache and collapse. CT shows subarachnoid blood predominantly in the interpeduncular cistern. What is the most likely aneurysm site?",
    options: ["Posterior communicating artery aneurysm", "Anterior communicating artery aneurysm", "Middle cerebral artery aneurysm", "Superior cerebellar artery aneurysm"],
    correctIndex: 0,
    explanation: "Interpeduncular cistern blood suggests a posterior communicating artery aneurysm rupture.",
    topic: "Vascular",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with thunderclap headache and a normal CT head. What is the next best investigation?",
    options: ["Lumbar puncture", "CT angiogram", "MRI brain", "Digital subtraction angiography"],
    correctIndex: 0,
    explanation: "If CT is normal but suspicion for SAH remains, LP at 12 hours is required to detect xanthochromia.",
    topic: "Vascular",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man has a left-sided weakness and CT shows a right MCA territory infarct. What artery is occluded?",
    options: ["Right middle cerebral artery", "Left middle cerebral artery", "Right anterior cerebral artery", "Basilar artery"],
    correctIndex: 0,
    explanation: "Contralateral weakness indicates a right MCA infarct.",
    topic: "Vascular",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with SAH develops acute confusion and reduced GCS on day 5. What is the most likely cause?",
    options: ["Cerebral vasospasm", "Hydrocephalus", "Rebleeding", "Hyponatraemia"],
    correctIndex: 0,
    explanation: "Day 3–10 vasospasm is the most common cause of deterioration after SAH.",
    topic: "Vascular",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man presents with progressive gait disturbance and urinary incontinence. CT shows enlarged ventricles with normal pressure. What is the diagnosis?",
    options: ["Normal pressure hydrocephalus", "Obstructive hydrocephalus", "SAH", "Chiari malformation"],
    correctIndex: 0,
    explanation: "The classic triad suggests NPH.",
    topic: "Vascular",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with carotid stenosis develops transient right arm weakness. What is the most likely side of stenosis?",
    options: ["Left carotid artery", "Right carotid artery", "Basilar artery", "Vertebral artery"],
    correctIndex: 0,
    explanation: "Left carotid stenosis causes right-sided symptoms.",
    topic: "Vascular",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with SAH has ECG changes and troponin rise. What is the cause?",
    options: ["Catecholamine surge", "Myocardial infarction", "Pulmonary embolism", "Pericarditis"],
    correctIndex: 0,
    explanation: "SAH causes neurogenic stunned myocardium due to catecholamine excess.",
    topic: "Vascular",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with AVM presents with seizures. What is the best initial imaging?",
    options: ["CT angiogram", "MRI brain", "Digital subtraction angiography", "Plain CT"],
    correctIndex: 0,
    explanation: "CTA rapidly identifies AVM architecture and haemorrhage.",
    topic: "Vascular",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient develops unilateral ptosis and a dilated pupil. What artery aneurysm is suspected?",
    options: ["Posterior communicating artery", "Anterior cerebral artery", "Middle cerebral artery", "Basilar artery"],
    correctIndex: 0,
    explanation: "PCom aneurysms compress CN III causing painful ophthalmoplegia.",
    topic: "Vascular",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with SAH is started on nimodipine. What is its purpose?",
    options: ["Prevent vasospasm", "Reduce ICP", "Prevent rebleeding", "Treat hydrocephalus"],
    correctIndex: 0,
    explanation: "Nimodipine reduces delayed cerebral ischaemia from vasospasm.",
    topic: "Vascular",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 58-year-old man presents with progressive headaches and personality change. MRI shows a frontal lobe mass with a ring-enhancing lesion and central necrosis. What is the most likely diagnosis?",
    options: ["Glioblastoma multiforme", "Meningioma", "Low-grade glioma", "Metastatic melanoma"],
    correctIndex: 0,
    explanation: "GBM typically presents as a ring-enhancing lesion with central necrosis and mass effect.",
    topic: "Oncology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old woman has a dural-based enhancing lesion over the convexity. What is the most likely tumour?",
    options: ["Meningioma", "Glioblastoma", "Metastatic breast cancer", "Oligodendroglioma"],
    correctIndex: 0,
    explanation: "Meningiomas are extra-axial, dural-based lesions with homogeneous enhancement.",
    topic: "Oncology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with known lung cancer develops new-onset seizures. MRI shows multiple cortical lesions. What is the most likely cause?",
    options: ["Metastatic disease", "Primary glioma", "Abscesses", "Lymphoma"],
    correctIndex: 0,
    explanation: "Lung cancer commonly metastasises to the brain, often producing multiple lesions.",
    topic: "Oncology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with seizures. MRI shows a non-enhancing lesion in the temporal lobe with a 'fried egg' appearance on histology. What is the diagnosis?",
    options: ["Oligodendroglioma", "Astrocytoma", "Meningioma", "Metastasis"],
    correctIndex: 0,
    explanation: "Oligodendrogliomas classically show uniform cells with perinuclear halos ('fried egg' appearance).",
    topic: "Oncology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man presents with ataxia and MRI shows a cerebellar mass. What tumour commonly metastasises to the cerebellum?",
    options: ["Lung carcinoma", "Prostate carcinoma", "Renal carcinoma", "Thyroid carcinoma"],
    correctIndex: 0,
    explanation: "Lung cancer frequently metastasises to the cerebellum.",
    topic: "Oncology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with bitemporal hemianopia. MRI shows a sellar mass. What is the most likely tumour?",
    options: ["Pituitary adenoma", "Craniopharyngioma", "Meningioma", "Chordoma"],
    correctIndex: 0,
    explanation: "Pituitary adenomas compress the optic chiasm causing bitemporal hemianopia.",
    topic: "Oncology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old woman presents with confusion and MRI shows a homogeneously enhancing lesion crossing the corpus callosum. What is the diagnosis?",
    options: ["Glioblastoma multiforme", "Lymphoma", "Metastasis", "Meningioma"],
    correctIndex: 0,
    explanation: "GBM often crosses the midline via the corpus callosum, producing a 'butterfly' appearance.",
    topic: "Oncology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with HIV presents with a solitary enhancing periventricular lesion. What is the most likely diagnosis?",
    options: ["Primary CNS lymphoma", "Glioblastoma", "Metastasis", "Abscess"],
    correctIndex: 0,
    explanation: "Primary CNS lymphoma is strongly associated with immunosuppression and periventricular location.",
    topic: "Oncology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with seizures. MRI shows a low-grade astrocytoma. What is the typical management?",
    options: ["Surgical resection", "Chemotherapy alone", "Radiotherapy alone", "Observation only"],
    correctIndex: 0,
    explanation: "Low-grade astrocytomas are usually managed with maximal safe surgical resection.",
    topic: "Oncology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with spinal cord compression from metastatic prostate cancer. What is the initial management?",
    options: ["High-dose steroids", "Immediate surgery", "Radiotherapy only", "Chemotherapy"],
    correctIndex: 0,
    explanation: "High-dose steroids reduce oedema and preserve neurological function in metastatic cord compression.",
    topic: "Oncology",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old woman presents with unilateral hearing loss and imbalance. MRI shows an enhancing mass in the cerebellopontine angle extending into the internal auditory canal. What is the most likely diagnosis?",
    options: ["Vestibular schwannoma", "Meningioma", "Epidermoid cyst", "Cholesteatoma"],
    correctIndex: 0,
    explanation: "Vestibular schwannomas arise from CN VIII and commonly extend into the internal auditory canal.",
    topic: "Skull Base",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with facial pain in the V2 distribution. MRI shows a mass in Meckel’s cave. What is the most likely tumour?",
    options: ["Trigeminal schwannoma", "Pituitary adenoma", "Chordoma", "Craniopharyngioma"],
    correctIndex: 0,
    explanation: "Trigeminal schwannomas often arise in Meckel’s cave and cause facial pain.",
    topic: "Skull Base",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with progressive nasal obstruction and epistaxis. CT shows a destructive midline skull base lesion. What is the most likely diagnosis?",
    options: ["Esthesioneuroblastoma", "Pituitary adenoma", "Meningioma", "Vestibular schwannoma"],
    correctIndex: 0,
    explanation: "Esthesioneuroblastoma arises from the olfactory epithelium and presents with nasal obstruction and epistaxis.",
    topic: "Skull Base",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with diplopia and MRI shows a cavernous sinus mass encasing the internal carotid artery. What tumour most commonly involves the cavernous sinus?",
    options: ["Meningioma", "Pituitary adenoma", "Craniopharyngioma", "Chordoma"],
    correctIndex: 0,
    explanation: "Meningiomas frequently invade the cavernous sinus and encase the ICA.",
    topic: "Skull Base",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with progressive dysphagia and hoarseness. MRI shows a mass at the jugular foramen. What is the most likely diagnosis?",
    options: ["Glomus jugulare tumour", "Vestibular schwannoma", "Chordoma", "Meningioma"],
    correctIndex: 0,
    explanation: "Glomus jugulare tumours arise from paraganglionic tissue at the jugular foramen and affect lower cranial nerves.",
    topic: "Skull Base",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with anosmia and frontal headaches. MRI shows a mass arising from the cribriform plate. What is the likely tumour?",
    options: ["Olfactory groove meningioma", "Pituitary adenoma", "Craniopharyngioma", "Chordoma"],
    correctIndex: 0,
    explanation: "Olfactory groove meningiomas arise from the cribriform plate and commonly cause anosmia.",
    topic: "Skull Base",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with progressive visual loss. MRI shows a suprasellar mass compressing the optic chiasm. What skull base structure is involved?",
    options: ["Pituitary fossa", "Jugular foramen", "Internal auditory canal", "Foramen magnum"],
    correctIndex: 0,
    explanation: "Suprasellar masses typically arise from the pituitary fossa and compress the optic chiasm.",
    topic: "Skull Base",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with conductive hearing loss and a red mass behind the tympanic membrane. What skull base tumour is likely?",
    options: ["Glomus tympanicum", "Vestibular schwannoma", "Meningioma", "Chordoma"],
    correctIndex: 0,
    explanation: "Glomus tympanicum tumours appear as a vascular middle ear mass causing pulsatile tinnitus and conductive hearing loss.",
    topic: "Skull Base",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old woman presents with headaches and MRI shows a clival mass. What is the most likely diagnosis?",
    options: ["Chordoma", "Meningioma", "Pituitary adenoma", "Vestibular schwannoma"],
    correctIndex: 0,
    explanation: "Chordomas commonly arise from the clivus and cause midline skull base destruction.",
    topic: "Skull Base",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with CSF rhinorrhoea after minor trauma. What skull base structure is most likely injured?",
    options: ["Cribriform plate", "Foramen magnum", "Jugular foramen", "Internal auditory canal"],
    correctIndex: 0,
    explanation: "The cribriform plate is the most common site of traumatic CSF rhinorrhoea.",
    topic: "Skull Base",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 24-year-old man is involved in a road traffic collision. He has a lucid interval followed by rapid deterioration. CT shows a biconvex hyperdense lesion. What is the diagnosis?",
    options: ["Epidural haematoma", "Subdural haematoma", "Contusion", "Intraventricular haemorrhage"],
    correctIndex: 0,
    explanation: "Epidural haematomas are classically biconvex and associated with a lucid interval due to middle meningeal artery injury.",
    topic: "Trauma",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old woman falls at home and develops progressive confusion over several days. CT shows a crescent-shaped collection. What is the diagnosis?",
    options: ["Subdural haematoma", "Epidural haematoma", "Contusion", "SAH"],
    correctIndex: 0,
    explanation: "Subdural haematomas are crescent-shaped and common in elderly patients due to bridging vein injury.",
    topic: "Trauma",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with severe head injury has a GCS of 6. What is the most important initial management?",
    options: ["Airway protection", "CT scan", "IV mannitol", "Cervical spine X-ray"],
    correctIndex: 0,
    explanation: "Airway protection is the first priority in severe head injury (GCS ≤ 8).",
    topic: "Trauma",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents after assault with periorbital bruising and CSF rhinorrhoea. What skull fracture is most likely?",
    options: ["Anterior skull base fracture", "Temporal bone fracture", "Occipital fracture", "Parietal fracture"],
    correctIndex: 0,
    explanation: "Anterior skull base fractures commonly cause CSF rhinorrhoea.",
    topic: "Trauma",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with head trauma develops a fixed dilated pupil. What is the most likely cause?",
    options: ["Uncal herniation", "Cerebellar infarct", "Hydrocephalus", "Basilar artery thrombosis"],
    correctIndex: 0,
    explanation: "Uncal herniation compresses CN III causing ipsilateral fixed dilated pupil.",
    topic: "Trauma",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with a temporal bone fracture and clear fluid from the ear. What is the diagnosis?",
    options: ["CSF otorrhoea", "Perilymph fistula", "Otitis externa", "Haemotympanum"],
    correctIndex: 0,
    explanation: "Temporal bone fractures can cause CSF otorrhoea due to tegmen tympani disruption.",
    topic: "Trauma",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with severe TBI has a systolic BP of 80 mmHg. What is the most important principle?",
    options: ["Avoid hypotension", "Avoid hyperventilation", "Give mannitol immediately", "Perform CT before resuscitation"],
    correctIndex: 0,
    explanation: "Hypotension worsens secondary brain injury; maintaining perfusion is critical.",
    topic: "Trauma",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 22-year-old man presents after assault with a depressed skull fracture. What is the usual management?",
    options: ["Surgical elevation", "Observation only", "Radiotherapy", "Anticoagulation"],
    correctIndex: 0,
    explanation: "Depressed skull fractures often require surgical elevation to prevent infection and further injury.",
    topic: "Trauma",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with head trauma has bilateral periorbital bruising ('raccoon eyes'). What does this indicate?",
    options: ["Anterior skull base fracture", "Temporal bone fracture", "Occipital fracture", "Zygomatic fracture"],
    correctIndex: 0,
    explanation: "Raccoon eyes are a classic sign of anterior skull base fracture.",
    topic: "Trauma",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with head injury becomes bradycardic and hypertensive. What is this combination known as?",
    options: ["Cushing’s response", "Beck’s triad", "Kernohan’s notch", "Monro-Kellie effect"],
    correctIndex: 0,
    explanation: "Cushing’s response (hypertension + bradycardia) indicates raised intracranial pressure.",
    topic: "Trauma",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 72-year-old man presents with gait disturbance, urinary incontinence, and cognitive decline. CT shows enlarged ventricles with normal opening pressure. What is the diagnosis?",
    options: ["Normal pressure hydrocephalus", "Obstructive hydrocephalus", "Chiari malformation", "Subarachnoid haemorrhage"],
    correctIndex: 0,
    explanation: "The classic triad of gait disturbance, incontinence, and cognitive decline indicates normal pressure hydrocephalus.",
    topic: "CSF",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient develops CSF rhinorrhoea after minor trauma. What is the most likely anatomical defect?",
    options: ["Cribriform plate fracture", "Temporal bone fracture", "Occipital fracture", "Sphenoid wing fracture"],
    correctIndex: 0,
    explanation: "The cribriform plate is the most common site of traumatic CSF rhinorrhoea.",
    topic: "CSF",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 6-month-old infant presents with increasing head circumference and bulging fontanelle. Ultrasound shows dilated lateral ventricles. What is the most likely cause?",
    options: ["Aqueductal stenosis", "Chiari II malformation", "Subdural effusion", "Craniosynostosis"],
    correctIndex: 0,
    explanation: "Aqueductal stenosis is a common cause of obstructive hydrocephalus in infants.",
    topic: "CSF",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with a VP shunt presents with headache, vomiting, and reduced GCS. CT shows enlarged ventricles. What is the most likely cause?",
    options: ["Shunt blockage", "Shunt infection", "Overdrainage", "Subdural haematoma"],
    correctIndex: 0,
    explanation: "Shunt blockage leads to recurrent hydrocephalus and ventricular enlargement.",
    topic: "CSF",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with suspected meningitis undergoes lumbar puncture. Opening pressure is very high. What condition is most associated with raised CSF pressure?",
    options: ["Idiopathic intracranial hypertension", "Normal pressure hydrocephalus", "Chiari malformation", "Spinal stenosis"],
    correctIndex: 0,
    explanation: "Idiopathic intracranial hypertension presents with raised opening pressure and papilloedema.",
    topic: "CSF",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient develops positional headaches after lumbar puncture. What is the most likely cause?",
    options: ["CSF leak", "Hydrocephalus", "Meningitis", "Subdural haematoma"],
    correctIndex: 0,
    explanation: "Post-LP headaches are caused by CSF leakage and intracranial hypotension.",
    topic: "CSF",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with a VP shunt develops fever and abdominal pain. What is the most likely complication?",
    options: ["Shunt infection", "Shunt blockage", "Overdrainage", "Pseudomeningocele"],
    correctIndex: 0,
    explanation: "Shunt infections often present with fever and abdominal symptoms due to peritoneal involvement.",
    topic: "CSF",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with papilloedema and normal imaging. LP shows raised opening pressure. What is the diagnosis?",
    options: ["Idiopathic intracranial hypertension", "Normal pressure hydrocephalus", "Obstructive hydrocephalus", "Cerebral venous thrombosis"],
    correctIndex: 0,
    explanation: "IIH presents with raised pressure, normal imaging, and papilloedema.",
    topic: "CSF",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient develops a soft, fluctuant swelling at a craniotomy site. What is the most likely diagnosis?",
    options: ["Pseudomeningocele", "Abscess", "Haematoma", "Seroma"],
    correctIndex: 0,
    explanation: "Pseudomeningoceles occur due to CSF leakage into soft tissues after surgery.",
    topic: "CSF",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with hydrocephalus undergoes endoscopic third ventriculostomy (ETV). What is the target anatomical structure?",
    options: ["Floor of the third ventricle", "Foramen of Monro", "Aqueduct of Sylvius", "Fourth ventricle outlet"],
    correctIndex: 0,
    explanation: "ETV creates a stoma in the floor of the third ventricle to bypass obstructive hydrocephalus.",
    topic: "CSF",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with acute onset back pain and bilateral leg weakness after lifting a heavy object. MRI shows a large central disc prolapse at L4/L5. What is the most likely diagnosis?",
    options: ["Cauda equina syndrome", "Conus medullaris syndrome", "Spinal stenosis", "Spondylolisthesis"],
    correctIndex: 0,
    explanation: "Large central disc prolapse at L4/L5 can compress the cauda equina, causing bilateral weakness and back pain.",
    topic: "Spine",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with progressive hand clumsiness and gait disturbance. MRI shows cervical spinal cord compression due to spondylosis. What is the diagnosis?",
    options: ["Cervical myelopathy", "Radiculopathy", "Thoracic disc prolapse", "Peripheral neuropathy"],
    correctIndex: 0,
    explanation: "Cervical myelopathy causes gait disturbance, hand dysfunction, and long tract signs.",
    topic: "Spine",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old woman presents with severe back pain and vertebral collapse on X-ray. What is the most likely cause?",
    options: ["Osteoporotic compression fracture", "Metastasis", "Disc prolapse", "Spondylolisthesis"],
    correctIndex: 0,
    explanation: "Osteoporotic compression fractures are common in elderly women and cause vertebral collapse.",
    topic: "Spine",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with shooting pain down the posterior leg. Straight leg raise is positive. What nerve root is most likely affected?",
    options: ["S1", "L2", "L3", "T12"],
    correctIndex: 0,
    explanation: "S1 radiculopathy causes posterior leg pain and a positive straight leg raise.",
    topic: "Spine",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with saddle anaesthesia and urinary retention. What is the most urgent investigation?",
    options: ["MRI spine", "CT spine", "X-ray lumbar spine", "Ultrasound bladder"],
    correctIndex: 0,
    explanation: "MRI spine is required urgently to diagnose cauda equina syndrome.",
    topic: "Spine",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with back pain and known prostate cancer. MRI shows spinal cord compression. What is the initial management?",
    options: ["High-dose steroids", "Immediate surgery", "Chemotherapy", "Observation"],
    correctIndex: 0,
    explanation: "High-dose steroids reduce oedema and preserve neurological function in metastatic cord compression.",
    topic: "Spine",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with lower back pain and pain radiating to the anterior thigh. Which nerve root is affected?",
    options: ["L3", "S1", "L5", "T12"],
    correctIndex: 0,
    explanation: "L3 radiculopathy causes anterior thigh pain.",
    topic: "Spine",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with back pain after a fall. CT shows a burst fracture at L1. What is the main concern?",
    options: ["Retropulsion of bone fragments", "Disc prolapse", "Facet joint injury", "Ligament sprain"],
    correctIndex: 0,
    explanation: "Burst fractures can retropulse bone fragments into the spinal canal, risking cord injury.",
    topic: "Spine",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with chronic back pain and MRI shows spondylolisthesis at L5/S1. What structure is defective?",
    options: ["Pars interarticularis", "Pedicle", "Spinous process", "Transverse process"],
    correctIndex: 0,
    explanation: "Spondylolisthesis commonly results from a defect in the pars interarticularis.",
    topic: "Spine",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with fever, back pain, and elevated inflammatory markers. MRI shows disc space infection. What is the diagnosis?",
    options: ["Discitis", "Osteoarthritis", "Spondylolisthesis", "Facet joint syndrome"],
    correctIndex: 0,
    explanation: "Discitis presents with severe back pain, fever, and MRI evidence of disc space infection.",
    topic: "Spine",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 6-month-old infant presents with increasing head circumference and bulging fontanelle. Ultrasound shows dilated lateral ventricles. What is the most likely cause?",
    options: ["Aqueductal stenosis", "Chiari II malformation", "Subdural effusion", "Craniosynostosis"],
    correctIndex: 0,
    explanation: "Aqueductal stenosis is a common cause of obstructive hydrocephalus in infants.",
    topic: "Paediatrics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A newborn presents with a lumbosacral swelling and CSF leak. What is the most likely diagnosis?",
    options: ["Myelomeningocele", "Meningocele", "Lipomyelomeningocele", "Dermoid cyst"],
    correctIndex: 0,
    explanation: "Myelomeningocele involves exposed neural tissue and CSF leakage.",
    topic: "Paediatrics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A child presents with macrocephaly and delayed development. MRI shows enlarged ventricles with a thin cortical mantle. What is the diagnosis?",
    options: ["Hydrocephalus", "Craniosynostosis", "Subdural haematoma", "Encephalocele"],
    correctIndex: 0,
    explanation: "Hydrocephalus causes ventricular enlargement and thinning of the cortex.",
    topic: "Paediatrics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 4-year-old child presents with ataxia and vomiting. MRI shows a midline posterior fossa tumour. What is the most likely diagnosis?",
    options: ["Medulloblastoma", "Pilocytic astrocytoma", "Ependymoma", "Craniopharyngioma"],
    correctIndex: 0,
    explanation: "Medulloblastoma is a common malignant midline posterior fossa tumour in children.",
    topic: "Paediatrics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A child presents with precocious puberty and a suprasellar mass. What tumour is most likely?",
    options: ["Hypothalamic hamartoma", "Craniopharyngioma", "Pituitary adenoma", "Pineoblastoma"],
    correctIndex: 0,
    explanation: "Hypothalamic hamartomas can cause precocious puberty due to GnRH secretion.",
    topic: "Paediatrics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 3-year-old child presents with head tilt and irritability. MRI shows a mass at the foramen magnum. What is the likely diagnosis?",
    options: ["Chiari malformation", "Meningioma", "Chordoma", "Dermoid cyst"],
    correctIndex: 0,
    explanation: "Chiari malformations can present with head tilt and brainstem compression symptoms.",
    topic: "Paediatrics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A child presents with seizures and a cortical tuber on MRI. What condition is associated?",
    options: ["Tuberous sclerosis", "Neurofibromatosis type 1", "Sturge-Weber syndrome", "Von Hippel–Lindau disease"],
    correctIndex: 0,
    explanation: "Cortical tubers are characteristic of tuberous sclerosis and cause epilepsy.",
    topic: "Paediatrics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A newborn has a large occipital mass containing brain tissue. What is the diagnosis?",
    options: ["Encephalocele", "Meningocele", "Dermoid cyst", "Lipoma"],
    correctIndex: 0,
    explanation: "Encephaloceles contain herniated brain tissue through skull defects.",
    topic: "Paediatrics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A child presents with café-au-lait spots and optic pathway glioma. What condition is most likely?",
    options: ["Neurofibromatosis type 1", "Tuberous sclerosis", "Sturge-Weber syndrome", "Li-Fraumeni syndrome"],
    correctIndex: 0,
    explanation: "NF1 is associated with café-au-lait spots and optic pathway gliomas.",
    topic: "Paediatrics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 2-year-old child presents with irritability and vomiting. MRI shows a fourth ventricular tumour. What is the likely diagnosis?",
    options: ["Ependymoma", "Medulloblastoma", "Pilocytic astrocytoma", "Craniopharyngioma"],
    correctIndex: 0,
    explanation: "Ependymomas commonly arise from the floor of the fourth ventricle in young children.",
    topic: "Paediatrics",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with wrist drop after prolonged compression of the upper arm. What nerve is affected?",
    options: ["Radial nerve", "Median nerve", "Ulnar nerve", "Musculocutaneous nerve"],
    correctIndex: 0,
    explanation: "Radial nerve palsy causes wrist drop due to loss of extensor function.",
    topic: "Peripheral Nerve",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with numbness over the lateral forearm following elbow trauma. Which nerve is injured?",
    options: ["Musculocutaneous nerve", "Median nerve", "Ulnar nerve", "Radial nerve"],
    correctIndex: 0,
    explanation: "The musculocutaneous nerve supplies sensation to the lateral forearm via the lateral cutaneous nerve.",
    topic: "Peripheral Nerve",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 50-year-old man presents with hand weakness and wasting of the interossei. What nerve is most likely affected?",
    options: ["Ulnar nerve", "Median nerve", "Radial nerve", "Axillary nerve"],
    correctIndex: 0,
    explanation: "Ulnar nerve injury causes interossei wasting and weak finger abduction/adduction.",
    topic: "Peripheral Nerve",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with inability to oppose the thumb. Which nerve is affected?",
    options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Posterior interosseous nerve"],
    correctIndex: 0,
    explanation: "Median nerve injury impairs thumb opposition due to loss of thenar muscle function.",
    topic: "Peripheral Nerve",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 28-year-old man presents with foot drop after fibular head trauma. Which nerve is injured?",
    options: ["Common peroneal nerve", "Tibial nerve", "Femoral nerve", "Sural nerve"],
    correctIndex: 0,
    explanation: "The common peroneal nerve is vulnerable at the fibular head and causes foot drop when injured.",
    topic: "Peripheral Nerve",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with numbness in the lateral thigh. What condition is most likely?",
    options: ["Meralgia paraesthetica", "Sciatica", "Femoral neuropathy", "Obturator neuropathy"],
    correctIndex: 0,
    explanation: "Meralgia paraesthetica is caused by compression of the lateral femoral cutaneous nerve.",
    topic: "Peripheral Nerve",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with winging of the scapula. Which nerve is injured?",
    options: ["Long thoracic nerve", "Spinal accessory nerve", "Axillary nerve", "Radial nerve"],
    correctIndex: 0,
    explanation: "Long thoracic nerve injury causes serratus anterior weakness and scapular winging.",
    topic: "Peripheral Nerve",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with shoulder weakness and inability to abduct the arm beyond 15 degrees. Which nerve is affected?",
    options: ["Axillary nerve", "Suprascapular nerve", "Radial nerve", "Median nerve"],
    correctIndex: 0,
    explanation: "Axillary nerve injury affects the deltoid, impairing shoulder abduction.",
    topic: "Peripheral Nerve",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with loss of sensation over the first web space of the foot. Which nerve is responsible?",
    options: ["Deep peroneal nerve", "Superficial peroneal nerve", "Tibial nerve", "Sural nerve"],
    correctIndex: 0,
    explanation: "The deep peroneal nerve supplies the first dorsal web space.",
    topic: "Peripheral Nerve",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with hoarseness after thyroid surgery. Which nerve is most likely injured?",
    options: ["Recurrent laryngeal nerve", "Superior laryngeal nerve", "Vagus nerve", "Glossopharyngeal nerve"],
    correctIndex: 0,
    explanation: "The recurrent laryngeal nerve is vulnerable during thyroid surgery and causes hoarseness when injured.",
    topic: "Peripheral Nerve",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man with Parkinson’s disease presents with severe tremor despite optimal medical therapy. What is the most effective surgical target for tremor control?",
    options: ["Ventral intermediate nucleus of the thalamus (VIM)", "Subthalamic nucleus", "Globus pallidus internus", "Caudate nucleus"],
    correctIndex: 0,
    explanation: "VIM thalamic stimulation is highly effective for tremor control in Parkinson’s disease.",
    topic: "Functional",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with Parkinson’s disease undergoes DBS. Which symptom responds best to subthalamic nucleus stimulation?",
    options: ["Bradykinesia", "Tremor", "Postural instability", "Cognitive decline"],
    correctIndex: 0,
    explanation: "STN stimulation improves bradykinesia and rigidity most reliably.",
    topic: "Functional",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with severe unilateral facial pain triggered by touch. MRI is normal. What is the first-line surgical treatment?",
    options: ["Microvascular decompression", "Rhizotomy", "Gamma knife radiosurgery", "Trigeminal nerve graft"],
    correctIndex: 0,
    explanation: "Microvascular decompression is the gold standard for trigeminal neuralgia when medical therapy fails.",
    topic: "Functional",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with essential tremor is considered for surgery. What is the preferred target for DBS?",
    options: ["Ventral intermediate nucleus of the thalamus", "Subthalamic nucleus", "Globus pallidus externus", "Red nucleus"],
    correctIndex: 0,
    explanation: "VIM DBS is the standard surgical treatment for essential tremor.",
    topic: "Functional",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with dystonia is referred for DBS. Which target is most effective?",
    options: ["Globus pallidus internus", "Subthalamic nucleus", "Ventral intermediate nucleus", "Putamen"],
    correctIndex: 0,
    explanation: "GPi stimulation is effective for primary dystonia and improves motor control.",
    topic: "Functional",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with chronic neuropathic pain is considered for neuromodulation. What is the most common intervention?",
    options: ["Spinal cord stimulation", "Motor cortex stimulation", "Thalamotomy", "Cordotomy"],
    correctIndex: 0,
    explanation: "Spinal cord stimulation is widely used for refractory neuropathic pain.",
    topic: "Functional",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with trigeminal neuralgia undergoes percutaneous rhizotomy. What is the main complication?",
    options: ["Facial numbness", "Facial weakness", "Hearing loss", "Diplopia"],
    correctIndex: 0,
    explanation: "Rhizotomy intentionally injures sensory fibres, often causing facial numbness.",
    topic: "Functional",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with Parkinson’s disease develops severe dyskinesias. Which DBS target is most effective for reducing dyskinesia?",
    options: ["Globus pallidus internus", "Subthalamic nucleus", "Ventral intermediate nucleus", "Pedunculopontine nucleus"],
    correctIndex: 0,
    explanation: "GPi stimulation reduces dyskinesias and is often preferred when they are prominent.",
    topic: "Functional",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with refractory epilepsy is considered for vagus nerve stimulation. Which side is used?",
    options: ["Left vagus nerve", "Right vagus nerve", "Either side", "Both sides"],
    correctIndex: 0,
    explanation: "The left vagus nerve is used to avoid cardiac complications associated with right vagal stimulation.",
    topic: "Functional",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with severe spasticity is treated with intrathecal baclofen. What is the main advantage of intrathecal delivery?",
    options: ["Lower systemic side effects", "Higher peak serum levels", "Improved cognition", "Reduced infection risk"],
    correctIndex: 0,
    explanation: "Intrathecal baclofen provides effective spasticity control with fewer systemic side effects.",
    topic: "Functional",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 22-year-old woman presents with recurrent episodes of déjà vu followed by impaired awareness. MRI shows hippocampal sclerosis. What is the most likely seizure type?",
    options: ["Temporal lobe seizure", "Absence seizure", "Generalised tonic-clonic seizure", "Myoclonic seizure"],
    correctIndex: 0,
    explanation: "Hippocampal sclerosis is strongly associated with temporal lobe epilepsy presenting with déjà vu and impaired awareness.",
    topic: "Epilepsy",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with focal epilepsy is evaluated for surgery. What investigation best identifies the seizure onset zone?",
    options: ["Video EEG telemetry", "CT head", "Lumbar puncture", "PET scan"],
    correctIndex: 0,
    explanation: "Video EEG telemetry is essential for localising the seizure onset zone before epilepsy surgery.",
    topic: "Epilepsy",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with sudden brief jerks of both arms in the morning. What is the most likely diagnosis?",
    options: ["Juvenile myoclonic epilepsy", "Absence epilepsy", "Temporal lobe epilepsy", "Frontal lobe epilepsy"],
    correctIndex: 0,
    explanation: "Morning myoclonic jerks are characteristic of juvenile myoclonic epilepsy.",
    topic: "Epilepsy",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with staring episodes lasting 10 seconds and rapid recovery. EEG shows 3 Hz spike-and-wave discharges. What is the diagnosis?",
    options: ["Absence epilepsy", "Temporal lobe epilepsy", "Frontal lobe epilepsy", "Psychogenic non-epileptic seizures"],
    correctIndex: 0,
    explanation: "Absence seizures show classic 3 Hz spike-and-wave EEG patterns.",
    topic: "Epilepsy",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with refractory epilepsy is considered for vagus nerve stimulation. Which nerve is used?",
    options: ["Left vagus nerve", "Right vagus nerve", "Either vagus nerve", "Glossopharyngeal nerve"],
    correctIndex: 0,
    explanation: "The left vagus nerve is used to avoid cardiac complications associated with right vagal stimulation.",
    topic: "Epilepsy",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with nocturnal seizures characterised by thrashing movements. What is the most likely seizure origin?",
    options: ["Frontal lobe", "Temporal lobe", "Occipital lobe", "Parietal lobe"],
    correctIndex: 0,
    explanation: "Frontal lobe seizures often occur at night and present with dramatic motor activity.",
    topic: "Epilepsy",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with epilepsy has an MRI showing a cortical tuber. What condition is associated?",
    options: ["Tuberous sclerosis", "Neurofibromatosis type 1", "Sturge-Weber syndrome", "Von Hippel–Lindau disease"],
    correctIndex: 0,
    explanation: "Cortical tubers are characteristic of tuberous sclerosis and frequently cause epilepsy.",
    topic: "Epilepsy",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with visual hallucinations followed by contralateral eye deviation. What is the likely seizure origin?",
    options: ["Occipital lobe", "Temporal lobe", "Frontal lobe", "Parietal lobe"],
    correctIndex: 0,
    explanation: "Occipital lobe seizures often begin with visual symptoms.",
    topic: "Epilepsy",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with focal epilepsy undergoes resection of a cavernoma. What is the mechanism of seizure generation?",
    options: ["Irritation from hemosiderin deposition", "Raised intracranial pressure", "CSF obstruction", "Cortical dysplasia"],
    correctIndex: 0,
    explanation: "Cavernomas cause seizures due to hemosiderin deposition irritating surrounding cortex.",
    topic: "Epilepsy",
    level: "MRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with gelastic seizures (inappropriate laughing). MRI shows a mass near the hypothalamus. What is the diagnosis?",
    options: ["Hypothalamic hamartoma", "Pituitary adenoma", "Craniopharyngioma", "Pineal tumour"],
    correctIndex: 0,
    explanation: "Hypothalamic hamartomas classically cause gelastic seizures.",
    topic: "Epilepsy",
    level: "MRCS",
    flaggedSet: 0
  },

  /*FRCS level from here*/

  {
    stem: "A 54-year-old man with a ruptured ACom aneurysm deteriorates on day 7 despite nimodipine. CTA shows diffuse vasospasm with reduced MCA calibre bilaterally. What is the next best management step?",
    options: ["Induced hypertension", "Repeat coiling", "External ventricular drain insertion", "High-dose steroids"],
    correctIndex: 0,
    explanation: "Delayed cerebral ischaemia from vasospasm is treated with hypertensive therapy to augment cerebral perfusion.",
    topic: "Vascular",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During clipping of a PCom aneurysm, the surgeon encounters brisk bleeding from the aneurysm dome after temporary clipping. What is the most appropriate immediate manoeuvre?",
    options: ["Apply a second temporary clip proximally", "Convert to endovascular coiling", "Pack the aneurysm dome with cottonoids", "Abort the procedure"],
    correctIndex: 0,
    explanation: "A second proximal temporary clip reduces inflow and allows controlled repair of intraoperative rupture.",
    topic: "Vascular",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with a large AVM presents with intraparenchymal haemorrhage and mass effect. CTA shows deep venous drainage. What factor most strongly predicts surgical risk?",
    options: ["Deep venous drainage", "Size of the nidus", "Presence of seizures", "Age of the patient"],
    correctIndex: 0,
    explanation: "Deep venous drainage is a major Spetzler–Martin grading component and significantly increases operative risk.",
    topic: "Vascular",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old woman presents with thunderclap headache. CT is normal. LP at 12 hours shows no xanthochromia. CTA reveals a 3 mm incidental ACom aneurysm. What is the correct management?",
    options: ["Observation with interval imaging", "Immediate coiling", "Surgical clipping", "Digital subtraction angiography"],
    correctIndex: 0,
    explanation: "A negative LP rules out SAH; small incidental aneurysms are usually observed unless high-risk features exist.",
    topic: "Vascular",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with basilar tip aneurysm undergoes endovascular coiling. Post-procedure, they develop decreased consciousness and bilateral pinpoint pupils. What is the most likely cause?",
    options: ["Basilar thrombosis", "Hydrocephalus", "Rebleeding", "Nimodipine toxicity"],
    correctIndex: 0,
    explanation: "Basilar thrombosis is a catastrophic complication of posterior circulation aneurysm coiling.",
    topic: "Vascular",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 48-year-old man presents with left homonymous hemianopia. MRI shows an unruptured P1 segment aneurysm compressing the optic tract. What is the preferred treatment?",
    options: ["Microsurgical clipping", "Endovascular coiling", "Flow diversion", "Observation"],
    correctIndex: 0,
    explanation: "P1 aneurysms causing mass effect on the optic tract are best treated with microsurgical clipping for decompression.",
    topic: "Vascular",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with SAH develops acute hydrocephalus. EVD is inserted. What is the most important parameter to monitor to avoid rebleeding?",
    options: ["Rate of CSF drainage", "ICP waveform morphology", "Serum sodium", "CPP calculation"],
    correctIndex: 0,
    explanation: "Rapid CSF drainage can reduce tamponade effect and precipitate aneurysm rebleeding.",
    topic: "Vascular",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man with atrial fibrillation presents with acute left hemiparesis. CTA shows right ICA occlusion with good collateral flow. What is the best initial intervention?",
    options: ["Mechanical thrombectomy", "IV heparin", "Carotid endarterectomy", "Extracranial–intracranial bypass"],
    correctIndex: 0,
    explanation: "Large vessel occlusion with salvageable tissue is best treated with thrombectomy.",
    topic: "Vascular",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with a giant MCA aneurysm presents with seizures and mass effect. What is the most appropriate surgical strategy?",
    options: ["Bypass with parent vessel occlusion", "Primary clipping", "Endovascular coiling", "Flow diversion alone"],
    correctIndex: 0,
    explanation: "Giant aneurysms often require bypass and parent vessel occlusion due to complex morphology.",
    topic: "Vascular",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with carotid stenosis undergoes endarterectomy. Postoperatively, they develop severe headache and seizures. CT shows no haemorrhage. What is the most likely diagnosis?",
    options: ["Cerebral hyperperfusion syndrome", "Ischaemic stroke", "Carotid dissection", "Hypertensive encephalopathy"],
    correctIndex: 0,
    explanation: "Hyperperfusion syndrome occurs after CEA due to impaired autoregulation and increased flow.",
    topic: "Vascular",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 62-year-old man presents with progressive left-sided weakness. MRI shows a right frontal ring-enhancing lesion with significant surrounding oedema. Perfusion imaging demonstrates high rCBV. What is the most likely diagnosis?",
    options: ["Glioblastoma multiforme", "Brain abscess", "Metastatic renal carcinoma", "Primary CNS lymphoma"],
    correctIndex: 0,
    explanation: "High rCBV and irregular ring enhancement strongly favour GBM over abscess or lymphoma.",
    topic: "Oncology",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During resection of a convexity meningioma, brisk bleeding occurs from a dural venous channel. What is the most appropriate immediate manoeuvre?",
    options: ["Apply bipolar coagulation and pack with haemostatic material", "Ligate the superior sagittal sinus", "Abort the procedure", "Convert to craniotomy extension"],
    correctIndex: 0,
    explanation: "Bleeding from dural venous channels is controlled with bipolar coagulation and packing; sinus ligation risks catastrophic venous infarction.",
    topic: "Oncology",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 48-year-old woman presents with seizures. MRI shows a non-enhancing cortical lesion with calcification in the frontal lobe. What histological feature is most characteristic?",
    options: ["Perinuclear halos ('fried egg' appearance)", "Rosenthal fibres", "Pseudopalisading necrosis", "Reed–Sternberg cells"],
    correctIndex: 0,
    explanation: "Oligodendrogliomas show perinuclear halos and calcification, distinguishing them from astrocytomas.",
    topic: "Oncology",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with known breast cancer develops a solitary cerebellar metastasis causing obstructive hydrocephalus. What is the most appropriate initial management?",
    options: ["Posterior fossa decompression and tumour resection", "Whole-brain radiotherapy", "Stereotactic radiosurgery", "Chemotherapy"],
    correctIndex: 0,
    explanation: "Posterior fossa lesions causing hydrocephalus require urgent decompression and resection.",
    topic: "Oncology",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with bitemporal hemianopia. MRI shows a large non-functioning pituitary macroadenoma compressing the optic chiasm. What is the preferred surgical approach?",
    options: ["Endoscopic transsphenoidal resection", "Transcranial pterional craniotomy", "Subfrontal craniotomy", "Endonasal ethmoidectomy"],
    correctIndex: 0,
    explanation: "Endoscopic transsphenoidal surgery is the standard approach for pituitary macroadenomas compressing the chiasm.",
    topic: "Oncology",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old man presents with confusion and MRI shows a homogeneously enhancing periventricular lesion. CSF cytology is negative. What is the next best investigation?",
    options: ["Stereotactic biopsy", "Repeat lumbar puncture", "PET scan", "Empirical steroids"],
    correctIndex: 0,
    explanation: "Primary CNS lymphoma requires tissue diagnosis; steroids should be avoided pre-biopsy as they obscure histology.",
    topic: "Oncology",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with a large petroclival meningioma presents with progressive cranial nerve deficits. What factor most strongly predicts surgical morbidity?",
    options: ["Extent of brainstem adherence", "Tumour size", "Patient age", "Presence of oedema"],
    correctIndex: 0,
    explanation: "Brainstem adherence is the key determinant of morbidity in petroclival meningioma surgery.",
    topic: "Oncology",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old woman presents with headaches and MRI shows a pineal mass causing aqueductal obstruction. What tumour most commonly arises in the pineal region in adults?",
    options: ["Pineocytoma", "Pineoblastoma", "Germinoma", "Ependymoma"],
    correctIndex: 0,
    explanation: "Pineocytomas are the most common pineal tumours in adults, whereas pineoblastomas occur in children.",
    topic: "Oncology",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with NF2 presents with bilateral vestibular schwannomas. What is the most important factor guiding surgical timing?",
    options: ["Preservation of hearing", "Tumour size alone", "Patient age", "Presence of tinnitus"],
    correctIndex: 0,
    explanation: "Hearing preservation is the key determinant of timing in NF2 vestibular schwannoma surgery.",
    topic: "Oncology",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient undergoes resection of a high-grade glioma. Postoperative MRI shows residual enhancing tumour. What is the next best management step?",
    options: ["Concurrent chemoradiotherapy", "Repeat resection", "Observation", "Stereotactic radiosurgery"],
    correctIndex: 0,
    explanation: "High-grade gliomas require adjuvant chemoradiotherapy regardless of residual tumour.",
    topic: "Oncology",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 52-year-old woman presents with progressive unilateral hearing loss and imbalance. MRI shows a 2.8 cm vestibular schwannoma with brainstem compression. What is the most appropriate management strategy?",
    options: ["Retrosigmoid microsurgical resection", "Stereotactic radiosurgery", "Middle fossa approach", "Observation with interval MRI"],
    correctIndex: 0,
    explanation: "Tumours >2.5 cm with brainstem compression require microsurgical resection; radiosurgery is reserved for smaller lesions.",
    topic: "Skull Base",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During resection of a petroclival meningioma, the surgeon encounters dense adherence to the basilar artery perforators. What is the safest operative strategy?",
    options: ["Leave adherent tumour on critical vessels", "Attempt complete resection", "Convert to endonasal approach", "Coagulate the tumour capsule aggressively"],
    correctIndex: 0,
    explanation: "Adherent tumour on perforators should be left to avoid catastrophic brainstem infarction.",
    topic: "Skull Base",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man presents with trigeminal neuralgia and MRI shows a Meckel’s cave mass extending into the posterior fossa. What is the most likely diagnosis?",
    options: ["Trigeminal schwannoma", "Epidermoid cyst", "Meningioma", "Chordoma"],
    correctIndex: 0,
    explanation: "Trigeminal schwannomas commonly arise in Meckel’s cave and extend posteriorly.",
    topic: "Skull Base",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with pulsatile tinnitus and conductive hearing loss. CT shows a vascular middle ear mass. What is the most likely tumour?",
    options: ["Glomus tympanicum", "Vestibular schwannoma", "Cholesteatoma", "Meningioma"],
    correctIndex: 0,
    explanation: "Glomus tympanicum tumours appear as vascular middle ear masses causing pulsatile tinnitus.",
    topic: "Skull Base",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 55-year-old woman presents with progressive visual loss. MRI shows a tuberculum sellae meningioma compressing the optic chiasm. What is the preferred surgical approach?",
    options: ["Endoscopic endonasal resection", "Pterional craniotomy", "Subfrontal craniotomy", "Transcallosal approach"],
    correctIndex: 0,
    explanation: "Endoscopic endonasal surgery provides direct midline access and early optic nerve decompression.",
    topic: "Skull Base",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with a large clival chordoma presents with diplopia and lower cranial nerve palsies. What factor most strongly predicts long-term prognosis?",
    options: ["Extent of surgical resection", "Patient age", "Presence of hydrocephalus", "Tumour vascularity"],
    correctIndex: 0,
    explanation: "Chordoma prognosis is strongly linked to extent of resection; gross total resection improves survival.",
    topic: "Skull Base",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During resection of an acoustic neuroma, the facial nerve is found to be thinned and draped over the tumour capsule. What is the safest strategy?",
    options: ["Debulk tumour internally and peel capsule off nerve", "Attempt en bloc resection", "Convert to radiosurgery", "Abort the procedure"],
    correctIndex: 0,
    explanation: "Internal debulking followed by careful capsule dissection preserves facial nerve function.",
    topic: "Skull Base",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man presents with progressive dysphagia and hoarseness. MRI shows a jugular foramen mass with salt-and-pepper appearance. What is the diagnosis?",
    options: ["Glomus jugulare tumour", "Schwannoma", "Chordoma", "Meningioma"],
    correctIndex: 0,
    explanation: "Glomus jugulare tumours arise from paraganglionic tissue and show characteristic salt-and-pepper MRI appearance.",
    topic: "Skull Base",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with CSF rhinorrhoea after minor trauma. CT shows a defect in the anterior skull base. What is the most common site of injury?",
    options: ["Cribriform plate", "Planum sphenoidale", "Sphenoid sinus roof", "Ethmoid roof"],
    correctIndex: 0,
    explanation: "The cribriform plate is the most common site of traumatic CSF leaks.",
    topic: "Skull Base",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old woman presents with progressive anosmia. MRI shows an olfactory groove meningioma. What complication is most associated with surgical resection?",
    options: ["Frontal lobe venous infarction", "CSF leak", "Visual loss", "Facial nerve palsy"],
    correctIndex: 0,
    explanation: "Olfactory groove meningiomas often adhere to the anterior cranial fossa venous system, risking venous infarction.",
    topic: "Skull Base",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 28-year-old man is brought in after a high-speed collision. He has a GCS of 6 and unequal pupils. CT shows a large right acute subdural haematoma with 12 mm midline shift. What is the most appropriate immediate management?",
    options: ["Emergency decompressive craniectomy", "Hypertonic saline infusion only", "ICP monitor insertion", "Repeat CT in 1 hour"],
    correctIndex: 0,
    explanation: "Severe mass effect with neurological deterioration requires immediate surgical decompression; delaying for ICP monitoring is inappropriate.",
    topic: "Trauma",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During evacuation of an epidural haematoma, brisk arterial bleeding is encountered deep to the temporal bone. What vessel is most likely injured?",
    options: ["Middle meningeal artery", "Superficial temporal artery", "Anterior choroidal artery", "Posterior communicating artery"],
    correctIndex: 0,
    explanation: "Epidural haematomas commonly arise from middle meningeal artery injury, especially with temporal bone fractures.",
    topic: "Trauma",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old woman falls and develops progressive confusion over 48 hours. CT shows an acute-on-chronic subdural haematoma. What factor most strongly predicts recurrence after burr hole drainage?",
    options: ["Residual subdural membranes", "Patient age", "Side of the haematoma", "Presence of midline shift"],
    correctIndex: 0,
    explanation: "Residual membranes and septations increase recurrence risk by preventing full re-expansion of the brain.",
    topic: "Trauma",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with severe TBI develops refractory intracranial hypertension despite sedation, paralysis, and hyperosmolar therapy. What is the next best intervention?",
    options: ["Decompressive craniectomy", "Barbiturate coma", "Lumbar drain insertion", "High-dose steroids"],
    correctIndex: 0,
    explanation: "Decompressive craniectomy is indicated when maximal medical therapy fails; lumbar drains are contraindicated in supratentorial mass effect.",
    topic: "Trauma",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with periorbital bruising and CSF rhinorrhoea after assault. CT shows an anterior skull base fracture. What is the most appropriate initial management?",
    options: ["Conservative management with observation", "Immediate surgical repair", "Lumbar drain insertion", "Endoscopic sinus packing"],
    correctIndex: 0,
    explanation: "Most traumatic CSF leaks resolve spontaneously; early surgery is reserved for persistent leaks or complications.",
    topic: "Trauma",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with head trauma becomes bradycardic and hypertensive. ICP monitor shows plateau waves. What is the underlying mechanism?",
    options: ["Reduced cerebral compliance", "Hypovolaemia", "Brainstem infarction", "Hypercapnia"],
    correctIndex: 0,
    explanation: "Plateau waves indicate severely reduced intracranial compliance and impending herniation.",
    topic: "Trauma",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 22-year-old man presents after a fall with a temporal bone fracture. He has facial paralysis and haemotympanum. What is the most likely type of fracture?",
    options: ["Longitudinal temporal bone fracture", "Transverse temporal bone fracture", "Occipital condyle fracture", "Zygomatic arch fracture"],
    correctIndex: 0,
    explanation: "Longitudinal fractures commonly cause facial nerve injury and haemotympanum.",
    topic: "Trauma",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with severe TBI develops diabetes insipidus. What is the most likely site of injury?",
    options: ["Posterior pituitary", "Anterior pituitary", "Hypothalamus", "Optic chiasm"],
    correctIndex: 0,
    explanation: "Traumatic DI results from posterior pituitary or infundibulum injury, impairing ADH release.",
    topic: "Trauma",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with a depressed skull fracture contaminated with soil. What is the correct management?",
    options: ["Surgical elevation and debridement", "Observation only", "Anticoagulation", "Delayed surgery after 48 hours"],
    correctIndex: 0,
    explanation: "Open, contaminated depressed fractures require urgent elevation, debridement, and antibiotics.",
    topic: "Trauma",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with head trauma develops anisocoria and extensor posturing. CT shows a large cerebellar haemorrhage compressing the fourth ventricle. What is the most appropriate management?",
    options: ["Posterior fossa decompression", "External ventricular drain only", "Hyperosmolar therapy alone", "Observation"],
    correctIndex: 0,
    explanation: "Cerebellar haemorrhage with brainstem compression requires urgent posterior fossa decompression; EVD alone is insufficient.",
    topic: "Trauma",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 72-year-old man with normal pressure hydrocephalus undergoes high-volume lumbar tap. His gait improves significantly for 24 hours. What is the most appropriate next step?",
    options: ["Ventriculoperitoneal shunt insertion", "Repeat lumbar tap", "Endoscopic third ventriculostomy", "Observation only"],
    correctIndex: 0,
    explanation: "A positive tap test strongly predicts benefit from VP shunting; ETV is ineffective in communicating hydrocephalus.",
    topic: "CSF",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with a VP shunt presents with headache, vomiting, and papilloedema. CT shows slit ventricles. What is the most likely diagnosis?",
    options: ["Shunt overdrainage", "Shunt blockage", "Shunt infection", "Pseudomeningocele"],
    correctIndex: 0,
    explanation: "Slit ventricles with symptoms of raised ICP indicate overdrainage causing intracranial hypotension and rebound hypertension.",
    topic: "CSF",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During endoscopic third ventriculostomy, the surgeon encounters a thick, opaque third ventricular floor. What is the safest strategy?",
    options: ["Abort ETV and convert to VP shunt", "Proceed with perforation using monopolar cautery", "Attempt perforation with blunt instrument", "Increase irrigation pressure to thin the membrane"],
    correctIndex: 0,
    explanation: "A thickened floor increases risk of basilar artery injury; conversion to shunting is safest.",
    topic: "CSF",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with idiopathic intracranial hypertension presents with progressive visual loss despite maximal medical therapy. What is the most appropriate surgical intervention?",
    options: ["Optic nerve sheath fenestration", "VP shunt", "ETV", "Lumbar drain insertion"],
    correctIndex: 0,
    explanation: "Optic nerve sheath fenestration protects vision directly; shunting treats ICP but may not prevent optic nerve damage.",
    topic: "CSF",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 6-year-old child with posterior fossa tumour undergoes resection. Postoperatively, they develop mutism and emotional lability. MRI shows no hydrocephalus. What is the diagnosis?",
    options: ["Cerebellar mutism syndrome", "Shunt malfunction", "Brainstem infarction", "Cerebellar abscess"],
    correctIndex: 0,
    explanation: "Cerebellar mutism syndrome occurs after midline posterior fossa surgery due to disruption of cerebellar–cortical pathways.",
    topic: "CSF",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with a VP shunt develops fever and abdominal pain. CT abdomen shows loculated fluid around the distal catheter. What is the most likely diagnosis?",
    options: ["Shunt infection with pseudocyst formation", "Shunt blockage", "Peritonitis from bowel perforation", "CSF ascites"],
    correctIndex: 0,
    explanation: "Distal catheter infections can cause CSF pseudocysts, presenting with abdominal pain and fever.",
    topic: "CSF",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient develops a soft, fluctuant swelling at the craniotomy site 2 weeks after surgery. MRI shows extradural CSF collection. What is the most likely cause?",
    options: ["Pseudomeningocele", "Wound infection", "Subgaleal haematoma", "Seroma"],
    correctIndex: 0,
    explanation: "Pseudomeningoceles result from dural defects causing CSF leakage into soft tissues.",
    topic: "CSF",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with obstructive hydrocephalus due to aqueductal stenosis undergoes ETV. Postoperatively, they deteriorate with rising ICP. MRI shows no flow void at the stoma. What is the most likely cause?",
    options: ["Stoma closure", "Shunt infection", "Overdrainage", "Subdural hygroma"],
    correctIndex: 0,
    explanation: "Lack of flow void indicates stoma failure; ETV closure is a known complication requiring urgent intervention.",
    topic: "CSF",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with suspected meningitis undergoes lumbar puncture. Opening pressure is extremely high. What is the most important contraindication to LP?",
    options: ["Presence of mass effect on imaging", "Fever", "Neck stiffness", "Leukocytosis"],
    correctIndex: 0,
    explanation: "LP in the presence of mass effect risks herniation; imaging must exclude this before LP.",
    topic: "CSF",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with communicating hydrocephalus undergoes VP shunt insertion. Postoperatively, they develop bilateral subdural collections. What is the underlying mechanism?",
    options: ["Rapid reduction in ventricular size causing tearing of bridging veins", "Shunt infection", "Overproduction of CSF", "Obstruction of the fourth ventricle outlets"],
    correctIndex: 0,
    explanation: "Overdrainage reduces ventricular size rapidly, stretching and tearing bridging veins, causing subdural collections.",
    topic: "CSF",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with progressive gait disturbance and hand clumsiness. MRI shows severe cervical canal stenosis at C4–C6 with T2 cord hyperintensity. What is the most appropriate surgical approach?",
    options: ["Posterior cervical decompression with instrumented fusion", "Anterior cervical discectomy alone", "Laminoplasty without fusion", "Observation with physiotherapy"],
    correctIndex: 0,
    explanation: "Multilevel stenosis with cord signal change is best treated with posterior decompression and fusion to prevent postoperative instability.",
    topic: "Spine",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 32-year-old man presents with acute cauda equina syndrome due to a massive central L4/5 disc prolapse. What is the most important prognostic factor for recovery of bladder function?",
    options: ["Time to decompression", "Size of the disc prolapse", "Patient age", "Presence of radicular pain"],
    correctIndex: 0,
    explanation: "Early decompression (<24 hours) is the strongest predictor of bladder recovery in cauda equina syndrome.",
    topic: "Spine",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During resection of an intradural extramedullary tumour at T10, the surgeon encounters a firm, encapsulated mass arising from a dorsal root. What is the most likely diagnosis?",
    options: ["Schwannoma", "Meningioma", "Ependymoma", "Dermoid cyst"],
    correctIndex: 0,
    explanation: "Schwannomas arise from dorsal sensory roots and are encapsulated, unlike meningiomas which are dural-based.",
    topic: "Spine",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 70-year-old woman presents with severe back pain and fever. MRI shows disc space narrowing with endplate erosion at L3/4. What is the most appropriate initial management?",
    options: ["Urgent IV antibiotics and blood cultures", "Immediate surgical debridement", "Oral antibiotics only", "Percutaneous vertebroplasty"],
    correctIndex: 0,
    explanation: "Discitis/osteomyelitis requires urgent IV antibiotics and cultures; surgery is reserved for instability or neurological deficit.",
    topic: "Spine",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with progressive lower limb weakness. MRI shows a thoracic intramedullary lesion with polar cysts. What is the most likely diagnosis?",
    options: ["Ependymoma", "Astrocytoma", "Meningioma", "Schwannoma"],
    correctIndex: 0,
    explanation: "Ependymomas commonly have polar cysts and occur centrally within the cord, especially in adults.",
    topic: "Spine",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 60-year-old man with metastatic prostate cancer presents with acute spinal cord compression. What is the most appropriate initial management?",
    options: ["High-dose steroids", "Immediate decompressive surgery", "Radiotherapy alone", "Chemotherapy"],
    correctIndex: 0,
    explanation: "High-dose steroids reduce oedema and preserve neurological function; surgery or radiotherapy follows based on stability.",
    topic: "Spine",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with severe back pain after a fall. CT shows an L1 burst fracture with 40% canal compromise but no neurological deficit. What is the most appropriate management?",
    options: ["Posterior instrumented fixation", "Conservative management with bracing", "Anterior corpectomy", "Kyphoplasty"],
    correctIndex: 0,
    explanation: "Significant canal compromise in burst fractures often requires posterior fixation even without neurological deficit.",
    topic: "Spine",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with chronic back pain and MRI shows bilateral pars defects at L5 with grade II spondylolisthesis. What is the preferred surgical treatment?",
    options: ["Posterolateral fusion with instrumentation", "Laminectomy alone", "Anterior lumbar interbody fusion only", "Observation"],
    correctIndex: 0,
    explanation: "Isthmic spondylolisthesis with symptoms and instability requires instrumented fusion; decompression alone is inadequate.",
    topic: "Spine",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with saddle anaesthesia and urinary retention. MRI shows a large central disc prolapse at L5/S1. What is the most urgent investigation?",
    options: ["MRI spine", "CT myelogram", "Lumbar X-ray", "Ultrasound bladder"],
    correctIndex: 0,
    explanation: "MRI is required urgently to confirm cauda equina syndrome and guide immediate decompression.",
    topic: "Spine",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During posterior cervical decompression, the surgeon encounters a large epidural venous plexus causing bleeding. What is the most effective method of haemostasis?",
    options: ["Bipolar coagulation with bone wax on bleeding points", "Ligating the venous plexus", "Packing with cottonoids alone", "Increasing irrigation pressure"],
    correctIndex: 0,
    explanation: "Epidural venous bleeding is best controlled with bipolar coagulation and bone wax; ligation is not feasible.",
    topic: "Spine",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A newborn with myelomeningocele undergoes primary closure. Postoperatively, the infant develops apnoea and stridor. MRI shows hindbrain herniation. What is the most likely diagnosis?",
    options: ["Chiari II malformation", "Chiari I malformation", "Syringomyelia", "Tethered cord syndrome"],
    correctIndex: 0,
    explanation: "Chiari II malformation is strongly associated with myelomeningocele and can cause brainstem dysfunction after closure.",
    topic: "Paediatrics",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 3-year-old child presents with ataxia and vomiting. MRI shows a midline posterior fossa tumour with hydrocephalus. What is the most appropriate initial management?",
    options: ["Urgent CSF diversion (EVD or ETV)", "Immediate tumour resection", "High-dose steroids", "Observation"],
    correctIndex: 0,
    explanation: "Hydrocephalus must be stabilised before posterior fossa tumour resection to prevent intraoperative herniation.",
    topic: "Paediatrics",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 6-year-old child presents with seizures and MRI shows multiple cortical tubers. What systemic condition is most likely?",
    options: ["Tuberous sclerosis", "Neurofibromatosis type 1", "Sturge-Weber syndrome", "Von Hippel–Lindau disease"],
    correctIndex: 0,
    explanation: "Cortical tubers are characteristic of tuberous sclerosis and frequently cause epilepsy.",
    topic: "Paediatrics",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A newborn presents with a large occipital encephalocele containing brain tissue. What factor most strongly predicts prognosis?",
    options: ["Amount of herniated neural tissue", "Size of the skull defect", "Presence of hydrocephalus", "Gestational age"],
    correctIndex: 0,
    explanation: "The amount of herniated brain tissue is the key determinant of neurological outcome.",
    topic: "Paediatrics",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 4-year-old child presents with progressive macrocephaly. MRI shows obstructive hydrocephalus due to aqueductal stenosis. What is the preferred surgical treatment?",
    options: ["Endoscopic third ventriculostomy", "VP shunt", "VA shunt", "Subtemporal decompression"],
    correctIndex: 0,
    explanation: "ETV is the preferred treatment for obstructive hydrocephalus caused by aqueductal stenosis.",
    topic: "Paediatrics",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A child presents with precocious puberty and gelastic seizures. MRI shows a mass in the hypothalamus. What is the most likely diagnosis?",
    options: ["Hypothalamic hamartoma", "Craniopharyngioma", "Pituitary adenoma", "Pineoblastoma"],
    correctIndex: 0,
    explanation: "Hypothalamic hamartomas cause gelastic seizures and endocrine disturbances including precocious puberty.",
    topic: "Paediatrics",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 2-year-old child presents with irritability and vomiting. MRI shows a fourth ventricular tumour arising from the floor. What is the most likely diagnosis?",
    options: ["Ependymoma", "Medulloblastoma", "Pilocytic astrocytoma", "Choroid plexus papilloma"],
    correctIndex: 0,
    explanation: "Ependymomas commonly arise from the floor of the fourth ventricle in young children.",
    topic: "Paediatrics",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A child with craniosynostosis presents with signs of raised ICP. CT shows fusion of the sagittal suture. What is the most appropriate surgical treatment?",
    options: ["Strip craniectomy", "Fronto-orbital advancement", "Posterior vault expansion", "Endoscopic third ventriculostomy"],
    correctIndex: 0,
    explanation: "Sagittal synostosis is treated with strip craniectomy or spring-assisted expansion to relieve ICP and correct deformity.",
    topic: "Paediatrics",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 10-year-old child presents with progressive scoliosis and MRI shows a thoracic syrinx. What is the most likely underlying condition?",
    options: ["Chiari I malformation", "Tethered cord", "Spinal lipoma", "Ependymoma"],
    correctIndex: 0,
    explanation: "Chiari I malformation is strongly associated with syringomyelia and scoliosis in children.",
    topic: "Paediatrics",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A newborn with myelomeningocele develops hydrocephalus after closure. What is the most appropriate initial CSF diversion procedure?",
    options: ["VP shunt", "ETV", "VA shunt", "Lumbar drain"],
    correctIndex: 0,
    explanation: "Hydrocephalus associated with myelomeningocele is usually communicating and treated with VP shunting.",
    topic: "Paediatrics",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 35-year-old man presents with complete wrist drop after a humeral shaft fracture. EMG at 6 weeks shows no motor unit potentials in the extensor compartment. What is the most appropriate next step?",
    options: ["Surgical exploration of the radial nerve", "Continue observation for 3 months", "Tendon transfer procedure", "Immediate nerve grafting"],
    correctIndex: 0,
    explanation: "Lack of motor unit potentials at 6 weeks suggests severe axonal injury; exploration is indicated to assess continuity.",
    topic: "Peripheral Nerve",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During carpal tunnel release, the surgeon encounters a bifid median nerve with a persistent median artery. What is the safest operative strategy?",
    options: ["Careful decompression preserving both nerve branches and artery", "Ligate the persistent median artery", "Convert to endoscopic release", "Abort the procedure"],
    correctIndex: 0,
    explanation: "Anatomic variants require meticulous decompression while preserving neurovascular structures.",
    topic: "Peripheral Nerve",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with clawing of the hand and wasting of the interossei. EMG shows denervation of intrinsic hand muscles. What is the most likely site of ulnar nerve compression?",
    options: ["Cubital tunnel", "Guyon’s canal", "Brachial plexus", "Pronator tunnel"],
    correctIndex: 0,
    explanation: "Cubital tunnel compression causes intrinsic muscle weakness and clawing; Guyon’s canal spares proximal muscles.",
    topic: "Peripheral Nerve",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 28-year-old man presents with foot drop after fibular neck trauma. EMG shows preserved tibial nerve function but complete denervation of dorsiflexors. What is the most appropriate management?",
    options: ["Early surgical exploration of the common peroneal nerve", "Observation for 6 months", "Posterior tibial tendon transfer", "Lumbar spine MRI"],
    correctIndex: 0,
    explanation: "Common peroneal nerve injuries at the fibular neck often require early exploration due to high risk of permanent deficit.",
    topic: "Peripheral Nerve",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with winging of the scapula after axillary surgery. What nerve is most likely injured?",
    options: ["Long thoracic nerve", "Spinal accessory nerve", "Axillary nerve", "Thoracodorsal nerve"],
    correctIndex: 0,
    explanation: "Long thoracic nerve injury causes serratus anterior paralysis and scapular winging.",
    topic: "Peripheral Nerve",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 45-year-old man presents with shoulder weakness and inability to abduct the arm beyond 15 degrees. MRI shows deltoid atrophy. What is the most likely cause?",
    options: ["Axillary nerve injury", "Suprascapular nerve injury", "Radial nerve injury", "Musculocutaneous nerve injury"],
    correctIndex: 0,
    explanation: "Axillary nerve injury affects the deltoid and teres minor, impairing shoulder abduction.",
    topic: "Peripheral Nerve",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with numbness over the lateral thigh. EMG confirms lateral femoral cutaneous nerve compression. What is the most appropriate initial management?",
    options: ["Weight loss and avoidance of tight clothing", "Surgical decompression", "Nerve grafting", "Lumbar discectomy"],
    correctIndex: 0,
    explanation: "Meralgia paraesthetica is usually treated conservatively; surgery is reserved for refractory cases.",
    topic: "Peripheral Nerve",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During brachial plexus exploration after trauma, the surgeon identifies a neuroma-in-continuity of the upper trunk. Intraoperative stimulation shows weak but present conduction. What is the best management?",
    options: ["External neurolysis", "Complete resection and nerve grafting", "Nerve transfer", "Observation only"],
    correctIndex: 0,
    explanation: "Neuromas with preserved conduction should undergo neurolysis rather than resection.",
    topic: "Peripheral Nerve",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with hoarseness after thyroid surgery. Laryngoscopy shows unilateral vocal cord paralysis. What nerve is most likely injured?",
    options: ["Recurrent laryngeal nerve", "Superior laryngeal nerve", "Glossopharyngeal nerve", "Hypoglossal nerve"],
    correctIndex: 0,
    explanation: "Recurrent laryngeal nerve injury causes ipsilateral vocal cord paralysis and hoarseness.",
    topic: "Peripheral Nerve",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with severe neuropathic pain following a nerve transection injury. What is the most appropriate surgical treatment?",
    options: ["Neuroma excision with relocation or burial", "Nerve grafting", "Tendon transfer", "Spinal cord stimulation"],
    correctIndex: 0,
    explanation: "Painful neuromas are treated with excision and relocation/burial to prevent recurrent neuroma formation.",
    topic: "Peripheral Nerve",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 65-year-old man with Parkinson’s disease has severe bradykinesia and rigidity despite optimal medical therapy. He also has significant dyskinesias. What is the most appropriate DBS target?",
    options: ["Globus pallidus internus (GPi)", "Subthalamic nucleus (STN)", "Ventral intermediate nucleus (VIM)", "Pedunculopontine nucleus"],
    correctIndex: 0,
    explanation: "GPi stimulation is preferred when dyskinesias are prominent, as it reduces involuntary movements more effectively than STN.",
    topic: "Functional",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During microvascular decompression for trigeminal neuralgia, the surgeon encounters dense arachnoid scarring and no clear vascular loop. What is the safest operative strategy?",
    options: ["Partial sensory rhizotomy", "Abort the procedure", "Place Teflon pledgets despite no vessel", "Convert to percutaneous balloon compression"],
    correctIndex: 0,
    explanation: "When no vascular loop is found, partial sensory rhizotomy is an accepted option for refractory trigeminal neuralgia.",
    topic: "Functional",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with essential tremor undergoes DBS. Postoperatively, they develop dysarthria and gait imbalance. What is the most likely cause?",
    options: ["Stimulation spread to cerebellar pathways", "Lead migration", "Infection", "Battery malfunction"],
    correctIndex: 0,
    explanation: "VIM stimulation can spread to cerebellar pathways causing dysarthria and ataxia; adjusting parameters usually resolves symptoms.",
    topic: "Functional",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 40-year-old man with refractory epilepsy is considered for vagus nerve stimulation. Why is the left vagus nerve used?",
    options: ["To avoid cardiac complications from right vagal stimulation", "It has more sensory fibres", "It is easier to expose surgically", "It provides stronger cortical modulation"],
    correctIndex: 0,
    explanation: "Right vagal stimulation risks bradyarrhythmias; therefore, the left vagus nerve is used for VNS.",
    topic: "Functional",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with dystonia undergoes GPi DBS. Postoperatively, improvement is slow. What is the most likely explanation?",
    options: ["GPi stimulation has delayed onset of benefit", "Lead misplacement", "Hardware malfunction", "Infection"],
    correctIndex: 0,
    explanation: "Unlike tremor or Parkinson’s symptoms, dystonia improves gradually over weeks to months after GPi DBS.",
    topic: "Functional",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During STN DBS, the microelectrode passes through a region with high-frequency discharge patterns. What structure is being recorded?",
    options: ["Subthalamic nucleus", "Zona incerta", "Red nucleus", "Internal capsule"],
    correctIndex: 0,
    explanation: "STN neurons fire at high frequency (20–40 Hz), aiding intraoperative localisation.",
    topic: "Functional",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with chronic neuropathic pain is considered for spinal cord stimulation. What is the most important predictor of success?",
    options: ["Positive response during trial stimulation", "Pain duration", "Patient age", "Pain distribution"],
    correctIndex: 0,
    explanation: "Trial stimulation is essential; only patients with clear benefit proceed to permanent implantation.",
    topic: "Functional",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with trigeminal neuralgia undergoes percutaneous balloon compression. Postoperatively, they develop masseter weakness. What is the underlying mechanism?",
    options: ["Injury to motor fibres of V3", "Injury to the facial nerve", "Compression of the Gasserian ganglion", "Damage to the pons"],
    correctIndex: 0,
    explanation: "Balloon compression affects both sensory and motor fibres of the trigeminal nerve, causing masseter weakness.",
    topic: "Functional",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with Parkinson’s disease undergoes STN DBS. Postoperatively, they develop hypophonia and worsening gait. What is the most likely cause?",
    options: ["Stimulation spread to internal capsule", "Lead migration", "Battery failure", "Infection"],
    correctIndex: 0,
    explanation: "Medial or posterior spread of STN stimulation can affect internal capsule fibres, causing speech and gait problems.",
    topic: "Functional",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with severe spasticity undergoes intrathecal baclofen pump insertion. Postoperatively, they develop acute weakness and respiratory depression. What is the most likely cause?",
    options: ["Baclofen overdose", "Catheter blockage", "Pump malfunction", "Spinal cord injury"],
    correctIndex: 0,
    explanation: "Overdose causes flaccid paralysis and respiratory depression; urgent dose reduction or CSF aspiration is required.",
    topic: "Functional",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 22-year-old woman presents with recurrent episodes of déjà vu followed by impaired awareness. MRI shows hippocampal sclerosis. Video EEG confirms left mesial temporal onset. What is the most appropriate surgical treatment?",
    options: ["Anterior temporal lobectomy with amygdalohippocampectomy", "Laser interstitial thermal therapy", "Vagus nerve stimulation", "Corpus callosotomy"],
    correctIndex: 0,
    explanation: "Anterior temporal lobectomy with amygdalohippocampectomy remains the gold standard for mesial temporal sclerosis with high seizure freedom rates.",
    topic: "Epilepsy",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with focal epilepsy undergoes video EEG telemetry. Seizures begin with right hand automatisms and head deviation to the left. What is the most likely seizure onset zone?",
    options: ["Right frontal lobe", "Left frontal lobe", "Right parietal lobe", "Left temporal lobe"],
    correctIndex: 0,
    explanation: "Contralateral head deviation and ipsilateral automatisms suggest frontal lobe onset on the right.",
    topic: "Epilepsy",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A 30-year-old man presents with sudden brief jerks of both arms in the morning. EEG shows generalized polyspike-and-wave discharges. What is the most likely diagnosis?",
    options: ["Juvenile myoclonic epilepsy", "Absence epilepsy", "Temporal lobe epilepsy", "Frontal lobe epilepsy"],
    correctIndex: 0,
    explanation: "Morning myoclonic jerks with generalized polyspike-and-wave discharges are characteristic of JME.",
    topic: "Epilepsy",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with drug-resistant epilepsy undergoes invasive monitoring. Depth electrodes show seizure onset in the left hippocampus. What factor most strongly predicts postoperative seizure freedom?",
    options: ["Concordance of MRI, EEG, and semiology", "Patient age", "Duration of epilepsy", "Side of surgery"],
    correctIndex: 0,
    explanation: "Concordance across modalities is the strongest predictor of successful surgical outcome.",
    topic: "Epilepsy",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with staring episodes lasting 10 seconds and rapid recovery. EEG shows 3 Hz spike-and-wave discharges. What is the diagnosis?",
    options: ["Absence epilepsy", "Temporal lobe epilepsy", "Frontal lobe epilepsy", "Psychogenic non-epileptic seizures"],
    correctIndex: 0,
    explanation: "Absence seizures show classic 3 Hz spike-and-wave EEG patterns.",
    topic: "Epilepsy",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with refractory epilepsy is considered for vagus nerve stimulation. Which nerve is used?",
    options: ["Left vagus nerve", "Right vagus nerve", "Either vagus nerve", "Glossopharyngeal nerve"],
    correctIndex: 0,
    explanation: "The left vagus nerve is used to avoid cardiac complications associated with right vagal stimulation.",
    topic: "Epilepsy",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "During resection of a cavernoma causing focal epilepsy, the surgeon identifies hemosiderin-stained cortex surrounding the lesion. What is the correct surgical principle?",
    options: ["Remove the cavernoma and hemosiderin rim", "Remove cavernoma only", "Perform extended lobectomy", "Leave hemosiderin rim intact"],
    correctIndex: 0,
    explanation: "The hemosiderin rim is epileptogenic and should be removed along with the cavernoma.",
    topic: "Epilepsy",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with visual hallucinations followed by contralateral eye deviation. EEG shows occipital onset. What is the most likely underlying pathology?",
    options: ["Occipital cortical dysplasia", "Temporal sclerosis", "Frontal tumour", "Parietal cavernoma"],
    correctIndex: 0,
    explanation: "Occipital seizures often begin with visual phenomena and may be caused by cortical dysplasia.",
    topic: "Epilepsy",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient with Lennox–Gastaut syndrome presents with drop attacks and tonic seizures. What is the most appropriate palliative surgical option?",
    options: ["Corpus callosotomy", "Temporal lobectomy", "Laser ablation", "Responsive neurostimulation"],
    correctIndex: 0,
    explanation: "Corpus callosotomy reduces drop attacks in generalized epilepsies such as Lennox–Gastaut.",
    topic: "Epilepsy",
    level: "FRCS",
    flaggedSet: 0
  },
  {
    stem: "A patient presents with gelastic seizures. MRI shows a mass near the hypothalamus. What is the diagnosis?",
    options: ["Hypothalamic hamartoma", "Pituitary adenoma", "Craniopharyngioma", "Pineal tumour"],
    correctIndex: 0,
    explanation: "Hypothalamic hamartomas classically cause gelastic seizures.",
    topic: "Epilepsy",
    level: "FRCS",
    flaggedSet: 0
  }

];