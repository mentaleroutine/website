// ─────────────────────────────────────────────────────────────────
// Entry Narrative Framework v1.5 (Berend & Henk, 23-9-2026) — frozen baseline.
// 3 groups → 12 entry narratives → 48 sub-narratives, each with one primary hook.
// Group lines, entry narratives and sub-narratives use Henk's golfer-voice choices
// (review "Golfer-voice alternatives", Oct 2026); the hooks are v1.5 as frozen.
// Dutch = translation in the same spoken register. DE/FR/ES fall back to English.
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

type Text = { en: string; nl: string };

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
    name: { en: "Performance", nl: "Prestatie" },
    tagline: { en: "I want to shoot lower.", nl: "Ik wil lager scoren." },
    narratives: [
      {
        id: "P1",
        statement: { en: "I'm a better golfer than my scores show.", nl: "Ik ben een betere golfer dan mijn scores laten zien." },
        subs: [
          { en: "I hit it pretty well all day and still signed for a number that didn't match.", nl: "Ik sloeg de hele dag prima en tekende toch voor een score die daar niet bij paste." },
          { en: "I'll make a great par on the toughest hole and then three-putt the easy one after it.", nl: "Ik maak een mooie par op de moeilijkste hole en drieput dan de makkelijke erna." },
          { en: "One or two silly holes and a good round's gone.", nl: "Eén of twee domme holes en een goede ronde is weg." },
          { en: "Walking off 18 I'm often thinking I left five shots out there.", nl: "Als ik van de 18e loop, denk ik vaak dat ik er vijf slagen heb laten liggen." },
        ],
        hooks: [
          { en: "You hit plenty of good shots. So why does the scorecard still tell a different story?", nl: "Je slaat genoeg goede slagen. Waarom vertelt je scorekaart dan toch een ander verhaal?" },
          { en: "Ever handled the hard holes well, only to give shots away where you least expected to?", nl: "Speel je de moeilijke holes goed, en geef je slagen weg waar je het het minst verwacht?" },
          { en: "A handful of avoidable holes can hide an entire round of good golf on the scorecard.", nl: "Een handvol vermijdbare holes kan een hele ronde goed golf op je scorekaart verbergen." },
          { en: "Where do the shots you feel you shouldn't have lost actually come from?", nl: "Waar komen de slagen vandaan waarvan je voelt dat je ze niet had hoeven verliezen?" },
        ],
      },
      {
        id: "P2",
        statement: { en: "It's not my swing that costs me shots.", nl: "Het is niet mijn swing die me slagen kost." },
        subs: [
          { en: "Sometimes I'm over the ball, still not sure about the club, and I hit it anyway.", nl: "Soms sta ik boven de bal, nog niet zeker van mijn club, en sla ik toch." },
          { en: "I lose more shots with my head than with my swing. Wrong club, wrong target.", nl: "Ik verlies meer slagen met mijn hoofd dan met mijn swing. Verkeerde club, verkeerd doel." },
          { en: "It's the tap-ins and simple chips I mess up, because I'm not really paying attention.", nl: "Juist de korte putts en simpele chips verpest ik, omdat ik er niet echt bij ben." },
          { en: "After a bad shot I tend to do something daft on the next one.", nl: "Na een slechte slag doe ik vaak iets doms bij de volgende." },
        ],
        hooks: [
          { en: "Ever stood over a shot knowing you weren't fully committed — and hit it anyway?", nl: "Ooit boven een bal gestaan terwijl je wist dat je er niet helemaal voor ging — en toch geslagen?" },
          { en: "Ever walked off a hole knowing the swing wasn't really the problem — the decision was?", nl: "Ooit van een hole gelopen met het gevoel dat niet je swing het probleem was, maar je keuze?" },
          { en: "Do you ever lose focus on the very shots that look too simple to go wrong?", nl: "Verlies je weleens je focus juist bij de slagen die te simpel lijken om mis te gaan?" },
          { en: "The shot after the mistake can cost more than the mistake itself.", nl: "De slag na de fout kan meer kosten dan de fout zelf." },
        ],
      },
      {
        id: "P3",
        statement: { en: "I play fine until the score starts to matter.", nl: "Ik speel prima, tot de score ertoe gaat doen." },
        subs: [
          { en: "When it counts, I rush. My routine just goes out the window.", nl: "Als het telt, ga ik haasten. Mijn routine verdwijnt gewoon." },
          { en: "Under pressure I stop playing to score and start playing not to mess up.", nl: "Onder druk speel ik niet meer om te scoren, maar om geen fouten te maken." },
          { en: "Once I start counting my score, I stop thinking about the shot.", nl: "Zodra ik mijn score ga tellen, denk ik niet meer aan de slag." },
          { en: "I know I can hit this shot. It just feels completely different when the score matters.", nl: "Ik weet dat ik deze slag kan slaan. Hij voelt alleen totaal anders als de score telt." },
        ],
        hooks: [
          { en: "Why can the same swing feel completely different when the shot really matters?", nl: "Waarom kan dezelfde swing totaal anders voelen als de slag er echt toe doet?" },
          { en: "Pressure may not make you play badly. It may make you play differently.", nl: "Druk laat je misschien niet slechter spelen. Wel anders." },
          { en: "The more you want the result, the harder it can become to stay with the shot in front of you.", nl: "Hoe meer je het resultaat wilt, hoe lastiger het kan worden om bij de slag van nu te blijven." },
          { en: "What if an important shot could feel much more like the same shot in a casual round?", nl: "Wat als een belangrijke slag veel meer kon voelen als diezelfde slag in een ontspannen ronde?" },
        ],
      },
      {
        id: "P4",
        statement: { en: "I can't reproduce my best golf consistently.", nl: "Mijn beste golf kan ik niet consequent herhalen." },
        subs: [
          { en: "I'll have six great holes and then it's gone, and I can't get it back.", nl: "Ik speel zes geweldige holes en dan is het weg, en ik krijg het niet meer terug." },
          { en: "I stripe it on the range and then can't find it on the first tee.", nl: "Op de range raak ik hem perfect, en op de eerste tee is het weg." },
          { en: "One week I shoot my best, the next I'm ten shots worse, and the swing feels the same.", nl: "De ene week speel ik mijn beste ronde, de week erna tien slagen slechter, en mijn swing voelt hetzelfde." },
          { en: "Once I lose my rhythm, I spend the rest of the round chasing it.", nl: "Ben ik mijn ritme kwijt, dan jaag ik er de rest van de ronde achteraan." },
        ],
        hooks: [
          { en: "Why is great golf sometimes easier to find than it is to keep?", nl: "Waarom is goed golf soms makkelijker te vinden dan vast te houden?" },
          { en: "You can hit the shot in practice. So why can't you always access it when the score counts?", nl: "Op de range sla je die slag gewoon. Waarom lukt het dan niet altijd als de score telt?" },
          { en: "If your swing hasn't changed much overnight, why can your score still look completely different?", nl: "Als je swing van de ene op de andere dag nauwelijks verandert, waarom kan je score dan totaal anders zijn?" },
          { en: "Once your rhythm disappears, do you spend the rest of the round trying to find it again?", nl: "Ben je je ritme kwijt, en zoek je dan de rest van de ronde om het terug te vinden?" },
        ],
      },
    ],
  },
  {
    id: "E",
    name: { en: "Emotion & experience", nl: "Beleving" },
    tagline: { en: "I want to enjoy my golf.", nl: "Ik wil genieten van mijn golf." },
    narratives: [
      {
        id: "E1",
        statement: { en: "I can't shake off a bad shot.", nl: "Ik kan een slechte slag niet van me afschudden." },
        subs: [
          { en: "A bad shot stays in my head for holes.", nl: "Een slechte slag blijft holes lang in mijn hoofd zitten." },
          { en: "I get so annoyed with myself, and I take that straight into the next shot.", nl: "Ik word zo boos op mezelf, en dat neem ik zo mee naar de volgende slag." },
          { en: "After a bad shot I want it back straight away, so I go for the hero shot.", nl: "Na een slechte slag wil ik hem meteen terug, dus ga ik voor de heldenslag." },
          { en: "One double and my mood's gone for the next few holes.", nl: "Eén dubbele bogey en mijn humeur is de holes erna weg." },
        ],
        hooks: [
          { en: "Still replaying that missed shot when you're standing over the next one?", nl: "Speel je die mislukte slag nog af in je hoofd terwijl je al boven de volgende staat?" },
          { en: "The bad shot is finished. The frustration you carry forward may not be.", nl: "De slechte slag is voorbij. De frustratie die je meeneemt misschien nog niet." },
          { en: "Do you ever feel you need to get the shot back immediately after making a mistake?", nl: "Heb je weleens het gevoel dat je een slag direct moet terugpakken na een fout?" },
          { en: "What if one bad hole could simply remain one bad hole?", nl: "Wat als één slechte hole gewoon één slechte hole kon blijven?" },
        ],
      },
      {
        id: "E2",
        statement: { en: "I can go from confident to clueless in three holes.", nl: "Ik kan in drie holes van vol vertrouwen naar radeloos gaan." },
        subs: [
          { en: "Two bad drives and I don't trust the driver anymore.", nl: "Twee slechte drives en ik vertrouw mijn driver niet meer." },
          { en: "My confidence depends too much on what happened on the last few shots.", nl: "Mijn vertrouwen hangt te veel af van wat er bij de laatste paar slagen gebeurde." },
          { en: "Low on confidence, I try to guide the ball, and it only gets worse.", nl: "Met weinig vertrouwen probeer ik de bal te sturen, en dan wordt het alleen maar erger." },
          { en: "I wait for one good shot to fix my confidence instead of resetting it myself.", nl: "Ik wacht op één goede slag om mijn vertrouwen te herstellen, in plaats van het zelf te resetten." },
        ],
        hooks: [
          { en: "Two bad drives — and suddenly the driver you trusted twenty minutes ago feels completely different?", nl: "Twee slechte drives — en ineens voelt de driver die je twintig minuten geleden nog vertrouwde totaal anders?" },
          { en: "Your ability hasn't changed in three holes. So why has your confidence?", nl: "Je kunnen is in drie holes niet veranderd. Waarom je vertrouwen dan wel?" },
          { en: "Trying harder to control the ball may be exactly what makes your swing feel less free.", nl: "Juist harder proberen de bal te sturen kan je swing minder vrij laten voelen." },
          { en: "What if you could reset your confidence before the next shot — rather than waiting for the shot to fix it?", nl: "Wat als je je vertrouwen kon resetten vóór de volgende slag — in plaats van te wachten tot een goede slag het herstelt?" },
        ],
      },
      {
        id: "E3",
        statement: { en: "I overthink it when I should just hit the ball.", nl: "Ik denk te veel na terwijl ik gewoon de bal moet slaan." },
        subs: [
          { en: "My head's full of swing tips when I should just be hitting it.", nl: "Mijn hoofd zit vol swingtips terwijl ik gewoon moet slaan." },
          { en: "By the time I've checked everything, a simple shot feels hard.", nl: "Tegen de tijd dat ik alles heb gecheckt, voelt een simpele slag moeilijk." },
          { en: "I start trying to fix my swing during the round instead of simply playing golf.", nl: "Ik ga tijdens de ronde aan mijn swing sleutelen in plaats van gewoon te golfen." },
          { en: "I try to control every bit of the swing, and it only works when I don't.", nl: "Ik probeer elk stukje van mijn swing te sturen, en het werkt alleen als ik dat niet doe." },
        ],
        hooks: [
          { en: "Ever stood over the ball with three swing thoughts competing for your attention?", nl: "Ooit boven de bal gestaan met drie swinggedachten die om je aandacht vechten?" },
          { en: "A complicated shot may sometimes begin as a simple shot with too many thoughts added to it.", nl: "Een ingewikkelde slag begint soms als een simpele slag waar te veel gedachten bij zijn gekomen." },
          { en: "Do you ever turn the golf course into a driving range halfway through the round?", nl: "Maak je van de baan weleens halverwege de ronde een driving range?" },
          { en: "If you already know the swing you want to make, why are you trying to consciously manage every part of it?", nl: "Als je al weet welke swing je wilt maken, waarom probeer je dan elk onderdeel ervan bewust te sturen?" },
        ],
      },
      {
        id: "E4",
        statement: { en: "I love golf, but it gets to me more than it should.", nl: "Ik hou van golf, maar het raakt me meer dan zou moeten." },
        subs: [
          { en: "If I score badly the whole day's ruined, however nice the round was.", nl: "Als ik slecht scoor, is de hele dag verpest, hoe mooi de ronde ook was." },
          { en: "When it's not going well, I can't enjoy anything else out there.", nl: "Als het niet loopt, kan ik nergens anders meer van genieten." },
          { en: "I played alright, but I still went home disappointed.", nl: "Ik speelde best oké, maar ging toch teleurgesteld naar huis." },
          { en: "After eighteen holes my head is more tired than my legs.", nl: "Na achttien holes is mijn hoofd vermoeider dan mijn benen." },
        ],
        hooks: [
          { en: "What if you could care deeply about your score without letting it decide whether you enjoyed your golf?", nl: "Wat als je veel om je score kon geven zonder dat die bepaalt of je van je golf hebt genoten?" },
          { en: "When the scoring goes badly, does it become hard to notice anything else that's good about the round?", nl: "Als het scoren tegenzit, zie je dan nog wel wat er verder goed is aan je ronde?" },
          { en: "Ever played reasonably well and still gone home disappointed?", nl: "Ooit redelijk goed gespeeld en toch teleurgesteld naar huis gegaan?" },
          { en: "Do you sometimes finish 18 holes more mentally exhausted than physically tired?", nl: "Ben je na 18 holes soms meer mentaal uitgeput dan lichamelijk moe?" },
        ],
      },
    ],
  },
  {
    id: "D",
    name: { en: "Development", nl: "Ontwikkeling" },
    tagline: { en: "I want to keep getting better and still enjoy the game.", nl: "Ik wil beter blijven worden én blijven genieten van het spel." },
    narratives: [
      {
        id: "D1",
        statement: { en: "I know what to do. I just don't do it every time.", nl: "Ik weet wat ik moet doen. Ik doe het alleen niet elke keer." },
        subs: [
          { en: "My routine's there when I don't need it and gone when I do.", nl: "Mijn routine is er als ik hem niet nodig heb, en weg als ik hem wel nodig heb." },
          { en: "I know I should commit, but I still stand there with doubts.", nl: "Ik weet dat ik vol voor mijn keuze moet gaan, maar ik sta er toch met twijfels." },
          { en: "I know how I want to react after a bad shot, but the old me takes over.", nl: "Ik weet hoe ik wil reageren na een slechte slag, maar de oude ik neemt het over." },
          { en: "I know it's one shot at a time, but I keep adding up the score in my head.", nl: "Ik weet dat het slag voor slag gaat, maar ik blijf mijn score in mijn hoofd optellen." },
        ],
        hooks: [
          { en: "If your routine is meant to give you something reliable, why does it become harder to use when pressure rises?", nl: "Als je routine je houvast moet geven, waarom wordt hij dan lastiger om te gebruiken als de druk stijgt?" },
          { en: "Knowing you should commit is one thing. Can you actually do it shot after shot?", nl: "Weten dat je vol voor je keuze moet gaan is één ding. Doe je het ook, slag na slag?" },
          { en: "What if the response you know is useful gradually became your natural response?", nl: "Wat als de reactie waarvan je weet dat die helpt, langzaam je natuurlijke reactie werd?" },
          { en: "You know you should focus on the shot in front of you — but does the score keep pulling your attention somewhere else?", nl: "Je weet dat je bij de slag van nu moet blijven — maar trekt de score je aandacht steeds weg?" },
        ],
      },
      {
        id: "D2",
        statement: { en: "I know I should practise more. It just doesn't happen.", nl: "Ik weet dat ik meer moet oefenen. Het komt er alleen niet van." },
        subs: [
          { en: "I barely have time to hit balls, let alone work on the mental side.", nl: "Ik heb amper tijd om ballen te slaan, laat staan om aan de mentale kant te werken." },
          { en: "Starting a routine is easy. Keeping it going is the hard part.", nl: "Beginnen met een routine is makkelijk. Volhouden is het moeilijke deel." },
          { en: "Hitting balls feels like practice. Mental stuff feels a bit vague.", nl: "Ballen slaan voelt als oefenen. Mentaal werk voelt een beetje vaag." },
          { en: "I know the mental game matters, but I've no idea what to actually practise.", nl: "Ik weet dat het mentale spel ertoe doet, maar ik heb geen idee wat ik nou moet oefenen." },
        ],
        hooks: [
          { en: "What if mental practice didn't require adding another hour to your practice schedule?", nl: "Wat als mentaal trainen geen extra uur in je trainingsschema hoefde te kosten?" },
          { en: "Ever started a new practice routine with good intentions — and quietly stopped two weeks later?", nl: "Ooit met goede voornemens een nieuwe trainingsroutine begonnen — en er twee weken later stilletjes mee gestopt?" },
          { en: "Maybe mental practice feels less motivating because progress is harder to see shot by shot.", nl: "Misschien motiveert mentaal trainen minder omdat je de vooruitgang niet slag voor slag ziet." },
          { en: "The problem may not be motivation. It may be that “work on your mental game” is simply too vague an instruction.", nl: "Misschien ligt het niet aan je motivatie. Misschien is „werk aan je mentale spel” gewoon een te vage opdracht." },
        ],
      },
      {
        id: "D3",
        statement: { en: "It works on the range. It disappears on the course.", nl: "Op de range werkt het. In de baan is het weg." },
        subs: [
          { en: "My routine works in practice and disappears on the course.", nl: "Mijn routine werkt op de range en verdwijnt in de baan." },
          { en: "On the range I get another ball. On the course I don't.", nl: "Op de range krijg ik nog een bal. In de baan niet." },
          { en: "I practise my swing, hardly my decisions or how I handle pressure.", nl: "Ik oefen mijn swing, maar nauwelijks mijn keuzes of hoe ik met druk omga." },
          { en: "When the round goes wrong, everything I've practised goes out the window.", nl: "Als de ronde misgaat, is alles wat ik heb geoefend ineens weg." },
        ],
        hooks: [
          { en: "If a routine works in practice but disappears when you play, is it really ready for the course?", nl: "Als een routine werkt op de range maar verdwijnt in de baan, is hij dan echt klaar voor de baan?" },
          { en: "Better practice may not mean more repetition. It may mean making practice more like playing.", nl: "Beter oefenen betekent misschien niet meer herhalen. Misschien betekent het: oefenen meer laten lijken op spelen." },
          { en: "Golf practice often trains the swing. Playing golf asks for much more than a swing.", nl: "Golftraining traint vaak de swing. Golf spelen vraagt veel meer dan een swing." },
          { en: "When a round stops going to plan, do all those things you practised suddenly disappear?", nl: "Als een ronde niet loopt zoals gepland, verdwijnt dan ineens alles wat je hebt geoefend?" },
        ],
      },
      {
        id: "D4",
        statement: { en: "I want to improve, but I still want golf to be fun.", nl: "Ik wil beter worden, maar golf moet wel leuk blijven." },
        subs: [
          { en: "I want to get better, but not if every round turns into an exam.", nl: "Ik wil beter worden, maar niet als elke ronde een examen wordt." },
          { en: "I want to practise smarter, not just longer.", nl: "Ik wil slimmer oefenen, niet alleen langer." },
          { en: "I want to be ambitious without beating myself up over every mistake.", nl: "Ik wil ambitieus zijn zonder mezelf bij elke fout af te kraken." },
          { en: "One bad round and I feel like all the work's been for nothing.", nl: "Eén slechte ronde en ik heb het gevoel dat al het werk voor niets was." },
        ],
        hooks: [
          { en: "Has trying to improve ever made every round feel like a test?", nl: "Heeft beter willen worden er weleens voor gezorgd dat elke ronde als een examen voelt?" },
          { en: "What if you could make more progress from the practice time you already have?", nl: "Wat als je meer vooruitgang kon halen uit de oefentijd die je al hebt?" },
          { en: "You want high standards because you care about improving. So when do those standards start getting in the way?", nl: "Je legt de lat hoog omdat je beter wilt worden. Wanneer gaat die lat je dan in de weg zitten?" },
          { en: "Improvement isn't linear. So why can one bad round still feel like you're going backwards?", nl: "Vooruitgang gaat niet in een rechte lijn. Waarom kan één slechte ronde dan toch voelen als achteruitgang?" },
        ],
      },
    ],
  },
];

export const DEFAULT_ROUTE = "P1.1";

/** Pick the text for a language; DE/FR/ES fall back to English. */
export function pick(t: Text, lang: Lang): string {
  return lang === "nl" ? t.nl : t.en;
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
