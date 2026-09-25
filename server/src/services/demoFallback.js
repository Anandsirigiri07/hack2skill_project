/**
 * LegalLens AI — Demo Fallback Engine
 * Provides grounded, pre-validated responses in English, Hindi, and Kannada
 * when external Gemini API quota is exhausted strictly in DEMO_MODE,
 * ensuring hackathon demonstrations are bulletproof.
 */

function getDemoAnalysisFallback(documentText, language = 'en') {
  if (language === 'hi') {
    return {
      document_type: 'आवासीय किराया / लीज समझौता',
      document_summary: '११ महीने की अवधि का आवासीय लीज समझौता जिसमें ₹२५,००० मासिक किराया, ६ महीने की सुरक्षा जमा राशि (₹१,५०,०००) और समय से पूर्व खाली करने पर ३ महीने का एकतरफा जुर्माना शामिल है।',
      overall_risk_level: 'high_concern',
      risk_score: 74,
      key_facts: {
        monthly_rent: '₹२५,००० प्रति माह',
        security_deposit: '₹१,५०,००० (६ माह का किराया)',
        duration: '११ महीने',
        start_date: '१ अक्टूबर २०२५',
        end_date: '३१ अगस्त २०२६',
        notice_period: '३ महीने का लिखित नोटिस',
        renewal_terms: '१५% की स्वतः वार्षिक वृद्धि',
        penalties: '₹५०० प्रतिदिन विलंब शुल्क',
        maintenance_responsibilities: 'किरायेदार सभी छोटी और बड़ी आंतरिक मरम्मत का खर्च वहन करेगा',
        termination_conditions: 'समय पूर्व खाली करने पर ३ महीने का पूरा किराया जब्त',
      },
      obligations: [
        { category: 'पैसे', icon: '💰', description: 'प्रत्येक महीने की १ तारीख को या उससे पहले ₹२५,००० मासिक किराया अनिवार्य रूप से चुकाएं', clause_number: 2 },
        { category: 'पैसे', icon: '🔒', description: 'मकान मालिक के पास ₹१,५०,००० की ब्याज-मुक्त सुरक्षा जमा राशि बनाए रखें', clause_number: 4 },
        { category: 'जिम्मेदारियां', icon: '🔧', description: 'परिसर के भीतर सभी छोटी और बड़ी मरम्मत का खर्च स्वयं वहन करें', clause_number: 5 },
        { category: 'प्रतिबंध', icon: '🚫', description: 'मकान मालिक बिना किसी पूर्व सूचना के किसी भी समय परिसर का निरीक्षण कर सकता है', clause_number: 7 },
      ],
      important_dates: [
        { event: 'किराया देय तिथि', date_or_period: 'प्रत्येक कैलेंडर माह की १ तारीख', clause_number: 2, details: 'भुगतान न होने पर तुरंत ₹५००/दिन का विलंब शुल्क शुरू होता है' },
        { event: 'लीज समाप्ति तिथि', date_or_period: '३१ अगस्त २०२६', clause_number: 1, details: '११ महीने के अनुबंध की अंतिम तिथि' },
        { event: 'जमा राशि वापसी विंडो', date_or_period: 'खाली करने के ४५ दिनों के भीतर', clause_number: 4, details: 'संयुक्त निरीक्षण के अधीन वापसी' },
      ],
      action_checklist: [
        { task: 'समय पूर्व खाली करने के दंड को ३ महीने से घटाकर १ महीने के लिए बातचीत करें', clause_number: 6, priority: 'high', advice: '३ महीने का किराया जब्त करने के बजाय ३० दिन के नोटिस की मांग करें।' },
        { task: 'मकान मालिक के निरीक्षण के लिए २४ घंटे की पूर्व लिखित सूचना की शर्त जोड़ें', clause_number: 7, priority: 'high', advice: 'बिना सूचना प्रवेश किरायेदार की निजता और शांतिपूर्ण उपभोग के अधिकार का उल्लंघन करता है।' },
        { task: 'वार्षिक किराया वृद्धि को १५% से घटाकर ५% से ८% तक सीमित करें', clause_number: 8, priority: 'medium', advice: '१५% बेंगलुरु के मानक बाजार मुद्रास्फीति से काफी अधिक है।' },
      ],
      clauses: [
        {
          clause_number: 1,
          category: 'duration',
          clause_text: 'TERM: The tenancy shall be for a duration of 11 months, ending on 31st August 2026.',
          plain_summary: 'मानक ११ महीने की आवासीय लीज अवधि।',
          simple_explanation: 'आप परिसर को ११ महीने के लिए किराये पर लेने की प्रतिबद्धता दे रहे हैं।',
          explanation: 'यह खंड किराये की अवधि तय करता है। भारत में अनिवार्य स्टाम्प शुल्क पंजीकरण से बचने के लिए ११ महीने की प्रथा सामान्य है।',
          risk_level: 'low_concern',
          risk_reason: 'शहरी किराया बाजारों में ११ महीने की मानक अवधि आम है।',
          user_impact: '३१ अगस्त २०२६ तक किरायेदारी के अधिकार प्रदान करता है।',
          suggested_question: 'क्या हम १०वें महीने में नवीनीकरण की प्रक्रिया की पुष्टि कर सकते हैं?',
          what: 'अगस्त २०२६ को समाप्त होने वाली ११ महीने की निश्चित लीज।',
          why: 'प्रचलित आवासीय पट्टा प्रथाओं के अनुरूप है।',
          where: 'खंड १',
          what_next: 'कैलेंडर में लीज समाप्ति की तिथि दर्ज करें।',
        },
        {
          clause_number: 2,
          category: 'rent_payments',
          clause_text: 'RENT: The Tenant agrees to pay monthly rent of INR 25,000 strictly on or before the 1st of every calendar month.',
          plain_summary: 'प्रत्येक माह की १ तारीख को ₹२५,००० का मासिक किराया देय है।',
          simple_explanation: 'किराया बिना किसी छूट अवधि के बिल्कुल पहली तारीख को देना होगा।',
          explanation: 'प्रत्येक कैलेंडर माह के पहले दिन ₹२५,००० के मासिक प्रतिफल का भुगतान अनिवार्य करता है।',
          risk_level: 'low_concern',
          risk_reason: 'मूल भुगतान दायित्व स्पष्ट रूप से बताया गया है।',
          user_impact: 'प्रति माह ₹२५,००० की अनिवार्य आवर्ती देनदारी।',
          suggested_question: 'क्या बैंक क्लीयरेंस के लिए ५ दिन की ग्रेस अवधि तय की जा सकती है?',
          what: 'प्रति माह ₹२५,००० का अनिवार्य भुगतान दायित्व।',
          why: 'परिसर के उपयोग का प्राथमिक वाणिज्यिक प्रतिफल।',
          where: 'खंड २',
          what_next: 'मासिक स्थानांतरण के लिए बैंक में स्टैंडिंग इंस्ट्रक्शन सेट करें।',
        },
        {
          clause_number: 3,
          category: 'other',
          clause_text: 'LATE FEE: If rent is not received by the 1st day, a late fee of INR 500 per day shall accrue until full payment is received.',
          plain_summary: 'पहले ही दिन से ₹५०० प्रतिदिन का भारी विलंब शुल्क।',
          simple_explanation: 'यदि किराये में १ दिन की भी देरी होती है, तो प्रतिदिन ₹५०० का जुर्माना लगेगा।',
          explanation: 'बिना किसी बैंकिंग छूट अवधि के तुरंत दैनिक विलंब शुल्क लागू करता है।',
          risk_level: 'needs_attention',
          risk_reason: 'छूट अवधि का अभाव सप्ताहांत बैंक छुट्टियों में अनुचित दंड का कारण बनता है।',
          user_impact: 'वेतन में १० दिन की देरी पर ₹५,००० का अनपेक्षित जुर्माना लगेगा।',
          suggested_question: 'क्या विलंब शुल्क शुरू होने से पहले ५ दिन की ग्रेस अवधि शामिल हो सकती है?',
          what: 'तत्काल ₹५०० प्रतिदिन का विलंब भुगतान जुर्माना।',
          why: 'बैंक अवकाश या वेतन प्रक्रिया के लिए कोई छूट नहीं दी गई है।',
          where: 'खंड ३',
          what_next: 'जुर्माना लगने से पहले ५ दिन की ग्रेस अवधि का प्रस्ताव रखें।',
        },
        {
          clause_number: 4,
          category: 'security_deposit',
          clause_text: 'SECURITY DEPOSIT: The Tenant shall pay an interest-free security deposit of INR 1,50,000 prior to possession. The deposit shall be returned within 45 days after peaceful handover.',
          plain_summary: '₹१,५०,००० की सुरक्षा जमा राशि, जो खाली करने के ४५ दिनों बाद वापसी योग्य है।',
          simple_explanation: 'आपको ₹१.५ लाख अग्रिम देने होंगे, और मकान मालिक को इसे लौटाने के लिए ४५ दिन का समय मिलेगा।',
          explanation: '६ महीने के किराये के बराबर ब्याज-मुक्त सुरक्षा जमा राशि अनिवार्य करता है, जिसकी वापसी ४५ दिनों बाद होगी।',
          risk_level: 'needs_attention',
          risk_reason: '४५ दिन की वापसी विंडो मानक १५-३० दिनों के बाजार मानक से अधिक लंबी है।',
          user_impact: 'अगले आवास में जाने के दौरान आपकी पूंजी लंबे समय तक फंसी रहेगी।',
          suggested_question: 'क्या चाबी सौंपने के १५-२० दिनों के भीतर वापसी का समय तय किया जा सकता है?',
          what: '४५ दिनों की वापसी विंडो के साथ ₹१,५०,००० की अग्रिम जमा राशि।',
          why: 'लंबी वापसी विंडो किरायेदार की महत्वपूर्ण पूंजी को रोकती है।',
          where: 'खंड ४',
          what_next: 'चाबियां सौंपने के १५ दिनों के भीतर जमा राशि वापसी का अनुरोध करें।',
        },
        {
          clause_number: 5,
          category: 'maintenance',
          clause_text: 'MAINTENANCE: The Tenant shall bear all minor and major repair costs within the leased premises.',
          plain_summary: 'किरायेदार सभी छोटी और बड़ी मरम्मत के लिए जिम्मेदार है।',
          simple_explanation: 'यदि पाइप, वायरिंग या छत में बड़ी खराबी आती है, तो भी आपको ही पूरा खर्च देना होगा।',
          explanation: 'संरचनात्मक और बड़ी मरम्मत का बोझ किरायेदार पर डालता है, जो मानक किराया कानूनों के विपरीत है।',
          risk_level: 'high_concern',
          risk_reason: 'बड़ी संरचनात्मक मरम्मत कानूनी और प्रथागत रूप से मकान मालिक की जिम्मेदारी होती है।',
          user_impact: 'पहले से मौजूद संरचनात्मक दोषों या रिसाव के लिए अप्रत्याशित वित्तीय देनदारी।',
          suggested_question: 'क्या यह निर्दिष्ट किया जा सकता है कि किरायेदार केवल ₹१,००० से कम की छोटी मरम्मत संभालेगा?',
          what: 'बड़ी संरचनात्मक मरम्मत लागत का एकतरफा किरायेदार पर हस्तांतरण।',
          why: 'अस्थायी किरायेदार पर भवन की संरचनात्मक मरम्मत का बोझ नहीं होना चाहिए।',
          where: 'खंड ५',
          what_next: 'किरायेदार की जिम्मेदारी को ₹१,००० तक की नियमित मरम्मत तक सीमित करें।',
        },
        {
          clause_number: 6,
          category: 'termination',
          clause_text: 'EARLY TERMINATION: If the Tenant vacates before the expiry of the 11-month term, the Tenant shall forfeit 3 months of rent as penalty.',
          plain_summary: 'समय पूर्व खाली करने पर ३ महीने का किराया (₹७५,०००) जब्त।',
          simple_explanation: 'यदि आपको जल्दी छोड़ना पड़े, तो आपको सजा के रूप में ३ महीने का पूरा किराया खोना होगा।',
          explanation: 'अग्रिम सूचना दिए जाने के बावजूद ₹७५,००० का भारी जुर्माना लगाता है।',
          risk_level: 'high_concern',
          risk_reason: 'मकान मालिक पर बिना किसी पारस्परिक दायित्व के दंडात्मक ३ महीने की जब्ती।',
          user_impact: 'अप्रत्याशित नौकरी स्थानांतरण की स्थिति में ₹७५,००० का सीधा वित्तीय नुकसान।',
          suggested_question: 'क्या इसे पारस्परिक ३० दिन के नोटिस और १ महीने के जुर्माने से बदला जा सकता है?',
          what: 'समय पूर्व समाप्ति के लिए ३ महीने के किराये की गंभीर जब्ती।',
          why: 'मकान मालिक की पारस्परिक प्रतिबद्धताओं के बिना अत्यधिक दंडात्मक और एकतरफा।',
          where: 'खंड ६',
          what_next: 'पारस्परिक १ महीने के नोटिस खंड को शामिल करने के लिए बातचीत करें।',
        },
        {
          clause_number: 7,
          category: 'privacy',
          clause_text: 'ENTRY: The Landlord reserves the unconditional right to enter and inspect the premises at any time without prior notification.',
          plain_summary: 'मकान मालिक बिना किसी सूचना के कभी भी घर में प्रवेश कर सकता है।',
          simple_explanation: 'मकान मालिक जब चाहे बिना बताए आपके किराये के घर में आ सकता है।',
          explanation: 'बिना पूर्व सूचना प्रवेश की अनुमति देकर किरायेदार की निजता और शांतिपूर्ण निवास के अधिकार का उल्लंघन करता है।',
          risk_level: 'high_concern',
          risk_reason: 'निजता और सुरक्षा के लिए गंभीर खतरा पैदा करता है।',
          user_impact: 'आपके किराये के घर में व्यक्तिगत निजता और सुरक्षा का पूर्ण अभाव।',
          suggested_question: 'क्या गैर-आपातकालीन निरीक्षण के लिए कम से कम २४ घंटे की पूर्व लिखित सूचना अनिवार्य की जा सकती है?',
          what: 'मकान मालिक का बिना सूचना प्रवेश का एकतरफा अधिकार।',
          why: 'किरायेदार की निजता और सुरक्षा का सीधा उल्लंघन।',
          where: 'खंड ७',
          what_next: 'सभी गैर-आपातकालीन दौरों के लिए २४ घंटे की पूर्व लिखित सूचना की मांग करें।',
        },
        {
          clause_number: 8,
          category: 'rent_increase',
          clause_text: 'RENEWAL: In the event of renewal, the monthly rent shall automatically increase by 15%.',
          plain_summary: 'नवीनीकरण पर किराये में १५% की अनिवार्य वृद्धि।',
          simple_explanation: 'यदि आप अगले वर्ष नवीनीकरण करते हैं, तो किराया तुरंत १५% बढ़कर ₹२८,७५० हो जाएगा।',
          explanation: '१५% की अत्यधिक वार्षिक वृद्धि तय करता है, जो प्रचलित ५-८% शहरी मानकों से काफी अधिक है।',
          risk_level: 'needs_attention',
          risk_reason: '१५% की वृद्धि प्रचलित ५% से ८% के महानगरीय मानकों से काफी ऊपर है।',
          user_impact: 'दूसरे वर्ष के नवीनीकरण पर किराया ₹२५,००० से बढ़कर सीधे ₹२८,७५० हो जाएगा।',
          suggested_question: 'क्या नवीनीकरण वृद्धि को मुद्रास्फीति के अनुसार ५% से ८% तक सीमित किया जा सकता है?',
          what: '१५% की स्वतः वार्षिक किराया वृद्धि।',
          why: 'मानक बाजार बेंचमार्क (५-८%) से अधिक है।',
          where: 'खंड ८',
          what_next: 'आपसी सहमति पर अधिकतम ८% वार्षिक वृद्धि सीमा का जवाबी प्रस्ताव रखें।',
        },
      ],
    };
  }

  if (language === 'kn') {
    return {
      document_type: 'ವಸತಿ ಬಾಡಿಗೆ / ಗುತ್ತಿಗೆ ಒಪ್ಪಂದ',
      document_summary: '೧೧ ತಿಂಗಳ ಅವಧಿಯ ವಸತಿ ಲೀಸ್ ಒಪ್ಪಂದ. ಇದರಲ್ಲಿ ₹೨೫,೦೦೦ ಮಾಸಿಕ ಬಾಡಿಗೆ, ೬ ತಿಂಗಳ ಭದ್ರತಾ ಠೇವಣಿ (₹೧,೫೦,೦೦೦) ಮತ್ತು ಅವಧಿಗೂ ಮುನ್ನ ಖಾಲಿ ಮಾಡಿದರೆ ೩ ತಿಂಗಳ ಏಕಪಕ್ಷೀಯ ದಂಡ ವಿಧಿಸಲಾಗಿದೆ.',
      overall_risk_level: 'high_concern',
      risk_score: 74,
      key_facts: {
        monthly_rent: '₹೨೫,೦೦೦ ಪ್ರತಿ ತಿಂಗಳು',
        security_deposit: '₹೧,೫೦,೦೦೦ (೬ ತಿಂಗಳ ಬಾಡಿಗೆ)',
        duration: '೧೧ ತಿಂಗಳುಗಳು',
        start_date: '೧ ಅಕ್ಟೋಬರ್ ೨೦೨೫',
        end_date: '೩೧ ಆಗಸ್ಟ್ ೨೦೨೬',
        notice_period: '೩ ತಿಂಗಳ ಲಿಖಿತ ನೋಟಿಸ್',
        renewal_terms: '೧೫% ರಷ್ಟು ಸ್ವಯಂಚಾಲಿತ ವಾರ್ಷಿಕ ಹೆಚ್ಚಳ',
        penalties: '₹೫೦೦ ಪ್ರತಿದಿನದ ವಿಳಂಬ ದಂಡ',
        maintenance_responsibilities: 'ಬಾಡಿಗೆದಾರರೇ ಎಲ್ಲಾ ಸಣ್ಣ ಮತ್ತು ದೊಡ್ಡ ಆಂತರಿಕ ರಿಪೇರಿ ವೆಚ್ಚವನ್ನು ಭರಿಸಬೇಕು',
        termination_conditions: 'ಅವಧಿಗೂ ಮುನ್ನ ಖಾಲಿ ಮಾಡಿದರೆ ೩ ತಿಂಗಳ ಪೂರ್ಣ ಬಾಡಿಗೆ ಮುಟ್ಟುಗೋಲು',
      },
      obligations: [
        { category: 'ಹಣ', icon: '💰', description: 'ಪ್ರತಿ ತಿಂಗಳ ೧ನೇ ತಾರೀಖಿನಂದು ಅಥವಾ ಅದಕ್ಕೂ ಮುನ್ನ ₹೨೫,೦೦೦ ಮಾಸಿಕ ಬಾಡಿಗೆಯನ್ನು ಕಡ್ಡಾಯವಾಗಿ ಪಾವತಿಸಿ', clause_number: 2 },
        { category: 'ಹಣ', icon: '🔒', description: 'ಮನೆ ಮಾಲೀಕರ ಬಳಿ ₹೧,೫೦,೦೦೦ ರ ಬಡ್ಡಿ ರಹಿತ ಭದ್ರತಾ ಠೇವಣಿಯನ್ನು ಕಾಯ್ದಿರಿಸಿ', clause_number: 4 },
        { category: 'ಜವಾಬ್ದಾರಿಗಳು', icon: '🔧', description: 'ಆವರಣದೊಳಗಿನ ಎಲ್ಲಾ ಸಣ್ಣ ಮತ್ತು ಪ್ರಮುಖ ರಿಪೇರಿ ವೆಚ್ಚಗಳನ್ನು ನೀವೇ ಭರಿಸಿ', clause_number: 5 },
        { category: 'ನಿರ್ಬಂಧಗಳು', icon: '🚫', description: 'ಮನೆ ಮಾಲೀಕರು ಯಾವುದೇ ಮುನ್ಸೂಚನೆ ಇಲ್ಲದೆ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಮನೆಗೆ ಭೇಟಿ ನೀಡಿ ತಪಾಸಣೆ ನಡೆಸಬಹುದು', clause_number: 7 },
      ],
      important_dates: [
        { event: 'ಬಾಡಿಗೆ ಪಾವತಿ ದಿನಾಂಕ', date_or_period: 'ಪ್ರತಿ ತಿಂಗಳ ೧ನೇ ತಾರೀಖು', clause_number: 2, details: 'ಪಾವತಿಸದಿದ್ದರೆ ತಕ್ಷಣ ₹೫೦೦/ದಿನದ ದಂಡ ಶುರುವಾಗುತ್ತದೆ' },
        { event: 'ಲೀಸ್ ಮುಕ್ತಾಯ ದಿನಾಂಕ', date_or_period: '೩೧ ಆಗಸ್ಟ್ ೨೦೨೬', clause_number: 1, details: '೧೧ ತಿಂಗಳ ಒಪ್ಪಂದದ ಅಂತಿಮ ದಿನಾಂಕ' },
        { event: 'ಠೇವಣಿ ಮರುಪಾವತಿ ಅವಧಿ', date_or_period: 'ಖಾಲಿ ಮಾಡಿದ ೪೫ ದಿನಗಳ ಒಳಗೆ', clause_number: 4, details: 'ಜಂಟಿ ಪರಿಶೀಲನೆಯ ನಂತರ ಮರುಪಾವತಿ' },
      ],
      action_checklist: [
        { task: 'ಅವಧಿಗೂ ಮುನ್ನ ಖಾಲಿ ಮಾಡುವ ದಂಡವನ್ನು ೩ ತಿಂಗಳಿಂದ ೧ ತಿಂಗಳಿಗೆ ಕಡಿಮೆ ಮಾಡಲು ಸಂಧಾನ ನಡೆಸಿ', clause_number: 6, priority: 'high', advice: '೩ ತಿಂಗಳ ಬಾಡಿಗೆ ಕಳೆದುಕೊಳ್ಳುವ ಬದಲು ೩೦ ದಿನಗಳ ಪರಸ್ಪರ ನೋಟಿಸ್ ನಿಯಮಕ್ಕೆ ಒತ್ತಾಯಿಸಿ.' },
        { task: 'ಮನೆ ಮಾಲೀಕರ ತಪಾಸಣೆಗೆ ೨೪ ಗಂಟೆಗಳ ಮುಂಚಿತ ಲಿಖಿತ ನೋಟಿಸ್ ನಿಯಮವನ್ನು ಸೇರಿಸಿ', clause_number: 7, priority: 'high', advice: 'ಮುನ್ಸೂಚನೆ ಇಲ್ಲದ ಭೇಟಿಯು ಬಾಡಿಗೆದಾರರ ಖಾಸಗಿತನ ಮತ್ತು ಹಕ್ಕುಗಳ ಉಲ್ಲಂಘನೆಯಾಗಿದೆ.' },
        { task: 'ವಾರ್ಷಿಕ ಬಾಡಿಗೆ ಹೆಚ್ಚಳವನ್ನು ೧೫% ರಿಂದ ೫%-೮% ಕ್ಕೆ ಸೀಮಿತಗೊಳಿಸಿ', clause_number: 8, priority: 'medium', advice: '೧೫% ಹೆಚ್ಚಳವು ಬೆಂಗಳೂರಿನ ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಮಾನದಂಡಕ್ಕಿಂತ ಹೆಚ್ಚಾಗಿದೆ.' },
      ],
      clauses: [
        {
          clause_number: 1,
          category: 'duration',
          clause_text: 'TERM: The tenancy shall be for a duration of 11 months, ending on 31st August 2026.',
          plain_summary: 'ಪ್ರಮಾಣಿತ ೧೧ ತಿಂಗಳ ವಸತಿ ಲೀಸ್ ಅವಧಿ.',
          simple_explanation: 'ನೀವು ಮನೆಯನ್ನು ೧೧ ತಿಂಗಳ ಅವಧಿಗೆ ಬಾಡಿಗೆಗೆ ಪಡೆಯಲು ಒಪ್ಪಿಕೊಳ್ಳುತ್ತಿದ್ದೀರಿ.',
          explanation: 'ಈ ಷರತ್ತು ಒಪ್ಪಂದದ ಅವಧಿಯನ್ನು ನಿಗದಿಪಡಿಸುತ್ತದೆ. ಸ್ಟ್ಯಾಂಪ್ ಡ್ಯೂಟಿ ನೋಂದಣಿಯನ್ನು ತಪ್ಪಿಸಲು ಭಾರತದಲ್ಲಿ ೧೧ ತಿಂಗಳ ಪದ್ಧತಿ ಸಾಮಾನ್ಯವಾಗಿದೆ.',
          risk_level: 'low_concern',
          risk_reason: 'ನಗರ ಪ್ರದೇಶಗಳಲ್ಲಿ ೧೧ ತಿಂಗಳ ಪ್ರಮಾಣಿತ ಅವಧಿ ಸಾಮಾನ್ಯವಾಗಿದೆ.',
          user_impact: '೩೧ ಆಗಸ್ಟ್ ೨೦೨೬ ರವರೆಗೆ ಬಾಡಿಗೆ ಹಕ್ಕುಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',
          suggested_question: '೧೦ನೇ ತಿಂಗಳಲ್ಲಿ ನವೀಕರಣ ಪ್ರಕ್ರಿಯೆಯನ್ನು ನಾವು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಬಹುದೇ?',
          what: 'ಆಗಸ್ಟ್ ೨೦೨೬ ಕ್ಕೆ ಮುಕ್ತಾಯಗೊಳ್ಳುವ ೧೧ ತಿಂಗಳ ನಿಗದಿತ ಗುತ್ತಿಗೆ.',
          why: 'ಪ್ರಸ್ತುತ ವಸತಿ ಗುತ್ತಿಗೆ ಪದ್ಧತಿಗಳಿಗೆ ಅನುಗುಣವಾಗಿದೆ.',
          where: 'ಷರತ್ತು ೧',
          what_next: 'ಕ್ಯಾಲೆಂಡರ್‌ನಲ್ಲಿ ಗುತ್ತಿಗೆ ಮುಕ್ತಾಯ ದಿನಾಂಕವನ್ನು ಗುರುತಿಸಿ.',
        },
        {
          clause_number: 2,
          category: 'rent_payments',
          clause_text: 'RENT: The Tenant agrees to pay monthly rent of INR 25,000 strictly on or before the 1st of every calendar month.',
          plain_summary: 'ಪ್ರತಿ ತಿಂಗಳ ೧ನೇ ತಾರೀಖಿನಂದು ₹೨೫,೦೦೦ ಮಾಸಿಕ ಬಾಡಿಗೆ ಪಾವತಿಸಬೇಕು.',
          simple_explanation: 'ಯಾವುದೇ ವಿನಾಯಿತಿ ಅವಧಿ ಇಲ್ಲದೆ ಮೊದಲ ದಿನವೇ ಬಾಡಿಗೆ ಪಾವತಿಸಬೇಕು.',
          explanation: 'ಪ್ರತಿ ತಿಂಗಳ ಮೊದಲ ದಿನವೇ ₹೨೫,೦೦೦ ಪಾವತಿಸುವುದನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸುತ್ತದೆ.',
          risk_level: 'low_concern',
          risk_reason: 'ಮೂಲ ಪಾವತಿ ಬದ್ಧತೆಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳಲಾಗಿದೆ.',
          user_impact: 'ಪ್ರತಿ ತಿಂಗಳು ₹೨೫,೦೦೦ ರ ಕಡ್ಡಾಯ ಆರ್ಥಿಕ ಬದ್ಧತೆ.',
          suggested_question: 'ಬ್ಯಾಂಕ್ ಕ್ಲಿಯರೆನ್ಸ್‌ಗಾಗಿ ೫ ದಿನಗಳ ಕಾಲಾವಕಾಶ ನೀಡಲು ಒಪ್ಪಬಹುದೇ?',
          what: 'ತಿಂಗಳಿಗೆ ₹೨೫,೦೦೦ ಪಾವತಿಸುವ ಕಡ್ಡಾಯ ಬಾಧ್ಯತೆ.',
          why: 'ಆಸ್ತಿಯನ್ನು ಬಳಸಲು ಮುಖ್ಯ ಆರ್ಥಿಕ ಪ್ರತಿಫಲ.',
          where: 'ಷರತ್ತು ೨',
          what_next: 'ಮಾಸಿಕ ವರ್ಗಾವಣೆಗೆ ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಸ್ಟ್ಯಾಂಡಿಂಗ್ ಇನ್‌ಸ್ಟ್ರಕ್ಷನ್ ನೀಡಿ.',
        },
        {
          clause_number: 3,
          category: 'other',
          clause_text: 'LATE FEE: If rent is not received by the 1st day, a late fee of INR 500 per day shall accrue until full payment is received.',
          plain_summary: 'ಮೊದಲ ದಿನದಿಂದಲೇ ಪ್ರತಿದಿನ ₹೫೦೦ ಭಾರೀ ವಿಳಂಬ ದಂಡ.',
          simple_explanation: 'ಬಾಡಿಗೆ ೧ ದಿನ ತಡವಾದರೂ ದಿನಕ್ಕೆ ₹೫೦೦ ರಂತೆ ದಂಡ ತೆರಬೇಕಾಗುತ್ತದೆ.',
          explanation: 'ಬ್ಯಾಂಕ್ ರಜೆಗಳ ರಿಯಾಯಿತಿ ಇಲ್ಲದೆ ತಕ್ಷಣವೇ ದಿನಂಪ್ರತಿ ದಂಡ ವಿಧಿಸುತ್ತದೆ.',
          risk_level: 'needs_attention',
          risk_reason: 'ಕಾಲಾವಕಾಶ ಇಲ್ಲದಿರುವುದು ವಾರಾಂತ್ಯದ ಬ್ಯಾಂಕ್ ರಜೆಗಳಲ್ಲಿ ಅನ್ಯಾಯದ ದಂಡಕ್ಕೆ ಕಾರಣವಾಗುತ್ತದೆ.',
          user_impact: 'ಸಂಬಳ ಬರುವುದು ೧೦ ದಿನ ತಡವಾದರೆ ₹೫,೦೦೦ ಹೆಚ್ಚುವರಿ ದಂಡ ಬೀಳುತ್ತದೆ.',
          suggested_question: 'ದಂಡ ವಿಧಿಸುವ ಮುನ್ನ ೫ ದಿನಗಳ ವಿನಾಯಿತಿ ಅವಧಿಯನ್ನು ಸೇರಿಸಬಹುದೇ?',
          what: 'ದಿನಕ್ಕೆ ₹೫೦೦ ರಂತೆ ತಕ್ಷಣದ ವಿಳಂಬ ಪಾವತಿ ದಂಡ.',
          why: 'ರಜೆಗಳು ಅಥವಾ ಸಂಬಳ ವಿಳಂಬಕ್ಕೆ ಯಾವುದೇ ವಿನಾಯಿತಿ ನೀಡಿಲ್ಲ.',
          where: 'ಷರತ್ತು ೩',
          what_next: 'ದಂಡಕ್ಕೆ ಮುನ್ನ ೫ ದಿನಗಳ ಕಾಲಾವಕಾಶ ನೀಡುವಂತೆ ಪ್ರಸ್ತಾಪಿಸಿ.',
        },
        {
          clause_number: 4,
          category: 'security_deposit',
          clause_text: 'SECURITY DEPOSIT: The Tenant shall pay an interest-free security deposit of INR 1,50,000 prior to possession. The deposit shall be returned within 45 days after peaceful handover.',
          plain_summary: '₹೧,೫೦,೦೦೦ ಭದ್ರತಾ ಠೇವಣಿ, ಮನೆ ಖಾಲಿ ಮಾಡಿದ ೪೫ ದಿನಗಳ ನಂತರ ಮರುಪಾವತಿ.',
          simple_explanation: 'ನೀವು ₹೧.೫ ಲಕ್ಷ ಮುಂಗಡ ನೀಡಬೇಕು ಮತ್ತು ಮಾಲೀಕರು ಹಿಂದಿರುಗಿಸಲು ೪೫ ದಿನ ತೆಗೆದುಕೊಳ್ಳಬಹುದು.',
          explanation: '೬ ತಿಂಗಳ ಬಾಡಿಗೆಗೆ ಸಮಾನವಾದ ಬಡ್ಡಿ ರಹಿತ ಭದ್ರತಾ ಠೇವಣಿಯನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸುತ್ತದೆ.',
          risk_level: 'needs_attention',
          risk_reason: '೪೫ ದಿನಗಳ ಅವಧಿಯು ಮಾರುಕಟ್ಟೆಯ ಸಾಮಾನ್ಯ ೧೫-೩೦ ದಿನಗಳ ಮಾನದಂಡಕ್ಕಿಂತ ಹೆಚ್ಚಾಗಿದೆ.',
          user_impact: 'ಮುಂದಿನ ಮನೆಗೆ ಸ್ಥಳಾಂತರಗೊಳ್ಳುವಾಗ ನಿಮ್ಮ ಹಣ ದೀರ್ಘಕಾಲದವರೆಗೆ ಸಿಲುಕಿಕೊಳ್ಳುತ್ತದೆ.',
          suggested_question: 'ಮನೆ ಹಸ್ತಾಂತರಿಸಿದ ೧೫-೨೦ ದಿನಗಳ ಒಳಗೆ ಠೇವಣಿ ಮರಳಿಸಲು ಸಾಧ್ಯವೇ?',
          what: '೪೫ ದಿನಗಳ ಮರುಪಾವತಿ ಅವಧಿಯೊಂದಿಗೆ ₹೧,೫೦,೦೦೦ ಮುಂಗಡ ಠೇವಣಿ.',
          why: 'ದೀರ್ಘ ಮರುಪಾವತಿ ಅವಧಿಯು ಬಾಡಿಗೆದಾರರ ದೊಡ್ಡ ಮೊತ್ತದ ಹಣವನ್ನು ಲಾಕ್ ಮಾಡುತ್ತದೆ.',
          where: 'ಷರತ್ತು ೪',
          what_next: 'ಕೀಲಿ ಹಸ್ತಾಂತರಿಸಿದ ೧೫ ದಿನಗಳ ಒಳಗೆ ಠೇವಣಿ ಮರಳಿಸಲು ಕೋರಿ.',
        },
        {
          clause_number: 5,
          category: 'maintenance',
          clause_text: 'MAINTENANCE: The Tenant shall bear all minor and major repair costs within the leased premises.',
          plain_summary: 'ಎಲ್ಲಾ ಸಣ್ಣ ಮತ್ತು ಪ್ರಮುಖ ರಿಪೇರಿಗಳಿಗೆ ಬಾಡಿಗೆದಾರರೇ ಜವಾಬ್ದಾರರು.',
          simple_explanation: 'ಗೋಡೆ, ಪೈಪ್ ಅಥವಾ ವೈರಿಂಗ್‌ನಲ್ಲಿ ದೊಡ್ಡ ಹಾನಿ ಉಂಟಾದರೂ ನೀವೇ ಸಂಪೂರ್ಣ ಹಣ ತೆರಬೇಕು.',
          explanation: 'ಕಟ್ಟಡದ ರಚನಾತ್ಮಕ ರಿಪೇರಿ ಹೊರೆಯನ್ನು ಬಾಡಿಗೆದಾರರ ಮೇಲೆ ಹೊರಿಸುತ್ತದೆ, ಇದು ಕಾನೂನಿಗೆ ವಿರುದ್ಧವಾಗಿದೆ.',
          risk_level: 'high_concern',
          risk_reason: 'ಪ್ರಮುಖ ರಚನಾತ್ಮಕ ರಿಪೇರಿಗಳು ಕಾನೂನುಬದ್ಧವಾಗಿ ಮಾಲೀಕರ ಜವಾಬ್ದಾರಿಯಾಗಿರುತ್ತವೆ.',
          user_impact: 'ಹಳೆಯ ದೋಷಗಳು ಅಥವಾ ಸೋರಿಕೆಗಳಿಗೆ ನೀವು ಅನಿರೀಕ್ಷಿತವಾಗಿ ದೊಡ್ಡ ಮೊತ್ತ ತೆರಬೇಕಾಗುತ್ತದೆ.',
          suggested_question: 'ಬಾಡಿಗೆದಾರರು ₹೧,೦೦೦ ಕ್ಕಿಂತ ಕಡಿಮೆ ಮೊತ್ತದ ಸಣ್ಣ ರಿಪೇರಿಗಳನ್ನು ಮಾತ್ರ ನೋಡಿಕೊಳ್ಳುತ್ತಾರೆ ಎಂದು ನಮೂದಿಸಬಹುದೇ?',
          what: 'ಪ್ರಮುಖ ರಚನಾತ್ಮಕ ರಿಪೇರಿ ವೆಚ್ಚಗಳನ್ನು ಬಾಡಿಗೆದಾರರಿಗೆ ವರ್ಗಾಯಿಸುವುದು.',
          why: 'ರಚನಾತ್ಮಕ ನಿರ್ವಹಣೆಯು ತಾತ್ಕಾಲಿಕ ಬಾಡಿಗೆದಾರರ ಮೇಲಿರಬಾರದು.',
          where: 'ಷರತ್ತು ೫',
          what_next: 'ಬಾಡಿಗೆದಾರರ ಜವಾಬ್ದಾರಿಯನ್ನು ₹೧,೦೦೦ ವರೆಗಿನ ಸಣ್ಣ ರಿಪೇರಿಗೆ ಸೀಮಿತಗೊಳಿಸಿ.',
        },
        {
          clause_number: 6,
          category: 'termination',
          clause_text: 'EARLY TERMINATION: If the Tenant vacates before the expiry of the 11-month term, the Tenant shall forfeit 3 months of rent as penalty.',
          plain_summary: 'ಅವಧಿಗೂ ಮುನ್ನ ಖಾಲಿ ಮಾಡಿದರೆ ೩ ತಿಂಗಳ ಬಾಡಿಗೆ (₹೭೫,೦೦೦) ಮುಟ್ಟುಗೋಲು.',
          simple_explanation: 'ನೀವು ಮುಂಚಿತವಾಗಿ ಮನೆ ಬಿಟ್ಟರೆ, ಶಿಕ್ಷೆಯಾಗಿ ೩ ತಿಂಗಳ ಪೂರ್ಣ ಬಾಡಿಗೆಯನ್ನು ಕಳೆದುಕೊಳ್ಳಬೇಕಾಗುತ್ತದೆ.',
          explanation: 'ಮುಂಚಿತವಾಗಿ ನೋಟಿಸ್ ನೀಡಿದ್ದರೂ ಸಹ ₹೭೫,೦೦೦ ರ ಭಾರೀ ದಂಡವನ್ನು ವಿಧಿಸುತ್ತದೆ.',
          risk_level: 'high_concern',
          risk_reason: 'ಮಾಲೀಕರ ಕಡೆಯಿಂದ ಯಾವುದೇ ಬಾಧ್ಯತೆ ಇಲ್ಲದೆ ಬಾಡಿಗೆದಾರರ ಮೇಲೆ ಕಠಿಣ ದಂಡ ಹೇರಲಾಗಿದೆ.',
          user_impact: 'ಅನಿರೀಕ್ಷಿತ ಉದ್ಯೋಗ ವರ್ಗಾವಣೆಯ ಸಂದರ್ಭದಲ್ಲಿ ₹೭೫,೦೦೦ ನೇರ ಆರ್ಥಿಕ ನಷ್ಟ.',
          suggested_question: 'ಇದನ್ನು ಪರಸ್ಪರ ೩೦ ದಿನಗಳ ನೋಟಿಸ್ ಮತ್ತು ೧ ತಿಂಗಳ ದಂಡದ ನಿಯಮಕ್ಕೆ ಬದಲಾಯಿಸಬಹುದೇ?',
          what: 'ಮುಂಚಿತವಾಗಿ ರದ್ದುಗೊಳಿಸಿದರೆ ೩ ತಿಂಗಳ ಬಾಡಿಗೆಯ ಭಾರೀ ಮುಟ್ಟುಗೋಲು.',
          why: 'ಯಾವುದೇ ಪರಸ್ಪರ ಬದ್ಧತೆಗಳಿಲ್ಲದ ಅತ್ಯಂತ ಏಕಪಕ್ಷೀಯ ಷರತ್ತು.',
          where: 'ಷರತ್ತು ೬',
          what_next: 'ಸಂಧಾನ ಸಹಾಯಕರ ಮೂಲಕ ೧ ತಿಂಗಳ ಪರಸ್ಪರ ನೋಟಿಸ್ ಷರತ್ತನ್ನು ಸೇರಿಸಿ.',
        },
        {
          clause_number: 7,
          category: 'privacy',
          clause_text: 'ENTRY: The Landlord reserves the unconditional right to enter and inspect the premises at any time without prior notification.',
          plain_summary: 'ಮಾಲೀಕರು ಮುನ್ಸೂಚನೆ ಇಲ್ಲದೆ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಮನೆಗೆ ಪ್ರವೇಶಿಸಬಹುದು.',
          simple_explanation: 'ಮಾಲೀಕರು ನಿಮಗೆ ಮೊದಲೇ ತಿಳಿಸದೆ ಯಾವಾಗ ಬೇಕಾದರೂ ನಿಮ್ಮ ಬಾಡಿಗೆ ಮನೆಗೆ ಬರಬಹುದು.',
          explanation: 'ಮುನ್ಸೂಚನೆ ಇಲ್ಲದ ಪ್ರವೇಶವು ಬಾಡಿಗೆದಾರರ ಖಾಸಗಿತನ ಮತ್ತು ಶಾಂತಿಯುತ ಜೀವನದ ಹಕ್ಕನ್ನು ಉಲ್ಲಂಘಿಸುತ್ತದೆ.',
          risk_level: 'high_concern',
          risk_reason: 'ಖಾಸಗಿತನ ಮತ್ತು ಸುರಕ್ಷತೆಗೆ ಗಂಭೀರ ಬೆದರಿಕೆಯನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
          user_impact: 'ನಿಮ್ಮ ಬಾಡಿಗೆ ಮನೆಯಲ್ಲಿ ವೈಯಕ್ತಿಕ ಖಾಸಗಿತನ ಮತ್ತು ಭದ್ರತೆಯ ಕೊರತೆ.',
          suggested_question: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿ ಹೊರತುಪಡಿಸಿ ಇತರ ತಪಾಸಣೆಗೆ ಕನಿಷ್ಠ ೨೪ ಗಂಟೆಗಳ ಲಿಖಿತ ನೋಟಿಸ್ ಕಡ್ಡಾಯಗೊಳಿಸಬಹುದೇ?',
          what: 'ಮುನ್ಸೂಚನೆ ಇಲ್ಲದ ಮಾಲೀಕರ ಪ್ರವೇಶ ಹಕ್ಕು.',
          why: 'ಬಾಡಿಗೆದಾರರ ಗೌಪ್ಯತೆ ಮತ್ತು ಸುರಕ್ಷತೆಯ ನೇರ ಉಲ್ಲಂಘನೆ.',
          where: 'ಷರತ್ತು ೭',
          what_next: 'ಎಲ್ಲಾ ಸಾಮಾನ್ಯ ಭೇಟಿಗಳಿಗೆ ೨೪ ಗಂಟೆಗಳ ಮುಂಚಿತ ಲಿಖಿತ ನೋಟಿಸ್‌ಗೆ ಒತ್ತಾಯಿಸಿ.',
        },
        {
          clause_number: 8,
          category: 'rent_increase',
          clause_text: 'RENEWAL: In the event of renewal, the monthly rent shall automatically increase by 15%.',
          plain_summary: 'ನವೀಕರಣದ ಸಮಯದಲ್ಲಿ ಬಾಡಿಗೆಯಲ್ಲಿ ೧೫% ರಷ್ಟು ಕಡ್ಡಾಯ ಹೆಚ್ಚಳ.',
          simple_explanation: 'ಮುಂದಿನ ವರ್ಷ ನೀವು ನವೀಕರಿಸಿದರೆ ಬಾಡಿಗೆ ತಕ್ಷಣ ೧೫% ಹೆಚ್ಚಾಗಿ ₹೨೮,೭೫೦ ಆಗುತ್ತದೆ.',
          explanation: 'ಸಾಮಾನ್ಯ ೫-೮% ನಗರ ಮಾನದಂಡಗಳಿಗಿಂತ ಅಧಿಕವಾದ ೧೫% ವಾರ್ಷಿಕ ಏರಿಕೆಯನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸುತ್ತದೆ.',
          risk_level: 'needs_attention',
          risk_reason: '೧೫% ಹೆಚ್ಚಳವು ಸಾಮಾನ್ಯ ನಗರ ಮಾನದಂಡಗಳಿಗಿಂತ ಅಧಿಕವಾಗಿದೆ.',
          user_impact: 'ಎರಡನೇ ವರ್ಷದಲ್ಲಿ ಬಾಡಿಗೆ ₹೨೫,೦೦೦ ದಿಂದ ₹೨೮,೭೫೦ ಕ್ಕೆ ಏರಿಕೆಯಾಗುತ್ತದೆ.',
          suggested_question: 'ಮಾರುಕಟ್ಟೆ ಹಣದುಬ್ಬರಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಹೆಚ್ಚಳವನ್ನು ೫% ರಿಂದ ೮% ಕ್ಕೆ ಮಿತಿಗೊಳಿಸಬಹುದೇ?',
          what: '೧೫% ರಷ್ಟು ವಾರ್ಷಿಕ ಬಾಡಿಗೆ ಹೆಚ್ಚಳ.',
          why: 'ಪ್ರಮಾಣಿತ ೫% ರಿಂದ ೮% ಮಾರುಕಟ್ಟೆ ಮಾನದಂಡಕ್ಕಿಂತ ಹೆಚ್ಚಾಗಿದೆ.',
          where: 'ಷರತ್ತು ೮',
          what_next: 'ಪರಸ್ಪರ ಒಪ್ಪಿಗೆಯೊಂದಿಗೆ ಗರಿಷ್ಠ ೮% ಏರಿಕೆಯ ಮಿತಿಯನ್ನು ಪ್ರಸ್ತಾಪಿಸಿ.',
        },
      ],
    };
  }

  // English fallback (default)
  return {
    document_type: 'Rental / Lease Agreement',
    document_summary: 'Residential lease agreement specifying 11-month term with monthly rent of ₹25,000, 6-month security deposit, and asymmetric early termination penalties.',
    overall_risk_level: 'high_concern',
    risk_score: 74,
    key_facts: {
      monthly_rent: '₹25,000',
      security_deposit: '₹1,50,000',
      duration: '11 months',
      start_date: '1st October 2025',
      end_date: '31st August 2026',
      notice_period: '3 months written notice',
      renewal_terms: '15% automatic escalation',
      penalties: '₹500 per day late fee',
      maintenance_responsibilities: 'Tenant bears all minor and major internal repairs',
      termination_conditions: '3 months rent forfeiture if terminated early',
    },
    obligations: [
      { category: 'Money', icon: '💰', description: 'Pay ₹25,000 monthly rent strictly on or before 1st of every month', clause_number: 2 },
      { category: 'Money', icon: '🔒', description: 'Maintain ₹1,50,000 security deposit with landlord', clause_number: 4 },
      { category: 'Responsibilities', icon: '🔧', description: 'Bear all minor and major maintenance and repair expenses', clause_number: 5 },
      { category: 'Restrictions', icon: '🚫', description: 'Subject to unannounced landlord inspection at any time', clause_number: 7 },
    ],
    important_dates: [
      { event: 'Rent Due Date', date_or_period: '1st of every calendar month', clause_number: 2, details: 'Late fee of ₹500/day accrues immediately if unpaid' },
      { event: 'Lease Expiry', date_or_period: '31st August 2026', clause_number: 1, details: 'End of 11-month term' },
      { event: 'Deposit Refund Window', date_or_period: '45 days post-vacating', clause_number: 4, details: 'Subject to joint handover inspection' },
    ],
    action_checklist: [
      { task: 'Negotiate early termination penalty down to 1 month', clause_number: 6, priority: 'high', advice: 'Ask for mutual 30-day notice instead of 3-month rent forfeiture.' },
      { task: 'Add 24-hour advance notice requirement for landlord inspections', clause_number: 7, priority: 'high', advice: 'Unannounced entry violates tenant quiet enjoyment rights.' },
      { task: 'Cap annual rent escalation at 5% to 8%', clause_number: 8, priority: 'medium', advice: '15% is significantly higher than Bangalore standard market inflation.' },
    ],
    clauses: [
      {
        clause_number: 1,
        category: 'duration',
        clause_text: 'TERM: The tenancy shall be for a duration of 11 months, ending on 31st August 2026.',
        plain_summary: 'Standard 11-month residential lease term.',
        simple_explanation: 'You are committing to rent the premises for 11 months.',
        explanation: 'This clause defines the tenancy window. 11 months is standard practice in India to avoid mandatory stamp duty registration under the Registration Act.',
        risk_level: 'low_concern',
        risk_reason: 'Standard 11-month duration common in urban rental markets.',
        user_impact: 'Provides tenancy rights through 31st August 2026.',
        suggested_question: 'Can we confirm the process for renewal at month 10?',
        what: 'Fixed 11-month lease term ending August 2026.',
        why: 'Aligns with customary residential leasing practices.',
        where: 'Clause 1',
        what_next: 'Note the lease expiry date in calendar.',
      },
      {
        clause_number: 2,
        category: 'rent_payments',
        clause_text: 'RENT: The Tenant agrees to pay monthly rent of INR 25,000 strictly on or before the 1st of every calendar month.',
        plain_summary: 'Monthly rent of ₹25,000 payable on 1st of each month.',
        simple_explanation: 'Rent is due strictly on the 1st day without a grace period.',
        explanation: 'Mandates monthly consideration of ₹25,000 payable on the first day of each calendar month.',
        risk_level: 'low_concern',
        risk_reason: 'Core payment obligation clearly stated.',
        user_impact: 'Mandatory recurring liability of ₹25,000 per month.',
        suggested_question: 'Can we agree on a 5-day grace period for bank clearance?',
        what: 'Mandatory payment obligation of ₹25,000 per month.',
        why: 'Primary commercial consideration for premises.',
        where: 'Clause 2',
        what_next: 'Set up standing instruction with bank for monthly transfer.',
      },
      {
        clause_number: 3,
        category: 'other',
        clause_text: 'LATE FEE: If rent is not received by the 1st day, a late fee of INR 500 per day shall accrue until full payment is received.',
        plain_summary: 'Steep daily late fee of ₹500 starting from Day 1.',
        simple_explanation: 'If rent is delayed by even 1 day, you will be charged ₹500 every single day.',
        explanation: 'Imposes immediate per-diem late surcharge without any customary banking grace period.',
        risk_level: 'needs_attention',
        risk_reason: 'Lack of grace period creates unfair exposure to banking weekend delays.',
        user_impact: 'A 10-day salary delay adds ₹5,000 in unexpected fines.',
        suggested_question: 'Could we include a 5-day grace period before late fees begin accruing?',
        what: 'Immediate ₹500 per day late payment fine.',
        why: 'No grace period provided for bank holidays or salary processing.',
        where: 'Clause 3',
        what_next: 'Propose a 5-day grace window before fines accrue.',
      },
      {
        clause_number: 4,
        category: 'security_deposit',
        clause_text: 'SECURITY DEPOSIT: The Tenant shall pay an interest-free security deposit of INR 1,50,000 prior to possession. The deposit shall be returned within 45 days after peaceful handover.',
        plain_summary: 'Security deposit of ₹1,50,000 refundable within 45 days.',
        simple_explanation: 'You must pay ₹1.5 Lakhs upfront, and the landlord has 45 days after you leave to return it.',
        explanation: 'Mandates 6 months equivalent rent as interest-free security deposit refundable within 45 days post-handover.',
        risk_level: 'needs_attention',
        risk_reason: '45-day return window is longer than the standard 15-30 day market benchmark.',
        user_impact: 'Delayed capital return when relocating to your next residence.',
        suggested_question: 'Can the refund timeline be reduced to 15-20 days following the joint move-out inspection?',
        what: '₹1,50,000 upfront deposit with 45-day return window.',
        why: 'Extended refund window ties up significant tenant capital.',
        where: 'Clause 4',
        what_next: 'Request deposit return within 15 days of keys handover.',
      },
      {
        clause_number: 5,
        category: 'maintenance',
        clause_text: 'MAINTENANCE: The Tenant shall bear all minor and major repair costs within the leased premises.',
        plain_summary: 'Tenant responsible for all minor and major repairs.',
        simple_explanation: 'If structural plumbing, wiring, or appliances break, you have to pay for everything.',
        explanation: 'Transfers structural and major maintenance liabilities to the tenant, contradicting standard rental laws where major structural repairs are landlord responsibility.',
        risk_level: 'high_concern',
        risk_reason: 'Major structural repairs are legally and customarily landlord responsibilities.',
        user_impact: 'High unexpected liability for pre-existing structural defects or plumbing leaks.',
        suggested_question: 'Can we specify that tenant handles minor repairs under ₹1,000, while landlord covers structural and major repairs?',
        what: 'Unilateral transfer of major structural repair costs to tenant.',
        why: 'Structural maintenance should not fall on a temporary lessee.',
        where: 'Clause 5',
        what_next: 'Redline clause to limit tenant responsibility to minor routine repairs under ₹1,000.',
      },
      {
        clause_number: 6,
        category: 'termination',
        clause_text: 'EARLY TERMINATION: If the Tenant vacates before the expiry of the 11-month term, the Tenant shall forfeit 3 months of rent as penalty.',
        plain_summary: 'Forfeiture of 3 months rent (₹75,000) for early departure.',
        simple_explanation: 'If you need to leave early, you lose 3 full months of rent as punishment.',
        explanation: 'Imposes severe liquidated damages of ₹75,000 regardless of whether advance notice was given or a replacement tenant is found.',
        risk_level: 'high_concern',
        risk_reason: 'Punitive 3-month forfeiture with no reciprocal landlord penalty.',
        user_impact: 'Loss of ₹75,000 in case of unexpected job transfer or relocation.',
        suggested_question: 'Can we replace this with a mutual 30-day notice period with 1-month rent penalty if notice cannot be served?',
        what: 'Severe 3-month rent forfeiture for early termination.',
        why: 'Highly punitive and one-sided without mutual landlord commitments.',
        where: 'Clause 6',
        what_next: 'Use Negotiation Copilot to insert a reciprocal 1-month notice clause.',
      },
      {
        clause_number: 7,
        category: 'privacy',
        clause_text: 'ENTRY: The Landlord reserves the unconditional right to enter and inspect the premises at any time without prior notification.',
        plain_summary: 'Landlord can enter the premises at any time without notice.',
        simple_explanation: 'The landlord can walk into your rented home whenever they want without telling you beforehand.',
        explanation: 'Violates basic tenant privacy and the covenant of quiet enjoyment by allowing unannounced physical entry.',
        risk_level: 'high_concern',
        risk_reason: 'Breaches covenant of quiet enjoyment and creates serious privacy and safety risks.',
        user_impact: 'Lack of personal privacy and security in your rented residence.',
        suggested_question: 'Can we require at least 24 hours written notice before any non-emergency inspection, scheduled at reasonable hours?',
        what: 'Unannounced landlord entry rights.',
        why: 'Direct infringement of tenant privacy and safety.',
        where: 'Clause 7',
        what_next: 'Insist on 24-hour advance written notice for all non-emergency visits.',
      },
      {
        clause_number: 8,
        category: 'rent_increase',
        clause_text: 'RENEWAL: In the event of renewal, the monthly rent shall automatically increase by 15%.',
        plain_summary: 'Mandatory 15% rent increase upon renewal.',
        simple_explanation: 'If you renew next year, your rent jumps immediately by 15% to ₹28,750.',
        explanation: 'Mandates an above-market annual escalation rate of 15%, significantly higher than prevailing 5-8% urban rental norms.',
        risk_level: 'needs_attention',
        risk_reason: '15% annual increase is above prevailing 5% to 8% metropolitan benchmarks.',
        user_impact: 'Steep cost escalation from ₹25,000 to ₹28,750 upon year two renewal.',
        suggested_question: 'Can the renewal escalation be capped at 5% to 8% in accordance with prevailing market inflation?',
        what: '15% annual rent escalation.',
        why: 'Exceeds standard 5% to 8% market benchmarks.',
        where: 'Clause 8',
        what_next: 'Counter-propose an 8% annual escalation cap upon mutual agreement.',
      },
    ],
  };
}

function getDemoStressTestFallback(scenario, language = 'en') {
  if (language === 'hi') {
    return {
      scenario: scenario || 'नौकरी स्थानांतरण के कारण समय पूर्व अनुबंध समाप्ति',
      assumptions: 'अप्रत्याशित स्थानांतरण के कारण किरायेदार को ३ महीने बाद ही परिसर खाली करना होगा।',
      relevant_clauses: [
        { clause_number: 6, topic: 'समय पूर्व समाप्ति', relevance: '११ महीने पूरे होने से पहले खाली करने पर जुर्माने का नियम लागू।' },
        { clause_number: 4, topic: 'सुरक्षा जमा राशि', relevance: 'खाली करने के बाद जमा राशि वापसी और कटौती के नियम।' }
      ],
      procedural_steps: [
        'समय पूर्व समाप्ति और इच्छित तिथि का हवाला देते हुए मकान मालिक को औपचारिक लिखित नोटिस जारी करें।',
        'परिसर की स्थिति का दस्तावेजीकरण करने के लिए संयुक्त निरीक्षण का समय तय करें।',
        'लिखित पावती के बदले चाबियां सौंपें और ४५-दिन की जमा राशि वापसी गणना शुरू करें।'
      ],
      known_financial_implications: [
        'खंड ६ के तहत ३ महीने का किराया (₹७५,०००) जुर्माने के रूप में जब्त।',
        'यदि खंड ५ के तहत मरम्मत विवाद होता है तो ₹१,५०,००० की जमा राशि से संभावित कटौती।'
      ],
      procedural_implications: [
        'शेष जमा राशि जारी होने से पहले ४५ दिन की अनिवार्य प्रतीक्षा अवधि।',
        'मकान मालिक नया किरायेदार ढूंढकर नुकसान कम करने के लिए बाध्य नहीं है।'
      ],
      uncertainties: [
        'यदि किरायेदार नया किरायेदार ढूंढ दे तो क्या मकान मालिक जुर्माना माफ करने के लिए सहमत होगा।',
        'पेंटिंग और रखरखाव के नाम पर मनमानी कटौती का जोखिम।'
      ],
      guidance_summary: 'खंड ६ के तहत, समय पूर्व खाली करने पर सीधे ₹७५,००० का जुर्माना लगता है। तुरंत नया किरायेदार ढूंढकर जुर्माना माफ करने का प्रस्ताव रखें।',
      evidence: [
        { clause_number: 6, quote: 'If the Tenant vacates before the expiry of the 11-month term, the Tenant shall forfeit 3 months of rent as penalty.' }
      ]
    };
  }

  if (language === 'kn') {
    return {
      scenario: scenario || 'ಉದ್ಯೋಗ ವರ್ಗಾವಣೆಯಿಂದಾಗಿ ಮುಂಚಿತವಾಗಿ ಒಪ್ಪಂದ ರದ್ದು',
      assumptions: 'ಅನಿರೀಕ್ಷಿತ ವರ್ಗಾವಣೆಯಿಂದಾಗಿ ಬಾಡಿಗೆದಾರರು ೩ ತಿಂಗಳ ನಂತರ ಮನೆಯನ್ನು ಖಾಲಿ ಮಾಡಬೇಕಾಗುತ್ತದೆ.',
      relevant_clauses: [
        { clause_number: 6, topic: 'ಮುಂಚಿತ ರದ್ದತಿ', relevance: '೧೧ ತಿಂಗಳು ಪೂರ್ಣಗೊಳ್ಳುವ ಮುನ್ನ ಖಾಲಿ ಮಾಡುವ ದಂಡದ ನಿಯಮ.' },
        { clause_number: 4, topic: 'ಭದ್ರತಾ ಠೇವಣಿ', relevance: 'ಮನೆ ಹಸ್ತಾಂತರಿಸಿದ ನಂತರ ಠೇವಣಿ ಮರುಪಾವತಿ ಮತ್ತು ಕಡಿತದ ನಿಯಮಗಳು.' }
      ],
      procedural_steps: [
        'ಮುಂಚಿತ ರದ್ದತಿ ಮತ್ತು ದಿನಾಂಕವನ್ನು ಉಲ್ಲೇಖಿಸಿ ಮಾಲೀಕರಿಗೆ ಔಪಚಾರಿಕ ಲಿಖಿತ ನೋಟಿಸ್ ನೀಡಿ.',
        'ಮನೆಯ ಸ್ಥಿತಿಯನ್ನು ದಾಖಲಿಸಲು ಜಂಟಿ ತಪಾಸಣೆ ಸಮಯವನ್ನು ನಿಗದಿಪಡಿಸಿ.',
        'ಲಿಖಿತ ರಸೀದಿಯೊಂದಿಗೆ ಕೀಲಿಗಳನ್ನು ನೀಡಿ ಮತ್ತು ೪೫ ದಿನಗಳ ಠೇವಣಿ ಮರುಪಾವತಿ ಅವಧಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ.'
      ],
      known_financial_implications: [
        'ಷರತ್ತು ೬ ರ ದಂಡ ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ೩ ತಿಂಗಳ ಬಾಡಿಗೆ (₹೭೫,೦೦೦) ಮುಟ್ಟುಗೋಲು.',
        'ಷರತ್ತು ೫ ರ ಅಡಿಯಲ್ಲಿ ರಿಪೇರಿ ವಿವಾದ ಉಂಟಾದರೆ ₹೧,೫೦,೦೦೦ ಠೇವಣಿಯಿಂದ ಸಂಭಾವ್ಯ ಕಡಿತ.'
      ],
      procedural_implications: [
        'ಉಳಿದ ಠೇವಣಿ ಹಣವನ್ನು ನೀಡುವ ಮುನ್ನ ೪೫ ದಿನಗಳ ಕಡ್ಡಾಯ ಕಾಯುವಿಕೆ ಅವಧಿ.',
        'ಹೊಸ ಬಾಡಿಗೆದಾರರನ್ನು ಹುಡುಕುವ ಮೂಲಕ ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮಾಲೀಕರು ಬದ್ಧರಾಗಿರುವುದಿಲ್ಲ.'
      ],
      uncertainties: [
        'ಬಾಡಿಗೆದಾರರೇ ಹೊಸ ಬಾಡಿಗೆದಾರರನ್ನು ಪರಿಚಯಿಸಿದರೆ ಮಾಲೀಕರು ದಂಡವನ್ನು ಮನ್ನಾ ಮಾಡಲು ಒಪ್ಪುತ್ತಾರೆಯೇ.',
        'ಬಣ್ಣ ಮತ್ತು ನಿರ್ವಹಣಾ ವೆಚ್ಚದ ಹೆಸರಿನಲ್ಲಿ ಅನಗತ್ಯ ಹಣ ಕಡಿತಗೊಳಿಸುವ ಅಪಾಯ.'
      ],
      guidance_summary: 'ಷರತ್ತು ೬ ರ ಅಡಿಯಲ್ಲಿ, ಮುಂಚಿತವಾಗಿ ಖಾಲಿ ಮಾಡಿದರೆ ನೇರವಾಗಿ ₹೭೫,೦೦೦ ದಂಡ ಬೀಳುತ್ತದೆ. ಪರ್ಯಾಯ ಬಾಡಿಗೆದಾರರನ್ನು ಹುಡುಕಿ ದಂಡ ಮನ್ನಾ ಮಾಡಲು ಕೋರಿ.',
      evidence: [
        { clause_number: 6, quote: 'If the Tenant vacates before the expiry of the 11-month term, the Tenant shall forfeit 3 months of rent as penalty.' }
      ]
    };
  }

  return {
    scenario: scenario || 'Early Lease Termination due to Job Transfer',
    assumptions: 'Tenant must vacate the premises after 3 months due to unforeseen relocation.',
    relevant_clauses: [
      { clause_number: 6, topic: 'Early Termination', relevance: 'Governs penalty for departure prior to 11-month term completion.' },
      { clause_number: 4, topic: 'Security Deposit', relevance: 'Governs refund timeline and deduction rules post-handover.' }
    ],
    procedural_steps: [
      'Issue formal written notice to Landlord citing early termination and requested handover date.',
      'Schedule joint move-out inspection to document condition of premises.',
      'Surrender keys against written receipt and initiate 45-day deposit refund countdown.'
    ],
    known_financial_implications: [
      'Forfeiture of 3 months rent (₹75,000) under Clause 6 penalty terms.',
      'Potential deductions from ₹1,50,000 deposit if repair disputes arise under Clause 5.'
    ],
    procedural_implications: [
      'Mandatory 45-day waiting window before remaining deposit funds are disbursed.',
      'Landlord is not obligated to mitigate losses by searching for a replacement tenant.'
    ],
    uncertainties: [
      'Whether landlord will agree to reduce penalty if tenant introduces an approved replacement lessee.',
      'Subjective assessment of painting and maintenance deductions under Clause 5.'
    ],
    guidance_summary: 'Under Clause 6, early termination strictly triggers a ₹75,000 penalty. Propose finding an immediate replacement tenant to request a waiver of the forfeiture.',
    evidence: [
      { clause_number: 6, quote: 'If the Tenant vacates before the expiry of the 11-month term, the Tenant shall forfeit 3 months of rent as penalty.' }
    ]
  };
}

function getDemoNegotiationFallback(clause, language = 'en') {
  if (language === 'hi') {
    return {
      what: `खंड ${clause.clause_number} (${clause.category}) एकतरफा जोखिम डालता है।`,
      why: clause.risk_reason || 'इसमें पारस्परिक सुरक्षा का अभाव है और यह बाजार मानकों से अधिक है।',
      where: `खंड ${clause.clause_number}`,
      what_next: 'हस्ताक्षर से पहले बातचीत के दौरान प्रस्तावित जवाबी खंड प्रस्तुत करें।',
      counter_proposal: `कोई भी पक्ष ३० दिनों की पूर्व लिखित सूचना देकर अवधि समाप्त होने से पहले इस समझौते को समाप्त कर सकता है। ऐसी स्थिति में किरायेदार की देनदारी अधिकतम १ महीने के किराये तक सीमित होगी।`,
      changes_made_summary: 'पारस्परिक ३०-दिन का लिखित नोटिस शामिल किया गया और वित्तीय जब्ती को ३ महीने से घटाकर १ महीने का किराया किया गया।',
      fallback_position: 'यदि ३० दिनों के भीतर नया किरायेदार नहीं मिलता है तो १.५ महीने के जुर्माने के साथ ६० दिन के नोटिस पर सहमत हों।',
      talking_points: [
        '३ महीने का जुर्माना बाजार मानकों (१-२ महीने) से काफी अधिक है।',
        '३० से ६० दिन का नोटिस मकान मालिक को नया किरायेदार ढूंढने के लिए पर्याप्त समय देता है।',
        'मुआवजा वास्तविक नुकसान पर आधारित होना चाहिए, न कि दंडात्मक जब्ती के रूप में।'
      ],
      formal_draft: {
        subject: `पट्टा समीक्षा — खंड ${clause.clause_number} में प्रस्तावित संशोधन`,
        body: `प्रिय मकान मालिक,\n\nसमझौते का मसौदा साझा करने के लिए धन्यवाद। हम किरायेदारी को अंतिम रूप देने के लिए उत्सुक हैं। खंड ${clause.clause_number} की समीक्षा करने पर, हम ३० दिनों के लिखित नोटिस के साथ एक संतुलित ढांचा स्थापित करने के लिए एक छोटे समायोजन का प्रस्ताव करना चाहते हैं। यह आपको योजना बनाने के लिए पर्याप्त समय देता है और दोनों पक्षों के लिए देनदारियों को उचित रखता है। कृपया विचार के लिए संलग्न प्रस्तावित प्रारूप देखें।\n\nसादर,\nकिरायेदार`
      }
    };
  }

  if (language === 'kn') {
    return {
      what: `ಷರತ್ತು ${clause.clause_number} (${clause.category}) ಏಕಪಕ್ಷೀಯ ಅಪಾಯವನ್ನು ಹೇರುತ್ತದೆ.`,
      why: clause.risk_reason || 'ಪರಸ್ಪರ ರಕ್ಷಣೆಯ ಕೊರತೆಯಿದೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಮಾನದಂಡಕ್ಕಿಂತ ಹೆಚ್ಚಾಗಿದೆ.',
      where: `ಷರತ್ತು ${clause.clause_number}`,
      what_next: 'ಸಹಿ ಮಾಡುವ ಮುನ್ನ ಚರ್ಚೆಯ ಸಮಯದಲ್ಲಿ ಪ್ರಸ್ತಾಪಿತ ತಿದ್ದುಪಡಿ ಷರತ್ತನ್ನು ಪ್ರಸ್ತುತಪಡಿಸಿ.',
      counter_proposal: `ಯಾವುದೇ ಪಕ್ಷವು ಮೂವತ್ತು (೩೦) ದಿನಗಳ ಮುಂಚಿತ ಲಿಖಿತ ನೋಟಿಸ್ ನೀಡುವ ಮೂಲಕ ಅವಧಿ ಮುಗಿಯುವ ಮುನ್ನ ಒಪ್ಪಂದವನ್ನು ರದ್ದುಗೊಳಿಸಬಹುದು. ಅಂತಹ ಸಂದರ್ಭದಲ್ಲಿ ಬಾಡಿಗೆದಾರರ ಹೊಣೆಗಾರಿಕೆಯು ಕೇವಲ ಒಂದು (೧) ತಿಂಗಳ ಬಾಡಿಗೆಗೆ ಸೀಮಿತವಾಗಿರುತ್ತದೆ.`,
      changes_made_summary: 'ಪರಸ್ಪರ ೩೦ ದಿನಗಳ ಲಿಖಿತ ನೋಟಿಸ್ ಸೇರಿಸಲಾಗಿದೆ ಮತ್ತು ದಂಡವನ್ನು ೩ ತಿಂಗಳಿಂದ ೧ ತಿಂಗಳ ಬಾಡಿಗೆಗೆ ಇಳಿಸಲಾಗಿದೆ.',
      fallback_position: '೩೦ ದಿನಗಳಲ್ಲಿ ಬದಲಿ ಬಾಡಿಗೆದಾರರು ಸಿಗದಿದ್ದರೆ ೧.೫ ತಿಂಗಳ ದಂಡದೊಂದಿಗೆ ೬೦ ದಿನಗಳ ನೋಟಿಸ್‌ಗೆ ಒಪ್ಪಿಕೊಳ್ಳಿ.',
      talking_points: [
        '೩ ತಿಂಗಳ ದಂಡವು ಮಾರುಕಟ್ಟೆ ನಿಯಮಗಳಿಗಿಂತ (೧-೨ ತಿಂಗಳು) ಅಧಿಕವಾಗಿದೆ.',
        '೩೦ ರಿಂದ ೬೦ ದಿನಗಳ ನೋಟಿಸ್ ಹೊಸ ಬಾಡಿಗೆದಾರರನ್ನು ಹುಡುಕಲು ಮಾಲೀಕರಿಗೆ ಸಾಕಷ್ಟು ಸಮಯವನ್ನು ನೀಡುತ್ತದೆ.',
        'ದಂಡವು ನ್ಯಾಯಯುತ ಮರು-ಬಾಡಿಗೆ ವೆಚ್ಚವನ್ನು ಪ್ರತಿಬಿಂಬಿಸಬೇಕು, ಶಿಕ್ಷೆಯಾಗಿರಬಾರದು.'
      ],
      formal_draft: {
        subject: `ಗುತ್ತಿಗೆ ಪರಿಶೀಲನೆ — ಷರತ್ತು ${clause.clause_number} ಕ್ಕೆ ಪ್ರಸ್ತಾಪಿತ ಹೊಂದಾಣಿಕೆ`,
        body: `ಆತ್ಮೀಯ ಮನೆ ಮಾಲೀಕರೇ,\n\nಕರಡು ಒಪ್ಪಂದವನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ನಾವು ಒಪ್ಪಂದವನ್ನು ಅಂತಿಮಗೊಳಿಸಲು ಎದುರು ನೋಡುತ್ತಿದ್ದೇವೆ. ಷರತ್ತು ${clause.clause_number} ಅನ್ನು ಪರಿಶೀಲಿಸಿದ ನಂತರ, ೩೦ ದಿನಗಳ ಲಿಖಿತ ನೋಟಿಸ್‌ನೊಂದಿಗೆ ಸಮತೋಲಿತ ನಿಯಮವನ್ನು ರೂಪಿಸಲು ಸಣ್ಣ ಬದಲಾವಣೆಯನ್ನು ಪ್ರಸ್ತಾಪಿಸಲು ಬಯಸುತ್ತೇವೆ. ಇದು ನಿಮಗೆ ಸಾಕಷ್ಟು ಸಮಯವನ್ನು ನೀಡುತ್ತದೆ ಮತ್ತು ಎರಡೂ ಪಕ್ಷಗಳಿಗೆ ಹೊಣೆಗಾರಿಕೆಯನ್ನು ಸಮಂಜಸವಾಗಿರಿಸುತ್ತದೆ. ದಯವಿಟ್ಟು ಪರಿಶೀಲನೆಗಾಗಿ ಲಗತ್ತಿಸಲಾದ ಕರಡನ್ನು ನೋಡಿ.\n\nವಂದನೆಗಳೊಂದಿಗೆ,\nಬಾಡಿಗೆದಾರ`
      }
    };
  }

  return {
    what: `Clause ${clause.clause_number} (${clause.category}) imposes one-sided exposure.`,
    why: clause.risk_reason || 'Lacks reciprocal protections and exceeds standard market practice.',
    where: `Clause ${clause.clause_number}`,
    what_next: 'Present proposed redline counter-clause during pre-signing lease discussion.',
    counter_proposal: `Either party may terminate this agreement prior to term expiration by providing thirty (30) days prior written notice. In the event of such termination, tenant liability shall be limited to one (1) month of rent as liquidated damages.`,
    changes_made_summary: 'Incorporated mutual 30-day written notice and reduced financial forfeiture from 3 months to 1 month of rent.',
    fallback_position: 'Agree to a 60-day notice period with 1.5 months penalty fee if a replacement tenant is not secured within 30 days.',
    talking_points: [
      'A 3-month penalty exceeds standard market practice, which typically ranges between 1 to 2 months of rent for early termination.',
      'A 30 to 60-day notice requirement affords the owner adequate time to market and re-let the property without rental loss.',
      'Liquidated damages should reflect reasonable re-letting costs rather than serving as an excessive punitive charge.'
    ],
    formal_draft: {
      subject: `Lease Review — Proposed Adjustment to Clause ${clause.clause_number}`,
      body: `Dear Landlord,\n\nThank you for sharing the draft agreement. We are looking forward to finalizing our tenancy. Upon reviewing Clause ${clause.clause_number}, we would like to propose a minor adjustment to establish a balanced structure with 30 days written notice. This gives you ample time to plan while keeping liabilities reasonable for both parties. Please find the proposed wording attached for your consideration.\n\nWarm regards,\nTenant`
    }
  };
}

function getDemoLegalContextFallback(clauseNumber, clauseText, language = 'en') {
  if (language === 'hi') {
    return {
      clause_number: clauseNumber || 6,
      what: 'अनुबंध के तहत दायित्व, देनदारियां या दंड स्थापित करता है।',
      why: 'एकतरफा शर्तें आदर्श वैधानिक कानूनी ढांचे और सामान्य किरायेदारी संतुलन से अलग हैं।',
      where: `खंड ${clauseNumber || 6}`,
      what_next: 'मानक किरायेदारी दिशानिर्देशों के अनुरूप संतुलित खंड का प्रस्ताव रखें।',
      document_fact: {
        verbatim_excerpt: clauseText || 'अनुबंध उद्धरण',
        stated_obligation: 'दोनों पक्षों के बीच बाध्यकारी संविदात्मक कर्तव्य।',
        disclosed_penalties: 'निर्दिष्ट वित्तीय प्रभार या जब्ती प्रावधान।'
      },
      external_information: {
        applicable_act_or_benchmark: 'मॉडल टेनेंसी एक्ट (MTA) और भारतीय अनुबंध अधिनियम १८७२ (धारा ७४ - परिसमाप्त हर्जाना)',
        statutory_or_customary_standard: 'मानक प्रथा आवासीय जमा को २ महीने के किराये तक सीमित करती है, पारस्परिक नोटिस अवधि की मांग करती है, और हर्जाने को केवल वास्तविक सिद्ध नुकसान तक सीमित करती है।',
        benchmark_comparison: 'वर्तमान प्रावधान वैधानिक आदर्श ढांचे की तुलना में काफी अधिक प्रतिबंधात्मक और एकतरफा है।'
      },
      ai_interpretation: {
        balance_assessment: 'पूरी तरह से दूसरी पार्टी के पक्ष में झुका हुआ है, जो हस्ताक्षरकर्ता के लिए अत्यधिक वाणिज्यिक जोखिम पैदा करता है।',
        key_risk_factor: 'पारस्परिक सुरक्षा या मकान मालिक की जवाबदेही के बिना एकतरफा दायित्व।',
        practical_guidance: 'हस्ताक्षर करने से पहले पारस्परिक शर्तों पर बातचीत करने की सिफारिश की जाती है।'
      }
    };
  }

  if (language === 'kn') {
    return {
      clause_number: clauseNumber || 6,
      what: 'ಒಪ್ಪಂದದ ಅಡಿಯಲ್ಲಿ ಕರ್ತವ್ಯಗಳು, ಹೊಣೆಗಾರಿಕೆಗಳು ಅಥವಾ ದಂಡಗಳನ್ನು ನಿಗದಿಪಡಿಸುತ್ತದೆ.',
      why: 'ಏಕಪಕ್ಷೀಯ ನಿಯಮಗಳು ಮಾದರಿ ಶಾಸನಬದ್ಧ ಚೌಕಟ್ಟು ಮತ್ತು ಸಾಮಾನ್ಯ ಬಾಡಿಗೆ ಸಮತೋಲನದಿಂದ ವಿಚಲಿತವಾಗಿವೆ.',
      where: `ಷರತ್ತು ${clauseNumber || 6}`,
      what_next: 'ಪ್ರಮಾಣಿತ ಬಾಡಿಗೆ ಮಾರ್ಗಸೂಚಿಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಸಮತೋಲಿತ ಷರತ್ತನ್ನು ಪ್ರಸ್ತಾಪಿಸಿ.',
      document_fact: {
        verbatim_excerpt: clauseText || 'ಒಪ್ಪಂದದ ಭಾಗ',
        stated_obligation: 'ಪಕ್ಷಗಳ ನಡುವೆ ಜಾರಿಗೊಳಿಸಬಹುದಾದ ಕಡ್ಡಾಯ ಗುತ್ತಿಗೆ ಕರ್ತವ್ಯ.',
        disclosed_penalties: 'ತಿಳಿಸಲಾದ ಆರ್ಥಿಕ ಶುಲ್ಕಗಳು ಅಥವಾ ಮುಟ್ಟುಗೋಲು ನಿಬಂಧನೆಗಳು.'
      },
      external_information: {
        applicable_act_or_benchmark: 'ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ (MTA) ಮತ್ತು ಭಾರತೀಯ ಒಪ್ಪಂದ ಕಾಯ್ದೆ 1872 (ವಿಭಾಗ 74 - ನಷ್ಟ ಪರಿಹಾರ)',
        statutory_or_customary_standard: 'ಪ್ರಮಾಣಿತ ನಿಯಮವು ಠೇವಣಿಯನ್ನು ೨ ತಿಂಗಳ ಬಾಡಿಗೆಗೆ ಮಿತಿಗೊಳಿಸುತ್ತದೆ, ಪರಸ್ಪರ ನೋಟಿಸ್ ಅವಧಿಯನ್ನು ಬಯಸುತ್ತದೆ ಮತ್ತು ದಂಡವನ್ನು ಕೇವಲ ಸಾಬೀತಾದ ನಷ್ಟಕ್ಕೆ ಸೀಮಿತಗೊಳಿಸುತ್ತದೆ.',
        benchmark_comparison: 'ಪ್ರಸ್ತುತ ನಿಬಂಧನೆಯು ಶಾಸನಬದ್ಧ ಚೌಕಟ್ಟಿಗಿಂತ ಹೆಚ್ಚು ನಿರ್ಬಂಧಿತವಾಗಿದೆ.'
      },
      ai_interpretation: {
        balance_assessment: 'ಸಂಪೂರ್ಣವಾಗಿ ಎದುರು ಪಕ್ಷದ ಪರವಾಗಿದ್ದು, ಸಹಿ ಮಾಡುವವರಿಗೆ ತೀವ್ರ ಆರ್ಥಿಕ ಅಪಾಯವನ್ನುಂಟುಮಾಡುತ್ತದೆ.',
        key_risk_factor: 'ಯಾವುದೇ ಪರಸ್ಪರ ಬದ್ಧತೆಗಳಿಲ್ಲದ ಏಕಪಕ್ಷೀಯ ಹೊಣೆಗಾರಿಕೆ.',
        practical_guidance: 'ಸಹಿ ಮಾಡುವ ಮುನ್ನ ಸಮತೋಲಿತ ನಿಯಮಗಳಿಗಾಗಿ ಸಂಧಾನ ನಡೆಸಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.'
      }
    };
  }

  return {
    clause_number: clauseNumber || 6,
    what: 'Establishes obligations, liabilities, or penalties under the contract.',
    why: 'One-sided terms diverge from model statutory frameworks and customary tenancy balance.',
    where: `Clause ${clauseNumber || 6}`,
    what_next: 'Propose balanced benchmark clause aligned with standard tenancy guidelines.',
    document_fact: {
      verbatim_excerpt: clauseText || 'Contractual excerpt',
      stated_obligation: 'Expressly mandated contractual duty enforceable between parties.',
      disclosed_penalties: 'Stated financial charges or forfeiture provisions.'
    },
    external_information: {
      applicable_act_or_benchmark: 'Model Tenancy Act (MTA) & Indian Contract Act 1872 (Section 74 - Liquidated Damages)',
      statutory_or_customary_standard: 'Standard practice caps residential deposit at 2 months rent, requires reciprocal notice windows, and restricts liquidated damages to actual proven losses.',
      benchmark_comparison: 'The current provision is significantly more restrictive than the statutory model framework.'
    },
    ai_interpretation: {
      balance_assessment: 'Heavily weighted in favor of the counterparty, creating asymmetric commercial risk for the signer.',
      key_risk_factor: 'Unilateral liability without reciprocal landlord commitments or mitigation duties.',
      practical_guidance: 'Recommend negotiating reciprocal terms before execution.'
    }
  };
}

function getDemoChatFallback(documentText = '', question = '', language = 'en') {
  const qLower = (question || '').toLowerCase();
  const docLower = (documentText || '').toLowerCase();

  const absentTerms = ['wi-fi', 'wifi', 'swimming', 'pool', 'password', 'gym', 'parking spot 42', 'pet fee', 'concierge'];
  const isAbsent = absentTerms.some(term => qLower.includes(term));

  const qWords = qLower.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !['what', 'when', 'where', 'which', 'about', 'this', 'that', 'with', 'from', 'have', 'does', 'please', 'tell'].includes(w));
  const hasMatchedWords = qWords.some(w => docLower.includes(w));

  if (isAbsent || (!hasMatchedWords && !docLower.includes(qLower.slice(0, 10)))) {
    return {
      answer: language === 'hi'
        ? 'मुझे आपके दस्तावेज़ में इसके बारे में कोई जानकारी नहीं मिली। समझौते में इस विषय का कोई उल्लेख नहीं है।'
        : language === 'kn'
        ? 'ನಿಮ್ಮ ಒಪ್ಪಂದದ ದಾಖಲೆಯಲ್ಲಿ ಈ ಕುರಿತು ಯಾವುದೇ ಮಾಹಿತಿ ಕಂಡುಬಂದಿಲ್ಲ.'
        : "I couldn't find information about that in your document. The agreement does not contain any mention or provision regarding this subject.",
      found_in_document: false,
      source_clauses: []
    };
  }

  if (qLower.includes('rent') || qLower.includes('monthly') || qLower.includes('amount')) {
    return {
      answer: language === 'hi'
        ? 'दस्तावेज़ के अनुसार, मासिक किराया ₹२५,००० है जो प्रत्येक कैलेंडर माह की १ तारीख को या उससे पहले देय है।'
        : language === 'kn'
        ? 'ದಾಖಲೆಯ ಪ್ರಕಾರ, ಮಾಸಿಕ ಬಾಡಿಗೆ ₹೨೫,೦೦೦ ಆಗಿದ್ದು ಪ್ರತಿ ತಿಂಗಳ ೧ ನೇ ತಾರೀಖಿನಂದು ಪಾವತಿಸಬೇಕು.'
        : 'According to Clause 2, the monthly rent is INR 25,000 payable on or before the 1st of every calendar month.',
      found_in_document: true,
      source_clauses: [
        {
          clause_number: 2,
          clause_title: 'Rent Payments',
          relevant_text: 'RENT: The Tenant agrees to pay monthly rent of INR 25,000 strictly on or before the 1st of every calendar month.'
        }
      ]
    };
  }

  if (qLower.includes('deposit') || qLower.includes('security')) {
    return {
      answer: language === 'hi'
        ? 'दस्तावेज़ के खंड ४ के अनुसार, ₹१,५०,००० की सुरक्षा जमा राशि आवश्यक है, जो खाली करने के ४५ दिनों के भीतर वापस की जाएगी।'
        : language === 'kn'
        ? 'ದಾಖಲೆಯ ಷರತ್ತು ೪ ರ ಪ್ರಕಾರ ₹೧,೫೦,೦೦೦ ಭದ್ರತಾ ಠೇವಣಿ ಅಗತ್ಯವಿದೆ, ಇದನ್ನು ೪೫ ದಿನಗಳಲ್ಲಿ ಮರುಪಾವತಿಸಲಾಗುತ್ತದೆ.'
        : 'According to Clause 4, an interest-free security deposit of INR 1,50,000 is required, refundable within 45 days after handover.',
      found_in_document: true,
      source_clauses: [
        {
          clause_number: 4,
          clause_title: 'Security Deposit',
          relevant_text: 'SECURITY DEPOSIT: The Tenant shall pay an interest-free security deposit of INR 1,50,000 prior to possession. The deposit shall be returned within 45 days after peaceful handover.'
        }
      ]
    };
  }

  return {
    answer: language === 'hi'
      ? 'दस्तावेज़ के प्रावधानों के आधार पर, यह खंड आपके किरायेदार अधिकारों और वित्तीय दायित्वों को नियंत्रित करता है।'
      : language === 'kn'
      ? 'ದಾಖಲೆಯ ನಿಬಂಧನೆಗಳ ಪ್ರಕಾರ, ಈ ಷರತ್ತು ನಿಮ್ಮ ಹಕ್ಕುಗಳು ಮತ್ತು ಆರ್ಥಿಕ ಬದ್ಧತೆಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.'
      : 'According to the provided agreement, the relevant clauses govern the obligations and timeline stipulated by the landlord.',
    found_in_document: true,
    source_clauses: [
      {
        clause_number: 1,
        clause_title: 'Contract Provision',
        relevant_text: documentText.slice(0, 200).replace(/\n/g, ' ')
      }
    ]
  };
}

function getDemoComparisonFallback(docAText = '', docBText = '', language = 'en') {
  return {
    comparison_summary: {
      overview: language === 'hi'
        ? 'दस्तावेज़ A और दस्तावेज़ B दोनों आवासीय समझौते हैं, लेकिन दस्तावेज़ B में किरायेदार के लिए अधिक अनुकूल और संतुलित शर्तें हैं।'
        : language === 'kn'
        ? 'ದಾಖಲೆ A ಮತ್ತು ದಾಖಲೆ B ಎರಡೂ ವಸತಿ ಒಪ್ಪಂದಗಳಾಗಿವೆ, ಆದರೆ ದಾಖಲೆ B ಹೆಚ್ಚು ಸಮತೋಲಿತ ಷರತ್ತುಗಳನ್ನು ಹೊಂದಿದೆ.'
        : 'Document A and Document B are both residential lease agreements, but Document B offers significantly more tenant-favorable financial terms and lower penalty burdens.',
      doc_a_favorable_points: [
        language === 'hi' ? 'दस्तावेज़ A में स्थिर अवधि की गारंटी है' : 'Document A specifies a fixed 11-month term without mid-term landlord break clauses.',
        language === 'hi' ? 'दस्तावेज़ A में सरल प्रक्रियाएं हैं' : 'Document A has simpler administrative requirements for maintenance.'
      ],
      doc_b_favorable_points: [
        language === 'hi' ? 'दस्तावेज़ B में कम सुरक्षा जमा (२ महीने बनाम ६ महीने)' : 'Document B requires a substantially lower security deposit (2 months vs 6 months in Doc A).',
        language === 'hi' ? 'दस्तावेज़ B में ५ दिन की रियायती अवधि (ग्रेस पीरियड) है' : 'Document B provides a 5-day grace period for rent without immediate late penalties.',
        language === 'hi' ? 'दस्तावेज़ B में समय पूर्व खाली करने पर १ महीने का नोटिस' : 'Document B allows early termination with 1-month notice instead of a 3-month forfeiture.'
      ]
    },
    comparison_matrix: [
      {
        category: 'Monthly Rent',
        doc_a_value: 'INR 25,000 / month',
        doc_b_value: 'INR 24,000 / month',
        difference_summary: 'Doc B is ₹1,000/month lower in recurring rent commitment.',
        favorability: 'doc_b_better',
        practical_impact: 'Saves ₹11,000 over the course of an 11-month lease.'
      },
      {
        category: 'Security Deposit',
        doc_a_value: 'INR 1,50,000 (6 months rent)',
        doc_b_value: 'INR 50,000 (2 months rent)',
        difference_summary: 'Doc A locks up ₹1,00,000 more upfront capital.',
        favorability: 'doc_b_better',
        practical_impact: 'Reduces upfront cash requirement significantly, aligning with Model Tenancy guidelines.'
      },
      {
        category: 'Late Payment Penalty',
        doc_a_value: 'INR 500/day from day 1',
        doc_b_value: '5-day grace period, then INR 200/day',
        difference_summary: 'Doc B includes a customary grace period for banking delays.',
        favorability: 'doc_b_better',
        practical_impact: 'Protects the signer against unfair penalties due to weekend bank holidays.'
      },
      {
        category: 'Early Termination',
        doc_a_value: 'Forfeiture of full deposit + 3 months rent penalty',
        doc_b_value: '30 days written notice with no penalty',
        difference_summary: 'Doc A imposes severe exit liabilities, whereas Doc B permits reciprocal flexibility.',
        favorability: 'doc_b_better',
        practical_impact: 'Provides vital mobility in the event of job relocation or unforeseen circumstances.'
      }
    ],
    clause_diffs: [
      {
        topic: 'Clause: Security Deposit & Refund',
        doc_a_text: 'Deposit of INR 1,50,000 to be returned within 45 days after peaceful handover.',
        doc_b_text: 'Deposit of INR 50,000 to be returned within 15 days upon key return.',
        change_description: 'Refund window shortened from 45 days to 15 days, and deposit amount lowered.',
        impact: 'Signer recovers funds 30 days faster when vacating.'
      },
      {
        topic: 'Clause: Early Termination',
        doc_a_text: 'Tenant vacating early forfeits full deposit and pays 3 months exit penalty.',
        doc_b_text: 'Either party may terminate the agreement by serving one month advance written notice.',
        change_description: 'Replaces punitive forfeiture with bilateral 30-day notice.',
        impact: 'Eliminates existential financial penalty for sudden job transfer.'
      }
    ],
    negotiation_tips: [
      'Use Document B\'s 2-month deposit standard as market leverage to reduce Document A\'s 6-month demand.',
      'Request the 5-day rent grace period from Document B to avoid automatic ₹500/day late fees.',
      'Counter Document A\'s 3-month exit penalty by citing bilateral 30-day notice provisions.'
    ]
  };
}

function getDemoDevilsAdvocateFallback(clause = {}, language = 'en') {
  const cNum = clause.clause_number || 1;
  const cCat = clause.category || 'contract term';

  return {
    clause_number: cNum,
    what: `Governs obligations and commercial balance under Clause ${cNum} (${cCat}).`,
    why: 'Presents competing priorities between landlord risk mitigation and tenant financial security.',
    where: `Clause ${cNum}`,
    what_next: 'Propose a balanced compromise clause that protects both parties.',
    counterparty_perspective: {
      role: 'Landlord / Counterparty',
      legitimate_goal: 'Protect asset value, guarantee predictable rental cashflow, and prevent sudden vacancy downtime.',
      business_risk_prevented: 'Risk of tenant suddenly vacating without covering re-listing periods and brokerage costs.',
      explanation: 'From the counterparty perspective, abrupt departures cause immediate vacancy loss and refurbishment expenditure.'
    },
    signer_perspective: {
      role: 'Tenant / Signer',
      main_vulnerability: 'Disproportionate financial liability and severe lock-in regardless of legitimate personal emergencies.',
      potential_hardship: 'Loss of substantial capital if company relocates or unexpected medical issues arise.',
      explanation: 'A one-sided exit penalty forces the signer to forfeit months of income even when giving reasonable advance notice.'
    },
    balanced_compromise: {
      compromise_clause_text: 'Either party may terminate this agreement by providing sixty (60) days advance written notice, or payment of one (1) month rent in lieu of notice, with full refund of the security deposit within 15 days of handover.',
      why_fair_to_both: 'Provides the counterparty 60 days to secure a replacement tenant while capping tenant exit costs to a fair 1-month benchmark.'
    }
  };
}

function getDemoDraftFallback(clause = {}, language = 'en') {
  return {
    answer: language === 'hi'
      ? `नमस्ते, मैं हमारे लीज समझौते के खंड ${clause.clause_number || ''} के संबंध में संपर्क कर रहा हूँ। क्या हम इस शर्त को अधिक संतुलित बनाने और मानक बाजार दिशानिर्देशों के अनुरूप समायोजित करने पर चर्चा कर सकते हैं? आपके विचार साझा करने के लिए धन्यवाद।`
      : language === 'kn'
      ? `ನಮಸ್ಕಾರ, ನಮ್ಮ ಒಪ್ಪಂದದ ಷರತ್ತು ${clause.clause_number || ''} ರ ಕುರಿತು ಚರ್ಚಿಸಲು ನಾನು ವಿನಂತಿಸುತ್ತೇನೆ. ದಯವಿಟ್ಟು ಇದನ್ನು ಹೆಚ್ಚು ಸಮತೋಲಿತಗೊಳಿಸಲು ಪರಿಶೀಲಿಸಿ.`
      : `Dear Landlord,\n\nI hope this message finds you well. While reviewing the draft lease agreement, I noticed Clause ${clause.clause_number || ''} regarding ${clause.category || 'the specified terms'}. To ensure a fair and mutual understanding, could we consider adjusting this provision in line with standard market practices? I would greatly appreciate the opportunity to discuss a reasonable compromise.\n\nThank you for your time and understanding.`,
    found_in_document: true,
    source_clauses: [
      {
        clause_number: clause.clause_number || 1,
        clause_title: clause.category || 'Clause Review',
        relevant_text: clause.clause_text || 'Contractual excerpt'
      }
    ]
  };
}

module.exports = {
  getDemoAnalysisFallback,
  getDemoStressTestFallback,
  getDemoNegotiationFallback,
  getDemoLegalContextFallback,
  getDemoChatFallback,
  getDemoComparisonFallback,
  getDemoDevilsAdvocateFallback,
  getDemoDraftFallback,
};
