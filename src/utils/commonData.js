const countries = [
  { code: "AD", label: "Andorra", phone: "+376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "+971",
  },
  { code: "AF", label: "Afghanistan", phone: "+93" },
  { code: "AQ", label: "Antarctica", phone: "+672" },
  { code: "AR", label: "Argentina", phone: "+54" },
  { code: "AT", label: "Austria", phone: "+43" },
  {
    code: "AU",
    label: "Australia",
    phone: "+61",
  },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    phone: "+387",
  },
  { code: "BD", label: "Bangladesh", phone: "+880" },
  { code: "BR", label: "Brazil", phone: "+55" },
  { code: "BT", label: "Bhutan", phone: "+975" },
  { code: "BV", label: "Bouvet Island", phone: "+47" },
  { code: "BW", label: "Botswana", phone: "+267" },
  { code: "BY", label: "Belarus", phone: "+375" },
  {
    code: "CA",
    label: "Canada",
    phone: "+1",
  },

  { code: "CH", label: "Switzerland", phone: "+41" },
  { code: "CM", label: "Cameroon", phone: "+237" },
  { code: "CN", label: "China", phone: "+86" },
  { code: "CO", label: "Colombia", phone: "+57" },
  {
    code: "DE",
    label: "Germany",
    phone: "+49",
  },
  { code: "DK", label: "Denmark", phone: "+45" },
  { code: "DZ", label: "Algeria", phone: "+213" },
  { code: "EG", label: "Egypt", phone: "+20" },
  { code: "ES", label: "Spain", phone: "+34" },

  { code: "FI", label: "Finland", phone: "+358" },
  { code: "FO", label: "Faroe Islands", phone: "+298" },
  {
    code: "FR",
    label: "France",
    phone: "+33",
    suggested: true,
  },
  { code: "GA", label: "Gabon", phone: "+241" },
  { code: "GB", label: "United Kingdom", phone: "+44" },
  { code: "GD", label: "Grenada", phone: "+1473" },
  { code: "GE", label: "Georgia", phone: "+995" },
  { code: "GF", label: "French Guiana", phone: "+594" },
  { code: "GG", label: "Guernsey", phone: "+44" },
  { code: "HK", label: "Hong Kong", phone: "+852" },
  { code: "ID", label: "Indonesia", phone: "+62" },
  { code: "IE", label: "Ireland", phone: "+353" },
  { code: "IL", label: "Israel", phone: "+972" },
  { code: "IN", label: "India", phone: "+91" },
  { code: "IQ", label: "Iraq", phone: "+964" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
    phone: "+98",
  },
  { code: "IS", label: "Iceland", phone: "+354" },
  { code: "IT", label: "Italy", phone: "+39" },
  { code: "JE", label: "Jersey", phone: "+44" },
  { code: "JO", label: "Jordan", phone: "+962" },
  {
    code: "JP",
    label: "Japan",
    phone: "+81",
    suggested: true,
  },
  { code: "KE", label: "Kenya", phone: "+254" },
  { code: "KG", label: "Kyrgyzstan", phone: "+996" },
  { code: "KH", label: "Cambodia", phone: "+855" },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
    phone: "+850",
  },
  { code: "KW", label: "Kuwait", phone: "+965" },
  { code: "KZ", label: "Kazakhstan", phone: "+7" },
  { code: "LK", label: "Sri Lanka", phone: "+94" },
  { code: "MG", label: "Madagascar", phone: "+261" },
  { code: "MH", label: "Marshall Islands", phone: "+692" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "+389",
  },
  { code: "MM", label: "Myanmar", phone: "+95" },
  { code: "MN", label: "Mongolia", phone: "+976" },
  { code: "MO", label: "Macao", phone: "+853" },
  { code: "MS", label: "Montserrat", phone: "+1664" },
  { code: "MV", label: "Maldives", phone: "+960" },
  { code: "MW", label: "Malawi", phone: "+265" },
  { code: "MX", label: "Mexico", phone: "+52" },
  { code: "MY", label: "Malaysia", phone: "+60" },
  { code: "NA", label: "Namibia", phone: "+264" },
  { code: "NL", label: "Netherlands", phone: "+31" },
  { code: "NO", label: "Norway", phone: "+47" },
  { code: "NP", label: "Nepal", phone: "+977" },
  { code: "NZ", label: "New Zealand", phone: "+64" },
  { code: "OM", label: "Oman", phone: "+968" },
  { code: "PF", label: "French Polynesia", phone: "+689" },
  { code: "PH", label: "Philippines", phone: "+63" },
  { code: "PK", label: "Pakistan", phone: "+92" },
  { code: "PL", label: "Poland", phone: "+48" },
  { code: "PT", label: "Portugal", phone: "+351" },
  { code: "QA", label: "Qatar", phone: "+974" },
  { code: "RS", label: "Serbia", phone: "+381" },
  { code: "RW", label: "Rwanda", phone: "+250" },
  { code: "SA", label: "Saudi Arabia", phone: "+966" },
  { code: "SB", label: "Solomon Islands", phone: "+677" },
  { code: "SD", label: "Sudan", phone: "+249" },
  { code: "SE", label: "Sweden", phone: "+46" },
  { code: "SG", label: "Singapore", phone: "+65" },
  { code: "SL", label: "Sierra Leone", phone: "+232" },
  { code: "SM", label: "San Marino", phone: "+378" },
  { code: "SN", label: "Senegal", phone: "+221" },
  { code: "SO", label: "Somalia", phone: "+252" },
  { code: "SR", label: "Suriname", phone: "+597" },
  { code: "SS", label: "South Sudan", phone: "+211" },

  { code: "SZ", label: "Swaziland", phone: "+268" },
  { code: "TG", label: "Togo", phone: "+228" },
  { code: "TH", label: "Thailand", phone: "+66" },
  { code: "TJ", label: "Tajikistan", phone: "+992" },
  { code: "TK", label: "Tokelau", phone: "+690" },
  { code: "TN", label: "Tunisia", phone: "+216" },
  { code: "TO", label: "Tonga", phone: "+676" },
  { code: "TR", label: "Turkey", phone: "+90" },
  {
    code: "TW",
    label: "Taiwan, Province of China",
    phone: "+886",
  },
  { code: "UA", label: "Ukraine", phone: "+380" },
  { code: "UG", label: "Uganda", phone: "+256" },
  {
    code: "US",
    label: "United States",
    phone: "+1",
    suggested: true,
  },
  { code: "UY", label: "Uruguay", phone: "+598" },
  { code: "UZ", label: "Uzbekistan", phone: "+998" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
    phone: "+379",
  },
  { code: "VE", label: "Venezuela", phone: "+58" },
  {
    code: "VI",
    label: "US Virgin Islands",
    phone: "+1340",
  },
  { code: "YE", label: "Yemen", phone: "+967" },
  { code: "ZA", label: "South Africa", phone: "+27" },
  { code: "ZW", label: "Zimbabwe", phone: "+263" },
];
const leadTopData=[
  "UNVETTED",
  "VETTED",
  "DEAD"
]
const sourceData=['WEBSITE','PHONE CALL','WHATSAPP','SUPPLIER']
const RatingData=['HOT','WARM','COLD']
const PrimarySaleData=['Distributor','Ecommerce','Retailer','Single Store Channel','WholeSaler','Broker','Other']
const AnnualTurnoverData=['Under $1M','$1M-$5M','$5M-$10M','$10M+']
const NumberEmployeeData=['1-10','10-50','50-100','100-250','250+']

const textEditorConfig = {
  showPlaceholder: false,
  useSearch: false,
  spellcheck: false,
  enter: "P",
  defaultMode: "1",
  toolbarAdaptive: false,
  toolbarSticky: false,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  addNewLineOnDBLClick: false,
  height: 200,
  minWidth: null,
  buttons:
    "paragraph,bold,underline,italic,|,|,|,superscript,subscript,|,ul,ol,|,align,undo,redo",
  editorCssClass: "alic",
  placeHolder: "",
};

const measurementList = [
  { id: 1, label: "ML" },
  { id: 2, label: "L" },
  { id: 3, label: "G" },
  { id: 4, label: "KG" },
  { id: 5, label: "LB(S)" },
  { id: 6, label: "OZ" },
  { id: 7, label: "CT" },
  { id: 8, label: "CAP(S)" },
  { id: 9, label: "UNIT(S)" },
];
const currency = ["USD", "CAD", "EUR", "GBP"];

const sampleRequestStatus = ["Pending", "In Progress", "Shipped", "Rejected"];

const quoteRequestClientStatus = [
  "Pending",
  "In Progress",
  "Ready",
  "Update",
  "Approved",
  "Rejected",
];

const quoteRequestStaffStatus = ["Pending", "In Progress", "Ready", "Update"];

export {
  countries,
  textEditorConfig,
  measurementList,
  currency,
  sampleRequestStatus,
  quoteRequestStaffStatus,
  quoteRequestClientStatus,
  leadTopData,
  sourceData,
  RatingData,
  PrimarySaleData,
  AnnualTurnoverData,
  NumberEmployeeData
};
