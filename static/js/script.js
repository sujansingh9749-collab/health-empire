    let gender = 'male', wUnit = 'kg', hUnit = 'cm';

    function toggleAccordion(button) {
        if (window.innerWidth > 700) return;
        const item = button.parentElement;
        const content = item.querySelector('.accordion-content');
        const isOpen = item.classList.contains('active');
        
        document.querySelectorAll('.accordion-item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('.accordion-content').style.maxHeight = null;
        });

        if (!isOpen) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 700) {
            document.querySelectorAll('.accordion-content').forEach(el => el.style.maxHeight = 'none');
        } else {
            document.querySelectorAll('.accordion-item').forEach(el => {
                const content = el.querySelector('.accordion-content');
                if(el.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        }
    });

    function setGender(g) { gender = g; document.getElementById('mBtn').classList.toggle('active', g === 'male'); document.getElementById('fBtn').classList.toggle('active', g === 'female'); calculate(); }
    function setWUnit(u) { wUnit = u; document.getElementById('kgBtn').classList.toggle('active', u === 'kg'); document.getElementById('lbsBtn').classList.toggle('active', u === 'lbs'); calculate(); }
    function setHUnit(u) { hUnit = u; document.getElementById('cmBtn').classList.toggle('active', u === 'cm'); document.getElementById('ftBtn').classList.toggle('active', u === 'ft'); document.getElementById('cmInputDiv').style.display = (u === 'cm') ? 'block' : 'none'; document.getElementById('ftInputDiv').style.display = (u === 'ft') ? 'flex' : 'none'; calculate(); }

    function calculate() {
        let ageInput = document.getElementById('age');
        let weightInput = document.getElementById('weight');
        let cmInput = document.getElementById('heightCM');
        let ftInput = document.getElementById('heightFT');
        let inInput = document.getElementById('heightIN');

        let age = parseFloat(ageInput.value);
        let weightVal = parseFloat(weightInput.value);
        let hasError = false;

        if (isNaN(age) || age < 1 || age > 120) { showValidationError(ageInput); hasError = true; } else { clearValidationError(ageInput); }
        if (isNaN(weightVal) || weightVal < 10 || weightVal > 300) { showValidationError(weightInput); hasError = true; } else { clearValidationError(weightInput); }

        let hCm = 0;
        if (hUnit === 'cm') {
            let cmVal = parseFloat(cmInput.value);
            if (isNaN(cmVal) || cmVal < 50 || cmVal > 250) { showValidationError(cmInput); hasError = true; } else { clearValidationError(cmInput); }
            hCm = cmVal;
        } else {
            let ftVal = parseFloat(ftInput.value);
            let inVal = parseFloat(inInput.value);
            if (isNaN(ftVal) || ftVal < 1 || ftVal > 8) { showValidationError(ftInput); hasError = true; } else { clearValidationError(ftInput); }
            if (isNaN(inVal) || inVal < 0 || inVal > 11) { showValidationError(inInput); hasError = true; } else { clearValidationError(inInput); }
            hCm = (ftVal * 30.48) + (inVal * 2.54);
        }

        if (hasError) return;

        let wKg = (wUnit === 'lbs') ? weightVal / 2.20462 : weightVal;
        if (!wKg || !hCm) return;

        let bmi = wKg / ((hCm / 100) * (hCm / 100));
        document.getElementById('bmiText').innerText = bmi.toFixed(1);

        let pos = ((bmi - 14) / (42 - 14)) * 100;
        document.getElementById('bmiPointer').style.left = Math.max(5, Math.min(95, pos)) + "%";

        const currentLang = localStorage.getItem('selectedLang') || 'en';
        let tip = "";
        
        if (currentLang === 'bn') {
            tip = bmi < 18.5 ? "কম ওজন: পুষ্টির দিকে নজর দিন।" : bmi < 25 ? "চমৎকার! আপনার স্বাস্থ্যকর জীবনধারা বজায় রাখুন।" : bmi < 30 ? "অতিরিক্ত ওজন: নিয়মিত ব্যায়াম করার পরামর্শ দেওয়া হচ্ছে।" : "স্থূলতা: একজন স্বাস্থ্য বিশেষজ্ঞের সাথে পরামর্শ করুন।";
        } else if (currentLang === 'es') {
            tip = bmi < 18.5 ? "Bajo peso: Enfoque en la nutrición." : bmi < 25 ? "¡Excelente! Sigue manteniendo tu estilo de vida saludable." : bmi < 30 ? "Sobrepeso: Se recomienda ejercicio regular." : "Obesidad: Consulte a un profesional de la salud.";
        } else if (currentLang === 'hi') {
            tip = bmi < 18.5 ? "कम वजन: पोषण पर ध्यान दें।" : bmi < 25 ? "उत्कृष्ट! अपनी स्वस्थ जीवन शैली बनाए रखें।" : bmi < 30 ? "अधिक वजन: नियमित व्यायाम की सलाह दी जाती है।" : "मोटापा: स्वास्थ्य पेशेवर से परामर्श करें।";
        } else if (currentLang === 'ar') {
            tip = bmi < 18.5 ? "نقص الوزن: ركز على التغذية." : bmi < 25 ? "ممتاز! حافظ على نمط حياتك الصحي." : bmi < 30 ? "زيادة الوزن: يوصى بممارسة التمارين بانتظام." : "السمنة: استشر طبيباً مختصاً.";
        } else if (currentLang === 'de') {
            tip = bmi < 18.5 ? "Untergewicht: Fokus auf Ernährung." : bmi < 25 ? "Ausgezeichnet! Behalten Sie Ihren gesunden Lebensstil bei." : bmi < 30 ? "Übergewicht: Regelmäßige Bewegung wird empfohlen." : "Adipositas: Konsultieren Sie einen Arzt.";
        } else if (currentLang === 'fr') {
            tip = bmi < 18.5 ? "Insuffisance pondérale: Focus sur la nutrition." : bmi < 25 ? "Excellent! Continuez à maintenir votre mode de vie sain." : bmi < 30 ? "Surpoids: Exercice régulier recommandé." : "Obésité: Consultez un professionnel de la santé.";
        } else if (currentLang === 'pt') {
            tip = bmi < 18.5 ? "Abaixo do peso: Foque na nutrição." : bmi < 25 ? "Excelente! Continue mantendo seu estilo de vida saudável." : bmi < 30 ? "Sobrepeso: Exercício regular é recomendado." : "Obesidade: Consulte um profissional de saúde.";
        } else if (currentLang === 'tr') {
            tip = bmi < 18.5 ? "Düşük Kilolu: Beslenmeye odaklanın." : bmi < 25 ? "Harika! Sağlıklı yaşam tarzınızı korumaya devam edin." : bmi < 30 ? "Fazla Kilolu: Düzenli egzersiz önerilir." : "Obezite: Bir sağlık uzmanına danışın.";
        } else if (currentLang === 'ru') {
            tip = bmi < 18.5 ? "Дефицит веса: Обратите внимание на питание." : bmi < 25 ? "Отлично! Продолжайте вести здоровый образ жизни." : bmi < 30 ? "Избыточный вес: Рекомендуются регулярные физические нагрузки." : "Ожирение: Проконсультируйтесь со специалистом.";
        } else {
            tip = bmi < 18.5 ? "Underweight: Focus on nutrition." : bmi < 25 ? "Excellent! Keep maintaining your healthy lifestyle." : bmi < 30 ? "Overweight: Regular exercise is recommended." : "Obesity: Consult a health professional.";
        }
        document.getElementById('aiTip').innerText = tip;

        let bmr = (gender === 'male') ? (10 * wKg) + (6.25 * hCm) - (5 * age) + 5 : (10 * wKg) + (6.25 * hCm) - (5 * age) - 161;
        document.getElementById('calText').innerText = Math.round(bmr * 1.2);
    }

    function showValidationError(inputEl) {
        inputEl.style.borderColor = "#ef4444";
        inputEl.style.background = "#fef2f2";
        inputEl.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.15)";
        inputEl.style.animation = "none";
        inputEl.offsetHeight; 
        inputEl.style.animation = "shakeInput 0.2s ease-in-out 2";
    }

    function clearValidationError(inputEl) {
        inputEl.style.borderColor = document.body.classList.contains('dark-mode') ? "#475569" : "#e2e8f0";
        inputEl.style.background = document.body.classList.contains('dark-mode') ? "#334155" : "#f8fafc";
        inputEl.style.boxShadow = "none";
        inputEl.style.animation = "none";
    }

    // 🌐 গ্লোবাল ভাষার কমপ্লিট ডিকশনারি (বাকি সব ভাষার অনুবাদ যোগ করা হয়েছে)
    const dictionary = {
        en: {
            logo: "PureLife Health AI", home: "Home", blog: "Blog", privacy: "Privacy Policy",
            heroT: "Smart BMI & Health Calculator", heroS: "Track your BMI, calories and wellness instantly with AI insights.",
            brand: "PureLife Health AI", age: "Your Age (Years)", weight: "Weight", height: "Height",
            calc: "Calculate Now", rcBmi: "Your BMI", rcCal: "Daily Calories", tipH: "✨ AI Wellness Tip",
            thCat: "Category", thRange: "BMI Range", tdUnder: "Underweight", tdNorm: "Normal Weight", tdOver: "Overweight", tdObese: "Obesity",
            emailLbl: "Get Free Weekly Health Report", btnPdf: "Get Free PDF Report →",
            c1H: "Introduction: Health & Modern Life", c1P1: "In today's fast-paced world, physical activity has drastically decreased...", c1P2: "To lead a long life, understanding metrics is essential...",
            c2H: "What Exactly is BMI?", c2P1: "Body Mass Index is an internationally recognized metric...", c2P2: "While BMI does not measure fat directly...",
            c3H: "Why Tracking is Crucial", c3P1: "Many believe mirror appearance equals health...", c3L1: "Identifying Latent Risks", c3L2: "Preventing Malpractice", c3L3: "Benchmarks",
            c4H: "BMI Classification Chart", c4P1: "Below is the official system utilized by health authorities...",
            thR: "BMI Range", thC: "Classification", thRi: "Risk Level", trU: "Underweight", trN: "Normal", trO: "Overweight", trOb: "Obesity",
            trRU: "High Risk", trRN: "Minimal", trRO: "Increased Risk", trROb: "Severe Risk",
            asianT: "⚠️ Asian Phenotypes Node:", asianD: "WHO notes South Asian descent triggers risks lower...",
            c5H: "BMR & TDEE Dynamics", c5P1: "BMR represents minimal energy threshold...", c5P2: "TDEE is derived from BMR and activity...",
            liDef: "Caloric Deficit (Loss)", liSur: "Caloric Surplus (Gain)",
            cookie: "We use cookies to improve experience...", cookieBtn: "Accept", footerText: "© 2026 PureLife Health AI. All rights reserved."
        },
        bn: {
            logo: "পিউরলাইফ হেলথ এআই", home: "হোম", blog: "ব্লগ", privacy: "গোপনীয়তা নীতি",
            heroT: "স্মার্ট বিএমআই এবং হেলথ ক্যালকুলেটর", heroS: "এআই ইনসাইট সহ তাত্ক্ষণিকভাবে আপনার বিএমআই, ক্যালোরি এবং সুস্থতা ট্র্যাক করুন।",
            brand: "পিউরলাইফ হেলথ এআই", age: "আপনার বয়স (বছর)", weight: "ওজন", height: "উচ্চতা",
            calc: "এখনই হিসাব করুন", rcBmi: "আপনার বিএমআই", rcCal: "দৈনিক ক্যালোরি", tipH: "✨ এআই সুস্থতা টিপ",
            thCat: "বিভাগ", thRange: "বিএমআই রেঞ্জ", tdUnder: "কম ওজন", tdNorm: "স্বাভাবিক ওজন", tdOver: "অতিরিক্ত ওজন", tdObese: "স্থূলতা",
            emailLbl: "ফ্রি সাপ্তাহিক স্বাস্থ্য রিপোর্ট পান", btnPdf: "ফ্রি পিডিএফ রিপোর্ট পান →",
            c1H: "ভূমিকা: স্বাস্থ্য ও আধুনিক জীবন", c1P1: "আজকের দ্রুতগতির বিশ্বে শারীরিক ক্রিয়াকলাপ মারাত্মকভাবে হ্রাস পেয়েছে...", c1P2: "একটি দীর্ঘ জীবন পরিচালনা করতে বডি মেট্রিক্স বোঝা অপরিহার্য...",
            c2H: "বডি মাস ইনডেক্স (BMI) আসলে কি?", c2P1: "বডি মাস ইনডেক্স (BMI) হলো আন্তর্জাতিক পরিমাপ...", c2P2: "যদিও BMI সরাসরি চর্বি পরিমাপ করে না...",
            c3H: "কেন বিএমআই ট্র্যাক করা গুরুত্বপূর্ণ", c3P1: "অনেকে মনে করেন আয়নায় ফিট দেখলেই শরীর সুস্থ...", c3L1: "লুকানো ঝুঁকি সনাক্তকরণ", c3L2: "অপুষ্টি প্রতিরোধ", c3L3: "সঠিক লক্ষ্য নির্ধারণ",
            c4H: "বিএমআই শ্রেণীবিভাগ চার্ট", c4P1: "নিচে বিশ্ব স্বাস্থ্য কর্তৃপক্ষ দ্বারা ব্যবহৃত শ্রেণীবিভাগ দেওয়া হলো:",
            thR: "বিএমআই রেঞ্জ", thC: "শ্রেণীবিভাগ", thRi: "ঝুঁকির মাত্রা", trU: "কম ওজন", trN: "স্বাভাবিক ওজন", trO: "অতিরিক্ত ওজন", trOb: "স্থূলতা",
            trRU: "উচ্চ ঝুঁকি", trRN: "নূন্যতম", trRO: "বর্ধিত ঝুঁকি", trROb: "গুরুতর ঝুঁকি",
            asianT: "⚠️ এশিয়ান ফেনোটাইপ নোট:", asianD: "দক্ষিণ এশীয় বংশোদ্ভূতদের ২৩ বিএমআই তেই ঝুঁকি শুরু হতে পারে...",
            c5H: "BMR এবং TDEE বোঝা", c5P1: "BMR হলো শরীরের বেঁচে থাকার ন্যূনতম শক্তির হার...", c5P2: "শারীরিক পরিশ্রমের সাথে BMR গুণ করে TDEE পাওয়া যায়...",
            liDef: "ক্যালোরি ঘাটতি (হ্রাস)", liSur: "ক্যালোরি উদ্বৃত্ত (বৃদ্ধি)",
            cookie: "আমরা অভিজ্ঞতা উন্নত করতে কুকি ব্যবহার করি...", cookieBtn: "স্বীকার করুন", footerText: "© 2026 পিউরলাইফ হেলথ এআই। সর্বস্বত্ব সংরক্ষিত।"
        },
        es: {
            logo: "PureLife Health AI", home: "Inicio", blog: "Blog", privacy: "Política de Privacidad",
            heroT: "Calculadora IMC Inteligente", heroS: "Siga su IMC, calorías y bienestar instantáneamente con información de IA.",
            brand: "PureLife Health AI", age: "Tu Edad (Años)", weight: "Peso", height: "Altura",
            calc: "Calcular Ahora", rcBmi: "Tu IMC", rcCal: "Calorías Diarias", tipH: "✨ Consejo de IA",
            thCat: "Categoría", thRange: "Rango de IMC", tdUnder: "Bajo peso", tdNorm: "Peso Normal", tdOver: "Sobrepeso", tdObese: "Obesidad",
            emailLbl: "Obtenga un informe de salud gratuito", btnPdf: "Obtener informe PDF gratis →",
            c1H: "Introducción: Salud y Vida Moderna", c1P1: "En el mundo acelerado de hoy...", c1P2: "Para llevar una vida larga...",
            c2H: "¿Qué es el IMC?", c2P1: "El Índice de Masa Corporal es una medida...", c2P2: "Si bien el IMC no mide la grasa...",
            c3H: "Por qué es crucial", c3P1: "Muchas personas creen que verse bien...", c3L1: "Riesgos latentes", c3L2: "Desnutrición", c3L3: "Objetivos",
            c4H: "Tabla de clasificación", c4P1: "A continuación se muestra el sistema oficial...",
            thR: "Rango", thC: "Clasificación", thRi: "Riesgo", trU: "Bajo peso", trN: "Normal", trO: "Sobrepeso", trOb: "Obesidad",
            trRU: "Alto Riesgo", trRN: "Mínimo", trRO: "Aumentado", trROb: "Grave",
            asianT: "⚠️ Nota asiática:", asianD: "La OMS señala riesgos en umbrales más bajos...",
            c5H: "Dinámica de BMR y TDEE", c5P1: "BMR representa el umbral mínimo...", c5P2: "Su TDEE se deriva del BMR...",
            liDef: "Déficit calórico (Pérdida)", liSur: "Excedente calórico (Ganancia)",
            cookie: "Utilizamos cookies para mejorar...", cookieBtn: "Aceptar", footerText: "© 2026 PureLife Health AI. Todos los derechos reservados."
        },
        hi: {
            logo: "PureLife Health AI", home: "होम", blog: "ब्लॉग", privacy: "गोपनीयता नीति",
            heroT: "स्मार्ट बीएमआई कैलकुलेटर", heroS: "एआई अंतर्दृष्टि के साथ तुरंत अपने बीएमआई और कैलोरी को ट्रैक करें।",
            brand: "PureLife Health AI", age: "आपकी उम्र (वर्ष)", weight: "वजन", height: "लंबाई",
            calc: "अभी गणना करें", rcBmi: "आपका बीएमआई", rcCal: "दैनिक कैलोри", tipH: "✨ एआई स्वास्थ्य टिप",
            thCat: "श्रेणी", thRange: "बीएमआई रेंज", tdUnder: "कम वजन", tdNorm: "सामान्य वजन", tdOver: "अधिक वजन", tdObese: "मोटापा",
            emailLbl: "निःशुल्क साप्ताहिक स्वास्थ्य रिपोर्ट प्राप्त करें", btnPdf: "निःशुल्क पीडीएफ रिपोर्ट →",
            c1H: "प्रस्तावना: स्वास्थ्य और आधुनिक जीवन", c1P1: "आज की तेज-तर्रार दुनिया में शारीरिक गतिविधि में भारी कमी आई है...", c1P2: "अपने शरीर के बेसलाइन मेट्रिक्स को समझना आवश्यक है...",
            c2H: "बीएमआई वास्तव में क्या है?", c2P1: "बॉडी मास इंडेक्स वजन और ऊंचाई पर आधारित माप है...", c2P2: "हालांकि बीएमआई सीधे वसा नहीं मापता...",
            c3H: "ट्रैक करना क्यों महत्वपूर्ण है", c3P1: "आईने के सामने ठीक दिखना ही स्वास्थ्य नहीं है...", c3L1: "जोखिमों की पहचान", c3L2: "कुपोषण से बचाव", c3L3: "स्पष्ट लक्ष्य",
            c4H: "बीएमआई वर्गीकरण चार्ट", c4P1: "यह स्वास्थ्य अधिकारियों द्वारा उपयोग की जाने वाली प्रणाली है...",
            thR: "बीएमआई रेंज", thC: "वर्गीकरण", thRi: "जोखिम स्तर", trU: "कम वजन", trN: "सामान्य", trO: "अधिक वजन", trOb: "मोटापा",
            trRU: "उच्च जोखिम", trRN: "न्यूनतम", trRO: "बढ़ा हुआ जोखिम", trROb: "गंभीर जोखिम",
            asianT: "⚠️ एशियाई नोट:", asianD: "दक्षिण एशियाई मूल के लोगों में 23 पर ही जोखिम शुरू हो जाता है।",
            c5H: "BMR और TDEE को समझना", c5P1: "BMR न्यूनतम ऊर्जा सीमा का प्रतिनिधित्व करता है...", c5P2: "TDEE शारीरिक गतिविधि मेट्रिक्स से प्राप्त होता है।",
            liDef: "कैलोरी की कमी (वजन घटाना)", liSur: "कैलोरी अधिशेष (वजन बढ़ाना)",
            cookie: "हम आपके अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग करते हैं...", cookieBtn: "स्वीकार करें", footerText: "© 2026 PureLife Health AI. सर्वाधिकार सुरक्षित।"
        },
        ar: {
            logo: "PureLife صحة الذكاء الاصطناعي", home: "الرئيسية", blog: "المدونة", privacy: "سياسة الخصوصية",
            heroT: "حاسبة مؤشر كتلة الجسم الذكية", heroS: "تتبع مؤشر كتلة الجسم والسعرات الحرارية والعافية الفورية.",
            brand: "PureLife صحة الذكاء الاصطناعي", age: "عمرك (بالسنوات)", weight: "الوزن", height: "الطول",
            calc: "احسب الآن", rcBmi: "مؤشر كتلة جسمك", rcCal: "السعرات الحرارية", tipH: "✨ نصيحة العافية",
            thCat: "الفئة", thRange: "نطاق مؤشر كتلة الجسم", tdUnder: "نقص الوزن", tdNorm: "وزن طبيعي", tdOver: "زيادة الوزن", tdObese: "السمنة",
            emailLbl: "احصل على تقرير صحي مجاني", btnPdf: "احصل على تقرير PDF مجاني ←",
            c1H: "مقدمة: الصحة والحياة الحديثة", c1P1: "في عالم اليوم المتسارع، انخفض النشاط البدني...", c1P2: "لعيش حياة طويلة، فهم المقاييس ضروري...",
            c2H: "ما هو مؤشر كتلة الجسم؟", c2P1: "مؤشر كتلة الجسم هو قياس معترف به دولياً...", c2P2: "على الرغم من أنه لا يقيس الدهون مباشرة...",
            c3H: "لماذا التتبع مهم", c3P1: "يعتقد الكثيرون أن المظهر أمام المرآة يكفي...", c3L1: "تحديد المخاطر", c3L2: "منع سوء التغذية", c3L3: "أهداف واضحة",
            c4H: "مخطط التصنيف", c4P1: "أدناه هو نظام التصنيف الرسمي المعتمد...",
            thR: "النطاق", thC: "التصنيف", thRi: "مستوى الخطر", trU: "نقص الوزن", trN: "طبيعي", trO: "زيادة وزن", trOb: "سمنة",
            trRU: "خطر مرتفع", trRN: "أدنى حد", trRO: "خطر متزايد", trROb: "خطر شديد",
            asianT: "⚠️ ملاحظة للآسيويين:", asianD: "تلاحظ منظمة الصحة العالمية أن الآسيويين يبدأ الخطر لديهم عند 23...",
            c5H: "ديناميكيات BMR و TDEE", c5P1: "يمثل BMR الحد الأدنى من الطاقة...", c5P2: "يتم اشتقاق TDEE بضرب BMR في النشاط...",
            liDef: "عجز السعرات (خسارة)", liSur: "فائض السعرات (زيادة)",
            cookie: "نحن نستخدم ملفات تعريف الارتباط...", cookieBtn: "موافق", footerText: "© 2026 PureLife Health AI. جميع الحقوق محفوظة."
        },
        de: {
            logo: "PureLife Gesundheit KI", home: "Startseite", blog: "Blog", privacy: "Datenschutz",
            heroT: "Intelligenter BMI Rechner", heroS: "Verfolgen Sie Ihren BMI und Ihre Kalorien sofort mit KI.",
            brand: "PureLife Gesundheit KI", age: "Ihr Alter (Jahre)", weight: "Gewicht", height: "Größe",
            calc: "Jetzt berechnen", rcBmi: "Ihr BMI", rcCal: "Tägliche Kalorien", tipH: "✨ KI Gesundheitstipp",
            thCat: "Kategorie", thRange: "BMI-Bereich", tdUnder: "Untergewicht", tdNorm: "Normalgewicht", tdOver: "Übergewicht", tdObese: "Adipositas",
            emailLbl: "Kostenlosen Gesundheitsbericht erhalten", btnPdf: "Kostenlosen PDF-Bericht →",
            c1H: "Einführung: Gesundheit & modernes Leben", c1P1: "In der heutigen schnelllebigen Welt...", c1P2: "Um ein langes Leben zu führen...",
            c2H: "Was genau ist der BMI?", c2P1: "Der Body-Mass-Index ist ein Messwert...", c2P2: "Obwohl der BMI das Körperfett nicht direkt misst...",
            c3H: "Warum Tracking wichtig ist", c3P1: "Viele glauben, gutes Aussehen reicht...", c3L1: "Risiken erkennen", c3L2: "Mangelernährung verhindern", c3L3: "Klare Ziele",
            c4H: "BMI Klassifizierungstabelle", c4P1: "Nachfolgend finden Sie das offizielle System...",
            thR: "BMI-Bereich", thC: "Klassifizierung", thRi: "Risikostufe", trU: "Untergewicht", trN: "Normal", trO: "Übergewicht", trOb: "Adipositas",
            trRU: "Hohes Risiko", trRN: "Minimal", trRO: "Erhöhtes Risiko", trROb: "Schweres Risiko",
            asianT: "⚠️ Hinweis zu asiatischen Phänotypen:", asianD: "Die WHO stellt fest, dass bei Südasiaten das Risiko bereits ab 23 beginnt...",
            c5H: "BMR & TDEE Dynamik", c5P1: "BMR stellt den minimalen Energiebedarf dar...", c5P2: "TDEE wird durch Multiplikation des BMR ermittelt...",
            liDef: "Kaloriendefizit (Abnehmen)", liSur: "Kalorienüberschuss (Zunehmen)",
            cookie: "Wir verwenden Cookies...", cookieBtn: "Akzeptieren", footerText: "© 2026 PureLife Health AI. Alle Rechte vorbehalten."
        },
        fr: {
            logo: "PureLife Santé IA", home: "Accueil", blog: "Blog", privacy: "Confidentialité",
            heroT: "Calculateur d'IMC Intelligent", heroS: "Suivez votre IMC et vos calories instantanément grâce à l'IA.",
            brand: "PureLife Santé IA", age: "Votre Âge (Ans)", weight: "Poids", height: "Taille",
            calc: "Calculer Maintenant", rcBmi: "Votre IMC", rcCal: "Calories Journalières", tipH: "✨ Conseil de l'IA",
            thCat: "Catégorie", thRange: "Plage d'IMC", tdUnder: "Insuffisance", tdNorm: "Corpulence Normale", tdOver: "Surpoids", tdObese: "Obésité",
            emailLbl: "Rapport de santé gratuit", btnPdf: "Obtenir le rapport PDF →",
            c1H: "Introduction: Santé & Vie Moderne", c1P1: "Dans le monde trépidant d'aujourd'hui...", c1P2: "Pour vivre longtemps...",
            c2H: "Qu'est-ce que l'IMC?", c2P1: "L'Indice de Masse Corporelle est une mesure...", c2P2: "Bien que l'IMC ne mesure pas directement...",
            c3H: "Pourquoi le suivi est crucial", c3P1: "Beaucoup pensent que bien paraître suffit...", c3L1: "Identifier les risques", c3L2: "Prévenir les carences", c3L3: "Repères clairs",
            c4H: "Tableau de Classification IMC", c4P1: "Voici le système officiel utilisé...",
            thR: "Plage", thC: "Classification", thRi: "Niveau de Risque", trU: "Insuffisance", trN: "Normale", trO: "Surpoids", trOb: "Obésité",
            trRU: "Risque Élevé", trRN: "Minimal", trRO: "Risque Accru", trROb: "Risque Sévère",
            asianT: "⚠️ Note Phénotypes Asiatiques:", asianD: "L'OMS note que les personnes d'origine sud-asiatique ont des risques dès 23...",
            c5H: "Dynamique du BMR & TDEE", c5P1: "Le BMR représente le seuil d'énergie minimal...", c5P2: "Le TDEE est dérivé en multipliant le BMR...",
            liDef: "Déficit Calorique (Perte)", liSur: "Surplus Calorique (Gain)",
            cookie: "Nous utilisons des cookies...", cookieBtn: "Accepter", footerText: "© 2026 PureLife Health AI. Tous droits réservés."
        },
        pt: {
            logo: "PureLife Saúde IA", home: "Início", blog: "Blog", privacy: "Privacidade",
            heroT: "Calculadora de IMC Inteligente", heroS: "Acompanhe seu IMC e calorias instantaneamente com IA.",
            brand: "PureLife Saúde IA", age: "Sua Idade (Anos)", weight: "Peso", height: "Altura",
            calc: "Calcular Agora", rcBmi: "Seu IMC", rcCal: "Calorias Diárias", tipH: "✨ Dica de Saúde IA",
            thCat: "Categoria", thRange: "Faixa de IMC", tdUnder: "Abaixo do peso", tdNorm: "Peso Normal", tdOver: "Sobrepeso", tdObese: "Obesidade",
            emailLbl: "Receba relatório de saúde grátis", btnPdf: "Obter relatório PDF grátis →",
            c1H: "Introdução: Saúde & Vida Moderna", c1P1: "No mundo acelerado de hoje...", c1P2: "Para levar uma vida longa...",
            c2H: "O que exatamente é o IMC?", c2P1: "O Índice de Massa Corporal é uma medida...", c2P2: "Embora o IMC não meça a gordura diretamente...",
            c3H: "Por que o rastreamento é crucial", c3P1: "Muitos acreditam que parecer bem no espelho basta...", c3L1: "Identificar riscos", c3L2: "Prevenir desnutrição", c3L3: "Metas claras",
            c4H: "Tabela de Classificação do IMC", c4P1: "Abaixo está o sistema oficial utilizado...",
            thR: "Faixa", thC: "Classificação", thRi: "Nivel de Risco", trU: "Abaixo do peso", trN: "Normal", trO: "Sobrepeso", trOb: "Obesidade",
            trRU: "Alto Risco", trRN: "Mínimo", trRO: "Risco Aumentado", trROb: "Risco Grave",
            asianT: "⚠️ Nota sobre Fenótipos Asiáticos:", asianD: "A OMS observa que descendentes do sul da Ásia têm riscos a partir de 23...",
            c5H: "Dinâmica de BMR & TDEE", c5P1: "O BMR representa o limiar de energia mínimo...", c5P2: "Seu TDEE é derivado multiplicando o BMR...",
            liDef: "Déficit Calórico (Perda)", liSur: "Excedente Calórico (Ganho)",
            cookie: "Usamos cookies para melhorar...", cookieBtn: "Aceitar", footerText: "© 2026 PureLife Health AI. Todos os direitos reservados."
        },
        tr: {
            logo: "PureLife Sağlık AI", home: "Anasayfa", blog: "Blog", privacy: "Gizlilik Politikası",
            heroT: "Akıllı BMI Hesaplayıcı", heroS: "BMI ve kalorilerinizi yapay zeka ile anında takip edin.",
            brand: "PureLife Sağlık AI", age: "Yaşınız (Yıl)", weight: "Kilo", height: "Boy",
            calc: "Şimdi Hesapla", rcBmi: "BMI Değeriniz", rcCal: "Günlük Kalori", tipH: "✨ Yapay Zeka Tavsiyesi",
            thCat: "Kategori", thRange: "BMI Aralığı", tdUnder: "Zayıf", tdNorm: "Normal Kilolu", tdOver: "Fazla Kilolu", tdObese: "Obezite",
            emailLbl: "Ücretsiz Sağlık Raporu Alın", btnPdf: "Ücretsiz PDF Raporu →",
            c1H: "Giriş: Sağlık ve Modern Yaşam", c1P1: "Günümüzün hızlı dünyasında fiziksel aktivite azaldı...", c1P2: "Uzun bir yaşam sürmek için ölçümleri bilmek şarttır...",
            c2H: "BMI Tam Olarak Nedir?", c2P1: "Vücut Kitle İndeksi uluslararası bir ölçümdür...", c2P2: "BMI vücut yağını doğrudan ölçmese de...",
            c3H: "Takip Neden Önemlidir?", c3P1: "Birçok kişi aynada iyi görünmenin yettiğini sanır...", c3L1: "Riskleri Belirleme", c3L2: "Yetersiz Beslenmeyi Önleme", c3L3: "Net Hedefler",
            c4H: "BMI Sınıflandırma Tablosu", c4P1: "Aşağıda sağlık otoritelerinin kullandığı resmi sistem...",
            thR: "BMI Aralığı", thC: "Sınıflandırma", thRi: "Risk Seviyesi", trU: "Zayıf", trN: "Normal", trO: "Fazla Kilolu", trOb: "Obez",
            trRU: "Yüksek Risk", trRN: "Minimum", trRO: "Artmış Risk", trROb: "Ciddi Risk",
            asianT: "⚠️ Asya Fenotipleri Notu:", asianD: "DSÖ, Güney Asya kökenlilerde riskin 23'te başladığını belirtiyor...",
            c5H: "BMR ve TDEE Dinamikleri", c5P1: "BMR, vücudun hayatta kalması için gereken minimum enerjidir...", c5P2: "TDEE, BMR'nin aktivite ile çarpılmasıyla bulunur...",
            liDef: "Kalori Açığı (Kilo Verme)", liSur: "Kalori Fazlası (Kilo Alma)",
            cookie: "Deneyiminizi geliştirmek için çerezler...", cookieBtn: "Kabul Et", footerText: "© 2026 PureLife Health AI. Tüm hakları saklıdır."
        },
        ru: {
            logo: "PureLife Здоровье ИИ", home: "Главная", blog: "Блог", privacy: "Конфиденциальность",
            heroT: "Умный калькулятор ИМТ", heroS: "Мгновенно отслеживайте ИМТ и калории с помощью ИИ.",
            brand: "PureLife Здоровье ИИ", age: "Ваш возраст (Лет)", weight: "Вес", height: "Рост",
            calc: "Рассчитать", rcBmi: "Ваш ИМТ", rcCal: "Дневные калории", tipH: "✨ Совет от ИИ",
            thCat: "Категория", thRange: "Диапазон ИМТ", tdUnder: "Дефицит веса", tdNorm: "Нормальный вес", tdOver: "Избыточный вес", tdObese: "Ожирение",
            emailLbl: "Получить бесплатный отчет", btnPdf: "Получить отчет в PDF →",
            c1H: "Введение: Здоровье и современная жизнь", c1P1: "В современном быстро меняющемся мире активность снизилась...", c1P2: "Для долгой жизни важно понимать метрики тела...",
            c2H: "Что такое ИМТ?", c2P1: "Индекс массы тела — международная метрика...", c2P2: "Хотя ИМТ не измеряет жир напрямую...",
            c3H: "Почему трекинг важен", c3P1: "Многие думают, что хорошего вида в зеркале достаточно...", c3L1: "Выявление рисков", c3L2: "Предотвращение истощения", c3L3: "Четкие цели",
            c4H: "Таблица классификации ИМТ", c4P1: "Ниже приведена официальная система ВОЗ...",
            thR: "Диапазон", thC: "Классификация", thRi: "Уровень риска", trU: "Дефицит", trN: "Норма", trO: "Избыток", trOb: "Ожирение",
            trRU: "Высокий риск", trRN: "Минимум", trRO: "Повышенный риск", trROb: "Тяжелый риск",
            asianT: "⚠️ Примечание для азиатов:", asianD: "ВОЗ отмечает, что у лиц южноазиатского происхождения риск начинается с 23...",
            c5H: "Динамика BMR и TDEE", c5P1: "BMR — это минимальный порог энергии...", c5P2: "TDEE рассчитывается путем умножения BMR...",
            liDef: "Дефицит калорий (Похудение)", liSur: "Профицит калорий (Набор массы)",
            cookie: "Мы используем файлы cookie...", cookieBtn: "Принять", footerText: "© 2026 PureLife Health AI. Все права защищены."
        }
    };

    function changeLanguage(lang) {
        localStorage.setItem('selectedLang', lang);
        const l = dictionary[lang] || dictionary['en'];
        
        document.getElementById('navLogoText').innerText = l.logo;
        document.getElementById('navHomeLink').innerText = l.home;
        document.getElementById('navBlogLink').innerText = l.blog;
        document.getElementById('heroTitle').innerText = l.heroT;
        document.getElementById('heroSubtitle').innerText = l.heroS;
        document.getElementById('brandNameText').innerText = l.brand;
        document.getElementById('lblAge').innerText = l.age;
        document.getElementById('lblWeight').innerText = l.weight;
        document.getElementById('lblHeight').innerText = l.height;
        document.getElementById('btnCalcText').innerText = l.calc;
        document.getElementById('resCardBmiLbl').innerText = l.rcBmi;
        document.getElementById('resCardCalLbl').innerText = l.rcCal;
        document.getElementById('aiTipHeading').innerText = l.tipH;
        document.getElementById('thCat').innerText = l.thCat;
        document.getElementById('thRange').innerText = l.thRange;
        document.getElementById('tdUnder').innerText = l.tdUnder;
        document.getElementById('tdNorm').innerText = l.tdNorm;
        document.getElementById('tdOver').innerText = l.tdOver;
        document.getElementById('tdObese').innerText = l.tdObese;
        document.getElementById('lblEmailReport').innerText = l.emailLbl;
        document.getElementById('btnPdfText').innerText = l.btnPdf;
        
        document.getElementById('accHead1').innerText = l.c1H;
        document.getElementById('c1P1').innerText = l.c1P1;
        document.getElementById('c1P2').innerText = l.c1P2;

        document.getElementById('accHead2').innerText = l.c2H;
        document.getElementById('c2P1').innerText = l.c2P1;
        document.getElementById('c2P2').innerText = l.c2P2;

        document.getElementById('accHead3').innerText = l.c3H;
        document.getElementById('c3P1').innerText = l.c3P1;
        document.getElementById('c3L1').innerHTML = l.c3L1;
        document.getElementById('c3L2').innerHTML = l.c3L2;
        document.getElementById('c3L3').innerHTML = l.c3L3;

        document.getElementById('accHead4').innerText = l.c4H;
        document.getElementById('c4P1').innerText = l.c4P1;
        
        document.getElementById('thTblRange').innerText = l.thR;
        document.getElementById('thTblClass').innerText = l.thC;
        document.getElementById('thTblRisk').innerText = l.thRi;
        document.getElementById('tdTblUnder').innerText = l.trU;
        document.getElementById('tdTblNorm').innerText = l.trN;
        document.getElementById('tdTblOver').innerText = l.trO;
        document.getElementById('tdTblObese').innerText = l.trOb;
        document.getElementById('tdTblRiskUnder').innerText = l.trRU;
        document.getElementById('tdTblRiskNorm').innerText = l.trRN;
        document.getElementById('tdTblRiskOver').innerText = l.trRO;
        document.getElementById('tdTblRiskObese').innerText = l.trROb;
        
        document.getElementById('asianTitle').innerText = l.asianT;
        document.getElementById('asianDesc').innerText = l.asianD;

        document.getElementById('accHead5').innerText = l.c5H;
        document.getElementById('c5P1').innerText = l.c5P1;
        document.getElementById('c5P2').innerText = l.c5P2;
        document.getElementById('liDeficit').innerHTML = l.liDef;
        document.getElementById('liSurplus').innerHTML = l.liSur;

        document.getElementById('cookieText').innerText = l.cookie;
        document.getElementById('cookieBtnText').innerText = l.cookieBtn;
        
        // এখানে ফিক্স করা হয়েছে যেন ক্র্যাশ না করে
        document.getElementById('footerCopyText').innerText = l.footerText || `© 2026 PureLife Health AI. All rights reserved.`;

        if(lang === 'ar') {
            document.body.style.direction = 'rtl';
        } else {
            document.body.style.direction = 'ltr';
        }
        calculate();
    }

    function toggleDarkMode() {
        const body = document.body;
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        updateThemeButton(isDark);
    }

    function updateThemeButton(isDark) {
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.innerHTML = isDark ? "☀️ Light" : "🌙 Dark";
    }

    function downloadPDF() {
        let emailInput = document.getElementById("userEmail").value;
        if (!emailInput || !emailInput.includes("@")) {
            alert("Please enter a valid email address.");
            return;
        }

        let age = document.getElementById('age').value || "25";
        let weight = document.getElementById('weight').value || "70";
        let bmi = document.getElementById('bmiText').innerText || "24.2";
        let calories = document.getElementById('calText').innerText || "2000";
        let tip = document.getElementById('aiTip').innerText || "Keep maintaining a healthy lifestyle.";

        let height = "170";
        if (hUnit === 'cm') {
            height = document.getElementById('heightCM').value || "170";
        } else {
            let ft = document.getElementById('heightFT').value || "5";
            let inch = document.getElementById('heightIN').value || "7";
            height = `${ft}'${inch}"`;
        }

        const btn = document.getElementById('btnPdfText');
        const originalText = btn.innerText;
        btn.innerText = "Generating PDF...";
        btn.disabled = true;

        fetch('/generate-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: emailInput,
                age: age,
                gender: gender,
                weight: weight,
                height: height,
                bmi: bmi,
                calories: calories,
                tip: tip
            })
        })
        .then(response => {
            if (!response.ok) throw new Error("PDF generation failed");
            return response.blob();
        })
        .then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'PureLife_Health_Report.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            
            btn.innerText = originalText;
            btn.disabled = false;
        })
        .catch(err => {
            alert("Error generating PDF. Please make sure the Flask server is active.");
            btn.innerText = originalText;
            btn.disabled = false;
        });
    }

    window.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === 'true') {
            document.body.classList.add('dark-mode');
            updateThemeButton(true);
        } else {
            updateThemeButton(false);
        }

        const savedLang = localStorage.getItem('selectedLang') || 'en';
        document.getElementById('lang-switcher').value = savedLang;
        changeLanguage(savedLang);

        if (!localStorage.getItem("cookieAccepted")) {
            setTimeout(() => {
                document.getElementById("cookieBanner").style.bottom = "15px";
            }, 1500);
        }
        if (window.innerWidth <= 700) {
            const firstHeader = document.querySelector('.accordion-header');
            if(firstHeader) toggleAccordion(firstHeader);
        }
    });

    function acceptCookies() {
        localStorage.setItem("cookieAccepted", "true");
        document.getElementById("cookieBanner").style.bottom = "-200px";
    }

    calculate();

// Premium PDF Generation Client-Side Function
function downloadPDF() {
    const emailInput = document.getElementById('userEmail');
    if (emailInput && !emailInput.checkValidity()) {
        alert('Please enter a valid email address first.');
        return;
    }

    // বাটনে লোডিং টেক্সট দেখানো
    const pdfBtn = document.getElementById('btnPdfText');
    const originalText = pdfBtn.innerText;
    pdfBtn.innerText = 'Generating PDF... ⏳';
    pdfBtn.disabled = true;

    // পিডিএফ জেনারেট করার জন্য স্ক্রিপ্ট লোড করা (যদি আগে থেকে না থাকে)
    if (typeof html2pdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => executePDFGeneration(pdfBtn, originalText);
        document.head.appendChild(script);
    } else {
        executePDFGeneration(pdfBtn, originalText);
    }
}

function executePDFGeneration(button, originalText) {
    // পিডিএফে যে কন্টেন্টটুকু সুন্দর করে দেখাবে তা সাজানো
    const bmi = document.getElementById('bmiText').innerText;
    const calories = document.getElementById('calText').innerText;
    const aiTip = document.getElementById('aiTip').innerText;
    
    const element = document.createElement('div');
    element.innerHTML = `
        <div style="padding: 40px; font-family: 'Inter', sans-serif; color: #1e293b;">
            <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px;">PureLife Health AI Report</h1>
            <p style="font-size: 14px; color: #64748b;">Generated on: ${new Date().toLocaleDateString()}</p>
            
            <div style="margin-top: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                <h3 style="margin-top: 0; color: #0f172a;">📊 Your Health Metrics</h3>
                <p style="font-size: 16px;"><strong>Body Mass Index (BMI):</strong> <span style="color: #2563eb; font-weight: bold; font-size: 18px;">${bmi}</span></p>
                <p style="font-size: 16px;"><strong>Daily Calorie Requirement:</strong> <span style="color: #2563eb; font-weight: bold; font-size: 18px;">${calories} kcal</span></p>
            </div>
            
            <div style="margin-top: 20px; background: #eff6ff; padding: 20px; border-radius: 12px; border: 1px solid #bfdbfe;">
                <h3 style="margin-top: 0; color: #1e40af;">✨ AI Wellness Tip</h3>
                <p style="font-size: 15px; color: #1e3a8a; line-height: 1.6;">${aiTip}</p>
            </div>
            
            <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                <h4 style="color: #0f172a; margin-bottom: 10px;">📋 Healthy Habits Recommendation:</h4>
                <ul style="line-height: 1.8; color: #475569;">
                    <li>Drink at least 3-4 liters of water daily.</li>
                    <li>Engage in 20-30 minutes of physical activity or walking.</li>
                    <li>Prioritize 7-8 hours of consistent, deep sleep.</li>
                    <li>Reduce processed sugars and high-calorie snacks.</li>
                </ul>
            </div>
            
            <footer style="margin-top: 60px; text-align: center; font-size: 12px; color: #94a3b8;">
                <p>© 2026 PureLife Health AI. All rights reserved.</p>
                <p style="color: #2563eb;">health-empire.vercel.app</p>
            </footer>
        </div>
    `;

    const opt = {
        margin:       10,
        filename:     'PureLife_Health_Report.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // পিডিএফ সেভ করা
    html2pdf().set(opt).from(element).save().then(() => {
        button.innerText = originalText;
        button.disabled = false;
    }).catch(err => {
        console.error(err);
        button.innerText = originalText;
        button.disabled = false;
        alert('Something went wrong while generating the PDF.');
    });
}
