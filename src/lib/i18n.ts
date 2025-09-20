// Internationalization support for AquaHarvest Pro
// Supporting English, Hindi, Tamil, Telugu, Bengali, Gujarati

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'gu';

export interface TranslationKey {
  [key: string]: string | TranslationKey;
}

export const translations: Record<Language, TranslationKey> = {
  en: {
    common: {
      start: "Start",
      next: "Next", 
      previous: "Previous",
      complete: "Complete",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      yes: "Yes",
      no: "No"
    },
    hero: {
      title: "Transform Every Drop into Opportunity",
      subtitle: "Unlock your rooftop's water harvesting potential with AI-powered assessment, custom engineering solutions, and government subsidy optimization.",
      startAssessment: "Start Free Assessment",
      joinCommunity: "Join Community",
      whyChoose: "Why Choose AquaHarvest Pro?",
      socialImpact: "Creating Social Impact",
      impactSubtitle: "Every assessment helps build water-secure communities across India"
    },
    assessment: {
      title: "RTRWH Assessment Wizard",
      subtitle: "Let's assess your rooftop rainwater harvesting potential",
      location: {
        title: "Location Details",
        description: "Tell us about your location",
        address: "Full Address",
        pincode: "PIN Code",
        state: "State",
        district: "District"
      },
      property: {
        title: "Property Information",
        description: "Details about your building and roof",
        roofArea: "Roof Area (sq. meters)",
        availableSpace: "Available Space for Storage (sq. meters)",
        roofType: "Roof Type",
        buildingHeight: "Building Height (meters)"
      },
      household: {
        title: "Household Details",
        description: "Family size and water usage",
        residents: "Number of Residents",
        waterConsumption: "Daily Water Consumption (liters)"
      },
      preferences: {
        title: "Preferences",
        description: "Budget and maintenance preferences",
        budget: "Budget for RTRWH System (₹)",
        maintenance: "Maintenance Level Preference",
        primaryUse: "Primary Use of Harvested Water"
      }
    },
    results: {
      title: "Your RTRWH Assessment Report",
      feasibilityScore: "Feasibility Score",
      annualHarvest: "Annual Harvest",
      paybackPeriod: "Payback Period",
      co2Reduction: "CO₂ Reduction",
      shareReport: "Share Report",
      downloadPdf: "Download PDF",
      newAssessment: "New Assessment"
    }
  },
  hi: {
    common: {
      start: "शुरू करें",
      next: "आगे",
      previous: "पिछला",
      complete: "पूर्ण",
      loading: "लोड हो रहा है...",
      save: "सेव करें",
      cancel: "रद्द करें",
      yes: "हाँ",
      no: "नहीं"
    },
    hero: {
      title: "हर बूंद को अवसर में बदलें",
      subtitle: "AI-संचालित मूल्यांकन, कस्टम इंजीनियरिंग समाधान और सरकारी सब्सिडी अनुकूलन के साथ अपनी छत की जल संचयन क्षमता को अनलॉक करें।",
      startAssessment: "मुफ्त मूल्यांकन शुरू करें",
      joinCommunity: "समुदाय से जुड़ें",
      whyChoose: "एक्वाहार्वेस्ट प्रो क्यों चुनें?",
      socialImpact: "सामाजिक प्रभाव बनाना",
      impactSubtitle: "हर मूल्यांकन भारत भर में जल-सुरक्षित समुदायों के निर्माण में मदद करता है"
    },
    assessment: {
      title: "छत वर्षा जल संचयन मूल्यांकन विज़ार्ड",
      subtitle: "आइए आपकी छत की वर्षा जल संचयन क्षमता का आकलन करें",
      location: {
        title: "स्थान विवरण",
        description: "हमें अपने स्थान के बारे में बताएं",
        address: "पूरा पता",
        pincode: "पिन कोड",
        state: "राज्य",
        district: "जिला"
      },
      property: {
        title: "संपत्ति की जानकारी",
        description: "आपकी इमारत और छत के विवरण",
        roofArea: "छत क्षेत्र (वर्ग मीटर)",
        availableSpace: "भंडारण के लिए उपलब्ध स्थान (वर्ग मीटर)",
        roofType: "छत का प्रकार",
        buildingHeight: "भवन की ऊंचाई (मीटर)"
      },
      household: {
        title: "घरेलू विवरण",
        description: "परिवार का आकार और पानी का उपयोग",
        residents: "निवासियों की संख्या",
        waterConsumption: "दैनिक पानी की खपत (लीटर)"
      },
      preferences: {
        title: "प्राथमिकताएं",
        description: "बजट और रखरखाव प्राथमिकताएं",
        budget: "RTRWH सिस्टम के लिए बजट (₹)",
        maintenance: "रखरखाव स्तर प्राथमिकता",
        primaryUse: "संचयित पानी का प्राथमिक उपयोग"
      }
    },
    results: {
      title: "आपकी RTRWH मूल्यांकन रिपोर्ट",
      feasibilityScore: "व्यवहार्यता स्कोर",
      annualHarvest: "वार्षिक संचय",
      paybackPeriod: "वापसी अवधि",
      co2Reduction: "CO₂ कमी",
      shareReport: "रिपोर्ट साझा करें",
      downloadPdf: "PDF डाउनलोड करें",
      newAssessment: "नया मूल्यांकन"
    }
  },
  ta: {
    common: {
      start: "தொடங்கு",
      next: "அடுத்தது",
      previous: "முந்தைய",
      complete: "முடிவு",
      loading: "ஏற்றுகிறது...",
      save: "சேமி",
      cancel: "ரத்து",
      yes: "ஆம்",
      no: "இல்லை"
    },
    hero: {
      title: "ஒவ்வொரு துளியையும் வாய்ப்பாக மாற்றுங்கள்",
      subtitle: "AI-இயங்கும் மதிப்பீடு, தனிப்பயன் பொறியியல் தீர்வுகள் மற்றும் அரசாங்க மானியம் மேம்படுத்தலுடன் உங்கள் கூரையின் மழைநீர் சேகரிப்பு திறனை திறக்கவும்.",
      startAssessment: "இலவச மதிப்பீட்டைத் தொடங்கவும்",
      joinCommunity: "சமூகத்தில் சேரவும்",
      whyChoose: "ஏன் AquaHarvest Pro ஐ தேர்வு செய்ய வேண்டும்?",
      socialImpact: "சமூக தாக்கத்தை உருவாக்குதல்",
      impactSubtitle: "ஒவ்வொரு மதிப்பீடும் இந்தியா முழுவதும் நீர்-பாதுகாப்பான சமூகங்களை உருவாக்க உதவுகிறது"
    },
    assessment: {
      title: "கூரை மழைநீர் சேகரிப்பு மதிப்பீட்டு வழிகாட்டி",
      subtitle: "உங்கள் கூரையின் மழைநீர் சேகரிப்பு திறனை மதிப்பிடுவோம்",
      location: {
        title: "இடம் விவரங்கள்",
        description: "உங்கள் இடத்தைப் பற்றி எங்களிடம் கூறுங்கள்",
        address: "முழு முகவரி",
        pincode: "பின் குறியீடு",
        state: "மாநிலம்",
        district: "மாவட்டம்"
      }
    }
  },
  te: {
    common: {
      start: "ప్రారంభించు",
      next: "తదుపరి",
      previous: "మునుపటి",
      complete: "పూర్తి",
      loading: "లోడ్ అవుతోంది...",
      save: "సేవ్",
      cancel: "రద్దు",
      yes: "అవును",
      no: "కాదు"
    },
    hero: {
      title: "ప్రతి చుక్కను అవకాశంగా మార్చండి",
      subtitle: "AI-శక్తితో నడిచే అంచనా, కస్టమ్ ఇంజనీరింగ్ పరిష్కారాలు మరియు ప్రభుత్వ రాయితీ ఆప్టిమైజేషన్‌తో మీ పైకప్పు యొక్క వర్షపు నీటి సేకరణ సామర్థ్యాన్ని అన్‌లాక్ చేయండి।",
      startAssessment: "ఉచిత అంచనాను ప్రారంభించండి",
      joinCommunity: "కమ్యూనిటీలో చేరండి"
    }
  },
  bn: {
    common: {
      start: "শুরু করুন",
      next: "পরবর্তী",
      previous: "পূর্ববর্তী",
      complete: "সম্পূর্ণ",
      loading: "লোড হচ্ছে...",
      save: "সেভ করুন",
      cancel: "বাতিল",
      yes: "হ্যাঁ",
      no: "না"
    },
    hero: {
      title: "প্রতিটি ফোঁটাকে সুযোগে রূপান্তরিত করুন",
      subtitle: "AI-চালিত মূল্যায়ন, কাস্টম ইঞ্জিনিয়ারিং সমাধান এবং সরকারি ভর্তুকি অপ্টিমাইজেশনের সাথে আপনার ছাদের বৃষ্টির পানি সংগ্রহের সম্ভাবনা আনলক করুন।",
      startAssessment: "বিনামূল্যে মূল্যায়ন শুরু করুন",
      joinCommunity: "কমিউনিটিতে যোগ দিন"
    }
  },
  gu: {
    common: {
      start: "શરૂ કરો",
      next: "આગળ",
      previous: "પાછળ",
      complete: "પૂર્ણ",
      loading: "લોડ થઈ રહ્યું છે...",
      save: "સેવ કરો",
      cancel: "રદ કરો",
      yes: "હા",
      no: "ના"
    },
    hero: {
      title: "દરેક ટીપાંને તકમાં રૂપાંતરિત કરો",
      subtitle: "AI-સંચાલિત મૂલ્યાંકન, કસ્ટમ એન્જિનિયરિંગ સોલ્યુશન્સ અને સરકારી સબસિડી ઓપ્ટિમાઇઝેશન સાથે તમારી છતની વરસાદી પાણી સંગ્રહ ક્ષમતાને અનલૉક કરો।",
      startAssessment: "મફત મૂલ્યાંકન શરૂ કરો",
      joinCommunity: "સમુદાયમાં જોડાઓ"
    }
  }
};

export class I18nManager {
  private currentLanguage: Language = 'en';
  
  setLanguage(lang: Language) {
    this.currentLanguage = lang;
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('aquaharvest_language', lang);
    }
  }
  
  getCurrentLanguage(): Language {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('aquaharvest_language') as Language;
      if (stored && stored in translations) {
        this.currentLanguage = stored;
      }
    }
    return this.currentLanguage;
  }
  
  t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }
  
  getSupportedLanguages(): Array<{code: Language, name: string, nativeName: string}> {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
      { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
      { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' }
    ];
  }
}

export const i18n = new I18nManager();