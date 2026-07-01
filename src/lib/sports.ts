/**
 * SPORTS & DEMOGRAPHIC OPTIONS — single source of truth.
 *
 * Used by onboarding, account settings, and anywhere else that needs the
 * sport / level / position / demographic option lists. Keep all such lists
 * here so they stay consistent across the app.
 */

// --- Sports ---
export const SPORTS: string[] = [
  "Archery",
  "Badminton",
  "Baseball",
  "Basketball",
  "Biathlon",
  "Bobsled",
  "Bowling",
  "Boxing",
  "Canoeing / Kayaking",
  "Cheerleading",
  "Cricket",
  "Cross Country",
  "Curling",
  "Cycling",
  "Dance",
  "Diving",
  "Equestrian",
  "Fencing",
  "Field Hockey",
  "Figure Skating",
  "Football",
  "Golf",
  "Gymnastics",
  "Handball",
  "Ice Hockey",
  "Judo",
  "Lacrosse (Men's)",
  "Lacrosse (Women's)",
  "Luge",
  "Marathon Running",
  "Martial Arts",
  "Motocross",
  "Mountain Biking",
  "Mountaineering",
  "Nordic Skiing",
  "Paddleball",
  "Pentathlon",
  "Pilates",
  "Polo",
  "Racquetball",
  "Rowing",
  "Rugby (Union)",
  "Rugby (Sevens)",
  "Sailing",
  "Shooting",
  "Skeleton",
  "Ski Jumping",
  "Sled Dog Racing",
  "Snowboarding",
  "Soccer",
  "Softball",
  "Speed Skating",
  "Squash",
  "Surfing",
  "Swimming",
  "Synchronized Swimming",
  "Table Tennis",
  "Tennis",
  "Track and Field",
  "Triathlon",
  "Volleyball",
  "Wakeboarding",
  "Water Polo",
  "Water Skiing",
  "Weightlifting",
  "Windsurfing",
  "Wrestling",
  "Yoga",
  "Other",
];

// --- Competition levels ---
export const COMPETITION_LEVELS: string[] = [
  "Amateur (Youth)",
  "Amateur (College Prep)",
  "Amateur (Non-Affiliated)",
  "High School",
  "College D-I",
  "College D-II",
  "College D-III",
  "Semi-Professional",
  "Professional",
  "Olympic",
];

// --- Demographics ---
export const SEX_OPTIONS: string[] = ["Male", "Female", "Prefer not to answer"];

export const ETHNICITY_OPTIONS: string[] = [
  "American Indian or Alaskan Native",
  "Asian or Pacific Islander",
  "Black or African American",
  "Hispanic or Latino",
  "White / Caucasian",
  "Prefer not to answer",
  "Other",
];

// --- Positions per sport ---
// Team-sport coaching roles appended to relevant sports.
const COACH_ROLES = ["Head Coach", "Assistant Coach"];

const BASE_POSITIONS: Record<string, string[]> = {
  Baseball: ["Pitcher", "Catcher", "First Base", "Second Base", "Third Base", "Shortstop", "Left Field", "Center Field", "Right Field", "Designated Hitter"],
  Basketball: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
  Football: ["Quarterback", "Running Back", "Wide Receiver", "Tight End", "Offensive Line", "Defensive Line", "Linebacker", "Cornerback", "Safety", "Kicker", "Punter"],
  Soccer: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  "Lacrosse (Men's)": ["Goalie", "Defense", "Long Stick Midfield", "Midfield", "Face-off", "Attack"],
  "Lacrosse (Women's)": ["Goalie", "Defense", "Midfield", "Attack"],
  "Field Hockey": ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  "Ice Hockey": ["Goaltender", "Defense", "Center", "Left Wing", "Right Wing"],
  Volleyball: ["Setter", "Outside Hitter", "Middle Blocker", "Opposite", "Libero", "Defensive Specialist"],
  Softball: ["Pitcher", "Catcher", "Infield", "Outfield"],
  "Water Polo": ["Goalkeeper", "Center", "Driver", "Wing", "Point"],
  "Rugby (Union)": ["Prop", "Hooker", "Lock", "Flanker", "Number 8", "Scrum-half", "Fly-half", "Centre", "Wing", "Fullback"],
  "Rugby (Sevens)": ["Forward", "Half-back", "Center", "Wing"],
  Handball: ["Goalkeeper", "Wing", "Back", "Pivot"],
  Polo: ["Number 1", "Number 2", "Number 3", "Back"],
  Cricket: ["Batter", "Bowler", "All-rounder", "Wicketkeeper"],
};

// Sports that are individual — no meaningful position.
const NOT_APPLICABLE = ["Not Applicable"];

/**
 * Positions available for a given sport. Team sports return their roles plus
 * coaching options; individual sports return a single "Not Applicable" option.
 */
export function getPositions(sport: string | null | undefined): string[] {
  if (!sport) return NOT_APPLICABLE;
  const base = BASE_POSITIONS[sport];
  if (!base) return NOT_APPLICABLE;
  return [...base, ...COACH_ROLES];
}
