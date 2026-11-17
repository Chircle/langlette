/*
 * Langlette phrasebook — single source of truth for languages and phrases.
 *
 * Each language lists its phrases in the same order as PHRASES.
 * An entry is either:
 *   - "text"                     (Latin script, no romanization needed)
 *   - ["text", "romanization"]   (non-Latin script, with a pronunciation aid)
 *   - null                       (no common equivalent; shown as such in the UI)
 *
 * `tts` is the BCP-47 tag used to pick a speech-synthesis voice.
 * Run `npm run validate` after editing.
 */

export const PHRASES = [
  { id: "morning", de: "Guten Morgen" },
  { id: "thanks", de: "Danke" },
  { id: "please", de: "Bitte", hint: "als Bitte – „Ein Wasser, bitte“" },
  { id: "bye", de: "Auf Wiedersehen" },
  { id: "howAreYou", de: "Wie geht es dir?" },
  { id: "love", de: "Ich liebe dich" },
  { id: "cheers", de: "Prost!" },
  { id: "enjoyMeal", de: "Guten Appetit" },
  { id: "sorry", de: "Entschuldigung" },
  { id: "toilet", de: "Wo ist die Toilette?" },
];

export const LANGUAGES = [
  {
    code: "ja", tts: "ja-JP", de: "Japanisch", native: "日本語", regions: "Japan",
    phrases: [
      ["おはようございます", "Ohayō gozaimasu"],
      ["ありがとうございます", "Arigatō gozaimasu"],
      ["お願いします", "Onegai shimasu"],
      ["さようなら", "Sayōnara"],
      ["元気ですか？", "Genki desu ka?"],
      ["愛してる", "Aishiteru"],
      ["乾杯！", "Kanpai!"],
      ["いただきます", "Itadakimasu"],
      ["すみません", "Sumimasen"],
      ["トイレはどこですか？", "Toire wa doko desu ka?"],
    ],
  },
  {
    code: "is", tts: "is-IS", de: "Isländisch", native: "Íslenska", regions: "Island",
    phrases: [
      "Góðan daginn", "Takk", "Vinsamlegast", "Bless", "Hvernig hefur þú það?",
      "Ég elska þig", "Skál!", "Verði þér að góðu", "Afsakið", "Hvar er klósettið?",
    ],
  },
  {
    code: "sw", tts: "sw-KE", de: "Suaheli", native: "Kiswahili", regions: "Kenia, Tansania, Uganda",
    phrases: [
      "Habari za asubuhi", "Asante", "Tafadhali", "Kwaheri", "Habari yako?",
      "Nakupenda", "Afya!", "Karibu chakula", "Samahani", "Choo kiko wapi?",
    ],
  },
  {
    code: "fi", tts: "fi-FI", de: "Finnisch", native: "Suomi", regions: "Finnland",
    phrases: [
      "Hyvää huomenta", "Kiitos", "Ole hyvä", "Näkemiin", "Mitä kuuluu?",
      "Minä rakastan sinua", "Kippis!", "Hyvää ruokahalua!", "Anteeksi", "Missä on vessa?",
    ],
  },
  {
    code: "ko", tts: "ko-KR", de: "Koreanisch", native: "한국어", regions: "Südkorea, Nordkorea",
    phrases: [
      ["좋은 아침이에요", "Joeun achimieyo"],
      ["감사합니다", "Gamsahamnida"],
      ["부탁합니다", "Butakamnida"],
      ["안녕히 가세요", "Annyeonghi gaseyo"],
      ["잘 지내?", "Jal jinae?"],
      ["사랑해", "Saranghae"],
      ["건배!", "Geonbae!"],
      ["맛있게 드세요", "Masitge deuseyo"],
      ["죄송합니다", "Joesonghamnida"],
      ["화장실이 어디예요?", "Hwajangsiri eodiyeyo?"],
    ],
  },
  {
    code: "el", tts: "el-GR", de: "Griechisch", native: "Ελληνικά", regions: "Griechenland, Zypern",
    phrases: [
      ["Καλημέρα", "Kaliméra"],
      ["Ευχαριστώ", "Efcharistó"],
      ["Παρακαλώ", "Parakaló"],
      ["Αντίο", "Antío"],
      ["Τι κάνεις;", "Ti káneis?"],
      ["Σ' αγαπώ", "S' agapó"],
      ["Γεια μας!", "Geia mas!"],
      ["Καλή όρεξη!", "Kalí órexi!"],
      ["Συγγνώμη", "Signómi"],
      ["Πού είναι η τουαλέτα;", "Poú eínai i toualéta?"],
    ],
  },
  {
    code: "hi", tts: "hi-IN", de: "Hindi", native: "हिन्दी", regions: "Indien",
    phrases: [
      ["सुप्रभात", "Suprabhāt"],
      ["धन्यवाद", "Dhanyavād"],
      ["कृपया", "Kripayā"],
      ["फिर मिलेंगे", "Phir milenge"],
      ["तुम कैसे हो?", "Tum kaise ho?"],
      ["मैं तुमसे प्यार करता हूँ", "Main tumse pyār kartā hūn"],
      ["चियर्स!", "Chiyars!"],
      ["खाने का आनंद लीजिए", "Khāne kā ānand lījie"],
      ["माफ़ कीजिए", "Māf kījie"],
      ["शौचालय कहाँ है?", "Shauchālay kahān hai?"],
    ],
  },
  {
    code: "tr", tts: "tr-TR", de: "Türkisch", native: "Türkçe", regions: "Türkei, Zypern",
    phrases: [
      "Günaydın", "Teşekkürler", "Lütfen", "Hoşça kal", "Nasılsın?",
      "Seni seviyorum", "Şerefe!", "Afiyet olsun!", "Affedersiniz", "Tuvalet nerede?",
    ],
  },
  {
    code: "vi", tts: "vi-VN", de: "Vietnamesisch", native: "Tiếng Việt", regions: "Vietnam",
    phrases: [
      "Chào buổi sáng", "Cảm ơn", "Làm ơn", "Tạm biệt", "Bạn khỏe không?",
      "Anh yêu em", "Cạn ly!", "Chúc ngon miệng!", "Xin lỗi", "Nhà vệ sinh ở đâu?",
    ],
  },
  {
    code: "cy", tts: "cy-GB", de: "Walisisch", native: "Cymraeg", regions: "Wales (Vereinigtes Königreich)",
    phrases: [
      "Bore da", "Diolch", "Os gwelwch yn dda", "Hwyl fawr", "Sut wyt ti?",
      "Dw i'n dy garu di", "Iechyd da!", "Mwynhewch eich bwyd!", "Esgusodwch fi", "Ble mae'r tŷ bach?",
    ],
  },
  {
    code: "mn", tts: "mn-MN", de: "Mongolisch", native: "Монгол хэл", regions: "Mongolei, China (Innere Mongolei)",
    phrases: [
      ["Өглөөний мэнд", "Öglöönii mend"],
      ["Баярлалаа", "Bayarlalaa"],
      ["Гуйя", "Guiya"],
      ["Баяртай", "Bayartai"],
      ["Сайн байна уу?", "Sain baina uu?"],
      ["Би чамд хайртай", "Bi chamd khairtai"],
      ["Эрүүл мэндийн төлөө!", "Erüül mendiin tölöö!"],
      ["Сайхан хооллоорой", "Saikhan khoollooroi"],
      ["Уучлаарай", "Uuchlaarai"],
      ["Жорлон хаана байна вэ?", "Jorlon khaana baina ve?"],
    ],
  },
  {
    code: "th", tts: "th-TH", de: "Thailändisch", native: "ภาษาไทย", regions: "Thailand",
    phrases: [
      ["อรุณสวัสดิ์", "Arun sawat"],
      ["ขอบคุณ", "Khop khun"],
      ["กรุณา", "Karuna"],
      ["ลาก่อน", "La kon"],
      ["สบายดีไหม?", "Sabai di mai?"],
      ["ฉันรักเธอ", "Chan rak thoe"],
      ["ชนแก้ว!", "Chon kaeo!"],
      ["ทานให้อร่อย", "Than hai aroi"],
      ["ขอโทษ", "Kho thot"],
      ["ห้องน้ำอยู่ที่ไหน?", "Hong nam yu thi nai?"],
    ],
  },
  {
    code: "he", tts: "he-IL", de: "Hebräisch", native: "עברית", regions: "Israel",
    phrases: [
      ["בוקר טוב", "Boker tov"],
      ["תודה", "Toda"],
      ["בבקשה", "Bevakasha"],
      ["להתראות", "Lehitra'ot"],
      ["מה שלומך?", "Ma shlomkha?"],
      ["אני אוהב אותך", "Ani ohev otakh"],
      ["לחיים!", "LeChaim!"],
      ["בתיאבון!", "Bete'avon!"],
      ["סליחה", "Slicha"],
      ["איפה השירותים?", "Eifo ha-sherutim?"],
    ],
  },
  {
    code: "zu", tts: "zu-ZA", de: "Zulu", native: "isiZulu", regions: "Südafrika",
    phrases: [
      "Sawubona", "Ngiyabonga", "Ngiyacela", "Sala kahle", "Unjani?",
      "Ngiyakuthanda", "Oogqayinyanga!", "Thokozela ukudla kwakho", "Uxolo", "Iphi indlu yangasese?",
    ],
  },
  {
    code: "no", tts: "nb-NO", de: "Norwegisch", native: "Norsk", regions: "Norwegen",
    phrases: [
      "God morgen", "Takk", "Vær så snill", "Ha det bra", "Hvordan har du det?",
      "Jeg elsker deg", "Skål!", "God appetitt!", "Unnskyld", "Hvor er toalettet?",
    ],
  },
  {
    code: "pl", tts: "pl-PL", de: "Polnisch", native: "Polski", regions: "Polen",
    phrases: [
      "Dzień dobry", "Dziękuję", "Proszę", "Do widzenia", "Jak się masz?",
      "Kocham cię", "Na zdrowie!", "Smacznego!", "Przepraszam", "Gdzie jest toaleta?",
    ],
  },
  {
    code: "hu", tts: "hu-HU", de: "Ungarisch", native: "Magyar", regions: "Ungarn, Rumänien, Serbien",
    phrases: [
      "Jó reggelt", "Köszönöm", "Kérem", "Viszontlátásra", "Hogy vagy?",
      "Szeretlek", "Egészségedre!", "Jó étvágyat!", "Elnézést", "Hol van a mosdó?",
    ],
  },
  {
    code: "eu", tts: "eu-ES", de: "Baskisch", native: "Euskara", regions: "Spanien, Frankreich",
    phrases: [
      "Egun on", "Eskerrik asko", "Mesedez", "Agur", "Zer moduz?",
      "Maite zaitut", "Topa!", "On egin!", "Barkatu", "Non dago komuna?",
    ],
  },
  {
    code: "am", tts: "am-ET", de: "Amharisch", native: "አማርኛ", regions: "Äthiopien",
    phrases: [
      ["እንደምን አደሩ", "Endemin aderu"],
      ["አመሰግናለሁ", "Ameseginalehu"],
      ["እባክዎ", "Ebakwo"],
      ["ደህና ሁን", "Dehna hun"],
      ["እንዴት ነህ?", "Endet neh?"],
      ["እወድሃለሁ", "Ewedihalehu"],
      ["ለጤናችን!", "Letenachin!"],
      ["መልካም ምግብ", "Melkam megeb"],
      ["ይቅርታ", "Yiqirta"],
      ["ሽንት ቤት የት ነው?", "Shint bet yet new?"],
    ],
  },
  {
    code: "ms", tts: "ms-MY", de: "Malaiisch", native: "Bahasa Melayu", regions: "Malaysia, Brunei, Singapur",
    phrases: [
      "Selamat pagi", "Terima kasih", "Tolong", "Selamat tinggal", "Apa khabar?",
      "Saya cintakan awak", "Bersulang!", "Selamat menjamu selera", "Maaf", "Di mana tandas?",
    ],
  },
  {
    code: "ka", tts: "ka-GE", de: "Georgisch", native: "ქართული", regions: "Georgien",
    phrases: [
      ["დილა მშვიდობისა", "Dila mshvidobisa"],
      ["გმადლობთ", "Gmadlobt"],
      ["თუ შეიძლება", "Tu sheidzleba"],
      ["ნახვამდის", "Nakhvamdis"],
      ["როგორ ხარ?", "Rogor khar?"],
      ["მიყვარხარ", "Miqvarkhar"],
      ["გაგვიმარჯოს!", "Gagvimarjos!"],
      ["გემრიელად მიირთვით", "Gemrielad miirtvit"],
      ["ბოდიში", "Bodishi"],
      ["სად არის ტუალეტი?", "Sad aris tualeti?"],
    ],
  },
  {
    code: "et", tts: "et-EE", de: "Estnisch", native: "Eesti", regions: "Estland",
    phrases: [
      "Tere hommikust", "Aitäh", "Palun", "Head aega", "Kuidas läheb?",
      "Ma armastan sind", "Terviseks!", "Head isu!", "Vabandust", "Kus on tualett?",
    ],
  },
  {
    code: "tl", tts: "fil-PH", de: "Tagalog", native: "Tagalog", regions: "Philippinen",
    phrases: [
      "Magandang umaga", "Salamat", "Pakiusap", "Paalam", "Kumusta ka?",
      "Mahal kita", "Tagay!", "Kain tayo!", "Paumanhin", "Nasaan ang banyo?",
    ],
  },
  {
    code: "hy", tts: "hy-AM", de: "Armenisch", native: "Հայերեն", regions: "Armenien",
    phrases: [
      ["Բարի լույս", "Bari luys"],
      ["Շնորհակալություն", "Shnorhakalutyun"],
      ["Խնդրում եմ", "Khndrum em"],
      ["Ցտեսություն", "Tstesutyun"],
      ["Ինչպե՞ս ես", "Inchpes es?"],
      ["Ես քեզ սիրում եմ", "Yes kez sirum em"],
      ["Կենացդ!", "Kenatsd!"],
      ["Բարի ախորժակ", "Bari akhorzhak"],
      ["Ներողություն", "Neroghutyun"],
      ["Որտե՞ղ է զուգարանը", "Vortegh e zugarany?"],
    ],
  },
  {
    code: "ca", tts: "ca-ES", de: "Katalanisch", native: "Català", regions: "Spanien, Andorra",
    phrases: [
      "Bon dia", "Gràcies", "Si us plau", "Adéu", "Com estàs?",
      "T'estimo", "Salut!", "Bon profit!", "Perdó", "On és el lavabo?",
    ],
  },
  {
    code: "fa", tts: "fa-IR", de: "Persisch", native: "فارسی", regions: "Iran, Afghanistan, Tadschikistan",
    phrases: [
      ["صبح بخیر", "Sobh bekheir"],
      ["ممنون", "Mamnun"],
      ["لطفاً", "Lotfan"],
      ["خداحافظ", "Khodāhāfez"],
      ["حالت چطوره؟", "Hālet chetore?"],
      ["دوستت دارم", "Dustet dāram"],
      ["به سلامتی!", "Be salāmati!"],
      ["نوش جان!", "Nush-e jān!"],
      ["ببخشید", "Bebakhshid"],
      ["دستشویی کجاست؟", "Dastshuyi kojāst?"],
    ],
  },
  {
    code: "mi", tts: "mi-NZ", de: "Māori", native: "Te Reo Māori", regions: "Neuseeland",
    phrases: [
      "Mōrena", "Kia ora", "Tēnā koa", "Ka kite anō", "Kei te pēhea koe?",
      "Aroha ahau ki a koe", "Mauri ora!", "Kia pai tō kai!", "Aroha mai", "Kei hea te wharepaku?",
    ],
  },
  {
    code: "lt", tts: "lt-LT", de: "Litauisch", native: "Lietuvių", regions: "Litauen",
    phrases: [
      "Labas rytas", "Ačiū", "Prašau", "Viso gero", "Kaip sekasi?",
      "Aš tave myliu", "Į sveikatą!", "Gero apetito!", "Atsiprašau", "Kur yra tualetas?",
    ],
  },
  {
    code: "lv", tts: "lv-LV", de: "Lettisch", native: "Latviešu", regions: "Lettland",
    phrases: [
      "Labrīt", "Paldies", "Lūdzu", "Uz redzēšanos", "Kā tev iet?",
      "Es tevi mīlu", "Priekā!", "Labu apetīti!", "Atvainojiet", "Kur ir tualete?",
    ],
  },
  {
    code: "sq", tts: "sq-AL", de: "Albanisch", native: "Shqip", regions: "Albanien, Kosovo, Nordmazedonien",
    phrases: [
      "Mirëmëngjes", "Faleminderit", "Ju lutem", "Mirupafshim", "Si je?",
      "Të dua", "Gëzuar!", "Ju bëftë mirë!", "Më falni", "Ku është tualeti?",
    ],
  },
  {
    code: "bn", tts: "bn-BD", de: "Bengalisch", native: "বাংলা", regions: "Bangladesch, Indien",
    phrases: [
      ["সুপ্রভাত", "Suprabhat"],
      ["ধন্যবাদ", "Dhonnobad"],
      ["দয়া করে", "Doya kore"],
      ["বিদায়", "Biday"],
      ["কেমন আছ?", "Kemon acho?"],
      ["আমি তোমাকে ভালোবাসি", "Ami tomake bhalobashi"],
      ["চিয়ার্স!", "Chiyars!"],
      ["খাবার উপভোগ করুন", "Khabar upobhog korun"],
      ["দুঃখিত", "Dukkhito"],
      ["টয়লেট কোথায়?", "Toilet kothay?"],
    ],
  },
  {
    code: "ta", tts: "ta-IN", de: "Tamil", native: "தமிழ்", regions: "Indien, Sri Lanka, Singapur",
    phrases: [
      ["காலை வணக்கம்", "Kālai vaṇakkam"],
      ["நன்றி", "Nandri"],
      ["தயவுசெய்து", "Thayavuseythu"],
      ["போய் வருகிறேன்", "Pōy varugiṟēn"],
      ["எப்படி இருக்கிறாய்?", "Eppaḍi irukkiṟāy?"],
      ["நான் உன்னை காதலிக்கிறேன்", "Nān unnai kādhalikkiṟēn"],
      ["சியர்ஸ்!", "Chiyars!"],
      ["நன்றாக சாப்பிடுங்கள்", "Nandrāga sāppiḍungaḷ"],
      ["மன்னிக்கவும்", "Mannikkavum"],
      ["கழிப்பறை எங்கே?", "Kazhipparai engē?"],
    ],
  },
  {
    code: "hr", tts: "hr-HR", de: "Kroatisch", native: "Hrvatski", regions: "Kroatien, Bosnien und Herzegowina",
    phrases: [
      "Dobro jutro", "Hvala", "Molim", "Doviđenja", "Kako si?",
      "Volim te", "Živjeli!", "Dobar tek!", "Oprostite", "Gdje je WC?",
    ],
  },
  {
    code: "sl", tts: "sl-SI", de: "Slowenisch", native: "Slovenščina", regions: "Slowenien",
    phrases: [
      "Dobro jutro", "Hvala", "Prosim", "Nasvidenje", "Kako si?",
      "Ljubim te", "Na zdravje!", "Dober tek!", "Oprostite", "Kje je stranišče?",
    ],
  },
  {
    code: "sr", tts: "sr-RS", de: "Serbisch", native: "Српски", regions: "Serbien, Bosnien und Herzegowina, Montenegro",
    phrases: [
      ["Добро јутро", "Dobro jutro"],
      ["Хвала", "Hvala"],
      ["Молим", "Molim"],
      ["Довиђења", "Doviđenja"],
      ["Како си?", "Kako si?"],
      ["Волим те", "Volim te"],
      ["Живели!", "Živeli!"],
      ["Пријатно!", "Prijatno!"],
      ["Извините", "Izvinite"],
      ["Где је тоалет?", "Gde je toalet?"],
    ],
  },
  {
    code: "mg", tts: "mg-MG", de: "Malagasy", native: "Malagasy", regions: "Madagaskar",
    phrases: [
      "Manao ahoana", "Misaotra", "Azafady", "Veloma", "Manao ahoana ianao?",
      "Tiako ianao", "Ho salama!", "Mazotoa homana!", "Miala tsiny", "Aiza ny trano fivoahana?",
    ],
  },
  {
    code: "so", tts: "so-SO", de: "Somali", native: "Soomaali", regions: "Somalia, Dschibuti, Äthiopien",
    phrases: [
      "Subax wanaagsan", "Mahadsanid", "Fadlan", "Nabad gelyo", "Iska warran?",
      "Waan ku jeclahay", "Caafimaad!", "Cunto wanaagsan!", "Waan ka xumahay", "Meeday musqusha?",
    ],
  },
  {
    code: "km", tts: "km-KH", de: "Khmer", native: "ខ្មែរ", regions: "Kambodscha",
    phrases: [
      ["អរុណសួស្តី", "Arun suosdei"],
      ["អរគុណ", "Akun"],
      ["សូម", "Soum"],
      ["លាហើយ", "Lea haey"],
      ["សុខសប្បាយទេ?", "Sok sabay te?"],
      ["ខ្ញុំស្រលាញ់អ្នក", "Khnhom srolanh neak"],
      ["ជល់មួយ!", "Chol muoy!"],
      ["ញ៉ាំឲ្យបានឆ្ងាញ់", "Nham aoy ban chhnganh"],
      ["សុំទោស", "Som toh"],
      ["បង្គន់នៅឯណា?", "Bangkon nov ae na?"],
    ],
  },
  {
    code: "lo", tts: "lo-LA", de: "Laotisch", native: "ລາວ", regions: "Laos",
    phrases: [
      ["ສະບາຍດີຕອນເຊົ້າ", "Sabaidee ton xao"],
      ["ຂອບໃຈ", "Khop chai"],
      ["ກະລຸນາ", "Kaluna"],
      ["ລາກ່ອນ", "La kon"],
      ["ສະບາຍດີບໍ?", "Sabaidee bo?"],
      ["ຂ້ອຍຮັກເຈົ້າ", "Khoy hak chao"],
      ["ຕຳຈອກ!", "Tam chok!"],
      ["ກິນໃຫ້ແຊບເດີ້", "Kin hai saep doe"],
      ["ຂໍໂທດ", "Kho thot"],
      ["ຫ້ອງນ້ຳຢູ່ໃສ?", "Hong nam yu sai?"],
    ],
  },
  {
    code: "my", tts: "my-MM", de: "Birmanisch", native: "မြန်မာစာ", regions: "Myanmar",
    phrases: [
      ["မင်္ဂလာနံနက်ခင်းပါ", "Mingalaba nanet khin ba"],
      ["ကျေးဇူးတင်ပါတယ်", "Kyay zu tin ba deh"],
      ["ကျေးဇူးပြု၍", "Kyay zu pyu ywe"],
      ["နောက်မှတွေ့မယ်", "Nauk hma twe meh"],
      ["နေကောင်းလား?", "Nay kaung la?"],
      ["ချစ်တယ်", "Chit teh"],
      ["ချီးယားစ်!", "Chiyars!"],
      ["စားလို့ကောင်းပါစေ", "Sa lo kaung ba zay"],
      ["ခွင့်လွှတ်ပါ", "Khwint hlut pa"],
      ["အိမ်သာ ဘယ်မှာလဲ?", "Ein tha beh hma leh?"],
    ],
  },
  {
    code: "ne", tts: "ne-NP", de: "Nepalesisch", native: "नेपाली", regions: "Nepal, Indien",
    phrases: [
      ["शुभ प्रभात", "Shubha prabhāt"],
      ["धन्यवाद", "Dhanyabād"],
      ["कृपया", "Kripayā"],
      ["फेरि भेटौँला", "Pheri bhetaunlā"],
      ["तिमीलाई कस्तो छ?", "Timilāi kasto chha?"],
      ["म तिमीलाई माया गर्छु", "Ma timilāi māyā garchhu"],
      ["चियर्स!", "Chiyars!"],
      ["मिठो गरी खानुहोस्", "Mitho gari khānuhos"],
      ["माफ गर्नुहोस्", "Māf garnuhos"],
      ["शौचालय कहाँ छ?", "Shauchālaya kahān chha?"],
    ],
  },
  {
    code: "si", tts: "si-LK", de: "Singhalesisch", native: "සිංහල", regions: "Sri Lanka",
    phrases: [
      ["සුබ උදෑසනක්", "Suba udæsanak"],
      ["ස්තූතියි", "Stūtiyi"],
      ["කරුණාකර", "Karuṇākara"],
      ["ගිහින් එන්නම්", "Gihin ennam"],
      ["කොහොමද?", "Kohomada?"],
      ["මම ඔයාට ආදරෙයි", "Mama oyāṭa ādarei"],
      ["චියර්ස්!", "Chiyars!"],
      ["හොඳින් කන්න", "Hondin kanna"],
      ["සමාවෙන්න", "Samāwenna"],
      ["වැසිකිළිය කොහෙද?", "Wæsikiḷiya koheda?"],
    ],
  },
  {
    code: "kk", tts: "kk-KZ", de: "Kasachisch", native: "Қазақ тілі", regions: "Kasachstan, China, Mongolei",
    phrases: [
      ["Қайырлы таң", "Qaiyrly tañ"],
      ["Рахмет", "Rakhmet"],
      ["Өтінемін", "Ötinemin"],
      ["Сау болыңыз", "Sau bolyñyz"],
      ["Қалайсың?", "Qalaisyñ?"],
      ["Мен сені жақсы көремін", "Men seni jaqsy köremin"],
      ["Денсаулығыңыз үшін!", "Densaulyğyñyz üşin!"],
      ["Ас болсын!", "As bolsyn!"],
      ["Кешіріңіз", "Keşiriñiz"],
      ["Дәретхана қайда?", "Däretkhana qaida?"],
    ],
  },
  {
    code: "uz", tts: "uz-UZ", de: "Usbekisch", native: "Oʻzbek", regions: "Usbekistan, Afghanistan",
    phrases: [
      "Xayrli tong", "Rahmat", "Iltimos", "Xayr", "Qalaysan?",
      "Men seni sevaman", "Salomatlik uchun!", "Yoqimli ishtaha!", "Kechirasiz", "Hojatxona qayerda?",
    ],
  },
  {
    code: "az", tts: "az-AZ", de: "Aserbaidschanisch", native: "Azərbaycan", regions: "Aserbaidschan, Iran",
    phrases: [
      "Sabahınız xeyir", "Təşəkkür edirəm", "Zəhmət olmasa", "Görüşənədək", "Necəsən?",
      "Səni sevirəm", "Sağlığınıza!", "Nuş olsun!", "Bağışlayın", "Tualet haradadır?",
    ],
  },
  {
    code: "xh", tts: "xh-ZA", de: "Xhosa", native: "isiXhosa", regions: "Südafrika",
    phrases: [
      "Molo", "Enkosi", "Nceda", "Sala kakuhle", "Unjani?",
      "Ndiyakuthanda", "Oogqayinyanga!", "Ukutya okumnandi!", "Uxolo", "Iphi indlu yangasese?",
    ],
  },
  {
    code: "yo", tts: "yo-NG", de: "Yoruba", native: "Yorùbá", regions: "Nigeria, Benin, Togo",
    phrases: [
      "Ẹ káàárọ̀", "Ẹ ṣé", "Jọ̀wọ́", "Ó dàbọ̀", "Báwo ni?",
      "Mo nífẹ̀ẹ́ rẹ", "Ìlera!", "Ẹ jẹun dáadáa", "Ẹ má bínú", "Níbo ni ilé ìgbọ̀nsẹ̀ wà?",
    ],
  },
  {
    code: "fo", tts: "fo-FO", de: "Färöisch", native: "Føroyskt", regions: "Färöer, Dänemark",
    phrases: [
      "Góðan morgun", "Takk fyri", "Vinarliga", "Farvæl", "Hvussu hevur tú tað?",
      "Eg elski teg", "Skál!", "Væl gagnist!", "Orsaka", "Hvar er vesið?",
    ],
  },
  {
    code: "qu", tts: "qu-PE", de: "Quechua", native: "Runasimi", regions: "Peru, Bolivien, Ecuador",
    phrases: [
      "Allin p'unchaw", "Sulpayki", "Allichu", "Tupananchikkama", "Imaynallam kachkanki?",
      "Munakuyki", null, null, "Pampachaway", "Maypitaq baño?",
    ],
  },
  {
    code: "gn", tts: "gn-PY", de: "Guaraní", native: "Avañe'ẽ", regions: "Paraguay, Bolivien, Argentinien",
    phrases: [
      "Mba'éichapa ne ko'ẽ", "Aguyje", "Ikatúpa", "Jajohecha peve", "Mba'éichapa?",
      "Rohayhu", null, "Ekaru porã", "Ñyrõ", "Moõpa oĩ baño?",
    ],
  },
  {
    code: "sm", tts: "sm-WS", de: "Samoanisch", native: "Gagana Sāmoa", regions: "Samoa, Amerikanisch-Samoa",
    phrases: [
      "Manuia le taeao", "Faʻafetai", "Faʻamolemole", "Tōfā", "O ā mai ʻoe?",
      "Ou te alofa iā te ʻoe", "Manuia!", "Ia manuia le taumafataga", "Faʻamalie atu", "O fea le fale uila?",
    ],
  },
  {
    code: "bo", tts: "bo-CN", de: "Tibetisch", native: "བོད་སྐད", regions: "China (Tibet), Indien, Nepal",
    phrases: [
      ["ཞོགས་པ་བདེ་ལེགས།", "Shogpa delek"],
      ["ཐུགས་རྗེ་ཆེ།", "Thuk je che"],
      ["ཐུགས་རྗེ་གཟིགས།", "Thuk je zik"],
      ["ག་ལེར་ཕེབས།", "Kale phe"],
      ["ཁྱེད་རང་སྐུ་གཟུགས་བདེ་པོ་ཡིན་པས།", "Kherang kusuk depo yinpe?"],
      ["ང་ཁྱེད་རང་ལ་དགའ་པོ་ཡོད།", "Nga kherang la gawpo yö"],
      null,
      ["ཞལ་ལག་མཆོད་རོགས།", "Shelak chö rok"],
      ["དགོངས་དག", "Gongda"],
      ["གསང་སྤྱོད་ག་པར་ཡོད།", "Sangchö kaba yö?"],
    ],
  },
  {
    code: "ku", tts: "ku-TR", de: "Kurdisch (Kurmandschi)", native: "Kurdî", regions: "Türkei, Irak, Iran, Syrien",
    phrases: [
      "Beyanî baş", "Spas", "Ji kerema xwe", "Bi xatirê te", "Tu çawa yî?",
      "Ez ji te hez dikim", null, "Noşî can be!", "Bibore", "Tuwalet li ku ye?",
    ],
  },
  {
    code: "ps", tts: "ps-AF", de: "Paschtu", native: "پښتو", regions: "Afghanistan, Pakistan",
    phrases: [
      ["سهار مو پخير", "Sahār mo pa kheyr"],
      ["مننه", "Manana"],
      ["مهرباني وکړئ", "Mehrabāni wokṛəy"],
      ["په مخه دې ښه", "Pa makha de kha"],
      ["ته څنګه یې؟", "Ta tsanga ye?"],
      ["زه تا سره مینه لرم", "Za tā sara mina laram"],
      null,
      ["نوش جان", "Nosh-e jān"],
      ["بښنه غواړم", "Bakhkhana ghwāṛam"],
      ["تشناب چېرته دی؟", "Tashnāb cherta dai?"],
    ],
  },
  {
    code: "ur", tts: "ur-PK", de: "Urdu", native: "اردو", regions: "Pakistan, Indien",
    phrases: [
      ["صبح بخیر", "Subah bakhair"],
      ["شکریہ", "Shukriya"],
      ["براہ کرم", "Barah-e karam"],
      ["خدا حافظ", "Khuda hafiz"],
      ["تم کیسے ہو؟", "Tum kaise ho?"],
      ["میں تم سے پیار کرتا ہوں", "Main tum se pyar karta hoon"],
      ["چیئرز!", "Chiyars!"],
      ["نوش جان!", "Nosh-e jaan!"],
      ["معاف کیجیے", "Maaf kijiye"],
      ["ٹوائلٹ کہاں ہے؟", "Toilet kahan hai?"],
    ],
  },
  {
    code: "pa", tts: "pa-IN", de: "Punjabi", native: "ਪੰਜਾਬੀ", regions: "Indien, Pakistan",
    phrases: [
      ["ਸ਼ੁਭ ਸਵੇਰ", "Shubh saver"],
      ["ਧੰਨਵਾਦ", "Dhannvaad"],
      ["ਕਿਰਪਾ ਕਰਕੇ", "Kirpa karke"],
      ["ਫਿਰ ਮਿਲਾਂਗੇ", "Phir milange"],
      ["ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?", "Tusin kiven ho?"],
      ["ਮੈਂ ਤੈਨੂੰ ਪਿਆਰ ਕਰਦਾ ਹਾਂ", "Main tainu pyaar karda haan"],
      ["ਚੀਅਰਜ਼!", "Chiyarz!"],
      ["ਖਾਣੇ ਦਾ ਆਨੰਦ ਮਾਣੋ", "Khaane da anand maano"],
      ["ਮਾਫ਼ ਕਰਨਾ", "Maaf karna"],
      ["ਟਾਇਲਟ ਕਿੱਥੇ ਹੈ?", "Toilet kitthe hai?"],
    ],
  },
  {
    code: "gu", tts: "gu-IN", de: "Gujarati", native: "ગુજરાતી", regions: "Indien",
    phrases: [
      ["સુપ્રભાત", "Suprabhāt"],
      ["આભાર", "Ābhār"],
      ["કૃપા કરીને", "Kripā karīne"],
      ["આવજો", "Āvjo"],
      ["કેમ છો?", "Kem cho?"],
      ["હું તને પ્રેમ કરું છું", "Hun tane prem karun chhun"],
      ["ચિયર્સ!", "Chiyars!"],
      ["જમવાનો આનંદ માણો", "Jamvāno ānand māṇo"],
      ["માફ કરજો", "Māf karjo"],
      ["શૌચાલય ક્યાં છે?", "Shauchālay kyān chhe?"],
    ],
  },
  {
    code: "te", tts: "te-IN", de: "Telugu", native: "తెలుగు", regions: "Indien",
    phrases: [
      ["శుభోదయం", "Shubhodayam"],
      ["ధన్యవాదాలు", "Dhanyavādālu"],
      ["దయచేసి", "Dayachesi"],
      ["వెళ్ళొస్తాను", "Veḷḷostānu"],
      ["ఎలా ఉన్నావు?", "Elā unnāvu?"],
      ["నేను నిన్ను ప్రేమిస్తున్నాను", "Nēnu ninnu prēmistunnānu"],
      ["చీర్స్!", "Chīrs!"],
      ["బాగా తినండి", "Bāgā tinaṇḍi"],
      ["క్షమించండి", "Kshaminchaṇḍi"],
      ["మరుగుదొడ్డి ఎక్కడ ఉంది?", "Marugudoḍḍi ekkaḍa undi?"],
    ],
  },
  {
    code: "kn", tts: "kn-IN", de: "Kannada", native: "ಕನ್ನಡ", regions: "Indien",
    phrases: [
      ["ಶುಭೋದಯ", "Shubhodaya"],
      ["ಧನ್ಯವಾದಗಳು", "Dhanyavādagaḷu"],
      ["ದಯವಿಟ್ಟು", "Dayaviṭṭu"],
      ["ಹೋಗಿ ಬರುತ್ತೇನೆ", "Hōgi baruttēne"],
      ["ಹೇಗಿದ್ದೀಯ?", "Hēgiddīya?"],
      ["ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ", "Nānu ninnannu prītisuttēne"],
      ["ಚೀರ್ಸ್!", "Chīrs!"],
      ["ಚೆನ್ನಾಗಿ ಊಟ ಮಾಡಿ", "Chennāgi ūṭa māḍi"],
      ["ಕ್ಷಮಿಸಿ", "Kshamisi"],
      ["ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?", "Shauchālaya ellide?"],
    ],
  },
  {
    code: "ml", tts: "ml-IN", de: "Malayalam", native: "മലയാളം", regions: "Indien",
    phrases: [
      ["സുപ്രഭാതം", "Suprabhātam"],
      ["നന്ദി", "Nanni"],
      ["ദയവായി", "Dayavāyi"],
      ["പോയി വരാം", "Pōyi varām"],
      ["സുഖമാണോ?", "Sukhamāṇō?"],
      ["ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു", "Ñān ninne snēhikkunnu"],
      ["ചിയേഴ്സ്!", "Chiyērs!"],
      ["നന്നായി കഴിക്കൂ", "Nannāyi kazhikkū"],
      ["ക്ഷമിക്കണം", "Kshamikkaṇam"],
      ["ടോയ്‌ലറ്റ് എവിടെയാണ്?", "Ṭoylet evideyāṇ?"],
    ],
  },
  {
    code: "pt", tts: "pt-BR", de: "Portugiesisch", native: "Português", regions: "Brasilien, Portugal, Angola, Mosambik, Kap Verde und weitere",
    phrases: [
      "Bom dia", "Obrigado / Obrigada", "Por favor", "Tchau", "Tudo bem?",
      "Eu te amo", "Saúde!", "Bom apetite!", "Desculpe", "Onde fica o banheiro?",
    ],
  },
  {
    code: "es", tts: "es-ES", de: "Spanisch", native: "Español", regions: "Spanien, Lateinamerika, USA",
    phrases: [
      "Buenos días", "Gracias", "Por favor", "Adiós", "¿Cómo estás?",
      "Te quiero", "¡Salud!", "¡Buen provecho!", "Perdón", "¿Dónde está el baño?",
    ],
  },
  {
    code: "ru", tts: "ru-RU", de: "Russisch", native: "Русский", regions: "Russland, Belarus, Kasachstan, Kirgisistan",
    phrases: [
      ["Доброе утро", "Dobroye utro"],
      ["Спасибо", "Spasibo"],
      ["Пожалуйста", "Pozhaluysta"],
      ["До свидания", "Do svidaniya"],
      ["Как дела?", "Kak dela?"],
      ["Я тебя люблю", "Ya tebya lyublyu"],
      ["За здоровье!", "Za zdorovye!"],
      ["Приятного аппетита!", "Priyatnogo appetita!"],
      ["Извините", "Izvinite"],
      ["Где туалет?", "Gde tualet?"],
    ],
  },
  {
    code: "nl", tts: "nl-NL", de: "Niederländisch", native: "Nederlands", regions: "Niederlande, Belgien, Suriname",
    phrases: [
      "Goedemorgen", "Dank je wel", "Alsjeblieft", "Tot ziens", "Hoe gaat het?",
      "Ik hou van je", "Proost!", "Eet smakelijk!", "Sorry", "Waar is het toilet?",
    ],
  },
  {
    code: "zh", tts: "zh-CN", de: "Chinesisch (Mandarin)", native: "中文", regions: "China, Taiwan, Singapur, Malaysia",
    phrases: [
      ["早上好", "Zǎoshang hǎo"],
      ["谢谢", "Xièxie"],
      ["请", "Qǐng"],
      ["再见", "Zàijiàn"],
      ["你好吗？", "Nǐ hǎo ma?"],
      ["我爱你", "Wǒ ài nǐ"],
      ["干杯！", "Gānbēi!"],
      ["请慢用", "Qǐng màn yòng"],
      ["对不起", "Duìbuqǐ"],
      ["洗手间在哪里？", "Xǐshǒujiān zài nǎlǐ?"],
    ],
  },
  {
    code: "ar", tts: "ar-SA", de: "Arabisch", native: "العربية", regions: "Naher Osten, Nordafrika",
    phrases: [
      ["صباح الخير", "Sabāḥ al-khayr"],
      ["شكراً", "Shukran"],
      ["من فضلك", "Min faḍlak"],
      ["مع السلامة", "Maʿa as-salāma"],
      ["كيف حالك؟", "Kayfa ḥāluk?"],
      ["أحبك", "Uḥibbuk"],
      ["في صحتك!", "Fī ṣiḥḥatik!"],
      ["بالهناء والشفاء", "Bil-hanāʾ wash-shifāʾ"],
      ["عذراً", "ʿUdhran"],
      ["أين الحمام؟", "Ayna al-ḥammām?"],
    ],
  },

  /* ---------- neu hinzugefügt ---------- */
  {
    code: "en", tts: "en-GB", de: "Englisch", native: "English", regions: "Vereinigtes Königreich, USA, Kanada, Australien, Irland und weitere",
    phrases: [
      "Good morning", "Thank you", "Please", "Goodbye", "How are you?",
      "I love you", "Cheers!", "Enjoy your meal!", "Excuse me", "Where is the toilet?",
    ],
  },
  {
    code: "fr", tts: "fr-FR", de: "Französisch", native: "Français", regions: "Frankreich, Belgien, Schweiz, Kanada, West- und Zentralafrika",
    phrases: [
      "Bonjour", "Merci", "S'il vous plaît", "Au revoir", "Comment ça va ?",
      "Je t'aime", "Santé !", "Bon appétit !", "Excusez-moi", "Où sont les toilettes ?",
    ],
  },
  {
    code: "it", tts: "it-IT", de: "Italienisch", native: "Italiano", regions: "Italien, Schweiz, San Marino",
    phrases: [
      "Buongiorno", "Grazie", "Per favore", "Arrivederci", "Come stai?",
      "Ti amo", "Cin cin!", "Buon appetito!", "Scusi", "Dov'è il bagno?",
    ],
  },
  {
    code: "sv", tts: "sv-SE", de: "Schwedisch", native: "Svenska", regions: "Schweden, Finnland",
    phrases: [
      "God morgon", "Tack", "Snälla", "Hej då", "Hur mår du?",
      "Jag älskar dig", "Skål!", "Smaklig måltid!", "Ursäkta", "Var är toaletten?",
    ],
  },
  {
    code: "da", tts: "da-DK", de: "Dänisch", native: "Dansk", regions: "Dänemark, Grönland, Färöer",
    phrases: [
      "Godmorgen", "Tak", "Vær så venlig", "Farvel", "Hvordan har du det?",
      "Jeg elsker dig", "Skål!", "God appetit!", "Undskyld", "Hvor er toilettet?",
    ],
  },
  {
    code: "cs", tts: "cs-CZ", de: "Tschechisch", native: "Čeština", regions: "Tschechien",
    phrases: [
      "Dobré ráno", "Děkuji", "Prosím", "Na shledanou", "Jak se máš?",
      "Miluji tě", "Na zdraví!", "Dobrou chuť!", "Promiňte", "Kde je toaleta?",
    ],
  },
  {
    code: "sk", tts: "sk-SK", de: "Slowakisch", native: "Slovenčina", regions: "Slowakei",
    phrases: [
      "Dobré ráno", "Ďakujem", "Prosím", "Dovidenia", "Ako sa máš?",
      "Ľúbim ťa", "Na zdravie!", "Dobrú chuť!", "Prepáčte", "Kde je toaleta?",
    ],
  },
  {
    code: "ro", tts: "ro-RO", de: "Rumänisch", native: "Română", regions: "Rumänien, Moldau",
    phrases: [
      "Bună dimineața", "Mulțumesc", "Te rog", "La revedere", "Ce mai faci?",
      "Te iubesc", "Noroc!", "Poftă bună!", "Scuzați-mă", "Unde este toaleta?",
    ],
  },
  {
    code: "bg", tts: "bg-BG", de: "Bulgarisch", native: "Български", regions: "Bulgarien",
    phrases: [
      ["Добро утро", "Dobro utro"],
      ["Благодаря", "Blagodarya"],
      ["Моля", "Molya"],
      ["Довиждане", "Dovizhdane"],
      ["Как си?", "Kak si?"],
      ["Обичам те", "Obicham te"],
      ["Наздраве!", "Nazdrave!"],
      ["Добър апетит!", "Dobar apetit!"],
      ["Извинете", "Izvinete"],
      ["Къде е тоалетната?", "Kade e toaletnata?"],
    ],
  },
  {
    code: "uk", tts: "uk-UA", de: "Ukrainisch", native: "Українська", regions: "Ukraine",
    phrases: [
      ["Доброго ранку", "Dobroho ranku"],
      ["Дякую", "Dyakuyu"],
      ["Будь ласка", "Bud' laska"],
      ["До побачення", "Do pobachennya"],
      ["Як справи?", "Yak spravy?"],
      ["Я тебе кохаю", "Ya tebe kokhayu"],
      ["Будьмо!", "Bud'mo!"],
      ["Смачного!", "Smachnoho!"],
      ["Вибачте", "Vybachte"],
      ["Де туалет?", "De tualet?"],
    ],
  },
  {
    code: "id", tts: "id-ID", de: "Indonesisch", native: "Bahasa Indonesia", regions: "Indonesien",
    phrases: [
      "Selamat pagi", "Terima kasih", "Tolong", "Sampai jumpa", "Apa kabar?",
      "Aku cinta kamu", "Bersulang!", "Selamat makan!", "Permisi", "Di mana toiletnya?",
    ],
  },
  {
    code: "ga", tts: "ga-IE", de: "Irisch", native: "Gaeilge", regions: "Irland, Nordirland",
    phrases: [
      "Maidin mhaith", "Go raibh maith agat", "Le do thoil", "Slán", "Conas atá tú?",
      "Tá grá agam duit", "Sláinte!", "Bain taitneamh as do bhéile!", "Gabh mo leithscéal", "Cá bhfuil an leithreas?",
    ],
  },
  {
    code: "mt", tts: "mt-MT", de: "Maltesisch", native: "Malti", regions: "Malta",
    phrases: [
      "Bonġu", "Grazzi", "Jekk jogħġbok", "Saħħa", "Kif inti?",
      "Inħobbok", "Evviva!", "Ikla t-tajba!", "Skużani", "Fejn hu t-tojlit?",
    ],
  },
  {
    code: "lb", tts: "lb-LU", de: "Luxemburgisch", native: "Lëtzebuergesch", regions: "Luxemburg",
    phrases: [
      "Gudde Moien", "Merci", "Wann ech gelift", "Äddi", "Wéi geet et dir?",
      "Ech hunn dech gär", "Prost!", "Gudden Appetit!", "Entschëllegt", "Wou ass d'Toilette?",
    ],
  },
  {
    code: "ha", tts: "ha-NG", de: "Hausa", native: "Hausa", regions: "Nigeria, Niger, Ghana, Kamerun",
    phrases: [
      "Ina kwana", "Na gode", "Don Allah", "Sai an jima", "Yaya kake?",
      "Ina sonka", null, "A ci lafiya", "Yi haƙuri", "Ina bandaki yake?",
    ],
  },
  {
    code: "haw", tts: "haw-US", de: "Hawaiianisch", native: "ʻŌlelo Hawaiʻi", regions: "Hawaii (USA)",
    phrases: [
      "Aloha kakahiaka", "Mahalo", "E ʻoluʻolu", "A hui hou", "Pehea ʻoe?",
      "Aloha au iā ʻoe", "ʻŌkole maluna!", "E ʻai kākou!", "E kala mai", "Aia i hea ka lua?",
    ],
  },
  {
    code: "eo", tts: "eo", de: "Esperanto", native: "Esperanto", regions: "Plansprache, weltweit",
    phrases: [
      "Bonan matenon", "Dankon", "Bonvolu", "Ĝis revido", "Kiel vi fartas?",
      "Mi amas vin", "Je via sano!", "Bonan apetiton!", "Pardonon", "Kie estas la necesejo?",
    ],
  },
];

/** Normalised lookup: getPhrase(lang, index) → { text, romanization } | null */
export function getPhrase(language, index) {
  const entry = language?.phrases?.[index];
  if (!entry) return null;
  if (typeof entry === "string") return { text: entry, romanization: null };
  return { text: entry[0], romanization: entry[1] ?? null };
}
