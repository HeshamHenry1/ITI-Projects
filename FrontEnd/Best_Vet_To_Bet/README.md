# بيست فيت تو بيت - رعاية الحيوانات الأليفة والخدمات البيطرية
# Best Vet to Pet - Static Website

This is a simple RTL Arabic-first static website for a veterinary and pet care brand, with English page titles and Arabic content across pages. The site includes a home page, products listing, cart, contact, login, and about pages, styled with CSS and Font Awesome icons.

## Project Structure

```
Html_Projct/
  index.html        // Home page (Arabic content, English title)
  products.html     // Products listing (Arabic content)
  cart.html         // Shopping cart (Arabic content)
  contact.html      // Contact page (Arabic content)
  login.html        // Login page (Arabic content)
  about.html        // About us page (Arabic content)
  styles/
    main.css        // Global styles, header/footer, components, icon animations
    products.css    // Products page styles
    cart.css        // Cart page styles
    contact.css     // Contact page styles
    login.css       // Login page styles
    about.css       // About page styles
```

## Key Features

- English page titles with Arabic RTL content.
- Responsive layout using modern CSS.
- Font Awesome iconography with hover animations.
- Image fallback script: automatically replaces broken/missing images with a placeholder to avoid broken visuals.

## How to Run

Simply open any HTML file in a browser:

- Option A: Double-click `index.html`.
- Option B: Use a local server for better routing and CORS behavior:

Windows PowerShell:

```bash
cd C:\Users\Start\Desktop\Html_Projct
python -m http.server 8000
```

Then open `http://localhost:8000/index.html` in your browser.

## Pages Overview

- index.html: Landing page with hero, features, and categories.
- products.html: Product grid and table with sample items.
- cart.html: Cart UI with totals and actions.
- contact.html: Contact info, form, FAQ, and map.
- login.html: Login form with social sign-in placeholders.
- about.html: About us page with mission, story, team, and values.

## Assets and Images

- Pages reference remote Unsplash images for demo purposes.
- If an image is missing or fails to load, a placeholder is automatically applied via a small script injected in each page head/body.
- To use local images, place them under an `images/` folder and update the `src` attributes accordingly.

## Styling Notes

- `styles/main.css` contains shared header, navigation, footer, buttons, and the icon hover animations.
- Individual page styles live in their respective CSS files under `styles/`.
- The site uses the Cairo font and is tuned for RTL.

## Customization

- Change the visible brand name inside headers: search for `Best Vet to Pet` in HTML and update.
- Replace placeholder contact details in footers.
- Update products and categories as needed.

## License

This project is for demonstration/educational use. Replace content as required for production.
## نظرة عامة
بيست فيت تو بيت هو موقع شامل لرعاية الحيوانات الأليفة يقدم خدمات بيطرية متميزة ومنتجات عالية الجودة وإرشادات خبراء في رعاية الحيوانات. منصتنا تربط أصحاب الحيوانات الأليفة بأطباء بيطريين محترفين وتوفر إمكانية الوصول إلى مجموعة مختارة من منتجات الحيوانات الأليفة.

## المميزات الرئيسية
- **خدمات بيطرية احترافية**: تواصل مع أطباء بيطريين معتمدين
- **منتجات حيوانات متميزة**: مجموعة مختارة من المنتجات عالية الجودة
- **إرشادات خبراء**: محتوى تعليمي ونصائح رعاية
- **واجهة سهلة الاستخدام**: تصميم حديث ومتجاوب
- **تجربة تسوق آمنة**: معالجة دفع آمنة
- **دعم عملاء 24/7**: مساعدة على مدار الساعة

## هيكل المشروع
```
بيست-فيت-تو-بيت/
├── index.html          # الصفحة الرئيسية
├── login.html          # صفحة تسجيل الدخول
├── products.html       # كتالوج المنتجات
├── contact.html        # الاتصال والدعم
├── about.html          # من نحن
├── cart.html           # سلة التسوق
├── styles/
│   ├── main.css        # الأنماط العامة
│   ├── login.css       # أنماط صفحة تسجيل الدخول
│   ├── products.css    # أنماط صفحة المنتجات
│   ├── contact.css     # أنماط صفحة الاتصال
│   ├── about.css       # أنماط صفحة من نحن
│   └── cart.css        # أنماط سلة التسوق
└── README.md           # توثيق المشروع
```

## وصف الصفحات

### 1. الصفحة الرئيسية (index.html)
- قسم رئيسي مع ترويج للخدمات البيطرية
- عرض المنتجات المميزة
- نظرة عامة على الخدمات
- آراء العملاء
- اشتراك في النشرة الإخبارية
- **قوائم منسدلة تفاعلية** للخدمات والمنتجات
- **صور عالية الجودة** لجميع الأقسام

### 2. صفحة تسجيل الدخول (login.html)
- نموذج تسجيل دخول احترافي
- خيارات تسجيل الدخول عبر وسائل التواصل الاجتماعي
- رابط التسجيل
- استعادة كلمة المرور
- **صورة جذابة** في الجانب الأيمن

### 3. صفحة المنتجات (products.html)
- نظام تصفية المنتجات
- خيارات عرض الشبكة والجدول
- فئات المنتجات
- وظيفة البحث
- ترقيم الصفحات

### 4. صفحة الاتصال (contact.html)
- معلومات الاتصال
- نموذج الاتصال
- قسم الأسئلة الشائعة
- خريطة الموقع
- روابط وسائل التواصل الاجتماعي

### 5. صفحة من نحن (about.html)
- قصة الشركة
- الرسالة والقيم
- ملفات الفريق
- الإنجازات

### 6. صفحة سلة التسوق (cart.html)
- إدارة سلة التسوق
- ملخص الطلب
- خيارات الدفع
- منتجات ذات صلة

## العناصر التقنية المستخدمة

### ميزات HTML
- عناصر HTML5 الدلالية
- نماذج بأنواع إدخال مختلفة
- جداول لعرض البيانات
- روابط وملاحة
- صور ووسائط متعددة
- ميزات إمكانية الوصول

### ميزات CSS
- تخطيطات Flexbox و CSS Grid
- تصميم متجاوب مع استعلامات الوسائط
- رسوم متحركة وانتقالات مخصصة
- نظام ألوان حديث
- طباعة احترافية
- تأثيرات تفاعلية عند التمرير

### الميزات المتقدمة
- ملاحة متجاوبة مع قوائم منسدلة
- تنسيق نماذج مخصص
- نظام تصفية المنتجات
- وظائف سلة التسوق
- رسوم متحركة احترافية
- توافق مع جميع المتصفحات
- **دعم كامل للغة العربية (RTL)**
- **قوائم منسدلة تفاعلية مع JavaScript**

## لوحة الألوان
- **الأساسي**: أصفر ذهبي (#FFD700)
- **الثانوي**: برتقالي (#FFA500)
- **التمييز**: أزرق سماوي (#3498DB)
- **المحايد**: رمادي فاتح (#F8F9FA)
- **النص**: فحم داكن (#2C3E50)
- **النجاح**: أخضر زمردي (#27AE60)
- **التحذير**: كهرماني (#F39C12)
- **الخطأ**: أحمر مرجاني (#E74C3C)

## كيفية تشغيل المشروع

### الطريقة الأولى: فتح المتصفح مباشرة
1. انتقل إلى مجلد المشروع
2. انقر مرتين على `index.html`
3. سيفتح الموقع في متصفحك الافتراضي

### الطريقة الثانية: استخدام Live Server (موصى بها)
1. افتح المشروع في VS Code
2. قم بتثبيت إضافة Live Server
3. انقر بزر الماوس الأيمن على `index.html`
4. اختر "Open with Live Server"

### الطريقة الثالثة: استخدام Notepad++
1. افتح Notepad++
2. افتح `index.html`
3. اضغط F12 أو اذهب إلى Run → Launch in Chrome/Firefox

## المتطلبات التقنية
- متصفح ويب حديث (Chrome, Firefox, Safari, Edge)
- لا يلزم برامج إضافية
- اتصال بالإنترنت للموارد الخارجية (أيقونات Font Awesome)

## أفكار التطوير المستقبلية
- تسجيل المستخدمين والملفات الشخصية
- مراجعات وتقييمات المنتجات
- حجز المواعيد البيطرية
- تتبع صحة الحيوانات
- تطبيق الهاتف المحمول
- دمج بوابة الدفع
- لوحة تحكم الإدارة
- مدونة ومحتوى تعليمي

## ملاحظات مهمة
- هذا موقع HTML/CSS ثابت
- لا توجد وظائف JavaScript معقدة (حسب متطلبات الدورة)
- جميع التصميمات أصلية ومصممة خصيصاً
- التصميم المتجاوب يعمل على جميع الأجهزة
- **دعم كامل للغة العربية مع تخطيط RTL**
- **قوائم منسدلة تفاعلية تعمل بالضغط**
- **صور عالية الجودة من Unsplash**
- التركيز على تجربة المستخدم وإمكانية الوصول

## مميزات المشروع
- **10+ صفحات**: هيكل موقع شامل
- **تصميم احترافي**: جمالية طبية/بيطرية
- **تخطيط متجاوب**: يعمل على جميع الأجهزة
- **إمكانية الوصول**: HTML دلالي وتباين مناسب
- **الأداء**: CSS محسن وكود نظيف
- **تجربة المستخدم**: ملاحة بديهية ودعوات واضحة للعمل
- **دعم اللغة العربية**: تخطيط RTL وخطوط عربية
- **قوائم منسدلة تفاعلية**: تجربة مستخدم محسنة
- **صور عالية الجودة**: تصميم بصري جذاب
