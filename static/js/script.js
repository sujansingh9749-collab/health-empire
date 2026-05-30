// Global state and UI logic
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('theme-toggle');
    btn.innerText = document.body.classList.contains('dark-mode') ? '☀️ Light' : '🌙 Dark';
}

function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

// BMI & Calorie Calculation Logic
let currentGender = 'male';
function setGender(g) {
    currentGender = g;
    document.getElementById('mBtn').classList.toggle('active', g === 'male');
    document.getElementById('fBtn').classList.toggle('active', g === 'female');
    calculate();
}

function calculate() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('heightCM').value);
    
    if (!age || !weight || !height) return;

    // BMI Calculation
    const bmi = weight / ((height / 100) ** 2);
    document.getElementById('bmiText').innerText = bmi.toFixed(1);

    // Calorie Calculation (Mifflin-St Jeor Equation)
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = currentGender === 'male' ? bmr + 5 : bmr - 161;
    const tdee = bmr * 1.2; // Sedentary factor
    document.getElementById('calText').innerText = Math.round(tdee);

    // Update AI Tip based on BMI
    const aiTip = document.getElementById('aiTip');
    if (bmi < 18.5) aiTip.innerText = "You are underweight. Focus on nutrient-dense foods and strength training.";
    else if (bmi < 25) aiTip.innerText = "Excellent! You are in the healthy range. Maintain your active lifestyle.";
    else if (bmi < 30) aiTip.innerText = "You are overweight. Try adding 30 minutes of daily cardio and control portions.";
    else aiTip.innerText = "Health Risk! Please consult a nutritionist and prioritize a balanced diet.";

    // Update Meter Pointer
    const pointer = document.getElementById('bmiPointer');
    let pos = ((bmi - 15) / (40 - 15)) * 100;
    pos = Math.max(0, Math.min(100, pos));
    pointer.style.left = pos + '%';
}

// 🚀 Professional PDF Generation logic
function downloadPDF() {
    const pdfBtn = document.getElementById('btnPdfText');
    const originalText = pdfBtn.innerText;
    pdfBtn.innerText = 'Generating Report... ⏳';
    pdfBtn.disabled = true;

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
    const bmi = parseFloat(document.getElementById('bmiText').innerText);
    const calories = document.getElementById('calText').innerText;
    const aiTip = document.getElementById('aiTip').innerText;
    
    // Logic for color and category
    let bmiColor = '#22c55e';
    let bmiCategory = 'Normal';
    if (bmi < 18.5) { bmiColor = '#ef4444'; bmiCategory = 'Underweight'; }
    else if (bmi >= 25 && bmi < 30) { bmiColor = '#f59e0b'; bmiCategory = 'Overweight'; }
    else if (bmi >= 30) { bmiColor = '#b91c1c'; bmiCategory = 'Obese'; }

    const pointerPos = Math.max(0, Math.min(100, ((bmi - 15) / (40 - 15)) * 100));

    const element = document.createElement('div');
    element.innerHTML = `
        <div style="padding: 35px; background: #ffffff; font-family: 'Inter', sans-serif; color: #1e293b; width: 750px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #2563eb; padding-bottom: 15px; margin-bottom: 25px;">
                <div>
                    <h1 style="margin: 0; color: #2563eb; font-size: 26px; font-weight: 800;">PureLife Health AI Report</h1>
                    <p style="margin: 5px 0 0; color: #64748b; font-size: 12px; letter-spacing: 1px;">PREMIUM WELLNESS ASSESSMENT</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-size: 11px; color: #94a3b8; text-transform: uppercase;">Generated On</p>
                    <p style="margin: 2px 0 0; font-weight: bold; font-size: 14px; color: #0f172a;">${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                </div>
            </div>

            <div style="display: flex; gap: 20px; margin-bottom: 30px;">
                <div style="flex: 1; padding: 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <p style="margin: 0; font-size: 13px; color: #64748b; font-weight: 600;">Body Mass Index (BMI)</p>
                    <h2 style="margin: 12px 0; font-size: 36px; color: #2563eb;">${bmi.toFixed(1)}</h2>
                    <span style="padding: 4px 12px; background: ${bmiColor}; color: #fff; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase;">${bmiCategory}</span>
                </div>
                <div style="flex: 1; padding: 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <p style="margin: 0; font-size: 13px; color: #64748b; font-weight: 600;">Daily Calorie Goal</p>
                    <h2 style="margin: 12px 0; font-size: 36px; color: #2563eb;">${calories}</h2>
                    <p style="margin: 0; font-weight: 700; color: #94a3b8; font-size: 14px;">KCAL / DAY</p>
                </div>
            </div>

            <div style="margin-bottom: 35px; padding: 25px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <p style="margin: 0 0 20px; font-size: 14px; font-weight: 700; color: #0f172a;">📊 BMI Visual Scale Assessment</p>
                <div style="height: 14px; background: linear-gradient(90deg, #ef4444 0%, #fbbf24 20%, #22c55e 40%, #22c55e 60%, #f59e0b 80%, #b91c1c 100%); border-radius: 10px; position: relative;">
                    <div style="position: absolute; left: ${pointerPos}%; top: -10px; width: 4px; height: 34px; background: #0f172a; border-radius: 2px;">
                        <div style="position: absolute; top: -25px; left: -18px; background: #0f172a; color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 800;">YOU</div>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 10px; font-weight: 600; color: #64748b; text-transform: uppercase; padding: 0 5px;">
                    <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
                </div>
            </div>

            <div style="margin-bottom: 35px;">
                <h3 style="font-size: 16px; color: #0f172a; margin-bottom: 15px; display: flex; align-items: center;">📋 Comprehensive Health Analysis</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left;">
                    <thead>
                        <tr style="background: #2563eb; color: #ffffff;">
                            <th style="padding: 12px; border-radius: 8px 0 0 0;">BMI Category</th>
                            <th style="padding: 12px;">BMI Range</th>
                            <th style="padding: 12px;">Status</th>
                            <th style="padding: 12px; border-radius: 0 8px 0 0;">Risk Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">Underweight</td><td style="padding: 12px;">< 18.5</td><td style="padding: 12px;">Deficient</td><td style="padding: 12px; color: #ef4444; font-weight: bold;">High</td>
                        </tr>
                        <tr style="background: #f8fafc; border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px; font-weight: bold;">Normal Weight</td><td style="padding: 12px;">18.5 - 24.9</td><td style="padding: 12px;">Healthy</td><td style="padding: 12px; color: #22c55e; font-weight: bold;">Minimal</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">Overweight</td><td style="padding: 12px;">25.0 - 29.9</td><td style="padding: 12px;">Excess</td><td style="padding: 12px; color: #f59e0b; font-weight: bold;">Increased</td>
                        </tr>
                        <tr style="background: #f8fafc;">
                            <td style="padding: 12px;">Obesity</td><td style="padding: 12px;">> 30.0</td><td style="padding: 12px;">Critical</td><td style="padding: 12px; color: #b91c1c; font-weight: bold;">Severe</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style="padding: 20px; background: #eff6ff; border-left: 5px solid #2563eb; border-radius: 0 12px 12px 0; margin-bottom: 35px;">
                <h4 style="margin: 0 0 8px; color: #1e40af; font-size: 15px;">✨ AI Personalized Health Recommendation</h4>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e3a8a;">${aiTip}</p>
            </div>

            <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 25px;">
                <p style="margin: 0; font-size: 12px; color: #94a3b8; font-style: italic;">"Invest in your health today for a vibrant tomorrow."</p>
                <div style="margin-top: 10px;">
                    <span style="font-weight: 800; color: #2563eb; font-size: 15px;">health-empire.vercel.app</span>
                </div>
                <p style="margin: 5px 0 0; font-size: 10px; color: #cbd5e1;">© 2026 PureLife Health AI. All rights reserved.</p>
            </div>
        </div>
    `;

    const opt = {
        margin:       0,
        filename:     `PureLife_Health_Report_${new Date().getTime()}.pdf`,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        button.innerText = originalText;
        button.disabled = false;
    }).catch(err => {
        console.error(err);
        button.innerText = originalText;
        button.disabled = false;
        alert('Error generating PDF.');
    });
}
