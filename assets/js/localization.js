const translations = {
    en: {
        "nav.home": "Home",
        "nav.services": "Services",
        "nav.howItWorks": "How it Works",
        "nav.impact": "Impact",
        "nav.about": "About Us",
        "nav.login": "Login",
        "nav.join": "Join LifeLink",
        "hero.badge": "Reliable Healthcare Network",
        "hero.title": "Connecting Lives in Every <span class='text-emergency'>Heartbeat</span>",
        "hero.subtitle": "LifeLink is the professional bridge connecting donors, patients, and hospitals. Our mission is to streamline blood donations and medical assistance.",
        "hero.cta.emergency": "Emergency Blood Request",
        "hero.cta.find_doctor": "Find a Doctor",
        "trust.label": "Trusted by Global Healthcare Leaders",
        "process.title": "How It Works",
        "process.step1.title": "1. Register",
        "process.step1.desc": "Create your profile as a donor, hospital, or patient to access our network.",
        "process.step2.title": "2. Request",
        "process.step2.desc": "Submit a request for blood or medical consultation through our portal.",
        "process.step3.title": "3. Match",
        "process.step3.desc": "Our AI-driven system finds the nearest compatible donor or specialist.",
        "process.step4.title": "4. Save",
        "process.step4.desc": "The connection is made, lives are saved, and records are updated securely.",
        "stats.donated": "Units Donated",
        "stats.saved": "Lives Saved",
        "stats.hospitals": "Partner Hospitals",
        "testimonials.title": "Patient & Donor Stories",
        "testimonials.subtitle": "Real experiences from our community members who have been part of the LifeLink mission.",
        "footer.tagline": "The professional bridge between medical resources and human needs. Available 24/7 for emergency support.",
        "footer.quick_links": "Quick Links",
        "footer.find_donors": "Find Donors",
        "footer.hospital_partners": "Hospital Partners",
        "footer.emergency": "Emergency",
        "footer.find_doctor": "Find a Doctor",
        "footer.support": "Support",
        "footer.help_center": "Help Center",
        "footer.terms_privacy": "Terms & Privacy",
        "footer.faq": "FAQ",
        "footer.contact_us": "Contact Us",
        "footer.address": "Dhaka, Bangladesh",
        "footer.rights": "© 2024 LifeLink BD. All rights reserved.",
        "footer.platform": "Platform",
        "footer.resources": "Resources",
        "footer.resources": "Resources",
        "footer.contact": "Contact",

        // Login Page
        "login.title": "Welcome Back, Hero!",
        "login.subtitle": "Every login brings hope. Connect with donors, patients, and doctors seamlessly.",
        "login.ai.title": "AI Matching System",
        "login.ai.desc": "Find donors in seconds, not hours.",
        "login.copyright": "© 2024 LifeLink BD. Saving Lives Together.",
        "login.header": "Login to Account",
        "login.instruction": "Please select your role and sign in",
        "login.role.patient": "Patient/Donor",
        "login.role.doctor": "Doctor",
        "login.role.hospital": "Hospital",
        "login.email": "Email Address",
        "login.password": "Password",
        "login.forgot": "Forgot password?",
        "login.btn": "Sign In",
        "login.or": "Or continue with",
        "login.google": "Google",
        "login.new_user": "New to LifeLink?",
        "login.create_account": "Create Account",

        // Onboarding Step 1
        "onboarding.step1.of": "Step 1 of 4",
        "onboarding.step1.role": "Choose Your Role",
        "onboarding.step1.title": "Join LifeLink",
        "onboarding.step1.subtitle": "Select your role to get started",
        "onboarding.role.donor.title": "Blood Donor",
        "onboarding.role.donor.desc": "Register as a blood donor and help save lives in your community. Get matched with recipients in need.",
        "onboarding.role.hospital.title": "Hospital / Medical Facility",
        "onboarding.role.hospital.desc": "Register your hospital or medical facility to request blood donations and manage patient needs.",
        "onboarding.role.patient.title": "Patient / Recipient",
        "onboarding.role.patient.desc": "Request blood on behalf of yourself or a family member in need of urgent medical assistance.",
        "onboarding.btn.back": "Back to Home",
        "onboarding.btn.continue": "Continue",
        "onboarding.already_have_account": "Already have an account?",
        "onboarding.sign_in": "Sign in",

        // Onboarding Step 2 - Donor
        "onboarding.step2.donor.title": "Donor Profile",
        "onboarding.step2.donor.header": "Donor Information",
        "onboarding.step2.donor.subtitle": "Tell us about yourself to help save lives",
        "onboarding.section.personal": "Personal Details",
        "onboarding.label.fullname": "Full Name *",
        "onboarding.placeholder.fullname": "Enter your full name",
        "onboarding.label.dob": "Date of Birth *",
        "onboarding.label.gender": "Gender *",
        "onboarding.option.select_gender": "Select gender",
        "onboarding.option.male": "Male",
        "onboarding.option.female": "Female",
        "onboarding.option.other": "Other",
        "onboarding.label.blood_group": "Blood Group *",
        "onboarding.option.select_blood": "Select blood group",
        "onboarding.section.contact": "Contact Information",
        "onboarding.label.email": "Email Address *",
        "onboarding.placeholder.email": "your@email.com",
        "onboarding.label.phone": "Phone Number *",
        "onboarding.placeholder.phone": "+880 1234-567890",
        "onboarding.section.location": "Location",
        "onboarding.label.division": "Division *",
        "onboarding.option.select_division": "Select division",
        "onboarding.label.district": "District *",
        "onboarding.placeholder.district": "Enter your district",
        "onboarding.label.address": "Full Address",
        "onboarding.placeholder.address": "House/Flat, Road, Area, Thana",
        "onboarding.section.medical": "Medical Eligibility",
        "onboarding.label.weight": "Weight (kg) *",
        "onboarding.placeholder.weight": "Minimum 45 kg required",
        "onboarding.info.weight": "Donors must weigh at least 45 kg",
        "onboarding.label.conditions_q": "Do you have any of the following conditions? *",
        "onboarding.condition.none": "None of the below",
        "onboarding.condition.hiv": "HIV/AIDS, Hepatitis B/C",
        "onboarding.condition.diabetes": "Diabetes, Heart disease",
        "onboarding.condition.cancer": "Cancer or undergoing chemotherapy",
        "onboarding.label.last_donation": "Last Blood Donation Date",
        "onboarding.info.last_donation": "Leave blank if first-time donor",
        "onboarding.btn.back_step": "Back",
        "onboarding.btn.continue_verify": "Continue to Verification",

        // Onboarding Step 2 - Hospital
        "onboarding.step2.hospital.title": "Hospital Profile",
        "onboarding.step2.hospital.header": "Hospital Information",
        "onboarding.step2.hospital.subtitle": "Register your medical facility",
        "onboarding.section.facility": "Facility Details",
        "onboarding.label.hospital_name": "Hospital Name *",
        "onboarding.placeholder.hospital_name": "Full legal name",
        "onboarding.label.reg_number": "Registration Number *",
        "onboarding.placeholder.reg_number": "Government registration",
        "onboarding.label.hospital_type": "Type *",
        "onboarding.option.select_type": "Select type",
        "onboarding.option.gov_hospital": "Government Hospital",
        "onboarding.option.priv_hospital": "Private Hospital",
        "onboarding.option.clinic": "Clinic",
        "onboarding.option.diagnostic": "Diagnostic Center",
        "onboarding.label.website": "Website",
        "onboarding.placeholder.website": "https://hospital.com",
        "onboarding.section.admin": "Administrator",
        "onboarding.label.admin_name": "Admin Name *",
        "onboarding.label.admin_position": "Position *",
        "onboarding.placeholder.admin_position": "e.g. Director, Manager",

        // Onboarding Step 2 - Patient
        "onboarding.step2.patient.title": "Patient Profile",
        "onboarding.step2.patient.header": "Patient Information",
        "onboarding.step2.patient.subtitle": "Tell us about the patient in need",
        "onboarding.section.patient_details": "Patient Details",
        "onboarding.label.age": "Age *",
        "onboarding.label.condition": "Condition/Diagnosis *",
        "onboarding.placeholder.condition": "Brief description of medical condition",
        "onboarding.section.emergency": "Emergency Contact",
        "onboarding.label.contact_name": "Contact Name *",
        "onboarding.label.relationship": "Relationship *",
        "onboarding.option.select": "Select",
        "onboarding.option.spouse": "Spouse",
        "onboarding.option.parent": "Parent",
        "onboarding.option.child": "Child",
        "onboarding.option.sibling": "Sibling",
        "onboarding.option.friend": "Friend",
        "onboarding.section.current_location": "Current Location",
        "onboarding.label.hospital_clinic": "Hospital/Clinic *",
        "onboarding.label.contact_phone": "Phone *",
        "onboarding.label.contact_email": "Email",

        // Onboarding Step 3 - Verification
        "onboarding.step3.title": "Verification & Agreement",
        "onboarding.step3.header": "Verification",
        "onboarding.step3.subtitle": "Complete your registration",
        "onboarding.section.upload": "Document Upload",
        "onboarding.info.upload": "Please upload a government-issued ID for verification",
        "onboarding.label.upload_box": "Click to upload or drag and drop",
        "onboarding.info.upload_types": "PNG, JPG or PDF (max. 5MB)",
        "onboarding.section.terms": "Terms & Conditions",
        "onboarding.label.terms_agree": "I have read and agree to the Terms of Service *",
        "onboarding.section.privacy": "Privacy Policy",
        "onboarding.label.privacy_agree": "I have read and agree to the Privacy Policy *",
        "onboarding.btn.complete": "Complete Registration",

        // Onboarding Step 4 - Complete
        "onboarding.step4.title": "Complete!",
        "onboarding.step4.header": "Welcome to LifeLink!",
        "onboarding.step4.subtitle": "Your registration is complete. You're now part of a life-saving community.",
        "onboarding.feature.matching.title": "Matching System",
        "onboarding.feature.matching.desc": "Our AI finds the best donor-recipient matches",
        "onboarding.feature.alerts.title": "Instant Alerts",
        "onboarding.feature.alerts.desc": "Get notified immediately when matched",
        "onboarding.feature.verified.title": "Verified Network",
        "onboarding.feature.verified.desc": "All participants are verified for safety",
        "onboarding.section.next_steps": "Next Steps",
        "onboarding.btn.go_dashboard": "Go to Dashboard",
        "onboarding.info.help": "Need help? Visit our Help Center"
    },
    bn: {
        "nav.home": "হোম",
        "nav.services": "সেবাসমূহ",
        "nav.howItWorks": "কিভাবে কাজ করে",
        "nav.impact": "প্রভাব",
        "nav.about": "আমাদের সম্পর্কে",
        "nav.login": "লগইন",
        "nav.join": "লাইফলিংকে যোগ দিন",
        "hero.badge": "নির্ভরযোগ্য স্বাস্থ্যসেবা নেটওয়ার্ক",
        "hero.title": "প্রতিটি <span class='text-emergency'>স্পন্দনে</span> জীবন সংযুক্ত করা",
        "hero.subtitle": "লাইফলিংক হল ডোনার, রোগী এবং হাসপাতালের মধ্যে সংযোগ স্থাপনকারী পেশাদার সেতু। আমাদের লক্ষ্য রক্তদান এবং চিকিৎসা সহায়তা সহজতর করা।",
        "hero.cta.emergency": "জরুরী রক্তের অনুরোধ",
        "hero.cta.find_doctor": "ডাক্তার খুঁজুন",
        "trust.label": "বিশ্বসেরা স্বাস্থ্যসেবা প্রতিষ্ঠান দ্বারা বিশ্বস্ত",
        "process.title": "কিভাবে কাজ করে",
        "process.step1.title": "১. নিবন্ধন করুন",
        "process.step1.desc": "আমাদের নেটওয়ার্ক অ্যাক্সেস করতে ডোনার, হাসপাতাল বা রোগী হিসেবে আপনার প্রোফাইল তৈরি করুন।",
        "process.step2.title": "২. অনুরোধ করুন",
        "process.step2.desc": "আমাদের পোর্টালের মাধ্যমে রক্ত বা চিকিৎসা পরামর্শের জন্য অনুরোধ জমা দিন।",
        "process.step3.title": "৩. ম্যাচিং",
        "process.step3.desc": "আমাদের এআই-চালিত সিস্টেম নিকটতম উপযুক্ত ডোনার বা বিশেষজ্ঞ খুঁজে বের করে।",
        "process.step4.title": "৪. জীবন বাঁচান",
        "process.step4.desc": "সংযোগ তৈরি হয়, জীবন রক্ষা পায় এবং রেকর্ড নিরাপদে আপডেট করা হয়।",
        "stats.donated": "ইউনিট রক্তদান",
        "stats.saved": "জীবন রক্ষা পেয়েছে",
        "stats.hospitals": "পার্টনার হাসপাতাল",
        "testimonials.title": "রোগী ও ডোনারদের গল্প",
        "testimonials.subtitle": "আমাদের কমিউনিটির সদস্যদের বাস্তব অভিজ্ঞতা যারা লাইফলিংক মিশনের অংশ হয়েছেন।",
        "footer.tagline": "চিকিৎসা সম্পদ এবং মানুষের প্রয়োজনের মধ্যে পেশাদার সেতু। জরুরী সহায়তার জন্য ২৪/৭ উপলব্ধ।",
        "footer.quick_links": "দ্রুত লিংক",
        "footer.find_donors": "ডোনার খুঁজুন",
        "footer.hospital_partners": "হাসপাতাল পার্টনার",
        "footer.emergency": "জরুরী সেবা",
        "footer.find_doctor": "ডাক্তার খুঁজুন",
        "footer.support": "সাপোর্ট",
        "footer.help_center": "সাহায্য কেন্দ্র",
        "footer.terms_privacy": "শর্তাবলী ও গোপনীয়তা",
        "footer.faq": "জিজ্ঞাসিত প্রশ্ন (FAQ)",
        "footer.contact_us": "যোগাযোগ করুন",
        "footer.address": "ঢাকা, বাংলাদেশ",
        "footer.rights": "© ২০২৪ লাইফলিংক বিডি। সকল অধিকার সংরক্ষিত।",
        "footer.platform": "প্ল্যাটফর্ম",
        "footer.resources": "রিসোর্স",
        "footer.resources": "রিসোর্স",
        "footer.contact": "যোগাযোগ",

        // Login Page - BN
        "login.title": "স্বাগতম, হিরো!",
        "login.subtitle": "প্রতিটি লগইন আশার আলো দেখায়। ডোনার, রোগী এবং ডাক্তারদের সাথে সহজে যুক্ত হন।",
        "login.ai.title": "AI ম্যাচিং সিস্টেম",
        "login.ai.desc": "ঘন্টার পর ঘন্টা নয়, সেকেন্ডেই ডোনার খুঁজুন।",
        "login.copyright": "© ২০২৪ লাইফলিংক বিডি। জীবন বাঁচাচ্ছি একসাথে।",
        "login.header": "অ্যাকাউন্টে লগইন করুন",
        "login.instruction": "আপনার রোল নির্বাচন করুন এবং সাইন ইন করুন",
        "login.role.patient": "রোগী/ডোনার",
        "login.role.doctor": "ডাক্তার",
        "login.role.hospital": "হাসপাতাল",
        "login.email": "ইমেইল অ্যাড্রেস",
        "login.password": "পাসওয়ার্ড",
        "login.forgot": "পাসওয়ার্ড ভুলে গেছেন?",
        "login.btn": "সাইন ইন",
        "login.or": "অথবা কন্টিনিউ করুন",
        "login.google": "গুগল",
        "login.new_user": "লাইফলিংকে নতুন?",
        "login.create_account": "অ্যাকাউন্ট তৈরি করুন",

        // Onboarding Step 1 - BN
        "onboarding.step1.of": "ধাপ ১ (মোট ৪টি)",
        "onboarding.step1.role": "আপনার রোল নির্বাচন করুন",
        "onboarding.step1.title": "লাইফলিংকে যোগ দিন",
        "onboarding.step1.subtitle": "শুরু করতে আপনার রোল নির্বাচন করুন",
        "onboarding.role.donor.title": "রক্তদাতা",
        "onboarding.role.donor.desc": "রক্তদাতা হিসাবে নিবন্ধন করুন এবং আপনার সম্প্রদায়ের জীবন বাঁচাতে সহায়তা করুন। প্রয়োজনে রোগীদের সাথে সংযোগ স্থাপন করুন।",
        "onboarding.role.hospital.title": "হাসপাতাল / চিকিৎসা কেন্দ্র",
        "onboarding.role.hospital.desc": "রক্তের জন্য আবেদন করতে এবং রোগীদের রক্তদান সম্পন্ন করতে আপনার হাসপাতাল বা চিকিৎসা কেন্দ্র নিবন্ধন করুন।",
        "onboarding.role.patient.title": "রোগী / গ্রহীতা",
        "onboarding.role.patient.desc": "আপনার নিজের বা পরিবারের কোনো সদস্যের জন্য জরুরী রক্তের অনুরোধ করতে নিবন্ধন করুন।",
        "onboarding.btn.back": "হোমে ফিরে যান",
        "onboarding.btn.continue": "চালিয়ে যান",
        "onboarding.already_have_account": "ইতিমধ্যে অ্যাকাউন্ট আছে?",
        "onboarding.sign_in": "সাইন ইন করুন",

        // Onboarding Step 2 - Donor - BN
        "onboarding.step2.donor.title": "রক্তদাতার প্রোফাইল",
        "onboarding.step2.donor.header": "রক্তদাতার তথ্য",
        "onboarding.step2.donor.subtitle": "জীবন বাঁচাতে সাহায্য করতে আপনার সম্পর্কে আমাদের বলুন",
        "onboarding.section.personal": "ব্যক্তিগত বিবরণ",
        "onboarding.label.fullname": "পুরো নাম *",
        "onboarding.placeholder.fullname": "আপনার পুরো নাম লিখুন",
        "onboarding.label.dob": "জন্ম তারিখ *",
        "onboarding.label.gender": "লিঙ্গ *",
        "onboarding.option.select_gender": "লিঙ্গ নির্বাচন করুন",
        "onboarding.option.male": "পুরুষ",
        "onboarding.option.female": "মহিলা",
        "onboarding.option.other": "অন্যান্য",
        "onboarding.label.blood_group": "রক্তের গ্রুপ *",
        "onboarding.option.select_blood": "রক্তের গ্রুপ নির্বাচন করুন",
        "onboarding.section.contact": "যোগাযোগের তথ্য",
        "onboarding.label.email": "ইমেইল ঠিকানা *",
        "onboarding.placeholder.email": "your@email.com",
        "onboarding.label.phone": "ফোন নম্বর *",
        "onboarding.placeholder.phone": "+৮৮০ ১২৩৪-৫৬৭৮৯০",
        "onboarding.section.location": "অবস্থান",
        "onboarding.label.division": "বিভাগ *",
        "onboarding.option.select_division": "বিভাগ নির্বাচন করুন",
        "onboarding.label.district": "জেলা *",
        "onboarding.placeholder.district": "আপনার জেলা লিখুন",
        "onboarding.label.address": "পূর্ণ ঠিকানা",
        "onboarding.placeholder.address": "বাসা/ফ্ল্যাট, রাস্তা, এলাকা, থানা",
        "onboarding.section.medical": "চিকিৎসা উপযুক্ততা",
        "onboarding.label.weight": "ওজন (কেজি) *",
        "onboarding.placeholder.weight": "নূন্যতম ৪৫ কেজি প্রয়োজন",
        "onboarding.info.weight": "রক্তদাতার ওজন কমপক্ষে ৪৫ কেজি হতে হবে",
        "onboarding.label.conditions_q": "আপনার কি নিচের কোনো অবস্থা আছে? *",
        "onboarding.condition.none": "উপরের কোনটিই নয়",
        "onboarding.condition.hiv": "এইচআইভি/এইডস, হেপাটাইটিস বি/সি",
        "onboarding.condition.diabetes": "ডায়াবেটিস, হৃদরোগ",
        "onboarding.condition.cancer": "ক্যান্সার বা কেমোথেরাপি চলছে",
        "onboarding.label.last_donation": "সর্বশেষ রক্তদানের তারিখ",
        "onboarding.info.last_donation": "প্রথমবার রক্তদান করলে ফাঁকা রাখুন",
        "onboarding.btn.back_step": "পিছনে",
        "onboarding.btn.continue_verify": "যাচাইকরণে এগিয়ে যান",

        // Onboarding Step 2 - Hospital - BN
        "onboarding.step2.hospital.title": "হাসপাতালের প্রোফাইল",
        "onboarding.step2.hospital.header": "হাসপাতালের তথ্য",
        "onboarding.step2.hospital.subtitle": "আপনার চিকিৎসা কেন্দ্রটি নিবন্ধন করুন",
        "onboarding.section.facility": "প্রতিষ্ঠানের বিবরণ",
        "onboarding.label.hospital_name": "হাসপাতালের নাম *",
        "onboarding.placeholder.hospital_name": "পুরো আইনি নাম",
        "onboarding.label.reg_number": "নিবন্ধন নম্বর *",
        "onboarding.placeholder.reg_number": "সরকারি নিবন্ধন নম্বর",
        "onboarding.label.hospital_type": "ধরন *",
        "onboarding.option.select_type": "ধরন নির্বাচন করুন",
        "onboarding.option.gov_hospital": "সরকারি হাসপাতাল",
        "onboarding.option.priv_hospital": "বেসরকারি হাসপাতাল",
        "onboarding.option.clinic": "ক্লিনিক",
        "onboarding.option.diagnostic": "ডায়াগনস্টিক সেন্টার",
        "onboarding.label.website": "ওয়েবসাইট",
        "onboarding.placeholder.website": "https://hospital.com",
        "onboarding.section.admin": "প্রশাসক",
        "onboarding.label.admin_name": "প্রশাসকের নাম *",
        "onboarding.label.admin_position": "পদবী *",
        "onboarding.placeholder.admin_position": "যেমন: পরিচালক, ব্যবস্থাপক",

        // Onboarding Step 2 - Patient - BN
        "onboarding.step2.patient.title": "রোগীর প্রোফাইল",
        "onboarding.step2.patient.header": "রোগীর তথ্য",
        "onboarding.step2.patient.subtitle": "প্রয়োজনীয় রোগীর সম্পর্কে আমাদের বলুন",
        "onboarding.section.patient_details": "রোগীর বিবরণ",
        "onboarding.label.age": "বয়স *",
        "onboarding.label.condition": "অবস্থা/রোগ নির্ণয় *",
        "onboarding.placeholder.condition": "চিকিৎসা অবস্থার সংক্ষিপ্ত বিবরণ",
        "onboarding.section.emergency": "জরুরী যোগাযোগ",
        "onboarding.label.contact_name": "যোগাযোগের নাম *",
        "onboarding.label.relationship": "সম্পর্ক *",
        "onboarding.option.select": "নির্বাচন করুন",
        "onboarding.option.spouse": "স্বামী/স্ত্রী",
        "onboarding.option.parent": "বাবা/মা",
        "onboarding.option.child": "সন্তান",
        "onboarding.option.sibling": "ভাই/বোন",
        "onboarding.option.friend": "বন্ধু",
        "onboarding.section.current_location": "বর্তমান অবস্থান",
        "onboarding.label.hospital_clinic": "হাসপাতাল/ক্লিনিক *",
        "onboarding.label.contact_phone": "ফোন *",
        "onboarding.label.contact_email": "ইমেইল",

        // Onboarding Step 3 - Verification - BN
        "onboarding.step3.title": "যাচাইকরণ ও চুক্তি",
        "onboarding.step3.header": "যাচাইকরণ",
        "onboarding.step3.subtitle": "আপনার নিবন্ধন সম্পন্ন করুন",
        "onboarding.section.upload": "নথি আপলোড",
        "onboarding.info.upload": "যাচাইকরণের জন্য অনুগ্রহ করে একটি সরকারি পরিচয়পত্র আপলোড করুন",
        "onboarding.label.upload_box": "আপলোড করতে ক্লিক করুন বা টেনে আনুন",
        "onboarding.info.upload_types": "PNG, JPG বা PDF (সদর্বোচ্চ ৫ এমবি)",
        "onboarding.section.terms": "শর্তাবলী",
        "onboarding.label.terms_agree": "আমি পরিষেবা শর্তাবলী পড়েছি এবং একমত *",
        "onboarding.section.privacy": "গোপনীয়তা নীতি",
        "onboarding.label.privacy_agree": "আমি গোপনীয়তা নীতি পড়েছি এবং একমত *",
        "onboarding.btn.complete": "নিবন্ধন সম্পন্ন করুন",

        // Onboarding Step 4 - Complete - BN
        "onboarding.step4.title": "সম্পন্ন!",
        "onboarding.step4.header": "লাইফলিঙ্ক-এ স্বাগতম!",
        "onboarding.step4.subtitle": "আপনার নিবন্ধন সম্পন্ন হয়েছে। আপনি এখন একটি জীবন রক্ষাকারী সম্প্রদায়ের অংশ।",
        "onboarding.feature.matching.title": "ম্যাচিং সিস্টেম",
        "onboarding.feature.matching.desc": "আমাদের এআই সেরা দাতা-গ্রহীতা ম্যাচ খুঁজে বের করে",
        "onboarding.feature.alerts.title": "তাৎক্ষণিক সতর্কতা",
        "onboarding.feature.alerts.desc": "ম্যাচ হলে সাথে সাথে বিজ্ঞপ্তি পান",
        "onboarding.feature.verified.title": "যাচাইকৃত নেটওয়ার্ক",
        "onboarding.feature.verified.desc": "নিরাপত্তার জন্য সকল অংশগ্রহণকারীকে যাচাই করা হয়",
        "onboarding.section.next_steps": "পরবর্তী পদক্ষেপ",
        "onboarding.btn.go_dashboard": "ড্যাশবোর্ডে যান",
        "onboarding.info.help": "সাহায্য প্রয়োজন? আমাদের সহায়তা কেন্দ্রে যান"
    }
};

class LocalizationManager {
    constructor() {
        this.currentLang = localStorage.getItem('lifelink_lang') || 'en';
        this.init();
    }

    init() {
        this.updateDOM();
        this.setupEventListeners();
    }

    setLanguage(lang) {
        if (!translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('lifelink_lang', lang);
        this.updateDOM();

        // Update document dir and lang attributes if needed
        document.documentElement.lang = lang;
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'bn' : 'en';
        this.setLanguage(newLang);
        return newLang;
    }

    updateDOM() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[this.currentLang][key]) {
                // Check if element has child nodes (to preserve icons etc)
                // For simple text replacement
                if (el.children.length === 0) {
                    el.textContent = translations[this.currentLang][key];
                } else {
                    el.innerHTML = translations[this.currentLang][key];
                }
            }
        });

        // Update Toggle Button Text
        const toggleBtn = document.getElementById('lang-toggle-text');
        if (toggleBtn) {
            toggleBtn.textContent = this.currentLang === 'en' ? 'BN' : 'EN';
        }
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // Auto-detect location for first time visitors (Mock logic)
            if (!localStorage.getItem('lifelink_lang')) {
                // In a real app, check navigator.language or IP
                // For this demo, enable BN by default if requested, otherwise EN
            }
        });
    }
}

window.localization = new LocalizationManager();

// Global function for button
window.toggleLanguage = () => {
    window.localization.toggleLanguage();
};
