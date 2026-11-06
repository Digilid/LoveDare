export const LOVDARE_CONFIG = {
  WHATSAPP_NUMBER: '916366043201',
  MESSAGES: {
    'happy-period': "Hi Lovdare, I'm interested in the Happy Period Box. Could you please share the details?",
    'gift-iron': "Hi Lovdare, I'm interested in the Gift Iron – Not Gold Box. Could you please share the details?",
    'postpartum': "Hi Lovdare, I'm interested in the Post-Pregnancy Care Box. Could you please share the details?",
    'menopause': "Hi Lovdare, I'm interested in the Pre & Post-Menopausal Gift Box. Could you please share the details?",
    'general': "Hi Lovdare, I'd like to know more about your curated wellness gift boxes."
  }
};

export function getWhatsAppUrl(productKey = 'general') {
  const rawMessage = LOVDARE_CONFIG.MESSAGES[productKey] || LOVDARE_CONFIG.MESSAGES.general;
  const encoded = encodeURIComponent(rawMessage);
  return `https://wa.me/${LOVDARE_CONFIG.WHATSAPP_NUMBER}?text=${encoded}`;
}

export function openWhatsAppInquiry(productKey = 'general') {
  const targetUrl = getWhatsAppUrl(productKey);
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}

