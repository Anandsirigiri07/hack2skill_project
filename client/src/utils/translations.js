/**
 * LegalLens AI — Multilingual Translations Dictionary
 * Supports English (en), Hindi (hi - हिन्दी), and Kannada (kn - ಕನ್ನಡ).
 */

export const TRANSLATIONS = {
  en: {
    // Top banner & Branding
    'banner.title': 'LEGAL LENS AI — Understand. Compare. Question. Act. | Hack2Skill GenAI Legal Assistance',
    'banner.demo_mode': 'DEMO MODE (FAIL-CLOSED)',
    'brand.name': 'LegalLens AI',
    'brand.tagline': 'Understand Your Legal Documents',
    'brand.version': 'Gemini 3.6',

    // Navigation
    'nav.home': 'Home',
    'nav.analyze': 'Analyze',
    'nav.stress_test': 'Stress Test',
    'nav.compare': 'Compare',
    'nav.ask': 'Ask',
    'nav.my_documents': 'My Documents',
    'nav.glossary': 'Glossary',
    'nav.load_sample': '⚡ Load Sample',

    // Disclaimer
    'disclaimer.text': 'LegalLens AI is an AI-powered educational and document comprehension tool. It provides automated analysis and plain-language summaries for informational purposes only. It is not a law firm, does not provide legal advice, and is not a substitute for qualified legal counsel.',

    // Hero Section
    'hero.badge': 'Powered by Gemini 3.6 & Indian Law Benchmarks',
    'hero.title_part1': 'Understand contracts',
    'hero.title_highlight': 'before you sign.',
    'hero.subtitle': 'Instant plain-language breakdown, hidden liability hunter, and AI negotiation companion for rental agreements, employment contracts, and commercial leases.',
    'hero.cta_analyze': 'Analyze Contract Free',
    'hero.cta_compare': 'Compare Two Documents',
    'hero.cta_sample': '⚡ Test Realistic Sample',
    'hero.feature1': 'Zero Legal Jargon',
    'hero.feature2': 'Financial Exposure Math',
    'hero.feature3': 'Indian Law Grounded',
    'hero.feature4': 'Deterministic Fallbacks',

    // Hero Live Preview Card
    'preview.live_badge': 'Live Analysis Preview',
    'preview.doc_title': 'Residential Tenancy Agreement (Bengaluru)',
    'preview.overall_risk': 'Overall Risk',
    'preview.risk_badge': 'High Concern (74/100)',
    'preview.red_flags': 'Critical Red Flags Found',
    'preview.monthly_rent': 'Monthly Rent',
    'preview.rent_val': '₹25,000 / mo',
    'preview.security_deposit': 'Security Deposit',
    'preview.deposit_val': '₹1,50,000 (6 mo)',
    'preview.asymmetric_clauses': 'Asymmetric Clauses Identified:',
    'preview.item1': 'Unannounced landlord inspection at any hour without notice (Clause 7)',
    'preview.item2': 'Total 3-month rent forfeiture for early termination (Clause 6)',
    'preview.item3': 'Daily compounding late penalty fee ₹500/day (Clause 2)',

    // Capabilities Grid
    'cap.xray_title': 'Contract X-Ray & Red Flags',
    'cap.xray_desc': 'Pinpoint one-sided forfeiture, unannounced inspections, and asymmetric liabilities.',
    'cap.xray_action': 'Launch Analysis →',
    'cap.stress_title': 'Contract Stress Test',
    'cap.stress_desc': 'Simulate emergencies, job transfers, or late rent scenarios with deterministic calculations.',
    'cap.stress_action': 'Simulate Scenarios →',
    'cap.diff_title': 'Semantic Contract Diff',
    'cap.diff_desc': 'Compare two versions side-by-side to catch sneaky changes in penalties or notice terms.',
    'cap.diff_action': 'Compare Contracts →',
    'cap.qa_title': 'Evidence-Backed Q&A',
    'cap.qa_desc': 'Ask plain questions. Get verbatim citations. Never hallucinated.',
    'cap.qa_action': 'Ask Document →',

    // Document Input
    'input.title': 'Upload or Paste Agreement',
    'input.tab_upload': 'Upload Document',
    'input.tab_paste': 'Paste Text',
    'input.drop_title': 'Drop your contract file here',
    'input.drop_subtitle': 'Supports PDF, DOCX, or TXT (up to 5MB)',
    'input.browse_btn': 'Browse File',
    'input.file_selected': 'Selected file:',
    'input.paste_placeholder': 'Paste full agreement text here (e.g., rental agreement, employment contract, NDA)...',
    'input.char_count': 'characters',
    'input.words_count': 'words',
    'input.analyze_btn': 'Analyze Contract with Gemini',
    'input.analyzing_btn': 'Analyzing Contract...',
    'input.or_sample': 'Or start immediately with a verified template:',
    'input.load_sample_btn': '⚡ Load Sample Indiranagar Rental Agreement',

    // Subnav Toolbar
    'subnav.all': 'Full Workspace',
    'subnav.red_flags': 'Red Flags',
    'subnav.xray_graph': 'X-Ray & Graph',
    'subnav.financial': 'Financial Exposure',
    'subnav.clauses': 'Clauses',
    'subnav.stress': 'Stress Test',
    'subnav.dates': 'Important Dates',
    'subnav.checklist': 'Action Checklist',

    // Document Overview
    'overview.title': 'Document Overview',
    'overview.type': 'Document Type',
    'overview.risk_score': 'Risk Score',
    'overview.overall_risk': 'Overall Risk Level',
    'overview.clauses_analyzed': 'Clauses Analyzed',
    'overview.summary_heading': 'Executive Summary',

    // Key Facts
    'facts.title': 'Key Facts & Terms',
    'facts.monthly_rent': 'Monthly Rent',
    'facts.security_deposit': 'Security Deposit',
    'facts.duration': 'Duration',
    'facts.start_date': 'Start Date',
    'facts.end_date': 'End Date',
    'facts.notice_period': 'Notice Period',
    'facts.renewal_terms': 'Renewal Terms',
    'facts.penalties': 'Penalties & Late Fees',
    'facts.maintenance': 'Maintenance Responsibility',
    'facts.termination': 'Termination Conditions',
    'facts.not_specified': 'Not specified in document',

    // Risk Dashboard
    'risk.title': 'Risk Assessment Dashboard',
    'risk.score_label': 'Overall Risk Score',
    'risk.high': 'High Concern',
    'risk.medium': 'Needs Attention',
    'risk.low': 'Low Concern',
    'risk.top_concerns': 'Top Concerns Detected',
    'risk.concerns_subtitle': 'Critical items that require your immediate attention before signing.',

    // Red Flag Hunter
    'redflag.title': 'Red Flag Hunter — Asymmetric Liabilities & Hidden Traps',
    'redflag.subtitle': 'Clauses identified that impose unilateral burdens or diverge from Indian statutory standards.',
    'redflag.severity': 'Severity',
    'redflag.critical': 'Critical',
    'redflag.high_caution': 'High Caution',
    'redflag.issue': 'Issue Identified',
    'redflag.reason': 'Why It Matters',
    'redflag.location': 'Contract Location',
    'redflag.recommended_action': 'Recommended Action',
    'redflag.view_clause': 'View Clause',
    'redflag.negotiate': 'Draft Counter-Proposal',

    // Financial Exposure
    'financial.title': 'Deterministic Financial Exposure Analysis',
    'financial.subtitle': 'Deterministic mathematical calculation of baseline commitments, penalties, and worst-case liability.',
    'financial.worst_case': 'Total Worst-Case Financial Liability',
    'financial.baseline': 'Baseline Commitment',
    'financial.deposit_at_risk': 'Deposit at Risk',
    'financial.max_penalties': 'Potential Penalties',
    'financial.breakdown': 'Breakdown of Financial Commitments',
    'financial.rent_over_term': 'Total Rent Over Term',
    'financial.security_deposit_locked': 'Security Deposit Locked',
    'financial.early_exit_penalty': 'Early Exit Penalty',
    'financial.late_fee_estimate': 'Estimated Late Payment Fee',

    // Contract X-Ray & Graph
    'xray.title': 'Contract X-Ray & Interdependence Graph',
    'xray.subtitle': 'Visual map of how contractual obligations, penalties, and notice requirements interconnect.',
    'xray.legend_high': 'High Risk Clause',
    'xray.legend_medium': 'Needs Attention',
    'xray.legend_low': 'Standard / Safe',
    'xray.click_hint': 'Click any clause node to inspect details and actions below.',

    // Clause Explorer
    'clauses.title': 'Clause Explorer',
    'clauses.filter_all': 'All Clauses',
    'clauses.filter_high': 'High Concern',
    'clauses.filter_medium': 'Needs Attention',
    'clauses.filter_low': 'Low Concern',
    'clauses.search_placeholder': 'Search clauses by keywords, terms...',
    'clauses.card_clause': 'Clause',
    'clauses.plain_summary': 'Plain Language Summary',
    'clauses.simple_explanation': 'Simple Explanation',
    'clauses.detailed_breakdown': 'Detailed Breakdown',
    'clauses.original_text': 'Original Clause Text (Verbatim)',
    'clauses.what': 'What You Are Agreeing To',
    'clauses.why': 'Why This Matters',
    'clauses.where': 'Location',
    'clauses.what_next': 'Recommended Next Step',
    'clauses.btn_negotiate': 'Negotiate',
    'clauses.btn_devils_advocate': "Devil's Advocate",
    'clauses.btn_legal_context': 'Legal Context (India)',
    'clauses.btn_draft_msg': 'Draft Message',

    // Obligations
    'obligations.title': "What You're Agreeing To (Obligations)",
    'obligations.subtitle': 'Clear list of affirmative duties and restrictions categorized by operational impact.',

    // Important Dates
    'dates.title': 'Important Dates & Deadlines',
    'dates.subtitle': 'Critical calendar triggers, notice windows, and milestone deadlines extracted from the agreement.',
    'dates.event': 'Event / Trigger',
    'dates.date_period': 'Date / Period',
    'dates.details': 'Details & Conditions',

    // Action Checklist
    'checklist.title': 'Before You Sign Checklist',
    'checklist.subtitle': 'Actionable steps to negotiate or verify before committing your signature.',
    'checklist.priority_high': 'High Priority',
    'checklist.priority_medium': 'Medium Priority',
    'checklist.priority_low': 'Low Priority',
    'checklist.task': 'Action Item',
    'checklist.advice': 'Strategic Advice',

    // Stress Test View
    'stress.title': 'Contract Stress Test Simulator',
    'stress.subtitle': 'Simulate real-world financial or life events against this contract to calculate consequences.',
    'stress.select_scenario': 'Choose a Scenario to Simulate',
    'stress.scenario_1': 'Emergency Job Transfer / Relocation',
    'stress.scenario_1_desc': 'What happens if you have to move away at month 4?',
    'stress.scenario_2': 'Delayed Rent Payment (15 Days)',
    'stress.scenario_2_desc': 'What are the daily late fees and eviction triggers?',
    'stress.scenario_3': 'Unannounced Landlord Inspection Dispute',
    'stress.scenario_3_desc': 'Landlord demands immediate unannounced entry at 9 PM.',
    'stress.scenario_4': 'Early Deposit Refund Withholding',
    'stress.scenario_4_desc': 'Landlord deducts painting and maintenance from deposit.',
    'stress.custom_scenario': 'Or Describe a Custom Scenario',
    'stress.custom_placeholder': 'e.g., What happens if the air conditioner breaks and landlord refuses to repair it?',
    'stress.btn_run': 'Run Stress Test Simulation',
    'stress.running': 'Simulating scenario consequences...',
    'stress.results_title': 'Simulation Results & Exposure Breakdown',
    'stress.financial_impact': 'Financial Impact',
    'stress.clauses_triggered': 'Clauses Triggered',
    'stress.consequences': 'Potential Traps & Consequences',
    'stress.counter_strategies': 'Recommended Pre-Signing Counter-Measures',

    // Compare View
    'compare.title': 'Semantic Contract Comparison',
    'compare.subtitle': 'Compare two versions of an agreement to detect hidden modifications or regressions.',
    'compare.doc_a': 'Document A (Original / Baseline)',
    'compare.doc_b': 'Document B (Revised / Counter-offer)',
    'compare.placeholder_a': 'Paste Document A text here...',
    'compare.placeholder_b': 'Paste Document B text here...',
    'compare.btn_load_samples': '⚡ Load Sample Version A & Version B',
    'compare.btn_compare': 'Compare Contracts with Gemini',
    'compare.comparing': 'Comparing contracts...',
    'compare.summary': 'Comparison Summary',
    'compare.key_differences': 'Key Differences Detected',
    'compare.risk_escalations': 'Risk Escalations in Revised Version',
    'compare.side_by_side': 'Side-by-Side Clause Diff',

    // Ask My Document
    'ask.title': 'Ask Your Document',
    'ask.subtitle': 'Ask plain questions about this agreement. Every answer is grounded with verbatim citations.',
    'ask.suggested_title': 'Suggested Questions to Ask:',
    'ask.q1': 'Can the landlord enter my home without notice?',
    'ask.q2': 'What happens if I have to move out 3 months early?',
    'ask.q3': 'How much notice do I need to give to get my deposit back?',
    'ask.q4': 'Who pays for plumbing and structural repairs?',
    'ask.input_placeholder': 'Ask any question about this contract...',
    'ask.btn_send': 'Ask Document',
    'ask.found_in_doc': 'Directly verified from document text',
    'ask.not_in_doc': 'Not explicitly stated in the provided text',
    'ask.sources': 'Source Clauses:',

    // My Documents
    'docs.title': 'My Document Repository',
    'docs.subtitle': 'All analyzed agreements stored securely in your local browser workspace.',
    'docs.empty_title': 'No Saved Documents Yet',
    'docs.empty_desc': 'Analyze a contract or load the realistic sample agreement to store it here.',
    'docs.th_name': 'Document Name',
    'docs.th_type': 'Type',
    'docs.th_risk': 'Risk Level',
    'docs.th_clauses': 'Clauses',
    'docs.th_date': 'Analyzed Date',
    'docs.th_actions': 'Actions',
    'docs.btn_open': 'Open Analysis',
    'docs.btn_delete': 'Delete',

    // Modals
    'modal.close': 'Close',
    'modal.copy': 'Copy Text',
    'modal.copied': 'Copied!',

    // Glossary Modal
    'glossary.title': 'Legal Glossary & Plain Terms',
    'glossary.subtitle': 'Demystifying complex legal terminology into simple everyday language.',
    'glossary.search_placeholder': 'Search legal terms (e.g., Indemnity, Escrow, Severability)...',
    'glossary.meaning': 'Plain Meaning',
    'glossary.example': 'Real-World Example',

    // Negotiation Copilot Modal
    'negotiate.title': 'AI Negotiation Copilot',
    'negotiate.subtitle': 'Generate balanced counter-clauses and polite talking points grounded in standard market practices.',
    'negotiate.select_role': 'Your Role',
    'negotiate.role_tenant': 'Tenant / Renter',
    'negotiate.role_freelancer': 'Freelancer / Contractor',
    'negotiate.role_employee': 'Employee',
    'negotiate.select_tone': 'Tone',
    'negotiate.tone_professional': 'Professional & Polite',
    'negotiate.tone_firm': 'Firm & Assertive',
    'negotiate.tone_collaborative': 'Collaborative',
    'negotiate.btn_generate': 'Generate Counter-Proposal',
    'negotiate.counter_clause': 'Proposed Counter-Wording',
    'negotiate.talking_points': 'Strategic Talking Points for Discussion',
    'negotiate.email_draft': 'Ready-to-Send Email / WhatsApp Message',

    // Devil's Advocate Modal
    'devils.title': "Devil's Advocate — Counterparty Perspective",
    'devils.subtitle': "Understand why the other party drafted this clause and how they could exploit it against you.",
    'devils.commercial_intent': 'Their Commercial Incentive',
    'devils.worst_case': 'Worst-Case Enforcement Scenario',
    'devils.defense': 'Your Defense & Mitigation Strategy',

    // Legal Context Modal
    'context.title': 'Indian Statutory & Judicial Context',
    'context.subtitle': 'Benchmarked against Model Tenancy Act, Indian Contract Act 1872, and standard judicial precedents.',
    'context.benchmark': 'Applicable Statute / Legal Benchmark',
    'context.statutory_standard': 'Statutory & Customary Standard',
    'context.comparison': 'How This Clause Compares',
    'context.enforceability': 'Judicial Enforceability Assessment',

    // Download Report Modal
    'report.title': 'Download Comprehensive Legal Report',
    'report.subtitle': 'Export a structured executive summary and detailed risk dossier for offline review.',
    'report.format': 'Select Export Format',
    'report.pdf': 'PDF Report (Styled Executive Summary)',
    'report.markdown': 'Markdown Dossier (.md)',
    'report.json': 'Structured Data (.json)',
    'report.btn_download': 'Download Report',
    'report.modal_title': 'Document Intelligence Report',
    'report.modal_subtitle': 'Executive summary ready for print or download',
    'report.print_pdf': 'Print / Save as PDF',
    'report.download_summary': 'Download Summary',
    'report.doc_badge': 'LegalLens AI • Document Analysis',
    'report.grounded_genai': 'Grounded GenAI Analysis',
    'report.risk_score_label': '/ 100 Risk Score',
    'report.overall_observation': 'Overall Observation',
    'report.sec_executive_summary': 'Executive Summary',
    'report.sec_key_parameters': 'Key Parameters Extracted',
    'report.sec_concerning_clauses': 'Clauses Requiring Attention',
    'report.why_flagged': 'Why flagged',
    'report.suggested_q': 'Suggested Question',
    'report.footer_disclaimer': 'LegalLens AI provides informational document analysis and plain-language explanations. It does not provide legal advice, determine whether a clause is legally valid, or create an attorney-client relationship.',

    // Chat Box & Ask
    'chat.fab_label': 'Ask',
    'chat.fab_title': 'Ask about your document',
    'chat.header_title': 'Ask Your Contract',
    'chat.empty_title': 'Ask a question about your document',
    'chat.empty_subtitle': 'All answers are based only on your uploaded document.',
    'chat.starter_1': 'What is the security deposit amount?',
    'chat.starter_2': 'Can the landlord enter without notice?',
    'chat.starter_3': 'What happens if I leave early?',
    'chat.starter_4': 'Does the landlord provide free Wi-Fi?',
    'chat.starter_5': 'Can I have pets?',
    'chat.placeholder': 'Ask about your document...',
    'chat.not_found': 'This information was not found in your document.',
    'chat.sources': 'Sources',

    // X-Ray & Graph details
    'xray.header_badge': 'CONTRACT X-RAY & CLAUSE RELATIONSHIP GRAPH',
    'xray.header_title': 'Contract Structure & Semantic Topography',
    'xray.tab_combined': 'Combined View',
    'xray.tab_bar': 'X-Ray Bar',
    'xray.tab_graph': 'Clause Graph',
    'xray.dist_title': 'Contract Risk Distribution Spectrum',
    'xray.legend_high_full': '🔴 High Concern / Restrictive',
    'xray.legend_med_full': '🟡 Needs Scrutiny',
    'xray.legend_low_full': '🟢 Balanced Standard',
    'xray.click_tip': 'Click any clause cell to inspect linked dependencies below.',
    'xray.graph_title': 'Semantic Clause Relationship Topology',
    'xray.graph_subtitle': 'Shows how separate clauses cross-impact financial liability, forfeiture, and termination.',
    'xray.interconnected': 'Interconnected',
    'xray.edges_title': 'Documented Dependency Linkages:',
    'xray.connected_links': 'Connected Clause Links:',
    'xray.view_in_doc': 'View in Document',
    'xray.negotiate_redline': 'Negotiate Redline',

    // Loading & Error
    'loading.message': 'Analyzing your document...',
    'loading.submessage': 'This usually takes 15–30 seconds depending on document length.',

    // Categories
    'cat.rent_payments': 'Rent & Payments',
    'cat.security_deposit': 'Security Deposit',
    'cat.duration': 'Duration & Term',
    'cat.termination': 'Termination & Exit',
    'cat.maintenance': 'Maintenance & Repairs',
    'cat.property_rules': 'Property Rules',
    'cat.guests': 'Guests & Visitors',
    'cat.privacy': 'Privacy & Entry Rights',
    'cat.liability': 'Liability & Indemnity',
    'cat.rent_increase': 'Rent Escalation',
    'cat.restrictions': 'Restrictions & Bans',
    'cat.move_out': 'Move-out & Handover',
    'cat.dispute_resolution': 'Dispute Resolution',
    'cat.utilities': 'Utilities & Bills',
    'cat.insurance': 'Insurance',
    'cat.other': 'General / Other',

    // Risk Levels
    'risk_level.high_concern': 'High Concern',
    'risk_level.needs_attention': 'Needs Attention',
    'risk_level.low_concern': 'Low Concern',

    // General Words
    'btn.back': 'Back',
    'btn.cancel': 'Cancel',
    'btn.save': 'Save',
    'btn.clear': 'Clear',
    'btn.new_doc': 'New Document',
  },

  // ══════════════════════════════════════════════════════════════
  // HINDI (हिन्दी)
  // ══════════════════════════════════════════════════════════════
  hi: {
    // Top banner & Branding
    'banner.title': 'लीगल लेंस एआई — समझें। तुलना करें। सवाल पूछें। कार्रवाई करें। | Hack2Skill GenAI कानूनी सहायता',
    'banner.demo_mode': 'डेमो मोड (सक्रिय)',
    'brand.name': 'लीगल लेंस एआई',
    'brand.tagline': 'अपने कानूनी दस्तावेज़ों को आसानी से समझें',
    'brand.version': 'जेमिनी ३.६',

    // Navigation
    'nav.home': 'होम',
    'nav.analyze': 'विश्लेषण',
    'nav.stress_test': 'तनाव परीक्षण',
    'nav.compare': 'तुलना करें',
    'nav.ask': 'प्रश्न पूछें',
    'nav.my_documents': 'मेरे दस्तावेज़',
    'nav.glossary': 'शब्दावली',
    'nav.load_sample': '⚡ नमूना लोड करें',

    // Disclaimer
    'disclaimer.text': 'लीगल लेंस एआई एक एआई-संचालित शैक्षिक और दस्तावेज़ समझ उपकरण है। यह केवल सूचनात्मक उद्देश्यों के लिए स्वचालित विश्लेषण और सरल भाषा में सारांश प्रदान करता है। यह कोई लॉ फर्म नहीं है, कानूनी सलाह नहीं देता है, और योग्य वकील का विकल्प नहीं है।',

    // Hero Section
    'hero.badge': 'जेमिनी ३.६ और भारतीय कानून मानकों द्वारा संचालित',
    'hero.title_part1': 'हस्ताक्षर करने से पहले अनुबंध',
    'hero.title_highlight': 'को अच्छी तरह समझें।',
    'hero.subtitle': 'किराया समझौतों, रोजगार अनुबंधों और व्यावसायिक समझौतों के लिए त्वरित सरल-भाषा सारांश, छिपी हुई देनदारियों की पहचान, और एआई बातचीत साथी।',
    'hero.cta_analyze': 'मुफ़्त अनुबंध विश्लेषण',
    'hero.cta_compare': 'दो दस्तावेज़ों की तुलना करें',
    'hero.cta_sample': '⚡ नमूना दस्तावेज़ जांचें',
    'hero.feature1': 'शून्य कानूनी जटिलता',
    'hero.feature2': 'सटीक वित्तीय गणना',
    'hero.feature3': 'भारतीय कानून आधारित',
    'hero.feature4': 'निश्चित बैकअप परिणाम',

    // Hero Live Preview Card
    'preview.live_badge': 'लाइव विश्लेषण पूर्वावलोकन',
    'preview.doc_title': 'आवासीय किराया समझौता (बेंगलुरु)',
    'preview.overall_risk': 'कुल जोखिम',
    'preview.risk_badge': 'उच्च चिंता (74/100)',
    'preview.red_flags': 'पहचाने गए गंभीर लाल झंडे',
    'preview.monthly_rent': 'मासिक किराया',
    'preview.rent_val': '₹25,000 / माह',
    'preview.security_deposit': 'सुरक्षा जमा राशि',
    'preview.deposit_val': '₹1,50,000 (6 माह)',
    'preview.asymmetric_clauses': 'एकतरफा पहचानी गई शर्तें:',
    'preview.item1': 'मकान मालिक बिना पूर्व सूचना किसी भी समय घर आ सकता है (खंड 7)',
    'preview.item2': 'समय से पहले खाली करने पर पूरे 3 महीने का किराया ज़ब्त (खंड 6)',
    'preview.item3': 'किराया देरी पर प्रतिदिन ₹500 का भारी जुर्माना (खंड 2)',

    // Capabilities Grid
    'cap.xray_title': 'अनुबंध एक्स-रे और लाल झंडे',
    'cap.xray_desc': 'एकतरफा शर्तें, बिना सूचना निरीक्षण और अनुचित देनदारियों की सटीक पहचान करें।',
    'cap.xray_action': 'विश्लेषण शुरू करें →',
    'cap.stress_title': 'अनुबंध तनाव परीक्षण',
    'cap.stress_desc': 'नौकरी स्थानांतरण, किराया देरी या आपातकाल जैसी परिस्थितियों का सटीक प्रभाव अनुकरण करें।',
    'cap.stress_action': 'परिस्थितियों का अनुकरण करें →',
    'cap.diff_title': 'दस्तावेज़ तुलना (सिमेंटिक डिफ)',
    'cap.diff_desc': 'जुर्माने या नोटिस अवधि में किए गए गुप्त बदलावों को पकड़ने के लिए दो संस्करणों की तुलना करें।',
    'cap.diff_action': 'अनुबंधों की तुलना करें →',
    'cap.qa_title': 'सटीक साक्ष्य आधारित प्रश्नोत्तरी',
    'cap.qa_desc': 'सरल सवाल पूछें। अनुबंध के मूल पाठ से सीधे सटीक उद्धरण प्राप्त करें।',
    'cap.qa_action': 'दस्तावेज़ से पूछें →',

    // Document Input
    'input.title': 'अनुबंध अपलोड करें या टेक्स्ट पेस्ट करें',
    'input.tab_upload': 'दस्तावेज़ अपलोड करें',
    'input.tab_paste': 'टेक्स्ट पेस्ट करें',
    'input.drop_title': 'अपनी अनुबंध फ़ाइल यहाँ खींचें और छोड़ें',
    'input.drop_subtitle': 'PDF, DOCX या TXT का समर्थन (अधिकतम 5MB)',
    'input.browse_btn': 'फ़ाइल चुनें',
    'input.file_selected': 'चयनित फ़ाइल:',
    'input.paste_placeholder': 'पूरा अनुबंध टेक्स्ट यहाँ पेस्ट करें (जैसे किराया समझौता, रोजगार अनुबंध, एनडीए)...',
    'input.char_count': 'वर्ण',
    'input.words_count': 'शब्द',
    'input.analyze_btn': 'जेमिनी के साथ अनुबंध विश्लेषण करें',
    'input.analyzing_btn': 'अनुबंध का विश्लेषण जारी है...',
    'input.or_sample': 'या सत्यापित नमूना अनुबंध से तुरंत शुरू करें:',
    'input.load_sample_btn': '⚡ इंदिरानगर किराया समझौता नमूना लोड करें',

    // Subnav Toolbar
    'subnav.all': 'पूर्ण कार्यक्षेत्र',
    'subnav.red_flags': 'लाल झंडे / चेतावनियां',
    'subnav.xray_graph': 'एक्स-रे और ग्राफ़',
    'subnav.financial': 'वित्तीय जोखिम',
    'subnav.clauses': 'सभी खंड',
    'subnav.stress': 'तनाव परीक्षण',
    'subnav.dates': 'महत्वपूर्ण तिथियां',
    'subnav.checklist': 'कार्य सूची',

    // Document Overview
    'overview.title': 'दस्तावेज़ अवलोकन',
    'overview.type': 'दस्तावेज़ का प्रकार',
    'overview.risk_score': 'जोखिम स्कोर',
    'overview.overall_risk': 'कुल जोखिम स्तर',
    'overview.clauses_analyzed': 'विश्लेषित खंड',
    'overview.summary_heading': 'कार्यकारी सारांश',

    // Key Facts
    'facts.title': 'मुख्य तथ्य और महत्वपूर्ण शर्तें',
    'facts.monthly_rent': 'मासिक किराया',
    'facts.security_deposit': 'सुरक्षा जमा राशि',
    'facts.duration': 'अवधि',
    'facts.start_date': 'प्रारंभ तिथि',
    'facts.end_date': 'समाप्ति तिथि',
    'facts.notice_period': 'नोटिस अवधि',
    'facts.renewal_terms': 'नवीनीकरण की शर्तें',
    'facts.penalties': 'दंड और विलंब शुल्क',
    'facts.maintenance': 'रखरखाव की जिम्मेदारी',
    'facts.termination': 'समाप्ति की शर्तें',
    'facts.not_specified': 'दस्तावेज़ में निर्दिष्ट नहीं',

    // Risk Dashboard
    'risk.title': 'जोखिम मूल्यांकन डैशबोर्ड',
    'risk.score_label': 'कुल अनुबंध जोखिम स्कोर',
    'risk.high': 'उच्च चिंता',
    'risk.medium': 'सावधानी अपेक्षित',
    'risk.low': 'कम चिंता',
    'risk.top_concerns': 'पहचाने गए मुख्य खतरे',
    'risk.concerns_subtitle': 'हस्ताक्षर करने से पहले इन महत्वपूर्ण बातों पर तुरंत ध्यान देना आवश्यक है।',

    // Red Flag Hunter
    'redflag.title': 'रेड फ्लैग हंटर — छिपी हुई देनदारियां और जाल',
    'redflag.subtitle': 'वे खंड जो एकतरफा बोझ डालते हैं या भारतीय मानक कानूनी प्रथाओं से विचलित हैं।',
    'redflag.severity': 'गंभीरता',
    'redflag.critical': 'अत्यंत गंभीर',
    'redflag.high_caution': 'उच्च सावधानी',
    'redflag.issue': 'पहचाना गया मुद्दा',
    'redflag.reason': 'यह क्यों महत्वपूर्ण है',
    'redflag.location': 'अनुबंध में स्थान',
    'redflag.recommended_action': 'अनुशंसित कदम',
    'redflag.view_clause': 'खंड देखें',
    'redflag.negotiate': 'जवाबी प्रस्ताव तैयार करें',

    // Financial Exposure
    'financial.title': 'सटीक वित्तीय देनदारी विश्लेषण',
    'financial.subtitle': 'मूल प्रतिबद्धताओं, दंडों और सबसे खराब स्थिति में संभावित वित्तीय नुकसान की सटीक गणना।',
    'financial.worst_case': 'कुल संभावित अधिकतम वित्तीय देनदारी',
    'financial.baseline': 'मूल किराया प्रतिबद्धता',
    'financial.deposit_at_risk': 'जोखिम में जमा राशि',
    'financial.max_penalties': 'संभावित अधिकतम दंड',
    'financial.breakdown': 'वित्तीय प्रतिबद्धताओं का विवरण',
    'financial.rent_over_term': 'पूरी अवधि का कुल किराया',
    'financial.security_deposit_locked': 'अवरुद्ध सुरक्षा जमा',
    'financial.early_exit_penalty': 'समय पूर्व खाली करने का दंड',
    'financial.late_fee_estimate': 'अनुमानित विलंब शुल्क',

    // Contract X-Ray & Graph
    'xray.title': 'अनुबंध एक्स-रे और खंड निर्भरता ग्राफ़',
    'xray.subtitle': 'अनुबंध की शर्तें, दंड और नोटिस एक-दूसरे को कैसे प्रभावित करते हैं इसका विज़ुअल मानचित्र।',
    'xray.legend_high': 'उच्च जोखिम वाला खंड',
    'xray.legend_medium': 'सावधानी अपेक्षित',
    'xray.legend_low': 'सामान्य / सुरक्षित',
    'xray.click_hint': 'विवरण और विकल्प देखने के लिए किसी भी नोड पर क्लिक करें।',

    // Clause Explorer
    'clauses.title': 'खंड अन्वेषक (क्लॉज एक्सप्लोरर)',
    'clauses.filter_all': 'सभी खंड',
    'clauses.filter_high': 'उच्च चिंता वाले',
    'clauses.filter_medium': 'सावधानी अपेक्षित',
    'clauses.filter_low': 'कम चिंता वाले',
    'clauses.search_placeholder': 'कीवर्ड या शब्दों द्वारा खोजें...',
    'clauses.card_clause': 'खंड',
    'clauses.plain_summary': 'सरल भाषा में सारांश',
    'clauses.simple_explanation': 'आसान व्याख्या',
    'clauses.detailed_breakdown': 'विस्तृत विश्लेषण',
    'clauses.original_text': 'मूल अनुबंध पाठ (यथावत)',
    'clauses.what': 'आप किस बात पर सहमति दे रहे हैं',
    'clauses.why': 'यह क्यों महत्वपूर्ण है',
    'clauses.where': 'अनुबंध में स्थान',
    'clauses.what_next': 'अनुशंसित अगला कदम',
    'clauses.btn_negotiate': 'बातचीत करें',
    'clauses.btn_devils_advocate': 'डेविल्स एडवोकेट',
    'clauses.btn_legal_context': 'कानूनी संदर्भ (भारत)',
    'clauses.btn_draft_msg': 'संदेश तैयार करें',

    // Obligations
    'obligations.title': 'आप क्या स्वीकार कर रहे हैं (दायित्व)',
    'obligations.subtitle': 'आपके कर्तव्यों और प्रतिबंधों की स्पष्ट सूची।',

    // Important Dates
    'dates.title': 'महत्वपूर्ण तिथियां और समय सीमाएं',
    'dates.subtitle': 'अनुबंध से निकाली गई महत्वपूर्ण तिथियां, नोटिस विंडो और समय सीमाएं।',
    'dates.event': 'घटना / मील का पत्थर',
    'dates.date_period': 'तिथि या अवधि',
    'dates.details': 'शर्तें और विवरण',

    // Action Checklist
    'checklist.title': 'हस्ताक्षर से पहले की कार्य सूची',
    'checklist.subtitle': 'हस्ताक्षर करने से पहले बातचीत या सत्यापित करने योग्य व्यावहारिक कदम।',
    'checklist.priority_high': 'उच्च प्राथमिकता',
    'checklist.priority_medium': 'मध्यम प्राथमिकता',
    'checklist.priority_low': 'कम प्राथमिकता',
    'checklist.task': 'कार्य',
    'checklist.advice': 'रणनीतिक सलाह',

    // Stress Test View
    'stress.title': 'अनुबंध तनाव परीक्षण सिम्युलेटर',
    'stress.subtitle': 'वास्तविक जीवन की आपात स्थितियों का अनुबंध पर क्या प्रभाव पड़ेगा इसका विश्लेषण करें।',
    'stress.select_scenario': 'परीक्षण के लिए एक परिस्थिति चुनें',
    'stress.scenario_1': 'आपातकालीन नौकरी स्थानांतरण / स्थानांतरण',
    'stress.scenario_1_desc': 'यदि आपको चौथे महीने में शहर छोड़ना पड़े तो क्या होगा?',
    'stress.scenario_2': 'किराया भुगतान में 15 दिन की देरी',
    'stress.scenario_2_desc': 'दैनिक विलंब शुल्क और निष्कासन नियम क्या लागू होंगे?',
    'stress.scenario_3': 'बिना पूर्व सूचना मकान मालिक निरीक्षण विवाद',
    'stress.scenario_3_desc': 'रात 9 बजे बिना बताए मकान मालिक के आने पर आपके अधिकार।',
    'stress.scenario_4': 'सुरक्षा जमा राशि वापस न करने का विवाद',
    'stress.scenario_4_desc': 'मकान मालिक पेंटिंग और रखरखाव के नाम पर पैसे काट ले।',
    'stress.custom_scenario': 'या अपनी खुद की परिस्थिति लिखें',
    'stress.custom_placeholder': 'जैसे, यदि एसी खराब हो जाए और मकान मालिक मरम्मत से मना कर दे?',
    'stress.btn_run': 'तनाव परीक्षण अनुकरण चलाएं',
    'stress.running': 'परिस्थितियों का विश्लेषण जारी है...',
    'stress.results_title': 'सिमुलेशन परिणाम और वित्तीय जोखिम विवरण',
    'stress.financial_impact': 'वित्तीय प्रभाव',
    'stress.clauses_triggered': 'सक्रिय हुए अनुबंध खंड',
    'stress.consequences': 'संभावित खतरे और परिणाम',
    'stress.counter_strategies': 'हस्ताक्षर से पहले अनुशंसित सुरक्षा उपाय',

    // Compare View
    'compare.title': 'सिमेंटिक अनुबंध तुलना',
    'compare.subtitle': 'गुप्त बदलावों या नुकसानदेह संशोधनों को पकड़ने के लिए दो संस्करणों की तुलना करें।',
    'compare.doc_a': 'दस्तावेज़ क (मूल / प्रारंभिक)',
    'compare.doc_b': 'दस्तावेज़ ख (संशोधित / दूसरा प्रस्ताव)',
    'compare.placeholder_a': 'दस्तावेज़ क का पाठ यहाँ पेस्ट करें...',
    'compare.placeholder_b': 'दस्तावेज़ ख का पाठ यहाँ पेस्ट करें...',
    'compare.btn_load_samples': '⚡ नमूना संस्करण क और ख लोड करें',
    'compare.btn_compare': 'जेमिनी के साथ अनुबंधों की तुलना करें',
    'compare.comparing': 'तुलना की जा रही है...',
    'compare.summary': 'तुलना सारांश',
    'compare.key_differences': 'पहचाने गए मुख्य अंतर',
    'compare.risk_escalations': 'संशोधित संस्करण में बढ़े हुए जोखिम',
    'compare.side_by_side': 'खंड-दर-खंड तुलना',

    // Ask My Document
    'ask.title': 'अपने दस्तावेज़ से पूछें',
    'ask.subtitle': 'इस समझौते के बारे में कोई भी प्रश्न पूछें। प्रत्येक उत्तर सीधे अनुबंध उद्धरणों पर आधारित है।',
    'ask.suggested_title': 'सुझाए गए प्रश्न:',
    'ask.q1': 'क्या मकान मालिक बिना सूचना के घर आ सकता है?',
    'ask.q2': 'यदि मुझे 3 महीने पहले घर खाली करना पड़े तो क्या होगा?',
    'ask.q3': 'पूरी सुरक्षा जमा राशि वापस पाने के लिए कितना नोटिस देना होगा?',
    'ask.q4': 'नलसाजी और बिजली की मरम्मत का खर्च कौन उठाएगा?',
    'ask.input_placeholder': 'इस अनुबंध के बारे में कोई भी सवाल पूछें...',
    'ask.btn_send': 'प्रश्न पूछें',
    'ask.found_in_doc': 'सीधे दस्तावेज़ से सत्यापित',
    'ask.not_in_doc': 'दिए गए पाठ में स्पष्ट रूप से उल्लेखित नहीं है',
    'ask.sources': 'स्रोत खंड:',

    // My Documents
    'docs.title': 'मेरी दस्तावेज़ रिपॉजिटरी',
    'docs.subtitle': 'आपके स्थानीय ब्राउज़र वर्कस्पेस में सुरक्षित रूप से सहेजे गए सभी अनुबंध।',
    'docs.empty_title': 'अभी तक कोई सहेजा गया दस्तावेज़ नहीं है',
    'docs.empty_desc': 'यहाँ देखने के लिए किसी अनुबंध का विश्लेषण करें या नमूना लोड करें।',
    'docs.th_name': 'दस्तावेज़ का नाम',
    'docs.th_type': 'प्रकार',
    'docs.th_risk': 'जोखिम स्तर',
    'docs.th_clauses': 'कुल खंड',
    'docs.th_date': 'विश्लेषण की तिथि',
    'docs.th_actions': 'कार्रवाई',
    'docs.btn_open': 'विश्लेषण खोलें',
    'docs.btn_delete': 'हटाएं',

    // Modals
    'modal.close': 'बंद करें',
    'modal.copy': 'कॉपी करें',
    'modal.copied': 'कॉपी हो गया!',

    // Glossary Modal
    'glossary.title': 'कानूनी शब्दावली और सरल अर्थ',
    'glossary.subtitle': 'जटिल कानूनी शब्दों को आसान रोज़मर्रा की भाषा में समझें।',
    'glossary.search_placeholder': 'कानूनी शब्द खोजें (उदा. क्षतिपूर्ति, एस्क्रो, अधिकार क्षेत्र)...',
    'glossary.meaning': 'सरल अर्थ',
    'glossary.example': 'वास्तविक उदाहरण',

    // Negotiation Copilot Modal
    'negotiate.title': 'एआई बातचीत सहायक (नेगोशिएशन कोपायलट)',
    'negotiate.subtitle': 'बाज़ार मानकों पर आधारित संतुलित जवाबी खंड और बातचीत के मुख्य बिंदु तैयार करें।',
    'negotiate.select_role': 'आपकी भूमिका',
    'negotiate.role_tenant': 'किरायेदार',
    'negotiate.role_freelancer': 'फ्रीलांसर / ठेकेदार',
    'negotiate.role_employee': 'कर्मचारी',
    'negotiate.select_tone': 'बातचीत का लहज़ा',
    'negotiate.tone_professional': 'पेशेवर और विनम्र',
    'negotiate.tone_firm': 'स्पष्ट और दृढ़',
    'negotiate.tone_collaborative': 'सहयोगात्मक',
    'negotiate.btn_generate': 'जवाबी प्रस्ताव तैयार करें',
    'negotiate.counter_clause': 'प्रस्तावित संशोधित खंड',
    'negotiate.talking_points': 'चर्चा के लिए रणनीतिक बिंदु',
    'negotiate.email_draft': 'भेजने के लिए तैयार ईमेल / संदेश',

    // Devil's Advocate Modal
    'devils.title': 'डेविल्स एडवोकेट — दूसरी पार्टी का दृष्टिकोण',
    'devils.subtitle': 'समझें कि दूसरी पार्टी ने यह शर्त क्यों रखी और वे आपके खिलाफ इसका कैसे इस्तेमाल कर सकते हैं।',
    'devils.commercial_intent': 'उनका व्यावसायिक हित',
    'devils.worst_case': 'सबसे खराब स्थिति में लागू करने का तरीका',
    'devils.defense': 'आपकी सुरक्षा और बचाव की रणनीति',

    // Legal Context Modal
    'context.title': 'भारतीय कानूनी और न्यायिक संदर्भ',
    'context.subtitle': 'मॉडल टेनेंसी एक्ट, भारतीय अनुबंध अधिनियम १८७२ और अदालती फैसलों से तुलना।',
    'context.benchmark': 'लागू कानून / कानूनी मानक',
    'context.statutory_standard': 'वैधानिक और सामान्य मानक',
    'context.comparison': 'यह खंड कानूनी मानक की तुलना में कैसा है',
    'context.enforceability': 'अदालत में लागू होने की संभावना',

    // Download Report Modal
    'report.title': 'विस्तृत कानूनी रिपोर्ट डाउनलोड करें',
    'report.subtitle': 'ऑफ़लाइन समीक्षा या वकील से चर्चा के लिए संपूर्ण जोखिम रिपोर्ट डाउनलोड करें।',
    'report.format': 'फ़ाइल प्रारूप चुनें',
    'report.pdf': 'PDF रिपोर्ट (प्रारूपित सारांश)',
    'report.markdown': 'मार्कडाउन दस्तावेज़ (.md)',
    'report.json': 'रॉ डेटा (.json)',
    'report.btn_download': 'रिपोर्ट डाउनलोड करें',
    'report.modal_title': 'दस्तावेज़ इंटेलिजेंस रिपोर्ट',
    'report.modal_subtitle': 'प्रिंट या डाउनलोड के लिए तैयार कार्यकारी सारांश',
    'report.print_pdf': 'प्रिंट करें / पीडीएफ के रूप में सहेजें',
    'report.download_summary': 'सारांश डाउनलोड करें',
    'report.doc_badge': 'लीगल लेंस एआई • दस्तावेज़ विश्लेषण',
    'report.grounded_genai': 'सत्यापित जेन एआई विश्लेषण',
    'report.risk_score_label': '/ १०० जोखिम स्कोर',
    'report.overall_observation': 'समग्र अवलोकन',
    'report.sec_executive_summary': 'कार्यकारी सारांश',
    'report.sec_key_parameters': 'निकाले गए मुख्य पैरामीटर',
    'report.sec_concerning_clauses': 'ध्यान देने योग्य खंड',
    'report.why_flagged': 'ध्वजांकित करने का कारण',
    'report.suggested_q': 'सुझाया गया प्रश्न',
    'report.footer_disclaimer': 'लीगल लेंस एआई केवल सूचनात्मक विश्लेषण और सरल व्याख्या प्रदान करता है। यह कोई कानूनी सलाह नहीं देता और वकील-मुवक्किल संबंध स्थापित नहीं करता।',

    // Chat Box & Ask
    'chat.fab_label': 'पूछें',
    'chat.fab_title': 'अपने दस्तावेज़ के बारे में पूछें',
    'chat.header_title': 'अनुबंध से पूछें',
    'chat.empty_title': 'अपने दस्तावेज़ के बारे में एक प्रश्न पूछें',
    'chat.empty_subtitle': 'सभी उत्तर केवल आपके अपलोड किए गए दस्तावेज़ पर आधारित हैं।',
    'chat.starter_1': 'सुरक्षा जमा राशि कितनी है?',
    'chat.starter_2': 'क्या मकान मालिक बिना पूर्व सूचना आ सकता है?',
    'chat.starter_3': 'अगर मैं जल्दी छोड़ दूं तो क्या होगा?',
    'chat.starter_4': 'क्या मकान मालिक मुफ्त वाई-फाई देता है?',
    'chat.starter_5': 'क्या मैं पालतू जानवर रख सकता हूँ?',
    'chat.placeholder': 'अपने दस्तावेज़ के बारे में पूछें...',
    'chat.not_found': 'यह जानकारी आपके दस्तावेज़ में नहीं मिली।',
    'chat.sources': 'स्रोत',

    // X-Ray & Graph details
    'xray.header_badge': 'अनुबंध एक्स-रे और खंड संबंध ग्राफ़',
    'xray.header_title': 'अनुबंध संरचना और सिमेंटिक संबंध',
    'xray.tab_combined': 'संयुक्त दृश्य',
    'xray.tab_bar': 'एक्स-रे बार',
    'xray.tab_graph': 'खंड ग्राफ़',
    'xray.dist_title': 'अनुबंध जोखिम वितरण स्पेक्ट्रम',
    'xray.legend_high_full': '🔴 उच्च चिंता / प्रतिबंधात्मक',
    'xray.legend_med_full': '🟡 सावधानी अपेक्षित',
    'xray.legend_low_full': '🟢 संतुलित मानक',
    'xray.click_tip': 'नीचे जुड़े हुए विवरण देखने के लिए किसी भी खंड पर क्लिक करें।',
    'xray.graph_title': 'सिमेंटिक खंड संबंध टोपोलॉजी',
    'xray.graph_subtitle': 'दर्शाता है कि अलग-अलग खंड वित्तीय देनदारी, ज़ब्ती और समाप्ति को कैसे प्रभावित करते हैं।',
    'xray.interconnected': 'परस्पर जुड़े हुए',
    'xray.edges_title': 'दस्तावेज़ी निर्भरता संबंध:',
    'xray.connected_links': 'जुड़े हुए खंड लिंक:',
    'xray.view_in_doc': 'दस्तावेज़ में देखें',
    'xray.negotiate_redline': 'शर्तों पर बातचीत करें',

    // Loading & Error
    'loading.message': 'आपके दस्तावेज़ का विश्लेषण जारी है...',
    'loading.submessage': 'दस्तावेज़ की लंबाई के आधार पर इसमें आमतौर पर 15-30 सेकंड लगते हैं।',

    // Categories
    'cat.rent_payments': 'किराया और भुगतान',
    'cat.security_deposit': 'सुरक्षा जमा राशि',
    'cat.duration': 'अवधि और नियम',
    'cat.termination': 'समाप्ति और निकास',
    'cat.maintenance': 'रखरखाव और मरम्मत',
    'cat.property_rules': 'संपत्ति के नियम',
    'cat.guests': 'अतिथि और आगंतुक',
    'cat.privacy': 'गोपनीयता और प्रवेश अधिकार',
    'cat.liability': 'दायित्व और क्षतिपूर्ति',
    'cat.rent_increase': 'किराया वृद्धि',
    'cat.restrictions': 'प्रतिबंध और रोक',
    'cat.move_out': 'खाली करना और सौंपना',
    'cat.dispute_resolution': 'विवाद समाधान',
    'cat.utilities': 'उपयोगिताएं और बिल',
    'cat.insurance': 'बीमा',
    'cat.other': 'सामान्य / अन्य',

    // Risk Levels
    'risk_level.high_concern': 'उच्च चिंता',
    'risk_level.needs_attention': 'सावधानी अपेक्षित',
    'risk_level.low_concern': 'कम चिंता',

    // General Words
    'btn.back': 'वापस',
    'btn.cancel': 'रद्द करें',
    'btn.save': 'सहेजें',
    'btn.clear': 'साफ़ करें',
    'btn.new_doc': 'नया दस्तावेज़',
  },

  // ══════════════════════════════════════════════════════════════
  // KANNADA (ಕನ್ನಡ)
  // ══════════════════════════════════════════════════════════════
  kn: {
    // Top banner & Branding
    'banner.title': 'ಲೀಗಲ್ ಲೆನ್ಸ್ ಎಐ — ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ಹೋಲಿಸಿ. ಪ್ರಶ್ನಿಸಿ. ಕಾರ್ಯನಿರ್ವಹಿಸಿ. | Hack2Skill GenAI ಕಾನೂನು ನೆರವು',
    'banner.demo_mode': 'ಡೆಮೊ ಮೋಡ್ (ಸಕ್ರಿಯ)',
    'brand.name': 'ಲೀಗಲ್ ಲೆನ್ಸ್ ಎಐ',
    'brand.tagline': 'ನಿಮ್ಮ ಕಾನೂನು ಒಪ್ಪಂದಗಳನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
    'brand.version': 'ಜೆಮಿನಿ ೩.೬',

    // Navigation
    'nav.home': 'ಮುಖಪುಟ',
    'nav.analyze': 'ವಿಶ್ಲೇಷಣೆ',
    'nav.stress_test': 'ಒತ್ತಡ ಪರೀಕ್ಷೆ',
    'nav.compare': 'ಹೋಲಿಕೆ',
    'nav.ask': 'ಪ್ರಶ್ನಿಸಿ',
    'nav.my_documents': 'ನನ್ನ ದಾಖಲೆಗಳು',
    'nav.glossary': 'ಪದಕೋಶ',
    'nav.load_sample': '⚡ ಮಾದರಿ ಲೋಡ್ ಮಾಡಿ',

    // Disclaimer
    'disclaimer.text': 'ಲೀಗಲ್ ಲೆನ್ಸ್ ಎಐ ಒಂದು ಎಐ-ಆಧಾರಿತ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ದಾಖಲೆ ಗ್ರಹಿಕೆಯ ಸಾಧನವಾಗಿದೆ. ಇದು ಕೇವಲ ಮಾಹಿತಿ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಸ್ವಯಂಚಾಲಿತ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಸರಳ ಸಾರಾಂಶವನ್ನು ಒದಗಿಸುತ್ತದೆ. ಇದು ಯಾವುದೇ ಕಾನೂನು ಸಂಸ್ಥೆಯಲ್ಲ, ನೇರ ಕಾನೂನು ಸಲಹೆಯನ್ನು ನೀಡುವುದಿಲ್ಲ, ಮತ್ತು ವಕೀಲರ ಪರ್ಯಾಯವಲ್ಲ.',

    // Hero Section
    'hero.badge': 'ಜೆಮಿನಿ ೩.೬ ಮತ್ತು ಭಾರತೀಯ ಕಾನೂನು ಮಾನದಂಡಗಳ ಆಧಾರಿತ',
    'hero.title_part1': 'ಸಹಿ ಮಾಡುವ ಮುನ್ನವೇ ಒಪ್ಪಂದಗಳನ್ನು',
    'hero.title_highlight': 'ಸಂಪೂರ್ಣವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
    'hero.subtitle': 'ಬಾಡಿಗೆ ಒಪ್ಪಂದಗಳು, ಉದ್ಯೋಗ ಒಪ್ಪಂದಗಳು ಮತ್ತು ವಾಣಿಜ್ಯ ಲೀಸ್‌ಗಳಿಗಾಗಿ ತ್ವರಿತ ಸರಳ ಭಾಷೆಯ ವಿವರಣೆ, ಅಡಗಿರುವ ಹೊಣೆಗಾರಿಕೆಗಳ ಪತ್ತೆ ಮತ್ತು ಎಐ ಸಂಧಾನ ಸಹಾಯಕ.',
    'hero.cta_analyze': 'ಉಚಿತ ಒಪ್ಪಂದ ವಿಶ್ಲೇಷಣೆ',
    'hero.cta_compare': 'ಎರಡು ದಾಖಲೆಗಳನ್ನು ಹೋಲಿಸಿ',
    'hero.cta_sample': '⚡ ವಾಸ್ತವಿಕ ಮಾದರಿ ಪರಿಶೀಲಿಸಿ',
    'hero.feature1': 'ಶೂನ್ಯ ಕಾನೂನು ಕ್ಲಿಷ್ಟತೆ',
    'hero.feature2': 'ಖಚಿತ ಆರ್ಥಿಕ ಲೆಕ್ಕಾಚಾರ',
    'hero.feature3': 'ಭಾರತೀಯ ಕಾನೂನು ಆಧಾರಿತ',
    'hero.feature4': 'ದೃಢ ಫಲಿತಾಂಶಗಳು',

    // Hero Live Preview Card
    'preview.live_badge': 'ಲೈವ್ ವಿಶ್ಲೇಷಣೆ ಮುನ್ನೋಟ',
    'preview.doc_title': 'ವಸತಿ ಬಾಡಿಗೆ ಒಪ್ಪಂದ (ಬೆಂಗಳೂರು)',
    'preview.overall_risk': 'ಒಟ್ಟಾರೆ ಅಪಾಯ',
    'preview.risk_badge': 'ಹೆಚ್ಚಿನ ಅಪಾಯ (74/100)',
    'preview.red_flags': 'ಪತ್ತೆಯಾದ ಗಂಭೀರ ಎಚ್ಚರಿಕೆಗಳು',
    'preview.monthly_rent': 'ತಿಂಗಳ ಬಾಡಿಗೆ',
    'preview.rent_val': '₹25,000 / ತಿಂಗಳಿಗೆ',
    'preview.security_deposit': 'ಭದ್ರತಾ ಠೇವಣಿ',
    'preview.deposit_val': '₹1,50,000 (6 ತಿಂಗಳು)',
    'preview.asymmetric_clauses': 'ಪತ್ತೆಯಾದ ಏಕಪಕ್ಷೀಯ ಷರತ್ತುಗಳು:',
    'preview.item1': 'ಯಾವುದೇ ಮುನ್ಸೂಚನೆ ಇಲ್ಲದೆ ಮನೆ ಮಾಲೀಕರು ಯಾವಾಗ ಬೇಕಾದರೂ ಭೇಟಿ ನೀಡಬಹುದು (ಷರತ್ತು 7)',
    'preview.item2': 'ಅವಧಿಗೂ ಮುನ್ನ ಖಾಲಿ ಮಾಡಿದರೆ ಪೂರ್ಣ 3 ತಿಂಗಳ ಬಾಡಿಗೆ ಮುಟ್ಟುಗೋಲು (ಷರತ್ತು 6)',
    'preview.item3': 'ಬಾಡಿಗೆ ವಿಳಂಬಕ್ಕೆ ದಿನಕ್ಕೆ ₹500 ಭಾರೀ ದಂಡ (ಷರತ್ತು 2)',

    // Capabilities Grid
    'cap.xray_title': 'ಒಪ್ಪಂದದ ಎಕ್ಸ್-ರೇ ಮತ್ತು ರೆಡ್ ಫ್ಲ್ಯಾಗ್‌ಗಳು',
    'cap.xray_desc': 'ಏಕಪಕ್ಷೀಯ ನಷ್ಟ, ಅನಿರೀಕ್ಷಿತ ತಪಾಸಣೆ ಮತ್ತು ಅಸಮಾನ ಹೊಣೆಗಾರಿಕೆಗಳನ್ನು ನಿಖರವಾಗಿ ಗುರುತಿಸಿ.',
    'cap.xray_action': 'ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ →',
    'cap.stress_title': 'ಒಪ್ಪಂದದ ಒತ್ತಡ ಪರೀಕ್ಷೆ',
    'cap.stress_desc': 'ತುರ್ತು ವರ್ಗಾವಣೆ, ಬಾಡಿಗೆ ವಿಳಂಬದಂತಹ ಸಂದರ್ಭಗಳ ಆರ್ಥಿಕ ಪರಿಣಾಮವನ್ನು ಮುಂಚಿತವಾಗಿಯೇ ಅಳೆಯಿರಿ.',
    'cap.stress_action': 'ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ →',
    'cap.diff_title': 'ದಾಖಲೆಗಳ ಅರ್ಥಪೂರ್ಣ ಹೋಲಿಕೆ',
    'cap.diff_desc': 'ದಂಡ ಅಥವಾ ನೋಟಿಸ್ ನಿಯಮಗಳಲ್ಲಿ ಮಾಡಲಾದ ರಹಸ್ಯ ಬದಲಾವಣೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಎರಡು ಆವೃತ್ತಿಗಳನ್ನು ಹೋಲಿಸಿ.',
    'cap.diff_action': 'ಒಪ್ಪಂದಗಳನ್ನು ಹೋಲಿಸಿ →',
    'cap.qa_title': 'ಆಧಾರಸಹಿತ ಪ್ರಶ್ನೋತ್ತರ',
    'cap.qa_desc': 'ಸರಳ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ. ಒಪ್ಪಂದದ ಮೂಲ ವಾಕ್ಯಗಳಿಂದಲೇ ನೇರ ಪುರಾವೆ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.',
    'cap.qa_action': 'ದಾಖಲೆಯನ್ನು ಪ್ರಶ್ನಿಸಿ →',

    // Document Input
    'input.title': 'ಒಪ್ಪಂದವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಪಠ್ಯವನ್ನು ಅಂಟಿಸಿ',
    'input.tab_upload': 'ದಾಖಲೆ ಅಪ್‌ಲೋಡ್',
    'input.tab_paste': 'ಪಠ್ಯವನ್ನು ಅಂಟಿಸಿ',
    'input.drop_title': 'ನಿಮ್ಮ ಒಪ್ಪಂದದ ಫೈಲ್ ಅನ್ನು ಇಲ್ಲಿ ಎಳೆದು ಹಾಕಿ',
    'input.drop_subtitle': 'PDF, DOCX ಅಥವಾ TXT ಫೈಲ್‌ಗಳು (ಗರಿಷ್ಠ 5MB)',
    'input.browse_btn': 'ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ',
    'input.file_selected': 'ಆಯ್ಕೆಮಾಡಿದ ಫೈಲ್:',
    'input.paste_placeholder': 'ಪೂರ್ಣ ಒಪ್ಪಂದದ ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ (ಉದಾ: ಬಾಡಿಗೆ ಒಪ್ಪಂದ, ಉದ್ಯೋಗ ಪತ್ರ, ಎನ್‌ಡಿಎ)...',
    'input.char_count': 'ಅಕ್ಷರಗಳು',
    'input.words_count': 'ಪದಗಳು',
    'input.analyze_btn': 'ಜೆಮಿನಿಯೊಂದಿಗೆ ಒಪ್ಪಂದ ವಿಶ್ಲೇಷಿಸಿ',
    'input.analyzing_btn': 'ಒಪ್ಪಂದವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    'input.or_sample': 'ಅಥವಾ ಪರಿಶೀಲಿಸಿದ ಮಾದರಿಯೊಂದಿಗೆ ತಕ್ಷಣ ಪ್ರಾರಂಭಿಸಿ:',
    'input.load_sample_btn': '⚡ ಇಂದಿರಾನಗರ ಬಾಡಿಗೆ ಒಪ್ಪಂದ ಮಾದರಿ ಲೋಡ್ ಮಾಡಿ',

    // Subnav Toolbar
    'subnav.all': 'ಪೂರ್ಣ ಕಾರ್ಯಕ್ಷೇತ್ರ',
    'subnav.red_flags': 'ಕೆಂಪು ಎಚ್ಚರಿಕೆಗಳು',
    'subnav.xray_graph': 'ಎಕ್ಸ್-ರೇ & ಗ್ರಾಫ್',
    'subnav.financial': 'ಆರ್ಥಿಕ ಹೊಣೆಗಾರಿಕೆ',
    'subnav.clauses': 'ಎಲ್ಲಾ ಷರತ್ತುಗಳು',
    'subnav.stress': 'ಒತ್ತಡ ಪರೀಕ್ಷೆ',
    'subnav.dates': 'ಮುಖ್ಯ ದಿನಾಂಕಗಳು',
    'subnav.checklist': 'ಕಾರ್ಯ ಪಟ್ಟಿ',

    // Document Overview
    'overview.title': 'ದಾಖಲೆಯ ಅವಲೋಕನ',
    'overview.type': 'ದಾಖಲೆಯ ಪ್ರಕಾರ',
    'overview.risk_score': 'ಅಪಾಯದ ಅಂಕ',
    'overview.overall_risk': 'ಒಟ್ಟಾರೆ ಅಪಾಯದ ಮಟ್ಟ',
    'overview.clauses_analyzed': 'ವಿಶ್ಲೇಷಿಸಲಾದ ಷರತ್ತುಗಳು',
    'overview.summary_heading': 'ಕಾರ್ಯನಿರ್ವಾಹಕ ಸಾರಾಂಶ',

    // Key Facts
    'facts.title': 'ಪ್ರಮುಖ ಅಂಶಗಳು ಮತ್ತು ಷರತ್ತುಗಳು',
    'facts.monthly_rent': 'ತಿಂಗಳ ಬಾಡಿಗೆ',
    'facts.security_deposit': 'ಭದ್ರತಾ ಠೇವಣಿ',
    'facts.duration': 'ಒಪ್ಪಂದದ ಅವಧಿ',
    'facts.start_date': 'ಪ್ರಾರಂಭ ದಿನಾಂಕ',
    'facts.end_date': 'ಮುಕ್ತಾಯ ದಿನಾಂಕ',
    'facts.notice_period': 'ನೋಟಿಸ್ ಅವಧಿ',
    'facts.renewal_terms': 'ನವೀಕರಣದ ನಿಯಮಗಳು',
    'facts.penalties': 'ದಂಡ ಮತ್ತು ವಿಳಂಬ ಶುಲ್ಕ',
    'facts.maintenance': 'ನಿರ್ವಹಣೆಯ ಜವಾಬ್ದಾರಿ',
    'facts.termination': 'ರದ್ದತಿಯ ನಿಯಮಗಳು',
    'facts.not_specified': 'ದಾಖಲೆಯಲ್ಲಿ ನಿರ್ದಿಷ್ಟಪಡಿಸಿಲ್ಲ',

    // Risk Dashboard
    'risk.title': 'ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'risk.score_label': 'ಒಟ್ಟಾರೆ ಒಪ್ಪಂದದ ಅಪಾಯ ಅಂಕ',
    'risk.high': 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
    'risk.medium': 'ಗಮನ ನೀಡಬೇಕಾದ ಅಂಶ',
    'risk.low': 'ಕಡಿಮೆ ಅಪಾಯ',
    'risk.top_concerns': 'ಪತ್ತೆಯಾದ ಮುಖ್ಯ ಆತಂಕಗಳು',
    'risk.concerns_subtitle': 'ಸಹಿ ಮಾಡುವ ಮುನ್ನವೇ ಈ ಪ್ರಮುಖ ವಿಷಯಗಳ ಬಗ್ಗೆ ತಕ್ಷಣ ಗಮನಹರಿಸುವುದು ಅತ್ಯಗತ್ಯ.',

    // Red Flag Hunter
    'redflag.title': 'ರೆಡ್ ಫ್ಲ್ಯಾಗ್ ಹಂಟರ್ — ಅಡಗಿರುವ ಹೊಣೆಗಾರಿಕೆಗಳು ಮತ್ತು ಬಲೆಗಳು',
    'redflag.subtitle': 'ಏಕಪಕ್ಷೀಯ ಹೊರೆಗಳನ್ನು ಹೇರುವ ಅಥವಾ ಭಾರತೀಯ ಕಾನೂನು ಮಾನದಂಡಗಳಿಂದ ವಿಚಲಿತವಾಗಿರುವ ಷರತ್ತುಗಳು.',
    'redflag.severity': 'ತೀವ್ರತೆ',
    'redflag.critical': 'ಅತ್ಯಂತ ಗಂಭೀರ',
    'redflag.high_caution': 'ಹೆಚ್ಚಿನ ಎಚ್ಚರಿಕೆ',
    'redflag.issue': 'ಪತ್ತೆಯಾದ ಸಮಸ್ಯೆ',
    'redflag.reason': 'ಇದು ಏಕೆ ಮುಖ್ಯ',
    'redflag.location': 'ಒಪ್ಪಂದದಲ್ಲಿನ ಸ್ಥಾನ',
    'redflag.recommended_action': 'ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ',
    'redflag.view_clause': 'ಷರತ್ತು ವೀಕ್ಷಿಸಿ',
    'redflag.negotiate': 'ಪ್ರತಿಸಂಧಾನ ಪ್ರಸ್ತಾಪಿಸಿ',

    // Financial Exposure
    'financial.title': 'ಖಚಿತ ಆರ್ಥಿಕ ಹೊಣೆಗಾರಿಕೆ ವಿಶ್ಲೇಷಣೆ',
    'financial.subtitle': 'ಮೂಲ ಬದ್ಧತೆಗಳು, ದಂಡಗಳು ಮತ್ತು ಗರಿಷ್ಠ ಆರ್ಥಿಕ ಅಪಾಯದ ನಿಖರ ಗಣಿತ ಲೆಕ್ಕಾಚಾರ.',
    'financial.worst_case': 'ಒಟ್ಟು ಗರಿಷ್ಠ ಆರ್ಥಿಕ ಹೊಣೆಗಾರಿಕೆ',
    'financial.baseline': 'ಮೂಲ ಬಾಡಿಗೆ ಬದ್ಧತೆ',
    'financial.deposit_at_risk': 'ಅಪಾಯದಲ್ಲಿರುವ ಠೇವಣಿ',
    'financial.max_penalties': 'ಗರಿಷ್ಠ ಸಂಭಾವ್ಯ ದಂಡ',
    'financial.breakdown': 'ಆರ್ಥಿಕ ಬದ್ಧತೆಗಳ ವಿವರ',
    'financial.rent_over_term': 'ಅವಧಿಯ ಒಟ್ಟು ಬಾಡಿಗೆ',
    'financial.security_deposit_locked': 'ಲಾಕ್ ಆಗಿರುವ ಭದ್ರತಾ ಠೇವಣಿ',
    'financial.early_exit_penalty': 'ಮುಂಚಿತವಾಗಿ ಖಾಲಿ ಮಾಡುವ ದಂಡ',
    'financial.late_fee_estimate': 'ಅಂದಾಜು ವಿಳಂಬ ಶುಲ್ಕ',

    // Contract X-Ray & Graph
    'xray.title': 'ಒಪ್ಪಂದದ ಎಕ್ಸ್-ರೇ ಮತ್ತು ಷರತ್ತುಗಳ ಪರಸ್ಪರ ಅವಲಂಬನೆ ಗ್ರಾಫ್',
    'xray.subtitle': 'ಒಪ್ಪಂದದ ನಿಯಮಗಳು, ದಂಡಗಳು ಮತ್ತು ನೋಟಿಸ್‌ಗಳು ಪರಸ್ಪರ ಹೇಗೆ ಪ್ರಭಾವ ಬೀರುತ್ತವೆ ಎಂಬುದರ ನಕ್ಷೆ.',
    'xray.legend_high': 'ಹೆಚ್ಚಿನ ಅಪಾಯದ ಷರತ್ತು',
    'xray.legend_medium': 'ಗಮನ ನೀಡಬೇಕಾದ ಷರತ್ತು',
    'xray.legend_low': 'ಸಾಮಾನ್ಯ / ಸುರಕ್ಷಿತ',
    'xray.click_hint': 'ವಿವರಗಳು ಮತ್ತು ಕ್ರಮಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಯಾವುದೇ ನೋಡ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.',

    // Clause Explorer
    'clauses.title': 'ಷರತ್ತು ಪರಿಶೋಧಕ (ಕ್ಲಾಜ್ ಎಕ್ಸ್‌ಪ್ಲೋರರ್)',
    'clauses.filter_all': 'ಎಲ್ಲಾ ಷರತ್ತುಗಳು',
    'clauses.filter_high': 'ಹೆಚ್ಚಿನ ಅಪಾಯದವು',
    'clauses.filter_medium': 'ಗಮನ ನೀಡಬೇಕಾದವು',
    'clauses.filter_low': 'ಕಡಿಮೆ ಅಪಾಯದವು',
    'clauses.search_placeholder': 'ಕೀವರ್ಡ್ ಅಥವಾ ಪದಗಳ ಮೂಲಕ ಹುಡುಕಿ...',
    'clauses.card_clause': 'ಷರತ್ತು',
    'clauses.plain_summary': 'ಸರಳ ಭಾಷೆಯ ಸಾರಾಂಶ',
    'clauses.simple_explanation': 'ಸುಲಭ ವಿವರಣೆ',
    'clauses.detailed_breakdown': 'ವಿವರವಾದ ವಿಶ್ಲೇಷಣೆ',
    'clauses.original_text': 'ಮೂಲ ಒಪ್ಪಂದದ ಪಠ್ಯ (ಯಥಾವತ್)',
    'clauses.what': 'ನೀವು ಯಾವುದಕ್ಕೆ ಒಪ್ಪಿಗೆ ನೀಡುತ್ತಿದ್ದೀರಿ',
    'clauses.why': 'ಇದು ಏಕೆ ಮಹತ್ವದ್ದು',
    'clauses.where': 'ಒಪ್ಪಂದದಲ್ಲಿನ ಸ್ಥಾನ',
    'clauses.what_next': 'ಮುಂದಿನ ಶಿಫಾರಸು ಕ್ರಮ',
    'clauses.btn_negotiate': 'ಸಂಧಾನ ನಡೆಸಿ',
    'clauses.btn_devils_advocate': 'ಡೆವಿಲ್ಸ್ ಅಡ್ವೊಕೇಟ್',
    'clauses.btn_legal_context': 'ಕಾನೂನು ಸಂದರ್ಭ (ಭಾರತ)',
    'clauses.btn_draft_msg': 'ಸಂದೇಶ ರಚಿಸಿ',

    // Obligations
    'obligations.title': 'ನೀವು ಒಪ್ಪಿಕೊಳ್ಳುತ್ತಿರುವ ಜವಾಬ್ದಾರಿಗಳು',
    'obligations.subtitle': 'ನಿಮ್ಮ ಕರ್ತವ್ಯಗಳು ಮತ್ತು ನಿರ್ಬಂಧಗಳ ಸ್ಪಷ್ಟ ಪಟ್ಟಿ.',

    // Important Dates
    'dates.title': 'ಪ್ರಮುಖ ದಿನಾಂಕಗಳು ಮತ್ತು ಗಡುವುಗಳು',
    'dates.subtitle': 'ಒಪ್ಪಂದದಿಂದ ಪಡೆದ ಪ್ರಮುಖ ದಿನಾಂಕಗಳು, ನೋಟಿಸ್ ಅವಧಿಗಳು ಮತ್ತು ಗಡುವುಗಳು.',
    'dates.event': 'ಘಟನೆ / ಪ್ರಮುಖ ಹಂತ',
    'dates.date_period': 'ದಿನಾಂಕ ಅಥವಾ ಅವಧಿ',
    'dates.details': 'ಷರತ್ತುಗಳು ಮತ್ತು ವಿವರಗಳು',

    // Action Checklist
    'checklist.title': 'ಸಹಿ ಮಾಡುವ ಮುನ್ನ ಮಾಡಬೇಕಾದ ಕಾರ್ಯಗಳ ಪಟ್ಟಿ',
    'checklist.subtitle': 'ಸಹಿ ಮಾಡುವ ಮುನ್ನ ಪರಿಶೀಲಿಸಬೇಕಾದ ಅಥವಾ ಸಂಧಾನ ಮಾಡಬೇಕಾದ ಪ್ರಮುಖ ಕ್ರಮಗಳು.',
    'checklist.priority_high': 'ಹೆಚ್ಚಿನ ಆದ್ಯತೆ',
    'checklist.priority_medium': 'ಮಧ್ಯಮ ಆದ್ಯತೆ',
    'checklist.priority_low': 'ಕಡಿಮೆ ಆದ್ಯತೆ',
    'checklist.task': 'ಕಾರ್ಯ',
    'checklist.advice': 'ಕಾರ್ಯತಂತ್ರದ ಸಲಹೆ',

    // Stress Test View
    'stress.title': 'ಒಪ್ಪಂದದ ಒತ್ತಡ ಪರೀಕ್ಷೆ ಸಿಮ್ಯುಲೇಟರ್',
    'stress.subtitle': 'ನೈಜ ಜೀವನದ ತುರ್ತು ಸನ್ನಿವೇಶಗಳು ಒಪ್ಪಂದದ ಮೇಲೆ ಬೀರುವ ಪರಿಣಾಮವನ್ನು ಪರೀಕ್ಷಿಸಿ.',
    'stress.select_scenario': 'ಪರೀಕ್ಷೆಗೆ ಒಂದು ಸನ್ನಿವೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'stress.scenario_1': 'ತುರ್ತು ಉದ್ಯೋಗ ವರ್ಗಾವಣೆ / ಸ್ಥಳಾಂತರ',
    'stress.scenario_1_desc': '4ನೇ ತಿಂಗಳಲ್ಲಿ ನೀವು ಸ್ಥಳಾಂತರಗೊಳ್ಳಬೇಕಾದರೆ ಏನಾಗುತ್ತದೆ?',
    'stress.scenario_2': 'ಬಾಡಿಗೆ ಪಾವತಿಯಲ್ಲಿ 15 ದಿನಗಳ ವಿಳಂಬ',
    'stress.scenario_2_desc': 'ದೈನಂದಿನ ವಿಳಂಬ ದಂಡ ಮತ್ತು ಹೊರಹಾಕುವಿಕೆಯ ನಿಯಮಗಳೇನು?',
    'stress.scenario_3': 'ಅನಿರೀಕ್ಷಿತ ಮನೆ ಮಾಲೀಕರ ತಪಾಸಣೆ ವಿವಾದ',
    'stress.scenario_3_desc': 'ರಾತ್ರಿ 9 ಗಂಟೆಗೆ ಮುನ್ಸೂಚನೆ ಇಲ್ಲದೆ ಬಂದಾಗ ನಿಮ್ಮ ಹಕ್ಕುಗಳೇನು?',
    'stress.scenario_4': 'ಭದ್ರತಾ ಠೇವಣಿ ಮರುಪಾವತಿ ನಿರಾಕರಣೆ',
    'stress.scenario_4_desc': 'ಬಣ್ಣ ಮತ್ತು ನಿರ್ವಹಣೆ ಹೆಸರಿನಲ್ಲಿ ಮಾಲೀಕರು ಹಣ ಕಡಿತಗೊಳಿಸಿದಾಗ.',
    'stress.custom_scenario': 'ಅಥವಾ ನಿಮ್ಮದೇ ಸನ್ನಿವೇಶವನ್ನು ಬರೆಯಿರಿ',
    'stress.custom_placeholder': 'ಉದಾ: ಎಸಿ ಕೆಟ್ಟರೆ ಮತ್ತು ಮಾಲೀಕರು ದುರಸ್ತಿ ಮಾಡಲು ನಿರಾಕರಿಸಿದರೆ?',
    'stress.btn_run': 'ಒತ್ತಡ ಪರೀಕ್ಷೆ ಸಿಮ್ಯುಲೇಶನ್ ಚಲಾಯಿಸಿ',
    'stress.running': 'ಸನ್ನಿವೇಶದ ಪರಿಣಾಮಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    'stress.results_title': 'ಸಿಮ್ಯುಲೇಶನ್ ಫಲಿತಾಂಶಗಳು ಮತ್ತು ಆರ್ಥಿಕ ಅಪಾಯದ ವಿವರ',
    'stress.financial_impact': 'ಆರ್ಥಿಕ ಪರಿಣಾಮ',
    'stress.clauses_triggered': 'ಸಕ್ರಿಯಗೊಂಡ ಒಪ್ಪಂದದ ಷರತ್ತುಗಳು',
    'stress.consequences': 'ಸಂಭಾವ್ಯ ಅಪಾಯಗಳು ಮತ್ತು ಪರಿಣಾಮಗಳು',
    'stress.counter_strategies': 'ಸಹಿ ಮಾಡುವ ಮುನ್ನ ಶಿಫಾರಸು ಮಾಡಿದ ರಕ್ಷಣಾ ಕ್ರಮಗಳು',

    // Compare View
    'compare.title': 'ಅರ್ಥಪೂರ್ಣ ಒಪ್ಪಂದ ಹೋಲಿಕೆ',
    'compare.subtitle': 'ರಹಸ್ಯ ಬದಲಾವಣೆಗಳು ಅಥವಾ ಹಾನಿಕಾರಕ ತಿದ್ದುಪಡಿಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಎರಡು ಆವೃತ್ತಿಗಳನ್ನು ಹೋಲಿಸಿ.',
    'compare.doc_a': 'ದಾಖಲೆ ಎ (ಮೂಲ / ಮೊದಲ ಆವೃತ್ತಿ)',
    'compare.doc_b': 'ದಾಖಲೆ ಬಿ (ತಿದ್ದುಪಡಿ ಮಾಡಿದ / ಎರಡನೇ ಆವೃತ್ತಿ)',
    'compare.placeholder_a': 'ದಾಖಲೆ ಎ ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...',
    'compare.placeholder_b': 'ದಾಖಲೆ ಬಿ ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...',
    'compare.btn_load_samples': '⚡ ಮಾದರಿ ಆವೃತ್ತಿ ಎ ಮತ್ತು ಬಿ ಲೋಡ್ ಮಾಡಿ',
    'compare.btn_compare': 'ಜೆಮಿನಿಯೊಂದಿಗೆ ಒಪ್ಪಂದಗಳನ್ನು ಹೋಲಿಸಿ',
    'compare.comparing': 'ಹೋಲಿಸಲಾಗುತ್ತಿದೆ...',
    'compare.summary': 'ಹೋಲಿಕೆ ಸಾರಾಂಶ',
    'compare.key_differences': 'ಪತ್ತೆಯಾದ ಮುಖ್ಯ ವ್ಯತ್ಯಾಸಗಳು',
    'compare.risk_escalations': 'ಹೊಸ ಆವೃತ್ತಿಯಲ್ಲಿ ಹೆಚ್ಚಿದ ಅಪಾಯಗಳು',
    'compare.side_by_side': 'ಷರತ್ತುವಾರು ವ್ಯತ್ಯಾಸ',

    // Ask My Document
    'ask.title': 'ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ಪ್ರಶ್ನಿಸಿ',
    'ask.subtitle': 'ಈ ಒಪ್ಪಂದದ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ. ಪ್ರತಿ ಉತ್ತರವೂ ಒಪ್ಪಂದದ ನೇರ ವಾಕ್ಯಗಳ ಆಧಾರಿತವಾಗಿದೆ.',
    'ask.suggested_title': 'ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಶ್ನೆಗಳು:',
    'ask.q1': 'ಮನೆ ಮಾಲೀಕರು ಮುನ್ಸೂಚನೆ ಇಲ್ಲದೆ ಮನೆಗೆ ಬರಬಹುದೇ?',
    'ask.q2': 'ನಾನು 3 ತಿಂಗಳು ಮುಂಚಿತವಾಗಿ ಖಾಲಿ ಮಾಡಿದರೆ ಏನಾಗುತ್ತದೆ?',
    'ask.q3': 'ಠೇವಣಿ ಮರಳಿ ಪಡೆಯಲು ಎಷ್ಟು ದಿನ ಮುಂಚಿತವಾಗಿ ನೋಟಿಸ್ ನೀಡಬೇಕು?',
    'ask.q4': 'ಪ್ಲಂಬಿಂಗ್ ಮತ್ತು ವಿದ್ಯುತ್ ದುರಸ್ತಿ ವೆಚ್ಚವನ್ನು ಯಾರು ಭರಿಸಬೇಕು?',
    'ask.input_placeholder': 'ಈ ಒಪ್ಪಂದದ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ...',
    'ask.btn_send': 'ಪ್ರಶ್ನಿಸಿ',
    'ask.found_in_doc': 'ದಾಖಲೆಯಿಂದ ನೇರವಾಗಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ',
    'ask.not_in_doc': 'ನೀಡಿದ ದಾಖಲೆಯಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಉಲ್ಲೇಖಿಸಿಲ್ಲ',
    'ask.sources': 'ಮೂಲ ಷರತ್ತುಗಳು:',

    // My Documents
    'docs.title': 'ನನ್ನ ದಾಖಲೆಗಳ ಸಂಗ್ರಹ',
    'docs.subtitle': 'ನಿಮ್ಮ ಸ್ಥಳೀಯ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾದ ಎಲ್ಲಾ ಒಪ್ಪಂದಗಳು.',
    'docs.empty_title': 'ಇನ್ನೂ ಯಾವುದೇ ದಾಖಲೆಗಳು ಉಳಿಸಲ್ಪಟ್ಟಿಲ್ಲ',
    'docs.empty_desc': 'ಇಲ್ಲಿ ವೀಕ್ಷಿಸಲು ಒಪ್ಪಂದವನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಅಥವಾ ಮಾದರಿಯನ್ನು ಲೋಡ್ ಮಾಡಿ.',
    'docs.th_name': 'ದಾಖಲೆಯ ಹೆಸರು',
    'docs.th_type': 'ಪ್ರಕಾರ',
    'docs.th_risk': 'ಅಪಾಯದ ಮಟ್ಟ',
    'docs.th_clauses': 'ಒಟ್ಟು ಷರತ್ತುಗಳು',
    'docs.th_date': 'ವಿಶ್ಲೇಷಿಸಿದ ದಿನಾಂಕ',
    'docs.th_actions': 'ಕ್ರಮಗಳು',
    'docs.btn_open': 'ವಿಶ್ಲೇಷಣೆ ತೆರೆಯಿರಿ',
    'docs.btn_delete': 'ಅಳಿಸಿ',

    // Modals
    'modal.close': 'ಮುಚ್ಚಿ',
    'modal.copy': 'ನಕಲಿಸಿ',
    'modal.copied': 'ನಕಲಿಸಲಾಗಿದೆ!',

    // Glossary Modal
    'glossary.title': 'ಕಾನೂನು ಪದಕೋಶ ಮತ್ತು ಸರಳ ಅರ್ಥ',
    'glossary.subtitle': 'ಕ್ಲಿಷ್ಟಕರ ಕಾನೂನು ಪದಗಳನ್ನು ಸರಳ ದೈನಂದಿನ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
    'glossary.search_placeholder': 'ಕಾನೂನು ಪದಗಳನ್ನು ಹುಡುಕಿ (ಉದಾ: ಪರಿಹಾರ, ಎಸ್ಕ್ರೋ, ವ್ಯಾಪ್ತಿ)...',
    'glossary.meaning': 'ಸರಳ ಅರ್ಥ',
    'glossary.example': 'ನೈಜ ಉದಾಹರಣೆ',

    // Negotiation Copilot Modal
    'negotiate.title': 'ಎಐ ಸಂಧಾನ ಸಹಾಯಕ (ನೆಗೋಶಿಯೇಷನ್ ಕೋಪೈಲಟ್)',
    'negotiate.subtitle': 'ಮಾರುಕಟ್ಟೆ ಮಾನದಂಡಗಳ ಆಧಾರಿತ ಸಮತೋಲಿತ ಪ್ರತಿ-ಷರತ್ತುಗಳು ಮತ್ತು ಸಂಧಾನದ ಅಂಶಗಳನ್ನು ರಚಿಸಿ.',
    'negotiate.select_role': 'ನಿಮ್ಮ ಪಾತ್ರ',
    'negotiate.role_tenant': 'ಬಾಡಿಗೆದಾರ',
    'negotiate.role_freelancer': 'ಫ್ರೀಲ್ಯಾನ್ಸರ್ / ಗುತ್ತಿಗೆದಾರ',
    'negotiate.role_employee': 'ಉದ್ಯೋಗಿ',
    'negotiate.select_tone': 'ಸಂಧಾನದ ಶೈಲಿ',
    'negotiate.tone_professional': 'ವೃತ್ತಿಪರ & ವಿನಮ್ರ',
    'negotiate.tone_firm': 'ದೃಢ & ಸ್ಪಷ್ಟ',
    'negotiate.tone_collaborative': 'ಸಹಯೋಗದ ಶೈಲಿ',
    'negotiate.btn_generate': 'ಪ್ರತಿಸಂಧಾನ ಪ್ರಸ್ತಾಪ ರಚಿಸಿ',
    'negotiate.counter_clause': 'ಪ್ರಸ್ತಾಪಿತ ತಿದ್ದುಪಡಿ ಷರತ್ತು',
    'negotiate.talking_points': 'ಚರ್ಚೆಗಾಗಿ ಪ್ರಮುಖ ಕಾರ್ಯತಂತ್ರ ಅಂಶಗಳು',
    'negotiate.email_draft': 'ಕಳುಹಿಸಲು ಸಿದ್ಧವಾಗಿರುವ ಇಮೇಲ್ / ಸಂದೇಶ',

    // Devil's Advocate Modal
    'devils.title': 'ಡೆವಿಲ್ಸ್ ಅಡ್ವೊಕೇಟ್ — ಎದುರು ಪಕ್ಷದ ದೃಷ್ಟಿಕೋನ',
    'devils.subtitle': 'ಎದುರು ಪಕ್ಷವು ಈ ಷರತ್ತನ್ನು ಏಕೆ ಸೇರಿಸಿದೆ ಮತ್ತು ಅವರು ಇದನ್ನು ನಿಮ್ಮ ವಿರುದ್ಧ ಹೇಗೆ ಬಳಸಬಹುದು ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.',
    'devils.commercial_intent': 'ಅವರ ವಾಣಿಜ್ಯ ಹಿತಾಸಕ್ತಿ',
    'devils.worst_case': 'ಅತ್ಯಂತ ಕೆಟ್ಟ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಜಾರಿಗೊಳಿಸುವ ರೀತಿ',
    'devils.defense': 'ನಿಮ್ಮ ರಕ್ಷಣಾ ಕಾರ್ಯತಂತ್ರ',

    // Legal Context Modal
    'context.title': 'ಭಾರತೀಯ ಶಾಸನಬದ್ಧ ಮತ್ತು ನ್ಯಾಯಾಂಗ ಸಂದರ್ಭ',
    'context.subtitle': 'ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ, ಭಾರತೀಯ ಒಪ್ಪಂದ ಕಾಯ್ದೆ 1872 ಮತ್ತು ನ್ಯಾಯಾಲಯದ ತೀರ್ಪುಗಳೊಂದಿಗೆ ಹೋಲಿಕೆ.',
    'context.benchmark': 'ಅನ್ವಯವಾಗುವ ಕಾನೂನು / ಮಾನದಂಡ',
    'context.statutory_standard': 'ಶಾಸನಬದ್ಧ & ಸಾಮಾನ್ಯ ಮಾನದಂಡ',
    'context.comparison': 'ಈ ಷರತ್ತು ಕಾನೂನು ಮಾನದಂಡಕ್ಕೆ ಹೇಗೆ ಹೋಲಿಕೆಯಾಗುತ್ತದೆ',
    'context.enforceability': 'ನ್ಯಾಯಾಲಯದಲ್ಲಿ ಜಾರಿಯಾಗುವ ಸಾಧ್ಯತೆ',

    // Download Report Modal
    'report.title': 'ಸಮಗ್ರ ಕಾನೂನು ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    'report.subtitle': 'ಆಫ್‌ಲೈನ್ ಪರಿಶೀಲನೆಗಾಗಿ ಅಥವಾ ವಕೀಲರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲು ಸಂಪೂರ್ಣ ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
    'report.format': 'ವರದಿಯ ಸ್ವರೂಪ ಆಯ್ಕೆಮಾಡಿ',
    'report.pdf': 'PDF ವರದಿ (ವಿನ್ಯಾಸಗೊಳಿಸಿದ ಸಾರಾಂಶ)',
    'report.markdown': 'ಮಾರ್ಕ್‌ಡೌನ್ ದಾಖಲೆ (.md)',
    'report.json': 'ರಾ ಡಾಟಾ (.json)',
    'report.btn_download': 'ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    'report.modal_title': 'ದಾಖಲೆ ಗುಪ್ತಚರ ವರದಿ',
    'report.modal_subtitle': 'ಮುದ್ರಣ ಅಥವಾ ಡೌನ್‌ಲೋಡ್‌ಗಾಗಿ ಸಿದ್ಧವಾದ ಸಾರಾಂಶ',
    'report.print_pdf': 'ಮುದ್ರಿಸಿ / ಪಿಡಿಎಫ್ ಆಗಿ ಉಳಿಸಿ',
    'report.download_summary': 'ಸಾರಾಂಶವನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    'report.doc_badge': 'ಲೀಗಲ್ ಲೆನ್ಸ್ ಎಐ • ದಾಖಲೆ ವಿಶ್ಲೇಷಣೆ',
    'report.grounded_genai': 'ದೃಢೀಕೃತ ಜೆನ್ ಎಐ ವಿಶ್ಲೇಷಣೆ',
    'report.risk_score_label': '/ ೧೦೦ ಅಪಾಯ ಸ್ಕೋರ್',
    'report.overall_observation': 'ಒಟ್ಟಾರೆ ವೀಕ್ಷಣೆ',
    'report.sec_executive_summary': 'ಕಾರ್ಯನಿರ್ವಾಹಕ ಸಾರಾಂಶ',
    'report.sec_key_parameters': 'ತೆಗೆದ ಮುಖ್ಯ ನಿಯತಾಂಕಗಳು',
    'report.sec_concerning_clauses': 'ಗಮನ ಹರಿಸಬೇಕಾದ ಷರತ್ತುಗಳು',
    'report.why_flagged': 'ಗುರುತಿಸಲು ಕಾರಣ',
    'report.suggested_q': 'ಸೂಚಿಸಿದ ಪ್ರಶ್ನೆ',
    'report.footer_disclaimer': 'ಲೀಗಲ್ ಲೆನ್ಸ್ ಎಐ ಕೇವಲ ಮಾಹಿತಿ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಸರಳ ವಿವರಣೆಯನ್ನು ನೀಡುತ್ತದೆ. ಇದು ಯಾವುದೇ ಕಾನೂನು ಸಲಹೆಯನ್ನು ನೀಡುವುದಿಲ್ಲ.',

    // Chat Box & Ask
    'chat.fab_label': 'ಪ್ರಶ್ನಿಸಿ',
    'chat.fab_title': 'ನಿಮ್ಮ ದಾಖಲೆಯ ಬಗ್ಗೆ ಕೇಳಿ',
    'chat.header_title': 'ನಿಮ್ಮ ಒಪ್ಪಂದವನ್ನು ಪ್ರಶ್ನಿಸಿ',
    'chat.empty_title': 'ನಿಮ್ಮ ದಾಖಲೆಯ ಬಗ್ಗೆ ಒಂದು ಪ್ರಶ್ನೆ ಕೇಳಿ',
    'chat.empty_subtitle': 'ಎಲ್ಲಾ ಉತ್ತರಗಳು ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆಯನ್ನು ಮಾತ್ರ ಆಧರಿಸಿವೆ.',
    'chat.starter_1': 'ಭದ್ರತಾ ಠೇವಣಿ ಮೊತ್ತ ಎಷ್ಟು?',
    'chat.starter_2': 'ಮಾಲೀಕರು ಮುನ್ಸೂಚನೆ ಇಲ್ಲದೆ ಪ್ರವೇಶಿಸಬಹುದೇ?',
    'chat.starter_3': 'ನಾನು ಅವಧಿಗಿಂತ ಮುಂಚಿತವಾಗಿ ಖಾಲಿ ಮಾಡಿದರೆ ಏನಾಗುತ್ತದೆ?',
    'chat.starter_4': 'ಮಾಲೀಕರು ಉಚಿತ ವೈ-ಫೈ ನೀಡುತ್ತಾರೆಯೇ?',
    'chat.starter_5': 'ನಾನು ಸಾಕುಪ್ರಾಣಿಗಳನ್ನು ಇಟ್ಟುಕೊಳ್ಳಬಹುದೇ?',
    'chat.placeholder': 'ನಿಮ್ಮ ದಾಖಲೆಯ ಬಗ್ಗೆ ಪ್ರಶ್ನಿಸಿ...',
    'chat.not_found': 'ಈ ಮಾಹಿತಿಯು ನಿಮ್ಮ ದಾಖಲೆಯಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ.',
    'chat.sources': 'ಮೂಲಗಳು',

    // X-Ray & Graph details
    'xray.header_badge': 'ಒಪ್ಪಂದದ ಎಕ್ಸ್-ರೇ ಮತ್ತು ಷರತ್ತು ಸಂಬಂಧ ನಕ್ಷೆ',
    'xray.header_title': 'ಒಪ್ಪಂದದ ರಚನೆ ಮತ್ತು ಪರಸ್ಪರ ಸಂಬಂಧಗಳು',
    'xray.tab_combined': 'ಸಂಯೋಜಿತ ನೋಟ',
    'xray.tab_bar': 'ಎಕ್ಸ್-ರೇ ಬಾರ್',
    'xray.tab_graph': 'ಷರತ್ತು ನಕ್ಷೆ',
    'xray.dist_title': 'ಒಪ್ಪಂದದ ಅಪಾಯ ವಿತರಣೆ',
    'xray.legend_high_full': '🔴 ಹೆಚ್ಚಿನ ಅಪಾಯ / ನಿರ್ಬಂಧಿತ',
    'xray.legend_med_full': '🟡 ಎಚ್ಚರಿಕೆ ಅಗತ್ಯ',
    'xray.legend_low_full': '🟢 ಸಮತೋಲಿತ ಮಾನದಂಡ',
    'xray.click_tip': 'ಕೆಳಗಿನ ಸಂಬಂಧಿತ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಯಾವುದೇ ಷರತ್ತಿನ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.',
    'xray.graph_title': 'ಷರತ್ತುಗಳ ಸಂಬಂಧಿತ ನಕ್ಷೆ',
    'xray.graph_subtitle': 'ವಿವಿಧ ಷರತ್ತುಗಳು ಆರ್ಥಿಕ ಹೊಣೆಗಾರಿಕೆ, ಠೇವಣಿ ನಷ್ಟ ಮತ್ತು ಮುಕ್ತಾಯವನ್ನು ಹೇಗೆ ಪ್ರಭಾವಿಸುತ್ತವೆ ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ.',
    'xray.interconnected': 'ಪರಸ್ಪರ ಸಂಪರ್ಕಿತ',
    'xray.edges_title': 'ದಾಖಲಿತ ಅವಲಂಬನೆ ಸಂಪರ್ಕಗಳು:',
    'xray.connected_links': 'ಸಂಪರ್ಕಿತ ಷರತ್ತು ಲಿಂಕ್‌ಗಳು:',
    'xray.view_in_doc': 'ದಾಖಲೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ',
    'xray.negotiate_redline': 'ಷರತ್ತು ಸಂಧಾನ',

    // Loading & Error
    'loading.message': 'ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    'loading.submessage': 'ದಾಖಲೆಯ ಉದ್ದವನ್ನು ಅವಲಂಬಿಸಿ ಇದು ಸಾಮಾನ್ಯವಾಗಿ 15-30 ಸೆಕೆಂಡುಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.',

    // Categories
    'cat.rent_payments': 'ಬಾಡಿಗೆ ಮತ್ತು ಪಾವತಿಗಳು',
    'cat.security_deposit': 'ಭದ್ರತಾ ಠೇವಣಿ',
    'cat.duration': 'ಅವಧಿ ಮತ್ತು ನಿಯಮಗಳು',
    'cat.termination': 'ರದ್ದತಿ ಮತ್ತು ನಿರ್ಗಮನ',
    'cat.maintenance': 'ನಿರ್ವಹಣೆ ಮತ್ತು ರಿಪೇರಿ',
    'cat.property_rules': 'ಆಸ್ತಿ ನಿಯಮಗಳು',
    'cat.guests': 'ಅತಿಥಿಗಳು ಮತ್ತು ಸಂದರ್ಶಕರು',
    'cat.privacy': 'ಗೌಪ್ಯತೆ ಮತ್ತು ಪ್ರವೇಶ ಹಕ್ಕುಗಳು',
    'cat.liability': 'ಹೊಣೆಗಾರಿಕೆ ಮತ್ತು ನಷ್ಟ ಪರಿಹಾರ',
    'cat.rent_increase': 'ಬಾಡಿಗೆ ಹೆಚ್ಚಳ',
    'cat.restrictions': 'ನಿರ್ಬಂಧಗಳು',
    'cat.move_out': 'ಖಾಲಿ ಮಾಡುವುದು ಮತ್ತು ಹಸ್ತಾಂತರ',
    'cat.dispute_resolution': 'ವಿವಾದ ಪರಿಹಾರ',
    'cat.utilities': 'ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಬಿಲ್‌ಗಳು',
    'cat.insurance': 'ವಿಮೆ',
    'cat.other': 'ಸಾಮಾನ್ಯ / ಇತರೆ',

    // Risk Levels
    'risk_level.high_concern': 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
    'risk_level.needs_attention': 'ಗಮನ ನೀಡಬೇಕಾದ ಅಂಶ',
    'risk_level.low_concern': 'ಕಡಿಮೆ ಅಪಾಯ',

    // General Words
    'btn.back': 'ಹಿಂದಕ್ಕೆ',
    'btn.cancel': 'ರದ್ದುಮಾಡಿ',
    'btn.save': 'ಉಳಿಸಿ',
    'btn.clear': 'ತೆರವುಗೊಳಿಸಿ',
    'btn.new_doc': 'ಹೊಸ ದಾಖಲೆ',
  },
};

/**
 * Universal translation resolver
 * Matches:
 * 1. Dot path key (e.g. 'nav.home')
 * 2. Exact English text matching
 * 3. Normalized English text matching (case/whitespace agnostic)
 */
export function translate(keyOrText, lang = 'en', params = {}) {
  if (!keyOrText || typeof keyOrText !== 'string') return keyOrText;
  const currentLang = ['en', 'hi', 'kn'].includes(lang) ? lang : 'en';

  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const enDict = TRANSLATIONS.en;

  // 1. Exact key match
  let result = dict[keyOrText];

  // 2. If not found by key, search if keyOrText is an English string in the English dictionary
  if (!result && currentLang !== 'en') {
    const trimmed = keyOrText.trim();
    // Direct match against values in en dictionary
    for (const [k, val] of Object.entries(enDict)) {
      if (val === trimmed) {
        result = dict[k];
        break;
      }
    }

    // Normalized fuzzy match if still not found
    if (!result) {
      const normalized = trimmed.toLowerCase();
      for (const [k, val] of Object.entries(enDict)) {
        if (typeof val === 'string' && val.toLowerCase() === normalized) {
          result = dict[k];
          break;
        }
      }
    }
  }

  // 3. Fallback to English dict key
  if (!result) {
    result = enDict[keyOrText] || keyOrText;
  }

  // 4. Substitute {params} if provided
  if (params && typeof params === 'object') {
    for (const [pKey, pVal] of Object.entries(params)) {
      result = result.replace(new RegExp(`\\{${pKey}\\}`, 'g'), pVal);
    }
  }

  return result;
}

/**
 * Helper to translate category codes to localized labels
 */
export function getCategoryLabel(category, lang = 'en') {
  if (!category) return '';
  const key = `cat.${category.toLowerCase()}`;
  return translate(key, lang);
}

/**
 * Helper to translate risk level codes to localized labels
 */
export function getRiskLevelLabel(riskLevel, lang = 'en') {
  if (!riskLevel) return '';
  const key = `risk_level.${riskLevel.toLowerCase()}`;
  return translate(key, lang);
}
