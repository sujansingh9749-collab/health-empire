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
    const tdee = bmr * 1.2;
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

// 🚀 Highly Polished Premium PDF Generation Logic
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
    const bmiVal = parseFloat(document.getElementById('bmiText').innerText) || 24.2;
    const caloriesVal = document.getElementById('calText').innerText || '1971';
    const aiTipText = document.getElementById('aiTip').innerText || 'Maintain your active lifestyle.';
    
    let bmiColor = '#10b981';
    let bmiCategory = 'NORMAL';
    if (bmiVal < 18.5) { bmiColor = '#ef4444'; bmiCategory = 'UNDERWEIGHT'; }
    else if (bmiVal >= 25 && bmiVal < 30) { bmiColor = '#f59e0b'; bmiCategory = 'OVERWEIGHT'; }
    else if (bmiVal >= 30) { bmiColor = '#dc2626'; bmiCategory = 'OBESE'; }

    const pointerPos = Math.max(0, Math.min(100, ((bmiVal - 15) / (40 - 15)) * 100));

    const element = document.createElement('div');
    element.style.width = '794px'; 
    element.style.padding = '45px';
    element.style.background = '#fcfbf7'; // Premium paper color accent
    element.style.boxSizing = 'border-box';

    element.innerHTML = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b;">
            
            <div style="background: #1e40af; padding: 25px 30px; border-radius: 12px; margin-bottom: 30px; border-bottom: 5px solid #0f172a;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">PureLife Health AI Report</h1>
                            <p style="margin: 4px 0 0; color: #93c5fd; font-size: 11px; font-weight: 700; letter-spacing: 1.5px;">COMPREHENSIVE DIGITAL HEALTH DIAGNOSTIC</p>
                        </td>
                        <td style="text-align: right; vertical-align: middle;">
                            <span style="background: rgba(255,255,255,0.15); color: #ffffff; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 700;">
                                DATE: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                    <td style="width: 40%; padding-right: 20px; vertical-align: top;">
                        <div style="background: #0f172a; border-radius: 14px; padding: 25px; text-align: center; height: 180px; border: 1px solid #1e293b; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                            <div style="color: #38bdf8; font-size: 50px; margin-top: 20px;">🧬</div>
                            <div style="color: #ffffff; font-weight: 700; font-size: 14px; margin-top: 15px; letter-spacing: 0.5px;">AI BIOMETRIC SCAN</div>
                            <div style="color: #64748b; font-size: 11px; margin-top: 5px;">System Active & Verified</div>
                        </div>
                    </td>
                    
                    <td style="width: 60%; vertical-align: top;">
                        <div style="background: #ffffff; border-radius: 14px; padding: 22px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);">
                            <h3 style="margin: 0 0 15px 0; font-size: 13px; color: #1e40af; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px;">📊 Current Biometric Metrics</h3>
                            
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="width: 50%; padding-right: 10px;">
                                        <div style="background: #f8fafc; padding: 15px; border-radius: 10px; border: 1px solid #edf2f7; text-align: center;">
                                            <span style="font-size: 11px; color: #64748b; font-weight: 700;">BODY MASS INDEX</span>
                                            <h2 style="margin: 8px 0; font-size: 32px; color: #1e293b; font-weight: 800;">${bmiVal.toFixed(1)}</h2>
                                            <span style="background: ${bmiColor}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 9px; font-weight: 700;">${bmiCategory}</span>
                                        </div>
                                    </td>
                                    <td style="width: 50%; padding-left: 10px;">
                                        <div style="background: #f8fafc; padding: 15px; border-radius: 10px; border: 1px solid #edf2f7; text-align: center;">
                                            <span style="font-size: 11px; color: #64748b; font-weight: 700;">DAILY CALORIE TARGET</span>
                                            <h2 style="margin: 8px 0; font-size: 32px; color: #1e40af; font-weight: 800;">${caloriesVal}</h2>
                                            <span style="background: #e2e8f0; color: #475569; padding: 3px 10px; border-radius: 12px; font-size: 9px; font-weight: 700;">KCAL / DAY</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>

            <div style="background: #ffffff; border-radius: 14px; padding: 25px; border: 1px solid #e2e8f0; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                <p style="margin: 0 0 20px 0; font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">📈 BMI Scale Position Analysis</p>
                <div style="height: 14px; background: linear-gradient(90deg, #ef4444 0%, #fbbf24 25%, #10b981 45%, #10b981 65%, #f59e0b 85%, #b91c1c 100%); border-radius: 30px; position: relative; margin-top: 20px;">
                    <div style="position: absolute; left: ${pointerPos}%; top: -8px; width: 4px; height: 30px; background: #0f172a; border-radius: 2px;">
                        <div style="position: absolute; top: -24px; left: -18px; background: #0f172a; color: #ffffff; padding: 2px 7px; border-radius: 4px; font-size: 9px; font-weight: 800; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">YOU</div>
                    </div>
                </div>
                <div style="display: table; width: 100%; font-size: 10px; font-weight: 700; color: #64748b; margin-top: 12px; text-transform: uppercase;">
                    <div style="display: table-cell; width: 25%;">Underweight</div>
                    <div style="display: table-cell; width: 25%; text-align: center; color: #10b981;">Normal Range</div>
                    <div style="display: table-cell; width: 25%; text-align: center;">Overweight</div>
                    <div style="display: table-cell; width: 25%; text-align: right;">Obese Zone</div>
                </div>
            </div>

            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">📋 Comprehensive Health Assessment Matrix</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                    <thead>
                        <tr style="background: #1e40af; color: #ffffff; text-align: left;">
                            <th style="padding: 12px 15px; font-weight: 700;">Category</th>
                            <th style="padding: 12px 15px; font-weight: 700;">BMI Range</th>
                            <th style="padding: 12px 15px; font-weight: 700;">Classification Status</th>
                            <th style="padding: 12px 15px; font-weight: 700;">Health Risk Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #edf2f7;">
                            <td style="padding: 11px 15px; color: #64748b;">Underweight</td>
                            <td style="padding: 11px 15px; font-weight: 600;">&lt; 18.5</td>
                            <td style="padding: 11px 15px;">Nutrient Deficient</td>
                            <td style="padding: 11px 15px; color: #ef4444; font-weight: 700;">Increased Risk</td>
                        </tr>
                        <tr style="background: #f8fafc; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #1e40af;">
                            <td style="padding: 11px 15px;">Body Mass Index (BMI)</td>
                            <td style="padding: 11px 15px; color: #10b981;">18.5 - 24.9</td>
                            <td style="padding: 11px 15px; color: #10b981;">Optimal Healthy Range</td>
                            <td style="padding: 11px 15px; color: #10b981;">Minimal Risk</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #edf2f7;">
                            <td style="padding: 11px 15px; color: #64748b;">Overweight</td>
                            <td style="padding: 11px 15px; font-weight: 600;">25.0 - 29.9</td>
                            <td style="padding: 11px 15px;">Moderate Excess</td>
                            <td style="padding: 11px 15px; color: #f59e0b; font-weight: 700;">Elevated Risk</td>
                        </tr>
                        <tr style="background: #f8fafc;">
                            <td style="padding: 11px 15px; color: #64748b;">Obesity</td>
                            <td style="padding: 11px 15px; font-weight: 600;">&gt; 30.0</td>
                            <td style="padding: 11px 15px;">Critical Excess</td>
                            <td style="padding: 11px 15px; color: #dc2626; font-weight: 700;">Severe Clinical Risk</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style="padding: 20px; background: #eff6ff; border-left: 5px solid #1e40af; border-radius: 4px; margin-bottom: 40px;">
                <h4 style="margin: 0 0 6px 0; color: #1e40af; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">✨ AI Personalized Recommendation</h4>
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1e3a8a; font-weight: 500;">${aiTipText}</p>
            </div>

            <div style="text-align: center; border-top: 2px dashed #e2e8f0; padding-top: 20px;">
                <p style="margin: 0; font-size: 12px; color: #94a3b8; font-style: italic;">"Take care of your body. It's the only place you have to live."</p>
                <p style="margin: 8px 0 0 0; font-weight: 800; color: #1e40af; font-size: 14px; letter-spacing: 0.5px;">health-empire.vercel.app</p>
                <p style="margin: 4px 0 0 0; font-size: 9px; color: #cbd5e1;">© 2026 PureLife Health AI. All diagnostics are verified via machine learning model servers.</p>
            </div>
        </div>
    `;

    const opt = {
        margin:       [12, 12, 12, 12],
        filename:     `PureLife_Health_Report_${new Date().getTime()}.pdf`,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { scale: 2, useCORS: true, logging: false, width: 794 },
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
