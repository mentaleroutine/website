// ─────────────────────────────────────────────────────────────────
// Entry Narrative Framework v1.5 (Berend & Henk, 23-9-2026) — frozen baseline.
// 3 groups → 12 entry narratives → 48 sub-narratives, each with one primary hook.
// Group lines, entry narratives and sub-narratives use Henk's golfer-voice choices
// (review "Golfer-voice alternatives", Oct 2026); the hooks are v1.5 as frozen.
// Dutch, German, French and Spanish = translations in the same spoken register
// (DE "du", FR "vous" in the hooks, ES "tú"). Every text exists in all 5 languages.
//
// Used on the homepage:
//  - "Sound familiar?" section: the 12 entry narratives, each linking to the
//    QuickScan with ?route=<id> (e.g. P2) so performance can be tracked per route.
//  - Hero: ?route=P4.2 (sub-narrative) or ?route=P4 (entry → its first hook)
//    swaps the default hero hook (P1.1) for the hook of that route, so an ad on a
//    route lands on the same message.
// The influencing factors stay under water: never shown as navigation here.
// ─────────────────────────────────────────────────────────────────

import type { Lang } from "./translations";

type Text = { en: string; nl: string; de: string; fr: string; es: string };

export type EntryNarrative = {
  id: string;
  statement: Text;
  subs: Text[];  // the 4 sub-narratives (golfer voice), in order .1 → .4
  hooks: Text[]; // the 4 primary hooks, in order .1 → .4
};

export type NarrativeGroup = {
  id: "P" | "E" | "D";
  name: Text;
  tagline: Text;
  narratives: EntryNarrative[];
};

export const NARRATIVE_GROUPS: NarrativeGroup[] = [
  {
    id: "P",
    name: { en: "Performance", nl: "Prestatie", de: "Leistung", fr: "Performance", es: "Rendimiento" },
    tagline: { en: "I want to shoot lower.", nl: "Ik wil minder slagen maken.", de: "Ich will weniger Schläge spielen.", fr: "Je veux jouer moins de coups.", es: "Quiero hacer menos golpes." },
    narratives: [
      {
        id: "P1",
        statement: { en: "I'm a better golfer than my scores show.", nl: "Ik ben een betere golfer dan mijn scores laten zien.", de: "Ich bin ein besserer Golfer, als meine Scores zeigen.", fr: "Je suis meilleur golfeur que mes scores ne le montrent.", es: "Soy mejor golfista de lo que dicen mis resultados." },
        subs: [
          { en: "I hit it pretty well all day and still signed for a number that didn't match.", nl: "Ik sloeg de hele dag prima en tekende toch voor een score die daar niet bij paste.", de: "Ich treffe den ganzen Tag ordentlich und unterschreibe trotzdem eine Zahl, die nicht dazu passt.", fr: "J'ai bien tapé toute la journée et j'ai quand même signé une carte qui ne collait pas.", es: "Le pegué bien todo el día y aun así firmé un resultado que no cuadraba." },
          { en: "I'll make a great par on the toughest hole and then three-putt the easy one after it.", nl: "Ik maak een mooie par op de moeilijkste hole en drieput dan de makkelijke erna.", de: "Ich spiele ein starkes Par am schwersten Loch und dreiputte dann das leichte danach.", fr: "Je fais un super par sur le trou le plus dur, puis trois putts sur le facile juste après.", es: "Hago un parazo en el hoyo más difícil y luego tres putts en el fácil de después." },
          { en: "One or two silly holes and a good round's gone.", nl: "Eén of twee domme holes en een goede ronde is weg.", de: "Ein, zwei dumme Löcher und eine gute Runde ist dahin.", fr: "Un ou deux trous bêtes et une bonne partie s'envole.", es: "Uno o dos hoyos tontos y una buena vuelta se va al traste." },
          { en: "Walking off 18 I'm often thinking I left five shots out there.", nl: "Als ik van de 18e loop, denk ik vaak dat ik er vijf slagen heb laten liggen.", de: "Wenn ich von der 18 komme, denke ich oft: Da lagen noch fünf Schläge.", fr: "En sortant du 18, je me dis souvent que j'ai laissé cinq coups en route.", es: "Al salir del 18, muchas veces pienso que me he dejado cinco golpes por el camino." },
        ],
        hooks: [
          { en: "You hit plenty of good shots. So why does the scorecard still tell a different story?", nl: "Je slaat genoeg goede slagen. Waarom vertelt je scorekaart dan toch een ander verhaal?", de: "Du schlägst genug gute Schläge. Warum erzählt deine Scorekarte dann trotzdem eine andere Geschichte?", fr: "Vous jouez beaucoup de bons coups. Alors pourquoi votre carte de score raconte-t-elle une autre histoire ?", es: "Das muchos buenos golpes. Entonces, ¿por qué tu tarjeta sigue contando otra historia?" },
          { en: "Ever handled the hard holes well, only to give shots away where you least expected to?", nl: "Speel je de moeilijke holes goed, en geef je slagen weg waar je het het minst verwacht?", de: "Schon mal die schweren Löcher gut gemeistert — und dann Schläge verschenkt, wo du es am wenigsten erwartet hast?", fr: "Il vous est déjà arrivé de bien gérer les trous difficiles, puis de lâcher des coups là où vous vous y attendiez le moins ?", es: "¿Alguna vez has jugado bien los hoyos difíciles y luego has regalado golpes donde menos lo esperabas?" },
          { en: "A handful of avoidable holes can hide an entire round of good golf on the scorecard.", nl: "Een handvol vermijdbare holes kan een hele ronde goed golf op je scorekaart verbergen.", de: "Eine Handvoll vermeidbarer Löcher kann auf der Scorekarte eine ganze Runde gutes Golf verstecken.", fr: "Une poignée de trous évitables peut cacher, sur la carte, toute une partie de bon golf.", es: "Un puñado de hoyos evitables puede esconder en la tarjeta toda una vuelta de buen golf." },
          { en: "Where do the shots you feel you shouldn't have lost actually come from?", nl: "Waar komen de slagen vandaan waarvan je voelt dat je ze niet had hoeven verliezen?", de: "Woher kommen eigentlich die Schläge, von denen du spürst, dass du sie nicht hättest verlieren müssen?", fr: "D'où viennent vraiment les coups dont vous sentez que vous n'auriez pas dû les perdre ?", es: "¿De dónde salen en realidad esos golpes que sientes que no deberías haber perdido?" },
        ],
      },
      {
        id: "P2",
        statement: { en: "It's not my swing that costs me shots.", nl: "Het is niet mijn swing die me slagen kost.", de: "Es ist nicht mein Schwung, der mich Schläge kostet.", fr: "Ce n'est pas mon swing qui me coûte des coups.", es: "No es mi swing lo que me cuesta golpes." },
        subs: [
          { en: "Sometimes I'm over the ball, still not sure about the club, and I hit it anyway.", nl: "Soms sta ik boven de bal, nog niet zeker van mijn club, en sla ik toch.", de: "Manchmal stehe ich über dem Ball, bin mir beim Schläger noch nicht sicher — und schlage trotzdem.", fr: "Parfois je suis au-dessus de la balle, pas encore sûr de mon club, et je tape quand même.", es: "A veces estoy sobre la bola, todavía sin tener claro el palo, y pego igual." },
          { en: "I lose more shots with my head than with my swing. Wrong club, wrong target.", nl: "Ik verlies meer slagen met mijn hoofd dan met mijn swing. Verkeerde club, verkeerd doel.", de: "Ich verliere mehr Schläge mit dem Kopf als mit dem Schwung. Falscher Schläger, falsches Ziel.", fr: "Je perds plus de coups avec ma tête qu'avec mon swing. Mauvais club, mauvaise cible.", es: "Pierdo más golpes con la cabeza que con el swing. Palo equivocado, objetivo equivocado." },
          { en: "It's the tap-ins and simple chips I mess up, because I'm not really paying attention.", nl: "Juist de korte putts en simpele chips verpest ik, omdat ik er niet echt bij ben.", de: "Gerade die kurzen Putts und einfachen Chips verbocke ich, weil ich nicht richtig bei der Sache bin.", fr: "Ce sont les petits putts et les chips faciles que je rate, parce que je n'y suis pas vraiment.", es: "Justo los putts cortitos y los chips fáciles son los que fallo, porque no estoy del todo a lo que estoy." },
          { en: "After a bad shot I tend to do something daft on the next one.", nl: "Na een slechte slag doe ik vaak iets doms bij de volgende.", de: "Nach einem schlechten Schlag mache ich beim nächsten oft etwas Dummes.", fr: "Après un mauvais coup, j'ai tendance à faire une bêtise sur le suivant.", es: "Después de un mal golpe suelo hacer alguna tontería en el siguiente." },
        ],
        hooks: [
          { en: "Ever stood over a shot knowing you weren't fully committed — and hit it anyway?", nl: "Ooit boven een bal gestaan terwijl je wist dat je er niet helemaal voor ging — en toch geslagen?", de: "Schon mal über einem Schlag gestanden, obwohl du wusstest, dass du nicht ganz dahinterstehst — und trotzdem geschlagen?", fr: "Vous êtes-vous déjà tenu au-dessus d'un coup en sachant que vous n'étiez pas pleinement engagé — et l'avez joué quand même ?", es: "¿Alguna vez te has puesto sobre un golpe sabiendo que no ibas del todo convencido — y lo has pegado igual?" },
          { en: "Ever walked off a hole knowing the swing wasn't really the problem — the decision was?", nl: "Ooit van een hole gelopen met het gevoel dat niet je swing het probleem was, maar je keuze?", de: "Schon mal ein Loch verlassen mit dem Gefühl, dass nicht der Schwung das Problem war — sondern die Entscheidung?", fr: "Vous êtes-vous déjà dit, en quittant un trou, que le problème n'était pas vraiment le swing — mais la décision ?", es: "¿Alguna vez has terminado un hoyo sabiendo que el problema no era el swing — sino la decisión?" },
          { en: "Do you ever lose focus on the very shots that look too simple to go wrong?", nl: "Verlies je weleens je focus juist bij de slagen die te simpel lijken om mis te gaan?", de: "Verlierst du manchmal den Fokus gerade bei den Schlägen, die zu einfach aussehen, um schiefzugehen?", fr: "Vous arrive-t-il de perdre votre concentration justement sur les coups qui semblent trop simples pour être ratés ?", es: "¿Te desconcentras a veces justo en los golpes que parecen demasiado fáciles para fallarlos?" },
          { en: "The shot after the mistake can cost more than the mistake itself.", nl: "De slag na de fout kan meer kosten dan de fout zelf.", de: "Der Schlag nach dem Fehler kann mehr kosten als der Fehler selbst.", fr: "Le coup qui suit l'erreur peut coûter plus cher que l'erreur elle-même.", es: "El golpe después del error puede costar más que el propio error." },
        ],
      },
      {
        id: "P3",
        statement: { en: "I play fine until the score starts to matter.", nl: "Ik speel prima, tot de score ertoe gaat doen.", de: "Ich spiele gut, bis der Score anfängt zu zählen.", fr: "Je joue bien, jusqu'à ce que le score commence à compter.", es: "Juego bien hasta que el resultado empieza a importar." },
        subs: [
          { en: "When it counts, I rush. My routine just goes out the window.", nl: "Als het telt, ga ik haasten. Mijn routine verdwijnt gewoon.", de: "Wenn's zählt, werde ich hektisch. Meine Routine ist dann einfach weg.", fr: "Quand ça compte, je me précipite. Ma routine passe complètement à la trappe.", es: "Cuando cuenta, me acelero. Mi rutina desaparece sin más." },
          { en: "Under pressure I stop playing to score and start playing not to mess up.", nl: "Onder druk speel ik niet meer om te scoren, maar om geen fouten te maken.", de: "Unter Druck spiele ich nicht mehr auf Score, sondern nur noch darauf, keinen Fehler zu machen.", fr: "Sous pression, je ne joue plus pour scorer, je joue pour ne pas me rater.", es: "Bajo presión dejo de jugar para hacer resultado y empiezo a jugar para no fallar." },
          { en: "Once I start counting my score, I stop thinking about the shot.", nl: "Zodra ik mijn score ga tellen, denk ik niet meer aan de slag.", de: "Sobald ich anfange, meinen Score mitzuzählen, denke ich nicht mehr an den Schlag.", fr: "Dès que je commence à compter mon score, je ne pense plus au coup.", es: "En cuanto empiezo a contar mi resultado, dejo de pensar en el golpe." },
          { en: "I know I can hit this shot. It just feels completely different when the score matters.", nl: "Ik weet dat ik deze slag kan slaan. Hij voelt alleen totaal anders als de score telt.", de: "Ich weiß, dass ich diesen Schlag kann. Er fühlt sich nur komplett anders an, wenn der Score zählt.", fr: "Je sais que je sais jouer ce coup. Il est juste complètement différent quand le score compte.", es: "Sé que puedo dar este golpe. Solo que se siente totalmente distinto cuando el resultado importa." },
        ],
        hooks: [
          { en: "Why can the same swing feel completely different when the shot really matters?", nl: "Waarom kan dezelfde swing totaal anders voelen als de slag er echt toe doet?", de: "Warum kann sich derselbe Schwung völlig anders anfühlen, wenn es bei dem Schlag wirklich drauf ankommt?", fr: "Pourquoi le même swing peut-il sembler complètement différent quand le coup compte vraiment ?", es: "¿Por qué el mismo swing puede sentirse totalmente distinto cuando el golpe importa de verdad?" },
          { en: "Pressure may not make you play badly. It may make you play differently.", nl: "Druk laat je misschien niet slechter spelen. Wel anders.", de: "Druck lässt dich vielleicht nicht schlechter spielen. Aber anders.", fr: "La pression ne vous fait peut-être pas moins bien jouer. Elle vous fait jouer autrement.", es: "Puede que la presión no te haga jugar peor. Pero sí distinto." },
          { en: "The more you want the result, the harder it can become to stay with the shot in front of you.", nl: "Hoe meer je het resultaat wilt, hoe lastiger het kan worden om bij de slag van nu te blijven.", de: "Je mehr du das Ergebnis willst, desto schwerer kann es werden, beim Schlag vor dir zu bleiben.", fr: "Plus vous voulez le résultat, plus il peut devenir difficile de rester sur le coup à jouer.", es: "Cuanto más quieres el resultado, más difícil puede ser quedarte en el golpe que tienes delante." },
          { en: "What if an important shot could feel much more like the same shot in a casual round?", nl: "Wat als een belangrijke slag veel meer kon voelen als diezelfde slag in een ontspannen ronde?", de: "Was, wenn sich ein wichtiger Schlag viel mehr wie derselbe Schlag in einer lockeren Runde anfühlen könnte?", fr: "Et si un coup important pouvait ressembler beaucoup plus au même coup joué lors d'une partie détendue ?", es: "¿Y si un golpe importante pudiera sentirse mucho más como ese mismo golpe en una vuelta tranquila?" },
        ],
      },
      {
        id: "P4",
        statement: { en: "I can't reproduce my best golf consistently.", nl: "Mijn beste golf kan ik niet consequent herhalen.", de: "Mein bestes Golf kann ich nicht konstant abrufen.", fr: "Je n'arrive pas à reproduire mon meilleur golf avec régularité.", es: "No consigo repetir mi mejor golf con regularidad." },
        subs: [
          { en: "I'll have six great holes and then it's gone, and I can't get it back.", nl: "Ik speel zes geweldige holes en dan is het weg, en ik krijg het niet meer terug.", de: "Ich spiele sechs super Löcher, dann ist es weg — und es kommt nicht wieder.", fr: "Je fais six super trous, puis c'est parti, et impossible de le retrouver.", es: "Juego seis hoyos buenísimos y luego se va, y no hay manera de recuperarlo." },
          { en: "I stripe it on the range and then can't find it on the first tee.", nl: "Op de range raak ik hem perfect, en op de eerste tee is het weg.", de: "Auf der Range treffe ich ihn perfekt, und am ersten Tee ist es weg.", fr: "Au practice, je la tape parfaitement, et au départ du 1 c'est envolé.", es: "En el range la pego perfecta y en el tee del 1 ha desaparecido." },
          { en: "One week I shoot my best, the next I'm ten shots worse, and the swing feels the same.", nl: "De ene week speel ik mijn beste ronde, de week erna tien slagen slechter, en mijn swing voelt hetzelfde.", de: "Die eine Woche spiele ich meine beste Runde, die nächste zehn Schläge schlechter — und der Schwung fühlt sich gleich an.", fr: "Une semaine je fais mon meilleur score, la suivante dix coups de plus, et le swing me semble le même.", es: "Una semana hago mi mejor vuelta, la siguiente diez golpes peor, y el swing se siente igual." },
          { en: "Once I lose my rhythm, I spend the rest of the round chasing it.", nl: "Ben ik mijn ritme kwijt, dan jaag ik er de rest van de ronde achteraan.", de: "Wenn ich meinen Rhythmus verliere, renne ich ihm den Rest der Runde hinterher.", fr: "Une fois que j'ai perdu mon rythme, je passe le reste de la partie à lui courir après.", es: "Cuando pierdo el ritmo, me paso el resto de la vuelta persiguiéndolo." },
        ],
        hooks: [
          { en: "Why is great golf sometimes easier to find than it is to keep?", nl: "Waarom is goed golf soms makkelijker te vinden dan vast te houden?", de: "Warum ist gutes Golf manchmal leichter zu finden als festzuhalten?", fr: "Pourquoi le bon golf est-il parfois plus facile à trouver qu'à garder ?", es: "¿Por qué a veces el buen golf es más fácil de encontrar que de mantener?" },
          { en: "You can hit the shot in practice. So why can't you always access it when the score counts?", nl: "Op de range sla je die slag gewoon. Waarom lukt het dan niet altijd als de score telt?", de: "Im Training gelingt dir der Schlag. Warum kannst du ihn dann nicht immer abrufen, wenn der Score zählt?", fr: "À l'entraînement, vous réussissez ce coup. Alors pourquoi ne le retrouvez-vous pas toujours quand le score compte ?", es: "En la práctica el golpe te sale. Entonces, ¿por qué no siempre lo tienes a mano cuando el resultado cuenta?" },
          { en: "If your swing hasn't changed much overnight, why can your score still look completely different?", nl: "Als je swing van de ene op de andere dag nauwelijks verandert, waarom kan je score dan totaal anders zijn?", de: "Wenn sich dein Schwung über Nacht kaum verändert hat — warum kann dein Score dann völlig anders aussehen?", fr: "Si votre swing n'a guère changé du jour au lendemain, pourquoi votre score peut-il être complètement différent ?", es: "Si tu swing apenas ha cambiado de un día para otro, ¿por qué tu resultado puede ser totalmente distinto?" },
          { en: "Once your rhythm disappears, do you spend the rest of the round trying to find it again?", nl: "Ben je je ritme kwijt, en zoek je dan de rest van de ronde om het terug te vinden?", de: "Ist dein Rhythmus erst mal weg — suchst du ihn dann den Rest der Runde?", fr: "Une fois votre rythme perdu, passez-vous le reste de la partie à essayer de le retrouver ?", es: "Cuando el ritmo desaparece, ¿te pasas el resto de la vuelta intentando recuperarlo?" },
        ],
      },
    ],
  },
  {
    id: "E",
    name: { en: "Emotion & experience", nl: "Beleving", de: "Emotion & Erleben", fr: "Émotion & vécu", es: "Emoción y vivencia" },
    tagline: { en: "I want to enjoy my golf.", nl: "Ik wil genieten van mijn golf.", de: "Ich will mein Golf genießen.", fr: "Je veux prendre du plaisir à jouer.", es: "Quiero disfrutar de mi golf." },
    narratives: [
      {
        id: "E1",
        statement: { en: "I can't shake off a bad shot.", nl: "Ik kan een slechte slag niet van me afschudden.", de: "Ich werde einen schlechten Schlag nicht los.", fr: "Je n'arrive pas à me défaire d'un mauvais coup.", es: "No consigo quitarme de encima un mal golpe." },
        subs: [
          { en: "A bad shot stays in my head for holes.", nl: "Een slechte slag blijft holes lang in mijn hoofd zitten.", de: "Ein schlechter Schlag geht mir über mehrere Löcher nicht aus dem Kopf.", fr: "Un mauvais coup me reste en tête pendant plusieurs trous.", es: "Un mal golpe se me queda en la cabeza durante varios hoyos." },
          { en: "I get so annoyed with myself, and I take that straight into the next shot.", nl: "Ik word zo boos op mezelf, en dat neem ik zo mee naar de volgende slag.", de: "Ich ärgere mich so über mich selbst — und nehme das direkt mit in den nächsten Schlag.", fr: "Je m'énerve tellement contre moi-même, et je l'emmène direct dans le coup suivant.", es: "Me enfado tanto conmigo mismo que me lo llevo directo al siguiente golpe." },
          { en: "After a bad shot I want it back straight away, so I go for the hero shot.", nl: "Na een slechte slag wil ik hem meteen terug, dus ga ik voor de heldenslag.", de: "Nach einem schlechten Schlag will ich ihn sofort zurückholen — also versuche ich den Heldenschlag.", fr: "Après un mauvais coup, je veux me rattraper tout de suite, alors je tente le coup héroïque.", es: "Después de un mal golpe quiero recuperarlo enseguida, así que me lanzo a por el golpe heroico." },
          { en: "One double and my mood's gone for the next few holes.", nl: "Eén dubbele bogey en mijn humeur is de holes erna weg.", de: "Ein Doppel-Bogey und meine Laune ist für die nächsten Löcher hin.", fr: "Un double bogey et mon humeur est fichue pour les trous suivants.", es: "Un doble bogey y se me va el humor para los siguientes hoyos." },
        ],
        hooks: [
          { en: "Still replaying that missed shot when you're standing over the next one?", nl: "Speel je die mislukte slag nog af in je hoofd terwijl je al boven de volgende staat?", de: "Spielst du den verpatzten Schlag noch im Kopf ab, während du schon über dem nächsten stehst?", fr: "Vous rejouez encore ce coup raté alors que vous êtes déjà au-dessus du suivant ?", es: "¿Sigues repasando ese golpe fallado cuando ya estás sobre el siguiente?" },
          { en: "The bad shot is finished. The frustration you carry forward may not be.", nl: "De slechte slag is voorbij. De frustratie die je meeneemt misschien nog niet.", de: "Der schlechte Schlag ist vorbei. Der Frust, den du mitnimmst, vielleicht noch nicht.", fr: "Le mauvais coup est terminé. La frustration que vous emportez ne l'est peut-être pas.", es: "El mal golpe ya pasó. La frustración que arrastras, quizá no." },
          { en: "Do you ever feel you need to get the shot back immediately after making a mistake?", nl: "Heb je weleens het gevoel dat je een slag direct moet terugpakken na een fout?", de: "Hast du nach einem Fehler manchmal das Gefühl, den Schlag sofort zurückholen zu müssen?", fr: "Vous arrive-t-il de sentir qu'il faut récupérer le coup immédiatement après une erreur ?", es: "¿Alguna vez sientes que tienes que recuperar el golpe nada más cometer un error?" },
          { en: "What if one bad hole could simply remain one bad hole?", nl: "Wat als één slechte hole gewoon één slechte hole kon blijven?", de: "Was, wenn ein schlechtes Loch einfach ein schlechtes Loch bleiben könnte?", fr: "Et si un mauvais trou pouvait simplement rester un mauvais trou ?", es: "¿Y si un mal hoyo pudiera quedarse simplemente en un mal hoyo?" },
        ],
      },
      {
        id: "E2",
        statement: { en: "I can go from confident to clueless in three holes.", nl: "Ik kan in drie holes van vol vertrouwen naar radeloos gaan.", de: "In drei Löchern kann ich von selbstsicher zu völlig ratlos kippen.", fr: "En trois trous, je peux passer de sûr de moi à complètement perdu.", es: "En tres hoyos puedo pasar de ir sobrado de confianza a estar totalmente perdido." },
        subs: [
          { en: "Two bad drives and I don't trust the driver anymore.", nl: "Twee slechte drives en ik vertrouw mijn driver niet meer.", de: "Zwei schlechte Drives und ich traue meinem Driver nicht mehr.", fr: "Deux mauvais drives et je ne fais plus confiance à mon driver.", es: "Dos malos drives y ya no me fío del driver." },
          { en: "My confidence depends too much on what happened on the last few shots.", nl: "Mijn vertrouwen hangt te veel af van wat er bij de laatste paar slagen gebeurde.", de: "Mein Selbstvertrauen hängt zu sehr davon ab, was bei den letzten paar Schlägen passiert ist.", fr: "Ma confiance dépend trop de ce qui s'est passé sur les derniers coups.", es: "Mi confianza depende demasiado de lo que pasó en los últimos golpes." },
          { en: "Low on confidence, I try to guide the ball, and it only gets worse.", nl: "Met weinig vertrouwen probeer ik de bal te sturen, en dan wordt het alleen maar erger.", de: "Wenn das Vertrauen fehlt, versuche ich den Ball zu steuern — und es wird nur schlimmer.", fr: "Quand je manque de confiance, j'essaie de guider la balle, et ça ne fait qu'empirer.", es: "Con poca confianza intento guiar la bola, y solo va a peor." },
          { en: "I wait for one good shot to fix my confidence instead of resetting it myself.", nl: "Ik wacht op één goede slag om mijn vertrouwen te herstellen, in plaats van het zelf te resetten.", de: "Ich warte auf den einen guten Schlag, der mein Vertrauen zurückbringt, statt selbst neu anzusetzen.", fr: "J'attends un bon coup pour retrouver la confiance, au lieu de la remettre à zéro moi-même.", es: "Espero a que un buen golpe me devuelva la confianza, en vez de reiniciarla yo mismo." },
        ],
        hooks: [
          { en: "Two bad drives — and suddenly the driver you trusted twenty minutes ago feels completely different?", nl: "Twee slechte drives — en ineens voelt de driver die je twintig minuten geleden nog vertrouwde totaal anders?", de: "Zwei schlechte Drives — und plötzlich fühlt sich der Driver, dem du vor zwanzig Minuten noch vertraut hast, völlig anders an?", fr: "Deux mauvais drives — et soudain, le driver en qui vous aviez confiance il y a vingt minutes vous semble complètement différent ?", es: "¿Dos malos drives — y de repente el driver en el que confiabas hace veinte minutos se siente totalmente distinto?" },
          { en: "Your ability hasn't changed in three holes. So why has your confidence?", nl: "Je kunnen is in drie holes niet veranderd. Waarom je vertrouwen dan wel?", de: "Dein Können hat sich in drei Löchern nicht verändert. Warum dann dein Selbstvertrauen?", fr: "Vos capacités n'ont pas changé en trois trous. Alors pourquoi votre confiance, elle, a-t-elle changé ?", es: "Tu nivel no ha cambiado en tres hoyos. Entonces, ¿por qué ha cambiado tu confianza?" },
          { en: "Trying harder to control the ball may be exactly what makes your swing feel less free.", nl: "Juist harder proberen de bal te sturen kan je swing minder vrij laten voelen.", de: "Gerade der Versuch, den Ball stärker zu kontrollieren, kann deinen Schwung weniger frei wirken lassen.", fr: "Essayer davantage de contrôler la balle est peut-être justement ce qui rend votre swing moins libre.", es: "Intentar controlar más la bola puede ser justo lo que hace que tu swing se sienta menos libre." },
          { en: "What if you could reset your confidence before the next shot — rather than waiting for the shot to fix it?", nl: "Wat als je je vertrouwen kon resetten vóór de volgende slag — in plaats van te wachten tot een goede slag het herstelt?", de: "Was, wenn du dein Selbstvertrauen vor dem nächsten Schlag neu aufbauen könntest — statt darauf zu warten, dass ein Schlag es repariert?", fr: "Et si vous pouviez remettre votre confiance à zéro avant le coup suivant — au lieu d'attendre qu'un coup s'en charge ?", es: "¿Y si pudieras reiniciar tu confianza antes del siguiente golpe — en vez de esperar a que un golpe lo arregle?" },
        ],
      },
      {
        id: "E3",
        statement: { en: "I overthink it when I should just hit the ball.", nl: "Ik denk te veel na terwijl ik gewoon de bal moet slaan.", de: "Ich denke zu viel nach, wenn ich einfach nur den Ball schlagen sollte.", fr: "Je réfléchis trop alors que je devrais juste taper la balle.", es: "Le doy demasiadas vueltas cuando debería simplemente pegarle a la bola." },
        subs: [
          { en: "My head's full of swing tips when I should just be hitting it.", nl: "Mijn hoofd zit vol swingtips terwijl ik gewoon moet slaan.", de: "Mein Kopf ist voller Schwungtipps, wenn ich einfach nur schlagen sollte.", fr: "J'ai la tête pleine de conseils de swing alors que je devrais juste taper.", es: "Tengo la cabeza llena de consejos de swing cuando debería simplemente pegar." },
          { en: "By the time I've checked everything, a simple shot feels hard.", nl: "Tegen de tijd dat ik alles heb gecheckt, voelt een simpele slag moeilijk.", de: "Bis ich alles gecheckt habe, fühlt sich ein einfacher Schlag schwer an.", fr: "Le temps que j'aie tout vérifié, un coup simple paraît difficile.", es: "Para cuando lo he revisado todo, un golpe sencillo parece difícil." },
          { en: "I start trying to fix my swing during the round instead of simply playing golf.", nl: "Ik ga tijdens de ronde aan mijn swing sleutelen in plaats van gewoon te golfen.", de: "Während der Runde fange ich an, an meinem Schwung herumzubasteln, statt einfach Golf zu spielen.", fr: "Je me mets à bricoler mon swing en pleine partie au lieu de simplement jouer au golf.", es: "Me pongo a arreglar el swing en plena vuelta en vez de simplemente jugar al golf." },
          { en: "I try to control every bit of the swing, and it only works when I don't.", nl: "Ik probeer elk stukje van mijn swing te sturen, en het werkt alleen als ik dat niet doe.", de: "Ich will jedes Detail im Schwung kontrollieren — und es klappt nur, wenn ich's nicht tue.", fr: "J'essaie de contrôler chaque partie de mon swing, et ça ne marche que quand je ne le fais pas.", es: "Intento controlar cada parte del swing, y solo funciona cuando no lo hago." },
        ],
        hooks: [
          { en: "Ever stood over the ball with three swing thoughts competing for your attention?", nl: "Ooit boven de bal gestaan met drie swinggedachten die om je aandacht vechten?", de: "Schon mal über dem Ball gestanden, während drei Schwunggedanken um deine Aufmerksamkeit kämpfen?", fr: "Vous êtes-vous déjà retrouvé au-dessus de la balle avec trois pensées de swing qui se disputaient votre attention ?", es: "¿Alguna vez te has puesto sobre la bola con tres pensamientos de swing peleándose por tu atención?" },
          { en: "A complicated shot may sometimes begin as a simple shot with too many thoughts added to it.", nl: "Een ingewikkelde slag begint soms als een simpele slag waar te veel gedachten bij zijn gekomen.", de: "Ein komplizierter Schlag beginnt manchmal als einfacher Schlag, zu dem zu viele Gedanken dazugekommen sind.", fr: "Un coup compliqué n'est parfois au départ qu'un coup simple auquel on a ajouté trop de pensées.", es: "Un golpe complicado a veces empieza siendo un golpe sencillo al que se le han sumado demasiados pensamientos." },
          { en: "Do you ever turn the golf course into a driving range halfway through the round?", nl: "Maak je van de baan weleens halverwege de ronde een driving range?", de: "Machst du den Platz manchmal mitten in der Runde zur Driving Range?", fr: "Vous arrive-t-il de transformer le parcours en practice au beau milieu de la partie ?", es: "¿Conviertes a veces el campo en un campo de prácticas a mitad de vuelta?" },
          { en: "If you already know the swing you want to make, why are you trying to consciously manage every part of it?", nl: "Als je al weet welke swing je wilt maken, waarom probeer je dan elk onderdeel ervan bewust te sturen?", de: "Wenn du schon weißt, welchen Schwung du machen willst — warum versuchst du dann, jeden Teil davon bewusst zu steuern?", fr: "Si vous savez déjà quel swing vous voulez faire, pourquoi essayer d'en gérer consciemment chaque partie ?", es: "Si ya sabes qué swing quieres hacer, ¿por qué intentas controlar conscientemente cada parte?" },
        ],
      },
      {
        id: "E4",
        statement: { en: "I love golf, but it gets to me more than it should.", nl: "Ik hou van golf, maar het raakt me meer dan zou moeten.", de: "Ich liebe Golf, aber es geht mir mehr an die Nieren, als es sollte.", fr: "J'adore le golf, mais ça m'atteint plus que ça ne devrait.", es: "Me encanta el golf, pero me afecta más de lo que debería." },
        subs: [
          { en: "If I score badly the whole day's ruined, however nice the round was.", nl: "Als ik slecht scoor, is de hele dag verpest, hoe mooi de ronde ook was.", de: "Wenn ich schlecht score, ist der ganze Tag verdorben — egal, wie schön die Runde war.", fr: "Si je score mal, toute la journée est gâchée, aussi belle qu'ait été la partie.", es: "Si hago un mal resultado, se me arruina el día entero, por bonita que haya sido la vuelta." },
          { en: "When it's not going well, I can't enjoy anything else out there.", nl: "Als het niet loopt, kan ik nergens anders meer van genieten.", de: "Wenn es nicht läuft, kann ich da draußen nichts anderes mehr genießen.", fr: "Quand ça ne va pas, je n'arrive plus à profiter de rien d'autre sur le parcours.", es: "Cuando no sale, ya no disfruto de nada más ahí fuera." },
          { en: "I played alright, but I still went home disappointed.", nl: "Ik speelde best oké, maar ging toch teleurgesteld naar huis.", de: "Ich habe ganz ordentlich gespielt und bin trotzdem enttäuscht nach Hause gefahren.", fr: "J'ai plutôt bien joué, et je suis quand même rentré déçu.", es: "Jugué bastante bien y aun así me fui a casa decepcionado." },
          { en: "After eighteen holes my head is more tired than my legs.", nl: "Na achttien holes is mijn hoofd vermoeider dan mijn benen.", de: "Nach achtzehn Löchern ist mein Kopf müder als meine Beine.", fr: "Après dix-huit trous, ma tête est plus fatiguée que mes jambes.", es: "Después de dieciocho hoyos, tengo la cabeza más cansada que las piernas." },
        ],
        hooks: [
          { en: "What if you could care deeply about your score without letting it decide whether you enjoyed your golf?", nl: "Wat als je veel om je score kon geven zonder dat die bepaalt of je van je golf hebt genoten?", de: "Was, wenn dir dein Score sehr wichtig sein könnte — ohne dass er entscheidet, ob du dein Golf genossen hast?", fr: "Et si votre score pouvait vous tenir à cœur sans décider pour autant si vous avez pris du plaisir à jouer ?", es: "¿Y si pudieras preocuparte mucho por tu resultado sin que este decida si has disfrutado de tu golf?" },
          { en: "When the scoring goes badly, does it become hard to notice anything else that's good about the round?", nl: "Als het scoren tegenzit, zie je dan nog wel wat er verder goed is aan je ronde?", de: "Wenn es mit dem Score nicht läuft — fällt es dir dann schwer, noch zu sehen, was an der Runde sonst gut ist?", fr: "Quand le score ne suit pas, devient-il difficile de voir ce qu'il y a de bon par ailleurs dans votre partie ?", es: "Cuando el resultado no acompaña, ¿te cuesta ver todo lo demás que tiene de bueno la vuelta?" },
          { en: "Ever played reasonably well and still gone home disappointed?", nl: "Ooit redelijk goed gespeeld en toch teleurgesteld naar huis gegaan?", de: "Schon mal ordentlich gespielt und trotzdem enttäuscht nach Hause gefahren?", fr: "Avez-vous déjà plutôt bien joué, et êtes-vous quand même rentré déçu ?", es: "¿Alguna vez has jugado razonablemente bien y aun así te has ido a casa decepcionado?" },
          { en: "Do you sometimes finish 18 holes more mentally exhausted than physically tired?", nl: "Ben je na 18 holes soms meer mentaal uitgeput dan lichamelijk moe?", de: "Bist du nach 18 Löchern manchmal eher mental erschöpft als körperlich müde?", fr: "Terminez-vous parfois 18 trous plus épuisé mentalement que fatigué physiquement ?", es: "¿Terminas a veces los 18 hoyos más agotado mentalmente que cansado físicamente?" },
        ],
      },
    ],
  },
  {
    id: "D",
    name: { en: "Development", nl: "Ontwikkeling", de: "Entwicklung", fr: "Progression", es: "Desarrollo" },
    tagline: { en: "I want to keep getting better and still enjoy the game.", nl: "Ik wil beter blijven worden én blijven genieten van het spel.", de: "Ich will immer besser werden und trotzdem Spaß am Spiel haben.", fr: "Je veux continuer à progresser tout en gardant le plaisir du jeu.", es: "Quiero seguir mejorando y seguir disfrutando del juego." },
    narratives: [
      {
        id: "D1",
        statement: { en: "I know what to do. I just don't do it every time.", nl: "Ik weet wat ik moet doen. Ik doe het alleen niet elke keer.", de: "Ich weiß, was ich tun muss. Ich tue es nur nicht jedes Mal.", fr: "Je sais ce qu'il faut faire. Je ne le fais juste pas à chaque fois.", es: "Sé lo que tengo que hacer. Solo que no lo hago siempre." },
        subs: [
          { en: "My routine's there when I don't need it and gone when I do.", nl: "Mijn routine is er als ik hem niet nodig heb, en weg als ik hem wel nodig heb.", de: "Meine Routine ist da, wenn ich sie nicht brauche — und weg, wenn ich sie brauche.", fr: "Ma routine est là quand je n'en ai pas besoin, et disparaît quand j'en ai besoin.", es: "Mi rutina está cuando no la necesito y desaparece cuando la necesito." },
          { en: "I know I should commit, but I still stand there with doubts.", nl: "Ik weet dat ik vol voor mijn keuze moet gaan, maar ik sta er toch met twijfels.", de: "Ich weiß, dass ich voll hinter meiner Entscheidung stehen sollte, aber ich stehe trotzdem mit Zweifeln da.", fr: "Je sais que je devrais m'engager à fond, mais je reste planté là avec mes doutes.", es: "Sé que debería ir a por todas con mi decisión, pero sigo ahí plantado con dudas." },
          { en: "I know how I want to react after a bad shot, but the old me takes over.", nl: "Ik weet hoe ik wil reageren na een slechte slag, maar de oude ik neemt het over.", de: "Ich weiß, wie ich nach einem schlechten Schlag reagieren will, aber dann übernimmt mein altes Ich.", fr: "Je sais comment je veux réagir après un mauvais coup, mais mes vieux réflexes reprennent le dessus.", es: "Sé cómo quiero reaccionar después de un mal golpe, pero el yo de siempre toma el control." },
          { en: "I know it's one shot at a time, but I keep adding up the score in my head.", nl: "Ik weet dat het slag voor slag gaat, maar ik blijf mijn score in mijn hoofd optellen.", de: "Ich weiß, es geht Schlag für Schlag, aber ich rechne im Kopf ständig meinen Score zusammen.", fr: "Je sais qu'il faut jouer coup après coup, mais je n'arrête pas d'additionner mon score dans ma tête.", es: "Sé que es golpe a golpe, pero no paro de sumar el resultado en la cabeza." },
        ],
        hooks: [
          { en: "If your routine is meant to give you something reliable, why does it become harder to use when pressure rises?", nl: "Als je routine je houvast moet geven, waarom wordt hij dan lastiger om te gebruiken als de druk stijgt?", de: "Wenn deine Routine dir Halt geben soll — warum wird sie dann schwerer anzuwenden, wenn der Druck steigt?", fr: "Si votre routine est censée vous donner un repère fiable, pourquoi devient-elle plus difficile à appliquer quand la pression monte ?", es: "Si tu rutina debe darte algo fiable, ¿por qué cuesta más usarla cuando sube la presión?" },
          { en: "Knowing you should commit is one thing. Can you actually do it shot after shot?", nl: "Weten dat je vol voor je keuze moet gaan is één ding. Doe je het ook, slag na slag?", de: "Zu wissen, dass du voll hinter deiner Entscheidung stehen solltest, ist das eine. Schaffst du es auch, Schlag für Schlag?", fr: "Savoir que vous devriez vous engager pleinement, c'est une chose. Y arrivez-vous vraiment, coup après coup ?", es: "Saber que deberías comprometerte es una cosa. ¿Lo consigues de verdad, golpe tras golpe?" },
          { en: "What if the response you know is useful gradually became your natural response?", nl: "Wat als de reactie waarvan je weet dat die helpt, langzaam je natuurlijke reactie werd?", de: "Was, wenn die Reaktion, von der du weißt, dass sie hilft, nach und nach zu deiner natürlichen Reaktion würde?", fr: "Et si la réaction dont vous savez qu'elle aide devenait peu à peu votre réaction naturelle ?", es: "¿Y si la reacción que sabes que te ayuda se fuera convirtiendo poco a poco en tu reacción natural?" },
          { en: "You know you should focus on the shot in front of you — but does the score keep pulling your attention somewhere else?", nl: "Je weet dat je bij de slag van nu moet blijven — maar trekt de score je aandacht steeds weg?", de: "Du weißt, dass du beim Schlag vor dir bleiben solltest — aber zieht der Score deine Aufmerksamkeit immer wieder woandershin?", fr: "Vous savez que vous devriez rester sur le coup à jouer — mais le score continue-t-il d'attirer votre attention ailleurs ?", es: "Sabes que deberías centrarte en el golpe que tienes delante — pero ¿el resultado te sigue llevando la atención a otra parte?" },
        ],
      },
      {
        id: "D2",
        statement: { en: "I know I should practise more. It just doesn't happen.", nl: "Ik weet dat ik meer moet oefenen. Het komt er alleen niet van.", de: "Ich weiß, ich sollte mehr üben. Es kommt nur nie dazu.", fr: "Je sais que je devrais m'entraîner plus. Mais ça ne se fait pas.", es: "Sé que debería practicar más. Pero nunca encuentro el momento." },
        subs: [
          { en: "I barely have time to hit balls, let alone work on the mental side.", nl: "Ik heb amper tijd om ballen te slaan, laat staan om aan de mentale kant te werken.", de: "Ich habe kaum Zeit, Bälle zu schlagen, geschweige denn, an der mentalen Seite zu arbeiten.", fr: "J'ai à peine le temps de taper des balles, alors travailler le mental…", es: "Apenas tengo tiempo para pegar bolas, como para encima trabajar lo mental." },
          { en: "Starting a routine is easy. Keeping it going is the hard part.", nl: "Beginnen met een routine is makkelijk. Volhouden is het moeilijke deel.", de: "Mit einer Routine anzufangen ist leicht. Dranbleiben ist der schwere Teil.", fr: "Commencer une routine, c'est facile. La tenir, c'est ça le plus dur.", es: "Empezar una rutina es fácil. Mantenerla es lo difícil." },
          { en: "Hitting balls feels like practice. Mental stuff feels a bit vague.", nl: "Ballen slaan voelt als oefenen. Mentaal werk voelt een beetje vaag.", de: "Bälle schlagen fühlt sich nach Training an. Das Mentale fühlt sich irgendwie vage an.", fr: "Taper des balles, ça fait entraînement. Le mental, ça reste un peu flou.", es: "Pegar bolas parece entrenar. Lo mental parece algo difuso." },
          { en: "I know the mental game matters, but I've no idea what to actually practise.", nl: "Ik weet dat het mentale spel ertoe doet, maar ik heb geen idee wat ik nou moet oefenen.", de: "Ich weiß, dass das mentale Spiel zählt, aber ich habe keine Ahnung, was ich da eigentlich üben soll.", fr: "Je sais que le mental compte, mais je n'ai aucune idée de ce qu'il faut vraiment travailler.", es: "Sé que el juego mental importa, pero no tengo ni idea de qué practicar en realidad." },
        ],
        hooks: [
          { en: "What if mental practice didn't require adding another hour to your practice schedule?", nl: "Wat als mentaal trainen geen extra uur in je trainingsschema hoefde te kosten?", de: "Was, wenn mentales Training keine zusätzliche Stunde in deinem Trainingsplan bräuchte?", fr: "Et si l'entraînement mental ne demandait pas d'ajouter une heure de plus à votre programme ?", es: "¿Y si el entrenamiento mental no te obligara a añadir otra hora a tu plan de práctica?" },
          { en: "Ever started a new practice routine with good intentions — and quietly stopped two weeks later?", nl: "Ooit met goede voornemens een nieuwe trainingsroutine begonnen — en er twee weken later stilletjes mee gestopt?", de: "Schon mal mit guten Vorsätzen eine neue Trainingsroutine begonnen — und zwei Wochen später still und leise aufgehört?", fr: "Avez-vous déjà commencé une nouvelle routine d'entraînement pleine de bonnes intentions — pour l'abandonner discrètement deux semaines plus tard ?", es: "¿Alguna vez empezaste una nueva rutina de práctica con buenas intenciones — y la dejaste sin hacer ruido dos semanas después?" },
          { en: "Maybe mental practice feels less motivating because progress is harder to see shot by shot.", nl: "Misschien motiveert mentaal trainen minder omdat je de vooruitgang niet slag voor slag ziet.", de: "Vielleicht motiviert mentales Training weniger, weil sich der Fortschritt Schlag für Schlag schwerer erkennen lässt.", fr: "L'entraînement mental motive peut-être moins parce que les progrès sont plus difficiles à voir coup par coup.", es: "Quizá el entrenamiento mental motiva menos porque el progreso cuesta más verlo golpe a golpe." },
          { en: "The problem may not be motivation. It may be that “work on your mental game” is simply too vague an instruction.", nl: "Misschien ligt het niet aan je motivatie. Misschien is „werk aan je mentale spel” gewoon een te vage opdracht.", de: "Vielleicht liegt es nicht an der Motivation. Vielleicht ist „Arbeite an deinem mentalen Spiel“ einfach eine zu vage Anweisung.", fr: "Le problème n'est peut-être pas la motivation. Peut-être que « travaillez votre jeu mental » est tout simplement une consigne trop vague.", es: "Quizá el problema no sea la motivación. Quizá “trabaja tu juego mental” sea simplemente una instrucción demasiado vaga." },
        ],
      },
      {
        id: "D3",
        statement: { en: "It works on the range. It disappears on the course.", nl: "Op de range werkt het. In de baan is het weg.", de: "Auf der Range klappt's. Auf dem Platz ist es weg.", fr: "Au practice, ça marche. Sur le parcours, ça disparaît.", es: "En el range funciona. En el campo desaparece." },
        subs: [
          { en: "My routine works in practice and disappears on the course.", nl: "Mijn routine werkt op de range en verdwijnt in de baan.", de: "Meine Routine funktioniert im Training und verschwindet auf dem Platz.", fr: "Ma routine marche à l'entraînement et disparaît sur le parcours.", es: "Mi rutina funciona entrenando y desaparece en el campo." },
          { en: "On the range I get another ball. On the course I don't.", nl: "Op de range krijg ik nog een bal. In de baan niet.", de: "Auf der Range habe ich noch einen Ball. Auf dem Platz nicht.", fr: "Au practice, j'ai droit à une autre balle. Sur le parcours, non.", es: "En el range tengo otra bola. En el campo, no." },
          { en: "I practise my swing, hardly my decisions or how I handle pressure.", nl: "Ik oefen mijn swing, maar nauwelijks mijn keuzes of hoe ik met druk omga.", de: "Ich übe meinen Schwung, aber kaum meine Entscheidungen oder wie ich mit Druck umgehe.", fr: "Je travaille mon swing, à peine mes décisions ou ma gestion de la pression.", es: "Practico el swing, pero apenas mis decisiones o cómo manejo la presión." },
          { en: "When the round goes wrong, everything I've practised goes out the window.", nl: "Als de ronde misgaat, is alles wat ik heb geoefend ineens weg.", de: "Wenn die Runde schiefläuft, ist alles, was ich geübt habe, auf einmal weg.", fr: "Quand la partie tourne mal, tout ce que j'ai travaillé passe à la trappe.", es: "Cuando la vuelta se tuerce, todo lo que he practicado se va por la ventana." },
        ],
        hooks: [
          { en: "If a routine works in practice but disappears when you play, is it really ready for the course?", nl: "Als een routine werkt op de range maar verdwijnt in de baan, is hij dan echt klaar voor de baan?", de: "Wenn eine Routine im Training funktioniert, aber beim Spielen verschwindet — ist sie dann wirklich bereit für den Platz?", fr: "Si une routine fonctionne à l'entraînement mais disparaît quand vous jouez, est-elle vraiment prête pour le parcours ?", es: "Si una rutina funciona entrenando pero desaparece cuando juegas, ¿está de verdad lista para el campo?" },
          { en: "Better practice may not mean more repetition. It may mean making practice more like playing.", nl: "Beter oefenen betekent misschien niet meer herhalen. Misschien betekent het: oefenen meer laten lijken op spelen.", de: "Besser üben heißt vielleicht nicht mehr wiederholen. Vielleicht heißt es, das Training dem Spielen ähnlicher zu machen.", fr: "Mieux s'entraîner ne veut peut-être pas dire répéter davantage. Mais rapprocher l'entraînement du jeu.", es: "Practicar mejor quizá no signifique repetir más. Quizá signifique que la práctica se parezca más a jugar." },
          { en: "Golf practice often trains the swing. Playing golf asks for much more than a swing.", nl: "Golftraining traint vaak de swing. Golf spelen vraagt veel meer dan een swing.", de: "Golftraining trainiert oft den Schwung. Golfspielen verlangt viel mehr als einen Schwung.", fr: "L'entraînement au golf travaille souvent le swing. Jouer au golf demande bien plus qu'un swing.", es: "El entrenamiento de golf suele entrenar el swing. Jugar al golf pide mucho más que un swing." },
          { en: "When a round stops going to plan, do all those things you practised suddenly disappear?", nl: "Als een ronde niet loopt zoals gepland, verdwijnt dan ineens alles wat je hebt geoefend?", de: "Wenn eine Runde nicht nach Plan läuft — ist dann alles, was du geübt hast, plötzlich weg?", fr: "Quand une partie ne se déroule plus comme prévu, tout ce que vous avez travaillé disparaît-il soudain ?", es: "Cuando una vuelta deja de salir según lo previsto, ¿desaparece de golpe todo lo que has practicado?" },
        ],
      },
      {
        id: "D4",
        statement: { en: "I want to improve, but I still want golf to be fun.", nl: "Ik wil beter worden, maar golf moet wel leuk blijven.", de: "Ich will besser werden, aber Golf soll trotzdem Spaß machen.", fr: "Je veux progresser, mais le golf doit rester un plaisir.", es: "Quiero mejorar, pero que el golf siga siendo divertido." },
        subs: [
          { en: "I want to get better, but not if every round turns into an exam.", nl: "Ik wil beter worden, maar niet als elke ronde een examen wordt.", de: "Ich will besser werden, aber nicht, wenn jede Runde zur Prüfung wird.", fr: "Je veux progresser, mais pas si chaque partie devient un examen.", es: "Quiero mejorar, pero no si cada vuelta se convierte en un examen." },
          { en: "I want to practise smarter, not just longer.", nl: "Ik wil slimmer oefenen, niet alleen langer.", de: "Ich will klüger üben, nicht nur länger.", fr: "Je veux m'entraîner plus intelligemment, pas juste plus longtemps.", es: "Quiero practicar con más cabeza, no solo más horas." },
          { en: "I want to be ambitious without beating myself up over every mistake.", nl: "Ik wil ambitieus zijn zonder mezelf bij elke fout af te kraken.", de: "Ich will ehrgeizig sein, ohne mich bei jedem Fehler fertigzumachen.", fr: "Je veux être ambitieux sans m'en vouloir à chaque erreur.", es: "Quiero ser ambicioso sin machacarme por cada error." },
          { en: "One bad round and I feel like all the work's been for nothing.", nl: "Eén slechte ronde en ik heb het gevoel dat al het werk voor niets was.", de: "Eine schlechte Runde und ich habe das Gefühl, die ganze Arbeit war umsonst.", fr: "Une mauvaise partie et j'ai l'impression que tout le travail n'a servi à rien.", es: "Una mala vuelta y siento que todo el trabajo no ha servido para nada." },
        ],
        hooks: [
          { en: "Has trying to improve ever made every round feel like a test?", nl: "Heeft beter willen worden er weleens voor gezorgd dat elke ronde als een examen voelt?", de: "Hat der Wunsch, besser zu werden, schon mal jede Runde wie eine Prüfung wirken lassen?", fr: "Vouloir progresser vous a-t-il déjà donné l'impression que chaque partie était un examen ?", es: "¿Alguna vez las ganas de mejorar han hecho que cada vuelta parezca un examen?" },
          { en: "What if you could make more progress from the practice time you already have?", nl: "Wat als je meer vooruitgang kon halen uit de oefentijd die je al hebt?", de: "Was, wenn du aus der Trainingszeit, die du schon hast, mehr Fortschritt holen könntest?", fr: "Et si vous pouviez progresser davantage avec le temps d'entraînement que vous avez déjà ?", es: "¿Y si pudieras sacar más progreso del tiempo de práctica que ya tienes?" },
          { en: "You want high standards because you care about improving. So when do those standards start getting in the way?", nl: "Je legt de lat hoog omdat je beter wilt worden. Wanneer gaat die lat je dan in de weg zitten?", de: "Du legst die Latte hoch, weil dir das Besserwerden wichtig ist. Wann fängt diese Latte an, dir im Weg zu stehen?", fr: "Vous placez la barre haut parce que progresser compte pour vous. Alors quand cette exigence commence-t-elle à vous gêner ?", es: "Te pones el listón alto porque te importa mejorar. Entonces, ¿cuándo empieza ese listón a estorbarte?" },
          { en: "Improvement isn't linear. So why can one bad round still feel like you're going backwards?", nl: "Vooruitgang gaat niet in een rechte lijn. Waarom kan één slechte ronde dan toch voelen als achteruitgang?", de: "Fortschritt verläuft nicht linear. Warum kann sich eine schlechte Runde dann trotzdem wie ein Rückschritt anfühlen?", fr: "La progression n'est pas linéaire. Alors pourquoi une seule mauvaise partie peut-elle donner l'impression de reculer ?", es: "La mejora no es lineal. Entonces, ¿por qué una mala vuelta puede seguir pareciendo un paso atrás?" },
        ],
      },
    ],
  },
];

export const DEFAULT_ROUTE = "P1.1";

/** Pick the text for a language (all 5 languages are present on every text). */
export function pick(t: Text, lang: Lang): string {
  return t[lang];
}

/**
 * Resolve a ?route= value to its hook. Accepts a sub-narrative ("P4.2") or an
 * entry narrative ("P4" → its first hook). Case-insensitive; returns null for
 * anything unknown so the caller can fall back to the default hero.
 */
export function resolveRoute(raw: string | null | undefined): { route: string; hook: Text } | null {
  if (!raw) return null;
  const m = /^([PED][1-4])(?:\.([1-4]))?$/.exec(raw.trim().toUpperCase());
  if (!m) return null;
  for (const group of NARRATIVE_GROUPS) {
    const narrative = group.narratives.find(n => n.id === m[1]);
    if (narrative) {
      const sub = m[2] ? Number(m[2]) : 1;
      return { route: `${m[1]}.${sub}`, hook: narrative.hooks[sub - 1] };
    }
  }
  return null;
}
