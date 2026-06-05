const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const brandLink = document.querySelector(".brand");
const tabLinks = document.querySelectorAll(".site-nav a");
const tabContents = document.querySelectorAll("[data-tab-content]");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const formSubject = document.querySelector("#formSubject");
const formReplyTo = document.querySelector("#formReplyTo");
const formNext = document.querySelector("#formNext");
const languageToggle = document.querySelector("#languageToggle");
const tabs = new Set(["home", "about", "services", "industries", "projects", "contact"]);
const idleHomeDelay = 60000;
let idleHomeTimer;

function getStoredLanguage() {
  try {
    return window.localStorage?.getItem("everest-language") || "en";
  } catch {
    return "en";
  }
}

function setStoredLanguage(language) {
  try {
    window.localStorage?.setItem("everest-language", language);
  } catch {
    // Language switching still works when browser storage is unavailable.
  }
}

let currentLanguage = getStoredLanguage();

const zhTranslations = {
  "Australia": "澳大利亚",
  "Home": "首页",
  "About": "关于我们",
  "Services": "服务",
  "Industries": "行业领域",
  "Projects": "项目案例",
  "Contact": "联系我们",
  "International Trade | Import & Export | Procurement": "国际贸易 | 进出口 | 采购",
  "Global Trade. Trusted Supply.": "全球贸易，可信供应。",
  "Connecting businesses worldwide through professional sourcing, procurement, logistics coordination and commercial supply chain support.": "通过专业寻源、采购、物流协调和商业供应链支持，连接全球企业。",
  "Request a Quote": "获取报价",
  "Explore Services": "了解服务",
  "Company Positioning": "公司定位",
  "Connecting global markets through reliable trade solutions.": "通过可靠的贸易解决方案连接全球市场。",
  "Everest Supplies Australia is a diversified international trading and supply chain company headquartered in Melbourne, Australia. We support businesses with end-to-end import, export, procurement, logistics coordination and commercial consulting services across multiple industries.": "Everest Supplies Australia 是一家总部位于澳大利亚墨尔本的多元化国际贸易与供应链公司。我们为多个行业的企业提供端到端的进口、出口、采购、物流协调和商业咨询服务。",
  "Global": "全球网络",
  "Supplier and buyer networks": "供应商与买家资源网络",
  "End-to-end": "端到端服务",
  "Procurement to logistics support": "从采购到物流的支持",
  "Multi-sector": "多行业覆盖",
  "Trade capability across industries": "跨行业贸易服务能力",
  "Long-term": "长期合作",
  "Partnership-focused delivery": "以长期合作为导向的交付",
  "About Us": "关于我们",
  "Professional sourcing, procurement and market access from Australia.": "立足澳大利亚的专业寻源、采购与市场连接服务。",
  "Everest Supplies Australia is a privately owned international trading company headquartered in Melbourne, Australia, focused on facilitating global commerce through trusted sourcing, procurement, import and export solutions.": "Everest Supplies Australia 是一家总部位于澳大利亚墨尔本的私营国际贸易公司，专注于通过可信赖的寻源、采购、进口和出口解决方案促进全球商业往来。",
  "Operating from Australia, we connect qualified suppliers with commercial buyers while supporting logistics, quality assurance, documentation and commercial transparency throughout the supply chain.": "我们从澳大利亚出发，连接合格供应商与商业买家，并在整个供应链中提供物流、质量保证、文件管理和商业透明度支持。",
  "Mission": "使命",
  "To create value by connecting global suppliers and customers through trusted trade partnerships.": "通过可信赖的贸易伙伴关系连接全球供应商与客户，创造商业价值。",
  "Vision": "愿景",
  "To become a leading international trading and supply chain solutions provider in Australia and the Asia-Pacific region.": "成为澳大利亚及亚太地区领先的国际贸易与供应链解决方案提供商。",
  "Products & Services": "产品与服务",
  "Practical trade support across sourcing, logistics and market development.": "覆盖寻源、物流和市场开发的实用贸易支持。",
  "Import Solutions": "进口解决方案",
  "Product sourcing": "产品寻源",
  "Supplier identification": "供应商识别",
  "Procurement management": "采购管理",
  "Quality assurance": "质量保证",
  "Customs and logistics coordination": "清关与物流协调",
  "Export Solutions": "出口解决方案",
  "Market development": "市场开发",
  "International distribution": "国际分销",
  "Export documentation": "出口文件",
  "Freight coordination": "货运协调",
  "Regulatory compliance support": "法规合规支持",
  "Strategic Procurement": "战略采购",
  "Cost-effective sourcing strategy": "成本优化的寻源策略",
  "Supplier qualification": "供应商资质评估",
  "Product verification": "产品验证",
  "Commercial negotiations": "商务谈判",
  "Long-term procurement planning": "长期采购规划",
  "Supply Chain Management": "供应链管理",
  "Sea, air and road freight coordination": "海运、空运与陆运协调",
  "Warehousing and distribution support": "仓储与配送支持",
  "Inventory planning": "库存规划",
  "Product inspection": "产品检验",
  "Documentation management": "文件管理",
  "Built for diverse commercial sourcing needs.": "面向多样化商业采购需求。",
  "Construction & Building Materials": "建筑与建材",
  "Construction materials, infrastructure products and industrial supplies.": "建筑材料、基础设施产品和工业用品。",
  "Furniture & Upholstery": "家具与软包材料",
  "Foam products, furniture components and upholstery materials.": "泡沫产品、家具部件和软包材料。",
  "Industrial Products": "工业产品",
  "Manufacturing supplies, engineering materials and industrial equipment.": "制造用品、工程材料和工业设备。",
  "Agriculture & Food Products": "农业与食品产品",
  "Agricultural commodities, packaged foods and specialty products.": "农产品、包装食品和特色产品。",
  "Consumer Goods": "消费品",
  "Household products, lifestyle products and retail merchandise.": "家居用品、生活方式产品和零售商品。",
  "Renewable Energy & Infrastructure": "可再生能源与基础设施",
  "Energy equipment, infrastructure materials and project procurement.": "能源设备、基础设施材料和项目采购。",
  "Why Choose Us": "为什么选择我们",
  "Reliable commercial execution, from supplier selection to delivery coordination.": "从供应商选择到交付协调，提供可靠的商业执行能力。",
  "Global Supplier Network": "全球供应商网络",
  "Established relationships with qualified suppliers worldwide.": "与全球合格供应商建立稳定合作关系。",
  "Competitive Pricing": "有竞争力的价格",
  "Efficient sourcing strategies that optimize procurement costs.": "通过高效寻源策略优化采购成本。",
  "Reliable Delivery": "可靠交付",
  "Professional logistics coordination and supply chain management.": "专业的物流协调与供应链管理。",
  "Industry Experience": "行业经验",
  "Strong understanding of international trade practices and commercial operations.": "深入理解国际贸易实践与商业运营。",
  "Customer-Centric Approach": "客户导向",
  "Tailored solutions designed around client requirements.": "围绕客户需求设计定制化解决方案。",
  "Projects & Success Stories": "项目与成功案例",
  "Representative support areas.": "代表性服务领域。",
  "Procurement": "采购",
  "International Procurement Support": "国际采购支持",
  "Delivered sourcing and procurement support for commercial and industrial purchasing requirements.": "为商业和工业采购需求提供寻源与采购支持。",
  "Operations": "运营",
  "Supply Chain Optimization": "供应链优化",
  "Helped improve procurement efficiency, supplier communication and delivery coordination.": "帮助提升采购效率、供应商沟通和交付协调能力。",
  "Market Access": "市场进入",
  "Export Market Development": "出口市场开发",
  "Supported Australian suppliers in identifying international market and distribution pathways.": "支持澳大利亚供应商识别国际市场与分销路径。",
  "Contact Us": "联系我们",
  "Start a sourcing, import or export enquiry.": "发起寻源、进口或出口咨询。",
  "Tell us what you need to source, export or coordinate. Everest Supplies Australia can help assess supplier options, procurement approach and logistics pathways.": "请告诉我们您需要寻源、出口或协调的内容。Everest Supplies Australia 可协助评估供应商选择、采购方式和物流路径。",
  "Headquarters: Melbourne, Australia": "总部：澳大利亚墨尔本",
  "International Trade": "国际贸易",
  "Import & Export Services": "进出口服务",
  "Procurement Solutions": "采购解决方案",
  "Name": "姓名",
  "Company": "公司",
  "Email": "邮箱",
  "Phone": "电话",
  "Country": "国家",
  "Inquiry Type": "咨询类型",
  "Select inquiry type": "请选择咨询类型",
  "Import Services": "进口服务",
  "Export Services": "出口服务",
  "Procurement Services": "采购服务",
  "Commercial Consulting": "商业咨询",
  "Message": "留言",
  "Submit Enquiry": "提交咨询",
  "Copyright © 2026. Everest Supplies. All Rights Reserved.": "版权所有 © 2026. Everest Supplies. 保留所有权利。",
};

const originalTextNodes = new WeakMap();
const translatedTitle = "Everest Supplies Australia | 全球贸易与供应链解决方案";
const translatedDescription = "Everest Supplies Australia 提供国际贸易、进口、出口、采购和供应链管理解决方案。";

function translateTextValue(value, language) {
  const trimmed = value.trim();
  if (!trimmed) return value;

  const original = zhTranslations[trimmed] ? trimmed : value;
  const translated = language === "zh" ? zhTranslations[trimmed] : null;
  return translated ? value.replace(trimmed, translated) : original;
}

function applyLanguage(language) {
  currentLanguage = language;
  setStoredLanguage(language);
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = language === "zh" ? translatedTitle : "Everest Supplies Australia | Global Trade & Supply Chain Solutions";
  document.querySelector("meta[name='description']").setAttribute(
    "content",
    language === "zh"
      ? translatedDescription
      : "Everest Supplies Australia provides international trade, import, export, procurement and supply chain management solutions."
  );

  const textNodes = [];
  function collectTextNodes(node) {
    if (node.nodeType === 3 && node.nodeValue.trim()) {
      textNodes.push(node);
      return;
    }
    if (node.nodeType !== 1 || ["SCRIPT", "STYLE"].includes(node.tagName)) {
      return;
    }
    node.childNodes.forEach(collectTextNodes);
  }
  collectTextNodes(document.body);

  textNodes.forEach((node) => {
    if (!originalTextNodes.has(node)) {
      originalTextNodes.set(node, node.nodeValue);
    }
    const original = originalTextNodes.get(node);
    node.nodeValue = language === "zh" ? translateTextValue(original, "zh") : original;
  });

  languageToggle.textContent = language === "zh" ? "EN" : "CN";
  languageToggle.setAttribute("aria-label", language === "zh" ? "Switch to English" : "Switch to Chinese");
}

window.applyEverestLanguage = applyLanguage;

function showTab(tabName, shouldScroll = true) {
  const activeTab = tabs.has(tabName) ? tabName : "home";

  document.body.dataset.activeTab = activeTab;
  tabContents.forEach((section) => {
    section.hidden = activeTab === "home" || section.dataset.tabContent !== activeTab;
  });
  tabLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeTab}`);
  });

  history.replaceState(null, "", `#${activeTab}`);

  if (shouldScroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function resetIdleHomeTimer() {
  window.clearTimeout(idleHomeTimer);
  idleHomeTimer = window.setTimeout(() => {
    showTab("home");
  }, idleHomeDelay);
}

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link) {
    const tabName = link.getAttribute("href").replace("#", "");
    event.preventDefault();
    showTab(tabName);
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

brandLink.addEventListener("click", (event) => {
  event.preventDefault();
  showTab("home");
});

window.addEventListener("hashchange", () => {
  showTab(location.hash.replace("#", "") || "home", false);
});

["click", "keydown", "touchstart", "scroll"].forEach((eventName) => {
  window.addEventListener(eventName, resetIdleHomeTimer, { passive: true });
});

contactForm.addEventListener("submit", () => {
  const data = new FormData(contactForm);
  formSubject.value = `Website enquiry - ${data.get("type") || "General"}`;
  formReplyTo.value = data.get("email") || "";
  formNext.value = `${window.location.origin}${window.location.pathname}#contact`;
  formStatus.textContent = currentLanguage === "zh" ? "正在提交咨询，请稍候。" : "Submitting your enquiry...";
});

showTab(location.hash.replace("#", "") || "home", true);
applyLanguage(currentLanguage);
resetIdleHomeTimer();

languageToggle.addEventListener("click", () => {
  applyLanguage(currentLanguage === "zh" ? "en" : "zh");
});
