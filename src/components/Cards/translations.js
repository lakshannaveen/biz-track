import React from "react";
import { Box, Chip, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

export const caregiverTranslations = {
  en: {
    reservationDetails: "Reservation Details",
    reservationNumber: "Reservation Number",
    bungalow: "Bungalow",
    guestName: "Guest Name",
    currentStatus: "Current Status",
    guestCount: "Guest Count",
    adults: "Adults",
    children: "Children",
    total: "Total",
    capacity: "Capacity",
    guestsMaximum: "guests maximum",
    updateStatus: "Update Status",
    selectAction: "Select the appropriate action for this reservation",
    checkInGuest: "Check In Guest",
    checkInDescription: "Guest is arriving and entering the bungalow",
    checkOutGuest: "Check Out Guest",
    checkOutDescription: "Guest is leaving the bungalow",
    bungalowCondition: "Bungalow Condition After Checkout",
    bungalowConditionQuestion: "How is the bungalow condition?",
    checkedOutWithoutIssue: "Checked out without any issue",
    checkedOutWithIssues: "Checked out with some issues",
    contactInstructions: "If You have any issues, Please Contact Mr. Kumara.",
    cancel: "Cancel",
    confirmCheckIn: "Confirm Check-In",
    confirmCheckOut: "Confirm Check-Out",
    updateStatusButton: "Update Status",
    processing: "Processing...",
    na: "N/A",
    mainBungalow: "Main Bungalow",
    lowerGardenSuite: "Lower Garden Suite Bungalow"
  },
  si: {
    reservationDetails: "වෙන්කිරීම් විස්තර",
    reservationNumber: "වෙන්කිරීම් අංකය",
    bungalow: "බංගලාව",
    guestName: "අමුත්තාගේ නම",
    currentStatus: "වත්මන් තත්වය",
    guestCount: "අමුත්තන්ගේ ගණන",
    adults: "වැඩිහිටියන්",
    children: "ළමයින්",
    total: "මුළු",
    capacity: "මුළු ධාරිතාව",
    guestsMaximum: "අමුත්තන් උපරිමය",
    updateStatus: "තත්වය යාවත්කාලීන කරන්න",
    selectAction: "මෙම වෙන්කිරීම සඳහා සුදුසු ක්‍රියාමාර්ගය තෝරන්න",
    checkInGuest: "අමුත්තා ඇතුළු වීම",
    checkInDescription: "අමුත්තා පැමිණ බංගලාවට ඇතුළු වෙමින් සිටී",
    checkOutGuest: "අමුත්තා පිටවීම",
    checkOutDescription: "අමුත්තා බංගලාවෙන් පිටව යනවා",
    bungalowCondition: "පිටවීමෙන් පසු බංගලාවේ තත්වය",
    bungalowConditionQuestion: "බංගලාවේ තත්වය කෙසේද?",
    checkedOutWithoutIssue: "කිසිදු ගැටළුවකින් තොරව පිටව ගියා",
    checkedOutWithIssues: "සමහර ගැටළු සමඟ පිටව ගියා",
    contactInstructions: "ඔබට කිසියම් ගැටළුවක් ඇත්නම්, කුමාර මහතා අමතන්න.",
    cancel: "අවලංගු කරන්න",
    confirmCheckIn: "ඇතුළු වීම තහවුරු කරන්න",
    confirmCheckOut: "පිටවීම තහවුරු කරන්න",
    updateStatusButton: "තත්වය යාවත්කාලීන කරන්න",
    processing: "සැකසෙමින්...",
    na: "නැත",
    mainBungalow: "ප්‍රධාන බංගලාව",
    lowerGardenSuite: "පහළ ගෙවතු කාමර බංගලාව"
  },
  ta: {
    reservationDetails: "முன்பதிவு விவரங்கள்",
    reservationNumber: "முன்பதிவு எண்",
    bungalow: "பங்களா",
    guestName: "விருந்தினர் பெயர்",
    currentStatus: "தற்போதைய நிலை",
    guestCount: "விருந்தினர்கள் எண்ணிக்கை",
    adults: "வயது வந்தோர்",
    children: "குழந்தைகள்",
    total: "மொத்தம்",
    capacity: "கொள்ளளவு",
    guestsMaximum: "விருந்தினர்கள் அதிகபட்சம்",
    updateStatus: "நிலையை புதுப்பிக்கவும்",
    selectAction: "இந்த முன்பதிவுக்கு பொருத்தமான நடவடிக்கையைத் தேர்ந்தெடுக்கவும்",
    checkInGuest: "விருந்தினர் சேர்க்கை",
    checkInDescription: "விருந்தினர் வந்து பங்களாவில் நுழைகிறார்",
    checkOutGuest: "விருந்தினர் வெளியேறுதல்",
    checkOutDescription: "விருந்தினர் பங்களாவை விட்டு வெளியேறுகிறார்",
    bungalowCondition: "வெளியேறிய பின் பங்களா நிலை",
    bungalowConditionQuestion: "பங்களாவின் நிலை எப்படி?",
    checkedOutWithoutIssue: "எந்த சிக்கலும் இல்லாமல் வெளியேறியது",
    checkedOutWithIssues: "சில சிக்கல்களுடன் வெளியேறியது",
    contactInstructions: "உங்களுக்கு ஏதேனும் சிக்கல் இருந்தால், திரு. குமாரவை தொடர்பு கொள்ளவும்.",
    cancel: "ரத்து செய்",
    confirmCheckIn: "சேர்க்கை உறுதி செய்",
    confirmCheckOut: "வெளியேறுதல் உறுதி செய்",
    updateStatusButton: "நிலையை புதுப்பிக்கவும்",
    processing: "செயல்படுத்துகிறது...",
    na: "இல்லை",
    mainBungalow: "முக்கிய பங்களா",
    lowerGardenSuite: "கீழ் தோட்டம் சூட் பங்களா"
  },
  hi: {
    reservationDetails: "आरक्षण विवरण",
    reservationNumber: "आरक्षण संख्या",
    bungalow: "बंगला",
    guestName: "अतिथि का नाम",
    currentStatus: "वर्तमान स्थिति",
    guestCount: "अतिथि गणना",
    adults: "वयस्क",
    children: "बच्चे",
    total: "कुल",
    capacity: "क्षमता",
    guestsMaximum: "अतिथि अधिकतम",
    updateStatus: "स्थिति अपडेट करें",
    selectAction: "इस आरक्षण के लिए उचित कार्रवाई चुनें",
    checkInGuest: "अतिथि चेक-इन",
    checkInDescription: "अतिथि आ रहा है और बंगले में प्रवेश कर रहा है",
    checkOutGuest: "अतिथि चेक-आउट",
    checkOutDescription: "अतिथि बंगला छोड़ रहा है",
    bungalowCondition: "चेक-आउट के बाद बंगले की स्थिति",
    bungalowConditionQuestion: "बंगले की स्थिति कैसी है?",
    checkedOutWithoutIssue: "बिना किसी समस्या के चेक-आउट किया",
    checkedOutWithIssues: "कुछ समस्याओं के साथ चेक-आउट किया",
    contactInstructions: "यदि आपको कोई समस्या है, तो कृपया श्री कुमार से संपर्क करें।",
    cancel: "रद्द करें",
    confirmCheckIn: "चेक-इन की पुष्टि करें",
    confirmCheckOut: "चेक-आउट की पुष्टि करें",
    updateStatusButton: "स्थिति अपडेट करें",
    processing: "प्रक्रिया कर रहा है...",
    na: "नहीं",
    mainBungalow: "मुख्य बंगला",
    lowerGardenSuite: "लोअर गार्डन सूट बंगला"
  }
};

export const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰', nativeName: 'සිංහල' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰', nativeName: 'தமிழ்' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', nativeName: 'हिन्दी' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    handleClose();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Select Language
        </Typography>
        <IconButton
          onClick={handleClick}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 1,
            minWidth: 120,
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LanguageIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {currentLang.flag} {currentLang.name}
            </Typography>
          </Box>
        </IconButton>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 150,
            maxHeight: 300
          }
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={currentLanguage === lang.code}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1.5,
              backgroundColor: currentLanguage === lang.code ? 'action.selected' : 'transparent',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <Box sx={{ fontSize: '1.2rem' }}>{lang.flag}</Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" fontWeight={currentLanguage === lang.code ? 600 : 400}>
                {lang.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {lang.nativeName}
              </Typography>
            </Box>
            {currentLanguage === lang.code && (
              <Box sx={{ color: 'primary.main', ml: 1 }}>
                ✓
              </Box>
            )}
          </MenuItem>
        ))} 
      </Menu>
    </Box>
  );
};

// Alternative: Simple Select Dropdown Version
export const SimpleLanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Select Language
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {languages.map((lang) => (
          <Chip
            key={lang.code}
            label={`${lang.flag} ${lang.name}`}
            onClick={() => onLanguageChange(lang.code)}
            color={currentLanguage === lang.code ? 'primary' : 'default'}
            variant={currentLanguage === lang.code ? 'filled' : 'outlined'}
            size="medium"
            sx={{ 
              cursor: 'pointer',
              minWidth: 100,
              justifyContent: 'center'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export const ButtonLanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    handleClose();
  };

  return (
    <Box>
      <Chip
        icon={<LanguageIcon />}
        label={`${currentLang.flag} ${currentLang.name}`}
        onClick={handleClick}
        variant="outlined"
        sx={{ cursor: 'pointer', mb: 2 }}
      />
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={currentLanguage === lang.code}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ fontSize: '1.2rem' }}>{lang.flag}</Box>
              <Typography>{lang.name}</Typography>
              {currentLanguage === lang.code && (
                <Box sx={{ color: 'primary.main', ml: 1 }}>
                  ✓
                </Box>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};