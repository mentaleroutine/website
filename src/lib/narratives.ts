// ─────────────────────────────────────────────────────────────────
// Entry Narrative Framework v1.5 (Berend & Henk, 23-9-2026) — frozen baseline.
// 3 groups → 12 entry narratives → 48 sub-narratives, each with one primary hook.
// The English texts are the framework's fixed market-facing wording; the Dutch
// texts are translations awaiting Henk's approval. DE/FR/ES fall back to English.
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
    tagline: { en: "I want better results.", nl: "Ik wil betere resultaten." },
    narratives: [
      {
        id: "P1",
        statement: { en: "My scores don't reflect the golf I know I can play.", nl: "Mijn scores laten niet zien hoe goed ik kan golfen." },
        hooks: [
          { en: "You hit plenty of good shots. So why does the scorecard still tell a different story?", nl: "Je slaat genoeg goede slagen. Waarom vertelt je scorekaart dan toch een ander verhaal?" },
          { en: "Ever handled the hard holes well, only to give shots away where you least expected to?", nl: "Speel je de moeilijke holes goed, en geef je slagen weg waar je het het minst verwacht?" },
          { en: "A handful of avoidable holes can hide an entire round of good golf on the scorecard.", nl: "Een handvol vermijdbare holes kan een hele ronde goed golf op je scorekaart verbergen." },
          { en: "Where do the shots you feel you shouldn't have lost actually come from?", nl: "Waar komen de slagen vandaan waarvan je voelt dat je ze niet had hoeven verliezen?" },
        ],
      },
      {
        id: "P2",
        statement: { en: "I lose too many shots without actually hitting a bad shot.", nl: "Ik verlies te veel slagen zonder dat ik echt een slechte slag sla." },
        hooks: [
          { en: "Ever stood over a shot knowing you weren't fully committed — and hit it anyway?", nl: "Ooit boven een bal gestaan terwijl je wist dat je er niet helemaal voor ging — en toch geslagen?" },
          { en: "Ever walked off a hole knowing the swing wasn't really the problem — the decision was?", nl: "Ooit van een hole gelopen met het gevoel dat niet je swing het probleem was, maar je keuze?" },
          { en: "Do you ever lose focus on the very shots that look too simple to go wrong?", nl: "Verlies je weleens je focus juist bij de slagen die te simpel lijken om mis te gaan?" },
          { en: "The shot after the mistake can cost more than the mistake itself.", nl: "De slag na de fout kan meer kosten dan de fout zelf." },
        ],
      },
      {
        id: "P3",
        statement: { en: "My performance changes when the round starts to matter.", nl: "Mijn spel verandert zodra de ronde ertoe gaat doen." },
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
    tagline: { en: "I want golf to feel better.", nl: "Ik wil dat golf beter voelt." },
    narratives: [
      {
        id: "E1",
        statement: { en: "I struggle to let go of bad shots and bad holes.", nl: "Ik kan slechte slagen en slechte holes moeilijk loslaten." },
        hooks: [
          { en: "Still replaying that missed shot when you're standing over the next one?", nl: "Speel je die mislukte slag nog af in je hoofd terwijl je al boven de volgende staat?" },
          { en: "The bad shot is finished. The frustration you carry forward may not be.", nl: "De slechte slag is voorbij. De frustratie die je meeneemt misschien nog niet." },
          { en: "Do you ever feel you need to get the shot back immediately after making a mistake?", nl: "Heb je weleens het gevoel dat je een slag direct moet terugpakken na een fout?" },
          { en: "What if one bad hole could simply remain one bad hole?", nl: "Wat als één slechte hole gewoon één slechte hole kon blijven?" },
        ],
      },
      {
        id: "E2",
        statement: { en: "My confidence can change completely during a round.", nl: "Mijn vertrouwen kan tijdens een ronde volledig omslaan." },
        hooks: [
          { en: "Two bad drives — and suddenly the driver you trusted twenty minutes ago feels completely different?", nl: "Twee slechte drives — en ineens voelt de driver die je twintig minuten geleden nog vertrouwde totaal anders?" },
          { en: "Your ability hasn't changed in three holes. So why has your confidence?", nl: "Je kunnen is in drie holes niet veranderd. Waarom je vertrouwen dan wel?" },
          { en: "Trying harder to control the ball may be exactly what makes your swing feel less free.", nl: "Juist harder proberen de bal te sturen kan je swing minder vrij laten voelen." },
          { en: "What if you could reset your confidence before the next shot — rather than waiting for the shot to fix it?", nl: "Wat als je je vertrouwen kon resetten vóór de volgende slag — in plaats van te wachten tot een goede slag het herstelt?" },
        ],
      },
      {
        id: "E3",
        statement: { en: "I think too much when I should just be playing.", nl: "Ik denk te veel na terwijl ik gewoon zou moeten spelen." },
        hooks: [
          { en: "Ever stood over the ball with three swing thoughts competing for your attention?", nl: "Ooit boven de bal gestaan met drie swinggedachten die om je aandacht vechten?" },
          { en: "A complicated shot may sometimes begin as a simple shot with too many thoughts added to it.", nl: "Een ingewikkelde slag begint soms als een simpele slag waar te veel gedachten bij zijn gekomen." },
          { en: "Do you ever turn the golf course into a driving range halfway through the round?", nl: "Maak je van de baan weleens halverwege de ronde een driving range?" },
          { en: "If you already know the swing you want to make, why are you trying to consciously manage every part of it?", nl: "Als je al weet welke swing je wilt maken, waarom probeer je dan elk onderdeel ervan bewust te sturen?" },
        ],
      },
      {
        id: "E4",
        statement: { en: "Golf affects my mood and enjoyment more than I want it to.", nl: "Golf heeft meer invloed op mijn humeur en plezier dan ik zou willen." },
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
    // Shortened from the framework's group line ("I want to turn what I know into
    // sustainable behaviour that improves both performance and experience.").
    tagline: { en: "I want what I know to become what I do.", nl: "Ik wil dat wat ik weet, wordt wat ik doe." },
    narratives: [
      {
        id: "D1",
        statement: { en: "I know what I should do — but I don't do it consistently.", nl: "Ik weet wat ik moet doen — maar ik doe het niet consequent." },
        hooks: [
          { en: "If your routine is meant to give you something reliable, why does it become harder to use when pressure rises?", nl: "Als je routine je houvast moet geven, waarom wordt hij dan lastiger om te gebruiken als de druk stijgt?" },
          { en: "Knowing you should commit is one thing. Can you actually do it shot after shot?", nl: "Weten dat je vol voor je keuze moet gaan is één ding. Doe je het ook, slag na slag?" },
          { en: "What if the response you know is useful gradually became your natural response?", nl: "Wat als de reactie waarvan je weet dat die helpt, langzaam je natuurlijke reactie werd?" },
          { en: "You know you should focus on the shot in front of you — but does the score keep pulling your attention somewhere else?", nl: "Je weet dat je bij de slag van nu moet blijven — maar trekt de score je aandacht steeds weg?" },
        ],
      },
      {
        id: "D2",
        statement: { en: "I know I should practise — but I struggle to make it happen consistently.", nl: "Ik weet dat ik moet oefenen — maar het lukt me niet om het vol te houden." },
        hooks: [
          { en: "What if mental practice didn't require adding another hour to your practice schedule?", nl: "Wat als mentaal trainen geen extra uur in je trainingsschema hoefde te kosten?" },
          { en: "Ever started a new practice routine with good intentions — and quietly stopped two weeks later?", nl: "Ooit met goede voornemens een nieuwe trainingsroutine begonnen — en er twee weken later stilletjes mee gestopt?" },
          { en: "Maybe mental practice feels less motivating because progress is harder to see shot by shot.", nl: "Misschien motiveert mentaal trainen minder omdat je de vooruitgang niet slag voor slag ziet." },
          { en: "The problem may not be motivation. It may be that “work on your mental game” is simply too vague an instruction.", nl: "Misschien ligt het niet aan je motivatie. Misschien is „werk aan je mentale spel” gewoon een te vage opdracht." },
        ],
      },
      {
        id: "D3",
        statement: { en: "I practise the right things — but they don't always show up when I play.", nl: "Ik oefen de juiste dingen — maar in de baan zie ik ze niet altijd terug." },
        hooks: [
          { en: "If a routine works in practice but disappears when you play, is it really ready for the course?", nl: "Als een routine werkt op de range maar verdwijnt in de baan, is hij dan echt klaar voor de baan?" },
          { en: "Better practice may not mean more repetition. It may mean making practice more like playing.", nl: "Beter oefenen betekent misschien niet meer herhalen. Misschien betekent het: oefenen meer laten lijken op spelen." },
          { en: "Golf practice often trains the swing. Playing golf asks for much more than a swing.", nl: "Golftraining traint vaak de swing. Golf spelen vraagt veel meer dan een swing." },
          { en: "When a round stops going to plan, do all those things you practised suddenly disappear?", nl: "Als een ronde niet loopt zoals gepland, verdwijnt dan ineens alles wat je hebt geoefend?" },
        ],
      },
      {
        id: "D4",
        statement: { en: "I want to keep improving without making golf feel like work.", nl: "Ik wil beter blijven worden zonder dat golf als werk gaat voelen." },
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
