const XLSX = require('xlsx');

const data = [
  ['Domein','#','Skill','Quizvragen - variant A','Quizvragen - variant B','Quizvragen - variant C'],
  ['Focus',1,'Doel kiezen','Voor elke slag kies ik een concreet, haalbaar doelgebied.','Bij elke putt kies ik een duidelijk punt op de green als doel.','Op de afslagplaats kies ik altijd een specifiek doelgebied op de fairway.'],
  ['Focus',2,'Beeld maken','Voor ik sla, zie ik de baan van de bal naar het doel al voor me.','Bij een bunkerslag zie ik de vlucht en landing van de bal al voor de swing.','Voordat ik putt, stel ik me de lijn van de bal naar de hole al voor.'],
  ['Focus',3,'Eerlijk inschatten','Ik kies mijn club op mijn gemiddelde afstand, niet op mijn beste slag.','Bij een approach kies ik de club waarmee ik die afstand gemiddeld haal, niet de beste keer.','Ik baseer mijn keuze niet op die ene perfecte slag, maar op hoe ik het doorgaans doe.'],
  ['Focus',4,'Risico afwegen','Bij elke slag weeg ik af of de winst het risico op een misser waard is.','Bij een carry over water weeg ik af of de kortere route het risico waard is.','Als ik over bomen heen kan spelen, bedenk ik eerst wat een misser me kost.'],
  ['Focus',5,'Knoop doorhakken','Als ik gekozen heb, twijfel ik niet meer voordat ik sla.','Zodra ik mijn club gekozen heb, stap ik zonder twijfel op de bal in.','Na mijn beslissing over de lijn van de putt ga ik er volledig voor.'],
  ['Concentratie',1,'Bij de bal blijven','Tijdens de swing denk ik alleen aan deze ene slag.','Tijdens een greenside chip ben ik alleen met die ene slag bezig.','Bij een lange putt houdt mijn aandacht precies bij die ene slag.'],
  ['Concentratie',2,'Afleiding wegzetten','Vlak voor en tijdens de slag sluit ik alles om me heen uit.','Vlak voor een cruciale putt sluit ik het commentaar van mijn flight buiten.','Op een drukke afslagplaats trek ik me niets aan van wat er om me heen gebeurt.'],
  ['Concentratie',3,'Oog op de bal','Vlak voor de slag richt ik mijn blik op de bal.','Bij een bunkerslag fixeer ik mijn blik op het zand achter de bal.','Voordat ik chip, focus ik mijn ogen op de bal.'],
  ['Concentratie',4,'Resetten','Als iemand beweegt of praat vlak voor mijn slag, start ik mijn routine opnieuw.','Bij afleiding van buitenaf stap ik terug en begin opnieuw.','Als er iets om me heen gebeurt net voor de slag, stap ik terug en herstart ik.'],
  ['Concentratie',5,'Ertussen ontspannen','Tussen de slagen ontspan ik, in plaats van te blijven malen.','Tussen twee holes laat ik de vorige slag los en geniet ik van de wandeling.','Terwijl ik naar de green loop, zet ik de vorige slag uit mijn hoofd.'],
  ['Overtuiging',1,'Erin geloven','Vlak voor de slag geloof ik dat ik hem ga maken.','Op het moment dat ik putt, geloof ik dat de bal in de hole gaat.','Bij een lastige bunkerslag geloof ik dat ik hem dicht bij de pin krijg.'],
  ['Overtuiging',2,'Vol inzetten','Ik geef elke slag mijn volle inzet, ook als het tegenzit.','Ook na twee slechte holes geef ik mijn afslagslag volle aandacht en energie.','Op een moeilijk par-3 zet ik me er volledig voor in, ook als de ronde tot dan toe tegenvalt.'],
  ['Overtuiging',3,'Jezelf opladen','Vlak voor de slag maak ik mezelf scherp en actief.','Vlak voor een afslag zet ik mezelf mentaal aan met een bewuste ademhaling of beweging.','Voor een lange putt activeer ik mezelf bewust voordat ik mijn routine inzet.'],
  ['Overtuiging',4,'Uitdaging aangaan','Een lastige slag zie ik als uitdaging, niet als bedreiging.','Een carry over water zie ik als een kans om mijn slag te laten zien, niet als bedreiging.','Een moeilijke bunker zie ik als uitdaging die ik aankan.'],
  ['Overtuiging',5,'Jezelf aanmoedigen','Ik haal een goede, vergelijkbare slag terug om mezelf vertrouwen te geven.','Voor een lange putt denk ik terug aan een vergelijkbare putt die ik al eens gemaakt heb.','Bij een lastige chip haal ik een soortgelijke slag terug waarop ik trots was.'],
  ['Vertrouwen',1,'Niet sturen','Tijdens de swing stuur ik de beweging niet bij.','Als ik eenmaal insla, laat ik de swing zijn gang gaan zonder bij te sturen.','Bij een putt stuur ik de putterbeweging niet bij zodra ik begonnen ben.'],
  ['Vertrouwen',2,'Niet aan techniek denken','Als ik over de bal sta, denk ik niet meer aan mijn techniek.','Over de bal staand denk ik niet aan mijn gripstand of standbreedte.','Bij een greenside chip laat ik de techniek los en speel ik op gevoel.'],
  ['Vertrouwen',3,'Uitvoeren zoals bedacht','Ik sla de slag zoals ik hem bedacht heb, zonder te aarzelen.','Ik putt de lijn zoals ik hem gelezen heb, zonder op het laatste moment te corrigeren.','Ik sla de approach zoals ik hem gepland heb, zonder van richting te veranderen.'],
  ['Vertrouwen',4,'Losjes blijven','Als het spannend wordt, blijf ik losjes in mijn grip.','In een wedstrijd voel ik geen extra spanning in mijn handen.','Op een beslissende putt houd ik mijn grip bewust ontspannen.'],
  ['Vertrouwen',5,'Gericht oefenen','Ik train regelmatig en gericht, zodat ik mijn slagen ken.','Ik oefen mijn bunkerslag regelmatig, zodat ik hem op de baan vertrouw.','Ik bezoek de oefengreen regelmatig om mijn puttbeweging te kennen.'],
  ['Beoordeling',1,'Goed kijken','Na elke slag kijk ik nauwkeurig wat de bal doet.','Na mijn approach volg ik de vlucht en landing van de bal nauwkeurig.','Na een chip kijk ik precies waar de bal landt en hoe hij doorloopt.'],
  ['Beoordeling',2,'Afwijking inschatten','Ik kan de afwijking van mijn doel nauwkeurig inschatten.','Na een afslag schat ik in hoeveel meter de bal van mijn doellijn afwijkt.','Na een putt zie ik precies hoe ver de bal links of rechts van de hole eindigde.'],
  ['Beoordeling',3,'Nuchter blijven','Ik beoordeel mijn slag nuchter, ook als ik baal of juist blij ben.','Na een slechte bunkerslag beoordeel ik rustig wat er gebeurde, zonder te overdrijven.','Na een birdie beoordeel ik de slag alsnog zakelijk op uitvoering.'],
  ['Beoordeling',4,'Vergelijken met je plan','Ik vergelijk waar de bal terechtkwam met waar ik hem wilde hebben.','Na een approach vergelijk ik de werkelijke landing met mijn geplande doelgebied.','Na een putt vergelijk ik de eindpositie van de bal met de lijn die ik had gekozen.'],
  ['Beoordeling',5,'Vaste volgorde','Ik beoordeel elke slag op dezelfde manier.','Na een bunkerslag doorloop ik altijd dezelfde stappen in mijn beoordeling.','Of het nu een afslag of een putt is, mijn beoordeling daarna volgt steeds dezelfde volgorde.'],
  ['Acceptatie',1,'Loslaten','Na een slechte slag laat ik de frustratie los voor ik doorloop.','Na een bal in het water laat ik de ergernis los terwijl ik naar de volgende afslagplaats loop.','Na een gemiste korte putt schud ik de frustratie af voor ik doorloop naar de volgende tee.'],
  ['Acceptatie',2,'Mild voor jezelf','Na een misser scheld ik niet op mezelf.','Na een slechte chip geef ik mezelf geen standje voor de rest van de ronde.','Na een gemiste korte putt ga ik niet negatief tegen mezelf praten.'],
  ['Acceptatie',3,'In verhouding zien','Een slechte slag blaas ik niet op tot een ramp.','Een dubbelbogey op hole 5 betekent voor mij niet dat de hele ronde verpest is.','Een afslag die niet lukt zie ik als losse slag, niet als begin van een slechte ronde.'],
  ['Acceptatie',4,'Verder spelen','Ik richt me meteen op de nieuwe situatie en de volgende slag.','Na een bal in de rough richt ik me direct op de lie en de volgende keuze.','Na een three-putt kijk ik meteen vooruit naar de volgende hole.'],
  ['Acceptatie',5,'Genieten van het goede','Bij een goede slag sta ik even stil om ervan te genieten.','Na een geslaagde putt neem ik een moment om ervan te genieten.','Na een mooie recovery geniet ik even van het gevoel.'],
  ['Analyse',1,'Mentaal of technisch?','Na een misser vraag ik me af of het aan mijn voorbereiding of aan mijn uitvoering lag.','Na een slechte chip vraag ik me af of mijn voorbereiding klopte of dat de uitvoering haperde.','Na een gemiste afslag onderzoek ik of het aan mijn beslissing of aan mijn swinguitvoering lag.'],
  ['Analyse',2,'Een oorzaak','Ik zoek de meest waarschijnlijke oorzaak, geen heel lijstje.','Na een slechte putt zoek ik de meest logische oorzaak in plaats van drie dingen tegelijk te corrigeren.','Na een afwijkende approach kies ik een meest waarschijnlijke oorzaak om op te focussen.'],
  ['Analyse',3,'Patroon herkennen','Ik merk het als dezelfde fout zich herhaalt.','Als ik op meerdere holes rechts mis, merk ik dat patroon op.','Als mijn putts steeds te kort blijven, herken ik dat als een terugkerende fout.'],
  ['Analyse',4,'Eerlijk diagnosticeren','Ik geef niet automatisch de wind of de ondergrond de schuld.','Als mijn approach te kort valt, kijk ik eerst naar mijn uitvoering voor ik de wind de schuld geef.','Na een slechte bunkerslag zoek ik eerst bij mijn techniek, niet bij de ligging.'],
  ['Analyse',5,'Hulp vragen','Ik vraag iemand om mee te kijken naar de oorzaak.','Als ik er zelf niet uitkom, vraag ik mijn medespeelster of -speler wat hij of zij van buitenaf zag.','Bij een terugkerende fout vraag ik een pro of hij mee wil kijken.'],
  ['Leren',1,'Fouten zien als leerstof','Een fout zie ik als iets om van te leren, niet als bewijs dat ik het niet kan.','Een slechte putt zie ik als nuttige informatie, niet als bewijs van mijn onvermogen.','Een mislukte bunkerslag gebruik ik als leerstof, niet als reden om te twijfelen aan mijn kunnen.'],
  ['Leren',2,'Terugkijken','Na een slag of ronde denk ik na over wat ik eruit kan leren.','Na een ronde neem ik even de tijd om te bedenken wat ik ervan geleerd heb.','Na een lastige hole denk ik kort terug op wat ik de volgende keer anders zou doen.'],
  ['Leren',3,'Van misser naar leerdoel','Een gemiste slag zet ik om in een concreet leerpunt.','Na een gemiste putt formuleer ik een concreet aandachtspunt voor de volgende keer.','Een slechte chip zet ik om in een duidelijk verbeterpunt voor mijn volgende oefensessie.'],
  ['Leren',4,'Oplossing bedenken','Ik bepaal concreet wat ik de volgende keer anders doe.','Na een slechte bunkerslag bepaal ik precies welke aanpassing ik de volgende keer maak.','Na een approach die steeds links uitkomt, bedenk ik concreet wat ik ga aanpassen.'],
  ['Leren',5,'Een les onthouden','Ik onthoud een concrete les voor de volgende keer.','Ik verlaat de baan met een duidelijke les in mijn hoofd voor de volgende ronde.','Na een oefensessie neem ik een concreet leerpunt mee naar de volgende keer dat ik speel.'],
];

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(data);

ws['!cols'] = [
  { wch: 14 },
  { wch: 4 },
  { wch: 22 },
  { wch: 65 },
  { wch: 65 },
  { wch: 65 },
];

XLSX.utils.book_append_sheet(wb, ws, 'Quizvragen');
XLSX.writeFile(wb, 'MR_quizvragen_normatief.xlsx');
console.log('Klaar!');
