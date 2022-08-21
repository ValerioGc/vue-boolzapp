var DateTime = luxon.DateTime;
// App Vue
var app = new Vue({
    el: '#container-app',
    data: {
    // Controllo larghezza schermo
        screenType: 'desktop',
    // Definizione mittente messaggio
        isSent: '',
        isHidden: true,
        isHiddenHD: true,
    // Ora e Data
        lastMessageDate: '',
        lastMessageTime: '',
        lastMessage: '',
    // Chat Attiva
        chatEmpty: false,
        activeChatIndex: 0,
    // Nuovo Messaggio
        newMessage:'',
        txtInput: '',
    // Input Ricerca
        searchInput: '',
    // Contatti
        noCnt: false,
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                messages: [
                    {
                        date: '10/01/2020',
                        hour: '15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020',
                        hour:  '15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020',
                        hour:  '16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                messages: [
                    {
                        date: '20/03/2020 ',
                        hour:' 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 ',
                        hour:' 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 ',
                        hour:' 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                messages: [
                    {
                        date: '28/03/2020 ',
                        hour:' 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 ',
                        hour:' 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 ',
                        hour:' 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                messages: [
                    {
                        date: '10/01/2020 ',
                        hour:' 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 ',
                        hour:' 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                messages: [
                    {
                        date: '10/01/2020 ',
                        hour:' 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 ',
                        hour:' 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                messages: [
                    {
                        date: '10/01/2020',
                        hour:' 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020',
                        hour:' 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020',
                        hour:' 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                messages: [
                    {
                        date: '10/01/2020',
                        hour:' 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020',
                        hour:' 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                messages: [
                    {
                        date: '10/01/2020',
                        hour:' 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020',
                        hour:' 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020',
                        hour:' 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ]
    },
    mounted () {
        let listContact = document.querySelectorAll('li');
        listContact[this.activeChatIndex].classList.add('selected-contact');
    },
    computed: {
    // Funzione Filtraggio
        filterContact() {
            let listContact = document.querySelectorAll('li');
            let str = this.searchInput.trim();
            if (str !== '') {
                for (let i = 0; i < this.contacts.length; i++) {
                    if (!this.contacts[i].name.toLowerCase().includes(str.toLowerCase())) {
                        listContact[i].classList.add('d-none')
                        console.log(`L'input di ricerca è ${str}`)
                        console.log('contatto i =' + ' ' + listContact[i]);
                        console.log(` La stringa ${str} NON è contenuta in ${this.contacts[i].name}`)
                        this.noCnt = true;
                    } else {
                        console.log(` La stringa ${str} è contenuta in ${this.contacts[i].name}`)
                        this.noCnt = false;
                    }
                }
            } else if (str == '') {
                for (let x = 0; x < this.contacts.length; x++) {
                    listContact[x].classList.remove('d-none');
                    this.noCnt = false;
                }
            }
            return str;
        },
    // Controllo tipo device
        deviceScreenType () {
            let screenWidth = window.screen.width;
            if (screenWidth < 578) {
                this.screenType = 'mobile';
            } else if (screenWidth > 578) {
                this.screenType = 'desktop';
            }
            return this.screenType;
        },
        bypassMQ () {
            let aside = document.querySelector('aside');
            let chat = document.getElementById('message-app');
            if (this.screenType == 'mobile') {
                aside.classList.remove('d-none');
                chat.classList.add('d-none');
            } else {
                aside.classList.remove('d-none');
                chat.classList.remove('d-none');
            }
        },

    //Funzione recupero data ultimo messaggio
        // getLastMessageTime() {
        // }

    },
    methods: {
        moveActive(index) {
            let listContact = document.querySelectorAll('li');
            listContact[this.activeChatIndex].classList.remove('selected-contact');
            listContact[this.activeChatIndex].classList.remove('selected-contact-alt');
            this.activeChatIndex = index;
            listContact[this.activeChatIndex].classList.add('selected-contact');
            console.log(`Il contatto attivo è: ${this.activeChatIndex}`);
        },
    // Funzione nascondi notifica
        hide() {
            document.getElementById('notification-alert-section').classList.add('d-none');
        },
    // Funzione Ricerca Stato messaggio
        findStatus () {
            for (let i = 0; i < this.contacts.length; i++) {
                let msg = this.contacts[i].messages;
                for (let x = 0; x < msg.length ; x++) {
                    if (msg[x].status == 'send') {
                        this.isSent = true;
                    } else {
                        this.isSent = false;
                    }
                }
            }
        },
    // Funzione Aggiunta messaggio ad array
        pushMessage () {
            if (this.txtInput.trim() !== '') {
                this.getTimeActual();
                let time = this.lastMessageTime;
                let date = this.lastMessageDate;
                let msg = this.txtInput.trim();
                let newM =
                {
                    date: date,
                    hour: time,
                    message: msg,
                    status: 'sent'
                }
                this.txtInput = '';
                this.contacts[this.activeChatIndex].messages.push(newM);
            // Funzione Aggiunta risposta ad array
                setTimeout(() => {
                    this.getTimeActual();
                    time = this.lastMessageTime;
                    date = this.lastMessageDate;
                    let newR =
                    {
                        date: date,
                        hour: time,
                        message: 'Ok',
                        status: 'received'
                    }
                    this.lastMessage = newR.message;
                    this.contacts[this.activeChatIndex].messages.push(newR);
                }, 2000)
            }
        },
    // Funzione Recupero ora e data attuale
        getTimeActual() {
            this.lastMessageTime = DateTime.now().toFormat('HH:mm:ss');
            this.lastMessageDate = DateTime.now().toFormat('dd/LL/y');
        },
    // Cambio  tema
        enableDarkMode () {
            document.querySelector('#message-app-chat').classList.toggle('dark-mode-bg');
            document.querySelector('aside').classList.toggle('dark-mode');
            document.querySelector('#app-header').classList.toggle('dark-mode');
            document.querySelector('header').classList.toggle('dark-mode');
            document.querySelector('footer').classList.toggle('dark-mode');
            document.querySelector('#search-bar-container').classList.toggle('dark-mode');
        // Cambio Colore Icone
            let icons = document.querySelectorAll('i');
            for (let i = 0; i < icons.length; i++) {
                icons[i].classList.toggle('dark-mode-icon');
            }
        // Icone tema
            document.querySelector('.fa-circle-half-stroke').classList.toggle('d-none');
            document.querySelector('.fa-moon').classList.toggle('d-none');
        },
    // Funzione di visualizzazione chat / contatti mobile
        viewMessage () {
            if (this.screenType == 'mobile') {
                document.querySelector('aside').classList.toggle('d-none');
                document.querySelector('#message-app').classList.toggle('d-none');
            }
        },
    // Pulsante Ricarica pagina
        reload () {
            location.reload();
        },

    // Cancella Messaggio ---
        // deleteMsg () {
            // this.contacts[this.activeChatIndex].messages.splice(this.contacts.messages[this.activeChatIndex]);
        // },

    // Svuota Chat
        deleteChat () {
            this.contacts[this.activeChatIndex].messages = [];
            this.chatEmpty = true;
            this.ctrHiddenHD();
        },
    // Toggle menu header chat
        ctrHiddenHD() {
            if (this.isHiddenHD == true) {
                this.isHiddenHD = false;
            } else {
                this.isHiddenHD = true;
            }
        },

    // Toggle menu messaggi
        // ctrHidM() {
        //     if (this.isHidden == true) {
        //         this.isHidden = false;
        //     } else {
        //         this.isHidden = true;
        //     }
        // }
    }
})