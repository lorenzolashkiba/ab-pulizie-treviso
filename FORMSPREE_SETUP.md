# Setup Form di Contatto con Web3Forms (GRATUITO)

## 📧 Come configurare il form di contatto con il tuo account Web3Forms esistente

### Passo 1: Ottieni la tua Access Key
1. Vai su [https://web3forms.com](https://web3forms.com)
2. Fai login con il tuo account esistente
3. Nel dashboard, clicca su "Access Keys" o "Create New Form"
4. Copia la tua **Access Key** (es: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`)

### Passo 2: Configura il sito
1. Apri il file `index.html`
2. Cerca questa riga (circa linea 318):
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```
3. Sostituisci `YOUR_WEB3FORMS_ACCESS_KEY` con la tua Access Key:
   ```html
   <input type="hidden" name="access_key" value="a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6">
   ```
4. Salva il file

### Passo 3: Testa il form
1. Apri il sito in un browser
2. Compila il form di contatto
3. Clicca "Richiedi Preventivo"
4. Riceverai la richiesta via email all'indirizzo configurato nel tuo account Web3Forms!

### Passo 4 (Opzionale): Personalizza l'email di destinazione
1. Nel dashboard di Web3Forms
2. Clicca sulla tua Access Key
3. Vai in "Settings" > "Email Settings"
4. Puoi cambiare l'email di destinazione o aggiungerne altre

## ✨ Funzionalità del form

✅ **Completamente gratuito** (fino a 50 richieste/mese)
✅ **Notifiche email immediate** quando ricevi una richiesta
✅ **Protezione anti-spam** integrata
✅ **Dashboard online** per vedere tutte le richieste
✅ **Nessun server necessario** - tutto gestito da Formspree
✅ **Feedback visivo** all'utente (successo/errore)
✅ **Responsive** - funziona su mobile e desktop

## 📊 Piano Gratuito Formspree

- ✅ 50 invii al mese
- ✅ Protezione spam con reCAPTCHA
- ✅ Dashboard per gestire le richieste
- ✅ Notifiche email
- ✅ File uploads (se necessario)

Se superi i 50 invii/mese, puoi fare upgrade a un piano a pagamento o usare altre email per i form.

## 🔧 Personalizzazioni opzionali

### Cambiare l'email di destinazione
Di default le email arrivano all'indirizzo con cui ti sei registrato. Per cambiarlo:
1. Vai nella dashboard di Formspree
2. Clicca sul tuo form
3. Vai in "Settings" > "Email"
4. Aggiungi altre email o cambia quella principale

### Aggiungere protezione reCAPTCHA
1. Nella dashboard, vai in "Settings" > "Spam Protection"
2. Attiva reCAPTCHA
3. Il form sarà automaticamente protetto

### Personalizzare l'oggetto dell'email
L'oggetto è già configurato nel form con:
```html
<input type="hidden" name="_subject" value="Nuova richiesta preventivo da AB Pulizie">
```

## 💡 Alternative gratuite (se Formspree non va bene)

1. **Web3Forms** (https://web3forms.com) - 250 email/mese gratis
2. **FormSubmit** (https://formsubmit.co) - illimitato, no registrazione
3. **Getform** (https://getform.io) - 50 invii/mese gratis

## 🆘 Problemi comuni

**Q: Il form non invia**
A: Controlla di aver sostituito `YOUR_FORM_ID` con il tuo ID reale

**Q: Non ricevo le email**
A: Controlla lo spam e verifica di aver confermato l'email in Formspree

**Q: Errore CORS**
A: Assicurati che il sito sia servito tramite HTTP/HTTPS, non come file locale

---

**Supporto Formspree**: https://help.formspree.io
