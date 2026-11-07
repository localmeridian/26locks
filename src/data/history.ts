// History, lineage and research, curated from research/notes/history-people.md,
// timeline.md and research-studies.md (pass H). Source keys are written inline
// as [H8, H13]; HistoryText renders them as citation links, and the build fails
// on an unknown key. Where sources disagree, both readings are given; see
// research/curation-log.md §History.

export interface Portrait {
  name: string;
  native?: string;
  dates: string;
  role: string;
  facts: string[];
}

export const murai: Portrait = {
  name: 'Jiro Murai',
  native: '村井次郎',
  dates: '1886 – 1960 (one source: 1961)',
  role: 'Originator, or in the tradition’s own word, rediscoverer',
  facts: [
    'Born in 1886 into a family of physicians, he trained instead in sericulture: silk farming [H8, H13, H14].',
    'In 1912, aged 26, he was diagnosed with an illness doctors thought terminal. He asked to be left alone for seven days in the family’s mountain cabin, and there fasted, meditated and held hand postures, or mudras [H8, H17, H19]. One account says he modelled them on statues of the Buddha [H14]; Mary, in 1988, said he pictured sages using them [H12].',
    'Mary’s account: carried up to the cabin on a stretcher, he felt colder each day, then on the seventh as if thrown into a furnace; when the heat passed, the illness had gone [C16].',
    'He came through it recovered, and gave the rest of his life to understanding why [H8, H12, H14].',
    'He vowed that what he found would go to Ise Jingu, Japan’s Imperial Shrine, for all people. Mary wrote that he accomplished this [C16].',
    'Mary wrote that records in the Imperial Palace archives show the art known before the Buddha, Moses and the *Kojiki*, passed on by word of mouth until it was all but lost [C16].',
    'He studied the *Kojiki* (A.D. 712), the Bible and classical Chinese, Greek and Indian texts, and experimented on himself through fasting and long retreats [H2, H12, H14].',
    'Mary wrote that he first called the art Jin Shin Jyutsu in characters meaning simply “body–mind art”, renamed it En Mei Jyutsu, the art of long life, and later returned to Jin Shin Jyutsu with its fuller meaning: the Creator’s art through compassionate man [A44].',
    'He mapped energy pathways that resembled acupuncture meridians but, by his account, went beyond them [H8, H14].',
    'He taught from around 1946, the last 14 years of his life, and never left Japan [H8, H13, H14].',
  ],
};

export const burmeister: Portrait = {
  name: 'Mary Burmeister',
  native: 'née Mary Mariko Iino',
  dates: '21 Oct 1918 – 27 Jan 2008',
  role: 'Brought the art to the United States and shaped how it is taught',
  facts: [
    'Born in Seattle, Washington, a first-generation Japanese-American [H3, H12, H13].',
    'In the late 1940s she went to Japan to learn the language, or by other accounts to translate and study diplomacy. She met Murai at the home of a young woman she tutored in English; he invited her to study with him and carry a “gift” from Japan to America [C16, H3, H8, H12, H13].',
    'By her own 1988 account, five years of study in Japan and seven more by letter. Other sources say six or seven years in Japan [H12, H15, H20].',
    'She returned to the United States to marry Gilbert Burmeister, in 1953 or 1954; sources differ [H8, H13, H15].',
    'She waited about seventeen years after meeting Murai before teaching. Her first student was a neighbour’s chiropractor [H3, H12].',
    'She translated the art for Western students, is credited with the teaching of the Depths and its stress on Self-Help, and began training instructors in 1986 or 1987 [H8, H13, H22].',
    'A fall at home in early 1990 (February or March; sources differ) ended her teaching, though she still gave sessions. She died in 2008, aged 89 [H3, H8].',
  ],
};

export interface Person {
  name: string;
  dates?: string;
  line: string;
}

/** Teachers and lineage, verified names only. */
export const lineage: { group: string; people: Person[] }[] = [
  {
    group: 'Murai’s other students in Japan',
    people: [
      { name: 'Haruki Kato', dates: '1928–2014', line: 'Joined Murai’s study group in 1953 and trained with him until his death. Later a licensed acupuncturist; wrote to Mary, and visited the US faculty in 1992 [H8].' },
      { name: 'Sadaki Kato', line: 'Haruki’s son, taught by his father; practises in Tokyo and has taught as JSJ faculty [H8, H14, H22].' },
      { name: 'Uhachi Iino', line: 'Mary’s father, and a student of Murai. Went back to Japan after Mary began her studies, and stayed on after 1953 [H3, H8, H13].' },
    ],
  },
  {
    group: 'The Burmeister family',
    people: [
      { name: 'David Burmeister', line: 'Mary’s son. Ran the Scottsdale office from 1985 and managed her business; now directs the Mary Burmeister Jin Shin Jyutsu Institute [H3, H5, H12].' },
      { name: 'Michael Burmeister', line: 'Mary’s son; named with David as co-steward of the work [H3, H5, H13].' },
      { name: 'Alice Burmeister', line: 'Wife of Mary’s son David, so Mary’s daughter-in-law [C17, C18]. Attended her first seminar with Mary in 1982; author, with Tom Monte, of *The Touch of Healing: Energizing Body, Mind, and Spirit with the Art of Jin Shin Jyutsu* (1997), with a foreword by Mary [H23, H24, C17].' },
    ],
  },
  {
    group: 'Teachers who carried it forward',
    people: [
      { name: 'Pamela Markarian Smith', dates: '1936–2015', line: 'Studied with Mary from the early 1960s and was one of four instructors Mary chose in 1986; founded the Jin Shin Institute in 1993 [H22].' },
      { name: 'Alexis Brink', line: 'Studied privately with Haruki Kato; succeeded Pamela at the Jin Shin Institute in 2015; author of *The Art of Jin Shin* (2019) [H22, H106].' },
      { name: 'Sara Harper', line: 'First session with Mary in 1973 at age 14; studied with her from 1983; instructor since 1992 [H11].' },
      { name: 'Waltraud Riegger-Krause', line: 'Studied with Mary 1985–1990; instructor since 1995; author of *Health Is in Your Hands* [H10].' },
    ],
  },
];

export interface Moment {
  when: string;
  what: string;
  /** Sources disagree about this date. */
  disputed?: boolean;
  era: 'japan' | 'america' | 'today';
}

export const timeline: Moment[] = [
  { era: 'japan', when: '712', what: 'The *Kojiki* is compiled; Murai will study it closely. The tradition holds that the art is older still [H2, H12, H14].' },
  { era: 'japan', when: '1886', what: 'Jiro Murai is born in Japan [H8, H13, H14].' },
  { era: 'japan', when: '1912', what: 'Murai, 26 and gravely ill, spends seven days alone in a mountain cabin, and recovers [H8, H12, H13, H14, H17].' },
  { era: 'japan', when: '1918', what: 'Mary Mariko Iino is born in Seattle on 21 October [H3, H13].' },
  { era: 'japan', when: 'c. 1946', what: 'Murai begins teaching, 34 years after his recovery [H8, H14].' },
  { era: 'japan', when: 'Late 1940s', what: 'Mary meets Murai in Japan and begins to study with him [H3, H8, H12, H13].' },
  { era: 'japan', when: '1953', what: 'Haruki Kato joins Murai’s study group [H8].' },
  { era: 'america', when: '1953 or 1954', disputed: true, what: 'Mary returns to the US to marry Gilbert Burmeister, and studies on by letter [H8, H13, H15].' },
  { era: 'japan', when: '1960 or 1961', disputed: true, what: 'Jiro Murai dies. Most sources give June 1960 [H8, H13, H21, H22]; one gives 1961 [H18].' },
  { era: 'america', when: 'Early 1960s – 1965', disputed: true, what: 'Mary begins teaching. Sources give the early 1960s, the mid-1960s or 1965 [H1, H3, H8, H13, H15].' },
  { era: 'america', when: '1972', disputed: true, what: 'Mary moves to Scottsdale, Arizona. One source dates a Scottsdale office to 1965 [H3, H13].' },
  { era: 'america', when: '1976', what: 'Jin Shin Jyutsu, Inc. applies to trademark the name in the US (registered 1980, lapsed 2001) [H100].' },
  { era: 'america', when: '1979', what: 'The edition date on Mary’s Text I & II, per the official store [H6].' },
  { era: 'america', when: '1986–87', disputed: true, what: 'Mary begins training instructors [H8, H22].' },
  { era: 'america', when: '1988', what: '*Yoga Journal* publishes a profile of Mary, described as her first interview [H12].' },
  { era: 'america', when: '1990', what: 'A fall early in the year ends Mary’s teaching; she still gives sessions [H3, H8].' },
  { era: 'america', when: '1992', what: 'Haruki Kato visits Mary and the US faculty [H8].' },
  { era: 'america', when: '1993', what: 'Pamela Markarian Smith founds the Jin Shin Institute [H22].' },
  { era: 'america', when: '2008', what: 'Mary Burmeister dies on 27 January, aged 89 [H3, H8, H13].' },
  { era: 'today', when: '2014', what: 'Haruki Kato dies [H8].' },
  { era: 'today', when: '2020', what: 'Jin Shin Jyutsu Spirit Mind Body says the Burmeister family entrusted it with the legacy [H7].' },
];

export interface Org {
  name: string;
  where?: string;
  lines: string[];
}

export const organisations: Org[] = [
  {
    name: 'Jin Shin Jyutsu, Inc.',
    where: 'Scottsdale, Arizona',
    lines: [
      'The official organisation of the art and the owner of its trademark [H1, H101, H102].',
      'Its founding date is unclear: one later source says 1990, yet it filed for the trademark in 1976, and a 1988 article prints its name [H12, H22, H100].',
      'Its 5-Day Basic Seminar covers the 26 locks, the Trinity flows and the Depths, then the organ flows and pulse listening. Three seminars (105 hours) and agreeing to the Code of Ethics lead to Authorized Practitioner status [H4].',
    ],
  },
  {
    name: 'Jin Shin Jyutsu Spirit Mind Body (JSJSMB)',
    lines: [
      'A non-profit of international instructors. It says the Burmeister family entrusted it with the legacy in 2020, and jsjinc.net now links to it for classes and practitioners [H1, H7].',
    ],
  },
  {
    name: 'Mary Burmeister Jin Shin Jyutsu Institute',
    lines: ['Directed by David Burmeister; it still teaches, with instructors who did not join JSJSMB [H5].'],
  },
  {
    name: 'Regional offices',
    lines: ['A European office in Bonn, Germany, and an Austrian office [H13, H14].'],
  },
];

export interface Study {
  cite: string;
  design: string;
  n: string;
  found: string;
  caveat: string;
  peer: boolean;
}

export const evidenceSummary = [
  'A PubMed search in October 2026 returns seven records on Jin Shin Jyutsu. There is no systematic review or meta-analysis [H34, H35, H36, H37, H38, H39, H40].',
  'Most studies are small, run at a single site, and measure self-reported pain, stress or nausea before and after a session, without a control group.',
  'The evidence is early and of low certainty. It is consistent with short-term comfort and stress relief, but it does not show effects specific to Jin Shin Jyutsu beyond touch, attention and relaxation, and it is not evidence of treating any disease.',
];

export const studies: Study[] = [
  { peer: true, cite: 'Millspaugh et al., *J Holist Nurs* 2021 [H34]', design: 'Randomised controlled, with crossover; self-help education vs none (blinding not reported)', n: '41 nurses', found: 'Stress improvements were sustained in the education group but not in controls.', caveat: 'The only randomised trial labelled Jin Shin Jyutsu. Small, with no attention-matched control and self-reported outcomes.' },
  { peer: true, cite: 'Lamke, Catlin & Mason-Chadd, *J Holist Nurs* 2014 [H35]', design: 'Single group, before and after', n: '20 nurses', found: 'Improvements on stress and well-being questionnaires after self-care training.', caveat: 'No control group, and many outcomes tested.' },
  { peer: true, cite: 'Searls & Fawcett, *J Holist Nurs* 2011 [H36]', design: 'Single group, before and after; ten weekly sessions', n: '29 women with breast cancer', found: 'Higher scores for adaptation and daily activities afterwards.', caveat: 'No control group; one practitioner; a questionnaire the investigators devised.' },
  { peer: true, cite: 'McFadden & Hernández and colleagues, 2010–2012 [H41, H42, H43]', design: 'Randomised, placebo-controlled, single-blind; labelled “Jin Shin” acupressure', n: '16 to 109', found: 'Mixed. The largest trial, of 109 students, found no difference between active acupressure, placebo acupressure and a relaxation recording.', caveat: 'The lab’s earlier work was on Jin Shin TARA, so these may follow that lineage rather than Jin Shin Jyutsu.' },
  { peer: true, cite: 'Shannon 2002; Innsbruck single-case studies 2021 [H37, H39, H40]', design: 'Case reports', n: '1 each', found: 'Descriptive.', caveat: 'Anecdotal. In the 2021 studies Jin Shin Jyutsu is one of several practices and is not isolated.' },
  { peer: false, cite: 'UK Markey Cancer Center, poster 2012 [H44, H46]', design: 'Before and after each session; no control', n: '159 patients', found: 'Self-rated pain, stress and nausea were lower immediately after sessions.', caveat: 'The authors note there was no control of session length or setting. Not peer-reviewed.' },
  { peer: false, cite: 'UC San Diego, poster [H48, H49]', design: 'Before and after each session; no control', n: '108 patients', found: 'Self-rated pain and stress were lower after sessions.', caveat: 'The practitioner is the first author, and a summary of the same work gives a different sample size [H56].' },
  { peer: false, cite: 'Atlantic Health, labour review, poster 2026 [H50]', design: 'Retrospective comparison; not randomised', n: '117 vs 118 births', found: 'The first stage of labour was shorter in the Jin Shin Jyutsu group (vaginal births only; median 8.5 vs 11.2 hours). The caesarean rate (21% vs 28%) was not significantly different (p = 0.24).', caveat: 'Likely confounding. The poster itself, and one summary, present the caesarean gap as a difference, which overstates it [H9].' },
];

export const openQuestions = [
  'Murai’s death: June 1960 in most sources, 1961 in one [H8, H13, H18, H22].',
  'Murai’s birthplace: an Austrian Jin Shin Jyutsu site names a village in the Kaga area; another account says only the western coast of central Japan. This site could not confirm either [H8, H14].',
  'Mary’s years in Japan: five in her own 1988 account; six or seven elsewhere [H12, H15, H20].',
  'Mary’s marriage and return to the US: 1953 or 1954 [H8, H15].',
  'When Mary began teaching: the early 1960s, the mid-1960s or 1965 [H1, H3, H8].',
  'Mary’s move to Scottsdale: her son’s memoir dates it to 1972, when she first had an office away from home; the European office says she opened one there in 1965. The two disagree [H3, H13].',
  'Murai’s illness and his finger poses: 1912 in the secondary accounts followed here, while Book 3 (1985) sets the poses over eighty years back, which she may mean loosely [H8, H17, H19, C19].',
  'The founding of Jin Shin Jyutsu, Inc.: 1990 in one source, yet it filed for the trademark in 1976, a 1988 article prints its name, and Book 2 (in its 2011 printing) carries a 1981 copyright in that name [H12, H22, H100, A44].',
  'Murai’s own kanji for the name of the art has not been found in any source.',
  'Some secondary pages place Murai’s retreat on Mount Kurama. No Jin Shin Jyutsu source does; that detail belongs to the founding story of Reiki, so it is left out here [H58].',
];

export const trademark =
  'Jin Shin Jyutsu® is a registered trademark of Jin Shin Jyutsu, Inc. In USPTO records the word mark is Reg. No. 3,022,938 (2005, renewed 2026); the Japanese-character mark, Reg. No. 2,425,297 (2001), is translated “Art of the Creator through man of knowing and compassion”. An earlier registration, filed 1976 and granted 1980, lapsed in 2001 [H100, H101, H102]. This site is independent and not affiliated with Jin Shin Jyutsu, Inc.';
