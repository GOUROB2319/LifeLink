const DISTRICTS = [
    { en: "Bagerhat", bn: "বাগেরহাট" },
    { en: "Bandarban", bn: "বান্দরবান" },
    { en: "Barguna", bn: "বরগুনা" },
    { en: "Barishal", bn: "বরিশাল" },
    { en: "Bhola", bn: "ভোলা" },
    { en: "Bogura", bn: "বগুড়া" },
    { en: "Brahmanbaria", bn: "ব্রাহ্মণবাড়িয়া" },
    { en: "Chandpur", bn: "চাঁদপুর" },
    { en: "Chapainawabganj", bn: "চাঁপাইনবাবগঞ্জ" },
    { en: "Chattogram", bn: "চট্টগ্রাম" },
    { en: "Chuadanga", bn: "চুয়াডাঙ্গা" },
    { en: "Cox's Bazar", bn: "কক্সবাজার" },
    { en: "Cumilla", bn: "কুমিল্লা" },
    { en: "Dhaka", bn: "ঢাকা" },
    { en: "Dinajpur", bn: "দিনাজপুর" },
    { en: "Faridpur", bn: "ফরিদপুর" },
    { en: "Feni", bn: "ফেনী" },
    { en: "Gaibandha", bn: "গাইবান্ধা" },
    { en: "Gazipur", bn: "গাজীপুর" },
    { en: "Gopalganj", bn: "গোপালগঞ্জ" },
    { en: "Habiganj", bn: "হবিগঞ্জ" },
    { en: "Jamalpur", bn: "জামালপুর" },
    { en: "Jashore", bn: "যশোর" },
    { en: "Jhalokati", bn: "ঝালকাঠি" },
    { en: "Jhenaidah", bn: "ঝিনাইদহ" },
    { en: "Joypurhat", bn: "জয়পুরহাট" },
    { en: "Khagrachhari", bn: "খাগড়াছড়ি" },
    { en: "Khulna", bn: "খুলনা" },
    { en: "Kishoreganj", bn: "কিশোরগঞ্জ" },
    { en: "Kurigram", bn: "কুড়িগ্রাম" },
    { en: "Kushtia", bn: "কুষ্টিয়া" },
    { en: "Lakshmipur", bn: "লক্ষ্মীপুর" },
    { en: "Lalmonirhat", bn: "লালমনিরহাট" },
    { en: "Madaripur", bn: "মাদারীপুর" },
    { en: "Magura", bn: "মাগুরা" },
    { en: "Manikganj", bn: "মানিকগঞ্জ" },
    { en: "Meherpur", bn: "মেহেরপুর" },
    { en: "Moulvibazar", bn: "মৌলভীবাজার" },
    { en: "Munshiganj", bn: "মুন্সিগঞ্জ" },
    { en: "Mymensingh", bn: "ময়মনসিংহ" },
    { en: "Naogaon", bn: "নওগাঁ" },
    { en: "Narail", bn: "নড়াইল" },
    { en: "Narayanganj", bn: "নারায়ণগঞ্জ" },
    { en: "Narsingdi", bn: "নরসিংদী" },
    { en: "Natore", bn: "নাটোর" },
    { en: "Netrokona", bn: "নেত্রকোনা" },
    { en: "Nilphamari", bn: "নীলফামারী" },
    { en: "Noakhali", bn: "নোয়াখালী" },
    { en: "Pabna", bn: "পাবনা" },
    { en: "Panchagarh", bn: "পঞ্চগড়" },
    { en: "Patuakhali", bn: "পটুয়াখালী" },
    { en: "Pirojpur", bn: "পিরোজপুর" },
    { en: "Rajbari", bn: "রাজবাড়ী" },
    { en: "Rajshahi", bn: "রাজশাহী" },
    { en: "Rangamati", bn: "রাঙ্গামাটি" },
    { en: "Rangpur", bn: "রংপুর" },
    { en: "Satkhira", bn: "সাতক্ষীরা" },
    { en: "Shariatpur", bn: "শরীয়তপুর" },
    { en: "Sherpur", bn: "শেরপুর" },
    { en: "Sirajganj", bn: "সিরাজগঞ্জ" },
    { en: "Sunamganj", bn: "সুনামগঞ্জ" },
    { en: "Sylhet", bn: "সিলেট" },
    { en: "Tangail", bn: "টাঙ্গাইল" },
    { en: "Thakurgaon", bn: "ঠাকুরগাঁও" }
];

const EN_GROUP_ORDER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const BN_GROUP_ORDER = ["ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ", "ঝ", "ঞ", "ট", "ঠ", "ড", "ঢ", "ণ", "ত", "থ", "দ", "ধ", "ন", "প", "ফ", "ব", "ভ", "ম", "য", "র", "ল", "শ", "ষ", "স", "হ"];

const getLang = () => localStorage.getItem("lifelink_lang") || "en";

const getGroupLabel = (district, lang) => {
    if (lang === "bn") {
        return district.bn.trim().charAt(0);
    }
    return district.en.trim().charAt(0).toUpperCase();
};

const getPlaceholderText = (lang) => (lang === "bn" ? "জেলা নির্বাচন করুন" : "Select district");

const buildOptions = (select, lang) => {
    const currentValue = select.value;
    const groups = {};

    DISTRICTS.forEach((item) => {
        const group = getGroupLabel(item, lang);
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(item);
    });

    const order = lang === "bn" ? BN_GROUP_ORDER : EN_GROUP_ORDER;

    select.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = getPlaceholderText(lang);
    select.appendChild(placeholder);

    order.forEach((group) => {
        if (!groups[group]) return;
        const optGroup = document.createElement("optgroup");
        optGroup.label = group;
        groups[group].forEach((item) => {
            const option = document.createElement("option");
            option.value = item.en;
            option.textContent = lang === "bn" ? item.bn : item.en;
            optGroup.appendChild(option);
        });
        select.appendChild(optGroup);
    });

    if (currentValue) {
        select.value = currentValue;
    }
};

const initDistrictSelects = () => {
    const selects = document.querySelectorAll("[data-district-select]");
    if (!selects.length) return;
    const lang = getLang();
    selects.forEach((select) => buildOptions(select, lang));
};

document.addEventListener("DOMContentLoaded", () => {
    initDistrictSelects();
});

document.addEventListener("lifelink-language-change", (e) => {
    const lang = e.detail?.lang || getLang();
    document.querySelectorAll("[data-district-select]").forEach((select) => buildOptions(select, lang));
});
