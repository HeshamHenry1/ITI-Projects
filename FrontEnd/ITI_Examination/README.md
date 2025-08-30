## ITI Examination - Static Frontend

Multi-page Arabic RTL website aligned with ITI colors and the exam project idea (courses, exams, questions, students, instructors).

Structure:
- `src/index.html` الرئيسية
- `src/about.html` عن المشروع
- `src/courses.html` الدورات
- `src/exams.html` الامتحانات
- `src/instructors.html` المدربون
- `src/contact.html` تواصل
- `src/assets/css/style.css` الثيم العام
- `src/assets/css/utilities.css` مساعدات
- `src/assets/js/components.js` ترويسة وتذييل قابلة لإعادة الاستخدام
- `src/assets/js/app.js` تحريك وتوليد شبكات بطاقات

تشغيل محليًا:
1. افتح مجلد `src` في متصفحك مباشرة، أو استخدم خادم بسيط:
   - Powershell: `cd src; python -m http.server 5500`
   - ثم افتح `http://localhost:5500/`

التخصيص:
- غيّر الألوان من `:root` في `style.css`.
- أضف أقسامًا جديدة عبر مكون البطاقات `renderCardGrid`.


