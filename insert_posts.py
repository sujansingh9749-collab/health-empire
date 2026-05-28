import sqlite3
import os

db_path = os.path.join(os.getcwd(), 'health_empire.db')
conn = sqlite3.connect(db_path)

posts = [

(
'Beyond the Scale: Why BMI is Incomplete Without Waist-to-Height Ratio (WHtR)',
'beyond-scale-why-bmi-is-incomplete',
'Fitness',

'''<h2>The Limitation of BMI</h2>

<p>BMI cannot distinguish between fat and muscle.</p>

<h2>WHtR</h2>

<ul>
<li><strong>WHtR &lt; 0.40:</strong> Underweight</li>
<li><strong>WHtR 0.40–0.49:</strong> Healthy</li>
<li><strong>WHtR 0.50–0.59:</strong> Increased risk</li>
<li><strong>WHtR &gt;= 0.60:</strong> High risk</li>
</ul>
'''
)

]

for title, slug, category, content in posts:

    try:
        conn.execute(
        '''
        INSERT INTO posts
        (title,slug,content,category)
        VALUES (?,?,?,?)
        ''',
        (title,slug,content,category)
        )

        print("Inserted:", title)

    except Exception as e:
        print("Error:", e)

conn.commit()
conn.close()

print("Done")
import sqlite3
import os

db_path = os.path.join(os.getcwd(), 'health_empire.db')
conn = sqlite3.connect(db_path)

posts = [

(
'Beyond the Scale: Why BMI is Incomplete Without Waist-to-Height Ratio (WHtR)',
'beyond-scale-why-bmi-is-incomplete',
'Fitness',

'''<h2>The Limitation of BMI</h2>

<p>BMI cannot distinguish between body fat and muscle mass.</p>

<h2>Waist-to-Height Ratio (WHtR)</h2>

<ul>
<li><strong>WHtR &lt; 0.40:</strong> Underweight</li>
<li><strong>WHtR 0.40–0.49:</strong> Healthy</li>
<li><strong>WHtR 0.50–0.59:</strong> Increased Risk</li>
<li><strong>WHtR &gt;= 0.60:</strong> High Risk</li>
</ul>

<h2>FAQ</h2>

<h3>Can someone have normal BMI but dangerous WHtR?</h3>

<p>Yes. This condition is called TOFI (Thin Outside Fat Inside).</p>
'''
),

(
'The Asian Phenotype Paradox: Why Standard BMI Thresholds Misdiagnose Metabolic Risks',
'asian-phenotype-paradox-bmi-thresholds',
'Health',

'''<h2>Asian BMI Reality</h2>

<p>South Asians often develop metabolic risk at lower BMI values.</p>

<ul>
<li><strong>18.5–22.9:</strong> Healthy</li>
<li><strong>23–24.9:</strong> Increased Risk</li>
<li><strong>25+:</strong> Obese</li>
</ul>

<h2>FAQ</h2>

<h3>Why does this happen?</h3>

<p>Genetics and visceral fat accumulation patterns differ.</p>
'''
),

(
'Clean Bulk vs. Dirty Bulk: Scientific Caloric Surpluses for Lean Muscle Architecture',
'clean-bulk-vs-dirty-bulk-scientific-surplus',
'Fitness',

'''<h2>Muscle Hypertrophy</h2>

<p>Muscle growth requires resistance training and a caloric surplus.</p>

<h2>Clean Bulk vs Dirty Bulk</h2>

<p>Dirty bulking often increases fat storage. Clean bulking uses controlled calories.</p>

<h2>FAQ</h2>

<h3>How fast can muscle grow?</h3>

<p>0.5–1 kg monthly bodyweight gain is realistic.</p>
'''
),

(
'Insulin Sensitivity and Metabolic Flexibility: The Hidden Drivers Behind Stubborn Fat',
'insulin-sensitivity-metabolic-flexibility-stubborn-fat',
'Health',

'''<h2>Insulin and Fat Storage</h2>

<p>Insulin strongly affects how your body stores and burns energy.</p>

<h2>Metabolic Flexibility</h2>

<p>A healthy body can efficiently switch between carbs and fat for fuel.</p>

<h2>FAQ</h2>

<h3>How can insulin sensitivity improve?</h3>

<p>Exercise, sleep, and dietary fiber help improve insulin response.</p>
'''
),

(
'The Physics of Caloric Deficit: How to Calculate Your True Weight Loss Baseline',
'physics-of-caloric-deficit-weight-loss-baseline',
'Diet',

'''<h2>Understanding Caloric Deficit</h2>

<p>Weight loss depends on maintaining an appropriate calorie deficit.</p>

<h2>TDEE and BMR</h2>

<p>Understanding your maintenance calories helps create effective fat-loss strategies.</p>

<h2>FAQ</h2>

<h3>Can I lose fat without losing muscle?</h3>

<p>Yes. Keep protein intake high and perform resistance training.</p>
'''
)

]

for title, slug, category, content in posts:

    try:
        conn.execute(
        '''
        INSERT INTO posts
        (title,slug,content,category)
        VALUES (?,?,?,?)
        ''',
        (title,slug,content,category)
        )

        print("✅ Inserted:", title)

    except sqlite3.IntegrityError:
        print("⚠ Already exists:", slug)

conn.commit()
conn.close()

print("🎉 All posts inserted successfully")
