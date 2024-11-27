const countryDetails = [
  { Country: "Afghanistan", ISOCode: "AFG", CurrencyCode: "AFN" },
  { Country: "Albania", ISOCode: "ALB", CurrencyCode: "ALL" },
  { Country: "Algeria", ISOCode: "DZA", CurrencyCode: "DZD" },
  { Country: "Andorra", ISOCode: "AND", CurrencyCode: "EUR" },
  { Country: "Angola", ISOCode: "AGO", CurrencyCode: "AOA" },
  { Country: "Antigua & Barbuda", ISOCode: "ATG", CurrencyCode: "XCD" },
  { Country: "Argentina", ISOCode: "ARG", CurrencyCode: "ARS" },
  { Country: "Armenia", ISOCode: "ARM", CurrencyCode: "AMD" },
  { Country: "Australia", ISOCode: "AUS", CurrencyCode: "AUD" },
  { Country: "Austria", ISOCode: "AUT", CurrencyCode: "EUR" },
  { Country: "Azerbaijan", ISOCode: "AZE", CurrencyCode: "AZN" },
  { Country: "Bahamas", ISOCode: "BHS", CurrencyCode: "BSD" },
  { Country: "Bahrain", ISOCode: "BHR", CurrencyCode: "BHD" },
  { Country: "Bangladesh", ISOCode: "BGD", CurrencyCode: "BDT" },
  { Country: "Barbados", ISOCode: "BRB", CurrencyCode: "BBD" },
  { Country: "Belarus", ISOCode: "BLR", CurrencyCode: "BYN" },
  { Country: "Belgium", ISOCode: "BEL", CurrencyCode: "EUR" },
  { Country: "Belize", ISOCode: "BLZ", CurrencyCode: "BZD" },
  { Country: "Benin", ISOCode: "BEN", CurrencyCode: "XOF" },
  { Country: "Bhutan", ISOCode: "BTN", CurrencyCode: "BTN" },
  { Country: "Bolivia", ISOCode: "BOL", CurrencyCode: "BOB" },
  { Country: "Bosnia", ISOCode: "BIH", CurrencyCode: "BAM" },
  { Country: "Botswana", ISOCode: "BWA", CurrencyCode: "BWP" },
  { Country: "Brazil", ISOCode: "BRA", CurrencyCode: "BRL" },
  { Country: "Brunei", ISOCode: "BRN", CurrencyCode: "BND" },
  { Country: "Bulgaria", ISOCode: "BGR", CurrencyCode: "BGN" },
  { Country: "Burkina Faso", ISOCode: "BFA", CurrencyCode: "XOF" },
  { Country: "Burundi", ISOCode: "BDI", CurrencyCode: "BIF" },
  { Country: "Cambodia", ISOCode: "KHM", CurrencyCode: "KHR" },
  { Country: "Cameroon", ISOCode: "CMR", CurrencyCode: "XAF" },
  { Country: "Canada", ISOCode: "CAN", CurrencyCode: "CAD" },
  { Country: "Cape Verde", ISOCode: "CPV", CurrencyCode: "CVE" },
  {
    Country: "Central African Republic",
    ISOCode: "CAF",
    CurrencyCode: "XAF",
  },
  { Country: "Chad", ISOCode: "TCD", CurrencyCode: "XAF" },
  { Country: "Chile", ISOCode: "CHL", CurrencyCode: "CLP" },
  { Country: "China", ISOCode: "CHN", CurrencyCode: "CNY" },
  { Country: "Colombia", ISOCode: "COL", CurrencyCode: "COP" },
  { Country: "Comoros", ISOCode: "COM", CurrencyCode: "KMF" },
  {
    Country: "Congo (Democratic Republic)",
    ISOCode: "COD",
    CurrencyCode: "CDF",
  },
  { Country: "Congo (Republic)", ISOCode: "COG", CurrencyCode: "XAF" },
  { Country: "Costa Rica", ISOCode: "CRI", CurrencyCode: "CRC" },
  { Country: "Croatia", ISOCode: "HRV", CurrencyCode: "HRK" },
  { Country: "Cuba", ISOCode: "CUB", CurrencyCode: "CUP" },
  { Country: "Cyprus", ISOCode: "CYP", CurrencyCode: "EUR" },
  { Country: "Czech Republic", ISOCode: "CZE", CurrencyCode: "CZK" },
  { Country: "Denmark", ISOCode: "DNK", CurrencyCode: "DKK" },
  { Country: "Djibouti", ISOCode: "DJI", CurrencyCode: "DJF" },
  { Country: "Dominica", ISOCode: "DMA", CurrencyCode: "XCD" },
  {
    Country: "Dominican Republic",
    ISOCode: "DOM",
    CurrencyCode: "DOP",
  },
  { Country: "East Timor", ISOCode: "TLS", CurrencyCode: "USD" },
  { Country: "Ecuador", ISOCode: "ECU", CurrencyCode: "USD" },
  { Country: "Egypt", ISOCode: "EGY", CurrencyCode: "EGP" },
  { Country: "El Salvador", ISOCode: "SLV", CurrencyCode: "USD" },
  { Country: "Equatorial Guinea", ISOCode: "GNQ", CurrencyCode: "XAF" },
  { Country: "Eritrea", ISOCode: "ERI", CurrencyCode: "ERN" },
  { Country: "Estonia", ISOCode: "EST", CurrencyCode: "EUR" },
  { Country: "Eswatini", ISOCode: "SWZ", CurrencyCode: "SZL" },
  { Country: "Ethiopia", ISOCode: "ETH", CurrencyCode: "ETB" },
  { Country: "Fiji", ISOCode: "FJI", CurrencyCode: "FJD" },
  { Country: "Finland", ISOCode: "FIN", CurrencyCode: "EUR" },
  { Country: "France", ISOCode: "FRA", CurrencyCode: "EUR" },
  { Country: "Gabon", ISOCode: "GAB", CurrencyCode: "XAF" },
  { Country: "Gambia", ISOCode: "GMB", CurrencyCode: "GMD" },
  { Country: "Georgia", ISOCode: "GEO", CurrencyCode: "GEL" },
  { Country: "Germany", ISOCode: "DEU", CurrencyCode: "EUR" },
  { Country: "Ghana", ISOCode: "GHA", CurrencyCode: "GHS" },
  { Country: "Greece", ISOCode: "GRC", CurrencyCode: "EUR" },
  { Country: "Grenada", ISOCode: "GRD", CurrencyCode: "XCD" },
  { Country: "Guatemala", ISOCode: "GTM", CurrencyCode: "GTQ" },
  { Country: "Guinea", ISOCode: "GIN", CurrencyCode: "GNF" },
  { Country: "Guinea-Bissau", ISOCode: "GNB", CurrencyCode: "XOF" },
  { Country: "Guyana", ISOCode: "GUY", CurrencyCode: "GYD" },
  { Country: "Haiti", ISOCode: "HTI", CurrencyCode: "HTG" },
  { Country: "Honduras", ISOCode: "HND", CurrencyCode: "HNL" },
  { Country: "Hungary", ISOCode: "HUN", CurrencyCode: "HUF" },
  { Country: "Iceland", ISOCode: "ISL", CurrencyCode: "ISK" },
  { Country: "India", ISOCode: "IND", CurrencyCode: "INR" },
  { Country: "Indonesia", ISOCode: "IDN", CurrencyCode: "IDR" },
  { Country: "Iran", ISOCode: "IRN", CurrencyCode: "IRR" },
  { Country: "Iraq", ISOCode: "IRQ", CurrencyCode: "IQD" },
  { Country: "Ireland", ISOCode: "IRL", CurrencyCode: "EUR" },
  { Country: "Israel", ISOCode: "ISR", CurrencyCode: "ILS" },
  { Country: "Italy", ISOCode: "ITA", CurrencyCode: "EUR" },
  { Country: "Jamaica", ISOCode: "JAM", CurrencyCode: "JMD" },
  { Country: "Japan", ISOCode: "JPN", CurrencyCode: "JPY" },
  { Country: "Jordan", ISOCode: "JOR", CurrencyCode: "JOD" },
  { Country: "Kazakhstan", ISOCode: "KAZ", CurrencyCode: "KZT" },
  { Country: "Kenya", ISOCode: "KEN", CurrencyCode: "KES" },
  { Country: "Kiribati", ISOCode: "KIR", CurrencyCode: "AUD" },
  { Country: "North Korea", ISOCode: "PRK", CurrencyCode: "KPW" },
  { Country: "South Korea", ISOCode: "KOR", CurrencyCode: "KRW" },
  { Country: "Kuwait", ISOCode: "KWT", CurrencyCode: "KWD" },
  { Country: "Kyrgyzstan", ISOCode: "KGZ", CurrencyCode: "KGS" },
  { Country: "Laos", ISOCode: "LAO", CurrencyCode: "LAK" },
  { Country: "Latvia", ISOCode: "LVA", CurrencyCode: "EUR" },
  { Country: "Lebanon", ISOCode: "LBN", CurrencyCode: "LBP" },
  { Country: "Lesotho", ISOCode: "LSO", CurrencyCode: "LSL" },
  { Country: "Liberia", ISOCode: "LBR", CurrencyCode: "LRD" },
  { Country: "Libya", ISOCode: "LBY", CurrencyCode: "LYD" },
  { Country: "Liechtenstein", ISOCode: "LIE", CurrencyCode: "CHF" },
  { Country: "Lithuania", ISOCode: "LTU", CurrencyCode: "LTL" },
  { Country: "Luxembourg", ISOCode: "LUX", CurrencyCode: "EUR" },
  { Country: "Macedonia", ISOCode: "MKD", CurrencyCode: "MKD" },
  { Country: "Madagascar", ISOCode: "MDG", CurrencyCode: "MGA" },
  { Country: "Malawi", ISOCode: "MWI", CurrencyCode: "MWK" },
  { Country: "Malaysia", ISOCode: "MYS", CurrencyCode: "MYR" },
  { Country: "Maldives", ISOCode: "MDV", CurrencyCode: "MVR" },
  { Country: "Mali", ISOCode: "MLI", CurrencyCode: "XOF" },
  { Country: "Malta", ISOCode: "MLT", CurrencyCode: "EUR" },
  { Country: "Marshall Islands", ISOCode: "MHL", CurrencyCode: "USD" },
  { Country: "Mauritania", ISOCode: "MRT", CurrencyCode: "MRO" },
  { Country: "Mauritius", ISOCode: "MUS", CurrencyCode: "MUR" },
  { Country: "Mexico", ISOCode: "MEX", CurrencyCode: "MXN" },
  { Country: "Micronesia", ISOCode: "FSM", CurrencyCode: "USD" },
  { Country: "Moldova", ISOCode: "MDA", CurrencyCode: "MDL" },
  { Country: "Monaco", ISOCode: "MCO", CurrencyCode: "EUR" },
  { Country: "Mongolia", ISOCode: "MNG", CurrencyCode: "MNT" },
  { Country: "Montenegro", ISOCode: "MNE", CurrencyCode: "EUR" },
  { Country: "Morocco", ISOCode: "MAR", CurrencyCode: "MAD" },
  { Country: "Mozambique", ISOCode: "MOZ", CurrencyCode: "MZN" },
  { Country: "Myanmar", ISOCode: "MMR", CurrencyCode: "MMK" },
  { Country: "Namibia", ISOCode: "NAM", CurrencyCode: "NAD" },
  { Country: "Nauru", ISOCode: "NRU", CurrencyCode: "AUD" },
  { Country: "Nepal", ISOCode: "NPL", CurrencyCode: "NPR" },
  { Country: "Netherlands", ISOCode: "NLD", CurrencyCode: "EUR" },
  { Country: "New Zealand", ISOCode: "NZL", CurrencyCode: "NZD" },
  { Country: "Nicaragua", ISOCode: "NIC", CurrencyCode: "NIO" },
  { Country: "Niger", ISOCode: "NER", CurrencyCode: "XOF" },
  { Country: "Nigeria", ISOCode: "NGA", CurrencyCode: "NGN" },
  { Country: "Norway", ISOCode: "NOR", CurrencyCode: "NOK" },
  { Country: "Oman", ISOCode: "OMN", CurrencyCode: "OMR" },
  { Country: "Pakistan", ISOCode: "PAK", CurrencyCode: "PKR" },
  { Country: "Palau", ISOCode: "PLW", CurrencyCode: "USD" },
  { Country: "Panama", ISOCode: "PAN", CurrencyCode: "PAB" },
  { Country: "Papua New Guinea", ISOCode: "PNG", CurrencyCode: "PGK" },
  { Country: "Paraguay", ISOCode: "PRY", CurrencyCode: "PYG" },
  { Country: "Peru", ISOCode: "PER", CurrencyCode: "PEN" },
  { Country: "Philippines", ISOCode: "PHL", CurrencyCode: "PHP" },
  { Country: "Poland", ISOCode: "POL", CurrencyCode: "PLN" },
  { Country: "Portugal", ISOCode: "PRT", CurrencyCode: "EUR" },
  { Country: "Qatar", ISOCode: "QAT", CurrencyCode: "QAR" },
  { Country: "Romania", ISOCode: "ROU", CurrencyCode: "RON" },
  { Country: "Russia", ISOCode: "RUS", CurrencyCode: "RUB" },
  { Country: "Rwanda", ISOCode: "RWA", CurrencyCode: "RWF" },
  {
    Country: "Saint Kitts and Nevis",
    ISOCode: "KNA",
    CurrencyCode: "XCD",
  },
  { Country: "Saint Lucia", ISOCode: "LCA", CurrencyCode: "XCD" },
  {
    Country: "Saint Vincent and the Grenadines",
    ISOCode: "VCT",
    CurrencyCode: "XCD",
  },
  { Country: "Samoa", ISOCode: "WSM", CurrencyCode: "WST" },
  { Country: "San Marino", ISOCode: "SMR", CurrencyCode: "EUR" },
  {
    Country: "Sao Tome and Principe",
    ISOCode: "STP",
    CurrencyCode: "STD",
  },
  { Country: "Saudi Arabia", ISOCode: "SAU", CurrencyCode: "SAR" },
  { Country: "Senegal", ISOCode: "SEN", CurrencyCode: "XOF" },
  { Country: "Serbia", ISOCode: "SRB", CurrencyCode: "RSD" },
  { Country: "Seychelles", ISOCode: "SYC", CurrencyCode: "SCR" },
  { Country: "Sierra Leone", ISOCode: "SLE", CurrencyCode: "SLL" },
  { Country: "Singapore", ISOCode: "SGP", CurrencyCode: "SGD" },
  { Country: "Slovakia", ISOCode: "SVK", CurrencyCode: "EUR" },
  { Country: "Slovenia", ISOCode: "SVN", CurrencyCode: "EUR" },
  { Country: "Solomon Islands", ISOCode: "SLB", CurrencyCode: "SBD" },
  { Country: "Somalia", ISOCode: "SOM", CurrencyCode: "SOS" },
  { Country: "South Africa", ISOCode: "ZAF", CurrencyCode: "ZAR" },
  { Country: "South Sudan", ISOCode: "SSD", CurrencyCode: "SSP" },
  { Country: "Spain", ISOCode: "ESP", CurrencyCode: "EUR" },
  { Country: "Sri Lanka", ISOCode: "LKA", CurrencyCode: "LKR" },
  { Country: "Sudan", ISOCode: "SDN", CurrencyCode: "SDG" },
  { Country: "Suriname", ISOCode: "SUR", CurrencyCode: "SRD" },
  { Country: "Swaziland", ISOCode: "SWZ", CurrencyCode: "SZL" },
  { Country: "Sweden", ISOCode: "SWE", CurrencyCode: "SEK" },
  { Country: "Switzerland", ISOCode: "CHE", CurrencyCode: "CHF" },
  { Country: "Syria", ISOCode: "SYR", CurrencyCode: "SYP" },
  { Country: "Taiwan", ISOCode: "TWN", CurrencyCode: "TWD" },
  { Country: "Tajikistan", ISOCode: "TJK", CurrencyCode: "TJS" },
  { Country: "Tanzania", ISOCode: "TZA", CurrencyCode: "TZS" },
  { Country: "Thailand", ISOCode: "THA", CurrencyCode: "THB" },
  { Country: "Togo", ISOCode: "TGO", CurrencyCode: "XOF" },
  { Country: "Tonga", ISOCode: "TON", CurrencyCode: "TOP" },
  {
    Country: "Trinidad and Tobago",
    ISOCode: "TTO",
    CurrencyCode: "TTD",
  },
  { Country: "Tunisia", ISOCode: "TUN", CurrencyCode: "TND" },
  { Country: "Turkey", ISOCode: "TUR", CurrencyCode: "TRY" },
  { Country: "Turkmenistan", ISOCode: "TKM", CurrencyCode: "TMT" },
  { Country: "Tuvalu", ISOCode: "TUV", CurrencyCode: "AUD" },
  { Country: "Uganda", ISOCode: "UGA", CurrencyCode: "UGX" },
  { Country: "Ukraine", ISOCode: "UKR", CurrencyCode: "UAH" },
  {
    Country: "United Arab Emirates",
    ISOCode: "ARE",
    CurrencyCode: "AED",
  },
  { Country: "United Kingdom", ISOCode: "GBR", CurrencyCode: "GBP" },
  { Country: "United States", ISOCode: "USA", CurrencyCode: "USD" },
  { Country: "Uruguay", ISOCode: "URY", CurrencyCode: "UYU" },
  { Country: "Uzbekistan", ISOCode: "UZB", CurrencyCode: "UZS" },
  { Country: "Vanuatu", ISOCode: "VUT", CurrencyCode: "VUV" },
  { Country: "Vatican City", ISOCode: "VAT", CurrencyCode: "EUR" },
  { Country: "Venezuela", ISOCode: "VEN", CurrencyCode: "VEF" },
  { Country: "Vietnam", ISOCode: "VNM", CurrencyCode: "VND" },
  { Country: "Yemen", ISOCode: "YEM", CurrencyCode: "YER" },
  { Country: "Zambia", ISOCode: "ZMB", CurrencyCode: "ZMW" },
  { Country: "Zimbabwe", ISOCode: "ZWE", CurrencyCode: "ZWL" },
];

export { countryDetails };
