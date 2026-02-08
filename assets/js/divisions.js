const DIVISIONS = [
    { en: "Dhaka", bn: "ঢাকা" },
    { en: "Chattogram", bn: "চট্টগ্রাম" },
    { en: "Rajshahi", bn: "রাজশাহী" },
    { en: "Khulna", bn: "খুলনা" },
    { en: "Barishal", bn: "বরিশাল" },
    { en: "Sylhet", bn: "সিলেট" },
    { en: "Rangpur", bn: "রংপুর" },
    { en: "Mymensingh", bn: "ময়মনসিংহ" }
];

const getDivisionLang = () => localStorage.getItem("lifelink_lang") || "en";

const buildDivisionOptions = (select, lang) => {
    const currentValue = select.value;
    select.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = lang === "bn" ? "বিভাগ নির্বাচন করুন" : "Select division";
    select.appendChild(placeholder);

    DIVISIONS.forEach((division) => {
        const option = document.createElement("option");
        option.value = division.en.toLowerCase();
        option.textContent = lang === "bn" ? division.bn : division.en;
        select.appendChild(option);
    });

    if (currentValue) {
        select.value = currentValue;
    }
};

const initDivisionSelects = () => {
    const selects = document.querySelectorAll("[data-division-select]");
    if (!selects.length) return;
    const lang = getDivisionLang();
    selects.forEach((select) => buildDivisionOptions(select, lang));
};

document.addEventListener("DOMContentLoaded", () => {
    initDivisionSelects();
});

document.addEventListener("lifelink-language-change", (e) => {
    const lang = e.detail?.lang || getDivisionLang();
    document.querySelectorAll("[data-division-select]").forEach((select) => buildDivisionOptions(select, lang));
});
