import React from "react";
import { Modal, Button } from "react-bootstrap";

const TermsModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body className="termsBody">

            <h1>CONDIZIONI GENERALI D'USO</h1>

                <h2>Art. 1 - Oggetto</h2>

                <p>Le presenti condizioni generali d'uso rappresentano l'accesso e l'uso del sito BoardGameBlog (d'ora in avanti il "titolare"), sono attività regolate dalle presenti condizioni generali d'uso.</p>
                <p>Il presente sito è di proprietà di:</p>
                <ul>
                <li>Nome: Andrea Barocchi</li>
                <li>Luogo di nascita: Roma</li>
                <li>Data di nascita: 12/06/1994</li>
                <li>Residenza: [inserire indirizzo di residenza]</li>
                <li>Codice Fiscale: [inserire codice fiscale]</li>
                </ul>
                <p>L'accesso al sito e il suo uso presuppongono la lettura, la conoscenza e l'accettazione di queste condizioni generali d’uso.</p>

                <h2>Art. 2 - Modifiche alle condizioni d’uso</h2>

                <p>Il titolare potrà modificare o semplicemente aggiornare, in tutto o in parte, queste condizioni generali d'uso. Le modifiche e gli aggiornamenti delle condizioni generali d'uso saranno notificati agli utenti nella Home page non appena adottati e saranno vincolanti non appena pubblicati sul sito web in questa stessa sezione. L'accesso e l'utilizzo del sito presuppongono l'accettazione da parte dell'utente delle presenti condizioni d’uso.</p>

                <h2>Art. 3 - Proprietà intellettuale</h2>

                <p>I contenuti presenti sul sito, quali, a titolo esemplificativo, le opere, le immagini, le fotografie, i dialoghi, le musiche, i suoni ed i video, i documenti, i disegni, le figure, i loghi ed ogni altro materiale, in qualsiasi formato, pubblicato sul sito medesimo, compresi i menu, le pagine web, la grafica, i colori, gli schemi, gli strumenti, i caratteri ed il design del sito, i diagrammi, il layout, i metodi, i processi, le funzioni ed il software che fanno parte del sito, sono protetti dal diritto d'autore e da ogni altro diritto di proprietà.</p>
                <p>L'utente è autorizzato unicamente a visualizzare il sito ed i suoi contenuti fruendo dei relativi servizi ivi disponibili. L'utente è, inoltre, autorizzato a compiere tutti quegli altri atti di riproduzione temporanei, privi di rilievo economico proprio, che sono considerati transitori o accessori, parte integrante ed essenziale della stessa visualizzazione e fruizione del Sito e dei suoi contenuti e tutte le altre operazioni di navigazione sul Sito che siano eseguite solo per un uso legittimo del medesimo.</p>
                <p>L'utente non è in alcun modo autorizzato ad eseguire alcuna riproduzione, su qualsiasi supporto, in tutto o in parte del sito e dei suoi contenuti. Qualsiasi atto di riproduzione dovrà essere, di volta in volta, autorizzato da BoardGameBlog o, all'occorrenza, dagli autori delle singole opere contenute nel sito. Tali operazioni di riproduzione dovranno essere comunque eseguite per scopi leciti e nel rispetto del diritto d'autore e degli altri diritti di proprietà intellettuale e degli autori delle singole opere contenute nel sito.</p>

                <h3>Articoli e Contenuti Utente:</h3>

                <p>Il Titolare ha inoltre adottato ogni utile precauzione affinché tutte le informazioni presenti sul sito siano corrette, complete ed aggiornate, tuttavia lo stesso non assume nei confronti degli utenti alcuna responsabilità circa l'accuratezza e la completezza dei contenuti pubblicati sul sito, salvo quanto diversamente previsto dalla legge. Qualora un utente riscontrasse errori o mancati aggiornamenti delle informazioni presenti sul sito è pregato di comunicarlo al titolare utilizzando la casella email: andreabarocchi@gmail.com.</p>
                <p>Gli utenti possono pubblicare articoli o altri contenuti sul nostro sito web. Tuttavia, tali articoli o contenuti diventeranno di proprietà esclusiva del nostro sito web.</p>
                <p>Gli utenti rinunciano a qualsiasi diritto di proprietà esclusiva sugli articoli o altri contenuti pubblicati sul nostro sito. Di conseguenza, il sito web avrà il diritto di utilizzare, modificare, distribuire e riprodurre tali articoli o contenuti in qualsiasi forma o formato, senza ulteriore autorizzazione o compenso.</p>
                <p>Gli utenti confermano di essere i legittimi titolari di tutti i diritti necessari per pubblicare gli articoli o altri contenuti sul sito web e di non violare i diritti di terzi, inclusi i diritti di proprietà intellettuale.</p>
                <p>Il sito web non sarà responsabile per alcuna violazione di diritti di terzi derivante dalla pubblicazione degli articoli o dei contenuti degli utenti sul nostro sito. Gli utenti accettano di manlevare e tenere indenne il sito web da qualsiasi reclamo o azione legale derivante dalla pubblicazione degli articoli o dei contenuti degli utenti.</p>
                <p>Il sito web si riserva il diritto di rimuovere o modificare gli articoli o i contenuti degli utenti a sua discrezione, senza alcuna responsabilità verso gli utenti.</p>
                <p>Gli utenti riconoscono che gli articoli o i contenuti pubblicati sul sito web possono essere visibili ad altri utenti o al pubblico in generale, e accettano di non avere alcuna aspettativa di privacy o riservatezza riguardo a tali articoli o contenuti.</p>
                <p>Il sito web si riserva il diritto di apportare modifiche a queste disposizioni sui termini e condizioni relative agli articoli e ai contenuti degli utenti, previa comunicazione agli utenti.</p>

                <h2>Art. 4 - Utilizzo del sito e responsabilità dell’utente</h2>

                <p>L'accesso e l'uso del sito, la visualizzazione delle pagine web, compresa la comunicazione con il titolare, costituiscono attività condotte dall'utente esclusivamente per usi personali estranei a qualsiasi attività commerciale, imprenditoriale e professionale.</p>
                <p>L'utente è personalmente responsabile per l'uso del sito e dei relativi contenuti. Il titolare non potrà essere considerato responsabile dell'uso non conforme alle norme di legge vigenti, del sito web e dei contenuti da parte di ciascuno dei propri utenti, salva la responsabilità per dolo e colpa grave. In particolare, l'utente sarà l'unico ed il solo unico responsabile per la comunicazione di informazioni e di dati non corretti, falsi o relativi a terzi soggetti, senza che questi abbiano espresso il loro consenso, nonché in considerazione di un uso non corretto degli stessi.</p>
                <p>Ogni materiale scaricato o altrimenti ottenuto attraverso l'uso del servizio è a scelta e a rischio dell'utente, pertanto ogni responsabilità per eventuali danni a sistemi di computer o perdite di dati risultanti dalle operazioni di scarico ricade sull'utente e non potrà essere imputata al titolare.</p>
                <p>L'utente è responsabile della custodia e del corretto utilizzo delle proprie informazioni personali, ivi comprese le credenziali che consentono di accedere ai servizi riservati, nonché di ogni conseguenza dannosa o pregiudizio che dovesse derivare a carico di BoardGameBlog ovvero di terzi a seguito del non corretto utilizzo, dello smarrimento, sottrazione di tali informazioni.</p>
                <p>Il Titolare ha provveduto ad adottare ogni ragionevole accorgimento per evitare che siano pubblicati sul sito contenuti ed immagini che possano essere ritenuti lesivi del decoro, dei diritti umani e della dignità delle persone, in tutte le possibili forme ed espressioni. In ogni caso, qualora i suddetti contenuti siano ritenuti lesivi della sensibilità religiosa o etica o del decoro, l'utente interessato è pregato di comunicare tale condizione al titolare, il quale tuttavia avverte che ogni eventuale accesso ai contenuti considerati lesivi o offensivi avviene da parte dell'utente a proprio insindacabile giudizio ed a sua esclusiva e personale responsabilità.</p>

                <h2>Art. 5 - Account personale</h2>

                <p>L'utente avrà la possibilità di registrarsi al sito per usufruire dei prodotti e/o servizi dello stesso. L'utente avrà a disposizione un'area del sito esclusivamente dedicata allo stesso denominata "SignUp" attraverso cui, potrà accedere e potrà verificare di volta in volta lo stato dei servizi di cui hai fatto richiesta.</p>
                <p>Registrandosi al sito, l'utente dovrà fornire un indirizzo e-mail o un username (di seguito la "id") e una password di accesso strettamente personali. Sia l'id che la password non potranno essere utilizzate da due o più postazioni contemporaneamente e l'utente non potrà cederle o trasferirle a terzi, se non sotto la sua piena ed esclusiva responsabilità. Al riguardo, si ricorda che l'utente sarà ritenuto responsabile nei confronti del titolare e qualsiasi terzo per ogni e qualsiasi azione, transazione e/o fatto avvenuto e/o eseguito mediante l'utilizzo dell'id e/o della password inserita.</p>
                <p>L'utente è obbligato a preservare la riservatezza e segretezza della sua id e della sua password ed è tenuto ad informare prontamente il sito di qualsiasi eventuale loro uso non autorizzato o del loro smarrimento, a mezzo email o raccomandata A/R affinché la stessa possa sospendere l'erogazione dei propri servizi con riferimento all’account. Qualora accada che sia intervenuto un accesso non autorizzato all'account dell'utente e/o lo stesso abbia smarrito la sua ID e/o la sua Password per più di tre volte, il sito si riserva la facoltà di rimuovere l'account dell'utente senza che questi abbia nulla a pretendere nei confronti del titolare.</p>
                <p>Il titolare non potrà essere ritenuto in alcun modo responsabile, direttamente o indirettamente, in qualsiasi forma o sulla base di qualsivoglia regime di responsabilità, per lesioni o danni di qualsiasi genere risultanti da, o correlati a, il mancato rispetto da parte dell'utente delle disposizioni di cui al presente articolo. Il titolare sarà libero di inibire l'accesso di un utente alla propria area clienti e/o di interrompere l'operatività dell'id e/o della password dello stesso, qualora ritenga che sia intervenuta una sostanziale violazione delle presenti condizioni generali d'uso ed in particolare di quanto dopo previsto, ovvero qualora l'utente compia un uso illecito o scorretto dei servizi del sito. L'utente sarà inoltre tenuto a non effettuare né a consentire o permettere a terzi i seguenti comportamenti (non esaustivi e in continuo aggiornamento):</p>
                <ul>
                <li>il caricamento o la creazione all'interno dell'area cliente di qualsiasi dato o contenuto che sia in violazione di qualsivoglia legge, regolamento o diritto di terzi (ivi compresi, tra gli altri, segreti commerciali o dati personali di terzi);</li>
                <li>l'utilizzazione dei servizi della società per scopi diversi dal mero accesso agli stessi nelle modalità in cui sono forniti dalla stessa;</li>
                <li>effettuare azioni di qualunque genere e/o natura volte ad aggirare, disattivare ovvero interferire in qualsiasi modo con gli applicativi correlati alla sicurezza dei servizi del sito o altri applicativi che prevengano, limitino ovvero restringano l'utilizzo ovvero la copia di qualsiasi materiale presente sullo stesso;</li>
                <li>utilizzazione dei servizi del sito per qualsivoglia scopo illecito o in violazione di qualsiasi normativa applicabile;</li>
                <li>interferisca o danneggi i servizi e i sistemi del sito ovvero il loro relativo godimento da parte di qualsivoglia utente, con qualsiasi mezzo, compreso mediante il caricamento di file o comunque disseminando virus, adware, spyware, bachi o altri strumenti elettronici nocivi;</li>
                <li>effettui azioni volte ad aggirare strumenti per l'esclusione di robot o altre misure che il sito possa utilizzare per prevenire accessi non autorizzati ai suoi servizi.</li>
                </ul>

                <h2>Art. 6 - Esclusione di responsabilità</h2>

                <p>Come indicato in precedenza, il titolare svolge con la massima diligenza la cura e il mantenimento del sito e dei suoi contenuti, tuttavia, non si assume alcuna responsabilità per la correttezza, la completezza e la tempestività dei dati e delle informazioni fornite sul sito o sui siti ad esso collegati. Deve perciò escludersi ogni responsabilità per errori od omissioni derivanti dall'uso dei dati e delle informazioni sul sito.</p>
                <p>Il titolare declina ogni responsabilità, inclusa la presenza di errori, la correzione degli errori, la responsabilità del server ospitante il sito; non è altresì responsabile dell'uso delle informazioni contenute, della loro correttezza e affidabilità. In nessun caso, inclusa la negligenza, il titolare sarà responsabile di ogni diretto o indiretto danno che possa risultare dall'uso, o dalla incapacità di usare, i materiali presenti nel sito.</p>

                <h2>Art. 7 - Limitazioni all'erogazione del servizio</h2>

                <p>Il titolare non potrà essere ritenuto responsabile dei danni conseguenti alla mancata prestazione del servizio a causa dell'errato o mancato funzionamento dei mezzi elettronici di comunicazione per cause estranee alla sfera del proprio prevedibile controllo. A titolo esemplificativo, ma non esaustivo, il malfunzionamento dei server ed altri dispositivi elettronici, anche non facenti parte integrante della rete Internet, malfunzionamento dei software installati, virus informatici sull'eventuale presenza di virus o altri componenti informatici nocivi e dannosi, nonché da azioni di hacker o altri utenti aventi accesso alla rete. L'utente s'impegna dunque a tenere indenne e manlevare il titolare da qualsiasi responsabilità e/o richiesta al riguardo.</p>

                <h2>Art. 8 - Link di altri siti</h2>

                <p>Il sito può contenere collegamenti ipertestuali ad altri siti web che non hanno nessun collegamento con lo stesso. Il titolare non controlla né monitora tali siti web e non ne garantisce pertanto in alcun modo i contenuti né la gestione dei dati. L'utente dovrà pertanto leggere attentamente le condizioni d'uso dei siti terzi visitati e le relative privacy policy, in quanto le presenti condizioni d'uso e la privacy policy si riferiscono unicamente al presente sito.</p>

                <h2>Art. 9 - Link in altre pagine web</h2>

                <p>Il presente sito può essere raggiunto anche attraverso siti terzi dove sarà presente un link o banner per accedere al sito.</p>
                <p>L'attivazione di link su siti terzi verso il presente sito è possibile sempre e quando non sia lesivo delle presenti condizioni d'uso.</p>
                <p>L'attivazione di link non autorizzati legittimerà il titolare all'esercizio di azioni legali a tutela dei propri diritti.</p>

                <h2>Art. 10 - Durata e risoluzione</h2>

                <p>Le presenti condizioni generali d'uso hanno durata illimitata. Il titolare potrà, in qualsiasi momento, interrompere l'erogazione del servizio senza preavviso e senza fornire alcuna motivazione.</p>
                <p>L'utente potrà in qualsiasi momento interrompere l'utilizzo del sito, senza alcun obbligo di preavviso.</p>

                <h2>Art. 11 - Legge applicabile e foro competente</h2>

                <p>Le presenti condizioni generali d'uso sono regolate dalla legge italiana. Per qualsiasi controversia derivante dall'interpretazione, validità e/o esecuzione delle presenti condizioni generali d'uso, sarà competente esclusivamente il foro di Roma.</p>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default TermsModal;
