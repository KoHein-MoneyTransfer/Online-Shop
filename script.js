// Function to show a specific page and hide others
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

// Function to show/hide specific forms within pages
function showForm(formType) {
    document.querySelectorAll('.order-form').forEach(form => {
        form.classList.add('hidden');
    });
    switch(formType) {
        case 'vpn-new-user':
            document.getElementById('vpn-new-user-form').classList.remove('hidden');
            break;
        case 'vpn-renew-user':
            document.getElementById('vpn-renew-user-form').classList.remove('hidden');
            break;
        case 'flexinet-new':
            document.getElementById('flexinet-new-form').classList.remove('hidden');
            break;
        case 'flexinet-renew':
            document.getElementById('flexinet-renew-form').classList.remove('hidden');
            break;
        default:
            break;
    }
}

// Payment details with receiver names
const paymentDetails = {
    'KBZ Pay': '09777725086 (Hein Hsan)',
    'Wave Money': '09966674258 (Hein Hsan)'
};

// Add event listeners for payment method selection
document.getElementById('vpn-new-payment-method').addEventListener('change', function() {
    const selectedMethod = this.value;
    const details = document.getElementById('vpn-new-payment-details');
    details.textContent = selectedMethod ? `${selectedMethod}: ${paymentDetails[selectedMethod]}` : '';
});
document.getElementById('vpn-renew-payment-method').addEventListener('change', function() {
    const selectedMethod = this.value;
    const details = document.getElementById('vpn-renew-payment-details');
    details.textContent = selectedMethod ? `${selectedMethod}: ${paymentDetails[selectedMethod]}` : '';
});
document.getElementById('flexinet-new-payment-method').addEventListener('change', function() {
    const selectedMethod = this.value;
    const details = document.getElementById('flexinet-new-payment-details');
    details.textContent = selectedMethod ? `${selectedMethod}: ${paymentDetails[selectedMethod]}` : '';
});
document.getElementById('flexinet-renew-payment-method').addEventListener('change', function() {
    const selectedMethod = this.value;
    const details = document.getElementById('flexinet-renew-payment-details');
    details.textContent = selectedMethod ? `${selectedMethod}: ${paymentDetails[selectedMethod]}` : '';
});

// Handle all form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let message = '';

        if (this.id === 'vpn-new-user-form') {
            const username = document.getElementById('vpn-username').value;
            const months = document.getElementById('vpn-months').value;
            const paymentMethod = document.getElementById('vpn-new-payment-method').value;
            const transferId = document.getElementById('vpn-new-transfer-id').value;
            const contact = document.getElementById('vpn-new-contact').value;
            message = `
*VPN အော်ဒါအသစ်*
--------------------
- အသုံးပြုသူ: ${username}
- ဝန်ဆောင်မှု: ${months} လ
- ငွေပေးချေမှု: ${paymentMethod}
- လွှဲငွေ ID: ${transferId}
- ဆက်သွယ်ရန်: ${contact}
`;
        } else if (this.id === 'vpn-renew-user-form') {
            const username = document.getElementById('vpn-renew-username').value;
            const months = document.getElementById('vpn-renew-months').value;
            const paymentMethod = document.getElementById('vpn-renew-payment-method').value;
            const transferId = document.getElementById('vpn-renew-transfer-id').value;
            const contact = document.getElementById('vpn-renew-contact').value;
            message = `
*VPN သက်တမ်းတိုး အော်ဒါ*
--------------------
- အသုံးပြုသူ: ${username}
- ဝန်ဆောင်မှု: ${months} လ
- ငွေပေးချေမှု: ${paymentMethod}
- လွှဲငွေ ID: ${transferId}
- ဆက်သွယ်ရန်: ${contact}
`;
        } else if (this.id === 'flexinet-new-form') {
            const username = document.getElementById('flexinet-new-user').value;
            const phone = document.getElementById('flexinet-new-phone').value;
            const latitude = document.getElementById('latitude').value || 'မထည့်သွင်းပါ။';
            const longitude = document.getElementById('longitude').value || 'မထည့်သွင်းပါ။';
            const address = document.getElementById('flexinet-new-address').value;
            const paymentMethod = document.getElementById('flexinet-new-payment-method').value;
            const transferId = document.getElementById('flexinet-new-transfer-id').value;
            const contact = document.getElementById('flexinet-new-contact').value;
            message = `
*FlexiNet ကတ်အသစ် အော်ဒါ*
--------------------
- အသုံးပြုသူ: ${username}
- ဖုန်းနံပါတ်: ${phone}
- Location: (Lat: ${latitude}, Long: ${longitude})
- လိပ်စာအပြည့်အစုံ: ${address}
- ငွေပေးချေမှု: ${paymentMethod}
- လွှဲငွေ ID: ${transferId}
- ဆက်သွယ်ရန်: ${contact}
`;
        } else if (this.id === 'flexinet-renew-form') {
            const username = document.getElementById('flexinet-renew-user').value;
            const phone = document.getElementById('flexinet-renew-phone').value;
            const byodNumber = document.getElementById('byod-number').value;
            const plan = document.getElementById('flexinet-renew-plan').value;
            const paymentMethod = document.getElementById('flexinet-renew-payment-method').value;
            const transferId = document.getElementById('flexinet-renew-transfer-id').value;
            const contact = document.getElementById('flexinet-renew-contact').value;
            message = `
*FlexiNet သက်တမ်းတိုး အော်ဒါ*
--------------------
- အသုံးပြုသူ: ${username}
- ဖုန်းနံပါတ်: ${phone}
- BYOD နံပါတ်: ${byodNumber}
- Plan: ${plan} (GB)
- ငွေပေးချေမှု: ${paymentMethod}
- လွှဲငွေ ID: ${transferId}
- ဆက်သွယ်ရန်: ${contact}
`;
        }
        sendToTelegram(message);
    });
});

// Function to send a message to a Telegram Bot
function sendToTelegram(message) {
    const BOT_TOKEN = '8248149143:AAE0L0QEHDOyVknrMoxOSKbVq45zTrkf2Fg';
    const CHAT_ID = '1658902231';
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        })
    })
    .then(response => {
        if (response.ok) {
            alert('အော်ဒါတင်ခြင်း အောင်မြင်ပါသည်။ ကျေးဇူးတင်ပါတယ်!');
            document.querySelectorAll('form').forEach(form => form.reset());
        } else {
            alert('အော်ဒါတင်ရာတွင် အခက်အခဲရှိနေပါသည်။ ကျေးဇူးပြု၍ ပြန်လည်စမ်းသပ်ပေးပါရန်။');
            console.error('Failed to send message to Telegram.');
        }
    })
    .catch(error => {
        alert('ကွန်နက်ရှင် ပြဿနာကြောင့် အော်ဒါတင်၍ မရပါ။');
        console.error('Error sending message:', error);
    });
}
