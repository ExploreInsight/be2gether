/** Demo content. Every row seeded from here is flagged isDemo and can be removed from /admin. */
export const DEMO_USERS = [
  { username: "demo_maya", name: "Maya Rao", bio: "Demo account. Tram window seat, always.", location: "Pune" },
  { username: "demo_arjun", name: "Arjun Mehta", bio: "Demo account. Fixes bikes, forgets lunch.", location: "Mumbai" },
  { username: "demo_isha", name: "Isha Nair", bio: "Demo account. Cooks for too many people.", location: "Kochi" },
  { username: "demo_sam", name: "Sam D'Souza", bio: "Demo account. Reads the same page twice.", location: "Goa" },
  { username: "demo_noor", name: "Noor Ahmed", bio: "Demo account. Night walks and voice notes.", location: "Hyderabad" },
  { username: "demo_dev", name: "Dev Kapoor", bio: "Demo account. Tapes, zines, bad puns.", location: "Delhi" },
] as const;

// [author username, text, minutes ago]
export const DEMO_POSTS: ReadonlyArray<readonly [string, string, number]> = [
  ["demo_maya", "Rain on the tram, window seat, nothing to do. Best part of the day. #nightwalk", 3],
  ["demo_arjun", "Finally fixed the bike chain. Who wants a ride on Sunday? #sunday", 11],
  ["demo_isha", "Made far too much dal again. Door's open, bring a bowl. #dinner", 26],
  ["demo_sam", "Reading the same page for the fourth time. Send help or tea.", 48],
  ["demo_noor", "Walked home the long way. The mango tree on the corner is flowering. #nightwalk", 95],
  ["demo_dev", "Made a mixtape for the Sunday ride. Side A is all downhill songs. #sunday #mixtape", 150],
  ["demo_maya", "Anyone have a recommendation for a rainy-day playlist? #mixtape", 260],
  ["demo_arjun", "Ten minutes of sun between two storms. I took it.", 410],
  ["demo_isha", "Leftover dal paratha for breakfast is a good life choice. #dinner", 700],
  ["demo_noor", "Voice note to myself: stop checking the weather app.", 1300],
  ["demo_sam", "Finished the book. Immediately started it again. #reading", 2000],
  ["demo_dev", "Zine night at mine on Friday. Bring scissors and snacks.", 3100],
];

// [post index, commenter username, text]
export const DEMO_COMMENTS: ReadonlyArray<readonly [number, string, string]> = [
  [0, "demo_noor", "Window seat is undefeated."],
  [1, "demo_maya", "Count me in. I'll bring the speaker."],
  [2, "demo_arjun", "On my way, save me the crispy bit."],
  [5, "demo_isha", "Send me the tracklist!"],
];

// [post index, liker username]
export const DEMO_LIKES: ReadonlyArray<readonly [number, string]> = [
  [0, "demo_arjun"], [0, "demo_isha"], [1, "demo_dev"], [2, "demo_maya"], [2, "demo_sam"],
  [4, "demo_maya"], [5, "demo_arjun"], [5, "demo_noor"], [5, "demo_maya"],
];
