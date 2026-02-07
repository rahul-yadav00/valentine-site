const fs = require("fs");
const path = require("path");

const slug = process.argv[2];

if (!slug) {
  console.log("Usage: node generate.js <username>");
  process.exit();
}

const PUBLIC = path.join(__dirname, "public");

function list(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => !f.startsWith("."));
}

const data = {
  music: "",
  background: [],
  timeline: {},
  message: ""
};

// MUSIC
const musicDir = path.join(PUBLIC, "music", slug);
if (fs.existsSync(musicDir)) {
  data.music = `/music/${slug}/${list(musicDir)[0] || ""}`;
}

// BACKGROUND PHOTOS
data.background = list(path.join(PUBLIC, "photos", slug)).map(
  f => `/photos/${slug}/${f}`
);

// TIMELINE
const timelineRoot = path.join(PUBLIC, "timeline", slug);

if (fs.existsSync(timelineRoot)) {
  list(timelineRoot).forEach(section => {
    const sectionDir = path.join(timelineRoot, section);

    data.timeline[section] = list(sectionDir).map(
      f => `/timeline/${slug}/${section}/${f}`
    );
  });
}

// MESSAGE TXT
const messageFile = path.join(PUBLIC, "message", slug, "message.txt");

if (fs.existsSync(messageFile)) {
  data.message = fs.readFileSync(messageFile, "utf8").trim();
}

// WRITE JSON
const outDir = path.join(PUBLIC, "data");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

fs.writeFileSync(
  path.join(outDir, `${slug}.json`),
  JSON.stringify(data, null, 2)
);

console.log(`✅ Generated public/data/${slug}.json`);
