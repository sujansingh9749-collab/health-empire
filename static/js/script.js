// Global States
let currentGender = 'male';
let weightUnit = 'kg';
let heightUnit = 'cm';
let currentLang = 'en';

// Language Dictionary
const translations = {
    en: {
        heroTitle: "Smart BMI & Health Calculator",
        heroSubtitle: "Track your BMI, calories and wellness instantly with AI insights.",
        brandNameText: "PureLife Health AI",
        lblAge: "Your Age (Years)",
        lblWeight: "Weight",
        lblHeight: "Height",
        btnCalcText: "Calculate Now",
        resCardBmiLbl: "Your BMI",
        resCardCalLbl: "Daily Calories",
        aiTipHeading: "✨ AI Wellness Tip",
        thCat: "Category",
        thRange: "BMI Range",
        tdUnder: "Underweight",
        tdNorm: "Normal Weight",
        tdOver: "Overweight",
        tdObese: "Obesity",
        lblEmailReport: "Get Free Weekly Health Report"
    },
    bn: {
        heroTitle: "স্মার্ট বিএমআই ও হেলথ ক্যালকুলেটর",
        heroSubtitle: "এআই বুদ্ধিমত্তার মাধ্যমে আপনার বিএমআই, ক্যালোরি এবং স্বাস্থ্য ট্র্যাক করুন।",
        brandNameText: "পিউরলাইফ হেলথ এআই",
        lblAge: "আপনার বয়স (বছর)",
        lblWeight: "ওজন",
        lblHeight: "উচ্চতা",
        btnCalcText: "হিসাব করুন",
        resCardBmiLbl: "আপনার বিএমআই",
        resCardCalLbl: "দৈনিক ক্যালোরি",
        aiTipHeading: "✨ এআই স্বাস্থ্য টিপস",
        thCat: "বিভাগ",
        thRange: "বিএমআই রেঞ্জ",
        tdUnder: "ওজন কম (Underweight)",
        tdNorm: "স্বাভাবিক ওজন (Normal)",
        tdOver: "অতিরিক্ত ওজন (Overweight)",
        tdObese: "স্থূলতা (Obesity)",
        lblEmailReport: "বিনামূল্যে সাপ্তাহিক স্বাস্থ্য রিপোর্ট পান"
    }
};

// ১. ক্লাস টগলিংয়ের মাধ্যমে অ্যাকোর্ডিয়ন ওপেন/ক্লোজ করার ফুল-প্রুফ মেথড
function toggleAccordion(btn) {
    if (!btn) return;
    
    // বাটনের ঠিক পরের এলিমেন্ট (কন্টেন্ট) খুঁজে বের করা
    const content = btn.nextElementSibling;
    
    if (content) {
        // 'is-open' ক্লাসটি থাকলে রিমুভ করবে, না থাকলে অ্যাড করবে
        content.classList.toggle('is-open');
        btn.classList.toggle('active');
    }
}

// পেজ লোড হওয়ার সাথে সাথে ইভেন্ট লিসেনার প্রপারলি বাইন্ড করা
document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(acc => {
        // আগের কোনো অন-ক্লিক লিসেনার থাকলে তা ক্লিন করার জন্য এলিমেন্ট রি-রেন্ডার করা
        const newAcc = acc.cloneNode(true);
        acc.parentNode.replaceChild(newAcc, acc);
        
        // নতুন ফ্রেশ ক্লিক/টাচ লিসেনার যোগ করা
        newAcc.addEventListener('click', function(e) {
            e.preventDefault();
            toggleAccordion(this);
        });
    });
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerText = document.body.classList.contains('dark-mode') ? '☀️ Light' : '🌙 Dark';
}

function changeLanguage(lang) {
    currentLang = lang;
    const dict = translations[lang] || translations['en'];
    for (let id in dict) {
        const el = document.getElementById(id);
        if (el) {
            if (el.tagName === 'INPUT') el.placeholder = dict[id];
            else el.innerText = dict[id];
        }
    }
    calculate();
}

function setGender(g) {
    currentGender = g;
    const mBtn = document.getElementById('mBtn');
    const fBtn = document.getElementById('fBtn');
    if (mBtn) mBtn.classList.toggle('active', g === 'male');
    if (fBtn) fBtn.classList.toggle('active', g === 'female');
    calculate();
}

// ওজন ইউনিট (KG/LBS) টগল
function setWUnit(unit) {
    weightUnit = unit;
    const kgBtn = document.getElementById('kgBtn');
    const lbsBtn = document.getElementById('lbsBtn');
    if (kgBtn) kgBtn.classList.toggle('active', unit === 'kg');
    if (lbsBtn) lbsBtn.classList.toggle('active', unit === 'lbs');
    calculate();
}

// উচ্চতা ইউনিট (CM - FT/IN) টগল ও ইনপুট বক্স শো/হাইড লজিক
function setHUnit(unit) {
    heightUnit = unit;
    const cmBtn = document.getElementById('cmBtn');
    const ftBtn = document.getElementById('ftBtn');
    if (cmBtn) cmBtn.classList.toggle('active', unit === 'cm');
    if (ftBtn) ftBtn.classList.toggle('active', unit === 'ft');
    
    const cmInputDiv = document.getElementById('cmInputDiv');
    const ftInputDiv = document.getElementById('ftInputDiv');

    if (unit === 'cm') {
        if (cmInputDiv) cmInputDiv.style.display = 'block';
        if (ftInputDiv) ftInputDiv.style.display = 'none';
    } else {
        if (cmInputDiv) cmInputDiv.style.display = 'none';
        if (ftInputDiv) ftInputDiv.style.display = 'flex';
    }
    calculate();
}

function triggerErrorEffect(element) {
    element.style.borderColor = '#ef4444';
    element.classList.remove('shake-error');
    void element.offsetWidth; 
    element.classList.add('shake-error');
}

function clearErrorEffect(element) {
    element.style.borderColor = '';
    element.classList.remove('shake-error');
}

// মূল BMI এবং চাইল্ড/অ্যাডাল্ট সেফটি ক্যালকুলেশন লজিক
function calculate() {
    const ageInput = document.getElementById('age');
    const weightInput = document.getElementById('weight');
    const cmInput = document.getElementById('heightCM');
    
    const ftInput = document.querySelector('#ftInputDiv input:first-child') || document.getElementById('heightFT');
    const inInput = document.querySelector('#ftInputDiv input:last-child') || document.getElementById('heightIN');

    if (!ageInput || !weightInput) return;

    let age = parseInt(ageInput.value);
    let rawWeight = parseFloat(weightInput.value);
    let height = 0;
    let hasError = false;
    
    if (!age || age < 2 || age > 120) { triggerErrorEffect(ageInput); hasError = true; } 
    else { clearErrorEffect(ageInput); }

    if (!rawWeight || rawWeight < 5 || rawWeight > 500 || (age < 10 && rawWeight > 60)) { 
        triggerErrorEffect(weightInput); 
        hasError = true; 
    } else { 
        clearErrorEffect(weightInput); 
    }

    if (heightUnit === 'cm') {
        if (cmInput) {
            let cmVal = parseFloat(cmInput.value);
            if (!cmVal || cmVal < 30 || cmVal > 300) { triggerErrorEffect(cmInput); hasError = true; } 
            else { clearErrorEffect(cmInput); height = cmVal; }
        }
    } else {
        if (ftInput && inInput) {
            let ftVal = parseFloat(ftInput.value) || 0;
            let inVal = parseFloat(inInput.value) || 0;
            
            if (ftVal < 1 || ftVal > 8 || inVal < 0 || inVal > 11.9 || (age < 8 && ftVal > 4)) {
                triggerErrorEffect(ftInput); triggerErrorEffect(inInput); hasError = true;
            } else {
                clearErrorEffect(ftInput); clearErrorEffect(inInput);
                height = ((ftVal * 12) + inVal) * 2.54;
            }
        }
    }

    if (hasError) return;

    let weight = weightUnit === 'lbs' ? rawWeight * 0.453592 : rawWeight;
    const bmi = weight / ((height / 100) ** 2);
    
    const bmiTextEl = document.getElementById('bmiText');
    if (bmiTextEl) bmiTextEl.innerText = bmi.toFixed(1);

    let finalTdee = 0;
    if (age <= 14) {
        if (age >= 2 && age <= 3) {
            finalTdee = (currentGender === 'male') ? (61.0 * weight - 33.7) * 1.3 : (58.3 * weight - 31.1) * 1.3;
        } else if (age > 3 && age <= 10) {
            finalTdee = (currentGender === 'male') ? (22.7 * weight + 495) * 1.4 : (22.5 * weight + 499) * 1.4;
        } else {
            finalTdee = (currentGender === 'male') ? (17.5 * weight + 651) * 1.5 : (12.2 * weight + 746) * 1.5;
        }
    } else {
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        bmr = currentGender === 'male' ? bmr + 5 : bmr - 161;
        finalTdee = bmr * 1.2;
    }
    
    const calTextEl = document.getElementById('calText');
    if (calTextEl) calTextEl.innerText = Math.round(finalTdee);

    const pointer = document.getElementById('bmiPointer');
    if (pointer) {
        let pos = ((bmi - 15) / (40 - 15)) * 100;
        pos = Math.max(0, Math.min(100, pos));
        pointer.style.left = pos + '%';
    }
}
